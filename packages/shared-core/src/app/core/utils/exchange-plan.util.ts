// Cuadrar un día pautado en intercambios contra los gramos del objetivo, y
// proponer el reparto que lo cuadra.
//
// Vive aquí y no en el backend por lo mismo que exchange-math.util.ts: se
// ejecuta mientras el entrenador sube y baja contadores, y hacer un viaje al
// servidor por cada medio intercambio sería inutilizable. El backend tiene su
// propia mitad (components/foodExchanges/exchange-profile.js) porque la
// necesita la migración; la frontera entre las dos es clara — allí se leen
// las macros de los productos del catálogo, aquí se planifica el día.
//
// SIN IMPORTS, a propósito: el test de al lado es node:test apuntado directo
// a este .ts, y Node solo puede importarlo si no hay nada que resolver más
// allá de quitar los tipos (pide Node >= 22.6).
//
// LO QUE ESTO NO HACE, igual que el resto del componente: decidir
// equivalencias. Los perfiles con los que multiplica los escribió el
// entrenador. Lo que hace es la cuenta que él hace a mano con la calculadora
// cada vez que monta una dieta por intercambios.

export type MacroKey = 'kcal' | 'protein' | 'carbs' | 'fat';

export const PLAN_MACROS: MacroKey[] = ['kcal', 'protein', 'carbs', 'fat'];

/** El papel de un grupo al repartir el día. */
export type ExchangeRole = 'carb' | 'protein' | 'fat' | 'vegetable' | 'fruit' | 'dairy';

export interface ServingProfile {
  kcal?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;
}

export interface PlannedExchange {
  groupId?: string;
  groupName?: string;
  count?: number | null;
  serving?: ServingProfile | null;
  /** El grupo que no se pesa: no suma, y está bien que no sume. */
  freeQuantity?: boolean;
}

export interface PlannedMeal {
  name?: string;
  exchanges?: PlannedExchange[] | null;
}

