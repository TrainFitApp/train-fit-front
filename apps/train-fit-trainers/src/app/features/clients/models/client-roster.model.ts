// Movimiento 1 Coach Pro — espejo de components/clientProgress/
// roster-service.js (backend).

import { IntakeStatus } from 'src/app/core/services/onboarding/onboarding.service';
import { ClientScope } from '../pages/client-detail/models/client-detail.model';

export type AdherenceDimensionKey = 'nutrition' | 'training' | 'habits' | 'checkins';

export interface RosterDimension {
  applicable: boolean;
  // Presentes solo cuando applicable es true.
  percentage?: number;
  detail?: string;
  // Presente solo cuando applicable es false: por qué no se puede medir.
  reason?: string;
}

export interface RosterWeightChange {
  // null con una sola medida en la ventana: hay peso, no variación.
  absolute: number | null;
  percentage: number | null;
  from: { date: string; weight: number };
  to: { date: string; weight: number };
  measurements: number;
}

export interface RosterClient {
  clientId: string;
  clientName: string;
  // El buscador de la Cartera mira nombre Y correo: hay clientes que el
  // trainer tiene fichados por su email.
  clientEmail: string;
  // Una relación por scope: "Rechazar" las termina todas.
  scopes: ClientScope[];
  // Cuestionario inicial: sin enviar / por revisar / revisado; null =
  // relación antigua sin cuestionario (intakeStatusFor en el backend).
  intakeStatus: IntakeStatus | null;
  adherence: {
    // null = ninguna dimensión aplica todavía. NO es un 0: un cliente recién
    // dado de alta no tiene "0% de adherencia", no tiene adherencia.
    overall: number | null;
    weakest: AdherenceDimensionKey | null;
    dimensions: Record<AdherenceDimensionKey, RosterDimension>;
  };
  weightChange: RosterWeightChange | null;
  lastCheckinAt: string | null;
  daysSinceCheckin: number | null;
  nextCheckinDate: string | null;
  lastActivityAt: string | null;
  daysSinceActivity: number | null;
  sessions: number;
  openAlerts: number;
  urgentAlerts: number;
  // Lo que el cliente ha mandado y espera respuesta (bandeja «Por revisar»):
  // check-ins sin revisar y revisiones de técnica pendientes.
  pendingCheckins: number;
  pendingFormChecks: number;
}

// Por qué se ordena por columnas y no por un "score" único: cualquier
// fórmula que mezcle adherencia, peso y alertas en un número esconde
// exactamente lo que el entrenador necesita ver, y además tendría que
// justificar sus pesos. Ordenar por la columna que le importa hoy no
// necesita justificación ninguna.
export type RosterSortKey =
  | 'name'
  | 'adherence'
  | 'weight'
  | 'checkin'
  | 'sessions'
  | 'review'
  | 'alerts';

// Lo que la tabla pide al servidor: una página con su búsqueda, filtros y
// orden (ver roster-service.js#parseRosterQuery). `page` es 0-based.
export interface RosterQuery {
  page: number;
  limit: number;
  search: string;
  sort: RosterSortKey;
  // true = de mayor a menor / más reciente primero.
  descending: boolean;
  weakest: AdherenceDimensionKey | null;
  onlyWithAlerts: boolean;
  onlyOverdueCheckin: boolean;
  onlyWithPending: boolean;
}

// Cuántos clientes quedarían al elegir cada opción del panel de filtros, con
// la búsqueda y el resto de filtros como están.
export interface RosterFilterCounts {
  weakest: Record<AdherenceDimensionKey | 'any', number>;
  alerts: number;
  overdue: number;
  pending: number;
}

export interface RosterResponse {
  periodDays: number;
  // Bloque "Pendientes" (intake sin enviar o por revisar): entero, fuera de
  // la paginación, sin búsqueda ni filtros.
  pending: RosterClient[];
  // La página pedida, ya filtrada y ordenada.
  clients: RosterClient[];
  // Filas que cumplen búsqueda + filtros.
  total: number;
  // Filas de la tabla sin búsqueda ni filtros: 0 = todavía no hay clientes.
  totalActive: number;
  // La página servida: si la pedida ya no existe, la última que hay.
  page: number;
  limit: number;
  counts: RosterFilterCounts;
}
