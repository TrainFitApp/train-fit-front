// Tab "Notas del cliente" (Plan): todo lo que el cliente ha escrito en
// entrenamiento y nutrición. Espejo de train-fit-back/components/clientNotes.

export type ClientNoteDomain = 'training' | 'nutrition';
export type ClientNoteSource = 'workout' | 'exercise' | 'pinned' | 'pain' | 'dietDay' | 'meal';

export type ClientNoteTarget =
  | { type: 'planner'; tableId: string; splitId: string | null; workoutId: string | null; exerciseId: string | null }
  | { type: 'nutrition'; date: string; mealId: string | null }
  | { type: 'pain'; date: string; zone: string };

export interface ClientNote {
  key: string;
  sourceType: ClientNoteSource;
  sourceId: string;
  domain: ClientNoteDomain;
  text: string;
  // ISO: fecha de la sesión, del día de dieta o del registro de dolor.
  date: string;
  // p. ej. ["Entrenamiento", "Rutina: prueba", "Microciclo 2", "Día 1: Pierna", "Press banca"]
  path: string[];
  target: ClientNoteTarget;
  seen: boolean;
}

export interface ClientNotesUnread {
  total: number;
  training: number;
  nutrition: number;
}

export interface ClientNotesPage {
  scopes: ClientNoteDomain[];
  unread: ClientNotesUnread;
  items: ClientNote[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ClientNotesQuery {
  domain?: ClientNoteDomain | null;
  seen?: boolean | null;
  q?: string;
  page?: number;
}
