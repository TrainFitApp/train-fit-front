// Pulso de una sesión para las Estadísticas del cliente: cómo llegó
// (readinessPre), cómo de duro fue (perceivedEffortPost) y las agujetas al
// llegar (sorenessPre). Es el mismo dato que el entrenador ve en su ficha,
// pero sacado de la rutina que el cliente ya tiene cargada: sin petición nueva
// y sin depender de tener entrenador. Se pide por la posición que da el día
// pulsado en el calendario (microciclo + hueco de workout).
// Probado en session-pulse.util.test.js.

export interface PulseSoreness {
  muscle: string;
  level: number;
}

export interface SessionPulse {
  date: Date;
  // 1-based, igual que "Microciclo n" en el resto de la página.
  microcycle: number;
  workoutName: string;
  readiness: number | null;
  effort: number | null;
  soreness: PulseSoreness[];
}

interface PulseWorkoutInput {
  name?: string | null;
  date?: Date | string | null;
  isPlannedRestDay?: boolean;
  readinessPre?: number | null;
  perceivedEffortPost?: number | null;
  sorenessPre?: PulseSoreness[] | null;
}

interface PulseTableInput {
  splits?: Array<{ workouts?: Array<PulseWorkoutInput | null> | null } | null> | null;
}

/** Nivel 1-5 entero; cualquier otra cosa (null, 0, texto, 7) es "no respondió". */
export function pulseLevel(value: unknown): number | null {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 5
    ? value
    : null;
}

// El 1 de agujetas es "nada" y el back no lo guarda (sanitizeSoreness); si
// llegara, contarlo pintaría una molestia que el cliente no marcó.
function cleanSoreness(entries: PulseSoreness[] | null | undefined): PulseSoreness[] {
  if (!Array.isArray(entries)) return [];
  return entries.filter(
    (entry) =>
      !!entry &&
      typeof entry.muscle === 'string' &&
      entry.muscle.length > 0 &&
      (pulseLevel(entry.level) ?? 0) > 1,
  );
}

/**
 * Pulso de la sesión en esa posición, o null si no hay una sesión terminada.
 *
 * Solo cuentan las terminadas: `date` se pone al acabar, y el calendario solo
 * ofrece días con sesión terminada. Un descanso pautado nunca tiene pulso.
 */
export function sessionPulseAt(
  table: PulseTableInput | null | undefined,
  splitIndex: number,
  workoutIndex: number,
): SessionPulse | null {
  const workout = table?.splits?.[splitIndex]?.workouts?.[workoutIndex];
  if (!workout || workout.isPlannedRestDay || !workout.date) return null;

  const date = new Date(workout.date);
  if (Number.isNaN(date.getTime())) return null;

  return {
    date,
    microcycle: splitIndex + 1,
    workoutName: workout.name || '',
    readiness: pulseLevel(workout.readinessPre),
    effort: pulseLevel(workout.perceivedEffortPost),
    soreness: cleanSoreness(workout.sorenessPre),
  };
}

/** Si el cliente respondió algo en esa sesión (las tres preguntas son opcionales). */
export function hasPulse(pulse: SessionPulse): boolean {
  return pulse.readiness !== null || pulse.effort !== null || pulse.soreness.length > 0;
}
