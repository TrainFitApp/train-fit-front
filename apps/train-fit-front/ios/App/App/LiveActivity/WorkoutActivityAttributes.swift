import ActivityKit
import Foundation

@available(iOS 16.2, *)
public struct WorkoutActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        public var exerciseName: String
        public var exerciseIndex: Int
        public var totalExercises: Int
        public var setIndex: Int
        public var totalSets: Int
        public var reps: Int
        public var weight: Double
        public var rir: Int
        public var doned: Bool
        public var imageKey: String?
        public var canPrevSet: Bool
        public var canNextSet: Bool
        public var canPrevExercise: Bool
        public var canNextExercise: Bool
        /// Progreso de todo el entrenamiento, para la barra de la tarjeta.
        public var doneCount: Int
        public var totalCount: Int

        public init(
            exerciseName: String,
            exerciseIndex: Int,
            totalExercises: Int,
            setIndex: Int,
            totalSets: Int,
            reps: Int,
            weight: Double,
            rir: Int,
            doned: Bool,
            imageKey: String?,
            canPrevSet: Bool,
            canNextSet: Bool,
            canPrevExercise: Bool,
            canNextExercise: Bool,
            doneCount: Int,
            totalCount: Int
        ) {
            self.exerciseName = exerciseName
            self.exerciseIndex = exerciseIndex
            self.totalExercises = totalExercises
            self.setIndex = setIndex
            self.totalSets = totalSets
            self.reps = reps
            self.weight = weight
            self.rir = rir
            self.doned = doned
            self.imageKey = imageKey
            self.canPrevSet = canPrevSet
            self.canNextSet = canNextSet
            self.canPrevExercise = canPrevExercise
            self.canNextExercise = canNextExercise
            self.doneCount = doneCount
            self.totalCount = totalCount
        }

        /// Estado pintado por el widget: la serie en curso más qué flechas de
        /// navegación tienen destino (las que no, salen apagadas).
        public init?(session: WorkoutSession) {
            guard let item = session.currentItem else { return nil }
            self.init(
                exerciseName: item.exerciseName,
                exerciseIndex: item.exerciseIndex,
                totalExercises: item.totalExercises,
                setIndex: item.setIndex,
                totalSets: item.totalSets,
                reps: item.reps,
                weight: item.weight,
                rir: item.rir,
                doned: item.doned,
                imageKey: item.imageKey,
                canPrevSet: session.indexForSetStep(-1) != nil,
                canNextSet: session.indexForSetStep(1) != nil,
                canPrevExercise: session.indexForExerciseStep(-1) != nil,
                canNextExercise: session.indexForExerciseStep(1) != nil,
                doneCount: session.items.filter { $0.doned }.count,
                totalCount: session.items.count
            )
        }
    }

    public var workoutName: String
    public var startedAt: Date

    public init(workoutName: String, startedAt: Date) {
        self.workoutName = workoutName
        self.startedAt = startedAt
    }
}

@available(iOS 16.2, *)
public enum WorkoutLiveActivityController {
    /// Sincroniza la Live Activity en curso con la sesión guardada. Si ya no
    /// quedan sets pendientes, la cierra.
    /// Lista de actividades vivas, esperando a que ActivityKit la publique.
    ///
    /// Cuando el proceso acaba de despertar (que es siempre: el sistema levanta
    /// la app para ejecutar los botones) leerla en seco devuelve vacío con la
    /// tarjeta delante de los ojos. Ese falso vacío dejaba de publicar o abría
    /// una tarjeta duplicada.
    public static func liveActivities() async -> [Activity<WorkoutActivityAttributes>] {
        for attempt in 0..<5 {
            let activities = Activity<WorkoutActivityAttributes>.activities
            if !activities.isEmpty { return activities }
            if attempt < 4 { try? await Task.sleep(nanoseconds: 120_000_000) }
        }
        return []
    }

    public static func refresh(session: WorkoutSession) async {
        var session = session
        if session.currentItem == nil {
            // Índice fuera de rango: se recoloca en la primera serie pendiente
            // en vez de cerrar la notificación por una incoherencia pasajera.
            session.currentIndex = session.firstPendingIndex ?? 0
            WorkoutActivityStore.saveSession(session)
        }

        guard let state = WorkoutActivityAttributes.ContentState(session: session) else {
            WorkoutActivityStore.trace("refresh sin estado: se cierra")
            await end()
            return
        }

        let activities = await liveActivities()
        guard !activities.isEmpty else {
            WorkoutActivityStore.trace("refresh sin notificacion viva")
            return
        }

        for activity in activities {
            await activity.update(ActivityContent(state: state, staleDate: nil))
        }
        WorkoutActivityStore.trace("publicado serie=\(state.setIndex)/\(state.totalSets) ej=\(state.exerciseIndex) hechas=\(state.doneCount)/\(state.totalCount)")
    }

