import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formatRirValue, isRirFail, RirValue } from 'src/app/core/models/rir';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { RIR_SHEET_OPTIONS } from './rir-sheet.component';

@Component({
  selector: 'app-rir-picker',
  templateUrl: './rir-picker.component.html',
  styleUrls: ['./rir-picker.component.scss'],
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
export class RirPickerComponent implements OnInit {
  @Input() rirControl: FormControl;
  @Input() isDone: boolean = false;
  @Output() rirChange = new EventEmitter<RirValue>();

  public shimmerAnimationState = 'idle';

  // Un doble toque no debe apilar dos hojas.
  private sheetOpen = false;

  constructor(private ionicUtilService: IonicUtilService) {}

  ngOnInit(): void {
    if (!this.rirControl) {
      this.rirControl = new FormControl(null);
    }
  }

  public onRirClick(): void {
    this.openRirPicker();
    this.shimmerAnimationState = 'animate';
    setTimeout(() => {
      this.shimmerAnimationState = 'idle';
    }, 1200);
  }

  // Hoja con las ruedas del RIR (RirSheetComponent). Solo el OK cambia la
  // serie: cancelar, tocar fuera o deslizar la hoja la dejan como estaba.
  public async openRirPicker(): Promise<void> {
    if (this.sheetOpen) return;
    this.sheetOpen = true;
    try {
      const { data, role } = await this.ionicUtilService.showModal({
        ...RIR_SHEET_OPTIONS,
        componentProps: { value: this.rirControl.value },
      });
      if (role !== 'confirm') return;
      this.rirControl.patchValue(data);
      this.rirChange.emit(data);
    } finally {
      this.sheetOpen = false;
    }
  }

  public get displayValue(): string {
    return formatRirValue(this.rirControl.value);
  }

  public get displayIsFail(): boolean {
    return isRirFail(this.rirControl.value);
  }
}
