import { Directive, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDecimalInput]'
})
export class DecimalInputDirective {
  constructor(@Optional() @Self() private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Reemplazar coma por punto
    value = value.replace(/,/g, '.');

    // Permitir solo un punto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Eliminar cualquier cosa que no sea número o punto
    value = value.replace(/[^0-9.]/g, '');

    // Actualizar el valor en el input y en el control de Angular
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, { emitEvent: false });
    }
    input.value = value;
  }
}