export interface MacroTotals {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface RepartoSum {
  totals: MacroTotals;
  /** Cuántas raciones han podido sumarse. */
  counted: number;
  /** No suman por decisión del entrenador. Nota, no problema. */
  free: { groupName: string; count: number }[];
  /** No suman porque falta el perfil. Esto sí impide dar el cuadre por bueno. */
  incomplete: { groupName: string; count: number }[];
}

/** Media ración: la unidad más pequeña que se pauta de verdad. */
export const PLAN_STEP = 0.5;

function isPositive(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

// `Number(null)` es 0 y `Number.isFinite(0)` es true, así que hay que
// preguntar por el null ANTES de convertir: si no, un perfil al que le falta
// un macro se da por completo y el día cuadra por lo bajo sin decir nada.
function isDeclared(value: unknown): boolean {
  return value !== null && value !== undefined && Number.isFinite(Number(value));
}

function round(macro: MacroKey, value: number): number {
  return macro === 'kcal' ? Math.round(value) : Math.round(value * 10) / 10;
}

export function roundToStep(value: number): number {
  return Math.round(value / PLAN_STEP) * PLAN_STEP;
}

export function isCompleteProfile(serving: ServingProfile | null | undefined): boolean {
  return PLAN_MACROS.every((macro) => isDeclared(serving?.[macro]));
}

/**
 * Lo que suma el reparto del día.
 *
 * Tres estados y no dos: lo que suma, lo que no suma a propósito (grupos
 * libres) y lo que no suma porque falta el dato. Juntar los dos últimos haría
 * saltar el aviso de "no cuadrable" en repartos perfectamente definidos que
 * llevan verduras, y un aviso que salta sin motivo se aprende a ignorar.
 */
export function sumReparto(meals: PlannedMeal[] | null | undefined): RepartoSum {
  const totals: MacroTotals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  const free: { groupName: string; count: number }[] = [];
  const incomplete: { groupName: string; count: number }[] = [];
  let counted = 0;

  for (const meal of meals || []) {
    for (const exchange of meal?.exchanges || []) {
      const count = Number(exchange?.count);
      if (!isPositive(count)) continue;

      const row = { groupName: exchange?.groupName || '', count };
      if (exchange?.freeQuantity) {
        free.push(row);
        continue;
      }
      if (!isCompleteProfile(exchange?.serving)) {
        incomplete.push(row);
        continue;
      }
      counted += 1;
      for (const macro of PLAN_MACROS) {
        totals[macro] += Number(exchange!.serving![macro]) * count;
      }
    }
  }

  for (const macro of PLAN_MACROS) totals[macro] = round(macro, totals[macro]);
  return { totals, counted, free, incomplete };
}

export interface MacroDiff {
  macro: MacroKey;
  planned: number;
  target: number;
  diff: number;
  pct: number;
  /** null cuando el objetivo no define ese macro: no hay nada contra qué cuadrar. */
  withinTolerance: boolean | null;
}

/**
 * El cuadre: reparto contra los gramos del mismo objetivo.
 *
 * `withinTolerance: null` y no `false` cuando el objetivo no declara ese
 * macro. Un objetivo sin grasa definida no es un objetivo con 0 g de grasa, y
 * pintarlo en rojo mandaría a corregir algo que nadie ha pautado.
 */
export function cuadre(
  totals: MacroTotals,
  targets: Partial<Record<MacroKey, number | null | undefined>>,
  tolerancePct = 10
): MacroDiff[] {
  return PLAN_MACROS.map((macro) => {
    const planned = Number(totals?.[macro]) || 0;
    const target = Number(targets?.[macro]);
    if (!isPositive(target)) {
      return { macro, planned, target: 0, diff: 0, pct: 0, withinTolerance: null };
    }
    const diff = round(macro, planned - target);
    const pct = Math.round((diff / target) * 1000) / 10;
    return { macro, planned, target, diff, pct, withinTolerance: Math.abs(pct) <= tolerancePct };
  });
}

// --- Proponer el reparto ---

export interface PlanGroup {
  _id: string;
  name: string;
  serving?: ServingProfile | null;
  role?: ExchangeRole | null;
  freeQuantity?: boolean;
}

export interface ProposedCount {
  groupId: string;
  groupName: string;
  count: number;
  role: ExchangeRole;
}

export interface Proposal {
  counts: ProposedCount[];
  /** Los papeles que no se pudieron cubrir, con su motivo. */
  missing: { role: ExchangeRole | 'targets'; reason: string }[];
}

const FIXED_ROLES: ExchangeRole[] = ['vegetable', 'fruit', 'dairy'];

function pickByRole(groups: PlanGroup[], role: ExchangeRole): PlanGroup | null {
  return (
    groups.find(
      (group) => group.role === role && !group.freeQuantity && isCompleteProfile(group.serving)
    ) || null
  );
}

function contribution(counts: ProposedCount[], groups: PlanGroup[], macro: MacroKey): number {
  return counts.reduce((total, row) => {
    const group = groups.find((candidate) => candidate._id === row.groupId);
    return total + Number(group?.serving?.[macro] || 0) * row.count;
  }, 0);
}

/**
 * Cuántas raciones de cada grupo hacen falta para llegar a los gramos del
 * objetivo.
 *
 * El orden es el de cualquier manual de dietética, y no un optimizador:
 *
 *   1. Verdura, fruta y lácteo se FIJAN por criterio del entrenador. No se
 *      calculan: cuánta verdura come alguien no sale de una ecuación.
 *   2. Los hidratos que falten, entre el grupo de hidratos.
 *   3. La proteína que falte, DESCONTANDO la que ya aportan los anteriores.
 *   4. La grasa que falte, DESCONTANDO la del grupo de proteína.
 *
 * Cada paso descuenta lo anterior, que es justo lo que se olvida al hacerlo a
 * mano y lo que hace que un reparto se pase de proteína sin que se vea.
 *
 * Devuelve una PROPUESTA. Quien decide sigue siendo él: sale en el editor con
 * todo editable y el cuadre en vivo al lado.
 */
export function proposeReparto(
  targets: Partial<Record<MacroKey, number | null | undefined>>,
  groups: PlanGroup[],
  fixed: Partial<Record<ExchangeRole, number>> = {}
): Proposal {
  const counts: ProposedCount[] = [];
  const missing: Proposal['missing'] = [];

  if (!isPositive(Number(targets?.carbs)) || !isPositive(Number(targets?.protein))) {
    missing.push({
      role: 'targets',
      reason: 'El objetivo necesita al menos hidratos y proteína en gramos',
    });
    return { counts, missing };
  }

  const push = (group: PlanGroup | null, role: ExchangeRole, count: number) => {
    if (!group) return;
    const rounded = roundToStep(count);
    if (rounded <= 0) return;
    counts.push({ groupId: group._id, groupName: group.name, count: rounded, role });
  };

  // 1. Lo que se fija por criterio.
  for (const role of FIXED_ROLES) {
    const group = pickByRole(groups, role);
    const count = Number(fixed?.[role]);
    if (!group) {
      if (isPositive(count)) {
        missing.push({ role, reason: 'no tienes ningún grupo con ese papel y perfil completo' });
      }
      continue;
    }
    push(group, role, isPositive(count) ? count : 0);
  }

  // 2. Hidratos.
  const carbGroup = pickByRole(groups, 'carb');
  if (!carbGroup) {
    missing.push({ role: 'carb', reason: 'no tienes ningún grupo de hidratos con perfil completo' });
  } else {
    const perServing = Number(carbGroup.serving?.carbs);
    const remaining = Number(targets.carbs) - contribution(counts, groups, 'carbs');
    if (isPositive(perServing)) push(carbGroup, 'carb', remaining / perServing);
  }

  // 3. Proteína, descontando la que ya aportan hidratos, lácteos y verdura.
  const proteinGroup = pickByRole(groups, 'protein');
  if (!proteinGroup) {
    missing.push({
      role: 'protein',
      reason: 'no tienes ningún grupo de proteína con perfil completo',
    });
  } else {
    const perServing = Number(proteinGroup.serving?.protein);
    const remaining = Number(targets.protein) - contribution(counts, groups, 'protein');
    if (isPositive(perServing)) push(proteinGroup, 'protein', remaining / perServing);
  }

  // 4. Grasa, descontando la que arrastra el grupo de proteína.
  const fatGroup = pickByRole(groups, 'fat');
  if (!fatGroup) {
    if (isPositive(Number(targets.fat))) {
      missing.push({ role: 'fat', reason: 'no tienes ningún grupo de grasa con perfil completo' });
    }
  } else if (isPositive(Number(targets.fat))) {
    const perServing = Number(fatGroup.serving?.fat);
    const remaining = Number(targets.fat) - contribution(counts, groups, 'fat');
    if (isPositive(perServing)) push(fatGroup, 'fat', remaining / perServing);
  }

  return { counts, missing };
}

export interface Fix {
  groupId: string;
  groupName: string;
  delta: number;
  /** Cómo queda el peor desvío después de aplicarlo. */
  worstPctAfter: number;
}

/**
 * El único paso que más acerca el reparto al objetivo.
 *
 * Prueba ±media y ±una ración de cada grupo y se queda con el que deja el peor
 * desvío más bajo. Un paso y no una solución completa: el entrenador ve qué
 * mover y decide, en vez de que le reescriban el reparto entero por 6 g de
 * grasa.
 */
export function suggestFix(
  meals: PlannedMeal[] | null | undefined,
  targets: Partial<Record<MacroKey, number | null | undefined>>,
  tolerancePct = 10
): Fix | null {
  const base = sumReparto(meals);
  const worstOf = (totals: MacroTotals) =>
    cuadre(totals, targets, tolerancePct)
      .filter((row) => row.withinTolerance !== null)
      .reduce((worst, row) => Math.max(worst, Math.abs(row.pct)), 0);

  const baseWorst = worstOf(base.totals);
  if (baseWorst <= tolerancePct) return null;

  // Un grupo por id, con su perfil: el mismo grupo puede estar en tres
  // comidas y moverlo es moverlo una vez.
  const byGroup = new Map<string, { name: string; serving: ServingProfile; total: number }>();
  for (const meal of meals || []) {
    for (const exchange of meal?.exchanges || []) {
      if (exchange?.freeQuantity || !isCompleteProfile(exchange?.serving)) continue;
      const id = String(exchange?.groupId || '');
      const current = byGroup.get(id);
      byGroup.set(id, {
        name: exchange?.groupName || current?.name || '',
        serving: exchange!.serving!,
        total: (current?.total || 0) + Number(exchange?.count || 0),
      });
    }
  }

  let best: Fix | null = null;
  for (const [groupId, group] of byGroup) {
    for (const delta of [-1, -PLAN_STEP, PLAN_STEP, 1]) {
      // No se puede quitar más de lo que hay pautado.
      if (group.total + delta < 0) continue;

      const totals = { ...base.totals };
      for (const macro of PLAN_MACROS) {
        totals[macro] = round(macro, totals[macro] + Number(group.serving[macro] || 0) * delta);
      }
      const worst = worstOf(totals);
      if (worst < (best?.worstPctAfter ?? baseWorst)) {
        best = { groupId, groupName: group.name, delta, worstPctAfter: worst };
      }
    }
  }

  return best;
}

// --- Perfiles de referencia ---
//
// Para qué: un grupo heredado declara UNA cifra ("1 ración = 20 g de
// proteína") y le faltan las otras tres, así que no puede cuadrar el día.
// Teclearlas grupo a grupo es el peaje que la migración le cobraría a quien
// ya estaba usando intercambios.
//
// La referencia son los perfiles de la tabla estándar
// (components/foodExchanges/starter-pack.js), ESCALADOS a su tamaño de
// ración. Sin escalar no valdrían de nada: la ración estándar de proteína son
// 7 g y la suya 20, y meterle 55 kcal a una ración de 20 g de proteína sería
// equivocarse por tres.
//
// Sigue siendo una PROPUESTA que él acepta con un toque, y rellena solo lo que
// tenga en blanco. Lo que él declaró no se toca: el sistema no decide qué
// equivale a qué, y una estimación de macros no es una equivalencia.

export interface ReferenceProfile {
  key: string;
  name: string;
  category: string;
  anchor: MacroKey;
  serving: ServingProfile;
}

export interface ScaledReference extends ReferenceProfile {
  /** Cuánto se ha estirado la referencia para llegar a su ración. */
  ratio: number;
  /** El perfil ya escalado: lo que se rellenaría. */
  scaled: ServingProfile;
  /**
   * Ratio muy alejado de 1: la estimación se está estirando demasiado y deja
   * de ser fiable. No se oculta —- puede ser justo lo que él quiere—- pero se
   * dice.
   */
  isStretched: boolean;
}

/** Fuera de esta horquilla, extrapolar deja de tener sentido. */
const SAFE_RATIO = { min: 0.25, max: 4 };

/**
 * Los perfiles de referencia que sirven para este grupo, ya escalados.
 *
 * Solo los que igualan lo mismo que él: escalar un perfil de hidratos por una
 * ración de proteína no significa nada. Se ordenan poniendo delante los de su
 * misma categoría y, dentro de eso, los que menos hay que estirar.
 */
export function referenceCandidates(
  references: ReferenceProfile[] | null | undefined,
  anchor: MacroKey | null | undefined,
  anchorAmount: unknown,
  category?: string | null
): ScaledReference[] {
  if (!anchor || !isPositive(Number(anchorAmount))) return [];

  const wanted = String(category || '').trim().toLowerCase();
  return (references || [])
    .filter((reference) => reference.anchor === anchor)
    .map((reference) => {
      const base = Number(reference.serving?.[anchor]);
      if (!isPositive(base)) return null;
      const ratio = Number(anchorAmount) / base;

      const scaled: ServingProfile = {};
      for (const macro of PLAN_MACROS) {
        const value = reference.serving?.[macro];
        scaled[macro] =
          value === null || value === undefined
            ? null
            : round(macro, Number(value) * ratio);
      }
      // El anchor queda EXACTO en lo que él dijo, no en lo que salga de
      // multiplicar: es su cifra y no se redondea contra ella.
      scaled[anchor] = round(anchor, Number(anchorAmount));

      return {
        ...reference,
        ratio: Math.round(ratio * 100) / 100,
        scaled,
        isStretched: ratio < SAFE_RATIO.min || ratio > SAFE_RATIO.max,
      };
    })
    .filter((row): row is ScaledReference => !!row)
    .sort((a, b) => {
      const aCategory = a.category.toLowerCase() === wanted ? 0 : 1;
      const bCategory = b.category.toLowerCase() === wanted ? 0 : 1;
      if (aCategory !== bCategory) return aCategory - bCategory;
      return Math.abs(Math.log(a.ratio)) - Math.abs(Math.log(b.ratio));
    });
}

/**
 * Aplica una referencia rellenando SOLO los macros en blanco.
 *
 * Lo que él escribió no se pisa nunca, ni siquiera el anchor: si ya puso 110
 * kcal y la referencia dice 157, se queda con las suyas. Aceptar una
 * sugerencia no puede deshacerle una decisión.
 */
export function applyReference(
  current: ServingProfile | null | undefined,
  reference: ScaledReference
): ServingProfile {
  const next: ServingProfile = { ...(current || {}) };
  for (const macro of PLAN_MACROS) {
    if (isDeclared(next[macro])) continue;
    const value = reference.scaled?.[macro];
    if (value !== null && value !== undefined) next[macro] = value;
  }
  return next;
}
