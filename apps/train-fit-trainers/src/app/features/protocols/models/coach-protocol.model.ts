// Fase 4 Coach Pro — espejo de components/coachProtocols/ (backend).

export type ProtocolTaskType = 'steps' | 'water' | 'sleep' | 'cardio' | 'custom';

export interface ProtocolDailyTask {
  type: ProtocolTaskType;
  label: string | null;
  target: number;
  unit: string;
}

export type ProtocolCheckinFrequency = 'once' | 'daily' | 'weekly' | 'monthly';

// Un check-in que el protocolo programa al aplicarse, con su cadencia (los
// mismos valores que la programación de la ficha). Empieza el día de aplicar.
export interface ProtocolCheckin {
  templateId: string;
  frequency: ProtocolCheckinFrequency;
  interval: number;
  time: string;
}

// kcal y g/día que se fijan como objetivo nutricional del cliente al aplicar.
export interface ProtocolNutritionTarget {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface CoachProtocol {
  _id: string;
  name: string;
  description: string;
  // Solo en protocolos anteriores a `checkins`: se lee como uno semanal
  // (ver protocolCheckins).
  checkinTemplateId: string | null;
  checkins?: ProtocolCheckin[];
  nutritionTarget?: ProtocolNutritionTarget | null;
  dietTemplateId: string | null;
  routineTemplateId: string | null;
  ruleIds: string[];
  dailyTasks: ProtocolDailyTask[];
  createdAt: string;
  updatedAt: string;
}

// Resultado de aplicar un protocolo a un cliente. Cada paso es
// independiente: uno puede fallar sin tumbar el resto, y el coach necesita
// saber exactamente cuál.
export interface ProtocolStepResult {
  key: string;
  label: string;
  status: 'applied' | 'skipped' | 'failed';
  error?: string;
}

export interface ProtocolApplyResult {
  clientId: string;
  success: boolean;
  error?: string;
  steps?: ProtocolStepResult[];
}

export const PROTOCOL_TASK_PRESETS: { type: ProtocolTaskType; label: string; unit: string; target: number }[] = [
  { type: 'steps', label: 'Pasos diarios', unit: 'pasos', target: 10000 },
  { type: 'water', label: 'Agua', unit: 'l', target: 2 },
  { type: 'sleep', label: 'Horas de sueño', unit: 'h', target: 8 },
  { type: 'cardio', label: 'Cardio', unit: 'min', target: 30 },
];

// Espejo de protocol-content.js#protocolCheckins (backend).
export function protocolCheckins(protocol: Pick<CoachProtocol, 'checkins' | 'checkinTemplateId'>): ProtocolCheckin[] {
  if (protocol.checkins?.length) return protocol.checkins;
  if (protocol.checkinTemplateId) {
    return [{ templateId: protocol.checkinTemplateId, frequency: 'weekly', interval: 1, time: '09:00' }];
  }
  return [];
}

// Cadencias de un toque. "Otra" abre intervalo y unidad a mano.
export const CHECKIN_CADENCE_PRESETS: { key: string; label: string; frequency: ProtocolCheckinFrequency; interval: number }[] = [
  { key: 'once', label: 'Una vez', frequency: 'once', interval: 1 },
  { key: 'daily', label: 'Diario', frequency: 'daily', interval: 1 },
  { key: 'weekly', label: 'Semanal', frequency: 'weekly', interval: 1 },
  { key: 'biweekly', label: 'Quincenal', frequency: 'weekly', interval: 2 },
  { key: 'monthly', label: 'Mensual', frequency: 'monthly', interval: 1 },
];

export function cadencePresetKey(checkin: Pick<ProtocolCheckin, 'frequency' | 'interval'>): string {
  const preset = CHECKIN_CADENCE_PRESETS.find(
    (p) => p.frequency === checkin.frequency && (p.frequency === 'once' || p.interval === checkin.interval)
  );
  return preset?.key || 'custom';
}

// "Semanal", "Cada 3 semanas"... Sin fecha: el día lo pone la aplicación.
export function protocolCadenceLabel(checkin: Pick<ProtocolCheckin, 'frequency' | 'interval'>): string {
  const preset = CHECKIN_CADENCE_PRESETS.find((p) => p.key === cadencePresetKey(checkin));
  if (preset) return preset.label;
  const unit = checkin.frequency === 'daily' ? 'días' : checkin.frequency === 'weekly' ? 'semanas' : 'meses';
  return `Cada ${checkin.interval} ${unit}`;
}
