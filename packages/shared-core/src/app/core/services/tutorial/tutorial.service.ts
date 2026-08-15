import { ElementRef, Injectable, WritableSignal, computed, effect, signal } from '@angular/core';
import { ActiveTutorialStep } from '../../models/tutorial';
import { UserService } from '../user/user.service';
import { TutorialApiService } from './tutorial-api.service';
import { TutorialCatalogService } from './tutorial-catalog.service';
import { TUTORIAL_TRIGGERS } from './tutorial-triggers';
import { getUserTutorialContext } from './tutorial-context';

@Injectable()
export class TutorialService {
  private readonly _pendingTutorials: WritableSignal<Set<string>> = signal(new Set());
  private readonly _activeStep: WritableSignal<ActiveTutorialStep | null> = signal(null);
  public readonly activeStep = computed(() => this._activeStep());

  private anchors = new Map<string, ElementRef<HTMLElement>>();
  private currentScreenId: string | null = null;
  private activeGroupKey: string | null = null;
  private activeStepIndex = 0;
  // El step está "decidido" (activeGroupKey/activeStepIndex) pero su anchor
  // todavía no existe en el DOM — showCurrentStep() no publica activeStep
  // hasta que el anchor real registre, para que el overlay nunca se muestre
  // mal posicionado (centrado) por una carrera de timing.
  private awaitingAnchorId: string | null = null;
  // Petición explícita desde "Tutoriales" (Configuración) de reabrir un
  // grupo concreto en cuanto se entre en su pantalla — necesario porque los
  // grupos de nivel 3 son `trigger: 'manual'` y tryAdvance() los ignora.
  private requestedManualKey: string | null = null;

  constructor(
    private readonly catalogService: TutorialCatalogService,
    private readonly tutorialApiService: TutorialApiService,
    private readonly userService: UserService
  ) {
    // Se hidrata del User igual que BillingService hace con `premium`: en
    // cuanto el login/refresh trae onboarding.pendingTutorials, se refleja
    // aquí sin llamada aparte.
    effect(() => {
      const pending = this.userService.localUser()?.onboarding?.pendingTutorials;
      if (pending) {
        this._pendingTutorials.set(new Set(pending));
      }
    });
  }

  public getAnchorId(tutorialKey: string, stepKey: string): string {
    return `${tutorialKey}.${stepKey}`;
  }

  public registerAnchor(anchorId: string, el: ElementRef<HTMLElement>): void {
    this.anchors.set(anchorId, el);

    if (this.awaitingAnchorId === anchorId) {
      this.awaitingAnchorId = null;
      this.showCurrentStep();
      return;
    }

    this.tryAdvance();
  }

  // El mismo anchorId puede registrarse varias veces (mismo botón repetido
  // por cada ejercicio/serie de un *ngFor) — solo la última instancia
  // registrada queda "activa" en el mapa. Al destruirse una instancia hay
  // que comprobar que sigue siendo la que está en el mapa antes de borrarla,
  // o la destrucción de una instancia vieja podría desregistrar por error
  // la instancia nueva que ya la sustituyó.
  public unregisterAnchor(anchorId: string, el?: ElementRef<HTMLElement>): void {
    if (el && this.anchors.get(anchorId) !== el) return;
    this.anchors.delete(anchorId);
    // El elemento desapareció del DOM (se cerró el accordion, se navegó
    // fuera...): cerramos el tooltip sin marcarlo visto, para que reaparezca
    // en el próximo "momento" en el que el elemento vuelva a estar disponible.
    if (this._activeStep()?.anchorId === anchorId) {
      this._activeStep.set(null);
      this.activeGroupKey = null;
    }
  }

  public getAnchorElement(anchorId: string): ElementRef<HTMLElement> | undefined {
    return this.anchors.get(anchorId);
  }

  public isPending(key: string): boolean {
    return this._pendingTutorials().has(key);
  }

  // Llamar en el ngOnInit/ionViewWillEnter de cada pantalla.
  public startForScreen(screenId: string): void {
    this.currentScreenId = screenId;

    if (this.requestedManualKey) {
      const tutorial = this.catalogService.getTutorial(this.requestedManualKey);
      if (tutorial?.screenId === screenId) {
        const key = this.requestedManualKey;
        this.requestedManualKey = null;
        this.forceStart(key);
        return;
      }
    }

    this.tryAdvance();
  }

  // Usado por la pantalla "Tutoriales": marca qué grupo reabrir en cuanto el
  // usuario llegue a la pantalla correspondiente (ver startForScreen).
  public requestManualStart(key: string): void {
    this.requestedManualKey = key;
  }

