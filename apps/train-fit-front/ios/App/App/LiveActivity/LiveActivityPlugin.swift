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
            call.reject("Faltan datos de la sesión")
            return
        }

        Task {
            let resolved = await self.resolveImages(for: session)
            WorkoutActivityStore.saveSession(resolved)

            // Una sola actividad viva: si ya había una (p.ej. de otro
            // entrenamiento sin cerrar), se cierra antes de abrir la nueva.
            await WorkoutLiveActivityController.end()

            do {
                let id = try WorkoutLiveActivityController.start(session: resolved)
                call.resolve(["started": id != nil, "activityId": id ?? ""])
            } catch {
                call.reject("No se pudo iniciar la Live Activity: \(error.localizedDescription)")
            }
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

        Task {
            let resolved = await self.resolveImages(for: session)
            WorkoutActivityStore.saveSession(resolved)
            if Activity<WorkoutActivityAttributes>.activities.isEmpty {
                // La actividad pudo cerrarse sola (usuario la descartó o
                // terminó el workout desde el widget): se relanza.
                try? WorkoutLiveActivityController.start(session: resolved)
            } else {
                await WorkoutLiveActivityController.refresh(session: resolved)
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
                // Aquí es la URL remota; resolveImages la sustituye por la
                // clave de la miniatura ya guardada.
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

        return WorkoutSession(
            workoutId: workoutId,
            workoutName: workoutName,
            startedAt: startedAt,
            currentIndex: call.getInt("currentIndex") ?? 0,
            items: items
        )
    }

    /// El widget no tiene red: la app descarga la imagen, la reescala a
    /// miniatura y guarda los BYTES en el store compartido. En el item queda
    /// solo la clave — el ContentState de una Live Activity tiene 4 KB de
    /// límite, así que la imagen no puede viajar ahí dentro.
    private func resolveImages(for session: WorkoutSession) async -> WorkoutSession {
        var updated = session
        for index in updated.items.indices {
            guard let remote = updated.items[index].imageKey,
                  remote.hasPrefix("http"),
                  let url = URL(string: remote) else { continue }

            let key = Self.stableKey(for: remote)
            if WorkoutActivityStore.hasImage(forKey: key) {
                updated.items[index].imageKey = key
                continue
            }

            do {
                let (data, _) = try await URLSession.shared.data(from: url)
                // UIImage(data:) de un GIF devuelve el primer frame, que es
                // justo lo que necesita un widget (no anima).
                if let image = UIImage(data: data),
                   let thumbnail = Self.thumbnail(from: image, maxSide: 120),
                   let png = thumbnail.pngData() {
                    WorkoutActivityStore.saveImageData(png, forKey: key)
                    updated.items[index].imageKey = key
                } else {
                    updated.items[index].imageKey = nil
                }
            } catch {
                updated.items[index].imageKey = nil
            }
        }
        return updated
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
