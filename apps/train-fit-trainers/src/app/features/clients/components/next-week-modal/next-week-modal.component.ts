import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SubmitOnEnterDirective } from 'src/app/shared/directives/submit-on-enter.directive';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DietSuggestionApiService } from '../../../diet-templates/services/diet-suggestion-api.service';
import { DailyDeviation, MacroSet, PhaseWeeksResponse } from '../../../diet-templates/models/diet-suggestion.model';
import { NeedBreakdownComponent } from '../need-breakdown/need-breakdown.component';
import { KCAL_PER_G, MacroAdjustComponent, MacroKey } from '../../../../shared/components/macro-adjust/macro-adjust.component';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

const MACRO_KEYS: MacroKey[] = ['protein', 'carbs', 'fat'];

// La siguiente SEMANA de la fase (docs/plan-semanas.md): qué dice la
// sugerencia (peso + adherencia de la semana en curso, con los desvíos día
// a día) y con qué kcal se quiere preparar. No guarda nada: "Preparar" lleva
// al builder con el contenido ya escalado, y es el builder quien persiste (o
// no, si no cambia nada). "Descartar" borra una semana ya preparada para
// volver a heredar.
//
// "Ajustar macros" (app-macro-adjust, compartido con "Empezar fase"): sin
// tocarlo, los macros siguen al escalado proporcional de las kcal. Si se
// toca, viajan al builder como objetivo de la semana (referencia con deltas
// por fila) — el escalado de alimentos sigue siendo por kcal.
@Component({
  selector: 'app-next-week-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, NeedBreakdownComponent, MacroAdjustComponent, SubmitOnEnterDirective, TranslateModule],
  templateUrl: './next-week-modal.component.html',
  styleUrls: ['./next-week-modal.component.scss'],
})
export class NextWeekModalComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  @Input() public clientId!: string;
  @Input() public phaseId!: string;
  @Input() public clientName = this.translate.instant('CLIENTS.ESTE_CLIENTE');
  @Input() public weeks!: PhaseWeeksResponse;

  public targetKcal = 0;
  public discarding = false;
  public showDeviations = false;
  public showNeed = false;

  // --- Ajustar macros ---
  // Reparto de lo pautado hoy escalado a las kcal elegidas (lo que hará el
  // builder con los alimentos). Se recalcula al cambiar las kcal, no en un
  // getter: un objeto nuevo en cada ciclo de detección dispararía el
  // ngOnChanges del componente sin parar.
  public proportionalMacros: MacroSet = { protein: 0, carbs: 0, fat: 0 };
  // El reparto tocado a mano (viaja al builder); null = proporcional.
  public adjustedMacros: MacroSet | null = null;
  @ViewChild(MacroAdjustComponent) private macroAdjust?: MacroAdjustComponent;

  constructor(
    private modalController: ModalController,
    private api: DietSuggestionApiService,
    private ionicUtil: IonicUtilService
  ) {}

  public ngOnInit(): void {
    const next = this.next;
    this.targetKcal =
      next?.override?.profile.kcal ??
      (next?.suggestion?.hasData ? next.suggestion.nextKcal : next?.inherits?.profile.kcal ?? 0);
    this.onKcalChange();
  }

  public get next(): NonNullable<PhaseWeeksResponse['next']> {
    return this.weeks.next as NonNullable<PhaseWeeksResponse['next']>;
  }

  public get suggestion(): NonNullable<PhaseWeeksResponse['next']>['suggestion'] {
    return this.next.suggestion;
  }

  public get needNow(): NonNullable<PhaseWeeksResponse['next']>['needNow'] {
    return this.next.needNow;
  }

  // Peso real del cliente para los g/kg (el mismo que enseña la referencia).
  public get weightKg(): number | null {
    return this.needNow?.inputs?.weightKg ?? null;
  }

  public get alreadyPrepared(): boolean {
    return !!this.next.override;
  }

  // Contra qué se compara el cambio: lo que rige en la semana en curso.
  public get base(): MacroSet & { kcal: number } {
    return this.weeks.current?.override.profile || { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  }

  public get baseKcal(): number {
    return this.base.kcal;
  }

  // Las kcal de una dieta no son la suma Atwater de sus macros (fibra,
  // alcohol, redondeos del catálogo): en lo pautado hoy, macros y kcal
  // guardan una proporción, y el reparto se mueve dentro de ESA parte para
  // no inventar kcal de macro que la dieta no tiene.
  public get macroRatio(): number {
    const baseMacroKcal = MACRO_KEYS.reduce((sum, k) => sum + (this.base[k] || 0) * KCAL_PER_G[k], 0);
    return this.baseKcal > 0 && baseMacroKcal > 0 ? baseMacroKcal / this.baseKcal : 1;
  }

  public get kcalDelta(): number {
    return Math.round(this.targetKcal - this.baseKcal);
  }

  // Cambio en % respecto a lo pautado hoy (null sin base).
  public get kcalDeltaPct(): number | null {
    return this.pctChange(this.targetKcal, this.baseKcal);
  }

  public get periodLabel(): string {
    return this.next.end
      ? this.translate.instant('CLIENTS.DEL_AL', { p0: this.fmt(this.next.start), p1: this.fmt(this.next.end) })
      : this.translate.instant('CLIENTS.DESDE_EL_2', { p0: this.fmt(this.next.start) });
  }

  public get deviations(): DailyDeviation[] {
    return this.suggestion?.deviations || [];
  }

  public deviationLine(d: DailyDeviation): string {
    if (!d.hasPlan) return this.translate.instant('CLIENTS.SIN_NADA_PAUTADO_ESE_DIA');
    const parts: string[] = [];
    if (d.unchecked.length) parts.push(this.translate.instant('CLIENTS.SIN_MARCAR', { p0: d.unchecked.join(', ') }));
    if (d.unplanned.length) {
      parts.push(this.translate.instant('CLIENTS.FUERA_DE_PAUTA', { p0: d.unplanned.map((u) => `${u.name} ${u.quantity} g`).join(', ') }));
    }
    return parts.join(' · ');
  }

  public deltaLabel(value: number): string {
    return (value > 0 ? '+' : '') + Math.round(value);
  }

  public pctLabel(value: number | null): string {
    if (value === null) return '';
    const rounded = Math.round(value * 10) / 10;
    return `${rounded > 0 ? '+' : ''}${rounded.toLocaleString(uiLocale(), { maximumFractionDigits: 1 })} %`;
  }

  private pctChange(now: number, before: number): number | null {
    if (!(before > 0)) return null;
    return ((now - before) / before) * 100;
  }

  // ---------- kcal ----------

  public onKcalChange(): void {
    const factor = this.baseKcal > 0 ? this.targetKcal / this.baseKcal : 1;
    this.proportionalMacros = {
      protein: (this.base.protein || 0) * factor,
      carbs: (this.base.carbs || 0) * factor,
      fat: (this.base.fat || 0) * factor,
    };
  }

  // ---------- acciones ----------

  public prepare(): void {
    if (!(this.targetKcal > 0)) return;
    // Macros tocados que no cuadran con las kcal: no se prepara.
    const macroError = this.macroAdjust?.validate();
    if (macroError) {
      this.ionicUtil.showErrorToast(macroError, this.translate.instant('COMMON.ERROR'), 4500);
      return;
    }
    void this.modalController.dismiss(
      {
        kcal: Math.round(this.targetKcal),
        macros: this.adjustedMacros,
      },
      'prepare'
    );
  }

  public discard(): void {
    if (this.discarding) return;
    this.discarding = true;
    this.api.discardNextWeek(this.clientId, this.phaseId).subscribe({
      next: () => {
        this.ionicUtil.showToast({
          message: this.translate.instant('CLIENTS.SEMANA_DESCARTADA_REPETIRA_LO_ANTERIOR', { number: this.next.number }),
          duration: 2500,
        });
        void this.modalController.dismiss(null, 'discarded');
      },
      error: (err) => {
        this.discarding = false;
        this.ionicUtil.showErrorToast(err?.error?.message || this.translate.instant('CLIENTS.NO_SE_PUDO_DESCARTAR_LA'), this.translate.instant('COMMON.ERROR'), 3500);
      },
    });
  }

  public dismiss(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  public fmt(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString(uiLocale(), { day: 'numeric', month: 'short', timeZone: 'UTC' });
  }
}
