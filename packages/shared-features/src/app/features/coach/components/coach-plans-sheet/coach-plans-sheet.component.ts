import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import {
  CoachNutritionPlanEntry,
  CoachPlans,
  CoachPlanTimeline,
  CoachTrainingPlanEntry,
} from '../../models/coach-plans.model';
import { civilDayLabel } from '../../models/coach-sheets-view';
import { CoachDashboardApiService } from '../../services/coach-dashboard-api.service';

type PlanKind = 'training' | 'nutrition';
type PlanEntry = CoachTrainingPlanEntry | CoachNutritionPlanEntry;

// Coach > "Tu plan actual": hoja con los planes del cliente, de rutina y de
// dieta: el de hoy, los programados y los anteriores (GET /coach/plans).
// Solo lectura: lo pautado lo cambia su profesional. Abrir con
// COACH_SHEET_OPTIONS.
@Component({
  selector: 'app-coach-plans-sheet',
  templateUrl: './coach-plans-sheet.component.html',
  styleUrls: ['./coach-plans-sheet.component.scss'],
})
export class CoachPlansSheetComponent implements OnInit {
  public state: 'loading' | 'error' | 'loaded' = 'loading';
  public plans: CoachPlans | null = null;
  public kind: PlanKind = 'training';

  constructor(
    private modalController: ModalController,
    private coachDashboardApi: CoachDashboardApiService,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.coachDashboardApi.getPlans().subscribe({
      next: (plans) => {
        this.plans = plans;
        // Sin nada de rutina pero con dieta, abre directamente en dieta.
        if (this.isEmpty(plans.training) && !this.isEmpty(plans.nutrition)) this.kind = 'nutrition';
        this.state = 'loaded';
      },
      error: () => (this.state = 'error'),
    });
  }

  public get timeline(): CoachPlanTimeline<PlanEntry> | null {
    return this.plans ? this.plans[this.kind] : null;
  }

  public select(kind: PlanKind): void {
    this.kind = kind;
  }

  public close(): void {
    void this.modalController.dismiss();
  }

  private isEmpty(timeline: CoachPlanTimeline<PlanEntry>): boolean {
    return !timeline.current && !timeline.upcoming.length && !timeline.past.length;
  }

  private day(value: string | null): string {
    return civilDayLabel(value, this.plans?.today);
  }

  // "Desde el 29 sept · hasta el 18 oct", "Empieza el 20 oct", "Asignada el 3 oct".
  public currentDates(entry: PlanEntry): string {
    if (entry.status === 'scheduled') return this.translate.instant('COACH_SHEETS.STARTS_ON', { date: this.day(entry.startDate) });
    if (entry.status === 'assigned') return this.translate.instant('COACH_SHEETS.ASSIGNED_ON', { date: this.day(entry.startDate) });
    const since = this.translate.instant('COACH_SHEETS.SINCE', { date: this.day(entry.startDate) });
    return entry.endDate ? `${since} · ${this.translate.instant('COACH_SHEETS.UNTIL', { date: this.day(entry.endDate) })}` : since;
  }

  // "1 ago – 28 sept" o, sin fin, "Desde el 20 oct".
  public rowDates(entry: PlanEntry): string {
    if (!entry.endDate) return this.translate.instant('COACH_SHEETS.SINCE', { date: this.day(entry.startDate) });
    return `${this.day(entry.startDate)} – ${this.day(entry.endDate)}`;
  }

  public kcalLabel(entry: PlanEntry): string | null {
    const kcal = (entry as CoachNutritionPlanEntry).kcal;
    return typeof kcal === 'number' ? `${kcal.toLocaleString(uiLocale())} kcal` : null;
  }

  public trainerLabel(entry: PlanEntry): string {
    return entry.trainerName || this.translate.instant('ONBOARDING.A_PROFESSIONAL');
  }

  public trackByEntry(index: number, entry: PlanEntry): string {
    return entry.id || `${entry.startDate}-${index}`;
  }
}
