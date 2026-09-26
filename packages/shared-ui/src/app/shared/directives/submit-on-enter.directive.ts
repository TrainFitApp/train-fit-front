import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { submitOnEnter } from './submit-on-enter.util';
import type { EnterSubmitButton } from './submit-on-enter.util';

/** Opt-in: reutiliza la acción y el estado disabled del botón indicado. */
@Directive({ selector: '[appSubmitOnEnter]', standalone: true })
export class SubmitOnEnterDirective {
  @Input() appSubmitOnEnter: EnterSubmitButton | string | null | undefined;
  @HostBinding('attr.data-enter-submit-scope') readonly scopeMarker = '';

  constructor(private readonly element: ElementRef<HTMLElement>) {}

  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    const scope = this.element.nativeElement;
    const button = typeof this.appSubmitOnEnter === 'string'
      ? Array.from(scope.querySelectorAll<EnterSubmitButton>('button[data-enter-submit-action], ion-button[data-enter-submit-action]'))
        .find((candidate) => candidate.dataset.enterSubmitAction === this.appSubmitOnEnter)
      : this.appSubmitOnEnter;
    submitOnEnter(event, scope, button);
  }
}
