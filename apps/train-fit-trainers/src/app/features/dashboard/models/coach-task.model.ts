// Fase 1 Coach Pro — espejo de components/coachTasks/coach-task-schema.js.
//
// OJO: no confundir con TrainerTask (client-detail.model.ts), que pese al
// nombre es un HÁBITO DIARIO que el profesional asigna al cliente (pasos,
// agua, sueño) y que marca el cliente. CoachTask es el pendiente del
// profesional. Son dos cosas opuestas; de ahí el modelo, la colección y la
// ruta (/trainer/coach-tasks) separados.

export interface CoachTaskClient {
  _id: string;
  name: string;
  lastname: string;
}

export interface CoachTask {
  _id: string;
  title: string;
  notes: string;
  // "YYYY-MM-DD" o null. Mismo formato de día de calendario que el resto de
  // la app — nunca un Date con zona horaria.
  dueDate: string | null;
  status: 'pending' | 'done';
  // Poblado por el backend cuando la tarea es de un cliente concreto;
  // ausente/null cuando es un pendiente general del profesional.
  clientId: CoachTaskClient | null;
  sourceAlertId: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface CreateCoachTaskPayload {
  title: string;
  notes?: string;
  dueDate?: string | null;
  clientId?: string | null;
  sourceAlertId?: string | null;
}
