import Foundation

// Estado compartido entre la app y la extensión del widget a través del App
// Group. La extensión (y los AppIntents de sus botones) no puede llamar al
// backend ni al webview, así que trabaja sobre esta instantánea local y deja
// las acciones pendientes anotadas para que la app las sincronice cuando
// vuelva a primer plano.

public struct WorkoutSetItem: Codable, Hashable, Sendable {
    public var setId: String
    public var exerciseName: String
    public var exerciseIndex: Int
    public var totalExercises: Int
    public var setIndex: Int
    public var totalSets: Int
    public var reps: Int
    public var weight: Double
    /// RIR registrado (serie hecha) o pautado (pendiente). `nil` es «sin
    /// dato» y se pinta «—»; `-1` es fallo. Antes se rellenaba con 0 y al
    /// marcar la serie se guardaba un «RIR 0» que el usuario nunca indicó.
    public var rir: Int?
    public var doned: Bool
    public var imageKey: String?
    /// Valores tocados con los steppers en una serie aún sin marcar. Es un
    /// borrador que solo existe aquí: la app no lo conoce y cada vez que
    /// republicaba el entrenamiento lo pisaba con lo pautado.
    public var edited: Bool

    public init(
        setId: String,
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
        edited: Bool = false
    ) {
        self.setId = setId
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
        self.edited = edited
    }

    // Decodificación tolerante: una sesión guardada por una versión anterior
    // de la app no trae `doned` y el decoder sintetizado la descartaría entera.
    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        setId = try container.decode(String.self, forKey: .setId)
        exerciseName = try container.decode(String.self, forKey: .exerciseName)
        exerciseIndex = try container.decode(Int.self, forKey: .exerciseIndex)
        totalExercises = try container.decode(Int.self, forKey: .totalExercises)
        setIndex = try container.decode(Int.self, forKey: .setIndex)
        totalSets = try container.decode(Int.self, forKey: .totalSets)
        reps = try container.decode(Int.self, forKey: .reps)
        weight = try container.decode(Double.self, forKey: .weight)
        rir = try container.decodeIfPresent(Int.self, forKey: .rir)
        doned = try container.decodeIfPresent(Bool.self, forKey: .doned) ?? false
        imageKey = try container.decodeIfPresent(String.self, forKey: .imageKey)
        edited = try container.decodeIfPresent(Bool.self, forKey: .edited) ?? false
    }
}

public struct WorkoutSession: Codable, Equatable, Sendable {
    public var workoutId: String
    public var workoutName: String
    public var startedAt: Date
    public var items: [WorkoutSetItem]

    public init(workoutId: String, workoutName: String, startedAt: Date, items: [WorkoutSetItem]) {
        self.workoutId = workoutId
        self.workoutName = workoutName
        self.startedAt = startedAt
        self.items = items
    }

    /// Serie que enseña la tarjeta: **siempre la primera sin hacer**.
    ///
    /// Derivado, no guardado. Sin flechas no hay forma de estar mirando otra
    /// cosa, así que guardarlo solo servía para que se desincronizase: cuando
    /// iOS no conseguía repintar, la tarjeta enseñaba una serie y el índice
    /// guardado apuntaba a otra, y el check marcaba la equivocada.
    public var currentIndex: Int {
        items.firstIndex { !$0.doned } ?? 0
    }

    public var currentItem: WorkoutSetItem? {
        guard items.indices.contains(currentIndex) else { return nil }
        return items[currentIndex]
    }

    public var doneCount: Int {
        items.filter { $0.doned }.count
    }

    public var allDone: Bool {
        !items.isEmpty && items.allSatisfy { $0.doned }
    }

    /// Misma sesión de entrenamiento: mismo workout y mismo arranque. Un
    /// workout se repite cada microciclo con el mismo id; sin mirar
    /// `startedAt`, la sesión de la semana pasada heredaba su posición.
    public func isSameRun(as other: WorkoutSession) -> Bool {
        workoutId == other.workoutId
            && abs(startedAt.timeIntervalSince(other.startedAt)) < 1
    }

