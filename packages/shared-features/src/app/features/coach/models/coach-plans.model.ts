// "Tus planes" — espejo de GET /coach/plans (clientCoachView/plan-timeline.js):
// la rutina y la fase de dieta de hoy, las programadas y las anteriores.
// Fechas como día civil "YYYY-MM-DD". `endDate` null = sin fin: sigue, o es
// la última de la cadena. Las anteriores pueden ser de un profesional con el
// que ya no trabaja (`trainerName` null si su cuenta ya no existe).

export type CoachPlanStatus = 'active' | 'scheduled' | 'assigned';

interface CoachPlanEntryBase {
  id: string | null;
  name: string;
  trainerId: string | null;
  trainerName: string | null;
  startDate: string;
  endDate: string | null;
  // Solo en el plan de hoy (`current`).
  status?: CoachPlanStatus;
}

export interface CoachTrainingPlanEntry extends CoachPlanEntryBase {
  tableId: string;
}

export interface CoachNutritionPlanEntry extends CoachPlanEntryBase {
  kcal: number | null;
}

export interface CoachPlanTimeline<T> {
  current: T | null;
  upcoming: T[];
  past: T[];
}

export interface CoachPlans {
  today: string;
  training: CoachPlanTimeline<CoachTrainingPlanEntry>;
  nutrition: CoachPlanTimeline<CoachNutritionPlanEntry>;
}
