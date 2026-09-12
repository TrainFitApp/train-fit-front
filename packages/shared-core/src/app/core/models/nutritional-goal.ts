export class NutritionalGoal {
  _id: string;
  userId: string;
  name: string;
  kcalTotal: number;
  proteinsGTotal: number;
  carbohydratesGTotal: number;
  fatGTotal: number;
  // Presente si un entrenador pautó este objetivo (ver
  // trainer-client-data-controller.js#assignNutritionalGoal en el backend).
  // El cliente lo ve y lo activa, pero no lo edita ni lo borra.
  assignedByTrainerId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
