import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { localIsoDate } from 'src/app/core/utils/local-date.util';
import {
  DEFAULT_DOSE_UNIT,
  DoseLang,
  doseUnitOptions,
  formatDose,
  parseDose,
} from 'src/app/core/utils/supplement-dose.util';
import {
  MySupplement,
  MySupplementsApiService,
  OwnSupplementInput,
  SupplementTiming,
} from '../../../supplements/services/my-supplements-api.service';

export const SUPPLEMENT_SHEET_OPTIONS = {
  cssClass: 'supplement-sheet-modal',
  breakpoints: [0, 1],
  initialBreakpoint: 1,
};

/** Lo que devuelve la hoja al cerrarse tras guardar o quitar. */
export interface SupplementSheetResult {
  changed: true;
}

// Códigos del backend (supplement-service.js) con texto propio; el resto
// cae en el genérico de guardar.
const ERROR_KEYS: Record<string, string> = {
  SUPPLEMENT_DUPLICATE: 'SUPPLEMENTS.DUPLICATE',
  SUPPLEMENT_MANAGED_BY_TRAINER: 'SUPPLEMENTS.MANAGED_BY_TRAINER',
};

/**
 * Suplemento propio del cliente: lo que se apunta él mismo desde Dietas,
 * debajo de las comidas, cuando no le lleva un profesional. Solo nombre,
 * dosis y momento; se toma desde el día que estaba mirando, todos los días,
 * hasta que lo quite. Lo pautado por un profesional no pasa por aquí: es de
 * solo lectura.
 *
 * La dosis se escribe como la pauta el profesional, cantidad + unidad de una
 * lista, y se guarda junta como texto ("5 g"). El momento es una lista
 * cerrada; solo "otro momento" abre un texto libre.
 *
 * Guarda o quita ella misma y devuelve `{ changed: true }`: así un nombre
 * repetido se explica sin cerrar la hoja ni perder lo escrito.
 */
@Component({
  selector: 'app-supplement-sheet',
  templateUrl: './supplement-sheet.component.html',
  styleUrls: ['./supplement-sheet.component.scss'],
})
export class SupplementSheetComponent implements OnInit {
  /** Presente = editar uno propio, en vez de crearlo. */
  @Input() public supplement?: MySupplement;
  /** Vocabulario de "cuándo tomarlo", en el orden del backend (de la mañana a la noche). */
  @Input() public timings: SupplementTiming[] = [];
  /** Día que se está mirando en Dietas: desde él se toma. */
  @Input() public startDate = localIsoDate();

  public form!: FormGroup;
  /** Unidades del desplegable de la dosis; si se edita una dosis con otra, esa también. */
  public doseUnits: string[] = [];
  public saving = false;
  public removing = false;
  public errorKey: string | null = null;

  public readonly today = localIsoDate();

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private mySupplementsApi: MySupplementsApiService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public get isEditMode(): boolean {
    return !!this.supplement;
  }

  public get busy(): boolean {
    return this.saving || this.removing;
  }

  /** La dosis como se guarda ("5 g"); '' mientras la cantidad no sea un número mayor que 0. */
  public get doseText(): string {
    const { doseAmount, doseUnit } = this.form.value;
    return formatDose(doseAmount, doseUnit, this.doseLang);
  }

  public get canSubmit(): boolean {
    return !this.busy && !!this.form.value.name?.trim() && !!this.doseText;
  }

  public get isCustomTiming(): boolean {
    return this.form.value.timing === 'custom';
  }

  /** La unidad se escribe en el idioma de la app ("2 cápsulas" / "2 capsules"). */
  private get doseLang(): DoseLang {
    return this.translate.currentLang === 'en' ? 'en' : 'es';
  }

  public ngOnInit(): void {
    const current = this.supplement;
    const dose = parseDose(current?.dose ?? '', this.doseLang);
    const doseUnit = dose.unit || DEFAULT_DOSE_UNIT;
    // Una dosis con una unidad fuera de la lista ("1 medida rasa", o la que
    // escribió el asistente) se ofrece como una opción más: editar no la pierde.
    this.doseUnits = doseUnitOptions(doseUnit, this.doseLang);
    this.form = this.formBuilder.group({
      name: [current?.name ?? ''],
      doseAmount: [dose.amount],
      doseUnit: [doseUnit],
      timing: [current?.timing ?? 'with_meal'],
      customTiming: [current?.customTiming ?? ''],
    });
  }

  /** Escribir de nuevo borra el aviso de un intento anterior. */
  public clearError(): void {
    this.errorKey = null;
  }

  public timingLabel(timing: SupplementTiming): string {
    const key = `SUPPLEMENTS.TIMINGS.${timing.key}`;
    const label = this.translate.instant(key);
    return label === key ? timing.label : label;
  }

  public submit(): void {
    if (!this.canSubmit) return;
    const { name, timing, customTiming } = this.form.value;
    const body: OwnSupplementInput = {
      name: name.trim(),
      dose: this.doseText,
      timing,
      customTiming: timing === 'custom' ? (customTiming || '').trim() : '',
    };

    this.saving = true;
    const request = this.supplement
      ? this.mySupplementsApi.updateMine(this.supplement._id, body)
      : this.mySupplementsApi.createMine({ ...body, startDate: this.startDate });
    request.subscribe({
      next: () => this.close(),
      error: (error) => {
        this.saving = false;
        this.errorKey = ERROR_KEYS[error?.code ?? error?.error?.code] || 'SUPPLEMENTS.SAVE_ERROR';
      },
    });
  }

  public async confirmRemove(): Promise<void> {
    if (!this.supplement || this.busy) return;
    const t = this.translate.instant.bind(this.translate);
    await this.ionicUtilService.showAlert({
      header: t('SUPPLEMENTS.REMOVE_HEADER', { name: this.supplement.name }),
      message: t('SUPPLEMENTS.REMOVE_MESSAGE'),
      buttons: [
        { text: t('COMMON.CANCEL').toUpperCase(), role: 'cancel' },
        { text: t('SUPPLEMENTS.REMOVE').toUpperCase(), role: 'destructive', handler: () => this.remove() },
      ],
    });
  }

  public cancel(): void {
    void this.modalController.dismiss();
  }

  private remove(): void {
    if (!this.supplement) return;
    this.removing = true;
    this.mySupplementsApi.removeMine(this.supplement._id).subscribe({
      next: () => this.close(),
      error: () => {
        this.removing = false;
        this.errorKey = 'SUPPLEMENTS.REMOVE_ERROR';
      },
    });
  }

  private close(): void {
    const result: SupplementSheetResult = { changed: true };
    void this.modalController.dismiss(result);
  }
}