    /// Funde lo que manda la app (el backend, fuente de verdad) con lo que
    /// solo sabe la notificación: series marcadas aún sin sincronizar y los
    /// borradores de los steppers.
    ///
    /// Sin posición que conservar: `currentIndex` es derivado, así que la
    /// tarjeta se recoloca sola en la primera serie pendiente del resultado.
    ///
    /// Se ejecuta dentro de `WorkoutSessionMutator`, sobre la sesión guardada
    /// más reciente: calcularlo fuera de la cola pisaba lo que un botón
    /// hubiera cambiado mientras tanto (la tarjeta «volvía atrás» sola).
    public static func merging(
        incoming: WorkoutSession,
        previous: WorkoutSession?,
        pending: [PendingSetAction]
    ) -> WorkoutSession {
        var merged = incoming
        let previous = previous.flatMap { $0.isSameRun(as: incoming) ? $0 : nil }

        var previousBySet: [String: WorkoutSetItem] = [:]
        for item in previous?.items ?? [] { previousBySet[item.setId] = item }

        // Solo cuenta el último estado de cada serie.
        var lastPending: [String: PendingSetAction] = [:]
        for action in pending where !action.skipped { lastPending[action.setId] = action }

        for index in merged.items.indices {
            let setId = merged.items[index].setId
            if let action = lastPending[setId] {
                merged.items[index].doned = action.doned
                merged.items[index].reps = action.reps
                merged.items[index].weight = action.weight
                merged.items[index].rir = action.rir
                merged.items[index].edited = false
            } else if let local = previousBySet[setId],
                      local.edited, !local.doned, !merged.items[index].doned {
                // Borrador de los steppers en una serie aún sin marcar: la app
                // no lo conoce y lo pisaría con lo pautado.
                merged.items[index].reps = local.reps
                merged.items[index].weight = local.weight
                merged.items[index].rir = local.rir
                merged.items[index].edited = true
            }
        }

        return merged
    }
}

/// Acción hecha desde la notificación que la app todavía no ha persistido.
public struct PendingSetAction: Codable, Sendable {
    /// Identifica la acción para que la app borre solo las que ha volcado:
    /// vaciar la lista entera perdía las que llegaban durante el volcado.
    public var id: String
    public var setId: String
    public var reps: Int
    public var weight: Double
    public var rir: Int?
    /// Estado al que se lleva la serie: `true` marcarla, `false` desmarcarla.
    public var doned: Bool
    public var skipped: Bool
    public var at: Date

    public init(setId: String, reps: Int, weight: Double, rir: Int?, doned: Bool, skipped: Bool, at: Date) {
        self.id = UUID().uuidString
        self.setId = setId
        self.reps = reps
        self.weight = weight
        self.rir = rir
        self.doned = doned
        self.skipped = skipped
        self.at = at
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decodeIfPresent(String.self, forKey: .id) ?? UUID().uuidString
        setId = try container.decode(String.self, forKey: .setId)
        reps = try container.decode(Int.self, forKey: .reps)
        weight = try container.decode(Double.self, forKey: .weight)
        rir = try container.decodeIfPresent(Int.self, forKey: .rir)
        doned = try container.decode(Bool.self, forKey: .doned)
        skipped = try container.decodeIfPresent(Bool.self, forKey: .skipped) ?? false
        at = try container.decode(Date.self, forKey: .at)
    }
}

public enum WorkoutActivityStore {
    public static let appGroupId = "group.com.trainfit.trainfit.liveactivity"

    private static let sessionKey = "liveActivity.session"
    private static let pendingKey = "liveActivity.pendingActions"
    private static let lastActionKey = "liveActivity.lastAction"

    private static var defaults: UserDefaults? {
        UserDefaults(suiteName: appGroupId)
    }

    public static func loadSession() -> WorkoutSession? {
        guard let data = defaults?.data(forKey: sessionKey) else { return nil }
        return try? JSONDecoder().decode(WorkoutSession.self, from: data)
    }

    public static func saveSession(_ session: WorkoutSession?) {
        guard let defaults = defaults else { return }
        guard let session = session else {
            defaults.removeObject(forKey: sessionKey)
            return
        }
        if let data = try? JSONEncoder().encode(session) {
            defaults.set(data, forKey: sessionKey)
        }
    }

    public static func appendPending(_ action: PendingSetAction) {
        guard let defaults = defaults else { return }
        var actions = loadPending()
        actions.append(action)
        if let data = try? JSONEncoder().encode(actions) {
            defaults.set(data, forKey: pendingKey)
        }
    }

    public static func loadPending() -> [PendingSetAction] {
        guard let data = defaults?.data(forKey: pendingKey) else { return [] }
        return (try? JSONDecoder().decode([PendingSetAction].self, from: data)) ?? []
    }

    /// Descarta una pulsación repetida. Si la app tarda en reclamar el botón,
    /// el sistema reintenta el intent en otro proceso: la segunda ejecución
    /// deshacía la primera (el check marcaba y volvía a desmarcar) o avanzaba
    /// dos series de golpe. Solo se considera repetición la misma pulsación
    /// llegada desde OTRO proceso dentro de la ventana.
    public static func isDuplicate(_ signature: String, window: TimeInterval = 2.5) -> Bool {
        let now = Date().timeIntervalSince1970
        let pid = Int(ProcessInfo.processInfo.processIdentifier)

        if let last = defaults?.dictionary(forKey: lastActionKey),
           last["signature"] as? String == signature,
           let at = last["at"] as? Double,
           let lastPid = last["pid"] as? Int,
           lastPid != pid,
           now - at < window {
            return true
        }

        defaults?.set(["signature": signature, "at": now, "pid": pid], forKey: lastActionKey)
        return false
    }

