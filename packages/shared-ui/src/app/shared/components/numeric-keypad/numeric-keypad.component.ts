import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NumericKeypadService } from './numeric-keypad.service';

@Component({
  selector: 'app-numeric-keypad',
  templateUrl: './numeric-keypad.component.html',
  styleUrls: ['./numeric-keypad.component.scss'],
})
export class NumericKeypadComponent {
  // Asignado en el constructor, no como inicializador de campo: con
  // useDefineForClassFields los inicializadores de campo corren ANTES de
  // que se asigne la parameter property inyectada, dejando
  // this.numericKeypadService en undefined en ese punto ("Cannot read
  // properties of undefined (reading 'visible$')").
  public readonly visible$: Observable<boolean>;
  public readonly digitRows: string[][] = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  constructor(private numericKeypadService: NumericKeypadService) {
    this.visible$ = this.numericKeypadService.visible$;
  }

  public tapDigit(digit: string): void {
    this.numericKeypadService.appendChar(digit);
  }

  public tapDecimalPoint(): void {
    this.numericKeypadService.appendChar('.');
  }

  public tapBackspace(): void {
    this.numericKeypadService.backspace();
  }

  public tapHideKeyboard(): void {
    this.numericKeypadService.hideKeyboard();
  }

  public tapIncrement(): void {
    this.numericKeypadService.incrementValue(1);
  }

  public tapDecrement(): void {
    this.numericKeypadService.incrementValue(-1);
  }

  public tapNext(): void {
    this.numericKeypadService.focusNext();
  }
}
