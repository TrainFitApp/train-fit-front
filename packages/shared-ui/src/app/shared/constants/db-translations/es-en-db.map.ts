/**
 * Spanish → English translation map for DB-stored exercise reference data.
 * Maps pre-defined (seed) values only. User-created values fall through unchanged.
 *
 * Sections: muscleGroups, categories, equipment, tableNames, exerciseNames
 */

export const MUSCLE_GROUPS_ES_EN: Record<string, string> = {
  "Brazos": "Arms",
  "Bíceps": "Biceps",
  "Tríceps": "Triceps",
  "Triceps": "Triceps",
  "Antebrazo": "Forearms",
  "Abdomen": "Abs",
  "Recto abdominal": "Rectus abdominis",
  "Recto abdominal, Oblicuos": "Rectus abdominis, Obliques",
  "Recto Abdominal": "Rectus abdominis",
  "Oblicuos": "Obliques",
  "Hombro": "Shoulders",
  "Deltoides anterior": "Front delts",
  "Deltoides lateral": "Side delts",
  "Deltoides posterior": "Rear delts",
  "Delotides anterior": "Front delts",
  "Delotides lateral": "Side delts",
  "deltoides lateral": "Side delts",
  "Pectoral": "Chest",
  "Pectoral superior": "Upper chest",
  "Pectoral inferior": "Lower chest",
  "Espalda": "Back",
  "Espalda alta": "Upper back",
  "Espalda baja": "Lower back",
  "Espalda, Femoral": "Back, Hamstrings",
  "Espalda alta, Espalda baja, Deltoides posterior": "Upper back, Lower back, Rear delts",
  "Piernas": "Legs",
  "Cuádriceps": "Quads",
  "Femoral": "Hamstrings",
  "Glúteo": "Glutes",
  "Glúteo,": "Glutes",
  "Glúteo, Aductor": "Glutes, Adductors",
  "glúteo": "Glutes",
  "Aductor": "Adductors",
  "Gemelo": "Calves",
  "Gemelos": "Calves",
  "Sóleo": "Soleus",
  "Pecho": "Chest",
  "Core": "Core",
  "Hombros": "Shoulders",
  "Cuello": "Neck",
  " Deltoides posterior": "Rear delts",
  " Antebrazo": "Forearms",
  " Brazos": "Arms",
  // Fix typos from seed data
  "Deltoides poterior": "Rear delts",
};

export const CATEGORIES_ES_EN: Record<string, string> = {
  "Cardio": "Cardio",
  "Empujes": "Push",
  "Tirón": "Pull",
  "Tirón horizontal": "Horizontal pull",
  "Tirón vertical": "Vertical pull",
  "Tirón Horizontal": "Horizontal pull",
  "Tirón,": "Pull",
  "Tirón, Tirón vertical, Torso/Tren superior": "Pull, Vertical pull, Torso/Upper body",
  "Cadena posterior": "Posterior chain",
  "cadena posterior": "Posterior chain",
  "Cadena anterior": "Anterior chain",
  "Cadena anteriror": "Anterior chain",
  "Tren inferior": "Lower body",
  "Torso/Tren superior": "Torso/Upper body",
  "Abdomen": "Abs",
  "Oblicuos": "Obliques",
};

export const EQUIPMENT_ES_EN: Record<string, string> = {
  "Barra": "Barbell",
  "Mancuernas": "Dumbbells",
  "Mancuernas, Disco": "Dumbbells, Plate",
  "Polea": "Cable",
  "Peso corporal": "Bodyweight",
  "Máquina": "Machine",
  "Máquina smith/multipower": "Smith machine/Multipower",
  "Disco": "Plate",
  "disco": "Plate",
  "Banda elástica": "Resistance band",
  "Multipower": "Multipower",
  "Kettlebell": "Kettlebell",
};

export const TABLE_NAMES_ES_EN: Record<string, string> = {
  "Torso / Pierna ♀": "Torso / Legs ♀",
  "Torso / Pierna ♂": "Torso / Legs ♂",
  "Full Body": "Full Body",
  "Tren Inferior": "Lower Body",
};

/**
 * Master lookup that merges all finite-value maps.
 * Pipe will check this map first, then fall through to original value.
 */
export const DB_ES_EN_MAP: Record<string, string> = {
  ...MUSCLE_GROUPS_ES_EN,
  ...CATEGORIES_ES_EN,
  ...EQUIPMENT_ES_EN,
  ...TABLE_NAMES_ES_EN,
};
