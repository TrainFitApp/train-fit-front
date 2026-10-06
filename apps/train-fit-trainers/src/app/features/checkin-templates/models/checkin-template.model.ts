import { CustomQuestion } from 'src/app/core/models/custom-question';

// Sin cadencia: cada cuánto se pide un check-in lo dice la PROGRAMACIÓN de
// cada cliente, no la plantilla. La plantilla es solo el formulario.
export interface CheckinTemplateDefinition {
  _id: string;
  name: string;
  enabledFields: string[];
  // Subconjunto de enabledFields que el cliente debe responder sí o sí.
  // Ausente en plantillas anteriores a esta opción: todo opcional.
  requiredFields?: string[];
  // Ausente en plantillas creadas antes de la Fase 5 — de ahí el opcional.
  customQuestions?: CustomQuestion[];
  createdAt: string;
}

export interface ApplyResult {
  applied: string[];
  skipped: string[];
}
