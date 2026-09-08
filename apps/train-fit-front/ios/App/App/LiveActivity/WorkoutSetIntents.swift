import AppIntents
import Foundation

// Botones interactivos de la Live Activity (iOS 17+). LiveActivityIntent
// garantiza que el sistema ejecuta esto en el proceso de la app, no en el
// del widget, así que puede tocar el App Group y refrescar la actividad.

@available(iOS 17.0, *)
public struct AdjustSetValueIntent: LiveActivityIntent {
    public static var title: LocalizedStringResource = "Ajustar valor de la serie"
    public static var isDiscoverable: Bool = false

    @Parameter(title: "Campo")
    public var field: String

    @Parameter(title: "Incremento")
    public var delta: Double

    public init() {
        self.field = "reps"
        self.delta = 0
    }

    public init(field: String, delta: Double) {
        self.field = field
        self.delta = delta
    }

    public func perform() async throws -> some IntentResult {
        guard var session = WorkoutActivityStore.loadSession(),
              session.items.indices.contains(session.currentIndex) else {
            return .result()
        }

        var item = session.items[session.currentIndex]
        switch field {
        case "reps":
            item.reps = max(0, item.reps + Int(delta))
        case "weight":
            // Redondeo a 2 decimales: 12.5 - 1 en coma flotante deja
            // 11.499999999999998 y el widget lo pintaría tal cual.
            item.weight = max(0, ((item.weight + delta) * 100).rounded() / 100)
        case "rir":
            item.rir = max(0, item.rir + Int(delta))
        default:
            break
        }

        session.items[session.currentIndex] = item
        WorkoutActivityStore.saveSession(session)

        if #available(iOS 16.2, *) {
            await WorkoutLiveActivityController.refresh(session: session)
        }
        return .result()
    }
}

@available(iOS 17.0, *)
public struct CompleteSetIntent: LiveActivityIntent {
    public static var title: LocalizedStringResource = "Marcar serie como hecha"
    public static var isDiscoverable: Bool = false

    public init() {}

    public func perform() async throws -> some IntentResult {
        guard var session = WorkoutActivityStore.loadSession(),
              let item = session.currentItem else {
            return .result()
        }

        // La app no está viva aquí: se deja anotada la serie para que la
        // sincronice con el backend en cuanto vuelva a primer plano.
        WorkoutActivityStore.appendPending(
            PendingSetAction(
                setId: item.setId,
                reps: item.reps,
                weight: item.weight,
                rir: item.rir,
                skipped: false,
                at: Date()
            )
        )

        session.currentIndex += 1
        WorkoutActivityStore.saveSession(session)

        if #available(iOS 16.2, *) {
            if session.currentItem == nil {
                await WorkoutLiveActivityController.end()
                WorkoutActivityStore.saveSession(nil)
            } else {
                await WorkoutLiveActivityController.refresh(session: session)
            }
        }
        return .result()
    }
}
