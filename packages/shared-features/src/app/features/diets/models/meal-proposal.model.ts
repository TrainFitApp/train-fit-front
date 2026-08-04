// F28 — alternativa nombrada pendiente de elegir para un hueco de comida
// concreto, propuesta por el profesional de nutrición del cliente.
export interface MealProposalAlternative {
  label: string;
}

export interface MealProposal {
  _id: string;
  date: string;
  mealSlot: string;
  alternatives: MealProposalAlternative[];
  chosenIndex: number | null;
}
