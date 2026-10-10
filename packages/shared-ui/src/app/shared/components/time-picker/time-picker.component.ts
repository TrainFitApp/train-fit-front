import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { formatSecondsAsTime, parseTimeToSeconds } from 'src/app/shared/utils';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

function buildTimeOptions(count: number): Array<{ text: string; value: number }> {
  return Array.from({ length: count }, (_, value) => ({
    text: String(value).padStart(2, '0'),
    value,
  }));
}

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements OnInit {
  @Input() timeControl: FormControl;
  @Input() label: string = 'TIEMPO';
  @Input() isDone: boolean = false;
  @Output() timeChange = new EventEmitter<string>();

  private readonly translate = inject(TranslateService);

  constructor(private ionicUtilService: IonicUtilService) {}

  ngOnInit(): void {
    if (!this.timeControl) {
      this.timeControl = new FormControl(null);
    }
  }

  public get displayValue(): string {
    return this.timeControl.value || '--:--';
  }

  public onTimeClick(): void {
    this.openTimePicker();
  }

  private async openTimePicker(): Promise<void> {
    const currentSeconds = parseTimeToSeconds(this.timeControl.value);
    const currentMinutes = Math.floor(currentSeconds / 60);
    const currentSecondsPart = currentSeconds % 60;

    const minuteOptions = buildTimeOptions(100);
    const secondOptions = buildTimeOptions(60);

    await this.ionicUtilService.showPicker({
      columns: [
        {
          name: 'min',
          options: minuteOptions,
          selectedIndex: Math.max(0, currentMinutes),
        },
        {
          name: 'sec',
          options: secondOptions,
          selectedIndex: Math.max(0, currentSecondsPart),
        },
      ],
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.OK'),
          handler: (value: any) => {
            const minutes = value?.min?.value ?? 0;
            const seconds = value?.sec?.value ?? 0;
            const newValue = formatSecondsAsTime(minutes * 60 + seconds);
            this.timeControl.patchValue(newValue);
            this.timeChange.emit(newValue);
            return true;
          },
        },
      ],
      mode: 'ios',
      cssClass: 'time-picker-modal',
    });
  }
}
