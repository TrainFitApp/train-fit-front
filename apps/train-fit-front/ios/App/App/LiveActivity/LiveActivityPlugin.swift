import ActivityKit
import Capacitor
import Foundation
import UIKit

/// Puente entre Angular y la Live Activity nativa del entrenamiento.
@objc(LiveActivityPlugin)
public class LiveActivityPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "LiveActivityPlugin"
    public let jsName = "LiveActivity"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isSupported", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "start", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "update", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "end", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPendingActions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "clearPendingActions", returnType: CAPPluginReturnPromise)
    ]

    /// Última reapertura de la tarjeta (ver `update`).
    private static var lastReopen = Date.distantPast

    /// Deja constancia de cada arranque del proceso. Sirve para saber, al leer
    /// la traza, si el sistema tuvo que levantar la app entera para ejecutar un
    /// botón (caro) o si ya estaba viva (instantáneo).
    override public func load() {
        WorkoutActivityStore.trace("proceso arranca")
    }

    @objc func isSupported(_ call: CAPPluginCall) {
        if #available(iOS 16.2, *) {
            call.resolve([
                "supported": ActivityAuthorizationInfo().areActivitiesEnabled,
                "interactive": isInteractiveAvailable()
            ])
        } else {
            call.resolve(["supported": false, "interactive": false])
        }
    }

    private func isInteractiveAvailable() -> Bool {
        if #available(iOS 17.0, *) { return true }
        return false
    }

    @objc func start(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else {
            call.resolve(["started": false])
            return
        }
        guard let session = buildSession(from: call) else {
            WorkoutActivityStore.trace("start rechazado: faltan datos")
            call.reject("Faltan datos de la sesión")
            return
        }

        WorkoutActivityStore.trace("start workout=\(session.workoutId) series=\(session.items.count) pendiente=\(session.currentIndex)")

        // Se abre con las miniaturas que ya estén guardadas; las que falten se
        // descargan después. ActivityKit solo permite abrirla con la app en
        // primer plano, así que aquí no se espera a la red.
        let immediate = cachedImages(for: session)

        Task {
            WorkoutActivityStore.saveSession(immediate)

            // Una sola notificación viva.
            _ = await WorkoutLiveActivityController.liveActivities()
            await WorkoutLiveActivityController.end()

            do {
                let id = try WorkoutLiveActivityController.start(session: immediate)
                WorkoutActivityStore.trace("notificacion abierta id=\(id ?? "nil")")
                call.resolve(["started": id != nil, "activityId": id ?? ""])
            } catch {
                WorkoutActivityStore.trace("start FALLA: \(error.localizedDescription)")
                call.reject("No se pudo iniciar la Live Activity: \(error.localizedDescription)")
            }

            self.downloadImages(for: session)
        }
    }

    @objc func update(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else {
            call.resolve()
            return
        }
        guard let session = buildSession(from: call) else {
            call.reject("Faltan datos de la sesión")
            return
        }

        let immediate = cachedImages(for: session)

        Task {
            WorkoutActivityStore.saveSession(immediate)
            let vivas = await WorkoutLiveActivityController.liveActivities().count
            WorkoutActivityStore.trace("update workout=\(session.workoutId) pendiente=\(immediate.currentIndex) vivas=\(vivas)")

            if vivas == 0 {
                // La tarjeta ya no está (la descartó el usuario o la cerró el
                // sistema) y el entrenamiento sigue: se reabre. Con freno,
                // porque pedir actividades en bucle agota el presupuesto de
                // ActivityKit y a partir de ahí no aparece ninguna.
                if Date().timeIntervalSince(Self.lastReopen) > 30 {
                    Self.lastReopen = Date()
                    do {
                        let id = try WorkoutLiveActivityController.start(session: immediate)
                        WorkoutActivityStore.trace("tarjeta reabierta id=\(id ?? "nil")")
                    } catch {
                        WorkoutActivityStore.trace("no se pudo reabrir: \(error.localizedDescription)")
                    }
                }
            } else {
                await WorkoutLiveActivityController.refresh(session: immediate)
            }
            self.downloadImages(for: session)
            call.resolve()
        }
    }

    @objc func end(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else {
            call.resolve()
            return
        }
        Task {
            WorkoutActivityStore.trace("end")
            await WorkoutLiveActivityController.end()
            WorkoutActivityStore.saveSession(nil)
            call.resolve()
        }
    }

    @objc func getPendingActions(_ call: CAPPluginCall) {
        let actions = WorkoutActivityStore.loadPending()
        let formatter = ISO8601DateFormatter()
        let payload: [[String: Any]] = actions.map { action in
            [
                "setId": action.setId,
                "reps": action.reps,
                "weight": action.weight,
                "rir": action.rir,
                "doned": action.doned,
                "skipped": action.skipped,
                "at": formatter.string(from: action.at)
            ]
        }
        call.resolve(["actions": payload])
    }

    @objc func clearPendingActions(_ call: CAPPluginCall) {
        WorkoutActivityStore.clearPending()
        call.resolve()
    }

    // MARK: - Helpers

    private func buildSession(from call: CAPPluginCall) -> WorkoutSession? {
        guard let workoutId = call.getString("workoutId"),
              let workoutName = call.getString("workoutName"),
              let rawItems = call.getArray("items") as? [JSObject] else {
            return nil
        }

        let items: [WorkoutSetItem] = rawItems.compactMap { raw in
            guard let setId = raw["setId"] as? String else { return nil }
            return WorkoutSetItem(
                setId: setId,
                exerciseName: raw["exerciseName"] as? String ?? "",
                exerciseIndex: raw["exerciseIndex"] as? Int ?? 0,
                totalExercises: raw["totalExercises"] as? Int ?? 0,
                setIndex: raw["setIndex"] as? Int ?? 0,
                totalSets: raw["totalSets"] as? Int ?? 0,
                reps: raw["reps"] as? Int ?? 0,
                weight: (raw["weight"] as? NSNumber)?.doubleValue ?? 0,
                rir: raw["rir"] as? Int ?? 0,
                doned: raw["doned"] as? Bool ?? false,
                // Aquí es la URL remota; cachedImages/downloadImages la
                // sustituyen por la clave de la miniatura guardada.
                imageKey: raw["imageUrl"] as? String
            )
        }

        guard !items.isEmpty else { return nil }

        let startedAt: Date
        if let startedAtMs = call.getDouble("startedAt") {
            startedAt = Date(timeIntervalSince1970: startedAtMs / 1000)
        } else {
            startedAt = WorkoutActivityStore.loadSession()?.startedAt ?? Date()
        }

        // Lo que el usuario marcó desde la notificación no llega al backend
        // hasta que la app vuelve a primer plano. Sin esto, cualquier cambio
        // del entrenamiento publicaba el estado antiguo y le deshacía en
        // pantalla lo que acababa de hacer.
        let merged = applyingPendingActions(to: items)

        return WorkoutSession(
            workoutId: workoutId,
            workoutName: workoutName,
            startedAt: startedAt,
            currentIndex: resolvedCurrentIndex(
                items: merged,
                workoutId: workoutId,
                payloadIndex: call.getInt("currentIndex") ?? 0
            ),
            items: merged
        )
    }

    /// Aplica sobre la lista de la app las acciones que la notificación
    /// todavía no ha podido sincronizar. Solo cuenta la última de cada serie.
    private func applyingPendingActions(to items: [WorkoutSetItem]) -> [WorkoutSetItem] {
        let pending = WorkoutActivityStore.loadPending()
        guard !pending.isEmpty else { return items }

        var lastBySet: [String: PendingSetAction] = [:]
        for action in pending { lastBySet[action.setId] = action }

        WorkoutActivityStore.trace("fusionadas \(lastBySet.count) acciones sin sincronizar")

        var merged = items
        for index in merged.indices {
            guard let action = lastBySet[merged[index].setId] else { continue }
            merged[index].doned = action.doned
            merged[index].reps = action.reps
            merged[index].weight = action.weight
            merged[index].rir = action.rir
        }
        return merged
    }

    /// La app manda la primera serie pendiente según su estado, pero el usuario
    /// puede haber navegado con las flechas a otra: se respeta su posición
    /// mientras esa serie siga existiendo y sin marcar.
    private func resolvedCurrentIndex(items: [WorkoutSetItem], workoutId: String, payloadIndex: Int) -> Int {
        if let previous = WorkoutActivityStore.loadSession(),
           previous.workoutId == workoutId,
           let setId = previous.currentItem?.setId,
           let index = items.firstIndex(where: { $0.setId == setId }),
           !items[index].doned {
            return index
        }
        if let pending = items.firstIndex(where: { !$0.doned }) { return pending }
        return min(max(payloadIndex, 0), max(items.count - 1, 0))
    }

    /// Cambia las URLs por las claves de las miniaturas **que ya están
    /// guardadas**. Sin red: es lo que se publica al instante.
    private func cachedImages(for session: WorkoutSession) -> WorkoutSession {
        var updated = session
        for index in updated.items.indices {
            guard let remote = updated.items[index].imageKey, remote.hasPrefix("http") else { continue }
            let key = Self.stableKey(for: remote)
            updated.items[index].imageKey = WorkoutActivityStore.hasImage(forKey: key) ? key : nil
        }
        return updated
    }

    /// Descarga las miniaturas que falten y, si alguna llega, refresca la
    /// notificación. Va fuera del camino crítico: la tarjeta ya está en
    /// pantalla y la imagen aparece cuando esté.
    ///
    /// `session` conserva las URLs originales (la sesión guardada ya no).
    private func downloadImages(for session: WorkoutSession) {
        let remotes = Set(session.items.compactMap { item -> String? in
            guard let value = item.imageKey, value.hasPrefix("http") else { return nil }
            return value
        })
        let pending = remotes.filter { !WorkoutActivityStore.hasImage(forKey: Self.stableKey(for: $0)) }
        guard !pending.isEmpty else { return }

        Task.detached(priority: .utility) {
            // En paralelo y una sola vez por URL: varias series comparten
            // ejercicio, antes se descargaba en serie una por serie.
            await withTaskGroup(of: Void.self) { group in
                for remote in pending {
                    guard let url = URL(string: remote) else { continue }
                    group.addTask { await Self.downloadThumbnail(from: url, key: Self.stableKey(for: remote)) }
                }
            }

            guard var current = WorkoutActivityStore.loadSession(),
                  current.workoutId == session.workoutId else { return }

            // Las claves se copian por setId: la sesión puede haber cambiado
            // mientras se descargaba (el usuario sigue entrenando).
            var keysBySet: [String: String] = [:]
            for item in session.items {
                guard let remote = item.imageKey, remote.hasPrefix("http") else { continue }
                let key = Self.stableKey(for: remote)
                if WorkoutActivityStore.hasImage(forKey: key) { keysBySet[item.setId] = key }
            }

            var changed = false
            for index in current.items.indices {
                guard let key = keysBySet[current.items[index].setId],
                      current.items[index].imageKey != key else { continue }
                current.items[index].imageKey = key
                changed = true
            }
            guard changed else { return }

            if #available(iOS 16.2, *) {
                await WorkoutSessionMutator.shared.replace(with: current)
                await WorkoutLiveActivityController.refresh(session: current)
            }
        }
    }

    /// El widget no tiene red: la app descarga la imagen, la reescala a
    /// miniatura y guarda los BYTES en el store compartido. En el item queda
    /// solo la clave — el ContentState de una Live Activity tiene 4 KB de
    /// límite, así que la imagen no puede viajar ahí dentro.
    private static func downloadThumbnail(from url: URL, key: String) async {
        var request = URLRequest(url: url)
        // Tope corto: la notificación no puede depender de la red del gimnasio.
        request.timeoutInterval = 6
        guard let (data, _) = try? await URLSession.shared.data(for: request),
              // UIImage(data:) de un GIF devuelve el primer frame, que es
              // justo lo que necesita un widget (no anima).
              let image = UIImage(data: data),
              let thumbnail = Self.thumbnail(from: image, maxSide: 120),
              let png = thumbnail.pngData() else { return }
        WorkoutActivityStore.saveImageData(png, forKey: key)
    }

    /// hashValue de Swift lleva semilla aleatoria por proceso: la clave
    /// cambiaría en cada arranque y se acumularían miniaturas huérfanas.
    /// djb2 es estable entre ejecuciones (y no desborda como abs(Int.min)).
    private static func stableKey(for url: String) -> String {
        var hash: UInt64 = 5381
        for byte in url.utf8 {
            hash = (hash &* 33) &+ UInt64(byte)
        }
        return String(hash, radix: 36)
    }

    /// Los widgets tienen un presupuesto de memoria muy corto: se baja la
    /// imagen a 120 px de lado antes de guardarla.
    private static func thumbnail(from image: UIImage, maxSide: CGFloat) -> UIImage? {
        let longest = max(image.size.width, image.size.height)
        guard longest > 0 else { return nil }
        if longest <= maxSide { return image }

        let scale = maxSide / longest
        let size = CGSize(width: image.size.width * scale, height: image.size.height * scale)
        let renderer = UIGraphicsImageRenderer(size: size)
        return renderer.image { _ in
            image.draw(in: CGRect(origin: .zero, size: size))
        }
    }
}
