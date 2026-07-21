import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { sanitizeDecimalString } from 'src/app/core/directives/decimal-input.directive';

@Component({
  selector: 'app-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss'],
  animations: [
    trigger('shimmerAnimation', [
      state(
        'idle',
        style({
          borderColor: 'rgba(255, 255, 255, 0.08)',
          backgroundColor: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        })
      ),
      transition('* => animate', [
        animate(
          '600ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({
            borderColor: 'rgba(255, 255, 255, 0.15)',
            backgroundColor: 'linear-gradient(145deg, #1f1f1f, #111111)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          })
        ),
        animate(
          '600ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({
            borderColor: 'rgba(255, 255, 255, 0.08)',
            backgroundColor: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          })
        ),
      ]),
    ]),
  ],
})
export class NumericInputComponent implements OnInit {
  @Input() inputControl: FormControl;
  @Input() label: string = 'Valor';
  @Input() isDone: boolean = false;
  @Input() placeholder: string = '';
  @Input() maxLength = 6;
  @Output() valueChange = new EventEmitter<number | null>();

  public shimmerAnimationState = 'idle';

  constructor() {}

  ngOnInit(): void {
    if (!this.inputControl) {
      this.inputControl = new FormControl(null);
    }
  }

  public onInputClick(): void {
    // Activar animación y restaurar al completar (consistente con RIR)
    this.shimmerAnimationState = 'animate';
    setTimeout(() => {
      this.shimmerAnimationState = 'idle';
    }, 1200);
  }

  public onInputFocus(event: FocusEvent): void {
    const target = event?.target as HTMLElement | null;
    const setContainer =
      target?.closest('app-set') ??
      target?.closest('.current-set-container') ??
      target;

    if (!setContainer) {
      return;
    }

    // iOS puede abrir teclado y redimensionar con retraso; hacemos dos intentos.
    const scrollToFocusedSet = () => {
      try {
        setContainer.scrollIntoView({
          block: 'center',
          inline: 'nearest',
          behavior: 'smooth',
        });
      } catch {}
    };

    scrollToFocusedSet();
    setTimeout(scrollToFocusedSet, 220);
  }

  public onInputChange(event: any): void {
    const rawValue = event?.target?.value;

    if (rawValue === '' || rawValue === null || rawValue === undefined) {
      this.inputControl.patchValue(null);
      this.valueChange.emit(null);
      return;
    }

    const sanitizedValue = sanitizeDecimalString(String(rawValue));

    if (event?.target) {
      event.target.value = sanitizedValue;
    }

    const numValue = sanitizedValue === '' ? null : Number(sanitizedValue);
    const safeValue =
      numValue === null || Number.isNaN(numValue) ? null : numValue;

    this.inputControl.patchValue(safeValue);
    this.valueChange.emit(safeValue);
  }

  public get displayValue(): string {
    const value = this.inputControl.value;
    return value === null || value === undefined || value === ''
      ? ''
      : value.toString();
  }
}
