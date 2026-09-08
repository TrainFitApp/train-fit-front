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
}

export interface SubSerie {
  reps?: number;
  weight?: number;
  rir?: number | number[];
}
