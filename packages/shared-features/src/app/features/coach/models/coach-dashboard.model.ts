// Tab Coach, Fase 1 — espejo del payload de GET /coach/dashboard
// (coach-dashboard-controller.js). Agregación de solo lectura, no introduce
// ningún concepto de dominio nuevo — cada campo viene de una fuente ya
// existente (check-ins, propuestas de comida, preferencias, cobros, rutina/
// objetivo asignados).

export interface CoachProfessional {
  trainerId: string;
  name: string;
  scopes: ('training' | 'nutrition')[];
  lastActivityAt: string | null;
}

// Un check-in ABIERTO hoy todavía sin responder (docs/plan-semanas.md
// §17): se calcula al abrir la app, sin cron ni push.
export interface CoachPendingCheckin {
  trainerId: string;
  trainerName: string;
  scheduleId: string;
  name?: string;
  // Día en que se pidió y hasta cuándo se puede responder.
  date?: string;
  closesDate?: string | null;
  // Semana de su fase de dieta que abre este check-in, si tiene fase.
  weekNumber?: number;
  weekStart?: string;
  weekEnd?: string | null;
}

export interface CoachPendingMealProposal {
  proposalId: string;
  date: string;
  mealSlot: string;
  alternativesCount: number;
  trainerName: string;
}

export interface CoachNutritionPreferencesStatus {
  requestedAt: string;
  respondedAt: string | null;
  pending: boolean;
  requestedByName: string;
}

export interface CoachPendingPayment {
  paymentId: string;
  amount: number;
  currency: string;
  dueDate: string;
  trainerName: string;
}

export interface CoachAssignedRoutine {
  tableId: string;
  name: string;
  assignedByTrainerName: string;
  assignedAt: string;
}

// Tab Coach, Fase 3 — notificaciones in-app.
export type CoachNotificationType =
  | 'meal_proposal'
  | 'payment_created'
  | 'nutrition_preferences_requested'
  | 'checkin_reviewed'
  | 'routine_assigned'
  | 'task_assigned'
  | 'intake_submitted'
  | 'client_confirmed'
  | 'meal_prescribed'
  // Histórico, ya no se emite — ver ANTHROPOMETRY_REQUESTED en coach.page.ts.
  | 'anthropometry_requested';

export interface CoachNotification {
  _id: string;
  trainerId: string;
  type: CoachNotificationType;
  payload: Record<string, unknown>;
  read: boolean;
  readAt: string | null;
  createdAt: string;
  trainer: { name: string; lastname: string } | null;
}

// Tab Coach, Fase 4 — tareas/hábitos diarios (entrada 100% manual).
export interface CoachTask {
  _id: string;
  trainerId: string;
  trainerName: string;
  type: 'steps' | 'water' | 'sleep' | 'cardio' | 'custom';
  label: string;
  target: number;
  // Tope del rango, cuando el hábito se pauta como "de 10.000 a 15.000
  // pasos" (docs/plan-semanas.md §12).
  targetMax: number | null;
  unit: string;
  // Día al que se refiere `completedToday` (la pantalla de dieta los pinta
  // del día que se esté mirando, no siempre hoy).
  date: string;
  completedToday: boolean;
}

export interface CoachDashboard {
  professionals: CoachProfessional[];
  pendingCheckins: CoachPendingCheckin[];
  pendingMealProposals: CoachPendingMealProposal[];
  nutritionPreferences: CoachNutritionPreferencesStatus | null;
  pendingPayments: CoachPendingPayment[];
  assignedRoutine: CoachAssignedRoutine | null;
}
