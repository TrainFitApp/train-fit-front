// Espejo de components/routineAssignments/ (backend): las fases de rutina de
// un cliente, el equivalente de las fases de dieta (DietPhase) para
// entrenamiento.
import { PhaseState } from './phase-state';

export interface RoutineAssignment {
  _id: string;
  tableId: string;
  clientId: string;
  trainerId: string;
  startDate: string;
  createdAt: string;
  // Solo en el historial (el backend conoce la cadena entera).
  state?: PhaseState;
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
  // Fase A2 (2026-09) — qué RoutineAssignment produjo este día. Antes
  // /active/schedule solo proyectaba "la fase activa" sobre todo el rango
  // pedido; ahora recorre TODAS las fases del cliente y cada día lleva la
  // suya, para poder colorear el calendario por fase de verdad (no
  // adivinarlo cruzando workoutId contra una sola tabla).
  assignmentId: string;
  // Posición 1-based del split (microciclo) en la tabla de esa fase —
  // badge "M1, M2…" del calendario. Reinicia en cada fase.
  microcycleNumber: number;
}
