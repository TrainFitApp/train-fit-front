import { registerPlugin } from '@capacitor/core';

export interface LiveActivitySetItem {
  setId: string;
  exerciseName: string;
  exerciseIndex: number;
  totalExercises: number;
  setIndex: number;
  totalSets: number;
  reps: number;
  weight: number;
  rir: number;
  /** Serie ya completada: el widget pinta el check encendido. */
  doned: boolean;
  /** URL remota; el plugin la descarga al App Group (el widget no tiene red). */
  imageUrl?: string;
}

export interface LiveActivitySessionOptions {
  workoutId: string;
  workoutName: string;
  startedAt: number;
  currentIndex: number;
  items: LiveActivitySetItem[];
}

/** Serie marcada o desmarcada desde la Live Activity que la app aún no ha persistido. */
export interface LiveActivityPendingAction {
  setId: string;
  reps: number;
  weight: number;
  rir: number;
  /** Estado al que la lleva el check: `true` marcarla, `false` desmarcarla. */
  doned: boolean;
  skipped: boolean;
  at: string;
}

export interface LiveActivityPlugin {
  isSupported(): Promise<{ supported: boolean; interactive: boolean }>;
  start(options: LiveActivitySessionOptions): Promise<{ started: boolean; activityId: string }>;
  update(options: LiveActivitySessionOptions): Promise<void>;
  end(): Promise<void>;
  getPendingActions(): Promise<{ actions: LiveActivityPendingAction[] }>;
  clearPendingActions(): Promise<void>;
}

export const LiveActivity = registerPlugin<LiveActivityPlugin>('LiveActivity');
