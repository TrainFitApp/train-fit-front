import AppIntents
import Foundation

// Botones de la notificación (iOS 17+). LiveActivityIntent garantiza que el
// sistema ejecuta esto en el proceso de la app, no en el del widget: es la
// única forma de poder actualizar la Live Activity desde un botón.
//
// Steppers de KG/REPS/RIR y check. Las flechas de serie (‹ ›) y ejercicio
// (« ») estaban aquí y se han quitado: navegar obligaba a guardar un cursor
// que solo conocía la tarjeta, y cuando iOS no conseguía repintar (app
// levantada en segundo plano) ese cursor y lo que se veía dejaban de
// coincidir. La tarjeta se queda en la serie que toca y punto.

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
            // El índice se captura una vez: es derivado (la primera serie sin
            // hacer) y leerlo dos veces invita a que se mueva a media mutación.
            let index = session.currentIndex
            guard session.items.indices.contains(index) else { return }

            var item = session.items[index]
            switch field {
            case "weight":
                // Redondeo a 2 decimales: 12.5 - 1 en coma flotante deja
                // 11.499999999999998 y el widget lo pintaría tal cual.
                item.weight = max(0, ((item.weight + delta) * 100).rounded() / 100)
            case "reps":
                item.reps = max(0, item.reps + Int(delta))
            case "rir":
                item.rir = Self.steppedRir(item.rir, delta: Int(delta))
            default:
                break
            }

            if item.doned {
                // Corregir una serie ya hecha: se anota para la app como
                // cualquier marcado. Sin flechas la tarjeta no enseña series
                // hechas, pero el caso se mantiene por si la app republica una
                // marcada mientras la tarjeta la estaba enseñando.
                WorkoutActivityStore.appendPending(
                    PendingSetAction(
                        setId: item.setId,
                        reps: item.reps,
                        weight: item.weight,
                        rir: item.rir,
                        doned: true,
                        skipped: false,
                        at: Date()
                    )
                )
            } else {
                item.edited = true
            }
            session.items[index] = item
        }
        return .result()
    }

    /// RIR del stepper: «—» (sin dato) → 0 → 1 … 10 al subir; al bajar,
    /// 1 → 0 → fallo (-1) → «—». Así se puede dejar sin registrar, que es
    /// distinto de un 0 real.
    static func steppedRir(_ value: Int?, delta: Int) -> Int? {
        guard let value = value else { return delta > 0 ? 0 : nil }
        if delta > 0 { return value < 0 ? 0 : min(value + delta, 10) }
        if value > 0 { return value - 1 }
        return value == 0 ? -1 : nil
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
            let index = session.currentIndex
            guard let item = session.currentItem else { return }

            // Interruptor: si la serie ya está hecha, la desmarca. Sin flechas
            // la tarjeta solo enseña series pendientes, así que en la práctica
            // siempre marca; desmarcar se hace en la app.
            let doned = !item.doned
            session.items[index].doned = doned
            session.items[index].edited = false

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

            // No hay que mover nada: `currentIndex` es la primera serie sin
            // hacer, así que marcarla ya avanza la tarjeta.
        }
        return .result()
    }
}
