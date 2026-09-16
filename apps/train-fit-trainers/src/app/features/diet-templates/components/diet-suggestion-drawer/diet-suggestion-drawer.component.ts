import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietSuggestionApiService } from '../../services/diet-suggestion-api.service';
import {
  DietaryFlag,
  DietSource,
  PhaseFocus,
  RankedTemplate,
} from '../../models/diet-suggestion.model';
import { PlanAssignmentApiService } from '../../../../shared/services/plan-assignment-api.service';
import { DietSuggestionSessionService } from '../../services/diet-suggestion-session.service';
import { DIETARY_FLAG_UI } from '../../../../shared/utils/dietary-flag-ui.util';
import { DietCardModule } from '../../../../shared/components/diet-card/diet-card.module';

const FOCUS_DEFAULTS: Record<PhaseFocus, { delta: number; rate: number }> = {
  cut: { delta: -500, rate: -100 },
  maintain: { delta: 0, rate: 0 },
  bulk: { delta: 300, rate: 100 },
};

const DIETARY_FLAGS: { key: DietaryFlag; label: string; icon: string; colorClass: string }[] = (
  ['vegan', 'vegetarian', 'lactoseFree', 'glutenFree'] as DietaryFlag[]
).map((key) => ({ key, ...DIETARY_FLAG_UI[key] }));

type ViewState = 'loading' | 'missing-biometrics' | 'ready' | 'error';

