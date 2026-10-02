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
        /// `nil` = sin dato («—»), `-1` = fallo.
        public var rir: Int?
        public var doned: Bool
        public var imageKey: String?
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
            rir: Int?,
            doned: Bool,
            imageKey: String?,
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
            self.doneCount = doneCount
            self.totalCount = totalCount
        }

        /// Estado pintado por el widget: la serie en curso.
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
                doneCount: session.doneCount,
                totalCount: session.items.count
            )
        }
    }

    public var workoutName: String
    public var startedAt: Date
    /// Opcionales: las tarjetas abiertas por versiones anteriores no los
    /// traen y el decoder sintetizado las descartaría.
    public var workoutId: String?
    public var labels: WorkoutActivityLabels?

    public init(workoutName: String, startedAt: Date, workoutId: String?, labels: WorkoutActivityLabels?) {
        self.workoutName = workoutName
        self.startedAt = startedAt
        self.workoutId = workoutId
        self.labels = labels
    }

    /// La tarjeta pertenece a esta sesión de entrenamiento (mismo workout y
    /// mismo arranque, que es lo que pinta el cronómetro).
    public func belongs(to session: WorkoutSession) -> Bool {
        (workoutId == nil || workoutId == session.workoutId)
            && abs(startedAt.timeIntervalSince(session.startedAt)) < 1
    }
}

/// Textos de la tarjeta en el idioma de la app (no en el del sistema: la app
/// tiene su propio selector de idioma). Viajan en los atributos porque no
/// cambian durante el entrenamiento y el estado tiene un límite de 4 KB.
public struct WorkoutActivityLabels: Codable, Hashable, Sendable {
    public var exercise: String
    public var set: String
    public var done: String
    public var fail: String
    public var weight: String
    public var reps: String
    public var rir: String

    public init(exercise: String, set: String, done: String, fail: String, weight: String, reps: String, rir: String) {
        self.exercise = exercise
        self.set = set
        self.done = done
        self.fail = fail
        self.weight = weight
        self.reps = reps
        self.rir = rir
    }

    /// Solo para tarjetas abiertas por versiones que no mandaban los textos.
    public static let fallback = WorkoutActivityLabels(
        exercise: "Ejercicio",
        set: "Serie",
        done: "hecha",
        fail: "Fallo",
        weight: "KG",
        reps: "REPS",
        rir: "RIR"
    )
}

@available(iOS 16.2, *)
public enum WorkoutLiveActivityController {
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

