// Un icono por tipo de hábito diario. Lo comparten el panel del entrenador
// (tarjetas de «Hábitos diarios» del cliente) y la pantalla de dieta del
// cliente («Hábitos de hoy»), para que el mismo hábito se vea igual en ambos
// lados. Los tipos son los de `CoachTask.type` / `TrainerTaskType`.
export type HabitType = 'steps' | 'water' | 'sleep' | 'custom';

export const HABIT_TYPE_ICONS: Record<HabitType, string> = {
  steps: 'footsteps-outline',
  water: 'water-outline',
  sleep: 'moon-outline',
  custom: 'checkmark-circle-outline',
};