// Sugerencias de dieta — el panel DERECHO al empezar una fase: solo los
// parámetros (objetivo, restricciones), el objetivo calculado del cliente y
// la sugerencia principal + CTA. La LISTA rankeada la pinta la pantalla que
// lo abre (diet-phase-picker: la biblioteca de dietas ordenada para este
// cliente). Estado compartido en DietSuggestionSessionService.
@Component({
  selector: 'app-diet-suggestion-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, DietCardModule],
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

  // Macros por kg de peso — alternativa a los % fijos de siempre: proteína y
  // grasa se editan en g/kg (carbos = resto), igual que la fórmula que ya
  // aplica el backend por defecto (train-fit-back/nutrition-target.js). Se
  // rellenan solos con el resultado de esa fórmula hasta que el entrenador
  // toca uno de los dos campos (ver syncMacroRatioFromTarget/userTouchedMacroRatio).
  public proteinPerKg: number | null = null;
  public fatPerKg: number | null = null;
  private userTouchedMacroRatio = false;

  // Origen de las dietas — combinables entre sí (mismo Set de siempre); el
  // chip "Todas" es solo un atajo para marcar las tres de golpe, no un
  // cuarto valor de origen.
  public readonly sourceOptions: { key: DietSource; label: string; icon: string }[] = [
    { key: 'general', label: 'Añadidas por mí', icon: 'person' },
    { key: 'client', label: 'De este cliente', icon: 'person-circle' },
    { key: 'verified', label: 'By TrainFit', icon: 'shield' },
  ];
  public sources = new Set<DietSource>(['general', 'client', 'verified']);

  public get allSourcesSelected(): boolean {
    return this.sources.size === this.sourceOptions.length;
  }

  public selectAllSources(): void {
    if (this.allSourcesSelected) return;
    this.sources = new Set(this.sourceOptions.map((o) => o.key));
    this.queueRefetch();
  }

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
    if (this.sources.has(source)) {
      // Siempre al menos un origen activo: el backend trata `sources: []`
      // igual que "sin filtro" (las tres), así que quitar el último no
      // vaciaría la lista, la llenaría — confuso. Mejor no dejar quitarlo.
      if (this.sources.size === 1) return;
      this.sources.delete(source);
    } else {
      this.sources.add(source);
    }
    this.queueRefetch();
  }

  public queueRefetch(): void {
    this.userTouchedFilters = true;
    this.refetch$.next();
  }

  // Tocar g/kg fija el override: a partir de aquí el target ya no sigue la
  // fórmula por defecto del backend, sigue estos dos números (ver fetch()).
  public onMacroRatioChange(): void {
    this.userTouchedMacroRatio = true;
    this.queueRefetch();
  }

  // Mientras el entrenador no haya tocado los campos de g/kg, se enseñan
  // rellenos con el ratio que sale de la fórmula por defecto (protein/fat
  // del target ÷ peso del cliente) — puramente informativo, no dispara un
  // fetch nuevo (el target que ya llegó ya usa esa fórmula).
  private syncMacroRatioFromTarget(protein: number, fat: number, weightKg: number | null | undefined): void {
    if (this.userTouchedMacroRatio || !weightKg) return;
    this.proteinPerKg = Math.round((protein / weightKg) * 10) / 10;
    this.fatPerKg = Math.round((fat / weightKg) * 10) / 10;
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
        ...(this.userTouchedMacroRatio && this.proteinPerKg ? { proteinPerKg: this.proteinPerKg } : {}),
        ...(this.userTouchedMacroRatio && this.fatPerKg ? { fatPerKg: this.fatPerKg } : {}),
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
          this.syncMacroRatioFromTarget(res.target.protein, res.target.fat, res.weightSource?.weightKg);
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

  // --- Objetivo calculado / dieta elegida ---

  public get target(): { kcal: number; protein: number; carbs: number; fat: number } | null {
    return this.session.results?.target ?? null;
  }

  public get weightSource(): { weightKg: number; from: string; date?: string } | null {
    return this.session.results?.weightSource ?? null;
  }

  // La que el entrenador va a aplicar: la elegida en la lista o, si no ha
  // elegido, la primera COMPATIBLE — no la primera a secas. Las que
  // incumplen las restricciones salen listadas (detrás, con su aviso) pero
  // nunca se proponen solas: este botón aplica la fase de un click y nadie
  // debería acabar con gluten por no haber tocado nada. Si no hay ninguna
  // compatible no se propone ninguna y hay que elegirla a mano.
  public get chosen(): RankedTemplate | null {
    const r = this.session.results?.ranked ?? [];
    if (this.selectedId) return r.find((t) => t._id === this.selectedId) ?? null;
    return r.find((t) => t._id === this.session.topSuggestionId) ?? null;
  }

  // Solo la que el entrenador ha elegido A MANO en la lista (no la
  // sugerencia principal por defecto): la card de detalle de abajo aparece
  // como CONSECUENCIA de picar una tarjeta, no ya de entrada.
  public get selectedTemplate(): RankedTemplate | null {
    return this.selectedId ? this.chosen : null;
  }

  // La card de detalle vuelve a picarse igual que en la lista: pica de
  // nuevo la misma dieta = la deselecciona (ver select() en el servicio).
  public toggleSelected(template: RankedTemplate): void {
    this.session.select(template);
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
        // Solo si el entrenador los tocó: sin tocar, el backend aplica su
        // fórmula por defecto (misma que rellena estos campos) y así el
        // resumen de ciclo puede decir "fórmula por defecto".
        proteinPerKg: this.userTouchedMacroRatio && this.proteinPerKg ? Number(this.proteinPerKg) : null,
        fatPerKg: this.userTouchedMacroRatio && this.fatPerKg ? Number(this.fatPerKg) : null,
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

    // Solo `phase` viaja al backend: el objetivo calculado (cycleTarget) es
    // informativo — las kcal del ciclo salen de los alimentos.
    this.planApi
      .apply(this.clientId, this.chosen._id, {
        startDate: this.startDate,
        phase: this.phasePayload().phase,
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

  // Editar la sugerencia elegida ANTES de aplicarla — mismo dismiss que
  // createFromScratch (el consumidor, diet-phase-picker.page.ts, navega al
  // builder), pero con el id de la plantilla elegida para que precargue su
  // contenido en vez de arrancar en blanco. Nunca toca la plantilla elegida
  // en sí: el builder construye una plantilla NUEVA propia de este cliente
  // con ese contenido de partida (mismo camino que "empezar de cero").
  public editBeforeApplying(): void {
    if (!this.target || !this.chosen) return;
    // Leer chosen/phasePayload ANTES de resetear la sesión — igual que
    // confirm() lee this.chosen._id antes de session.reset(): al revés
    // (como createFromScratch, que no necesita chosen), el reset deja
    // this.chosen a null y el dismiss de abajo revienta leyendo _id de null.
    const payload = { sourceTemplateId: this.chosen._id, startDate: this.startDate, ...this.phasePayload() };
    this.session.reset();
    void this.modalController.dismiss(payload, 'edit-before-apply');
  }

  public dismiss(): void {
    this.session.reset();
    void this.modalController.dismiss(null, 'cancel');
  }
}
