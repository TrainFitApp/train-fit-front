import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCursorEnd]',
})
export class CursorEndDirective {
  private firstFocus = true;

  constructor(private el: ElementRef) {}

  @HostListener('ionFocus')
  onFocus() {
    if (this.firstFocus) {
      this.firstFocus = false;

      // Usar un timeout más largo para asegurar que el input de Ionic esté listo
      setTimeout(() => {
        const element = this.el.nativeElement;

        // Soporte para ion-input
        if (element.getInputElement) {
          element.getInputElement().then((input: HTMLInputElement) => {
            this.setCursorToEnd(input);
          });
        }
        // Soporte para input nativo
        else if (element instanceof HTMLInputElement) {
          this.setCursorToEnd(element);
        }
      });
    }
  }

  private setCursorToEnd(input: HTMLInputElement) {
    if (input && input.value) {
      const length = input.value.length;
      input.setSelectionRange(length, length);
      input.focus();
    }
  }
}
