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
        self.imageKey = imageKey
    }
}

public struct WorkoutSession: Codable {
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
}

/// Acción hecha desde la notificación que la app todavía no ha persistido.
public struct PendingSetAction: Codable {
    public var setId: String
    public var reps: Int
    public var weight: Double
    public var rir: Int
    public var skipped: Bool
    public var at: Date

    public init(setId: String, reps: Int, weight: Double, rir: Int, skipped: Bool, at: Date) {
        self.setId = setId
        self.reps = reps
        self.weight = weight
        self.rir = rir
        self.skipped = skipped
        self.at = at
    }
}

public enum WorkoutActivityStore {
    public static let appGroupId = "group.com.trainfit.trainfit.liveactivity"

    private static let sessionKey = "liveActivity.session"
    private static let pendingKey = "liveActivity.pendingActions"

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

    public static func clearPending() {
        defaults?.removeObject(forKey: pendingKey)
    }

    // Miniaturas guardadas como bytes en el propio store compartido, no como
    // ficheros: containerURL(forSecurityApplicationGroupIdentifier:) devuelve
    // nil en simulador (el App Group no está aprovisionado ahí) y la imagen
    // nunca llegaba al widget. Van ya reescaladas, son unos pocos KB.
    public static func saveImageData(_ data: Data, forKey key: String) {
        defaults?.set(data, forKey: imageKey(key))
    }

    public static func imageData(forKey key: String) -> Data? {
        defaults?.data(forKey: imageKey(key))
    }

    public static func hasImage(forKey key: String) -> Bool {
        imageData(forKey: key) != nil
    }

    private static func imageKey(_ key: String) -> String {
        "liveActivity.image.\(key)"
    }
}
