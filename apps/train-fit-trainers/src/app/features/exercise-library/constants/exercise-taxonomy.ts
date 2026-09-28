// Mismos valores que usan el buscador de ejercicios y sus filtros: son
// cadenas que viajan tal cual a Exercise.category/equipment, así
// que un ejercicio creado aquí tiene que quedar indexado igual que los del
// catálogo global o no aparecería al filtrar. Los músculos ya no van aquí:
// viven en src/app/core/constants/muscle-catalog.ts, con su énfasis.
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
