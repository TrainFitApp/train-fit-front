// "Pésate cada X días" — lo que el profesional pauta para el peso.
//
// No es un formulario ni una solicitud que haya que contestar: el
// cumplimiento se deduce de si hay algún peso registrado dentro de la
// ventana, así que el cliente que ya se pesa por su cuenta cumple sin
// confirmar nada. El backend manda ese cálculo ya hecho (`compliance`) para
// que esta pantalla no tenga que recorrer el histórico solo para saber si
// toca.
export interface WeightPlanCompliance {
  intervalDays: number;
  notes: string;
  lastWeightAt: string | null;
  lastWeightKg: number | null;
  neverWeighed: boolean;
  dueAt: string;
  upToDate: boolean;
  overdueDays: number;
}

export interface MyWeightPlan {
  _id: string;
  trainerId: string;
  intervalDays: number;
  notes: string;
  trainer: { name: string; lastname: string } | null;
  compliance: WeightPlanCompliance;
}
