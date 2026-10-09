import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { money } from '../../models/coach-notification-view';
import {
  ChargeState,
  chargeState,
  civilDayLabel,
  feeFrequency,
  initials,
  instantDayLabel,
  isPartial,
  isPartlyCancelled,
  scopeIcon,
  scopeLabelKey,
} from '../../models/coach-sheets-view';
import { ClientCharge, ProfessionalPayments } from '../../models/professional-payments.model';
import { HistoryEntry, ProfessionalScope, ProfessionalSummary } from '../../models/professional-relation.model';
import { ProfessionalsApiService } from '../../services/professionals-api.service';

interface GroupedHistoryEntry {
  key: string;
  entries: HistoryEntry[];
}

interface PaymentsSlot {
  state: 'loading' | 'error' | 'unavailable' | 'loaded';
  data: ProfessionalPayments | null;
}

const CHARGE_STATE_KEYS: Record<ChargeState, string> = {
  paid: 'COACH_SHEETS.CHARGE_PAID',
  cancelled: 'COACH_SHEETS.CHARGE_CANCELLED',
  overdue: 'COACH_SHEETS.CHARGE_OVERDUE',
  due_today: 'COACH_SHEETS.CHARGE_DUE_TODAY',
  upcoming: 'COACH_SHEETS.CHARGE_PENDING',
};

// Coach > "Tus profesionales": hoja con los profesionales en curso y los
// anteriores. Cada uno abre su ficha: datos (email, desde cuándo, qué
// lleva), lo que le cobra (cuota, cobros y pagos, solo lectura: lo apunta el
// profesional y se paga fuera de la app) y terminar la relación por ámbito.
// Con un solo profesional se abre directamente su ficha. Al cerrarse
// devuelve { changed: true } si se desvinculó de algo, para que Coach
// recargue. Abrir con COACH_SHEET_OPTIONS.
@Component({
  selector: 'app-coach-professionals-sheet',
  templateUrl: './coach-professionals-sheet.component.html',
  styleUrls: ['./coach-professionals-sheet.component.scss'],
})
export class CoachProfessionalsSheetComponent implements OnInit {
  @Input() public professionals: ProfessionalSummary[] = [];
  @Input() public history: HistoryEntry[] = [];
  @ViewChild('sheetTitle') private sheetTitle?: ElementRef<HTMLElement>;
  @ViewChild('proName') private proName?: ElementRef<HTMLElement>;

  public selected: ProfessionalSummary | null = null;
  public groupedHistory: GroupedHistoryEntry[] = [];
  public expandedChargeId: string | null = null;
  public unlinkingScope: ProfessionalScope | null = null;
  private readonly payments = new Map<string, PaymentsSlot>();
  private changed = false;

  constructor(
    private modalController: ModalController,
    private professionalsApi: ProfessionalsApiService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.groupedHistory = this.groupHistory(this.history);
    if (this.professionals.length === 1) this.open(this.professionals[0], false);
  }

  public close(): void {
    void this.modalController.dismiss({ changed: this.changed });
  }

  public back(): void {
    this.selected = null;
    this.expandedChargeId = null;
    this.focusTitle();
  }

  // `focus`: al cambiar de vista el botón pulsado desaparece; sin mover el
  // foco al título, el teclado y el lector de pantalla se quedan en el body.
  public open(professional: ProfessionalSummary, focus = true): void {
    this.selected = professional;
    this.expandedChargeId = null;
    const trainerId = professional.user?._id;
    if (trainerId && this.payments.get(trainerId)?.state !== 'loaded') this.loadPayments(trainerId);
    if (focus) this.focusTitle();
  }

  private focusTitle(): void {
    // En la ficha, al nombre del profesional (la cabecera dice siempre
    // "Tus profesionales"); en la lista, al título.
    setTimeout(() => (this.selected ? this.proName : this.sheetTitle)?.nativeElement.focus());
  }

  // --- Cobros ---

  public paymentsOf(professional: ProfessionalSummary): PaymentsSlot | null {
    return professional.user ? this.payments.get(professional.user._id) || null : null;
  }

  public loadPayments(trainerId: string): void {
    this.payments.set(trainerId, { state: 'loading', data: null });
    this.professionalsApi.getPayments(trainerId).subscribe({
      next: (data) => this.payments.set(trainerId, { state: 'loaded', data }),
      // 503: el módulo de cobros no está disponible ahora mismo.
      error: (err) => this.payments.set(trainerId, { state: err?.status === 503 ? 'unavailable' : 'error', data: null }),
    });
  }

  public toggleCharge(charge: ClientCharge): void {
    if (!charge.payments.length) return;
    this.expandedChargeId = this.expandedChargeId === charge.id ? null : charge.id;
  }

  public cents(value: number, currency = 'EUR'): string {
    return money((value || 0) / 100, currency);
  }

  public day(value: string | null, data: ProfessionalPayments): string {
    return civilDayLabel(value, data.today);
  }

  public chargeState(charge: ClientCharge): ChargeState {
    return chargeState(charge);
  }

  public chargeStateKey(charge: ClientCharge): string {
    return CHARGE_STATE_KEYS[chargeState(charge)];
  }

  public isPartial(charge: ClientCharge): boolean {
    return isPartial(charge);
  }

  public isPartlyCancelled(charge: ClientCharge): boolean {
    return isPartlyCancelled(charge);
  }

  public chargeConcept(charge: ClientCharge): string {
    if (charge.concept) return charge.concept;
    return this.translate.instant(charge.origin === 'recurring' ? 'COACH_SHEETS.CHARGE_FEE' : 'COACH_SHEETS.CHARGE_ONE_OFF');
  }

