import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { Supplement, SupplementTiming } from '../../models/client-detail.model';

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
  public formDose = '';
  public formTiming = 'with_meal';
  public formCustomTiming = '';
  public formReason = '';
  public formUrl = '';
  public formWeekdays: number[] = [];
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

  public timingLabel(supplement: Supplement): string {
    if (supplement.timing === 'custom') return supplement.customTiming || 'Otro momento';
    return this.timings.find((timing) => timing.key === supplement.timing)?.label || supplement.timing;
  }

  // Vacío = todos los días, que es el caso normal. Se escribe solo cuando NO
  // lo es: repetir "todos los días" en cada fila sería ruido.
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
  public ngAfterViewInit(): void {
    document.body.appendChild(this.panelHost.nativeElement);
  }

  // Sin esto el panel sobreviviría a su propio componente al cambiar de
  // pestaña: ya no cuelga de la ficha, así que nadie lo retira por él.
  public ngOnDestroy(): void {
    this.panelHost?.nativeElement?.remove();
  }

  public openPanel(supplement: Supplement | null): void {
    this.editingId = supplement?._id || null;
    this.formName = supplement?.name || '';
    this.formDose = supplement?.dose || '';
    this.formTiming = supplement?.timing || 'with_meal';
    this.formCustomTiming = supplement?.customTiming || '';
    this.formReason = supplement?.reason || '';
    this.formUrl = supplement?.purchaseUrl || '';
    this.formWeekdays = [...(supplement?.weekdays || [])];
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

  public get canSave(): boolean {
    return !!this.formName.trim() && !!this.formDose.trim() && !this.isSaving;
  }

  public save(): void {
    if (!this.canSave) return;
    this.isSaving = true;

    const payload = {
      name: this.formName.trim(),
      dose: this.formDose.trim(),
      timing: this.formTiming,
      customTiming: this.formCustomTiming.trim(),
      reason: this.formReason.trim(),
      purchaseUrl: this.formUrl.trim(),
      weekdays: this.formWeekdays,
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
          err?.error?.message || 'No se pudo guardar el suplemento',
          'Error',
          3000
        );
      },
    });
  }

  public async confirmRemove(supplement: Supplement): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: 'Quitar suplemento',
      message: `¿Seguro que quieres dejar de pautarle "${supplement.name}"?`,
      buttons: [
        { text: 'Volver', role: 'cancel' },
        {
          text: 'Quitar',
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
        this.ionicUtilService.showErrorToast('No se pudo quitar el suplemento', 'Error', 2500),
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
}