    /// Sincroniza la Live Activity en curso con la sesión guardada. Si ya no
    /// quedan sets pendientes, la cierra.
    public static func refresh(session: WorkoutSession) async {
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

    public enum Presence: Sendable, Equatable {
        /// Ya había tarjeta de esta sesión: se ha refrescado.
        case reused
        /// No había y se ha abierto una nueva.
        case opened
        /// No hay tarjeta y no se ha pedido abrirla.
        case missing
        /// ActivityKit ha rechazado abrirla (p. ej. app en segundo plano).
        case failed(String)
    }

    /// Deja una sola tarjeta, la de esta sesión: si ya hay una viva se
    /// reutiliza y solo se refresca. Cerrarla y abrir otra era lo que hacía la
    /// app cada vez que el sistema la relanzaba en segundo plano para atender
    /// un botón: la tarjeta desaparecía en mitad de la navegación y, en un
    /// iPhone real, ya no volvía (ActivityKit solo deja abrir tarjetas con la
    /// app en primer plano).
    public static func ensure(
        session: WorkoutSession,
        labels: WorkoutActivityLabels?,
        open: Bool
    ) async -> Presence {
        let activities = await liveActivities()
        let mine = activities.filter { $0.attributes.belongs(to: session) }
        let foreign = activities.filter { !$0.attributes.belongs(to: session) }

        // Otra sesión (otro workout, u otra vuelta del mismo): sobra.
        for activity in foreign {
            await activity.end(nil, dismissalPolicy: .immediate)
        }
        // Duplicadas de la misma sesión (de versiones anteriores): una basta.
        for activity in mine.dropFirst() {
            await activity.end(nil, dismissalPolicy: .immediate)
        }
        if !foreign.isEmpty || mine.count > 1 {
            WorkoutActivityStore.trace("tarjetas cerradas: otras=\(foreign.count) duplicadas=\(max(mine.count - 1, 0))")
        }

        if !mine.isEmpty {
            await refresh(session: session)
            return .reused
        }
        guard open else { return .missing }

        do {
            return try start(session: session, labels: labels) != nil ? .opened : .missing
        } catch {
            WorkoutActivityStore.trace("no se pudo abrir: \(error.localizedDescription)")
            return .failed(error.localizedDescription)
        }
    }

    @discardableResult
    public static func start(session: WorkoutSession, labels: WorkoutActivityLabels?) throws -> String? {
        guard let state = WorkoutActivityAttributes.ContentState(session: session) else { return nil }

        let authorization = ActivityAuthorizationInfo()
        WorkoutActivityStore.trace("permiso actividades=\(authorization.areActivitiesEnabled)")

        let attributes = WorkoutActivityAttributes(
            workoutName: session.workoutName,
            startedAt: session.startedAt,
            workoutId: session.workoutId,
            labels: labels
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

        WorkoutActivityStore.trace("notificacion abierta id=\(activity.id)")
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

    /// Recibe el entrenamiento que manda la app y lo funde, **dentro de la
    /// cola**, con la sesión guardada más reciente (ver
    /// `WorkoutSession.merging`).
    ///
    /// La publicación (y la apertura de la tarjeta, si `open`) va en la misma
    /// vuelta de la cola: publicar después, fuera de ella, podía enseñar un
    /// estado más viejo que el que acababa de publicar un botón.
    public func sync(
        _ incoming: WorkoutSession,
        labels: WorkoutActivityLabels?,
        open: Bool
    ) async -> WorkoutLiveActivityController.Presence {
        await enqueueReturning {
            let merged = WorkoutSession.merging(
                incoming: incoming,
                previous: WorkoutActivityStore.loadSession(),
                pending: WorkoutActivityStore.loadPending()
            )
            WorkoutActivityStore.saveSession(merged)
            let presence = await WorkoutLiveActivityController.ensure(
                session: merged,
                labels: labels,
                open: open
            )
            WorkoutActivityStore.trace("app sincroniza serie=\(merged.currentIndex) tarjeta=\(presence)")
            return presence
        }
    }

    /// Pone las miniaturas recién descargadas sobre la sesión **actual** y
    /// republica. Hacerlo sobre una copia leída antes de la descarga
    /// devolvía la tarjeta a la serie de hace unos segundos.
    public func applyImageKeys(_ keysBySet: [String: String], workoutId: String) async {
        await enqueue {
            guard var session = WorkoutActivityStore.loadSession(),
                  session.workoutId == workoutId else { return }
            var changed = false
            for index in session.items.indices {
                guard let key = keysBySet[session.items[index].setId],
                      session.items[index].imageKey != key else { continue }
                session.items[index].imageKey = key
                changed = true
            }
            guard changed else { return }
            WorkoutActivityStore.saveSession(session)
            await WorkoutLiveActivityController.refresh(session: session)
        }
    }

    /// Trabajo suelto que toca el App Group (p. ej. borrar acciones
    /// pendientes) sin competir con los botones.
    public func run(_ work: @escaping @Sendable () async -> Void) async {
        await enqueue(work)
    }

    private func enqueue(_ work: @escaping @Sendable () async -> Void) async {
        await enqueueReturning(work)
    }

    private func enqueueReturning<T: Sendable>(_ work: @escaping @Sendable () async -> T) async -> T {
        let previous = tail
        let task = Task { () -> T in
            await previous?.value
            return await work()
        }
        tail = Task { _ = await task.value }
        return await task.value
    }
}