  // Llamar en los "momentos" contextuales reales (expandir un ejercicio,
  // interactuar con RIR, completar todas las series...).
  public notifyEvent(eventName: string): void {
    this.tryAdvance(eventName);
  }

  public next(): void {
    const active = this._activeStep();
    if (!active) return;

    if (active.stepIndex + 1 < active.totalSteps) {
      this.activeStepIndex += 1;
      this.showCurrentStep();
      return;
    }

    // TODO(analytics): tutorial_completed { key: active.tutorialKey }
    this.completeGroup(active.tutorialKey);
  }

  public skip(): void {
    const active = this._activeStep();
    if (!active) return;
    // TODO(analytics): tutorial_skipped { key: active.tutorialKey, stepIndex: active.stepIndex }
    this.completeGroup(active.tutorialKey);
  }

  public completeGroup(key: string): void {
    this._activeStep.set(null);
    this.activeGroupKey = null;

    const next = new Set(this._pendingTutorials());
    if (!next.delete(key)) return; // ya estaba completado, no repetir la llamada
    this._pendingTutorials.set(next);

    this.tutorialApiService.complete(key).subscribe({
      error: (error) => console.warn('[TutorialService] complete() error', error),
    });
  }

  public reopenGroup(key: string): void {
    // TODO(analytics): tutorial_reopened { key }
    const next = new Set(this._pendingTutorials());
    next.add(key);
    this._pendingTutorials.set(next);

    this.tutorialApiService.reopen(key).subscribe({
      error: (error) => console.warn('[TutorialService] reopen() error', error),
    });
  }

  // Arranca un grupo concreto sin pasar por el matching de trigger — lo usa
  // la pantalla "Tutoriales" de Configuración, incluso para grupos de nivel 3
  // (opt-in) que nunca se disparan solos.
  public forceStart(key: string): void {
    if (this._activeStep()) return;
    this.activeGroupKey = key;
    this.activeStepIndex = 0;
    this.showCurrentStep();
  }

  private tryAdvance(eventName?: string): void {
    if (this._activeStep() || this.activeGroupKey) return; // un paso a la vez

    const pending = this._pendingTutorials();
    const userContext = getUserTutorialContext(this.userService.localUser());
    const candidates = this.catalogService
      .catalog()
      .filter((tutorial) => tutorial.autoStart)
      .filter((tutorial) => pending.has(tutorial.key))
      .filter((tutorial) => tutorial.screenId === this.currentScreenId)
      .filter((tutorial) => !tutorial.contexts || tutorial.contexts.includes(userContext))
      .sort((a, b) => a.order - b.order);

    for (const tutorial of candidates) {
      const triggerDef = TUTORIAL_TRIGGERS.find((t) => t.key === tutorial.key);
      if (!triggerDef || triggerDef.trigger === 'manual') continue;

      const matchesTrigger =
        (triggerDef.trigger === 'event' && !!eventName && triggerDef.eventName === eventName) ||
        (triggerDef.trigger !== 'event' && !eventName);
      if (!matchesTrigger) continue;

      const firstStep = tutorial.steps[0];
      if (!firstStep) continue;

      const anchorId = this.getAnchorId(tutorial.key, firstStep.key);
      const isAnchorless = !firstStep.cssAnchor;
      if (!isAnchorless && !this.anchors.has(anchorId)) continue;

      // TODO(analytics): tutorial_started { key: tutorial.key }
      this.activeGroupKey = tutorial.key;
      this.activeStepIndex = 0;
      this.showCurrentStep();
      return;
    }
  }

  private showCurrentStep(): void {
    if (!this.activeGroupKey) return;
    const tutorial = this.catalogService.getTutorial(this.activeGroupKey);
    const step = tutorial?.steps?.[this.activeStepIndex];

    if (!tutorial || !step) {
      this.activeGroupKey = null;
      this._activeStep.set(null);
      return;
    }

    const anchorId = this.getAnchorId(tutorial.key, step.key);
    const isAnchorless = !step.cssAnchor;

    if (!isAnchorless && !this.anchors.has(anchorId)) {
      // El anchor todavía no existe (p.ej. se pidió "Volver a ver" y la
      // pantalla acaba de navegar, o el elemento vive dentro de un accordion
      // aún colapsado) — esperar a que registerAnchor() lo traiga.
      this.awaitingAnchorId = anchorId;
      return;
    }

    this.awaitingAnchorId = null;
    this._activeStep.set({
      tutorialKey: tutorial.key,
      step,
      stepIndex: this.activeStepIndex,
      totalSteps: tutorial.steps.length,
      anchorId,
    });
  }
}
