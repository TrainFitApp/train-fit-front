import ActivityKit
import AppIntents
import SwiftUI
import WidgetKit

private enum Brand {
    static let primary = Color(red: 254 / 255, green: 144 / 255, blue: 0)
    static let surface = Color(red: 0.08, green: 0.08, blue: 0.08)
    static let field = Color.white.opacity(0.10)
    static let muted = Color.white.opacity(0.55)
}

@available(iOS 17.0, *)
struct WorkoutLiveActivityWidget: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: WorkoutActivityAttributes.self) { context in
            LockScreenView(context: context)
                .activityBackgroundTint(Brand.surface)
                .activitySystemActionForegroundColor(Brand.primary)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    ExerciseThumbnail(imageKey: context.state.imageKey, size: 34)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text(context.attributes.startedAt, style: .timer)
                        .font(.system(size: 13, weight: .semibold, design: .rounded))
                        .monospacedDigit()
                        .foregroundStyle(Brand.muted)
                        .frame(maxWidth: 64, alignment: .trailing)
                }
                DynamicIslandExpandedRegion(.center) {
                    VStack(alignment: .leading, spacing: 1) {
                        Text(context.state.exerciseName)
                            .font(.system(size: 13, weight: .semibold))
                            .lineLimit(1)
                            .foregroundStyle(.white)
                        Text("Serie \(context.state.setIndex)/\(context.state.totalSets)")
                            .font(.system(size: 11))
                            .foregroundStyle(Brand.muted)
                    }
                }
                DynamicIslandExpandedRegion(.bottom) {
                    ControlsRow(state: context.state)
                }
            } compactLeading: {
                Image(systemName: "dumbbell.fill")
                    .foregroundStyle(Brand.primary)
            } compactTrailing: {
                Text("\(context.state.exerciseIndex)/\(context.state.totalExercises)")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(Brand.primary)
            } minimal: {
                Image(systemName: "dumbbell.fill")
                    .foregroundStyle(Brand.primary)
            }
        }
    }
}

@available(iOS 17.0, *)
private struct LockScreenView: View {
    let context: ActivityViewContext<WorkoutActivityAttributes>

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 6) {
                Text(context.attributes.workoutName)
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(Brand.muted)
                    .lineLimit(1)
                    .truncationMode(.tail)

                Spacer(minLength: 8)

                Text("Ejercicio \(context.state.exerciseIndex)/\(context.state.totalExercises)")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(Brand.muted)
                    .lineLimit(1)

                Text("|")
                    .font(.system(size: 12))
                    .foregroundStyle(Brand.muted.opacity(0.5))

                // Tiempo calculado a mano: todos los estilos del sistema se
                // localizan a texto largo en español ("17 minutos") o pintan
                // "17:--", y se comían la fila. Se refresca en cada update de
                // la actividad (cada serie marcada).
                Text(elapsedText)
                    .font(.system(size: 12, weight: .semibold, design: .rounded))
                    .monospacedDigit()
                    .foregroundStyle(Brand.muted)
                    .lineLimit(1)
            }

            HStack(spacing: 10) {
                ExerciseThumbnail(imageKey: context.state.imageKey, size: 44)

                VStack(alignment: .leading, spacing: 2) {
                    Text(context.state.exerciseName)
                        .font(.system(size: 15, weight: .bold))
                        .foregroundStyle(.white)
                        .lineLimit(1)
                    Text("Serie \(context.state.setIndex)/\(context.state.totalSets)")
                        .font(.system(size: 12))
                        .foregroundStyle(Brand.muted)
                }

                Spacer(minLength: 0)
            }

            ControlsRow(state: context.state)
        }
        .padding(14)
    }

    private var elapsedText: String {
        let seconds = max(0, Int(Date().timeIntervalSince(context.attributes.startedAt)))
        let hours = seconds / 3600
        let minutes = (seconds % 3600) / 60
        if hours > 0 {
            return String(format: "%d:%02d:%02d", hours, minutes, seconds % 60)
        }
        return String(format: "%d:%02d", minutes, seconds % 60)
    }
}

@available(iOS 17.0, *)
private struct ControlsRow: View {
    let state: WorkoutActivityAttributes.ContentState

    var body: some View {
        HStack(spacing: 8) {
            HStack(spacing: 0) {
                Stepper(field: "reps", delta: 1, value: "\(state.reps)", unit: "REPS")
                Divider().frame(height: 20).overlay(Color.white.opacity(0.12))
                Stepper(field: "weight", delta: 1, value: formattedWeight, unit: "KG")
                Divider().frame(height: 20).overlay(Color.white.opacity(0.12))
                Stepper(field: "rir", delta: 1, value: "\(state.rir)", unit: "RIR")
            }
            .padding(.horizontal, 4)
            .padding(.vertical, 7)
            // Ocupa todo el ancho sobrante para que el check quede pegado al
            // borde derecho de la tarjeta y no quede un hueco muerto.
            .frame(maxWidth: .infinity)
            .background(Brand.field, in: RoundedRectangle(cornerRadius: 12, style: .continuous))

            Button(intent: CompleteSetIntent()) {
                Image(systemName: "checkmark")
                    .font(.system(size: 17, weight: .bold))
                    .foregroundStyle(.black)
                    .frame(width: 42, height: 42)
                    .background(.white, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            }
            .buttonStyle(.plain)
        }
    }

    private var formattedWeight: String {
        let weight = state.weight
        if weight == weight.rounded() {
            return String(Int(weight))
        }
        return String(format: "%.1f", weight)
    }
}

@available(iOS 17.0, *)
private struct Stepper: View {
    let field: String
    let delta: Double
    let value: String
    let unit: String

    var body: some View {
        HStack(spacing: 2) {
            Button(intent: AdjustSetValueIntent(field: field, delta: -delta)) {
                Image(systemName: "minus")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundStyle(Brand.muted)
                    .frame(width: 24, height: 26)
                    .contentShape(Rectangle())
            }
            .buttonStyle(.plain)

            VStack(spacing: -1) {
                Text(value)
                    .font(.system(size: 15, weight: .bold, design: .rounded))
                    .monospacedDigit()
                    .foregroundStyle(.white)
                    .lineLimit(1)
                    .minimumScaleFactor(0.7)
                Text(unit)
                    .font(.system(size: 8, weight: .semibold))
                    .foregroundStyle(Brand.muted)
            }
            .frame(maxWidth: .infinity)

            Button(intent: AdjustSetValueIntent(field: field, delta: delta)) {
                Image(systemName: "plus")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundStyle(Brand.primary)
                    .frame(width: 24, height: 26)
                    .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
        }
        // Los tres steppers reparten por igual el ancho del bloque.
        .frame(maxWidth: .infinity)
    }
}

@available(iOS 17.0, *)
private struct ExerciseThumbnail: View {
    let imageKey: String?
    let size: CGFloat

    var body: some View {
        Group {
            if let image = loadedImage {
                Image(uiImage: image)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .background(Brand.primary.opacity(0.15))
            } else {
                Image(systemName: "dumbbell.fill")
                    .font(.system(size: size * 0.42))
                    .foregroundStyle(Brand.primary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Brand.primary.opacity(0.15))
            }
        }
        .frame(width: size, height: size)
        .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
    }

    /// La app deja la miniatura ya descargada y reescalada en el store
    /// compartido; aquí solo se lee (el widget no tiene red).
    private var loadedImage: UIImage? {
        guard let imageKey = imageKey,
              let data = WorkoutActivityStore.imageData(forKey: imageKey) else { return nil }
        return UIImage(data: data)
    }
}
