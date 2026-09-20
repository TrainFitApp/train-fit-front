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
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { DietTimeline } from 'src/app/core/models/dietDay';
// Removed direct Swiper type import; use `any` for type flexibility
import { WEEK_DAYS } from 'src/app/shared/constants/week-days';

// Misma paleta que el calendario del entrenador
// (phase-color.util.ts#PHASE_COLORS): fase N → color N, cíclico.
const PHASE_COLORS: readonly string[] = ['#5db530', '#7b72ee', '#4cf6df', '#e49ab8', '#f4cd2f', '#12b7f3'];

interface DayRevisionInfo {
  phaseId: string;
  phaseName: string;
  phaseColor: string;
  revisionNumber: number;
  revisionColor: string;
}

// Un tramo de la línea de fase encima de una semana: cuántos días abarca
// (de 7), de qué color y cómo se llama la fase.
interface PhaseSegment {
  span: number;
  color: string | null;
  name: string;
}

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

  // Qué fase y qué revisión cae en cada día visible
  // (clave "YYYY-MM-DD"). Se recarga al cambiar de semana.
  private dayInfo = new Map<string, DayRevisionInfo>();
  public segmentsBySlide: PhaseSegment[][] = [];

  constructor(
    private _utilService: UtilService,
    private _cdRef: ChangeDetectorRef,
    private _translate: TranslateService,
    private _dietDayService: DietDayService
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
    this.loadTimeline();
  }

  // Fases + revisiones de las tres semanas visibles. En silencio si falla: el
  // slider funciona igual sin colores.
  private loadTimeline(): void {
    const first = this.allDateSlides[0]?.[0];
    const lastWeek = this.allDateSlides[this.allDateSlides.length - 1];
    const last = lastWeek?.[lastWeek.length - 1];
    if (!first || !last) return;
    const from = this._utilService.formatDateToYYYYMMDD(first);
    const to = this._utilService.formatDateToYYYYMMDD(last);
    this._dietDayService.getTimeline(from, to).subscribe({
      next: (timeline) => {
        this.indexTimeline(timeline);
        this.segmentsBySlide = this.allDateSlides.map((slide) => this.segmentsFor(slide));
        this._cdRef.detectChanges();
      },
      error: () => undefined,
    });
  }

  private indexTimeline(timeline: DietTimeline): void {
    this.dayInfo.clear();
    const phaseById = new Map(timeline.phases.map((p) => [p.id, p]));
    for (const revision of timeline.revisions) {
      const phase = phaseById.get(revision.phaseId);
      if (!phase) continue;
      const phaseColor = PHASE_COLORS[phase.colorIndex % PHASE_COLORS.length];
      // La revisión va rotando dentro de la fase, empezando por el color de la
      // fase: C1 = color de la fase, C2 el siguiente de la paleta, etc.
      const revisionColor = PHASE_COLORS[(phase.colorIndex + revision.number - 1) % PHASE_COLORS.length];
      let day = revision.start;
      while (day <= revision.end) {
        this.dayInfo.set(day, {
          phaseId: phase.id,
          phaseName: phase.name,
          phaseColor,
          revisionNumber: revision.number,
          revisionColor,
        });
        day = this.addDay(day);
      }
    }
  }

  private addDay(iso: string): string {
    const d = new Date(`${iso}T00:00:00.000Z`);
    d.setUTCDate(d.getUTCDate() + 1);
    return d.toISOString().slice(0, 10);
  }

  // Tramos consecutivos de la misma fase dentro de una semana.
  private segmentsFor(slide: Date[]): PhaseSegment[] {
    const segments: PhaseSegment[] = [];
    for (const day of slide) {
      const info = this.dayInfo.get(this._utilService.formatDateToYYYYMMDD(day));
      const last = segments[segments.length - 1];
      const phaseId = info?.phaseId || '';
      if (last && (last as PhaseSegment & { phaseId: string }).phaseId === phaseId) {
        last.span++;
        continue;
      }
      segments.push(
        Object.assign({ span: 1, color: info?.phaseColor || null, name: info?.phaseName || '' }, { phaseId })
      );
    }
    return segments;
  }

  public infoFor(day: Date): DayRevisionInfo | null {
    return this.dayInfo.get(this._utilService.formatDateToYYYYMMDD(day)) || null;
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
    this.loadTimeline();
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

