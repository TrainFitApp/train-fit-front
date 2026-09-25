import { WeekNeed, StepsFromHabit } from '../../../../diet-templates/models/diet-suggestion.model';
import { Table } from 'src/app/core/models/table';
import { Workout } from 'src/app/core/models/workout';
import { Anthropometry } from 'src/app/features/diet-days/components/weight-info/models/anthropometry';
import { CustomCheckinQuestion } from '../../../../checkin-templates/models/checkin-template.model';

export type ClientScope = 'training' | 'nutrition';
export type ClientDetailTab =
  // Fase 2 Coach Pro — 'summary' va primero y es la pestaña por defecto:
  // hasta ahora la ficha abría en Entrenamiento o Nutrición, que responden
  // "qué le he pautado", nunca "cómo va".
  | 'summary'
  | ClientScope
  | 'measurements'
  | 'notes'
  | 'history'
  | 'payments'
  | 'pain'
  | 'tasks';

// Movimiento 1 Coach Pro — la ficha llegó a tener 9 pestañas en fila: con
// nombres cortos y sin jerarquía, encontrar algo era leerlas todas cada vez,
// y en móvil ni siquiera cabían sin desplazamiento lateral.
//
// Se agrupan en 4 secciones que responden a las 4 preguntas que un
// entrenador se hace sobre un cliente: cómo va (Resumen), qué le he mandado
// (Plan), qué ha pasado desde entonces (Progreso) y qué tengo pendiente con
// él (Gestión). Las pestañas de antes NO desaparecen: pasan a ser
// subpestañas dentro de su sección, así que ni los paneles ni sus datos
// cambian — solo el envoltorio de navegación.
export type ClientDetailSection = 'summary' | 'plan' | 'progress' | 'management';

export interface ClientDetailTabDef {
  key: ClientDetailTab;
  label: string;
  // Icono de Ionicons que acompaña a la etiqueta en la subbarra. Va aquí y
  // no en la plantilla para que añadir una subpestaña sea tocar UN sitio:
  // el mapa de secciones ya es la fuente de la que sale SECTION_BY_TAB.
  icon: string;
  // Qué relación hace falta para que la subpestaña exista:
  //   'training' | 'nutrition' — solo ese scope
  //   'any'                    — cualquiera de los dos
  //   undefined                — siempre visible
  requiresScope?: ClientScope | 'any';
}

export interface ClientDetailSectionDef {
  key: ClientDetailSection;
  label: string;
  tabs: ClientDetailTabDef[];
}

