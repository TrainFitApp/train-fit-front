import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietSuggestionApiService } from '../../services/diet-suggestion-api.service';
import {
  DietaryFlag,
  DietSource,
  DietSuggestionResponse,
  MacroSet,
  RankedTemplate,
} from '../../models/diet-suggestion.model';
import { DietPhaseApiService } from '../../../../shared/services/diet-phase-api.service';
import { PhaseStartSettings } from '../../../../shared/models/diet-phase.model';
import { DietSuggestionSessionService } from '../../services/diet-suggestion-session.service';
import { DIETARY_FLAG_UI } from '../../../../shared/utils/dietary-flag-ui.util';
import { MacroAdjustComponent } from '../../../../shared/components/macro-adjust/macro-adjust.component';
import { nextSources } from './diet-source-filter.util';
import { localIsoDate } from 'src/app/core/utils/local-date.util';

const DIETARY_FLAGS: { key: DietaryFlag; label: string; icon: string; colorClass: string }[] = (
  ['vegan', 'vegetarian', 'lactoseFree', 'glutenFree'] as DietaryFlag[]
).map((key) => ({ key, ...DIETARY_FLAG_UI[key] }));

type ViewState = 'loading' | 'missing-biometrics' | 'ready' | 'error';

// De dónde salen los números con los que se pauta: la referencia calculada
// con los datos del cliente, el objetivo nutricional que ya tiene, o lo que el
// entrenador ha tecleado encima de cualquiera de los dos.
type TargetMode = 'calculated' | 'goal' | 'manual';

// Sugerencias de dieta — el panel DERECHO al empezar una fase: el objetivo
// de REFERENCIA calculado con los últimos datos del cliente, alternable con el
// objetivo nutricional que el cliente ya tiene (editable: si el entrenador
// teclea encima, pasa a ser manual y el ranking se hace contra sus números),
// las restricciones y la sugerencia principal + CTA.
//
// Ya no hay "tipo de fase" ni "ajuste de kcal": lo que importa es con qué
// números se pauta, no de qué preset salieron. La fase empieza HOY; sus
// fechas se corrigen después desde Plan > Nutrición. La LISTA rankeada la pinta la pantalla que
// lo abre (diet-phase-picker: la biblioteca de dietas ordenada para este
// cliente). Estado compartido en DietSuggestionSessionService.
@Component({
  selector: 'app-diet-suggestion-drawer',
  templateUrl: './diet-suggestion-drawer.component.html',
  styleUrls: ['./diet-suggestion-drawer.component.scss'],
})
export class DietSuggestionDrawerComponent implements OnInit, OnDestroy {
  private readonly translate = inject(TranslateService);

  @ViewChild('enterSubmitTarget', { read: ElementRef }) public enterSubmitButton?: ElementRef<HTMLButtonElement>;
  @Input() public clientId!: string;
  @Input() public clientName = this.translate.instant('DIET_TEMPLATES.ESTE_CLIENTE');

  public state: ViewState = 'loading';
  // Barra de carga bajo la cabecera. Sube en cuanto se toca un filtro (no
  // cuando sale la petición, 350 ms de debounce después) y baja al terminar
  // la última: encadenar cambios la mantiene encendida.
  public loading = true;
  public missing: string[] = [];

  // --- Filtros ---
  public phaseName = this.translate.instant('DIET_TEMPLATES.NUEVA_FASE');
  // El objetivo con el que se va a pautar: arranca en el calculado, se puede
  // alternar con el objetivo actual del cliente y el entrenador puede teclear
  // encima de cualquiera (entonces `targetMode` = 'manual').
  public targetDraft: { kcal: number; protein: number; carbs: number; fat: number } | null = null;
  public targetMode: TargetMode = 'calculated';
  public readonly dietaryFlagOptions = DIETARY_FLAGS;
  public dietaryFlags = new Set<DietaryFlag>();

  // Macros por kg de peso — lo que viaja al backend cuando el entrenador toca
  // "Ajustar macros": proteína y grasa en g/kg (carbos = resto), igual que
  // la fórmula que aplica el backend por defecto (nutrition-target.js). Sin
  // tocar, no se mandan y manda la fórmula (ver onMacrosChange).
  public proteinPerKg: number | null = null;
  public fatPerKg: number | null = null;
  private userTouchedMacroRatio = false;

