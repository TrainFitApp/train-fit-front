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
import { UserService } from 'src/app/core/services/user/user.service';
import { UtilService } from 'src/app/core/services/util/util.service';
// Removed Swiper type import due to module resolution issues
import { DateRange } from 'src/app/shared/models/dateRange';
import { forkJoin, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AnthropometryService } from 'src/app/core/services/anthropometry/anthropometry.service';
import { MeasurementProfileService } from 'src/app/core/services/anthropometry/measurement-profile.service';
import { addCivilDays, DatedWeight, mondayOf, positiveWeight, weightWeek } from 'src/app/core/utils/measurement-weeks.util';

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

  public idDiet: string;
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
  private readonly destroyed = new Subject<void>();
  private requestSequence = 0;
  private weightEntries: DatedWeight[] = [];
  private measurementDate = '';

  get weekdayInitials(): string[] {
    const val = this.translate.instant('WEIGHT_INFO.DAYS_INITIALS');
    return Array.isArray(val) ? val : (val as string).split(',');
  }

  constructor(
    public modalController: ModalController,
    private translate: TranslateService,
    private dietDayService: DietDayService,
    private userService: UserService,
    private utilService: UtilService,
    private anthropometryService: AnthropometryService,
    private measurementProfile: MeasurementProfileService,
    private cdRef: ChangeDetectorRef
  ) {
    this.idDiet = this.userService.getLocalUser.dietInUse;
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
    this.destroyed.next();
    this.destroyed.complete();
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
    if (!positiveWeight(weight)) {
      return;
    }
    this.weightEntries = [...this.weightEntries.filter((entry) => entry.date !== dateStr), { date: dateStr, weight }];
    const existing = this.dietDays.find((entry) => entry.date === dateStr);
    if (existing && notes !== undefined) existing.notes = notes;
    // Recalcular también la misma semana que aparece partida entre dos meses.
    this.populateDietDaysInCalendar();
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
    const firstDayStr = mondayOf(this.utilService.formatDateToYYYYMMDD(
      new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1)
    ));
    const lastDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    const lastDayStr = addCivilDays(mondayOf(this.utilService.formatDateToYYYYMMDD(lastDayOfMonth)), 6);
    const sequence = ++this.requestSequence;

    this.loading.emit(true);

    this.measurementProfile.get().pipe(
      switchMap((profile) => {
        this.measurementDate = profile.today;
        return forkJoin({
          dietDays: this.dietDayService.getDietDaysBetweenDatesByIdDiet(this.idDiet, new DateRange(firstDayStr, lastDayStr)),
          measurements: this.anthropometryService.getAnthropometriesBetweenDates(firstDayStr, lastDayStr),
        });
      }),
      takeUntil(this.destroyed)
    )
      .subscribe({
        next: ({ dietDays, measurements }) => {
          if (sequence !== this.requestSequence) return;
          this.dietDays = dietDays;
          this.weightEntries = measurements;
          this.populateDietDaysInCalendar();
        },
        error: () => {
          if (sequence !== this.requestSequence) return;
          this.dietDays = [];
          this.weightEntries = [];
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
    const weights = new Map(this.weightEntries.filter((entry) => positiveWeight(entry.weight)).map((entry) => [entry.date, entry.weight]));

    // Actualizar todos los meses con los pesos de DietDays
    const allMonths = [this.previousMonth, this.currentMonth, this.nextMonth];

    // Recorremos todos los meses
    for (const month of allMonths) {
      for (const week of month) {
        // Recorremos todos los días de la semana
        for (const day of week.days) {
          if (day?.date) {
            const dateKey = this.formatDateKey(day.date);
            const dietDay = dietDaysMap.get(dateKey);

            day.weight = dateKey <= this.measurementDate ? weights.get(dateKey) : undefined;
            day.notes = dietDay?.notes;
          }
        }

        this.updateWeekAverage(week);
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
    const first = week.days.find((day: { date?: Date }) => day?.date)?.date;
    if (!first || !this.measurementDate) return;
    const result = weightWeek(this.weightEntries, this.formatDateKey(first), this.measurementDate);
    week.averageWeight = result.average;
    week.weightCount = result.count;
    week.partial = result.partial;
    week.start = result.start;
    week.end = result.end;
  }
}

