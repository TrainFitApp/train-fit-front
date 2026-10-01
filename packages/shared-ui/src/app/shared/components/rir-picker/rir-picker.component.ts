import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { buildRirValue,
  formatRirValue,
  getRirNumberOptions,
  isRirFail,
  parseRirSelection,
  RIR_FAIL_VALUE,
  RirValue, rirFailLabel } from 'src/app/core/models/rir';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

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
  public selectedRirValue: RirValue = null;

  constructor(private ionicUtilService: IonicUtilService) {}

  ngOnInit(): void {
    if (!this.rirControl) {
      this.rirControl = new FormControl(null);
    }
    this.selectedRirValue = this.rirControl.value;
  }

  public onRirClick(): void {
    this.openRirPicker();
    this.shimmerAnimationState = 'animate';
    setTimeout(() => {
      this.shimmerAnimationState = 'idle';
    }, 1200);
  }

  public openRirPicker(): void {
    this.selectedRirValue = this.rirControl.value;
    this.openWithController();
  }

  private async openWithController(): Promise<void> {
    const selection = parseRirSelection(this.selectedRirValue);
    const firstOptions = this.getFirstRirOptions().map((o) => ({
      text: o.text,
      value: o.value,
      cssClass:
        o.value === RIR_FAIL_VALUE
          ? 'rir-option-fallo'
          : 'rir-option-number',
    }));
    const secondOptions = this.getSecondRirOptions().map((o) => ({
      text: o.text,
      value: o.value,
      cssClass:
        o.value === null
          ? 'rir-option-empty'
          : o.value === RIR_FAIL_VALUE
          ? 'rir-option-fallo'
          : 'rir-option-number',
    }));
    const selectedFirstIndex = Math.max(
      0,
      firstOptions.findIndex((o) => o.value === selection.first)
    );
    const selectedSecondIndex = Math.max(
      0,
      secondOptions.findIndex((o) => o.value === selection.second)
    );

    await this.ionicUtilService.showPicker({
      columns: [
        {
          name: 'rirFirst',
          options: firstOptions,
          selectedIndex: selectedFirstIndex,
        },
        {
          name: 'rirSecond',
          options: secondOptions,
          selectedIndex: selectedSecondIndex,
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (value: any) => {
            const firstValue = value?.rirFirst?.value ?? null;
            const secondValue = value?.rirSecond?.value ?? null;
            const newValue = buildRirValue(firstValue, secondValue);
            this.rirControl.patchValue(newValue);
            this.rirChange.emit(newValue);
            return true;
          },
        },
      ],
      mode: 'ios',
      cssClass: 'rir-picker-modal',
    });
  }

  public get displayValue(): string {
    return formatRirValue(this.rirControl.value);
  }

  public get displayIsFail(): boolean {
    return isRirFail(this.rirControl.value);
  }

  public getFirstRirOptions(): Array<{ text: string; value: number | null }> {
    return [
      { text: '-', value: null },
      { text: rirFailLabel(), value: RIR_FAIL_VALUE },
      ...getRirNumberOptions().map((value) => ({
        text: value.toString(),
        value,
      })),
    ];
  }

  public getSecondRirOptions(): Array<{ text: string; value: number | null }> {
    return [
      { text: '-', value: null },
      { text: rirFailLabel(), value: RIR_FAIL_VALUE },
      ...getRirNumberOptions().map((value) => ({
        text: value.toString(),
        value,
      })),
    ];
  }
}