  // Origen de las dietas — combinables entre sí (mismo Set de siempre); el
  // chip "Todas" es solo un atajo para marcar las tres de golpe, no un
  // cuarto valor de origen.
  public readonly sourceOptions: { key: DietSource; label: string; icon: string }[] = [
    { key: 'general', label: this.translate.instant('DIET_TEMPLATES.ANADIDAS_POR_MI'), icon: 'person' },
    { key: 'client', label: this.translate.instant('DIET_TEMPLATES.DE_ESTE_CLIENTE'), icon: 'person-circle' },
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
  // La fase empieza el día en que se crea (docs/plan-semanas.md); las
  // fechas se editan después desde la ficha del cliente.
  public readonly startDate = localIsoDate();
  public applying = false;

  // Reflejo local del estado compartido (para el template).
  public selectedId: string | null = null;

  private readonly refetch$ = new Subject<void>();
  private readonly subs = new Subscription();
  // Petición de sugerencias en vuelo: al cambiar un filtro se cancela la
  // anterior, para que una respuesta lenta no pise a la nueva y la lista no
  // deje de coincidir con los chips marcados.
  private fetchSub: Subscription | null = null;
  private userTouchedFilters = false;
  private appliedClientDefaults = false;

  constructor(
    private modalController: ModalController,
    private suggestionApi: DietSuggestionApiService,
    private dietPhaseApi: DietPhaseApiService,
    private ionicUtil: IonicUtilService,
    private session: DietSuggestionSessionService
  ) {}

  public ngOnInit(): void {
    this.session.reset();
    this.subs.add(this.refetch$.pipe(debounceTime(350)).subscribe(() => this.fetch()));
    this.subs.add(this.session.selectedId$.subscribe((id) => (this.selectedId = id)));
    this.fetch();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.fetchSub?.unsubscribe();
  }

  // --- Filtros ---

  // Teclear encima del objetivo: el ranking pasa a hacerse contra estos
  // números y el objetivo queda marcado como manual.
  public onTargetEdited(): void {
    this.targetMode = 'manual';
    this.userTouchedFilters = true;
    this.queueRefetch();
  }

  // Alternar entre la referencia calculada con los datos del cliente y el
  // objetivo nutricional que ya tiene. También sirve para volver a uno de los
  // dos tras teclear encima.
  public selectTargetMode(mode: 'calculated' | 'goal'): void {
    const source = mode === 'goal' ? this.currentGoal : this.session.results?.calculated;
    if (!source || this.targetMode === mode) return;
    this.targetMode = mode;
    this.targetDraft = { kcal: source.kcal, protein: source.protein, carbs: source.carbs, fat: source.fat };
    this.queueRefetch();
  }

  public toggleFlag(flag: DietaryFlag): void {
    this.userTouchedFilters = true;
    if (this.dietaryFlags.has(flag)) this.dietaryFlags.delete(flag);
    else this.dietaryFlags.add(flag);
    this.queueRefetch();
  }

  public toggleSource(source: DietSource): void {
    this.sources = nextSources(
      this.sources,
      source,
      this.sourceOptions.map((o) => o.key)
    );
    this.queueRefetch();
  }

  public queueRefetch(): void {
    this.userTouchedFilters = true;
    this.loading = true;
    this.refetch$.next();
  }

  // "Ajustar macros" tocado: los gramos de proteína y grasa pasan a g/kg
  // sobre el MISMO peso que usa el backend (macroWeightKg), para que el
  // objetivo que vuelve traiga esos gramos. null = volver a la fórmula.
  public onMacrosChange(macros: MacroSet | null): void {
    const weight = this.macroWeightKg;
    if (!macros || !weight) {
      if (!this.userTouchedMacroRatio) return;
      this.userTouchedMacroRatio = false;
      this.proteinPerKg = null;
      this.fatPerKg = null;
    } else {
      this.userTouchedMacroRatio = true;
      this.proteinPerKg = Math.round((macros.protein / weight) * 100) / 100;
      this.fatPerKg = Math.round((macros.fat / weight) * 100) / 100;
    }
    this.queueRefetch();
  }

  public get macroWeightKg(): number | null {
    const res = this.session.results;
    return res?.macroWeightKg ?? res?.weightSource?.weightKg ?? null;
  }

  private fetch(): void {
    if (this.state !== 'ready') this.state = 'loading';
    this.session.setLoading(true);
    this.fetchSub?.unsubscribe();
    this.fetchSub = this.suggestionApi
      .suggest(this.clientId, {
        ...(this.targetMode !== 'calculated' && this.targetDraft?.kcal ? { target: this.targetDraft } : {}),
        dietaryFlags: [...this.dietaryFlags],
        sources: [...this.sources],
        ...(this.userTouchedMacroRatio && this.proteinPerKg ? { proteinPerKg: this.proteinPerKg } : {}),
        ...(this.userTouchedMacroRatio && this.fatPerKg ? { fatPerKg: this.fatPerKg } : {}),
      })
      .subscribe({
        next: (res) => {
          // Primera respuesta, sin que el entrenador haya tocado nada: el
          // objetivo arranca en el calculado y se pre-marcan las
          // restricciones que el cliente declaró en su cuestionario.
          if (!this.userTouchedFilters && !this.appliedClientDefaults) {
            this.appliedClientDefaults = true;
            const before = this.dietaryFlags.size;
            for (const f of res.clientDietaryFlags || []) this.dietaryFlags.add(f);
            if (this.dietaryFlags.size !== before) {
              this.session.setResults(res);
              this.targetDraft = this.targetDraft ?? { ...res.calculated };
              this.fetch();
              return;
            }
          }
          if (this.targetMode === 'calculated') this.targetDraft = { ...res.calculated };
          this.session.setResults(res);
          this.session.setLoading(false);
          this.loading = false;
          this.state = 'ready';
        },
        error: (err) => {
          this.session.setLoading(false);
          this.loading = false;
          if (err?.status === 422 && err?.error?.code === 'MISSING_BIOMETRICS') {
            this.missing = err.error.missing || [];
            this.state = 'missing-biometrics';
            return;
          }
          this.state = this.session.results ? 'ready' : 'error';
          this.ionicUtil.showErrorToast(
            err?.error?.message || this.translate.instant('DIET_TEMPLATES.NO_SE_PUDIERON_CARGAR_LAS_2'),
            this.translate.instant('COMMON.ERROR'),
            3500
          );
        },
      });
  }

  // --- Objetivo calculado / dieta elegida ---

  public get target(): { kcal: number; protein: number; carbs: number; fat: number } | null {
    return this.session.results?.target ?? null;
  }

  public get calculated(): { kcal: number; protein: number; carbs: number; fat: number } | null {
    return this.session.results?.calculated ?? null;
  }

  public get currentGoal(): DietSuggestionResponse['currentGoal'] {
    return this.session.results?.currentGoal ?? null;
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

  @ViewChild(MacroAdjustComponent) private macroAdjust?: MacroAdjustComponent;

  // Macros tocados que no cuadran con las kcal: ni se aplica ni se sale al
  // builder. Enseña el error y devuelve false.
  private macrosOk(): boolean {
    const macroError = this.macroAdjust?.validate();
    if (!macroError) return true;
    this.ionicUtil.showErrorToast(macroError, this.translate.instant('COMMON.ERROR'), 4500);
    return false;
  }

  public get canConfirm(): boolean {
    return !!this.chosen && !!(this.targetDraft?.kcal || this.target?.kcal) && !this.applying;
  }

  private phasePayload(): { phase: PhaseStartSettings } {
    const t = this.targetDraft || this.target!;
    return {
      phase: {
        name: this.phaseName.trim() || this.phaseName,
        // Con qué números se pauta la fase, y de dónde salen.
        target: {
          kcal: Math.round(t.kcal),
          protein: Math.round(t.protein),
          carbs: Math.round(t.carbs),
          fat: Math.round(t.fat),
          // El objetivo actual del cliente no lo calculó la fórmula para esta
          // fase: cuenta como fijado, igual que lo tecleado encima.
          source: this.targetMode === 'calculated' ? ('calculated' as const) : ('manual' as const),
        },
        // Solo si el entrenador los tocó: sin tocar, el backend aplica su
        // fórmula por defecto (misma que rellena estos campos) y así el
        // resumen de semana puede decir "fórmula por defecto".
        proteinPerKg: this.userTouchedMacroRatio && this.proteinPerKg ? Number(this.proteinPerKg) : null,
        fatPerKg: this.userTouchedMacroRatio && this.fatPerKg ? Number(this.fatPerKg) : null,
      },
    };
  }

  public confirm(): void {
    if (!this.canConfirm || !this.target || !this.chosen) return;
    if (!this.macrosOk()) return;
    this.applying = true;

    // La fase empieza hoy: si ya había una corriendo, el backend la cierra
    // ayer. Eso se avisa antes de pulsar, en el pie.
    this.dietPhaseApi
      .create(this.clientId, { templateId: this.chosen._id, startDate: this.startDate, ...this.phasePayload().phase })
      .subscribe({
        next: (phase) => {
          this.ionicUtil.showToast({
            message: this.translate.instant('DIET_TEMPLATES.FASE_APLICADA_DESDE_HOY', { phaseName: this.phaseName, clientName: this.clientName }),
            duration: 3000,
          });
          this.session.reset();
          void this.modalController.dismiss({ phase, phaseName: this.phaseName }, 'confirm');
        },
        error: (err) => {
          this.applying = false;
          this.ionicUtil.showErrorToast(
            err?.status === 409
              ? err?.error?.message || this.translate.instant('DIET_TEMPLATES.ESAS_FECHAS_SE_SOLAPAN_CON')
              : err?.error?.message || this.translate.instant('DIET_TEMPLATES.NO_SE_PUDO_APLICAR_LA'),
            this.translate.instant('COMMON.ERROR'),
            4000
          );
        },
      });
  }

  public createFromScratch(): void {
    if (!this.targetDraft || !this.macrosOk()) return;
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
    if (!this.targetDraft || !this.chosen || !this.macrosOk()) return;
    // Leer chosen/phasePayload ANTES de resetear la sesión — igual que
    // confirm() lee this.chosen._id antes de session.reset(): al revés
    // (como createFromScratch, que no necesita chosen), el reset deja
    // this.chosen a null y el dismiss de abajo revienta leyendo _id de null.
    const payload = { templateId: this.chosen._id, startDate: this.startDate, ...this.phasePayload() };
    this.session.reset();
    void this.modalController.dismiss(payload, 'edit-before-apply');
  }

  public dismiss(): void {
    this.session.reset();
    void this.modalController.dismiss(null, 'cancel');
  }
}
