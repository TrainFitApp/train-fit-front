// Espejo mínimo de AnthropometryRequest (train-fit-back) — el cliente solo
// necesita saber que le piden algo, no el catálogo completo de campos (el
// modal de medición ya deja rellenar cualquier campo, pedido o no).
export interface PendingAnthropometryRequest {
  _id: string;
  trainerId: string;
  fields: string[];
  cadence: 'once' | 'daily' | 'weekly' | 'monthly' | 'custom';
}
