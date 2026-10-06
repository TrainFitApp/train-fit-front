import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DietDay } from 'src/app/core/models/dietDay';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { UtilService } from 'src/app/core/services/util/util.service';
// Removed Swiper type import due to module resolution issues
import { DateRange } from 'src/app/shared/models/dateRange';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public fetchOnInit: boolean = true;

  @Output()
  public selectDate = new EventEmitter();
  @Output()
  public monthYear = new EventEmitter();
  @Output()
  public loading = new EventEmitter();
  @ViewChild('calendar')
  public swiperCalendar: ElementRef | undefined;
  public swiper: any;

  public currentDate: Date = new Date();
  public selectedDate: Date = new Date();
  public today: Date = new Date();

  public currentMonth: any[] = [];
  public previousMonth: any[] = [];
  public nextMonth: any[] = [];
  public months: any[][] = [];
  public currentMonthYear: string = '';

  public dietDays: DietDay[] = [];

  private langChangeSubscription: any;

  get weekdayInitials(): string[] {
    const val = this.translate.instant('WEIGHT_INFO.DAYS_INITIALS');
    return Array.isArray(val) ? val : (val as string).split(',');
  }

  constructor(
    public modalController: ModalController,
    private translate: TranslateService,
    private dietDayService: DietDayService,
    private utilService: UtilService,
    private cdRef: ChangeDetectorRef
  ) {
    this.updateCalendar();
    this.updateCurrentMonthYear();
  }

  public ngOnInit(): void {
    if (this.fetchOnInit) {
      this.fetchDietDaysForMonth(); // Traer los DietDays para el mes actual
    }

    // Listen for language changes to update calendar
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateCalendar();
      this.updateCurrentMonthYear();
      this.cdRef.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  public ngAfterViewInit(): void {
    this.swiperReady();
  }

  public selectDay(day: Date, week: any, month: any): void {
    const weekDays = week.days;
    const monthDays = month.flatMap((dTemp) => dTemp.days);

    if (day) {
      this.selectedDate = day;
      this.selectDate.emit({
        selectedDate: this.utilService.formatDateToYYYYMMDD(day),
        weekDays,
        monthDays,
      });
      this.cdRef.detectChanges();
    }
  }

  public refreshDietDaysForMonth(): void {
    this.fetchDietDaysForMonth();
  }

  public upsertWeightForDate(dateStr: string, weight?: number, notes?: string): void {
    if (typeof weight !== 'number') {
      return;
    }

    const allMonths = [this.previousMonth, this.currentMonth, this.nextMonth];

    for (const month of allMonths) {
      for (const week of month) {
        const day = week.days.find((item) => {
          return item?.date && this.formatDateKey(item.date) === dateStr;
        });

        if (day) {
          day.weight = weight;
          day.notes = notes;
          this.updateWeekAverage(week);
          this.cdRef.detectChanges();
          return;
        }
      }
    }
  }

  public datesAreOnSameDay(first: Date, second: Date): boolean {
    return this.utilService.datesAreOnSameDay(first, second);
  }

  private updateCurrentMonthYear(): void {
    const monthNames = this.translate.instant('WEIGHT_INFO.MONTHS');
    const month = Array.isArray(monthNames) ? monthNames[this.currentDate.getMonth()] : '';
    const year = this.currentDate.getFullYear();
    this.currentMonthYear = `${month} ${year}`;
  }

  private swiperReady(): void {
    setTimeout(() => {
      this.swiper = this.swiperCalendar.nativeElement.swiper;
      this.swiper.on('slideChangeTransitionEnd', () => this.slide());
    });
  }

  private slide(): void {
    const realIndex = this.swiper.realIndex;
    const totalSlides = this.months.length;

    // Deslizó hacia la izquierda (mes anterior)
    if (realIndex === 0) {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1
      );
    }
    // Deslizó hacia la derecha (mes siguiente)
    else if (realIndex === totalSlides - 1) {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1
      );
    }

    this.updateCalendar(); // Actualizar los meses
    this.updateCurrentMonthYear(); // Actualizar el nombre del mes
    this.cdRef.detectChanges();
    this.swiper.slideTo(1, 0);

    // Llamar a la API para obtener los DietDays para el mes siguiente
    this.fetchDietDaysForMonth();
  }

  private fetchDietDaysForMonth(): void {
    const firstDayStr = this.utilService.formatDateToYYYYMMDD(
      new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1)
    );
    const lastDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    const lastDayStr = this.utilService.formatDateToYYYYMMDD(lastDayOfMonth);

    this.loading.emit(true);

    this.dietDayService
      .getDaysInRange(new DateRange(firstDayStr, lastDayStr))
      .subscribe({
        next: (dietDays) => {
          this.dietDays = dietDays;
          this.populateDietDaysInCalendar();
        },
        error: () => {
          this.dietDays = [];
          this.populateDietDaysInCalendar();
        },
      });
  }

  private updateCalendar(): void {
    const calendar = this.generateCalendar();
    this.currentMonth = this.chunkArray(calendar.currentMonth, 7);
    this.previousMonth = this.chunkArray(calendar.previousMonth, 7);
    this.nextMonth = this.chunkArray(calendar.nextMonth, 7);
    this.months = [this.previousMonth, this.currentMonth, this.nextMonth];
  }

  private generateCalendar(): {
    currentMonth: { date: Date | null; weight?: number; notes?: string }[];
    previousMonth: { date: Date | null; weight?: number; notes?: string }[];
    nextMonth: { date: Date | null; weight?: number; notes?: string }[];
  } {
    const currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth()
    );
    const previousMonthDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1
    );
    const nextMonthDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1
    );

    return {
      currentMonth: this.generateDaysForMonth(currentDate),
      previousMonth: this.generateDaysForMonth(previousMonthDate),
      nextMonth: this.generateDaysForMonth(nextMonthDate),
    };
  }

  private generateDaysForMonth(date: Date): {
    date: Date | null;
    weight?: number;
    notes?: string;
  }[] {
    const days: { date: Date | null; weight?: number }[] = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Ajustar inicio del calendario
    const adjustedFirstDay =
      (firstDay.getDay() === 0 ? 7 : firstDay.getDay()) - 1;

    // Días en blanco al inicio
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push({ date: null });
    }

    // Días del mes
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      days.push({ date: currentDate });
    }

    // Días en blanco al final
    const adjustedLastDay = (lastDay.getDay() === 0 ? 7 : lastDay.getDay()) - 1;
    for (let i = adjustedLastDay + 1; i < 7; i++) {
      days.push({ date: null });
    }

    return days;
  }

  public chunkArray(array: any[], chunkSize: number): any[] {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);

      results.push({
        days: chunk, // Mantener la estructura de días
      });
    }
    return results;
  }

  private populateDietDaysInCalendar(): void {
    const dietDaysMap = new Map<string, DietDay>();

    // Mapeamos los días obtenidos del servicio de dieta por su fecha.
    this.dietDays.forEach((dietDay) => {
      dietDaysMap.set(dietDay.date, dietDay);
    });

    // Actualizar todos los meses con los pesos de DietDays
    const allMonths = [this.previousMonth, this.currentMonth, this.nextMonth];

    // Recorremos todos los meses
    for (const month of allMonths) {
      for (const week of month) {
        let totalWeight = 0;
        let daysWithWeight = 0; // Contador para los días con peso

        // Recorremos todos los días de la semana
        for (const day of week.days) {
          if (day?.date) {
            const dateKey = this.formatDateKey(day.date);
            const dietDay = dietDaysMap.get(dateKey);

            // Si encontramos un día con peso, lo asignamos
            if (dietDay && typeof dietDay.weight === 'number') {
              day.weight = dietDay.weight;
              day.notes = dietDay.notes;

              // Sumar el peso para calcular la media
              totalWeight += dietDay.weight;
              daysWithWeight++; // Contar el día con peso
            } else day.weight = 0;
          }
        }

        this.setWeekAverage(week, totalWeight, daysWithWeight);
      }
    }

    this.monthYear.emit(this.currentMonthYear);
    this.loading.emit(false);
    // Forzamos la actualización de la vista para reflejar los cambios
    this.cdRef.detectChanges();
  }

  private formatDateKey(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }

  private updateWeekAverage(week: any): void {
    let totalWeight = 0;
    let daysWithWeight = 0;

    for (const day of week.days) {
      if (day?.date && typeof day.weight === 'number' && day.weight !== 0) {
        totalWeight += day.weight;
        daysWithWeight++;
      }
    }

    this.setWeekAverage(week, totalWeight, daysWithWeight);
  }

  private setWeekAverage(week: any, totalWeight: number, daysWithWeight: number): void {
    week.averageWeight = daysWithWeight > 0 ? totalWeight / daysWithWeight : null;
  }
}

