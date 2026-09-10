import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietSuggestionApiService } from '../../../diet-templates/services/diet-suggestion-api.service';
import {
  DietaryFlag,
  DietSource,
  PhaseFocus,
  RankedTemplate,
} from '../../../diet-templates/models/diet-suggestion.model';
import { PlanAssignmentApiService } from '../../../../shared/services/plan-assignment-api.service';
import { DietSuggestionSessionService } from '../../services/diet-suggestion-session.service';

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

// Sugerencias de dieta — el panel DERECHO al empezar una fase: solo los
// parámetros (objetivo, restricciones), el objetivo calculado del cliente y
// la sugerencia principal + CTA. La LISTA rankeada va en la zona principal
// (diet-suggestion-list). Estado compartido en DietSuggestionSessionService.
@Component({
  selector: 'app-diet-suggestion-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './diet-suggestion-drawer.component.html',
  styleUrls: ['./diet-suggestion-drawer.component.scss'],
})
export class DietSuggestionDrawerComponent implements OnInit, OnDestroy {
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

  // Origen de las dietas — las tres marcadas por defecto.
  public readonly sourceOptions: { key: DietSource; label: string }[] = [
    { key: 'general', label: 'Generales' },
    { key: 'client', label: 'De este cliente' },
    { key: 'verified', label: 'De fábrica' },
  ];
  public sources = new Set<DietSource>(['general', 'client', 'verified']);

  // --- Confirmación ---
  public startDate = new Date().toISOString().slice(0, 10);
  public applying = false;

  // Reflejo local del estado compartido (para el template).
  public selectedId: string | null = null;

  private readonly refetch$ = new Subject<void>();
  private readonly subs = new Subscription();
  private userTouchedFilters = false;
  private appliedClientDefaults = false;

  constructor(
    private modalController: ModalController,
    private suggestionApi: DietSuggestionApiService,
    private planApi: PlanAssignmentApiService,
    private ionicUtil: IonicUtilService,
    private session: DietSuggestionSessionService
  ) {}

  public ngOnInit(): void {
    this.session.reset();
    if (this.suggestedStartDate) this.startDate = this.suggestedStartDate;
    this.subs.add(this.refetch$.pipe(debounceTime(350)).subscribe(() => this.fetch()));
    this.subs.add(this.session.selectedId$.subscribe((id) => (this.selectedId = id)));
    this.fetch();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // --- Filtros ---

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

  public toggleSource(source: DietSource): void {
    if (this.sources.has(source)) this.sources.delete(source);
    else this.sources.add(source);
    this.queueRefetch();
  }

  public queueRefetch(): void {
    this.userTouchedFilters = true;
    this.refetch$.next();
  }

  // El objetivo del cliente al registrarse decide en qué focus arranca (en
  // vez de siempre "Definir"). Solo antes de que el entrenador toque nada.
  private applyClientObjetive(delta: number): void {
    const focus: PhaseFocus = delta < -50 ? 'cut' : delta > 50 ? 'bulk' : 'maintain';
    this.focus = focus;
    this.phaseName = focus === 'cut' ? 'Definición' : focus === 'bulk' ? 'Volumen' : 'Mantenimiento';
    this.kcalDelta = Math.round(delta) || FOCUS_DEFAULTS[focus].delta;
    this.ratePerCycle = FOCUS_DEFAULTS[focus].rate;
  }

  private fetch(): void {
    if (this.state !== 'ready') this.state = 'loading';
    this.session.setLoading(true);
    this.suggestionApi
      .suggest(this.clientId, {
        objetiveKcalDelta: Number(this.kcalDelta) || 0,
        dietaryFlags: [...this.dietaryFlags],
        sources: [...this.sources],
      })
      .subscribe({
        next: (res) => {
          // Primera respuesta, sin que el entrenador haya tocado nada:
          // arrancar del objetivo + restricciones que el cliente declaró.
          if (!this.userTouchedFilters && !this.appliedClientDefaults) {
            this.appliedClientDefaults = true;
            const before = { kcal: this.kcalDelta, flags: this.dietaryFlags.size };
            if (typeof res.clientObjetive === 'number') this.applyClientObjetive(res.clientObjetive);
            for (const f of res.clientDietaryFlags || []) this.dietaryFlags.add(f);
            if (this.kcalDelta !== before.kcal || this.dietaryFlags.size !== before.flags) {
              this.fetch();
              return;
            }
          }
          this.session.setResults(res);
          this.session.setLoading(false);
          this.state = 'ready';
        },
        error: (err) => {
          this.session.setLoading(false);
          if (err?.status === 422 && err?.error?.code === 'MISSING_BIOMETRICS') {
            this.missing = err.error.missing || [];
            this.state = 'missing-biometrics';
            return;
          }
          this.state = this.session.results ? 'ready' : 'error';
          this.ionicUtil.showErrorToast(
            err?.error?.message || 'No se pudieron cargar las sugerencias',
            'Error',
            3500
          );
        },
      });
  }

  // --- Sugerencia principal / lo que se va a aplicar ---

  public get target(): { kcal: number; protein: number; carbs: number; fat: number } | null {
    return this.session.results?.target ?? null;
  }

  public get weightSource(): { weightKg: number; from: string; date?: string } | null {
    return this.session.results?.weightSource ?? null;
  }

  // La que el entrenador va a aplicar: la elegida en la lista, o la #1.
  public get chosen(): RankedTemplate | null {
    const r = this.session.results?.ranked ?? [];
    if (this.selectedId) return r.find((t) => t._id === this.selectedId) ?? null;
    return r[0] ?? null;
  }

  public get chosenIsTop(): boolean {
    return !!this.chosen && this.chosen.rank === 1 && !this.selectedId;
  }

  public focusVerb(): string {
    return this.focus === 'cut' ? 'definir' : this.focus === 'bulk' ? 'coger volumen' : 'mantener';
  }

  // --- Acciones ---

  public get canConfirm(): boolean {
    return !!this.chosen && !!this.startDate && !this.applying;
  }

  private phasePayload() {
    const t = this.target!;
    return {
      phase: {
        name: this.phaseName.trim() || this.phaseName,
        focus: this.focus,
        targetKcalDelta: Number(this.kcalDelta) || 0,
        ratePerCycle: Number(this.ratePerCycle) || 0,
      },
      cycleTarget: {
        kcal: t.kcal,
        macros: { protein: t.protein, carbs: t.carbs, fat: t.fat },
      },
    };
  }

  public confirm(): void {
    if (!this.canConfirm || !this.target || !this.chosen) return;
    this.applying = true;

    this.planApi
      .apply(this.clientId, this.chosen._id, {
        startDate: this.startDate,
        endMode: 'indefinite',
        ...this.phasePayload(),
      })
      .subscribe({
        next: (assignment) => {
          this.ionicUtil.showToast({
            message: `Fase "${this.phaseName}" aplicada a ${this.clientName} desde ${this.startDate}`,
            duration: 3000,
          });
          this.session.reset();
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

  public createFromScratch(): void {
    if (!this.target) return;
    this.session.reset();
    void this.modalController.dismiss(
      { forDirectCreate: true, startDate: this.startDate, ...this.phasePayload() },
      'create-from-scratch'
    );
  }

  public dismiss(): void {
    this.session.reset();
    void this.modalController.dismiss(null, 'cancel');
  }
}