export const CLIENT_DETAIL_SECTIONS: ClientDetailSectionDef[] = [
  {
    key: 'summary',
    label: 'Resumen',
    // Sección de una sola pestaña: la subbarra se oculta (ver
    // visibleSubTabs en client-detail.page.ts). Una subbarra con un único
    // botón siempre pulsado no informa de nada.
    tabs: [{ key: 'summary', label: 'Resumen', icon: 'analytics-outline' }],
  },
  {
    // Lo que el entrenador ha PAUTADO.
    key: 'plan',
    label: 'Plan',
    tabs: [
      { key: 'training', label: 'Entrenamiento', icon: 'barbell-outline', requiresScope: 'training' },
      { key: 'nutrition', label: 'Nutrición', icon: 'nutrition-outline', requiresScope: 'nutrition' },
      // "Tareas" chocaba con las tareas del propio coach del panel Hoy: estas
      // son cosas que hace EL CLIENTE cada día, de ahí "Hábitos". Vivió antes
      // en Gestión ("lo que el ENTRENADOR tiene pendiente") y luego en
      // Progreso (una de las cuatro dimensiones de adherencia) — aquí es
      // donde se pauta el hábito en sí, junto a lo demás que el entrenador
      // le marca al cliente. Sin requiresScope: no depende de tener
      // entrenamiento o nutrición activos, un cliente puede tener hábitos
      // pautados con cualquier combinación de scopes.
      { key: 'tasks', label: 'Hábitos', icon: 'repeat-outline' },
    ],
  },
  {
    // Lo que ha PASADO desde entonces.
    key: 'progress',
    label: 'Progreso',
    tabs: [
      // Medidas y check-ins eran dos subpestañas contiguas que contaban lo
      // mismo: el check-in es de donde salen casi todas las medidas (sus
      // campos de composición corporal y perímetros se guardan en
      // Anthropometry), y "solicitar antropometría" es la misma petición sin
      // formulario. Ahora es un panel único.
      //
      // Sin requiresScope, como tenía Check-ins: un cliente sin scope de
      // entrenamiento ni de nutrición conserva su agenda de check-ins (el
      // bloque de medidas de dentro sí sigue pidiendo scope).
      { key: 'measurements', label: 'Medidas y check-ins', icon: 'body-outline' },
      // Movimiento final — el dolor sale de dentro de Medidas a su propia
      // subpestaña. Estaba como tercera tarjeta bajo el gráfico y la
      // calculadora, y es justo lo que un entrenador mira ANTES de
      // programar piernas: enterrarlo tras dos bloques de scroll era
      // esconder lo único que puede obligarle a cambiar la sesión de hoy.
      { key: 'pain', label: 'Dolor', icon: 'bandage-outline' },
      // "Historial" no decía historial DE QUÉ, con tres pestañas más al lado
      // que también son histórico (medidas, check-ins, cobros). "Sesiones" y
      // no "Entrenamientos": dentro de *Progreso* ya se entiende que son las
      // hechas, y "Entrenamientos" se distinguiría del "Entrenamiento" de
      // *Plan* por una sola letra.
      { key: 'history', label: 'Sesiones', icon: 'time-outline', requiresScope: 'training' },
    ],
  },
  {
    // Lo que el entrenador tiene PENDIENTE con este cliente.
    key: 'management',
    label: 'Gestión',
    tabs: [
      { key: 'notes', label: 'Notas', icon: 'document-text-outline' },
      { key: 'payments', label: 'Cobros', icon: 'card-outline' },
    ],
  },
];

// La sección a la que pertenece cada pestaña. Se deriva de la tabla de
// arriba en vez de mantenerse a mano: una pestaña movida de sección sin
// actualizar el mapa dejaría la subbarra señalando a otro sitio.
export const SECTION_BY_TAB: Record<ClientDetailTab, ClientDetailSection> =
  CLIENT_DETAIL_SECTIONS.reduce((map, section) => {
    for (const tab of section.tabs) map[tab.key] = section.key;
    return map;
  }, {} as Record<ClientDetailTab, ClientDetailSection>);

export interface TrainerNote {
  _id: string;
  text: string;
  pinned: boolean;
  createdAt: string;
}

// F09: reutiliza el modelo real de Table/Split/Workout/CustomExercise/Set del
// consumidor (packages/shared-core) en vez de un tipo empobrecido propio —
// el backend (getClientTables) devuelve exactamente esa misma estructura.
export type ClientTable = Table;

// Tarea 3 bis (2026-08) — "Objetivo de entrenamiento", versión mínima: tipo
// declarado. La frecuencia objetivo se quitó (2026-09): nunca fue el
// denominador real de "adherencia de entrenamiento" — esa se calcula sobre
// la fase vigente (ver client-progress), no sobre un número declarado a
// mano por el entrenador.
export type TrainingGoalType = 'strength' | 'hypertrophy' | 'endurance' | 'mobility' | 'general';

export interface TrainingGoal {
  trainingGoalType: TrainingGoalType | null;
}

// Un workout "aplanado" fuera de su split, con contexto de a qué rutina
// pertenece — usado por la sección de historial (F09) y F18.
export interface CompletedWorkoutEntry extends Workout {
  tableName: string;
  splitName: string;
}

// F17 — configuración de check-in ya aplicada a este cliente por este profesional.
export interface CheckinResponseEntry {
  _id: string;
  respondedAt: string;
  updatedAt?: string;
  // Las respuestas a preguntas propias comparten este mismo contenedor, con
  // la clave "custom:<id>" — de ahí que el valor ya no sea solo numérico.
  values: Record<string, number | string | boolean>;
  // Copia de las preguntas tal y como estaban al responder: la programación
  // puede cambiar después y la respuesta tiene que seguir leyéndose (por eso
  // ya no hace falta pedir la "config" del cliente aparte).
  customQuestions?: CustomCheckinQuestion[];
  // A qué semana de la fase de dieta pertenece.
  week?: { phaseId: string; number: number; start: string; end: string | null } | null;
}

