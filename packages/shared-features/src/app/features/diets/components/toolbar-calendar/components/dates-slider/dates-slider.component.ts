import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from 'src/app/core/services/util/util.service';
// Removed direct Swiper type import; use `any` for type flexibility
import { WEEK_DAYS } from 'src/app/shared/constants/week-days';

@Component({
  selector: 'app-dates-slider',
  templateUrl: './dates-slider.component.html',
  styleUrls: ['./dates-slider.component.scss'],
  standalone: false,
})
export class DatesSliderComponent implements AfterViewInit {
  @Output()
  public selectedDateEvent = new EventEmitter<string>();

  @Output()
  public weekChangedEvent = new EventEmitter<Date>();

  @ViewChild('dateSlides')
  public swiperDates!: ElementRef;
  public swiper!: any;

  public allDateSlides: Date[][] = [];
  public previousWeek: Date[] = [];
  public currentWeek: Date[] = [];
  public nextWeek: Date[] = [];
  public currentDate!: Date;
  public prevMonday!: Date;
  public prevSunday!: Date;
  public currentMonday!: Date;
  public nextMonday!: Date;
  public nextSunday!: Date;

  public backgroundColorDateSelected: string = '';
  public colorDateSelected: string = '';
  public borderDateSelected: string = '';

  public today: Date = new Date();

  constructor(
    private _utilService: UtilService,
    private _cdRef: ChangeDetectorRef,
    private _translate: TranslateService
  ) {}

  public ngAfterViewInit(): void {
    this._utilService.getCurrentDate.subscribe((resCurrentDate) => {
      this.currentDate = this._utilService.parseYYYYMMDD(resCurrentDate);
      setTimeout(() => {
        this.swiperReady();
        this.initSlides();
      });
    });
  }

  private swiperReady(): void {
    this.swiper = this.swiperDates?.nativeElement?.swiper;
    // Remove any existing listener before adding a new one to avoid accumulation
    this.swiper.off('slideChangeTransitionEnd');
    this.swiper.on('slideChangeTransitionEnd', () => this.slide());
  }

  private initSlides(): void {
    this.previousWeek = [];
    this.currentWeek = [];
    this.nextWeek = [];
    const weekDays = 7;

    const prev = new Date(
      new Date(this.currentDate).setDate(this.currentDate.getDate() - weekDays)
    );

    this.prevMonday = this._utilService.getFirstWeekDay(prev, WEEK_DAYS.monday);

    this.currentMonday = this._utilService.getFirstWeekDay(
      this.currentDate,
      WEEK_DAYS.monday
    );

    const next = new Date(
      new Date(this.currentDate).setDate(this.currentDate.getDate() + weekDays)
    );
    this.nextMonday = this._utilService.getFirstWeekDay(next, WEEK_DAYS.monday);

    this.previousWeek = this.generateWeek(this.prevMonday, weekDays);
    this.currentWeek = this.generateWeek(this.currentMonday, weekDays);
    this.nextWeek = this.generateWeek(this.nextMonday, weekDays);

    this.allDateSlides = [this.previousWeek, this.currentWeek, this.nextWeek];

    this._cdRef.detectChanges();
    this.swiper.slideTo(1, 0, false);
  }

  private slide(): void {
    const weekDays = 7;
    const res = this.swiper.realIndex;

    if (res === 0) {
      this.nextMonday = new Date(this.currentMonday);
      this.currentMonday = new Date(this.prevMonday);

      this.prevMonday.setDate(this.prevMonday.getDate() - weekDays);
      this.previousWeek = this.generateWeek(this.prevMonday, weekDays);

      this.allDateSlides.unshift(this.previousWeek);
      this.allDateSlides.pop();
    } else if (res === this.allDateSlides.length - 1) {
      this.prevMonday = new Date(this.currentMonday);
      this.currentMonday = new Date(this.nextMonday);

      this.nextMonday.setDate(this.nextMonday.getDate() + weekDays);
      this.nextWeek = this.generateWeek(this.nextMonday, weekDays);

      this.allDateSlides.push(this.nextWeek);
      this.allDateSlides.shift();
    }

    // Emitir evento de cambio de semana
    this.weekChangedEvent.emit(new Date(this.currentMonday));

    this._cdRef.detectChanges();
    this.swiper.slideTo(1, 0, false);
  }

  public datesAreOnSameDay(first: Date, second: Date): boolean {
    return this._utilService.datesAreOnSameDay(first, second);
  }

  public getDayAbbreviation(date: Date): string {
    const dayIndex = date.getDay();
    const lang = this._translate.currentLang || 'es';
    const days = lang === 'en'
      ? ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      : ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    return days[dayIndex];
  }

  public sendSelectedDate(date: Date): void {
    this.selectedDateEvent.emit(this._utilService.formatDateToYYYYMMDD(date));
  }

  /**
   * Resetea el slider a la semana actual
   */
  public resetToCurrentWeek(): void {
    this.currentDate = new Date();
    this.initSlides();
  }

  private generateWeek(startDate: Date, weekDays: number): Date[] {
    const week: Date[] = [];
    for (let i = 0; i < weekDays; i++) {
      week.push(
        new Date(new Date(startDate).setDate(new Date(startDate).getDate() + i))
      );
    }
    return week;
  }
}

