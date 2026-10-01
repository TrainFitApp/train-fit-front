import { localizeRecord, localizeProp } from 'src/app/core/i18n/localized-catalog';
// Fase 3 Coach Pro — espejo de components/coachRules/ (backend).

export type RuleLevel = 'informative' | 'suggestion' | 'automatic';
export type RuleTrigger = 'daily' | 'after_checkin' | 'after_measurement';
export type RuleConditionLogic = 'all' | 'any';
export type RuleActionType = 'create_alert' | 'create_task';

export interface RuleCondition {
  metric: string;
  operator: string;
  value: number;
  periodDays: number;
}

export interface RuleAction {
  type: RuleActionType;
  message: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface CoachRule {
  _id: string;
  name: string;
  description: string;
  enabled: boolean;
  level: RuleLevel;
  trigger: RuleTrigger;
  conditions: RuleCondition[];
  conditionLogic: RuleConditionLogic;
  actions: RuleAction[];
  appliesTo: 'all_clients' | 'selected';
  clientIds: string[];
  lastEvaluatedAt: string | null;
  // Presente solo si el sistema la apagó solo por afectar a demasiados
  // clientes de golpe. Se muestra tal cual: un interruptor apagado sin
  // explicación parecería un fallo.
  disabledReason: string | null;
  createdAt: string;
  updatedAt: string;
}

// --- Catálogo servido por el backend ---
// La UI NO conoce métricas ni operadores: los pide. Así es imposible que
// ofrezca una combinación que el evaluador no sepa resolver.
export interface RuleOperator {
  key: string;
  label: string;
  suffix?: string;
}

export interface RuleMetric {
  key: string;
  label: string;
  unit: string;
  kind: 'series' | 'average' | 'days';
  group: string;
  operators: RuleOperator[];
  // false = la métrica no depende de un periodo (p. ej. "días sin check-in"),
  // así que el selector de periodo se oculta en vez de ofrecer una opción
  // que no cambiaría nada.
  periodAware: boolean;
}

export interface RulePeriod {
  days: number;
  label: string;
}

export interface RuleCatalog {
  metrics: RuleMetric[];
  periods: RulePeriod[];
}

export const RULE_LEVELS: { key: RuleLevel; label: string; description: string }[] = [
  {
    key: 'informative',
    label: 'Solo informar',
    description: 'Crea una alerta en tu panel. Tú decides qué hacer.',
  },
  {
    key: 'suggestion',
    label: 'Sugerir una acción',
    description: 'Crea la alerta y propone una tarea que aceptas con un clic.',
  },
  {
    key: 'automatic',
    label: 'Crear la tarea automáticamente',
    description: 'Crea la alerta y la tarea sin preguntarte.',
  },
];
RULE_LEVELS.forEach((item) => localizeProp(item, 'description', `AUTOMATIONS.LEVELS.DESC.${item.key}`));
RULE_LEVELS.forEach((item) => localizeProp(item, 'label', `AUTOMATIONS.LEVELS.LABEL.${item.key}`));

export const RULE_TRIGGERS: { key: RuleTrigger; label: string; description: string }[] = [
  { key: 'daily', label: 'Cada día', description: 'Revisa a todos tus clientes cada madrugada.' },
  {
    key: 'after_checkin',
    label: 'Tras un check-in',
    description: 'Solo revisa a quien haya respondido desde la última vez.',
  },
  {
    key: 'after_measurement',
    label: 'Tras una medición',
    description: 'Solo revisa a quien haya registrado medidas desde la última vez.',
  },
];
RULE_TRIGGERS.forEach((item) => localizeProp(item, 'description', `AUTOMATIONS.TRIGGERS.DESC.${item.key}`));
RULE_TRIGGERS.forEach((item) => localizeProp(item, 'label', `AUTOMATIONS.TRIGGERS.LABEL.${item.key}`));

export const RULE_GROUP_LABELS: Record<string, string> = {
  composicion: 'Composición corporal',
  medidas: 'Medidas',
  adherencia: 'Adherencia',
  bienestar: 'Bienestar',
  seguimiento: 'Seguimiento',
};
localizeRecord(RULE_GROUP_LABELS, 'AUTOMATIONS.GROUPS');