// F26 — recordatorio de cobro (agenda manual, sin pagos reales).
export interface TrainerPayment {
  _id: string;
  amount: number;
  currency: string;
  dueDate: string;
  paidAt: string | null;
  note?: string;
}

// F20 — adherencia calórica: lo consumido contra lo pautado de cada día.
// Fase 1 Coach Pro — `percentage` pasa a ser sobre los días CON PLAN (antes
// sobre todos los días del calendario del rango, lo que hundía el número de
// cualquier cliente cuyo plan no cubriera el rango entero) y puede venir
// `null` cuando no hay ningún día con plan que medir — que no es lo mismo
// que un 0%. `coveragePercentage` es la otra mitad de la historia: qué parte
// del rango tenía plan.
export interface AdherenceSummary {
  percentage: number | null;
  coveragePercentage: number;
  daysCounted: number;
  daysInRange: number;
  // kcal = lo consumido ese día; plannedKcal = lo pautado. Cuadra si queda a
  // ±15 % de lo pautado.
  dailyBreakdown: { date: string; kcal: number; plannedKcal: number; withinMargin: boolean }[];
}

// F20-bis — mismo tipo que alimenta <app-anthropometry-chart> (shared-ui):
// el backend ya devuelve el árbol completo de medidas, así que en vez de un
// tipo empobrecido propio (antes solo {_id,date,weight}) se reutiliza el
// modelo real.
export type AnthropometryEntry = Anthropometry;

// Movimiento 5 Coach Pro — espejo de components/supplements/ (backend).
// Componente propio y no un campo del objetivo nutricional: un suplemento no
// es un macro, y cambia con independencia de las kcal.
export interface SupplementTiming {
  key: string;
  label: string;
}

export interface Supplement {
  _id: string;
  name: string;
  // Texto libre y no {cantidad, unidad}: las dosis reales son "5 g",
  // "2 cápsulas", "1 medida rasa".
  dose: string;
  timing: string;
  // Solo se usa con timing "custom".
  customTiming?: string;
  // Por qué se lo pauta. Lo lee el cliente: un suplemento sin motivo se
  // abandona a la tercera semana.
  reason?: string;
  purchaseUrl?: string;
  // Vacío = todos los días, que es el caso normal y no obliga a marcar
  // siete casillas.
  weekdays: number[];
  // Desde cuándo y hasta cuándo se toma (docs/plan-semanas.md).
  // `endDate` null = sin fecha de fin, se toma hasta nueva orden.
  startDate: string;
  endDate: string | null;
  active: boolean;
}

// F20-bis — un día del calendario de nutrición: cumplimiento (% de items
// pautados marcados como hechos) y si el cliente se saltó el plan ese día.
export interface NutritionComplianceDay {
  date: string;
  hasPlan: boolean;
  completionPercentage: number | null;
  skipped: boolean;
}

export interface NutritionComplianceSummary {
  status: 'ok';
  dailyBreakdown: NutritionComplianceDay[];
}

