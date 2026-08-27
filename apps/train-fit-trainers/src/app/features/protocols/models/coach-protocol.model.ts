// Fase 4 Coach Pro — espejo de components/coachProtocols/ (backend).

export type ProtocolTaskType = 'steps' | 'water' | 'sleep' | 'cardio' | 'custom';

export interface ProtocolDailyTask {
  type: ProtocolTaskType;
  label: string | null;
  target: number;
  unit: string;
}

export interface ProtocolNutritionalGoal {
  // null = este protocolo no toca los macros. Distinto de 0 kcal.
  kcalTotal: number | null;
  proteinsGTotal: number | null;
  carbohydratesGTotal: number | null;
  fatGTotal: number | null;
}

export interface CoachProtocol {
  _id: string;
  name: string;
  description: string;
  nutritionalGoal: ProtocolNutritionalGoal;
  checkinTemplateId: string | null;
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
