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
            // Las miniaturas salen de las imágenes que van dentro de la app:
            // sin red, la tarjeta se abre ya con ellas.
            let presence = await WorkoutSessionMutator.shared.sync(
                self.bundledImages(for: incoming),
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
                self.bundledImages(for: incoming),
                labels: labels,
                open: mayReopen
            )
            switch presence {
            case .opened, .failed:
                Self.lastReopen = Date()
            case .reused, .missing:
                break
            }
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
                // Aquí es la ruta de la imagen dentro de la app; bundledImages
                // la sustituye por la clave de la miniatura guardada.
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

    /// Cambia las rutas de las imágenes por las claves de sus miniaturas y
    /// crea las que falten. Las imágenes van dentro de la app
    /// (`public/assets/exercises/`): sin red, la tarjeta sale ya con ellas.
    private func bundledImages(for session: WorkoutSession) -> WorkoutSession {
        var updated = session
        for index in updated.items.indices {
            guard let path = updated.items[index].imageKey, Self.isBundledImage(path) else { continue }
            let key = Self.stableKey(for: path)
            if !WorkoutActivityStore.hasImage(forKey: key) {
                Self.saveThumbnail(ofBundled: path, key: key)
            }
            updated.items[index].imageKey = WorkoutActivityStore.hasImage(forKey: key) ? key : nil
        }
        return updated
    }

    /// Ruta de la web de la app ("assets/exercises/x.webp"), no la clave de
    /// una miniatura ya guardada (esas son alfanuméricas, sin barras).
    private static func isBundledImage(_ value: String) -> Bool {
        value.hasPrefix("assets/")
    }

    /// El widget no lee la carpeta de la app: se reescala la imagen a
    /// miniatura y se guardan los BYTES en el store compartido. En el item
    /// queda solo la clave — el ContentState de una Live Activity tiene 4 KB
    /// de límite, así que la imagen no puede viajar ahí dentro.
    private static func saveThumbnail(ofBundled path: String, key: String) {
        guard let webRoot = Bundle.main.url(forResource: "public", withExtension: nil),
              let data = try? Data(contentsOf: webRoot.appendingPathComponent(path)),
              // UIImage(data:) de un WebP animado devuelve el primer frame,
              // que es justo lo que necesita un widget (no anima).
              let image = UIImage(data: data),
              let thumbnail = Self.thumbnail(from: image, maxSide: 120),
              let png = thumbnail.pngData() else { return }
        WorkoutActivityStore.saveImageData(png, forKey: key)
    }

    /// hashValue de Swift lleva semilla aleatoria por proceso: la clave
    /// cambiaría en cada arranque y se acumularían miniaturas huérfanas.
    /// djb2 es estable entre ejecuciones (y no desborda como abs(Int.min)).
    private static func stableKey(for source: String) -> String {
        var hash: UInt64 = 5381
        for byte in source.utf8 {
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
