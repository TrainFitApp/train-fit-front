// ¿Está bloqueado para el cliente lo que le pautó un profesional? Solo
// mientras dure la relación de ese ámbito con QUIEN lo pautó: terminada (o si
// el cliente cambió de profesional), la rutina o la comida es suya a todos
// los efectos. Misma regla que el back (tables/table-access.js#isLockedForOwner,
// meals/meal-service.js#assertMealEditable).

export type CoachScope = 'training' | 'nutrition';

export interface ActiveProfessionalLike {
  user: { _id: string } | null;
  scopes?: CoachScope[];
}

export type TrainerIdsByScope = Record<CoachScope, string[]>;

export const NO_ACTIVE_TRAINERS: TrainerIdsByScope = { training: [], nutrition: [] };

/** Ids de los profesionales con relación activa, por ámbito. */
export function activeTrainerIdsByScope(active: ActiveProfessionalLike[] | null | undefined): TrainerIdsByScope {
  const byScope: TrainerIdsByScope = { training: [], nutrition: [] };
  for (const professional of active || []) {
    const id = professional?.user?._id;
    if (!id) continue;
    for (const scope of professional.scopes || []) {
      if (scope === 'training' || scope === 'nutrition') byScope[scope].push(String(id));
    }
  }
  return byScope;
}

/** true si lo pautó `assignedByTrainerId` y sigue siendo su profesional de ese ámbito. */
export function isLockedByTrainer(
  assignedByTrainerId: string | { _id?: string } | null | undefined,
  scope: CoachScope,
  idsByScope: TrainerIdsByScope
): boolean {
  if (!assignedByTrainerId) return false;
  const id = typeof assignedByTrainerId === 'string' ? assignedByTrainerId : assignedByTrainerId._id;
  return !!id && (idsByScope?.[scope] || []).includes(String(id));
}
