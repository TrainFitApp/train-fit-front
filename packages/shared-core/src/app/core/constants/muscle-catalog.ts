import { localizeProp } from '../i18n/localized-catalog';

// Catálogo muscular de los ejercicios — dos niveles y énfasis (2026-09).
//
// Espejo EXACTO de train-fit-back/components/exercises/muscle-catalog.js
// (backend). Si tocas uno, toca el otro. El porqué de cada decisión (grupos
// como unidad de volumen, porciones solo donde se pueden enfatizar, series
// fraccionales) está documentado allí.
//
// Las etiquetas son los nombres canónicos en español que ya traduce
// TranslateDbPipe (es-en-db.map.ts), igual que el catálogo de agujetas.

export type MuscleRole = 'primary' | 'secondary' | 'stabilizer';

export interface ExerciseMuscle {
  muscle: string;
  role: MuscleRole;
}

export interface MusclePortion {
  id: string;
  label: string;
}

export interface MuscleGroup {
  id: string;
  label: string;
  muscles: MusclePortion[];
}

// Series fraccionales: la serie cuenta entera para el músculo objetivo,
// media para el que colabora y nada para el que solo estabiliza.
export const MUSCLE_ROLE_FACTOR: Record<MuscleRole, number> = {
  primary: 1,
  secondary: 0.5,
  stabilizer: 0,
};

export const MUSCLE_ROLES: MuscleRole[] = ['primary', 'secondary', 'stabilizer'];

export const MUSCLE_ROLE_LABEL: Record<MuscleRole, string> = {
  primary: 'Principal',
  secondary: 'Secundario',
  stabilizer: 'Estabilizador',
};

export const MUSCLE_GROUPS: MuscleGroup[] = [
  {
    id: 'chest',
    label: 'Pectoral',
    muscles: [
      { id: 'chest_upper', label: 'Pectoral superior' },
      { id: 'chest_middle', label: 'Pectoral medio' },
      { id: 'chest_lower', label: 'Pectoral inferior' },
    ],
  },
  {
    id: 'back',
    label: 'Espalda',
    muscles: [
      { id: 'back_lats', label: 'Dorsal ancho' },
      { id: 'back_mid_traps', label: 'Trapecio medio y romboides' },
      { id: 'back_upper_traps', label: 'Trapecio superior' },
    ],
  },
  {
    id: 'shoulders',
    label: 'Hombro',
    muscles: [
      { id: 'delt_front', label: 'Deltoides anterior' },
      { id: 'delt_side', label: 'Deltoides lateral' },
      { id: 'delt_rear', label: 'Deltoides posterior' },
    ],
  },
  {
    id: 'biceps',
    label: 'Bíceps',
    muscles: [
      { id: 'biceps_long', label: 'Cabeza larga' },
      { id: 'biceps_short', label: 'Cabeza corta' },
      { id: 'biceps_brachialis', label: 'Braquial y braquiorradial' },
    ],
  },
  {
    id: 'triceps',
    label: 'Tríceps',
    muscles: [
      { id: 'triceps_long', label: 'Cabeza larga' },
      { id: 'triceps_lateral_medial', label: 'Cabezas lateral y medial' },
    ],
  },
  {
    id: 'forearms',
    label: 'Antebrazo',
    muscles: [
      { id: 'forearm_flexors', label: 'Flexores y agarre' },
      { id: 'forearm_extensors', label: 'Extensores' },
    ],
  },
  {
    id: 'abs',
    label: 'Abdomen',
    muscles: [
      { id: 'abs_rectus', label: 'Recto abdominal' },
      { id: 'abs_obliques', label: 'Oblicuos' },
    ],
  },
  { id: 'lower_back', label: 'Lumbar', muscles: [] },
  {
    id: 'quads',
    label: 'Cuádriceps',
    muscles: [
      { id: 'quads_rectus_femoris', label: 'Recto femoral' },
      { id: 'quads_vasti', label: 'Vastos' },
    ],
  },
  { id: 'hamstrings', label: 'Isquiosurales', muscles: [] },
  {
    id: 'glutes',
    label: 'Glúteo',
    muscles: [
      { id: 'glute_max', label: 'Glúteo mayor' },
      { id: 'glute_med', label: 'Glúteo medio y menor' },
    ],
  },
  { id: 'adductors', label: 'Aductores', muscles: [] },
  {
    id: 'calves',
    label: 'Gemelos y sóleo',
    muscles: [
      { id: 'calves_gastrocnemius', label: 'Gemelo' },
      { id: 'calves_soleus', label: 'Sóleo' },
    ],
  },
  { id: 'neck', label: 'Cuello', muscles: [] },
];

