// Movimiento 2 Coach Pro — agujetas por grupo muscular.
//
// Espejo EXACTO de train-fit-back/components/workouts/soreness-catalog.js
// (backend) — mantenidos sincronizados a mano, igual que el catálogo de
// campos de check-in, y comprobado por soreness-catalog.test.js.
//
// POR QUÉ SE PREGUNTA AL EMPEZAR Y NO AL TERMINAR
// Las agujetas aparecen 24-72 h DESPUÉS del esfuerzo, así que preguntarlas
// al acabar la sesión mide la fatiga del momento, no las agujetas: para
// cuando duelen de verdad, el cliente ya cerró la app. Preguntadas al
// empezar, la respuesta habla de las sesiones ANTERIORES — que es justo lo
// que el entrenador necesita para decidir si toca insistir o aflojar. Por
// eso el campo se llama `sorenessPre` y viaja junto a `readinessPre`, en el
// aviso que ya existía antes de empezar (no se añade un segundo).

export interface SorenessEntry {
  muscle: string;
  level: number;
}

// Lista CERRADA, no derivada de los grupos musculares de los ejercicios:
// aquéllos son datos de catálogo con variantes creadas por usuarios y
// erratas de la semilla ("Deltoides poterior"), y una serie temporal
// necesita que el eje no cambie. Los nombres son los canónicos que ya usa
// es-en-db.map.ts, así que TranslateDbPipe los traduce sin añadir nada.
export const SORENESS_MUSCLES: string[] = [
  'Pectoral',
  'Espalda alta',
  'Espalda baja',
  'Deltoides anterior',
  'Deltoides lateral',
  'Deltoides posterior',
  'Bíceps',
  'Tríceps',
  'Antebrazo',
  'Abdomen',
  'Oblicuos',
  'Glúteo',
  'Cuádriceps',
  'Femoral',
  'Aductor',
  'Gemelo',
];

// Mismo criterio que las anclas de los check-ins: un 3 sin frase no es un
// dato. Aquí importa especialmente el salto del 3 al 4, que es donde la
// molestia pasa a condicionar el entrenamiento.
export const SORENESS_ANCHORS: string[] = [
  'Nada, no lo noto',
  'Se nota al tocarlo o al estirar',
  'Molesta al moverme, pero no me limita',
  'Duele y me limita el rango o la fuerza',
  'Muy dolorido, hoy no podría entrenarlo',
];

export function sorenessAnchorFor(level: number): string {
  return SORENESS_ANCHORS[level - 1] || '';
}

// Resumen de una línea para el historial del entrenador: "Cuádriceps 4 ·
// Glúteo 3". Sin esto, la ficha tendría que pintar dieciséis filas por
// sesión para decir que a alguien le duelen dos músculos.
export function formatSoreness(entries: SorenessEntry[] | null | undefined): string {
  if (!entries?.length) return '';
  return entries.map((entry) => `${entry.muscle} ${entry.level}`).join(' · ');
}
