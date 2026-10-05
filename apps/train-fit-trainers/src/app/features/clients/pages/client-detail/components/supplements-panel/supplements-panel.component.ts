import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { sanitizeDecimalString } from 'src/app/core/directives/decimal-input.directive';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { Supplement, SupplementTiming } from '../../models/client-detail.model';
import {
  DEFAULT_DOSE_UNIT,
  DOSE_UNIT_VALUES,
  formatDose,
  isKnownDoseUnit,
  parseDose,
} from './supplement-dose.util';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import { localIsoDate } from 'src/app/core/utils/local-date.util';

type ViewState = 'loading' | 'error' | 'loaded';

const WEEKDAYS = [
  { value: 1, label: 'L' },
  { value: 2, label: 'M' },
  { value: 3, label: 'X' },
  { value: 4, label: 'J' },
  { value: 5, label: 'V' },
  { value: 6, label: 'S' },
  { value: 0, label: 'D' },
];

// Un icono por momento del día: se reconoce antes que la etiqueta y
// distingue las filas de un vistazo. Las claves son las de
// SUPPLEMENT_TIMINGS en el backend.
const TIMING_ICONS: Record<string, string> = {
  waking: 'sunny-outline',
  breakfast: 'cafe-outline',
  pre_workout: 'barbell-outline',
  intra_workout: 'fitness-outline',
  post_workout: 'flame-outline',
  with_meal: 'restaurant-outline',
  before_bed: 'moon-outline',
  custom: 'time-outline',
};

/**
 * Movimiento 5 Coach Pro — suplementación pautada: qué, cuánto, cuándo, por
 * qué y dónde comprarlo.
 *
 * Componente propio y no un campo del objetivo nutricional: un suplemento no
 * es un macro. Cambia con independencia de las kcal, y obligarlos a viajar
 * juntos haría que retocar el objetivo reescribiera la pauta de suplementos.
 */
@Component({
  selector: 'app-supplements-panel',
  templateUrl: 'supplements-panel.component.html',
  styleUrls: ['supplements-panel.component.scss'],
})
export class SupplementsPanelComponent implements AfterViewInit, OnChanges, OnDestroy {
  private readonly translate = inject(TranslateService);

  @Input() public clientId = '';

  public state: ViewState = 'loading';
  public supplements: Supplement[] = [];
  public timings: SupplementTiming[] = [];
  public readonly weekdays = WEEKDAYS;

  // --- Panel de edición ---
  public editingId: string | null = null;
  public showPanel = false;

  // El panel se renderiza FUERA del árbol del componente, colgado del body
  // por el Overlay del CDK.
  //
  // Estando dentro de la ficha, su position:fixed quedaba a merced de los
  // ancestros: ion-content aplica contain, que captura el fixed, y las
  // gráficas de Chart.js pintan sobre <canvas>, que el navegador promociona
  // a su propia capa de composición. El resultado era un panel que se veía
  // atravesado justo por encima de las gráficas y no del resto.
  @ViewChild('panelHost') private panelHost!: ElementRef<HTMLElement>;
  public formName = '';
  // Dosis en dos piezas: cantidad (solo número) + unidad de la lista. Se
  // guarda junta como texto ("5 g"), que es lo que lee el cliente.
  public formDoseAmount = '';
  public formDoseUnit = DEFAULT_DOSE_UNIT;
  public doseUnits: string[] = DOSE_UNIT_VALUES;
  public formTiming = 'with_meal';
  public formCustomTiming = '';
  public formReason = '';
  public formUrl = '';
  public formWeekdays: number[] = [];
  // Desde cuándo y hasta cuándo (docs/plan-semanas.md). Sin fin =
  // hasta nueva orden.
  public formStartDate = '';
  public formEndDate = '';
  public isSaving = false;

  constructor(
    private clientDetailApi: ClientDetailApiService,
    private ionicUtilService: IonicUtilService
  ) {}

