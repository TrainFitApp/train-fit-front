import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() maxDecimals: number | null = null;
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

    let normalizedValue = String(rawValue)
      .replace(/,/g, '.')
      .replace(/[^0-9.]/g, '');

    const parts = normalizedValue.split('.');
    normalizedValue =
      parts.length > 2
        ? `${parts[0]}.${parts.slice(1).join('')}`
        : normalizedValue;

    if (this.maxDecimals !== null) {
      const dotIndex = normalizedValue.indexOf('.');
      if (this.maxDecimals === 0 && dotIndex !== -1) {
        normalizedValue = normalizedValue.substring(0, dotIndex);
      } else if (dotIndex !== -1) {
        normalizedValue =
          normalizedValue.substring(0, dotIndex) +
          '.' +
          normalizedValue.substring(dotIndex + 1, dotIndex + 1 + this.maxDecimals);
      }
    }

    if (event?.target) {
      event.target.value = normalizedValue;
    }

    const numValue = normalizedValue === '' ? null : Number(normalizedValue);
    let safeValue =
      numValue === null || !Number.isFinite(numValue) ? null : numValue;

    if (safeValue !== null) {
      if (this.min !== null && safeValue < this.min) safeValue = this.min;
      if (this.max !== null && safeValue > this.max) safeValue = this.max;
    }

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