    /// Reenvía el contenido actual sin cambiarlo. Si un botón termina sin
    /// publicar nada, el sistema deja la notificación en estado de espera:
    /// esto la devuelve a la vida sin tocar el estado.
    public static func nudge() async {
        for activity in Activity<WorkoutActivityAttributes>.activities {
            await activity.update(ActivityContent(state: activity.content.state, staleDate: nil))
        }
    }

    public static func end() async {
        WorkoutActivityStore.trace("end() vivas=\(Activity<WorkoutActivityAttributes>.activities.count)")
        for activity in Activity<WorkoutActivityAttributes>.activities {
            await activity.end(nil, dismissalPolicy: .immediate)
        }
    }

    @discardableResult
    public static func start(session: WorkoutSession) throws -> String? {
        guard let state = WorkoutActivityAttributes.ContentState(session: session) else { return nil }

        let authorization = ActivityAuthorizationInfo()
        WorkoutActivityStore.trace("permiso actividades=\(authorization.areActivitiesEnabled)")

        let attributes = WorkoutActivityAttributes(
            workoutName: session.workoutName,
            startedAt: session.startedAt
        )
        let activity = try Activity.request(
            attributes: attributes,
            content: ActivityContent(state: state, staleDate: nil),
            pushType: nil
        )

        // Quién cierra la tarjeta: el sistema la puede dar por terminada, el
        // usuario la puede descartar y nosotros la cerramos al acabar el
        // entrenamiento. Sin esto no hay forma de distinguirlo.
        observeState(of: activity)

        return activity.id
    }

    private static func observeState(of activity: Activity<WorkoutActivityAttributes>) {
        Task {
            for await state in activity.activityStateUpdates {
                WorkoutActivityStore.trace("tarjeta \(activity.id.prefix(8)) pasa a \(state)")
            }
        }
        Task {
            for await enabled in ActivityAuthorizationInfo().activityEnablementUpdates {
                WorkoutActivityStore.trace("permiso actividades cambia a \(enabled)")
            }
        }
    }
}

/// Cola serie para todo lo que toca la sesión compartida.
///
/// El sistema puede lanzar dos pulsaciones de la notificación a la vez, y el
/// patrón leer-modificar-guardar sobre el App Group perdía una de las dos (la
/// notificación parecía quedarse pillada). Aquí cada cambio espera al
/// anterior, así que el orden de publicación es el mismo que el de los toques.
@available(iOS 16.2, *)
public actor WorkoutSessionMutator {
    public static let shared = WorkoutSessionMutator()

    private var tail: Task<Void, Never>?

    /// Aplica un cambio sobre la sesión guardada y publica el resultado.
    /// `signature` identifica la pulsación para descartar reentregas.
    public func apply(
        signature: String,
        _ change: @escaping @Sendable (inout WorkoutSession) -> Void
    ) async {
        await enqueue {
            let startedAt = Date()
            guard var session = WorkoutActivityStore.loadSession() else {
                // Sin sesión el botón no puede hacer nada; se refresca igual
                // para que no se quede girando.
                WorkoutActivityStore.trace("boton \(signature) sin sesion guardada")
                await WorkoutLiveActivityController.nudge()
                return
            }

            WorkoutActivityStore.trace("boton \(signature)")
            guard !WorkoutActivityStore.isDuplicate(signature) else {
                WorkoutActivityStore.trace("boton \(signature) descartado por repetido")
                // Reentrega de la misma pulsación: no se toca el estado, pero
                // se republica para que el botón deje de girar.
                await WorkoutLiveActivityController.refresh(session: session)
                return
            }

            change(&session)
            WorkoutActivityStore.saveSession(session)

            if session.allDone {
                await WorkoutLiveActivityController.end()
                WorkoutActivityStore.saveSession(nil)
                return
            }
            await WorkoutLiveActivityController.refresh(session: session)

            // Cuánto ha costado el botón de verdad. Si aquí sale poco y el
            // spinner dura segundos, el retraso es del sistema levantando la
            // app, no del trabajo que hacemos.
            let millis = Int(Date().timeIntervalSince(startedAt) * 1000)
            WorkoutActivityStore.trace("boton \(signature) resuelto en \(millis) ms")
        }
    }

    /// Sustituye la sesión completa: la manda la app, que es la fuente de
    /// verdad, y no debe pisar un cambio de la notificación a medias.
    public func replace(with session: WorkoutSession) async {
        await enqueue { WorkoutActivityStore.saveSession(session) }
    }

    private func enqueue(_ work: @escaping @Sendable () async -> Void) async {
        let previous = tail
        let task = Task {
            await previous?.value
            await work()
        }
        tail = task
        await task.value
    }
}
