export class Set {
  _id?: string;
  reps?: number;
  expectedReps?: number[];
  weight?: number;
  rir?: number | number[];
  expectedRir?: number[];
  drop?: boolean;
  restPause?: number;
  // Descanso pautado tras completar esta serie (segundos). Distinto de
  // restPause, la técnica "rest-pause" dentro de la misma serie.
  restSeconds?: number;
  // Solo lo fija el backend, nunca el cliente (ver set-dao.js#updateSet).
  donedAt?: string | Date;
  cronometer?: number;
  doned?: boolean;
  order: number;
  displayOrder?: number;
  // Compartidos por cardio + isométrico. Formato "M:SS" (ver
  // formatSecondsAsTime/parseTimeToSeconds en shared-ui/utils).
  expectedTime?: string;
  time?: string;
  // Solo cardio.
  expectedDistance?: number;
  distance?: number;
  velocity?: number;
  restPauseSeries?: SubSerie[];
  dropSetSeries?: SubSerie[];
  restPauseSeconds?: number;
  // Movimiento 6 Coach Pro — prescripción por porcentaje del 1RM. Convive
  // con `weight`, no lo sustituye: hay entrenadores que pautan "80 kg" y
  // otros "80% del RM", y el segundo necesita que se guarde como porcentaje
  // para que siga significando lo mismo cuando el RM del cliente suba.
  expectedPercentRm?: number;
  // Tempo "E-P1-C-P2" (excéntrica, pausa abajo, concéntrica, pausa arriba)
  // en segundos: "3-1-1-0". Texto y no cuatro números porque así es como se
  // escribe y como se lee; "X" en la concéntrica (explosiva) es notación
  // estándar y por eso no se valida como numérico.
  tempo?: string;
}

export interface SubSerie {
  reps?: number;
  weight?: number;
  rir?: number | number[];
}
