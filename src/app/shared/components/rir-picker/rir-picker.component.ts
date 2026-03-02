import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonicUtilService } from '../../../core/services/util/ionic-util.service';

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
  @Output() rirChange = new EventEmitter<number | null>();

  public shimmerAnimationState = 'idle';
  public selectedRirValue: number | null = null;

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
    const options = this.getRirOptions().map((o) => ({
      text: o.text,
      value: o.value,
      cssClass: o.value === -1 ? 'rir-option-fallo' : 'rir-option-number',
    }));
    const selectedIndex = Math.max(
      0,
      options.findIndex((o) => o.value === this.selectedRirValue)
    );

    await this.ionicUtilService.showPicker({
      columns: [
        {
          name: 'rir',
          options,
          selectedIndex,
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
            const newValue = value?.rir?.value ?? null;
            this.rirControl.patchValue(newValue);
            this.rirChange.emit(newValue);
            return true;
          },
        },
      ],
      mode: 'ios',
    });
  }

  public get displayValue(): string {
    const value = this.rirControl.value;
    if (value === null || value === undefined) return '-';
    if (value === -1) return 'FALLO';
    return value.toString();
  }

  public getRirOptions(): Array<{ text: string; value: number | null }> {
    return [
      { text: '-', value: null },
      { text: 'FALLO', value: -1 },
      ...Array.from({ length: 11 }, (_, i) => ({
        text: i.toString(),
        value: i,
      })),
    ];
  }
}
