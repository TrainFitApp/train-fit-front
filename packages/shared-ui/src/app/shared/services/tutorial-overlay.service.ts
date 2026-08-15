import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ActiveTutorialStep } from 'src/app/core/models/tutorial';
import { TutorialTooltipComponent } from '../components/tutorial-tooltip/tutorial-tooltip.component';

const HALO_PADDING_PX = 6;

/**
 * Pinta la burbuja del tutorial (CDK Overlay, `flexibleConnectedTo` el
 * elemento real registrado por TutorialAnchorDirective, sin backdrop) y el
 * halo de resaltado (DOM plano, ver global.scss `.tf-tutorial-halo` — vive
 * fuera del árbol de Angular a propósito, así que se reposiciona a mano en
 * scroll/resize en vez de depender de un segundo OverlayRef).
 */
@Injectable({ providedIn: 'root' })
export class TutorialOverlayService {
  private overlayRef: OverlayRef | null = null;
  private componentRef: ComponentRef<TutorialTooltipComponent> | null = null;
  private haloEl: HTMLDivElement | null = null;
  private cleanupListeners: (() => void) | null = null;

  constructor(private readonly overlay: Overlay) {}

  public show(
    step: ActiveTutorialStep,
    anchorEl: ElementRef<HTMLElement> | undefined,
    handlers: { onNext: () => void; onSkip: () => void }
  ): void {
    this.destroy();

    const positionStrategy = anchorEl
      ? this.overlay
          .position()
          .flexibleConnectedTo(anchorEl)
          .withPositions([
            { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 12 },
            { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -12 },
            { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 12 },
            { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -12 },
          ])
          .withPush(true)
          .withViewportMargin(12)
      : this.overlay.position().global().centerHorizontally().centerVertically();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
      panelClass: 'tf-tutorial-overlay-pane',
    });

    this.componentRef = this.overlayRef.attach(new ComponentPortal(TutorialTooltipComponent));
    this.componentRef.instance.activeStep = step;
    this.componentRef.instance.next.subscribe(() => handlers.onNext());
    this.componentRef.instance.skip.subscribe(() => handlers.onSkip());

    if (anchorEl) {
      this.renderHalo(anchorEl.nativeElement.getBoundingClientRect());
      this.attachReposition(anchorEl);
    }
  }

  public destroy(): void {
    this.cleanupListeners?.();
    this.cleanupListeners = null;

    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.componentRef = null;

    this.haloEl?.remove();
    this.haloEl = null;
  }

  private renderHalo(rect: DOMRect): void {
    const el = document.createElement('div');
    el.className = 'tf-tutorial-halo';
    this.positionHalo(el, rect);
    document.body.appendChild(el);
    this.haloEl = el;
  }

  private positionHalo(el: HTMLDivElement, rect: DOMRect): void {
    el.style.top = `${rect.top - HALO_PADDING_PX}px`;
    el.style.left = `${rect.left - HALO_PADDING_PX}px`;
    el.style.width = `${rect.width + HALO_PADDING_PX * 2}px`;
    el.style.height = `${rect.height + HALO_PADDING_PX * 2}px`;
  }

  private attachReposition(anchorEl: ElementRef<HTMLElement>): void {
    // ion-content vive en shadow DOM con su propio scroller interno — los
    // listeners de scroll normales en window no se disparan para ese
    // contenedor salvo que se escuchen en fase de captura, que sí ve el
    // evento aunque no burbujee.
    const handler = () => {
      if (!this.haloEl) return;
      this.positionHalo(this.haloEl, anchorEl.nativeElement.getBoundingClientRect());
      this.overlayRef?.updatePosition();
    };

    window.addEventListener('scroll', handler, true);
    window.addEventListener('resize', handler);
    this.cleanupListeners = () => {
      window.removeEventListener('scroll', handler, true);
      window.removeEventListener('resize', handler);
    };
  }
}
