import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { localizeProp } from 'src/app/core/i18n/localized-catalog';
import { CustomQuestion, CustomQuestionType } from 'src/app/core/models/custom-question';

// Mismos topes que valida el backend (forms/custom-question.js): decirlos aquí
// evita ofrecer un botón "añadir" que siempre acabaría en un 400.
export const MAX_CUSTOM_QUESTIONS = 20;
export const MAX_QUESTION_OPTIONS = 10;

// Los seis tipos, con el texto que ve el profesional al elegir. `frequency`
// no lleva opciones configurables: su escala es fija, y eso es lo que hace
// comparables las respuestas entre semanas.
export const CUSTOM_QUESTION_TYPES: { key: CustomQuestionType; label: string; hint: string }[] = [
  { key: 'scale_1_5', label: 'Escala 1-5', hint: 'Del 1 al 5, como el resto de campos de bienestar' },
  { key: 'number', label: 'Número', hint: 'Una cifra, con unidad opcional' },
  { key: 'text', label: 'Texto libre', hint: 'Respuesta abierta' },
  { key: 'yes_no', label: 'Sí / No', hint: 'Dos opciones' },
  { key: 'select', label: 'Selector', hint: 'Tú defines las opciones' },
  { key: 'frequency', label: 'Frecuencia', hint: 'Nunca · Rara vez · A veces · A menudo · Siempre' },
];
CUSTOM_QUESTION_TYPES.forEach((item) => localizeProp(item, 'hint', `CUSTOM_QUESTION.TYPES.HINT.${item.key}`));
CUSTOM_QUESTION_TYPES.forEach((item) => localizeProp(item, 'label', `CUSTOM_QUESTION.TYPES.LABEL.${item.key}`));

export function customQuestionTypeLabel(type: CustomQuestionType): string {
  return CUSTOM_QUESTION_TYPES.find((item) => item.key === type)?.label || type;
}

export function newCustomQuestion(): CustomQuestion {
  return { label: '', type: 'scale_1_5', unit: '', options: [], required: false, enabled: true };
}

// Por qué no se puede guardar una lista de preguntas: clave i18n y sus
// parámetros, o null si está bien.
export function customQuestionsError(questions: CustomQuestion[]): { key: string; params?: Record<string, string> } | null {
  for (const question of questions) {
    if (!question.label.trim()) return { key: 'CUSTOM_QUESTION.ERROR_LABEL' };
    if (question.type === 'select' && (question.options || []).filter((o) => o.trim()).length < 2) {
      return { key: 'CUSTOM_QUESTION.ERROR_OPTIONS', params: { p0: question.label } };
    }
  }
  return null;
}

// Forma limpia para enviar: sin opciones en blanco de un selector a medio escribir.
export function cleanCustomQuestion(question: CustomQuestion): CustomQuestion {
  return {
    ...question,
    label: question.label.trim(),
    options: (question.options || []).map((o) => o.trim()).filter(Boolean),
  };
}

/**
 * Pregunta a medio añadir al guardar o enviar (redactada sin pulsar
 * «AÑADIR»): completa, se añade (antes se descartaba en silencio); con
 * enunciado pero no válida, devuelve su error para no seguir; sin enunciado,
 * se descarta. `draft: null` = ya no queda nada pendiente.
 */
export function settleDraftQuestion(
  draft: CustomQuestion | null,
  questions: CustomQuestion[]
): { questions: CustomQuestion[]; draft: CustomQuestion | null; error: { key: string; params?: Record<string, string> } | null } {
  if (!draft || !draft.label.trim()) return { questions, draft: null, error: null };
  const error = customQuestionsError([draft]);
  if (error) return { questions, draft, error };
  if (questions.length >= MAX_CUSTOM_QUESTIONS) {
    return { questions, draft, error: { key: 'CUSTOM_QUESTION.ERROR_MAX', params: { max: String(MAX_CUSTOM_QUESTIONS) } } };
  }
  return { questions: [...questions, { ...cleanCustomQuestion(draft), enabled: true }], draft: null, error: null };
}

/**
 * Editor de UNA pregunta propia (enunciado, tipo, unidad, obligatoria y
 * opciones). Lo comparten las plantillas de check-in y el cuestionario de
 * alta: las dos guardan la misma pregunta con tipo. Edita `question` en el
 * sitio, como el resto de formularios de esas pantallas.
 */
@Component({
  selector: 'app-custom-question-editor',
  templateUrl: 'custom-question-editor.component.html',
  styleUrls: ['custom-question-editor.component.scss'],
})
export class CustomQuestionEditorComponent implements AfterViewInit {
  @Input({ required: true }) public question!: CustomQuestion;
  // Para las etiquetas accesibles ("Enunciado de la pregunta 2").
  @Input() public position = 1;
  @Input() public removable = true;
  // Pregunta recién creada: el cursor va directo a su enunciado.
  @Input() public autofocus = false;
  @Output() public remove = new EventEmitter<void>();

  @ViewChild('labelInput') private labelInput?: ElementRef<HTMLInputElement>;
  @ViewChildren('optionInput') private optionInputs?: QueryList<ElementRef<HTMLInputElement>>;

  public readonly questionTypes = CUSTOM_QUESTION_TYPES;
  public readonly maxOptions = MAX_QUESTION_OPTIONS;

  // Qué significa el tipo elegido, dicho debajo del selector: "frecuencia"
  // no dice por sí solo que su escala sea fija y cuál es.
  public get hint(): string {
    return this.questionTypes.find((t) => t.key === this.question.type)?.hint || '';
  }

  // Al cambiar de tipo se limpia lo que ya no aplica: un "selector" que pasa
  // a "número" arrastraría opciones invisibles que el back seguiría guardando.
  public onTypeChange(): void {
    if (this.question.type !== 'select') this.question.options = [];
    if (this.question.type !== 'number') this.question.unit = '';
  }

  public ngAfterViewInit(): void {
    if (this.autofocus) setTimeout(() => this.labelInput?.nativeElement.focus());
  }

  // La opción nueva se escribe sin tener que pulsar en ella.
  public addOption(): void {
    if ((this.question.options?.length || 0) >= MAX_QUESTION_OPTIONS) return;
    this.question.options = [...(this.question.options || []), ''];
    setTimeout(() => this.optionInputs?.last?.nativeElement.focus());
  }

  public removeOption(index: number): void {
    this.question.options = (this.question.options || []).filter((_, i) => i !== index);
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