// F20-ter — comparación pautado vs. consumido, día a día. "Consumido" no es
// solo "marcó lo pautado como hecho": un item que el cliente añadió por su
// cuenta a la comida (sin que nadie se lo pautara) también cuenta, ver
// diet-days-nutrition-util.js#isItemConsumed en el backend.
export interface NutritionMacroTotals {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionTrackingDay {
  date: string;
  hasPlan: boolean;
  planned: NutritionMacroTotals;
  consumed: NutritionMacroTotals;
}

export interface NutritionTrackingSummary {
  status: 'ok';
  dailyTracking: NutritionTrackingDay[];
}

// Cumplimiento alimento a alimento de un rango (panel de resumen de una semana).
// `plannedDays` = en cuántos días se le pautó; `consumedDays` = en cuántos lo
// marcó como hecho. Vienen ordenados de peor a mejor cumplimiento.
export interface NutritionFoodCompliance {
  name: string;
  plannedDays: number;
  consumedDays: number;
  plannedQuantity: number;
  consumedQuantity: number;
}

export interface NutritionFoodsSummary {
  status: 'ok';
  items: NutritionFoodCompliance[];
  from: string;
  to: string;
}

// F30 — resultado por cliente de una operación "aplicar en bloque" (rutina/objetivo).
export interface BulkApplyResult {
  clientId: string;
  success: boolean;
  error?: string;
}

export interface MealSummary {
  _id: string;
  name: string;
  customProducts: unknown[];
  customRecipes: unknown[];
}

export interface DietDaySummary {
  _id: string;
  date: string;
  meals: MealSummary[];
  // TAREA5 — id de la Diet contenedora (User.dietInUse del cliente), no del
  // propio DietDay. Necesario para pedir productos/recetas recientes de esta
  // comida (GET /diets/:dietId/recent-products|recipes).
  dietId?: string;
}

// TAREA1/TAREA5 (replanteamiento MVP nutrición) — un alimento dentro de una
// alternativa de composición. Siempre un producto real O una receta real de
// la biblioteca (ProductSearchModalComponent, panel lateral) — ya no existe
// la opción de teclear macros a mano (no tenía sentido: un profesional pauta
// comida real, no un número inventado).
export interface MealFoodItemInput {
  productId?: string;
  productName?: string;
  recipeId?: string;
  recipeName?: string;
  quantity?: number;
}

// F12/F28 — una alternativa de composición al pautar una comida. Con 1 sola
// se aplica de inmediato (F12); con 2+ se guardan como propuestas para que
// el cliente elija (F28). Cada alternativa contiene VARIOS alimentos
// (`items`) — antes solo admitía uno, así que pautar "pollo + arroz +
// ensalada" en una misma comida exigía sobrescribir en 3 envíos sucesivos;
// ahora se acumulan en el panel y se envían juntos en un solo `customProducts`.
export interface MealAlternativeInput {
  label: string;
  items: MealFoodItemInput[];
}

// F29 — preferencias nutricionales del cliente, solo lectura para el profesional.
export interface ClientNutritionPreferences {
  clientId: string;
  allergies: string;
  favoriteFoods: string;
  dislikedFoods: string;
  // Restricciones estructuradas — filtro duro del cajón de sugerencias.
  dietaryFlags?: ('vegan' | 'vegetarian' | 'lactoseFree' | 'glutenFree')[];
  cooksAtHome: 'yes' | 'no' | 'sometimes' | null;
  disabledMealSlots: string[];
  mealSlotLabels: Record<string, string>;
  requestedAt: string | null;
  requestedBy: string | null;
  respondedAt: string | null;
}

// coach-tab FASE4 — tarea/hábito diario, entrada de cumplimiento 100% manual
// (sin integración con salud del dispositivo), solo el profesional la crea.
export type TrainerTaskType = 'steps' | 'water' | 'sleep' | 'cardio' | 'custom';

export interface TrainerTask {
  _id: string;
  type: TrainerTaskType;
  label: string | null;
  target: number;
  // Tope del rango, opcional: un hábito de pasos se pauta como "10.000 a
  // 15.000" (docs/plan-semanas.md), y de ahí sale el rango de pasos
  // que entra en el cálculo de kcal.
  targetMax: number | null;
  unit: string;
  active: boolean;
  createdAt: string;
}


// --- Objetivo nutricional del cliente, visto por su profesional ---
// (docs/plan-semanas.md). `source` manual = alguien tecleó esas kcal
// encima del cálculo, y recalcular el perfil ya no las pisa.
export interface ClientNutritionalGoal {
  _id: string;
  name: string;
  kcalTotal: number;
  proteinsGTotal: number;
  carbohydratesGTotal: number;
  fatGTotal: number;
  fiberGTotal: number | null;
  source: 'calculated' | 'manual';
  updatedAt: string;
}

export interface ClientNutritionalGoalResponse {
  goal: ClientNutritionalGoal | null;
  // Lo que saldría hoy de sus datos (último peso, último rango de pasos
  // declarado en un check-in), con la cuenta entera para poder enseñarla.
  calculated: {
    target: { kcal: number; protein: number; carbs: number; fat: number };
    inputs: WeekNeed['inputs'];
    breakdown: WeekNeed['breakdown'];
    weightSource: { weightKg: number; from: 'anthropometry' | 'signup'; date?: string } | null;
    stepsFromHabit: StepsFromHabit | null;
  } | null;
  // Qué biométricos faltan cuando no se puede calcular.
  missing: string[] | null;
}