interface MuscleNode {
  id: string;
  label: string;
  groupId: string;
  isGroup: boolean;
}

const NODES = new Map<string, MuscleNode>();
for (const group of MUSCLE_GROUPS) {
  NODES.set(group.id, { id: group.id, label: group.label, groupId: group.id, isGroup: true });
  for (const muscle of group.muscles) {
    NODES.set(muscle.id, { ...muscle, groupId: group.id, isGroup: false });
  }
}

// Nombres en el idioma del usuario (MUSCLES.<id> en i18n); el español de
// arriba es el respaldo.
for (const role of MUSCLE_ROLES) localizeProp(MUSCLE_ROLE_LABEL, role, `MUSCLE_ROLES.${role}`);
for (const group of MUSCLE_GROUPS) {
  localizeProp(group, 'label', `MUSCLES.${group.id}`);
  group.muscles.forEach((muscle) => localizeProp(muscle, 'label', `MUSCLES.${muscle.id}`));
}
NODES.forEach((node) => localizeProp(node, 'label', `MUSCLES.${node.id}`));

const GROUP_BY_ID = new Map(MUSCLE_GROUPS.map((group) => [group.id, group]));
const CATALOG_ORDER = new Map([...NODES.keys()].map((id, index) => [id, index]));

export function muscleLabel(id: string): string {
  return NODES.get(id)?.label || id;
}

// Porciones que sueltas no dicen de qué músculo son ("Cabeza larga"): se
// muestran con su grupo. "Deltoides anterior" o "Glúteo mayor" ya lo dicen.
const NEEDS_GROUP = new Set([
  'biceps_long',
  'biceps_short',
  'triceps_long',
  'triceps_lateral_medial',
  'forearm_flexors',
  'forearm_extensors',
  'quads_vasti',
]);

export function muscleNeedsGroup(id: string): boolean {
  return NEEDS_GROUP.has(id);
}

/** Etiqueta legible fuera de su grupo: "Tríceps (cabeza larga)". */
export function muscleFullLabel(id: string): string {
  const label = muscleLabel(id);
  if (!NEEDS_GROUP.has(id)) return label;
  const group = muscleGroupOf(id);
  return group ? `${group.label} (${label.toLowerCase()})` : label;
}

export function muscleGroupOf(id: string): MuscleGroup | null {
  const node = NODES.get(id);
  return node ? GROUP_BY_ID.get(node.groupId) || null : null;
}

export function isMuscleGroup(id: string): boolean {
  return !!NODES.get(id)?.isGroup;
}

/** Misma forma canónica que normalizeMuscles del backend. */
export function normalizeMuscles(input: ExerciseMuscle[] | null | undefined): ExerciseMuscle[] {
  if (!Array.isArray(input)) return [];

  const byMuscle = new Map<string, MuscleRole>();
  for (const item of input) {
    if (!NODES.has(item?.muscle) || !MUSCLE_ROLES.includes(item?.role)) continue;
    const current = byMuscle.get(item.muscle);
    if (!current || MUSCLE_ROLE_FACTOR[item.role] > MUSCLE_ROLE_FACTOR[current]) {
      byMuscle.set(item.muscle, item.role);
    }
  }

  return [...byMuscle.entries()]
    .map(([muscle, role]) => ({ muscle, role }))
    .sort(
      (a, b) =>
        MUSCLE_ROLES.indexOf(a.role) - MUSCLE_ROLES.indexOf(b.role) ||
        (CATALOG_ORDER.get(a.muscle) || 0) - (CATALOG_ORDER.get(b.muscle) || 0)
    );
}

/** Nombres de los músculos principales de un ejercicio (chips de las fichas). */
export function primaryMuscleLabels(muscles: ExerciseMuscle[] | null | undefined): string[] {
  return normalizeMuscles(muscles)
    .filter((item) => item.role === 'primary')
    .map((item) => muscleFullLabel(item.muscle));
}
