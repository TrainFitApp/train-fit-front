import { Component, Input, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClientDetailApiService } from '../../pages/client-detail/services/client-detail-api.service';
import {
  CheckinResponseEntry,
  NutritionFoodCompliance,
  NutritionMacroTotals,
  NutritionTrackingDay,
} from '../../pages/client-detail/models/client-detail.model';
import { DietPhase, WeekNeedResponse } from '../../../../shared/models/diet-phase.model';
import { buildCheckinDisplay, CheckinDisplay } from '../../checkin-display.util';
import { DietPhaseApiService } from '../../../../shared/services/diet-phase-api.service';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import { localIsoDate } from 'src/app/core/utils/local-date.util';

type ViewState = 'loading' | 'ready' | 'error';

// Qué pasó en UNA semana de una fase de nutrición. Se abre desde los
// cuadraditos de la tarjeta de la fase (client-detail.page.html) como panel
// derecho.
//
// Es de solo lectura y no inventa datos: cruza por el rango de fechas de la
// semana tres cosas que ya existen —macros pautados vs consumidos
// (nutrition-tracking), cumplimiento alimento a alimento (nutrition-foods) y
// los check-ins que el cliente respondió dentro de ese rango.
@Component({
  selector: 'app-week-summary-panel',
  templateUrl: './week-summary-panel.component.html',
  styleUrls: ['./week-summary-panel.component.scss'],
})
export class WeekSummaryPanelComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  @Input() public clientId!: string;
  @Input() public phase!: DietPhase;
  @Input() public weekNumber = 1;
  @Input() public clientName = this.translate.instant('CLIENTS.ESTE_CLIENTE');
  // La semana natural (lunes a domingo, recortada al inicio y fin de la fase).
  @Input() public window!: { start: string; end: string };

  public state: ViewState = 'loading';

  public foods: NutritionFoodCompliance[] = [];
  public plannedAvg: NutritionMacroTotals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  public consumedAvg: NutritionMacroTotals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  public daysWithPlan = 0;
  // Cada check-in con sus datos ya agrupados. Se calcula UNA vez al llegar los
  // datos, no en la plantilla: una función que devuelve un array nuevo en cada
  // detección de cambios hace que *ngFor recree el DOM, eso despierta a los
  // observadores de Ionic, que disparan otra detección… y la pestaña se queda
  // colgada (pasó en cuanto hubo un check-in dentro de la semana). Mismo
  // motivo que trackByCheckinValueKey en client-detail.page.ts.
  public checkins: { entry: CheckinResponseEntry; display: CheckinDisplay }[] = [];
  // Cómo se calculó la necesidad de esta semana
  // (docs/plan-info-calculo-fase.md). null mientras carga o si falló.
  public weekNeed: WeekNeedResponse | null = null;
  public needState: 'loading' | 'ready' | 'error' = 'loading';

  constructor(
    private modalController: ModalController,
    private api: ClientDetailApiService,
    private dietPhaseApi: DietPhaseApiService
  ) {}

  public get from(): string {
    return this.window.start;
  }

  // Una semana en curso se mira hasta hoy (nunca el futuro).
  public get to(): string {
    return this.window.end > this.todayIso ? this.todayIso : this.window.end;
  }

  // Menús de la versión del contenido que regía esa semana.
  public get menusCount(): number {
    const content = [...this.phase.contents].reverse().find((c) => c.startDate <= this.window.start);
    return content?.menusCount || 0;
  }

  private get todayIso(): string {
    return localIsoDate();
  }

  public get isRunning(): boolean {
    return this.window.end >= this.todayIso;
  }

  public ngOnInit(): void {
    this.loadNeed();
    forkJoin({
      tracking: this.api
        .getNutritionTracking(this.clientId, this.from, this.to)
        .pipe(catchError(() => of(null))),
      foods: this.api
        .getNutritionFoods(this.clientId, this.from, this.to)
        .pipe(catchError(() => of(null))),
      // El histórico completo: es el endpoint que hay (no acepta rango) y es
      // el mismo que ya usa la pestaña de check-ins de la ficha.
      checkins: this.api.getCheckinResponses(this.clientId).pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ tracking, foods, checkins }) => {
        this.foods = foods?.items || [];
        this.applyTracking(tracking?.dailyTracking || []);
        this.checkins = this.checkinsInRange(checkins || []).map((entry) => ({
          entry,
          display: buildCheckinDisplay(entry, this.previousCheckin(checkins || [], entry)),
        }));
        this.state = 'ready';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Aparte del resto: si falla, la semana se sigue viendo y solo este
  // bloque dice que no cargó.
  private loadNeed(): void {
    this.dietPhaseApi.getWeekNeed(this.clientId, this.phase._id, this.weekNumber).subscribe({
      next: (need) => {
        this.weekNeed = need;
        this.needState = 'ready';
      },
      error: () => {
        this.needState = 'error';
      },
    });
  }

  // Media POR DÍA CON PLAN, no por día del rango: una semana con días sin nada
  // pautado (excepciones, huecos) tiene esos días a cero, y promediarlos
  // hundiría la cifra y haría parecer que se pautó menos de lo que se pautó.
  private applyTracking(days: NutritionTrackingDay[]): void {
    const conPlan = days.filter((d) => d.hasPlan);
    this.daysWithPlan = conPlan.length;
    if (!conPlan.length) return;

    const sumar = (pick: (d: NutritionTrackingDay) => NutritionMacroTotals): NutritionMacroTotals =>
      conPlan.reduce(
        (acc, day) => {
          const m = pick(day);
          return {
            kcal: acc.kcal + (m?.kcal || 0),
            protein: acc.protein + (m?.protein || 0),
            carbs: acc.carbs + (m?.carbs || 0),
            fat: acc.fat + (m?.fat || 0),
          };
        },
        { kcal: 0, protein: 0, carbs: 0, fat: 0 }
      );

    const media = (total: NutritionMacroTotals): NutritionMacroTotals => ({
      kcal: Math.round(total.kcal / conPlan.length),
      protein: Math.round(total.protein / conPlan.length),
      carbs: Math.round(total.carbs / conPlan.length),
      fat: Math.round(total.fat / conPlan.length),
    });

    this.plannedAvg = media(sumar((d) => d.planned));
    this.consumedAvg = media(sumar((d) => d.consumed));
  }

  private checkinsInRange(all: CheckinResponseEntry[]): CheckinResponseEntry[] {
    return (all || []).filter((r) => {
      const fecha = (r?.respondedAt || '').slice(0, 10);
      return !!fecha && fecha >= this.from && fecha <= this.to;
    });
  }

  // El check-in inmediatamente anterior, dentro o fuera de la semana: con él
  // se calculan los cambios de peso y medidas. El histórico no llega ordenado.
  private previousCheckin(all: CheckinResponseEntry[], entry: CheckinResponseEntry): CheckinResponseEntry | null {
    return (
      all
        .filter((r) => r.respondedAt < entry.respondedAt)
        .sort((a, b) => (a.respondedAt < b.respondedAt ? 1 : -1))[0] || null
    );
  }

  // % de cumplimiento de un alimento, para la barra de la fila.
  public compliance(food: NutritionFoodCompliance): number {
    if (!food.plannedDays) return 0;
    return Math.round((food.consumedDays / food.plannedDays) * 100);
  }

  // Diferencia consumido - pautado, con signo, para las kcal.
  public get kcalDelta(): number {
    return this.consumedAvg.kcal - this.plannedAvg.kcal;
  }

  // La app no registra LOCALE_ID: el DatePipe/DecimalPipe salen en inglés
  // ("1,911", "Sep"). Mismo formato es-ES que need-breakdown.
  public n(value: number): string {
    return value.toLocaleString(uiLocale(), { maximumFractionDigits: 0 });
  }

  public fmtDay(iso: string, withYear = false): string {
    return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString(uiLocale(), {
      day: 'numeric',
      month: 'short',
      ...(withYear ? { year: 'numeric' as const } : {}),
      timeZone: 'UTC',
    });
  }

  public trackByCheckinId(_index: number, row: { entry: CheckinResponseEntry }): string {
    return row.entry._id;
  }

  public trackByKey(_index: number, row: { key: string }): string {
    return row.key;
  }

  // "martes, 22 sept" en el idioma de la app: el DatePipe saldría en inglés.
  public fmtResponded(iso: string): string {
    return new Date(iso).toLocaleDateString(uiLocale(), { weekday: 'long', day: 'numeric', month: 'short' });
  }

  public dismiss(): void {
    void this.modalController.dismiss();
  }
}