    public static func clearPending() {
        defaults?.removeObject(forKey: pendingKey)
    }

    /// Borra solo las acciones indicadas (las que la app ya ha volcado).
    public static func removePending(ids: Set<String>) {
        guard let defaults = defaults else { return }
        let remaining = loadPending().filter { !ids.contains($0.id) }
        guard !remaining.isEmpty else {
            defaults.removeObject(forKey: pendingKey)
            return
        }
        if let data = try? JSONEncoder().encode(remaining) {
            defaults.set(data, forKey: pendingKey)
        }
    }

    // Miniaturas en FICHEROS dentro del contenedor del App Group, no en las
    // preferencias. Metidas en el plist lo hinchaban a cientos de KB y el
    // widget lo lee entero en cada repintado: con el presupuesto de tiempo tan
    // corto que tiene, el sistema abortaba el render y el botón se quedaba
    // girando. En simulador containerURL(forSecurityApplicationGroupIdentifier:)
    // puede devolver nil, así que ahí se sigue usando el store.
    private static var imagesDirectory: URL? {
        guard let container = FileManager.default
            .containerURL(forSecurityApplicationGroupIdentifier: appGroupId) else { return nil }
        let directory = container.appendingPathComponent("thumbnails", isDirectory: true)
        if !FileManager.default.fileExists(atPath: directory.path) {
            try? FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        }
        return directory
    }

    private static func imageFile(_ key: String) -> URL? {
        imagesDirectory?.appendingPathComponent("\(key).png")
    }

    public static func saveImageData(_ data: Data, forKey key: String) {
        if let file = imageFile(key) {
            try? data.write(to: file, options: .atomic)
            return
        }
        defaults?.set(data, forKey: imageKey(key))
    }

    public static func imageData(forKey key: String) -> Data? {
        if let file = imageFile(key) {
            return try? Data(contentsOf: file)
        }
        return defaults?.data(forKey: imageKey(key))
    }

    public static func hasImage(forKey key: String) -> Bool {
        if let file = imageFile(key) {
            return FileManager.default.fileExists(atPath: file.path)
        }
        return defaults?.data(forKey: imageKey(key)) != nil
    }

    /// Borra las miniaturas que las versiones anteriores dejaron dentro de las
    /// preferencias. Se vuelven a descargar como ficheros.
    public static func migrateImagesOutOfDefaults() {
        guard let defaults = defaults, imagesDirectory != nil else { return }
        let keys = defaults.dictionaryRepresentation().keys.filter { $0.hasPrefix("liveActivity.image.") }
        guard !keys.isEmpty else { return }
        for key in keys { defaults.removeObject(forKey: key) }
        trace("miniaturas sacadas de preferencias: \(keys.count)")
    }

    // MARK: - Instalación

    private static let installStampKey = "liveActivity.installStamp"

    public static func loadInstallStamp() -> String? {
        defaults?.string(forKey: installStampKey)
    }

    public static func saveInstallStamp(_ value: String) {
        defaults?.set(value, forKey: installStampKey)
    }

    // MARK: - Traza

    private static let logKey = "liveActivity.debugLog"

    /// Anillo con los últimos eventos. La app, la extensión del widget y los
    /// botones son tres procesos distintos y ninguno comparte consola con los
    /// demás; el fallo aparece justo con la app cerrada, así que la traza va
    /// al App Group y se lee luego desde el Mac.
    private static let traceFormatter: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter
    }()

    /// Las escrituras son leer-añadir-guardar: dos hilos a la vez (un botón y
    /// el observador de estado de la tarjeta) se pisaban y se perdían líneas.
    private static let traceLock = NSLock()

    public static func trace(_ line: String) {
        guard let defaults = defaults else { return }
        traceLock.lock()
        defer { traceLock.unlock() }
        let stamp = traceFormatter.string(from: Date())
        var lines = defaults.stringArray(forKey: logKey) ?? []
        lines.append("\(stamp) [\(ProcessInfo.processInfo.processName)] \(line)")
        if lines.count > 150 { lines.removeFirst(lines.count - 150) }
        defaults.set(lines, forKey: logKey)
    }

    public static func traceLines() -> [String] {
        defaults?.stringArray(forKey: logKey) ?? []
    }

    private static func imageKey(_ key: String) -> String {
        "liveActivity.image.\(key)"
    }
}
