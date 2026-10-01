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
  /** `null` = sin dato (el widget pinta «—»), `-1` = fallo. */
  rir: number | null;
  /** Serie ya completada: el widget pinta el check encendido. */
  doned: boolean;
  /** URL remota; el plugin la descarga al App Group (el widget no tiene red). */
  imageUrl?: string;
}

/** Textos de la tarjeta en el idioma de la app. */
export interface LiveActivityLabels {
  exercise: string;
  set: string;
  done: string;
  fail: string;
  weight: string;
  reps: string;
  rir: string;
}

export interface LiveActivitySessionOptions {
  workoutId: string;
  workoutName: string;
  /** Epoch ms. Sin él, el nativo conserva el de la sesión guardada. */
  startedAt?: number;
  items: LiveActivitySetItem[];
  labels: LiveActivityLabels;
}

/** Serie marcada, desmarcada o corregida desde la Live Activity que la app aún no ha persistido. */
export interface LiveActivityPendingAction {
  id: string;
  setId: string;
  reps: number;
  weight: number;
  rir: number | null;
  /** Estado al que la lleva el check: `true` marcarla, `false` desmarcarla. */
  doned: boolean;
  skipped: boolean;
  at: string;
}

export interface LiveActivityPlugin {
  isSupported(): Promise<{ supported: boolean; interactive: boolean }>;
  /**
   * Abre la tarjeta o reutiliza la de esta sesión si ya está viva.
   * `deferred`: la app está en segundo plano y no había tarjeta; ActivityKit
   * no deja abrirla hasta volver a primer plano.
   */
  start(options: LiveActivitySessionOptions): Promise<{ started: boolean; deferred?: boolean }>;
  update(options: LiveActivitySessionOptions): Promise<void>;
  end(): Promise<void>;
  getPendingActions(): Promise<{ actions: LiveActivityPendingAction[] }>;
  /** Sin `ids` borra todas. */
  clearPendingActions(options?: { ids?: string[] }): Promise<void>;
}

export const LiveActivity = registerPlugin<LiveActivityPlugin>('LiveActivity');
