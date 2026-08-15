// Contenido (título/descripción) tal como viaja desde la colección
// `tutorials` del backend — ver train-fit-back/components/tutorials.
export interface TutorialStepContent {
  key: string;
  title: string;
  description: string;
  cssAnchor?: string | null;
}

export interface TutorialContent {
  key: string;
  screenId: string;
  level: 1 | 2 | 3;
  order: number;
  autoStart: boolean;
  steps: TutorialStepContent[];
  // Sin definir = aplica a cualquier contexto de usuario. Ver
  // tutorial-context.ts — hoy getUserTutorialContext() siempre devuelve
  // 'independent', así que este filtro no descarta nada todavía, pero el
  // catálogo ya queda preparado para segmentar el día que exista la señal.
  contexts?: TutorialUserContext[];
}

// Cómo/cuándo disparar cada tutorial — comportamiento, vive en el frontend
// (packages/shared-core/src/app/core/constants/tutorial-triggers.ts), no en
// el backend. Un TutorialTrigger no tiene textos, solo apunta a un `key` de
// TutorialContent.
export type TutorialTriggerKind = 'screen-enter' | 'event' | 'anchor' | 'manual';

export interface TutorialTrigger {
  key: string; // debe coincidir con TutorialContent.key
  trigger: TutorialTriggerKind;
  eventName?: string; // solo si trigger === 'event'
}

export type TutorialUserContext = 'independent' | 'trainer_managed';

// Step actualmente mostrado en el overlay — combina contenido + posición en
// el grupo, listo para pintar en TutorialTooltipComponent.
export interface ActiveTutorialStep {
  tutorialKey: string;
  step: TutorialStepContent;
  stepIndex: number;
  totalSteps: number;
  anchorId: string; // "<tutorialKey>.<step.key>", lo que registra la directiva
}
