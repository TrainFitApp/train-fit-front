// Mensajes de prueba del selector que sale SOLO con la API en localhost (ver
// isLocalApi y assistant-chat): una frase por caso, para probar el asistente
// sin escribir. Valen tanto para la IA simulada del back
// (assistant-llm-simulated.js) como para el modelo real. Los nombres de
// cliente son los de la base local de pruebas (u@u se llama «Test»).
// Probado en assistant-view.util.test.js.

import type { AssistantApp } from './models/assistant.model';

export interface AssistantDevMessage {
  /** El caso del catálogo que debería elegir. */
  intent: string;
  /** Sufijo de la clave ASSISTANT.UI.DEV_MSG_<key> con la frase en es y en. */
  key: string;
}

const CLIENT: AssistantDevMessage[] = [
  { intent: 'answer', key: 'RIR' },
  { intent: 'review_progress', key: 'PROGRESS' },
  { intent: 'start_workout', key: 'WORKOUT' },
  { intent: 'log_food', key: 'FOOD_LOG' },
  { intent: 'food_macros', key: 'FOOD_MACROS' },
  { intent: 'log_weight', key: 'WEIGHT' },
  { intent: 'set_goal', key: 'GOAL' },
  { intent: 'build_diet', key: 'DIET' },
  { intent: 'create_routine', key: 'ROUTINE' },
  { intent: 'add_supplement', key: 'SUPPLEMENT' },
  { intent: 'out_of_scope', key: 'MEDICAL' },
  { intent: 'out_of_scope', key: 'OFF_TOPIC' },
];

const TRAINER: AssistantDevMessage[] = [
  { intent: 'open_client', key: 'T_CLIENT' },
  { intent: 'review_status', key: 'T_REVIEWS' },
  { intent: 'my_tasks', key: 'T_TASKS' },
  { intent: 'client_diet', key: 'T_DIET' },
  { intent: 'open_next_week', key: 'T_NEXT_WEEK' },
  { intent: 'out_of_scope', key: 'OFF_TOPIC' },
];

export function devMessagesFor(app: AssistantApp): AssistantDevMessage[] {
  return app === 'trainer' ? TRAINER : CLIENT;
}

/** ¿La API es la del propio equipo (localhost, 127.0.0.1 o [::1])? */
export function isLocalApi(apiUrl: string | null | undefined): boolean {
  try {
    const { hostname } = new URL(String(apiUrl));
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]' || hostname.endsWith('.localhost');
  } catch {
    return false;
  }
}
