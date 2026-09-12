import Foundation

// Estado compartido entre la app y la extensión del widget a través del App
// Group. La extensión (y los AppIntents de sus botones) no puede llamar al
// backend ni al webview, así que trabaja sobre esta instantánea local y deja
// las acciones pendientes anotadas para que la app las sincronice cuando
// vuelva a primer plano.

public struct WorkoutSetItem: Codable, Hashable {
    public var setId: String
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

    public init(
        setId: String,
        exerciseName: String,
        exerciseIndex: Int,
        totalExercises: Int,
        setIndex: Int,
        totalSets: Int,
        reps: Int,
        weight: Double,
        rir: Int,
        doned: Bool,
        imageKey: String?
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
        rir = try container.decode(Int.self, forKey: .rir)
        doned = try container.decodeIfPresent(Bool.self, forKey: .doned) ?? false
        imageKey = try container.decodeIfPresent(String.self, forKey: .imageKey)
    }
}

public struct WorkoutSession: Codable, Equatable {
    public var workoutId: String
    public var workoutName: String
    public var startedAt: Date
    public var currentIndex: Int
    public var items: [WorkoutSetItem]

    public init(workoutId: String, workoutName: String, startedAt: Date, currentIndex: Int, items: [WorkoutSetItem]) {
        self.workoutId = workoutId
        self.workoutName = workoutName
        self.startedAt = startedAt
        self.currentIndex = currentIndex
        self.items = items
    }

    public var currentItem: WorkoutSetItem? {
        guard items.indices.contains(currentIndex) else { return nil }
        return items[currentIndex]
    }

    /// Primera serie sin hacer: donde se posiciona la notificación al abrirse.
    public var firstPendingIndex: Int? {
        items.firstIndex { !$0.doned }
    }

    public var allDone: Bool {
        !items.isEmpty && items.allSatisfy { $0.doned }
    }

    /// Siguiente serie **sin hacer** a partir de la actual; si no queda
    /// ninguna por delante, la primera pendiente de todo el entrenamiento.
    /// Tras marcar una serie se salta aquí: caer en una ya hecha (con el check
    /// encendido) parece que la notificación se ha ido por su cuenta.
    public func nextPendingIndex() -> Int? {
        if let forward = items.indices.first(where: { $0 > currentIndex && !items[$0].doned }) {
            return forward
        }
        return firstPendingIndex
    }

    /// Serie anterior/siguiente **dentro del mismo ejercicio** (`step` ±1).
    public func indexForSetStep(_ step: Int) -> Int? {
        guard let current = currentItem else { return nil }
        let target = currentIndex + step
        guard items.indices.contains(target),
              items[target].exerciseIndex == current.exerciseIndex else { return nil }
        return target
    }

    /// Primera serie del ejercicio anterior/siguiente (`step` ±1). Se busca el
    /// ejercicio adyacente **que tenga series** en la lista, no `exerciseIndex
    /// ± 1`: un ejercicio sin series dejaría la flecha muerta.
    public func indexForExerciseStep(_ step: Int) -> Int? {
        guard let current = currentItem else { return nil }
        let target: Int?
        if step > 0 {
            target = items.first { $0.exerciseIndex > current.exerciseIndex }?.exerciseIndex
        } else {
            target = items.last { $0.exerciseIndex < current.exerciseIndex }?.exerciseIndex
        }
        guard let target = target else { return nil }
        return items.firstIndex { $0.exerciseIndex == target }
    }
}

/// Acción hecha desde la notificación que la app todavía no ha persistido.
public struct PendingSetAction: Codable {
    public var setId: String
    public var reps: Int
    public var weight: Double
    public var rir: Int
    /// Estado al que se lleva la serie: `true` marcarla, `false` desmarcarla.
    public var doned: Bool
    public var skipped: Bool
    public var at: Date

    public init(setId: String, reps: Int, weight: Double, rir: Int, doned: Bool, skipped: Bool, at: Date) {
        self.setId = setId
        self.reps = reps
        self.weight = weight
        self.rir = rir
        self.doned = doned
        self.skipped = skipped
        self.at = at
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

    public static func trace(_ line: String) {
        guard let defaults = defaults else { return }
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
