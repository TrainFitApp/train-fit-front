import ActivityKit
import SwiftUI
import WidgetKit

private enum Brand {
    static let primary = Color(red: 254 / 255, green: 144 / 255, blue: 0)
    static let surface = Color(red: 0.08, green: 0.08, blue: 0.08)
    static let field = Color.white.opacity(0.10)
    static let muted = Color.white.opacity(0.55)
}

/// Tiempo transcurrido a mano. Los estilos del sistema se localizan a texto
/// largo en español ("25 min") o pintan "25:--", y en la isla se partían en dos
/// líneas. Se refresca en cada actualización de la actividad.
private func elapsedText(since start: Date) -> String {
    let seconds = max(0, Int(Date().timeIntervalSince(start)))
    let hours = seconds / 3600
    let minutes = (seconds % 3600) / 60
    if hours > 0 {
        return String(format: "%d:%02d:%02d", hours, minutes, seconds % 60)
    }
    return String(format: "%d:%02d", minutes, seconds % 60)
}

// PASO 4: informa, ajusta KG/REPS/RIR, marca la serie y navega entre series y
// ejercicios. Fila de arriba: los tres steppers. Fila de abajo: flechas de
// ejercicio en los extremos, de serie por dentro, y el check en el centro.

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
                    Text(elapsedText(since: context.attributes.startedAt))
                        .font(.system(size: 13, weight: .semibold, design: .rounded))
                        .monospacedDigit()
                        .foregroundStyle(Brand.muted)
                        .lineLimit(1)
                        .frame(maxWidth: 64, alignment: .trailing)
                }
                DynamicIslandExpandedRegion(.center) {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(context.state.exerciseName)
                            .font(.system(size: 13, weight: .semibold))
                            .lineLimit(1)
                            .foregroundStyle(.white)
                        SetLabel(state: context.state, size: 11)
                        ProgressBar(done: context.state.doneCount, total: context.state.totalCount)
                    }
                }
                DynamicIslandExpandedRegion(.bottom) {
                    VStack(spacing: 6) {
                        ValuesRow(state: context.state, compact: true)
                        NavigationRow(state: context.state, height: 28)
                    }
                    .padding(.horizontal, 6)
                }
            } compactLeading: {
                Image(systemName: "dumbbell.fill")
                    .foregroundStyle(Brand.primary)
            } compactTrailing: {
                Text("\(context.state.doneCount)/\(context.state.totalCount)")
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
        VStack(alignment: .leading, spacing: 8) {
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

                Text(elapsedText(since: context.attributes.startedAt))
                    .font(.system(size: 12, weight: .semibold, design: .rounded))
                    .monospacedDigit()
                    .foregroundStyle(Brand.muted)
                    .lineLimit(1)
            }

            HStack(spacing: 10) {
                ExerciseThumbnail(imageKey: context.state.imageKey, size: 40)

                VStack(alignment: .leading, spacing: 3) {
                    Text(context.state.exerciseName)
                        .font(.system(size: 15, weight: .bold))
                        .foregroundStyle(.white)
                        .lineLimit(1)
                    SetLabel(state: context.state, size: 12)
                    ProgressBar(done: context.state.doneCount, total: context.state.totalCount)
                }

                Spacer(minLength: 0)
            }

            ValuesRow(state: context.state)
            NavigationRow(state: context.state, height: 30)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
    }
}

/// KG · REPS · RIR de la serie en curso, cada uno con su − y +.
@available(iOS 17.0, *)
private struct ValuesRow: View {
    let state: WorkoutActivityAttributes.ContentState
    var compact: Bool = false

