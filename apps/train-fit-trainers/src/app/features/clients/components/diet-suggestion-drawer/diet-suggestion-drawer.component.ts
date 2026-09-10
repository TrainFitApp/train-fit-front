import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietSuggestionApiService } from '../../../diet-templates/services/diet-suggestion-api.service';
import {
  DietaryFlag,
  DietSuggestionResponse,
  PhaseFocus,
  RankedTemplate,
} from '../../../diet-templates/models/diet-suggestion.model';
import { PlanAssignmentApiService } from '../../../../shared/services/plan-assignment-api.service';

const FOCUS_DEFAULTS: Record<PhaseFocus, { delta: number; rate: number }> = {
  cut: { delta: -500, rate: -100 },
  maintain: { delta: 0, rate: 0 },
  bulk: { delta: 300, rate: 100 },
};

const DIETARY_FLAGS: { key: DietaryFlag; label: string }[] = [
  { key: 'vegan', label: 'Vegana' },
  { key: 'vegetarian', label: 'Vegetariana' },
  { key: 'lactoseFree', label: 'Sin lactosa' },
  { key: 'glutenFree', label: 'Sin gluten' },
];

type ViewState = 'loading' | 'missing-biometrics' | 'ready' | 'error';

// Sugerencias de dieta — el cajón lateral que se abre al empezar una fase de
// nutrición en la ficha del cliente. Filtros autorrellenados (objetivo,
// restricciones), plantillas rankeadas por cercanía al objetivo del cliente
// (podio 🥇🥈🥉 + resto), y al elegir una se aplica como ciclo 1 de la fase.
@Component({
  selector: 'app-diet-suggestion-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './diet-suggestion-drawer.component.html',
  styleUrls: ['./diet-suggestion-drawer.component.scss'],
})
export class DietSuggestionDrawerComponent implements OnInit {
  @Input() public clientId!: string;
  @Input() public clientName = 'este cliente';
  @Input() public suggestedStartDate: string | null = null;

  public state: ViewState = 'loading';
  public missing: string[] = [];

  // --- Filtros ---
  public focus: PhaseFocus = 'cut';
  public phaseName = 'Definición';
  public kcalDelta = FOCUS_DEFAULTS.cut.delta;
  public ratePerCycle = FOCUS_DEFAULTS.cut.rate;
  public readonly dietaryFlagOptions = DIETARY_FLAGS;
  public dietaryFlags = new Set<DietaryFlag>();

  // --- Resultado ---
  public data: DietSuggestionResponse | null = null;
  public showHidden = false;

  // --- Confirmación ---
  public startDate = new Date().toISOString().slice(0, 10);
  public selectedTemplateId: string | null = null;
  public applying = false;

  private refetch$ = new Subject<void>();

  constructor(
    private modalController: ModalController,
    private suggestionApi: DietSuggestionApiService,
    private planApi: PlanAssignmentApiService,
    private ionicUtil: IonicUtilService
  ) {}

  public ngOnInit(): void {
    if (this.suggestedStartDate) this.startDate = this.suggestedStartDate;
    this.refetch$.pipe(debounceTime(350)).subscribe(() => this.fetch());
    this.fetch();
  }

  // --- Filtros ---

  // Se marca en cuanto el entrenador toca un filtro: a partir de ahí el
  // objetivo del cliente (clientObjetive) ya no re-ajusta nada.
  private userTouchedFilters = false;
  private appliedClientObjetive = false;

  public setFocus(focus: PhaseFocus): void {
    this.userTouchedFilters = true;
    this.focus = focus;
    this.kcalDelta = FOCUS_DEFAULTS[focus].delta;
    this.ratePerCycle = FOCUS_DEFAULTS[focus].rate;
    this.phaseName = focus === 'cut' ? 'Definición' : focus === 'bulk' ? 'Volumen' : 'Mantenimiento';
    this.queueRefetch();
  }

  public toggleFlag(flag: DietaryFlag): void {
    this.userTouchedFilters = true;
    if (this.dietaryFlags.has(flag)) this.dietaryFlags.delete(flag);
    else this.dietaryFlags.add(flag);
    this.queueRefetch();
  }

  // El objetivo del cliente al registrarse decide en qué focus arranca el
  // cajón (en vez de siempre "Definir"). Solo antes de que el entrenador
  // toque nada, y solo una vez.
  private applyClientObjetive(delta: number): void {
    const focus: PhaseFocus = delta < -50 ? 'cut' : delta > 50 ? 'bulk' : 'maintain';
    this.focus = focus;
    this.phaseName = focus === 'cut' ? 'Definición' : focus === 'bulk' ? 'Volumen' : 'Mantenimiento';
    this.kcalDelta = Math.round(delta) || FOCUS_DEFAULTS[focus].delta;
    this.ratePerCycle = FOCUS_DEFAULTS[focus].rate;
  }

