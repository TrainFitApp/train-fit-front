import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subject, of } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { ClientDetailApiService } from '../../services/client-detail-api.service';
import { NutritionDayItem, NutritionDayMeal, NutritionDaySummary } from '../../models/client-detail.model';
import { onDaySkipped } from '../../../../../../shared/services/diet-phase-api.service';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import { MacroRow, isAdjusted, itemStatusIcon, macroRows, mealStatusIcon, signedNumber } from './nutrition-day.util';

type ViewState = 'loading' | 'ready' | 'error';

// Plan › Nutrición › pestaña «Día»: qué pasó el día que el profesional ha
// pulsado en el calendario. Menú y opciones que eligió el cliente, lo que
// tomó, lo que no, lo que añadió por su cuenta y cuánto se desvió de lo
// pautado. Solo lectura; los números salen del mismo cálculo que la gráfica
// de Seguimiento (GET /trainer/clients/:clientId/nutrition-day).
@Component({
  selector: 'app-nutrition-day-detail',
  templateUrl: './nutrition-day-detail.component.html',
  styleUrls: ['./nutrition-day-detail.component.scss'],
})
export class NutritionDayDetailComponent implements OnChanges, OnDestroy {
  @Input() public clientId = '';
  @Input() public date = '';

  public state: ViewState = 'loading';
  public summary: NutritionDaySummary | null = null;
  // Filas de la tabla pautado/tomado: se calculan una vez al llegar el día,
  // no en la plantilla.
  public rows: MacroRow[] = [];

  public readonly isAdjusted = isAdjusted;

  private readonly load$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  constructor(private api: ClientDetailApiService) {
    // switchMap: pulsar varios días seguidos no pinta una respuesta vieja
    // encima de la del último. El error se queda dentro para que el flujo
    // siga vivo para el siguiente día.
    this.load$
      .pipe(
        switchMap(() => this.api.getNutritionDay(this.clientId, this.date).pipe(catchError(() => of(null)))),
        takeUntil(this.destroy$)
      )
      .subscribe((summary) => {
        if (!summary) {
          this.state = 'error';
          return;
        }
        this.summary = summary;
        this.rows = macroRows(summary.planned, summary.consumed);
        this.state = 'ready';
      });

    // Saltar el día desde el calendario lo vacía de lo pautado: se relee.
    onDaySkipped(
      () => this.clientId,
      (date) => {
        if (date === this.date) this.load();
      }
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['clientId'] || changes['date']) && this.clientId && this.date) this.load();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public load(): void {
    this.state = 'loading';
    this.load$.next();
  }

  public get isToday(): boolean {
    return !!this.summary && this.summary.date === this.summary.today;
  }

  // Un día que ya pasó: lo que no marcó, no lo tomó. Hoy y lo que viene,
  // todavía puede marcarlo.
  public get isPast(): boolean {
    return !!this.summary && this.summary.date < this.summary.today;
  }

  // Con varios menús en la fase se enseñan todos con el elegido marcado; con
  // uno solo, solo si lo eligió.
  public get showMenus(): boolean {
    return !!this.summary && (this.summary.menus.length > 1 || !!this.summary.menuName);
  }

  public get hasNumbers(): boolean {
    return !!this.summary && (this.summary.planned.kcal > 0 || this.summary.consumed.kcal > 0);
  }

  // Aviso bajo la cabecera cuando el día no se lee solo con sus comidas.
  public get notice(): { key: string; icon: string } | null {
    const day = this.summary;
    if (!day) return null;
    switch (day.state) {
      case 'skipped':
        return { key: 'CLIENT_DETAIL.DAY.NOTICE.SKIPPED', icon: 'play-skip-forward-outline' };
      case 'unchosen':
        return { key: 'CLIENT_DETAIL.DAY.NOTICE.UNCHOSEN', icon: 'alert-circle-outline' };
      case 'pending':
        return { key: this.isToday ? 'CLIENT_DETAIL.DAY.NOTICE.PENDING_TODAY' : 'CLIENT_DETAIL.DAY.NOTICE.PENDING', icon: 'time-outline' };
      case 'none':
        return { key: 'CLIENT_DETAIL.DAY.NOTICE.NONE', icon: 'calendar-clear-outline' };
      default:
        return day.date > day.today ? { key: 'CLIENT_DETAIL.DAY.NOTICE.FUTURE', icon: 'time-outline' } : null;
    }
  }

  // Sin marcar: en un día pasado es que no lo tomó; hoy o luego, que aún no.
  public itemStatusKey(item: NutritionDayItem): string {
    const status = item.status === 'unchecked' && !this.isPast ? 'pending' : item.status;
    return `CLIENT_DETAIL.DAY.ITEM_STATUS.${status}`;
  }

  public mealStatusKey(meal: NutritionDayMeal): string {
    const status = meal.status === 'unchecked' && !this.isPast ? 'pending' : meal.status;
    return `CLIENT_DETAIL.DAY.MEAL_STATUS.${status}`;
  }

  // Lo que no marcó se enseña con su cantidad pautada.
  public shownQuantity(item: NutritionDayItem): number | null {
    return item.status === 'unchecked' ? item.plannedQuantity : item.quantity;
  }

  public mealIcon(meal: NutritionDayMeal): string {
    return mealStatusIcon(meal.status, this.isPast);
  }

  public itemIcon(item: NutritionDayItem): string {
    return itemStatusIcon(item.status, this.isPast);
  }

  public chosenOption(meal: NutritionDayMeal): string {
    const options = meal.options;
    if (!options || options.chosen === null) return '';
    return options.labels[options.chosen] || '';
  }

  public signed(value: number): string {
    return signedNumber(value, uiLocale());
  }

  // La app no registra LOCALE_ID: el DecimalPipe saldría en inglés.
  public n(value: number): string {
    return value.toLocaleString(uiLocale(), { maximumFractionDigits: 0 });
  }

  public trackByName(_index: number, meal: NutritionDayMeal): string {
    return meal.name;
  }

  public trackByItem(index: number, item: NutritionDayItem): string {
    return `${index}:${item.kind}:${item.name}`;
  }

  public trackByKey(_index: number, row: MacroRow): string {
    return row.key;
  }
}