    var body: some View {
        HStack(spacing: 0) {
            Stepper(field: "weight", delta: 1, value: formattedWeight, unit: "KG", compact: compact)
            Divider().frame(height: 20).overlay(Color.white.opacity(0.12))
            Stepper(field: "reps", delta: 1, value: "\(state.reps)", unit: "REPS", compact: compact)
            Divider().frame(height: 20).overlay(Color.white.opacity(0.12))
            Stepper(field: "rir", delta: 1, value: "\(state.rir)", unit: "RIR", compact: compact)
        }
        .padding(.horizontal, 2)
        .padding(.vertical, compact ? 5 : 7)
        .frame(maxWidth: .infinity)
        .background(Brand.field, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
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
    var compact: Bool = false

    var body: some View {
        HStack(spacing: 2) {
            Button(intent: AdjustSetValueIntent(field: field, delta: -delta)) {
                Image(systemName: "minus")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundStyle(Brand.muted)
                    .frame(width: compact ? 20 : 24, height: 26)
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
                    .frame(width: compact ? 20 : 24, height: 26)
                    .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
        }
        // Los tres steppers reparten por igual el ancho del bloque.
        .frame(maxWidth: .infinity)
    }
}

/// Flechas de ejercicio en los extremos, de serie por dentro, y el check en el
/// centro. Los Spacer simétricos son los que dejan el check centrado.
@available(iOS 17.0, *)
private struct NavigationRow: View {
    let state: WorkoutActivityAttributes.ContentState
    let height: CGFloat

    var body: some View {
        HStack(spacing: 0) {
            NavButton(scope: "exercise", step: -1, systemName: "chevron.left.2",
                      enabled: state.canPrevExercise, height: height)
            Spacer(minLength: 4)
            NavButton(scope: "set", step: -1, systemName: "chevron.left",
                      enabled: state.canPrevSet, height: height)
            Spacer(minLength: 4)
            CheckButton(doned: state.doned, height: height)
            Spacer(minLength: 4)
            NavButton(scope: "set", step: 1, systemName: "chevron.right",
                      enabled: state.canNextSet, height: height)
            Spacer(minLength: 4)
            NavButton(scope: "exercise", step: 1, systemName: "chevron.right.2",
                      enabled: state.canNextExercise, height: height)
        }
    }
}

@available(iOS 17.0, *)
private struct NavButton: View {
    let scope: String
    let step: Int
    let systemName: String
    let enabled: Bool
    let height: CGFloat

    var body: some View {
        // Sin destino no se monta el Button: un botón deshabilitado sigue
        // capturando el toque y parpadea.
        if enabled {
            Button(intent: NavigateSetIntent(scope: scope, step: step)) {
                icon(color: .white)
            }
            .buttonStyle(.plain)
        } else {
            icon(color: Brand.muted.opacity(0.35))
        }
    }

    private func icon(color: Color) -> some View {
        Image(systemName: systemName)
            .font(.system(size: 13, weight: .bold))
            .foregroundStyle(color)
            .frame(width: 42, height: height)
            .background(Brand.field, in: RoundedRectangle(cornerRadius: 11, style: .continuous))
            .contentShape(Rectangle())
    }
}

/// Marca o desmarca la serie en curso. Se enciende cuando está hecha.
@available(iOS 17.0, *)
private struct CheckButton: View {
    let doned: Bool
    let height: CGFloat

    var body: some View {
        Button(intent: CompleteSetIntent()) {
            Image(systemName: "checkmark")
                .font(.system(size: 16, weight: .bold))
                .foregroundStyle(doned ? .black : Brand.muted)
                .frame(width: 60, height: height)
                .background(
                    doned ? AnyShapeStyle(Brand.primary) : AnyShapeStyle(Brand.field),
                    in: RoundedRectangle(cornerRadius: 11, style: .continuous)
                )
        }
        .buttonStyle(.plain)
    }
}

/// "Serie 2/4" y, si está hecha, un sello: sin esto cambiar de serie no se
/// nota, porque todas las series de un ejercicio llevan los mismos kg y reps.
@available(iOS 17.0, *)
private struct SetLabel: View {
    let state: WorkoutActivityAttributes.ContentState
    let size: CGFloat

    var body: some View {
        HStack(spacing: 4) {
            Text("Serie \(state.setIndex)/\(state.totalSets)")
                .font(.system(size: size))
                .foregroundStyle(Brand.muted)
                .lineLimit(1)

            if state.doned {
                Text("hecha")
                    .font(.system(size: size - 1, weight: .semibold))
                    .foregroundStyle(Brand.primary)
                    .padding(.horizontal, 5)
                    .padding(.vertical, 1)
                    .background(Brand.primary.opacity(0.18), in: Capsule())
            }
        }
    }
}

/// Series hechas del entrenamiento completo.
@available(iOS 17.0, *)
private struct ProgressBar: View {
    let done: Int
    let total: Int

    var body: some View {
        HStack(spacing: 6) {
            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    Capsule().fill(Color.white.opacity(0.12))
                    Capsule()
                        .fill(Brand.primary)
                        .frame(width: geometry.size.width * fraction)
                }
            }
            .frame(height: 3)

            Text("\(done)/\(total)")
                .font(.system(size: 10, weight: .semibold, design: .rounded))
                .monospacedDigit()
                .foregroundStyle(Brand.muted)
        }
    }

    private var fraction: CGFloat {
        guard total > 0 else { return 0 }
        return CGFloat(done) / CGFloat(total)
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
