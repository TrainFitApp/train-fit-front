// Tarea 4 (2026-09) — espejo de components/routineAssignments/ (backend).
// Equivalente de PlanAssignment (nutrición) para rutinas: a diferencia de
// esa, sin endMode/endDate — una rutina no "termina", hay exactamente una
// vigente hasta que se sustituye por la siguiente.
export type RoutineAssignmentStatus = 'active' | 'superseded' | 'ended';

export interface RoutineAssignment {
  _id: string;
  tableId: string;
  clientId: string;
  trainerId: string;
  startDate: string;
  status: RoutineAssignmentStatus;
  supersededBy: string | null;
  createdAt: string;
  tableName?: string | null;
  // 2026-09 — cuándo se completaría la rutina entera una vez, empezando en
  // startDate, si se entrena un día tras otro sin saltarse ninguno. Mismo
  // mecanismo que la adherencia de entrenamiento (proyecta TODOS los splits
  // de la tabla día a día, ver routine-assignment-projection.js#
  // getProjectedPhaseEndDate). Sigue sin ser un endDate real — una fase
  // rige hasta que otra la sustituye, esto es solo la estimación de
  // planificación. null si la tabla no tiene ningún entrenamiento.
  estimatedEndDate?: string | null;
}

export interface ApplyRoutineRequest {
  startDate: string;
  reason?: string;
}

export interface RescheduleRoutineRequest {
  startDate: string;
  reason?: string;
}

// Proyección de un día de la rutina sobre el calendario real — "lo
// previsto", no lo ya hecho (eso sigue viniendo de ClientTrainingProgress).
export interface RoutineScheduleDay {
  date: string;
  workoutId: string;
  name: string;
  isPlannedRestDay: boolean;
}
