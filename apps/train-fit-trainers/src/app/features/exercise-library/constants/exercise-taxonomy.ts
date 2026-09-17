// Mismos valores que usan el buscador de ejercicios y sus filtros: son
// cadenas que viajan tal cual a Exercise.category/muscleGroups/equipment, así
// que un ejercicio creado aquí tiene que quedar indexado igual que los del
// catálogo global o no aparecería al filtrar.
export const EXERCISE_CATEGORIES: string[] = [
  'Cardio',
  'Empujes',
  'Tirón',
  'Tirón horizontal',
  'Tirón vertical',
  'Cadena posterior',
  'Cadena anterior',
  'Tren inferior',
  'Torso/Tren superior',
];

export const EXERCISE_MUSCLE_GROUPS: string[] = [
  'Brazos',
  'Bíceps',
  'Tríceps',
  'Antebrazo',
  'Hombro',
  'Deltoides anterior',
  'Deltoides lateral',
  'Deltoides posterior',
  'Pectoral',
  'Pectoral superior',
  'Pectoral inferior',
  'Abdomen',
  'Cuello',
  'Espalda',
  'Espalda alta',
  'Espalda baja',
  'Piernas',
  'Cuádriceps',
  'Aductor',
  'Femoral',
  'Glúteo',
  'Gemelo',
  'Sóleo',
];

export const EXERCISE_EQUIPMENT: string[] = [
  'Barra',
  'Mancuernas',
  'Polea',
  'Peso corporal',
  'Kettlebell',
  'Máquina',
  'Máquina smith/multipower',
  'Disco',
  'Banda elástica',
];
