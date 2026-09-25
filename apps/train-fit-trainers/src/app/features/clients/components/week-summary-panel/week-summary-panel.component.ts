import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClientDetailApiService } from '../../pages/client-detail/services/client-detail-api.service';
import {
  CheckinResponseEntry,
  NutritionFoodCompliance,
  NutritionMacroTotals,
  NutritionTrackingDay,
} from '../../pages/client-detail/models/client-detail.model';
import { PlanAssignment } from '../../../../shared/models/plan-assignment.model';
import { checkinFieldLabel, checkinValueLabel } from '../../checkin-labels.util';
import { CustomCheckinQuestion } from '../../../checkin-templates/models/checkin-template.model';
import { DietSuggestionApiService } from '../../../diet-templates/services/diet-suggestion-api.service';
import { WeekNeedResponse } from '../../../diet-templates/models/diet-suggestion.model';
import { NeedBreakdownComponent } from '../need-breakdown/need-breakdown.component';

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
  standalone: true,
  imports: [CommonModule, IonicModule, NeedBreakdownComponent],
  templateUrl: './week-summary-panel.component.html',
  styleUrls: ['./week-summary-panel.component.scss'],
})
export class WeekSummaryPanelComponent implements OnInit {
  @Input() public clientId!: string;
  @Input() public assignment!: PlanAssignment;
  @Input() public weekNumber = 1;
  @Input() public clientName = 'este cliente';
  // La ventana de la semana (la marcan los check-ins, ver
  // week-window.js), que no coincide con el rango del doc persistido —
  // un contenido puede cubrir varias semanas. `end` null = sigue abierta.
  @Input() public window: { start: string; end: string | null } | null = null;

  public state: ViewState = 'loading';

  public foods: NutritionFoodCompliance[] = [];
  public plannedAvg: NutritionMacroTotals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  public consumedAvg: NutritionMacroTotals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  public daysWithPlan = 0;
  // Cada check-in con sus valores ya desplegados. Se calcula UNA vez al
  // llegar los datos, no en la plantilla: una función que devuelve un array
  // nuevo en cada detección de cambios hace que *ngFor recree el DOM, eso
  // despierta a los observadores de Ionic, que disparan otra detección… y la
  // pestaña se queda colgada (pasó en cuanto hubo un check-in dentro del
  // semana). Mismo motivo que trackByCheckinValueKey en client-detail.page.ts.
  public checkins: { entry: CheckinResponseEntry; values: { key: string; value: number | string | boolean }[] }[] = [];
  // Preguntas propias que traen las respuestas cargadas: con ellas se
  // nombran las claves "custom:<id>" sin pedir nada más.
  private checkinQuestions: CustomCheckinQuestion[] = [];
  // Cómo se calculó la necesidad de esta semana
  // (docs/plan-info-calculo-fase.md). null mientras carga o si falló.
  public weekNeed: WeekNeedResponse | null = null;
  public needState: 'loading' | 'ready' | 'error' = 'loading';

  constructor(
    private modalController: ModalController,
    private api: ClientDetailApiService,
    private suggestionApi: DietSuggestionApiService
  ) {}

  // Una semana en curso no tiene fin: se mira hasta hoy. El backend vuelve a
  // acotarlo por su cuenta (nunca el futuro), esto es solo para no pedir un
  // rango absurdo.
  public get from(): string {
    return this.window?.start || this.assignment?.startDate || this.todayIso;
  }

  public get to(): string {
    const fin = this.window?.end || this.assignment?.endDate || this.todayIso;
    return fin > this.todayIso ? this.todayIso : fin;
  }

  private get todayIso(): string {
    return new Date().toISOString().slice(0, 10);
  }

  public get isRunning(): boolean {
    if (this.window) return !this.window.end || this.window.end >= this.todayIso;
    return !this.assignment?.endDate;
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
        const inRange = this.checkinsInRange(checkins || []);
        this.checkinQuestions = [
          ...new Map(
            inRange.flatMap((entry) => (entry.customQuestions || []).map((q) => [String(q._id), q] as const))
          ).values(),
        ];
        this.checkins = inRange.map((entry) => ({
          entry,
          values: Object.entries(entry?.values || {}).map(([key, value]) => ({ key, value })),
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
    const phaseId = this.assignment?.phaseId;
    if (!phaseId) {
      this.needState = 'error';
      return;
    }
    this.suggestionApi.getWeekNeed(this.clientId, phaseId, this.weekNumber).subscribe({
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

  // % de cumplimiento de un alimento, para la barra de la fila.
  public compliance(food: NutritionFoodCompliance): number {
    if (!food.plannedDays) return 0;
    return Math.round((food.consumedDays / food.plannedDays) * 100);
  }

  // Diferencia consumido - pautado, con signo, para las kcal.
  public get kcalDelta(): number {
    return this.consumedAvg.kcal - this.plannedAvg.kcal;
  }

  public trackByCheckinId(_index: number, row: { entry: CheckinResponseEntry }): string {
    return row.entry._id;
  }

  public trackByKey(_index: number, row: { key: string }): string {
    return row.key;
  }

  public fieldLabel(key: string): string {
    return checkinFieldLabel(key, this.checkinQuestions);
  }

  public valueLabel(value: number | string | boolean): string {
    return checkinValueLabel(value);
  }

  public dismiss(): void {
    void this.modalController.dismiss();
  }
}