  // "Vence el 5 nov" / "Venció el 5 oct" / "Vence hoy".
  public chargeDue(charge: ClientCharge, data: ProfessionalPayments): string {
    if (charge.dueDay === data.today) return this.translate.instant('COACH_SHEETS.CHARGE_DUE_TODAY');
    const key = charge.dueDay < data.today ? 'COACH_SHEETS.DUE_PAST' : 'COACH_SHEETS.DUE_FUTURE';
    return this.translate.instant(key, { date: this.day(charge.dueDay, data) });
  }

  public feeLabel(data: ProfessionalPayments): string {
    if (!data.plan) return '';
    const frequency = feeFrequency(data.plan);
    return `${this.cents(data.plan.amountCents, data.plan.currency)} ${this.translate.instant(frequency.key, frequency.params)}`;
  }

  public trackByCharge(_index: number, charge: ClientCharge): string {
    return charge.id;
  }

  // --- Datos ---

  public name(professional: ProfessionalSummary): string {
    if (!professional.user) return this.translate.instant('COACH.PROFESSIONAL');
    return `${professional.user.name} ${professional.user.lastname}`.trim();
  }

  public sinceLabel(professional: ProfessionalSummary): string {
    return instantDayLabel(professional.since);
  }

  public scopesLabel(scopes: ProfessionalScope[]): string {
    return scopes.map((scope) => this.translate.instant(scopeLabelKey(scope))).join(this.translate.instant('COACH.AND'));
  }

  public initials(name: string): string {
    return initials(name);
  }

  public scopeLabel(scope: ProfessionalScope): string {
    return this.translate.instant(scopeLabelKey(scope));
  }

  public scopeIcon(scope: ProfessionalScope): string {
    return scopeIcon(scope);
  }

  public trackByProfessional(index: number, professional: ProfessionalSummary): string {
    return professional.user?._id || String(index);
  }

  // --- Historial ---

  // HistoryEntry no trae trainerId: el email es el identificador estable;
  // sin profesional (cuenta borrada) cada entrada va en su propio grupo.
  private groupHistory(history: HistoryEntry[]): GroupedHistoryEntry[] {
    const groups = new Map<string, GroupedHistoryEntry>();
    for (const entry of history || []) {
      const key = entry.trainer?.email || entry._id;
      if (!groups.has(key)) groups.set(key, { key, entries: [] });
      groups.get(key)!.entries.push(entry);
    }
    return [...groups.values()];
  }

  public historyName(entry: HistoryEntry): string {
    if (!entry.trainer) return this.translate.instant('ONBOARDING.A_PROFESSIONAL');
    return `${entry.trainer.name} ${entry.trainer.lastname}`.trim();
  }

  public historyEndedLabel(entry: HistoryEntry): string {
    if (entry.status === 'declined') return this.translate.instant('COACH.HISTORY_DECLINED');
    if (entry.revokedBy === 'client') return this.translate.instant('COACH.HISTORY_ENDED_BY_YOU');
    if (entry.revokedBy === 'trainer') return this.translate.instant('COACH.HISTORY_ENDED_BY_COACH');
    return this.translate.instant('COACH.HISTORY_ENDED');
  }

  public trackByHistoryGroup(_index: number, group: GroupedHistoryEntry): string {
    return group.key;
  }

  // --- Terminar la relación (por ámbito) ---

  public async confirmUnlink(professional: ProfessionalSummary, scope: ProfessionalScope): Promise<void> {
    await this.ionicUtilService.showAlert({
      header: this.translate.instant('COACH.UNLINK'),
      message: this.translate.instant('COACH.UNLINK_MSG', {
        name: this.name(professional),
        scope: this.scopeLabel(scope).toLowerCase(),
      }),
      buttons: [
        { text: this.translate.instant('COMMON.GO_BACK'), role: 'cancel' },
        {
          text: this.translate.instant('COACH.UNLINK'),
          cssClass: 'alert-button-danger',
          handler: () => this.unlink(professional, scope),
        },
      ],
    });
  }

  private unlink(professional: ProfessionalSummary, scope: ProfessionalScope): void {
    this.unlinkingScope = scope;
    this.professionalsApi
      .unlinkProfessional(scope)
      .pipe(finalize(() => (this.unlinkingScope = null)))
      .subscribe({
        next: () => {
          this.changed = true;
          this.ionicUtilService.showToast({
            message: this.translate.instant('COACH_SHEETS.UNLINKED', {
              name: this.name(professional),
              scope: this.scopeLabel(scope).toLowerCase(),
            }),
            duration: 3000,
          });
          this.refresh();
        },
        error: () => {
          this.ionicUtilService.showErrorToast(this.translate.instant('COACH.UNLINK_ERROR'), this.translate.instant('COMMON.ERROR'), 3000);
        },
      });
  }

  // Tras desvincularse: listas al día. Si ya no queda nadie, se cierra y
  // Coach decide (puede que la pestaña desaparezca).
  private refresh(): void {
    forkJoin({
      professionals: this.professionalsApi.getActiveProfessionals(),
      history: this.professionalsApi.getHistory(),
    }).subscribe({
      next: ({ professionals, history }) => {
        this.professionals = professionals || [];
        this.groupedHistory = this.groupHistory(history || []);
        if (!this.professionals.length) {
          this.close();
          return;
        }
        const selectedId = this.selected?.user?._id;
        this.selected = this.professionals.find((p) => p.user?._id === selectedId) || null;
        // Ya no trabaja con él en nada: vuelve a la lista.
        if (!this.selected) this.focusTitle();
      },
      error: () => this.close(),
    });
  }
}
