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
        guard let incoming = buildSession(from: call) else {
            WorkoutActivityStore.trace("start rechazado: faltan datos")
            call.reject("Faltan datos de la sesión")
            return
        }
        let labels = buildLabels(from: call)
        WorkoutActivityStore.trace("start workout=\(incoming.workoutId) series=\(incoming.items.count)")

        Task {
            // Se abre con las miniaturas que ya estén guardadas; las que falten
            // se descargan después, fuera del camino crítico.
            let presence = await WorkoutSessionMutator.shared.sync(
                self.cachedImages(for: incoming),
                labels: labels,
                open: true
            )

            switch presence {
            case .reused, .opened:
                call.resolve(["started": true, "deferred": false])
            case .missing:
                call.resolve(["started": false, "deferred": false])
            case .failed(let message):
                // ActivityKit solo deja abrir una tarjeta con la app delante.
                // Si el sistema ha despertado la app en segundo plano (un botón
                // de la notificación) y no había tarjeta, se pospone: la app la
                // vuelve a pedir al pasar a primer plano.
                let background = await MainActor.run { UIApplication.shared.applicationState != .active }
                if background {
                    call.resolve(["started": false, "deferred": true])
                } else {
                    call.reject("No se pudo iniciar la Live Activity: \(message)")
                }
            }

            self.downloadImages(for: incoming)
        }
    }

    @objc func update(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else {
            call.resolve()
            return
        }
        guard let incoming = buildSession(from: call) else {
            call.reject("Faltan datos de la sesión")
            return
        }
        let labels = buildLabels(from: call)

        // Si la tarjeta ya no está (la descartó el usuario o la cerró el
        // sistema) y el entrenamiento sigue, se reabre. Con freno, porque
        // pedir actividades en bucle agota el presupuesto de ActivityKit y a
        // partir de ahí no aparece ninguna.
        let mayReopen = Date().timeIntervalSince(Self.lastReopen) > 30

        Task {
            let presence = await WorkoutSessionMutator.shared.sync(
                self.cachedImages(for: incoming),
                labels: labels,
                open: mayReopen
            )
            switch presence {
            case .opened, .failed:
                Self.lastReopen = Date()
            case .reused, .missing:
                break
            }
            self.downloadImages(for: incoming)
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
            // Por la cola: un botón a medias volvía a guardar la sesión
            // recién borrada y la siguiente tarjeta heredaba su posición.
            await WorkoutSessionMutator.shared.run {
                await WorkoutLiveActivityController.end()
                WorkoutActivityStore.saveSession(nil)
            }
            call.resolve()
        }
    }

    @objc func getPendingActions(_ call: CAPPluginCall) {
        let actions = WorkoutActivityStore.loadPending()
        let formatter = ISO8601DateFormatter()
        let payload: [[String: Any]] = actions.map { action in
            [
                "id": action.id,
                "setId": action.setId,
                "reps": action.reps,
                "weight": action.weight,
                // NSNull para que JS reciba `null` («—»), no un 0 inventado.
                "rir": action.rir.map { $0 as Any } ?? NSNull(),
                "doned": action.doned,
                "skipped": action.skipped,
                "at": formatter.string(from: action.at)
            ]
        }
        call.resolve(["actions": payload])
    }

    /// Con `ids` borra solo esas acciones (las que la app ya volcó); sin
    /// ellos, todas. Va por la cola de los botones: un check pulsado mientras
    /// la app volcaba se perdía al vaciar la lista entera.
    @objc func clearPendingActions(_ call: CAPPluginCall) {
        let ids = (call.getArray("ids") as? [String]).map(Set.init)
        guard #available(iOS 16.2, *) else {
            if let ids = ids { WorkoutActivityStore.removePending(ids: ids) } else { WorkoutActivityStore.clearPending() }
            call.resolve()
            return
        }
        Task {
            await WorkoutSessionMutator.shared.run {
                if let ids = ids {
                    WorkoutActivityStore.removePending(ids: ids)
                } else {
                    WorkoutActivityStore.clearPending()
                }
            }
            call.resolve()
        }
    }

    // MARK: - Helpers

    /// Entrenamiento tal y como lo manda la app. La fusión con lo que solo
    /// sabe la notificación (acciones sin sincronizar, borradores, serie en
    /// curso) se hace después, dentro de la cola: ver `WorkoutSession.merging`.
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
                // Ausente o null = sin dato.
                rir: (raw["rir"] as? NSNumber)?.intValue,
                doned: raw["doned"] as? Bool ?? false,
                // Aquí es la URL remota; cachedImages/downloadImages la
                // sustituyen por la clave de la miniatura guardada.
                imageKey: raw["imageUrl"] as? String
            )
        }

        guard !items.isEmpty else { return nil }

        // Sin `startedAt` (workouts antiguos) se conserva el de la sesión
        // guardada de este mismo workout: inventar uno nuevo en cada arranque
        // de la app hacía que la tarjeta pareciera de otra sesión y se
        // cerrara.
        let startedAt: Date
        if let startedAtMs = call.getDouble("startedAt") {
            startedAt = Date(timeIntervalSince1970: startedAtMs / 1000)
        } else if let previous = WorkoutActivityStore.loadSession(), previous.workoutId == workoutId {
            startedAt = previous.startedAt
        } else {
            startedAt = Date()
        }

        return WorkoutSession(
            workoutId: workoutId,
            workoutName: workoutName,
            startedAt: startedAt,
            items: items
        )
    }

    private func buildLabels(from call: CAPPluginCall) -> WorkoutActivityLabels? {
        guard let raw = call.getObject("labels") else { return nil }
        let fallback = WorkoutActivityLabels.fallback
        return WorkoutActivityLabels(
            exercise: raw["exercise"] as? String ?? fallback.exercise,
            set: raw["set"] as? String ?? fallback.set,
            done: raw["done"] as? String ?? fallback.done,
            fail: raw["fail"] as? String ?? fallback.fail,
            weight: raw["weight"] as? String ?? fallback.weight,
            reps: raw["reps"] as? String ?? fallback.reps,
            rir: raw["rir"] as? String ?? fallback.rir
        )
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

            // Las claves se copian por setId sobre la sesión del momento: el
            // usuario ha podido seguir entrenando mientras se descargaba.
            var keysBySet: [String: String] = [:]
            for item in session.items {
                guard let remote = item.imageKey, remote.hasPrefix("http") else { continue }
                let key = Self.stableKey(for: remote)
                if WorkoutActivityStore.hasImage(forKey: key) { keysBySet[item.setId] = key }
            }
            guard !keysBySet.isEmpty else { return }

            if #available(iOS 16.2, *) {
                await WorkoutSessionMutator.shared.applyImageKeys(keysBySet, workoutId: session.workoutId)
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
