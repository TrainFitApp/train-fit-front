// Movimiento 1 Coach Pro — espejo de components/clientProgress/
// roster-service.js (backend).

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
  absolute: number;
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
}

export interface RosterResponse {
  periodDays: number;
  clients: RosterClient[];
}