  public ngOnChanges(): void {
    if (this.clientId) this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.clientDetailApi.getSupplementTimings().subscribe({
      next: ({ timings }) => (this.timings = timings || []),
      // Sin catálogo se sigue pudiendo leer la lista: los momentos saldrán
      // como su clave, que es feo pero no rompe nada.
      error: () => (this.timings = []),
    });

    this.clientDetailApi.getSupplements(this.clientId).subscribe({
      next: (supplements) => {
        this.supplements = supplements || [];
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public timingIcon(supplement: Supplement): string {
    return TIMING_ICONS[supplement.timing] || TIMING_ICONS['custom'];
  }

  public timingLabel(supplement: Supplement): string {
    if (supplement.timing === 'custom') return supplement.customTiming || this.translate.instant('DIETS.OTHER_TIME');
    return this.timings.find((timing) => timing.key === supplement.timing)?.label || supplement.timing;
  }

  // Vacío = todos los días, que es el caso normal. Se escribe solo cuando NO
  // lo es: repetir "todos los días" en cada fila sería ruido.
  // "desde el 3 sept" / "3 sept → 30 sept": lo que hace falta para saber si
  // sigue vigente sin abrir el detalle.
  public datesLabel(supplement: Supplement): string {
    if (!supplement.startDate) return '';
    const fmt = (iso: string): string =>
      new Date(`${iso}T00:00:00Z`).toLocaleDateString(uiLocale(), { day: 'numeric', month: 'short', timeZone: 'UTC' });
    return supplement.endDate
      ? `${fmt(supplement.startDate)} → ${fmt(supplement.endDate)}`
      : `desde ${fmt(supplement.startDate)}`;
  }

  public weekdaysLabel(supplement: Supplement): string {
    const days = supplement.weekdays || [];
    if (!days.length) return '';
    return days
      .map((day) => WEEKDAYS.find((weekday) => weekday.value === day)?.label || '')
      .filter(Boolean)
      .join(' ');
  }

  // --- Edición ---
  // Se mueve UNA vez, al montar, y se queda ahí: Angular sigue gobernando
  // la vista (bindings, *ngIf y eventos) aunque el nodo cuelgue de otro
  // padre en el DOM, porque la vista es suya, no del sitio donde esté.
  // Es lo mismo que hace por dentro el Overlay del CDK; se hace a mano para
  // no tener que meter OverlayModule y su CSS global en el build de la app
  // por un solo panel.
  //
  // A ion-app y no al body: ion-app es un contexto de apilamiento propio
  // (z-index 0) y ahí cuelga Ionic sus overlays. Desde el body, el panel
  // (z-index 500) quedaba por encima de TODO ion-app, y el desplegable del
  // momento del día, el calendario de las fechas y los avisos de error se
  // abrían detrás del panel, sin poder tocarse.
  public ngAfterViewInit(): void {
    (document.querySelector('ion-app') || document.body).appendChild(this.panelHost.nativeElement);
  }

  // Sin esto el panel sobreviviría a su propio componente al cambiar de
  // pestaña: ya no cuelga de la ficha, así que nadie lo retira por él.
  public ngOnDestroy(): void {
    this.panelHost?.nativeElement?.remove();
  }

  public openPanel(supplement: Supplement | null): void {
    this.editingId = supplement?._id || null;
    this.formName = supplement?.name || '';
    const dose = parseDose(supplement?.dose || '');
    this.formDoseAmount = dose.amount;
    this.formDoseUnit = dose.unit || DEFAULT_DOSE_UNIT;
    // Una dosis antigua con una unidad fuera de la lista ("1 medida rasa")
    // se ofrece como una opción más para no perderla al guardar.
    this.doseUnits = isKnownDoseUnit(this.formDoseUnit)
      ? DOSE_UNIT_VALUES
      : [...DOSE_UNIT_VALUES, this.formDoseUnit];
    this.formTiming = supplement?.timing || 'with_meal';
    this.formCustomTiming = supplement?.customTiming || '';
    this.formReason = supplement?.reason || '';
    this.formUrl = supplement?.purchaseUrl || '';
    this.formWeekdays = [...(supplement?.weekdays || [])];
    this.formStartDate = supplement?.startDate || localIsoDate();
    this.formEndDate = supplement?.endDate || '';
    this.showPanel = true;
  }

  public closePanel(): void {
    this.showPanel = false;
    this.editingId = null;
  }

  public toggleWeekday(day: number): void {
    const index = this.formWeekdays.indexOf(day);
    if (index >= 0) this.formWeekdays.splice(index, 1);
    else this.formWeekdays.push(day);
  }

  public isWeekdaySelected(day: number): boolean {
    return this.formWeekdays.includes(day);
  }

  // Solo cifras y una coma/punto decimal: lo que no lo es se quita al
  // escribirlo, no se avisa después.
  public onDoseAmountInput(input: HTMLInputElement): void {
    const clean = sanitizeDecimalString(input.value, 2);
    input.value = clean;
    this.formDoseAmount = clean;
  }

  public get formDose(): string {
    return formatDose(this.formDoseAmount, this.formDoseUnit);
  }

  public get canSave(): boolean {
    if (this.formEndDate && this.formStartDate && this.formEndDate < this.formStartDate) return false;
    return !!this.formName.trim() && !!this.formDose && !!this.formStartDate && !this.isSaving;
  }

  public save(): void {
    if (!this.canSave) return;
    this.isSaving = true;

    const payload = {
      name: this.formName.trim(),
      dose: this.formDose,
      timing: this.formTiming,
      customTiming: this.formCustomTiming.trim(),
      reason: this.formReason.trim(),
      purchaseUrl: this.formUrl.trim(),
      weekdays: this.formWeekdays,
      startDate: this.formStartDate,
      endDate: this.formEndDate || null,
      active: true,
    };

    const request$ = this.editingId
      ? this.clientDetailApi.updateSupplement(this.clientId, this.editingId, payload)
      : this.clientDetailApi.createSupplement(this.clientId, payload);

    request$.subscribe({
      next: () => {
        this.isSaving = false;
        this.closePanel();
        this.load();
      },
      error: (err) => {
        this.isSaving = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || this.translate.instant('CLIENTS.NO_SE_PUDO_GUARDAR_EL_3'),
          this.translate.instant('COMMON.ERROR'),
          3000
        );
      },
    });
  }

  public async confirmRemove(supplement: Supplement): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('CLIENTS.QUITAR_SUPLEMENTO'),
      message: this.translate.instant('CLIENTS.SEGURO_QUE_QUIERES_DEJAR_DE_2', { name: supplement.name }),
      buttons: [
        { text: this.translate.instant('COMMON.GO_BACK'), role: 'cancel' },
        {
          text: this.translate.instant('TRAINER_COMMON.REMOVE'),
          cssClass: 'alert-button-danger',
          handler: () => this.remove(supplement),
        },
      ],
    });
  }

  private remove(supplement: Supplement): void {
    this.clientDetailApi.deleteSupplement(this.clientId, supplement._id).subscribe({
      next: () => this.load(),
      error: () =>
        this.ionicUtilService.showErrorToast(this.translate.instant('CLIENTS.NO_SE_PUDO_QUITAR_EL_2'), this.translate.instant('COMMON.ERROR'), 2500),
    });
  }

  public trackById(_index: number, supplement: Supplement): string {
    return supplement._id;
  }

  public trackByKey(_index: number, timing: SupplementTiming): string {
    return timing.key;
  }

  public trackByValue(_index: number, weekday: { value: number }): number {
    return weekday.value;
  }

  public trackByUnit(_index: number, unit: string): string {
    return unit;
  }
}
