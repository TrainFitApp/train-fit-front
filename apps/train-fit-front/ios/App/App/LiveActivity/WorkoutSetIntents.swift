import AppIntents
import Foundation

// Botones de la notificación (iOS 17+). LiveActivityIntent garantiza que el
// sistema ejecuta esto en el proceso de la app, no en el del widget: es la
// única forma de poder actualizar la Live Activity desde un botón.
//
// PASO 4: check, steppers y flechas de serie/ejercicio.

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
        guard #available(iOS 16.2, *) else { return .result() }

        let field = self.field
        let delta = self.delta
        await WorkoutSessionMutator.shared.apply(signature: "adjust:\(field):\(delta)") { session in
            guard session.items.indices.contains(session.currentIndex) else { return }

            var item = session.items[session.currentIndex]
            switch field {
            case "weight":
                // Redondeo a 2 decimales: 12.5 - 1 en coma flotante deja
                // 11.499999999999998 y el widget lo pintaría tal cual.
                item.weight = max(0, ((item.weight + delta) * 100).rounded() / 100)
            case "reps":
                item.reps = max(0, item.reps + Int(delta))
            case "rir":
                item.rir = max(0, item.rir + Int(delta))
            default:
                break
            }
            session.items[session.currentIndex] = item
        }
        return .result()
    }
}

@available(iOS 17.0, *)
public struct CompleteSetIntent: LiveActivityIntent {
    public static var title: LocalizedStringResource = "Marcar o desmarcar la serie"
    public static var isDiscoverable: Bool = false

    public init() {}

    public func perform() async throws -> some IntentResult {
        guard #available(iOS 16.2, *) else { return .result() }

        await WorkoutSessionMutator.shared.apply(signature: "complete") { session in
            guard let item = session.currentItem else { return }

            // Interruptor: si la serie ya está hecha, la desmarca.
            let doned = !item.doned
            session.items[session.currentIndex].doned = doned

            // La app no está viva aquí: la serie queda anotada para que la
            // sincronice con el backend en cuanto vuelva a primer plano.
            WorkoutActivityStore.appendPending(
                PendingSetAction(
                    setId: item.setId,
                    reps: item.reps,
                    weight: item.weight,
                    rir: item.rir,
                    doned: doned,
                    skipped: false,
                    at: Date()
                )
            )

            // Al marcar, a la siguiente serie pendiente (saltando las hechas).
            // Al desmarcar se queda, para que se vea el check apagado.
            if doned, let next = session.nextPendingIndex() {
                session.currentIndex = next
            }
        }
        return .result()
    }
}

/// Flechas de la notificación: las exteriores cambian de ejercicio (a su
/// primera serie), las interiores de serie dentro del ejercicio.
@available(iOS 17.0, *)
public struct NavigateSetIntent: LiveActivityIntent {
    public static var title: LocalizedStringResource = "Cambiar de serie o ejercicio"
    public static var isDiscoverable: Bool = false

    @Parameter(title: "Ámbito")
    public var scope: String

    @Parameter(title: "Dirección")
    public var step: Int

    public init() {
        self.scope = "set"
        self.step = 0
    }

    public init(scope: String, step: Int) {
        self.scope = scope
        self.step = step
    }

    public func perform() async throws -> some IntentResult {
        guard #available(iOS 16.2, *) else { return .result() }

        let scope = self.scope
        let step = self.step
        await WorkoutSessionMutator.shared.apply(signature: "navigate:\(scope):\(step)") { session in
            let target = scope == "exercise"
                ? session.indexForExerciseStep(step)
                : session.indexForSetStep(step)
            guard let target = target else { return }
            session.currentIndex = target
        }
        return .result()
    }
}
