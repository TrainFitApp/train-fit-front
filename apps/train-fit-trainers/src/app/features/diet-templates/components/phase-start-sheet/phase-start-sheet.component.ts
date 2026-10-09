import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { DietPhaseApiService } from '../../../../shared/services/diet-phase-api.service';
import { DietPhase } from '../../../../shared/models/diet-phase.model';
import {
  PhaseStartVerdict,
  addIsoDays,
  firstStartDate,
  formatIsoDay,
  gapBefore,
  phaseStartVerdict,
} from '../../../../shared/utils/phase-start.util';
import { localIsoDate } from 'src/app/core/utils/local-date.util';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

export interface PhaseStartSheetProps {
  clientId: string;
  clientName: string;
  phaseName: string;
}

type ViewState = 'loading' | 'ready' | 'error';

// Desde qué día empieza una fase de dieta nueva: hoja inferior con el
// calendario de Plan › Nutrición del cliente (cumplimiento, fases, semanas,
// suplementos) en el que se pulsa el día. Solo deja elegir días en los que el
// backend acepta la fase (phase-start.util.ts): libres, u hoy para sustituir
// la que rige. Se abre justo antes de crear la fase, desde el cajón de
// sugerencias y desde el constructor "para este cliente"; devuelve el día
// elegido o null si se cierra sin elegir.
@Component({
  selector: 'app-phase-start-sheet',
  templateUrl: './phase-start-sheet.component.html',
  styleUrls: ['./phase-start-sheet.component.scss'],
})
export class PhaseStartSheetComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly modalController = inject(ModalController);
  private readonly dietPhaseApi = inject(DietPhaseApiService);

  @Input() public clientId = '';
  @Input() public clientName = '';
  @Input() public phaseName = '';

  public state: ViewState = 'loading';
  public readonly today = localIsoDate();
  // null mientras carga o si no queda ningún día en el que pueda empezar.
  public startDate: string | null = null;
  private phases: DietPhase[] = [];

  // Abre la hoja y espera al día elegido (null = cerrada sin elegir). Espera
  // a que la hoja haya salido del todo (onDidDismiss): quien la abre suele
  // cerrar después su propio modal con modalController.dismiss(), que cierra
  // el de ARRIBA, y con la hoja aún saliendo se cerraría ella otra vez.
  public static async open(modalController: ModalController, props: PhaseStartSheetProps): Promise<string | null> {
    const modal = await modalController.create({
      component: PhaseStartSheetComponent,
      componentProps: { ...props },
      cssClass: 'tf-phase-start-sheet',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<string>();
    return role === 'confirm' && data ? data : null;
  }

  public ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.dietPhaseApi.list(this.clientId).subscribe({
      next: (phases) => {
        this.phases = phases || [];
        // Se propone hoy si se puede; si no, el primer día libre.
        this.startDate = firstStartDate(this.phases, this.today);
        this.state = 'ready';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // El calendario solo emite días en los que la fase puede empezar.
  public pick(date: string): void {
    this.startDate = date;
  }

  private get verdict(): PhaseStartVerdict<DietPhase> | null {
    return this.startDate ? phaseStartVerdict(this.startDate, this.phases, this.today) : null;
  }

  // "«Volumen» empieza hoy y queda abierta…" / "…el lunes, 13 de octubre…".
  public get startsLine(): string {
    if (!this.startDate) return '';
    const when =
      this.startDate === this.today
        ? this.translate.instant('DIET_TEMPLATES.START_SHEET_WHEN_TODAY')
        : this.translate.instant('DIET_TEMPLATES.START_SHEET_WHEN_ON', { date: this.longDate(this.startDate) });
    return this.translate.instant('DIET_TEMPLATES.START_SHEET_STARTS', { name: this.phaseName, when });
  }

  // Qué le pasa a la fase que rige ese día (solo hoy puede sustituirse).
  public get replacesLine(): string {
    const verdict = this.verdict;
    if (verdict?.kind !== 'replaces' || !this.startDate) return '';
    const { name, startDate } = verdict.phase;
    return startDate === this.startDate
      ? this.translate.instant('DIET_TEMPLATES.START_SHEET_REPLACES_SAME_DAY', { name })
      : this.translate.instant('DIET_TEMPLATES.START_SHEET_REPLACES', { name, end: this.longDate(addIsoDays(this.startDate, -1)) });
  }

  // Días sin plan que deja empezar más tarde de lo que acaba la anterior.
  // Solo si alguno queda por delante: un hueco ya pasado no cambia nada.
  public get gapLine(): string {
    if (this.verdict?.kind !== 'free' || !this.startDate) return '';
    const gap = gapBefore(this.startDate, this.phases);
    if (!gap || gap.to < this.today) return '';
    return gap.from === gap.to
      ? this.translate.instant('DIET_TEMPLATES.START_SHEET_GAP_DAY', { date: this.shortDate(gap.from) })
      : this.translate.instant('DIET_TEMPLATES.START_SHEET_GAP', { from: this.shortDate(gap.from), to: this.shortDate(gap.to) });
  }

  // Sin ningún día posible: hay una fase programada más adelante (impide hoy)
  // y la cadena acaba en una abierta (ocupa lo que viene). Se nombra la
  // abierta, que es la que hay que cerrar para liberar días.
  public get noDayLine(): string {
    if (this.state !== 'ready' || this.startDate) return '';
    const open = this.phases.find((phase) => phase.endDate === null);
    const verdict = phaseStartVerdict(this.today, this.phases, this.today);
    const name = open?.name ?? (verdict.kind === 'blocked' ? verdict.phase.name : '');
    return this.translate.instant('DIET_TEMPLATES.START_SHEET_NO_DAY', { name });
  }

  public get confirmLabel(): string {
    if (!this.startDate) return this.translate.instant('DIET_TEMPLATES.START_SHEET_CONFIRM');
    return this.startDate === this.today
      ? this.translate.instant('DIET_TEMPLATES.START_SHEET_CONFIRM_TODAY')
      : this.translate.instant('DIET_TEMPLATES.START_SHEET_CONFIRM_ON', { date: this.shortDate(this.startDate) });
  }

  public confirm(): void {
    if (!this.startDate) return;
    void this.modalController.dismiss(this.startDate, 'confirm');
  }

  public cancel(): void {
    void this.modalController.dismiss(null, 'cancel');
  }

  private longDate(iso: string): string {
    return formatIsoDay(iso, uiLocale(), { weekday: 'long', day: 'numeric', month: 'long' });
  }

  private shortDate(iso: string): string {
    return formatIsoDay(iso, uiLocale(), { day: 'numeric', month: 'short' });
  }
}
