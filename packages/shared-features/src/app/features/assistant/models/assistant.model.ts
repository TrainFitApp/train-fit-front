// Asistente trAInfit — espejo de components/assistant/ (backend). Lo que
// devuelve la API en cada turno y el estado de la mascota.

export type AssistantApp = 'client' | 'trainer';

export type AssistantUnavailableReason = 'unsupported_app' | 'professional' | 'disabled';

export interface AssistantEnergy {
  month: string;
  used: number;
  base: number;
  bonus: number;
  allowance: number;
  remaining: number;
  // 0..1: lo que llena la barra (y las placas de la mancuerna).
  level: number;
  // "YYYY-MM-DD": el día en que se recarga.
  resetsOn: string;
  // Lo de hoy frente a su tope diario (15 % del mes).
  today?: { used: number; cap: number; remaining: number };
}

// Sugerencia del momento: un atajo (0 ATP) con texto de sus datos.
export interface AssistantSuggestion {
  intent: string;
  code: string;
  params: Record<string, unknown>;
}

export interface AssistantState {
  available: boolean;
  reason: AssistantUnavailableReason | null;
  consent?: boolean;
  energy?: AssistantEnergy;
  quickActions?: string[];
  suggestions?: AssistantSuggestion[];
  // Puede apuntar con una foto del plato (cliente Premium).
  photo?: boolean;
}

// Lo que tiene en pantalla al escribir: la pantalla, el día que mira en
// Dietas o el cliente abierto en trainers.
export interface AssistantView {
  screen: string | null;
  date?: string | null;
  clientId?: string | null;
}

// Foto del plato, ya reducida en la app (base64 sin cabecera).
export interface AssistantImage {
  mediaType: 'image/jpeg' | 'image/png' | 'image/webp';
  data: string;
}

export interface AssistantMessage {
  // Código de assistant-catalog.ts; la app lo pinta con su plantilla
  // (ASSISTANT.MESSAGES.<código>) y los datos reales de `params`.
  code: string;
  params: Record<string, unknown>;
}

// Una línea de datos (resumen o vista previa): ASSISTANT.LINES.<código>.
export type AssistantLine = AssistantMessage;

// Una opción genérica de una vista previa (receta, plantilla, protocolo).
export interface AssistantPreviewChoice {
  name: string;
  // Texto traducible de la opción (seguir igual, ajustar a…); sin él, `name`.
  label?: AssistantLine;
  grams?: number;
  macros?: AssistantMacros;
}

export interface AssistantNavigate {
  screen: string;
  params: Record<string, unknown>;
}

export interface AssistantLink {
  label: { code?: string; text?: string };
  navigate?: AssistantNavigate;
  quick?: string;
}

export interface AssistantMacros {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Un producto del buscador para un alimento, con sus macros a esos gramos.
export interface AssistantFoodOption extends AssistantMacros {
  productId: string;
  name: string;
  brand: string | null;
}

// Un alimento de lo que se va a apuntar: lo que dijo, los gramos y hasta tres
// productos del buscador (va marcado el primero; se puede cambiar).
export interface AssistantFoodLine {
  food: string;
  grams: number;
  // Gramos de su ración (no los dijo) o estimados de una foto.
  assumed: boolean;
  estimated?: boolean;
  options: AssistantFoodOption[];
}

// Lo elegido en una vista previa al CONFIRMAR.
export interface AssistantChoice {
  option?: number;
  items?: number[];
  // Gramos que dejó en cada alimento al apuntar comida (null = los propuestos).
  grams?: (number | null)[];
  setGoal?: boolean;
}

export interface AssistantDietOption extends AssistantMacros {
  templateId: string;
  name: string;
  menus: number;
  factor: number;
  missingFlags: string[];
}

export interface AssistantRoutineOption {
  tableId: string;
  name: string;
  daysPerWeek: number;
  weeks: number;
}

// La vista previa de lo que se va a escribir; cada caso rellena lo suyo.
export interface AssistantPreview {
  // log_food
  date?: string;
  meal?: string;
  items?: AssistantFoodLine[];
  missing?: string[];
  // build_diet
  target?: AssistantMacros & { source: 'message' | 'goal' };
  options?: (AssistantDietOption | AssistantRoutineOption)[];
  startDate?: string;
  endDate?: string;
  days?: number;
  setGoal?: boolean;
  // set_goal
  goal?: AssistantMacros;
  // log_weight
  kg?: number;
  // add_supplement
  supplement?: { name: string; dose: string; timing: string };
  // El resto de casos: líneas de datos y, si hay que elegir, opciones.
  lines?: AssistantLine[];
  choices?: AssistantPreviewChoice[];
}

export type AssistantTurnKind = 'navigate' | 'info' | 'preview' | 'done' | 'refuse' | 'text';

export interface AssistantTurn {
  kind: AssistantTurnKind;
  message?: AssistantMessage;
  text?: string;
  navigate?: AssistantNavigate;
  links?: AssistantLink[];
  data?: any;
  preview?: AssistantPreview;
  action?: { id: string; intent: string; expiresAt: string };
  // Lo que conviene recargar en la app tras una acción hecha.
  refresh?: string[];
  // Datos de un resumen (semana, cliente, lista de la compra…).
  lines?: AssistantLine[];
  // DESHACER lo recién hecho (un CONFIRMAR más, hasta `expiresAt`).
  undo?: { id: string; expiresAt: string };
  // La fila de uso de esta respuesta, para valorarla (👍/👎).
  ref?: string;
}

export interface AssistantReply {
  turn: AssistantTurn;
  cost: number;
  energy: AssistantEnergy;
}

// Una burbuja del chat en la app.
export interface AssistantBubble {
  id: number;
  from: 'user' | 'assistant';
  text?: string;
  turn?: AssistantTurn;
  // Vista previa ya resuelta (confirmada, descartada o caducada).
  settled?: 'confirmed' | 'discarded' | 'expired';
  error?: string;
  // Foto que mandó con el mensaje (miniatura local, no se guarda).
  photo?: string;
  // Lo hecho ya se deshizo (o caducó el botón).
  undone?: boolean;
  // Su valoración de esta respuesta.
  feedback?: 'up' | 'down' | null;
}

export interface ReferralState {
  code: string;
  invited: number;
  rewarded: { asInviter: number; asInvitee: number };
  invitedBy: boolean;
  canRedeem: boolean;
  redeemWindowDays: number;
  // ATP que ganan los dos el mes en que el invitado paga.
  bonusAtp: number;
}
