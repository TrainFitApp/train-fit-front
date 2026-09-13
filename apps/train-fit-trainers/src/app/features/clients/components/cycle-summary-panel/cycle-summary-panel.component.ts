import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClientDetailApiService } from '../../pages/client-detail/services/client-detail-api.service';
import {
  CheckinConfig,
  CheckinResponseEntry,
  NutritionFoodCompliance,
  NutritionMacroTotals,
  NutritionTrackingDay,
} from '../../pages/client-detail/models/client-detail.model';
import { PlanAssignment } from '../../../../shared/models/plan-assignment.model';
import { checkinFieldLabel, checkinValueLabel } from '../../checkin-labels.util';

type ViewState = 'loading' | 'ready' | 'error';

// Qué pasó en UN ciclo de una fase de nutrición. Se abre desde los cuadraditos
// de la tarjeta de la fase (client-detail.page.html) como panel derecho.
//
// Es de solo lectura y no inventa datos: cruza por el rango de fechas del
// ciclo tres cosas que ya existen —macros pautados vs consumidos
// (nutrition-tracking), cumplimiento alimento a alimento (nutrition-foods) y
// los check-ins que el cliente respondió dentro de ese rango.
//
// Los check-ins se cruzan por FECHA dentro de la ventana del ciclo (desde
// ciclos por contenido llevan además `cycle`, pero el cruce por fecha sigue
// valiendo y cubre también los anteriores).
@Component({
  selector: 'app-cycle-summary-panel',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './cycle-summary-panel.component.html',
  styleUrls: ['./cycle-summary-panel.component.scss'],
})
export class CycleSummaryPanelComponent implements OnInit {
  @Input() public clientId!: string;
  @Input() public cycle!: PlanAssignment;
  @Input() public cycleNumber = 1;
  @Input() public clientName = 'este cliente';
  // La ventana del ciclo (calculada por contenido, ver cycle-window.js), que
  // no coincide con el rango del doc persistido (un doc puede cubrir varios
  // ciclos). Sin ella se cae al rango del doc.
  @Input() public window: { start: string; end: string } | null = null;

  public state: ViewState = 'loading';

  public foods: NutritionFoodCompliance[] = [];
  public plannedAvg: NutritionMacroTotals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  public consumedAvg: NutritionMacroTotals = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  public daysWithPlan = 0;
  public checkins: CheckinResponseEntry[] = [];
  // Solo para poder nombrar las preguntas propias del coach ("custom:<id>").
  private checkinConfig: CheckinConfig | null = null;

  constructor(
    private modalController: ModalController,
    private api: ClientDetailApiService
  ) {}

  // Un ciclo vigente no tiene fin: se mira hasta hoy. El backend vuelve a
  // acotarlo por su cuenta (nunca el futuro), esto es solo para no pedir un
  // rango absurdo.
  public get from(): string {
    return this.window?.start || this.cycle?.startDate || this.todayIso;
  }

  public get to(): string {
    const fin = this.window?.end || this.cycle?.endDate || this.todayIso;
    return fin > this.todayIso ? this.todayIso : fin;
  }

  private get todayIso(): string {
    return new Date().toISOString().slice(0, 10);
  }

  public get isRunning(): boolean {
    if (this.window) return this.window.end >= this.todayIso;
    return !this.cycle?.endDate;
  }

  public ngOnInit(): void {
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
      // Sin esto, una pregunta propia del coach se leería
      // "custom:507f1f77bcf86cd799439011".
      config: this.api.getCheckinConfig(this.clientId).pipe(catchError(() => of(null))),
    }).subscribe({
      next: ({ tracking, foods, checkins, config }) => {
        this.foods = foods?.items || [];
        this.applyTracking(tracking?.dailyTracking || []);
        this.checkinConfig = config;
        this.checkins = this.checkinsInRange(checkins || []);
        this.state = 'ready';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Media POR DÍA CON PLAN, no por día del rango: un ciclo con días sin nada
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

  public checkinValues(
    entry: CheckinResponseEntry
  ): { key: string; value: number | string | boolean }[] {
    return Object.entries(entry?.values || {}).map(([key, value]) => ({ key, value }));
  }

  public fieldLabel(key: string): string {
    return checkinFieldLabel(key, this.checkinConfig?.customQuestions || []);
  }

  public valueLabel(value: number | string | boolean): string {
    return checkinValueLabel(value);
  }

  public dismiss(): void {
    void this.modalController.dismiss();
  }
}
