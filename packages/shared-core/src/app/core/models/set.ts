export class Set {
  _id?: string;
  reps?: number;
  expectedReps?: number[];
  weight?: number;
  rir?: number;
  expectedRir?: number[];
  drop?: boolean;
  restPause?: number;
  cronometer?: number;
  doned?: boolean;
  order: number;
  displayOrder?: number;
  expectedSec?: number;
  expectedMin?: number;
  timeSec?: number;
  timeMin?: number;
  velocity?: number;
  restPauseSeries?: SubSerie[];
  dropSetSeries?: SubSerie[];
  restPauseSeconds?: number;
}

export interface SubSerie {
  reps?: number;
  weight?: number;
  rir?: number;
}