  public queueRefetch(): void {
    this.userTouchedFilters = true;
    this.refetch$.next();
  }

  private fetch(): void {
    this.state = this.data ? this.state : 'loading';
    this.suggestionApi
      .suggest(this.clientId, {
        objetiveKcalDelta: Number(this.kcalDelta) || 0,
        dietaryFlags: [...this.dietaryFlags],
      })
      .subscribe({
        next: (res) => {
          // Primera respuesta y el entrenador no ha tocado nada: arrancar en
          // el focus que encaja con el objetivo que el cliente eligió al
          // registrarse, y volver a pedir con ese delta.
          if (
            !this.userTouchedFilters &&
            !this.appliedClientObjetive &&
            typeof res.clientObjetive === 'number'
          ) {
            this.appliedClientObjetive = true;
            const before = this.kcalDelta;
            this.applyClientObjetive(res.clientObjetive);
            if (this.kcalDelta !== before) {
              this.fetch();
              return;
            }
          }
          this.data = res;
          this.state = 'ready';
          if (this.selectedTemplateId && !res.ranked.some((r) => r._id === this.selectedTemplateId)) {
            this.selectedTemplateId = null;
          }
        },
        error: (err) => {
          if (err?.status === 422 && err?.error?.code === 'MISSING_BIOMETRICS') {
            this.missing = err.error.missing || [];
            this.state = 'missing-biometrics';
            return;
          }
          this.state = this.data ? 'ready' : 'error';
          this.ionicUtil.showErrorToast(
            err?.error?.message || 'No se pudieron cargar las sugerencias',
            'Error',
            3500
          );
        },
      });
  }

  // --- Render helpers ---

  public medal(rank: number): string {
    return rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
  }

  public deltaLabel(value: number, unit = ''): string {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value}${unit}`;
  }

  public focusVerb(): string {
    return this.focus === 'cut' ? 'definir' : this.focus === 'bulk' ? 'coger volumen' : 'mantener';
  }

  public flagLabel(flag: DietaryFlag): string {
    return DIETARY_FLAGS.find((f) => f.key === flag)?.label ?? flag;
  }

  // --- Acciones ---

  public select(template: RankedTemplate): void {
    this.selectedTemplateId = this.selectedTemplateId === template._id ? null : template._id;
  }

  public get canConfirm(): boolean {
    return !!this.selectedTemplateId && !!this.startDate && !this.applying;
  }

  public confirm(): void {
    if (!this.canConfirm || !this.data) return;
    this.applying = true;
    const target = this.data.target;

    this.planApi
      .apply(this.clientId, this.selectedTemplateId as string, {
        startDate: this.startDate,
        endMode: 'indefinite',
        phase: {
          name: this.phaseName.trim() || this.phaseName,
          focus: this.focus,
          targetKcalDelta: Number(this.kcalDelta) || 0,
          ratePerCycle: Number(this.ratePerCycle) || 0,
        },
        cycleTarget: {
          kcal: target.kcal,
          macros: { protein: target.protein, carbs: target.carbs, fat: target.fat },
        },
      })
      .subscribe({
        next: (assignment) => {
          this.ionicUtil.showToast({
            message: `Fase "${this.phaseName}" aplicada a ${this.clientName} desde ${this.startDate}`,
            duration: 3000,
          });
          void this.modalController.dismiss({ assignment, phaseName: this.phaseName }, 'confirm');
        },
        error: (err) => {
          this.applying = false;
          this.ionicUtil.showErrorToast(
            err?.status === 409
              ? err?.error?.message || 'Esas fechas se solapan con otra fase'
              : err?.error?.message || 'No se pudo aplicar la fase',
            'Error',
            4000
          );
        },
      });
  }

  // "Empezar de cero" — ninguna plantilla encaja (o el entrenador quiere
  // construirla). Se lleva el objetivo calculado + el bloque de fase al
  // builder, que al guardar crea la dieta y la aplica como ciclo 1.
  public createFromScratch(): void {
    if (!this.data) return;
    const target = this.data.target;
    void this.modalController.dismiss(
      {
        forDirectCreate: true,
        startDate: this.startDate,
        phase: {
          name: this.phaseName.trim() || this.phaseName,
          focus: this.focus,
          targetKcalDelta: Number(this.kcalDelta) || 0,
          ratePerCycle: Number(this.ratePerCycle) || 0,
        },
        cycleTarget: {
          kcal: target.kcal,
          macros: { protein: target.protein, carbs: target.carbs, fat: target.fat },
        },
      },
      'create-from-scratch'
    );
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }
}
