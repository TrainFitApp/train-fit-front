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
        public var imageKey: String?

        public init(
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

        public init(item: WorkoutSetItem) {
            self.init(
                exerciseName: item.exerciseName,
                exerciseIndex: item.exerciseIndex,
                totalExercises: item.totalExercises,
                setIndex: item.setIndex,
                totalSets: item.totalSets,
                reps: item.reps,
                weight: item.weight,
                rir: item.rir,
                imageKey: item.imageKey
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
    public static func refresh(session: WorkoutSession) async {
        guard let item = session.currentItem else {
            await end()
            return
        }
        let state = WorkoutActivityAttributes.ContentState(item: item)
        for activity in Activity<WorkoutActivityAttributes>.activities {
            await activity.update(ActivityContent(state: state, staleDate: nil))
        }
    }

    public static func end() async {
        for activity in Activity<WorkoutActivityAttributes>.activities {
            await activity.end(nil, dismissalPolicy: .immediate)
        }
    }

    @discardableResult
    public static func start(session: WorkoutSession) throws -> String? {
        guard let item = session.currentItem else { return nil }
        let attributes = WorkoutActivityAttributes(
            workoutName: session.workoutName,
            startedAt: session.startedAt
        )
        let state = WorkoutActivityAttributes.ContentState(item: item)
        let activity = try Activity.request(
            attributes: attributes,
            content: ActivityContent(state: state, staleDate: nil),
            pushType: nil
        )
        return activity.id
    }
}
