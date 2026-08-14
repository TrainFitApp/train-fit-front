// TASK-002 (MASTER_BACKLOG.md) — "Reportes": histórico de check-ins
// agregado de TODOS los clientes del entrenador (GET /trainer/checkins/responses).
// Mismo shape que CheckinResponseEntry (client-detail.model.ts) más el
// cliente al que pertenece — ahí venía implícito (una sola pantalla por
// cliente), aquí hace falta explícito para poder listar/filtrar por cliente.
export interface CheckinReportClient {
  _id: string;
  name: string;
  lastname: string;
  email: string;
}

export interface CheckinReportEntry {
  _id: string;
  respondedAt: string;
  values: Record<string, number | string>;
  client: CheckinReportClient | null;
}
