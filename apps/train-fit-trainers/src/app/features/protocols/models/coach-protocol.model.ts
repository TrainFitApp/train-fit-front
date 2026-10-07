import { uiText, localizeProp } from 'src/app/core/i18n/localized-catalog';
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
  checkins: ProtocolCheckin[];
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
PROTOCOL_TASK_PRESETS.forEach((item) => localizeProp(item, 'unit', `PROTOCOLS.TASK_UNITS.${item.type}`));
PROTOCOL_TASK_PRESETS.forEach((item) => localizeProp(item, 'label', `PROTOCOLS.TASK_PRESETS.${item.type}`));

// Cadencias de un toque. "Otra" abre intervalo y unidad a mano.
export const CHECKIN_CADENCE_PRESETS: { key: string; label: string; frequency: ProtocolCheckinFrequency; interval: number }[] = [
  { key: 'once', label: 'Una vez', frequency: 'once', interval: 1 },
  { key: 'daily', label: 'Diario', frequency: 'daily', interval: 1 },
  { key: 'weekly', label: 'Semanal', frequency: 'weekly', interval: 1 },
  { key: 'biweekly', label: 'Quincenal', frequency: 'weekly', interval: 2 },
  { key: 'monthly', label: 'Mensual', frequency: 'monthly', interval: 1 },
];
CHECKIN_CADENCE_PRESETS.forEach((item) => localizeProp(item, 'label', `PROTOCOLS.CADENCES.${item.key}`));

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
  const unit = checkin.frequency === 'daily' ? uiText('PROTOCOLS.DIAS') : checkin.frequency === 'weekly' ? uiText('PROTOCOLS.SEMANAS') : uiText('PROTOCOLS.MESES');
  return uiText('PROTOCOLS.CADA', { interval: checkin.interval, unit });
}
