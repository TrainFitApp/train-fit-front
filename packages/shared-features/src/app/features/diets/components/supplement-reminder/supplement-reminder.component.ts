import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { environment } from 'src/environments/environment';
import { MySupplement } from '../../../supplements/services/my-supplements-api.service';
import { SupplementReminderService } from '../../../supplements/services/supplement-reminder.service';
import { defaultReminderTime, ReminderTime } from '../../../supplements/supplement-reminder.util';

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * Recordatorio de la hora de toma de un suplemento, dentro de su hoja:
 * interruptor y hora, como el del peso en Configuración. Guarda al momento,
 * sin esperar al botón de la hoja. Solo funciona en la app nativa; en web
 * fuera de producción se ve en vista previa (sin guardar ni programar) para
 * poder revisar la pantalla.
 */
@Component({
  selector: 'app-supplement-reminder',
  templateUrl: './supplement-reminder.component.html',
  styleUrls: ['./supplement-reminder.component.scss'],
})
export class SupplementReminderComponent implements OnInit {
  @Input() public supplement!: MySupplement;
  /** Ya marcado como tomado hoy: el aviso de hoy no se programa. */
  @Input() public takenToday = false;

  public enabled = false;
  public time: ReminderTime = { hour: 9, minute: 0 };
  public busy = false;
  public pickerOpen = false;

  constructor(
    private reminders: SupplementReminderService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public get supported(): boolean {
    return this.reminders.isSupported;
  }

  /** Web fuera de producción: se ve y se toca, pero no guarda ni avisa. */
  public get preview(): boolean {
    return !this.supported && !environment.production;
  }

  public get timeLabel(): string {
    return `${pad(this.time.hour)}:${pad(this.time.minute)}`;
  }

  public get locale(): string {
    return this.translate.currentLang === 'en' ? 'en-US' : 'es-ES';
  }

  public async ngOnInit(): Promise<void> {
    if (!this.supported) {
      this.time = defaultReminderTime(this.supplement.timing);
      return;
    }
    const saved = await this.reminders.getReminder(this.supplement._id);
    this.enabled = !!saved;
    this.time = saved || defaultReminderTime(this.supplement.timing);
  }

  public async onToggle(checked: boolean): Promise<void> {
    if (checked === this.enabled || this.busy) return;
    this.enabled = checked;
    if (this.preview) return;
    if (checked) await this.save();
    else await this.run(() => this.reminders.removeReminder(this.supplement._id));
  }

  /** ion-datetime devuelve "HH:mm" o un ISO completo según la versión: vale cualquiera. */
  public async onTimeChange(value: string | string[] | null | undefined): Promise<void> {
    const match = /(?:T|^)(\d{2}):(\d{2})/.exec(String(value || ''));
    if (!match) return;
    this.time = { hour: Number(match[1]), minute: Number(match[2]) };
    if (this.enabled && !this.preview) await this.save();
  }

  private async save(): Promise<void> {
    const granted = await this.run(() => this.reminders.setReminder(this.supplement, this.time, this.takenToday));
    if (granted) return;
    this.enabled = false;
    await this.ionicUtilService.showToast({
      message: this.translate.instant('NOTIFICATIONS.PERMISSION_DENIED'),
      duration: 2000,
      color: 'warning',
    });
  }

  private async run<T>(task: () => Promise<T>): Promise<T> {
    this.busy = true;
    try {
      return await task();
    } finally {
      this.busy = false;
    }
  }
}
