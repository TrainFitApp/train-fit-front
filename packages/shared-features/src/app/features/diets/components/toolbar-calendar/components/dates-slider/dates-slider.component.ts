import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
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

const DAYS_PER_WEEK = 7;

// Las tres tiras del carrusel: siempre hay una semana a cada lado de la que
// se está viendo, y la que se ve es la del centro.
const PREV_SLIDE = 0;
const CENTER_SLIDE = 1;
const NEXT_SLIDE = 2;

interface DayWeekInfo {
  phaseId: string;
  phaseName: string;
  phaseColor: string;
  weekNumber: number;
}

// Un tramo de la línea de fase encima de una semana: cuántos días abarca
// (de 7), de qué color, cómo se llama la fase y en qué semana de ella va.
interface PhaseSegment {
  span: number;
  color: string | null;
  name: string;
  weekNumber: number | null;
}

@Component({
  selector: 'app-dates-slider',
  templateUrl: './dates-slider.component.html',
  styleUrls: ['./dates-slider.component.scss'],
})
export class DatesSliderComponent implements AfterViewInit, OnDestroy {
  @Output()
  public selectedDateEvent = new EventEmitter<string>();

  @Output()
  public weekChangedEvent = new EventEmitter<Date>();

  @ViewChild('dateSlides')
  public swiperDates!: ElementRef;
  public swiper!: any;

  public allDateSlides: Date[][] = [];
  public currentDate!: Date;
  public currentMonday!: Date;

  public backgroundColorDateSelected: string = '';
  public colorDateSelected: string = '';
  public borderDateSelected: string = '';

  public today: Date = new Date();

  // Qué fase y qué semana cae en cada día visible
  // (clave "YYYY-MM-DD"). Se recarga al cambiar de semana.
  private dayInfo = new Map<string, DayWeekInfo>();
  public segmentsBySlide: PhaseSegment[][] = [];

  // Tira del extremo pendiente de generar: se escribe un fotograma después
  // del recentrado, cuando ya está fuera de pantalla (ver `slide`).
  private pendingEdge: { index: number; week: Date[] } | null = null;
  private pendingEdgeFrame: number | null = null;
  private destroyed = false;

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

  public ngOnDestroy(): void {
    this.destroyed = true;
    if (this.pendingEdgeFrame !== null) cancelAnimationFrame(this.pendingEdgeFrame);
  }

  private swiperReady(): void {
    this.swiper = this.swiperDates?.nativeElement?.swiper;
    // Remove any existing listener before adding a new one to avoid accumulation
    this.swiper.off('slideChangeTransitionEnd');
    this.swiper.on('slideChangeTransitionEnd', () => this.slide());
  }

  private initSlides(): void {
    this.cancelPendingEdge();

    this.currentMonday = this._utilService.getFirstWeekDay(
      this.currentDate,
      WEEK_DAYS.monday
    );

    this.allDateSlides = [
      this.generateWeek(this.addWeeks(this.currentMonday, -1)),
      this.generateWeek(this.currentMonday),
      this.generateWeek(this.addWeeks(this.currentMonday, 1)),
    ];
    this.rebuildSegments();

    this._cdRef.detectChanges();
    this.swiper.slideTo(CENTER_SLIDE, 0, false);
    this.loadTimeline();
  }

  // Fases + semanas de las tres semanas visibles. En silencio si falla: el
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
        if (this.destroyed) return;
        this.indexTimeline(timeline);
        this.rebuildSegments();
        this._cdRef.detectChanges();
      },
      error: () => undefined,
    });
  }

  private indexTimeline(timeline: DietTimeline): void {
    this.dayInfo.clear();
    const phaseById = new Map(timeline.phases.map((p) => [p.id, p]));
    for (const week of timeline.weeks) {
      const phase = phaseById.get(week.phaseId);
      if (!phase) continue;
      // Un color por FASE y ya: cada tira del slider es una semana entera,
      // así que rotar el color por semana pintaba un arcoíris que ya no
      // distinguía una fase de otra.
      const phaseColor = PHASE_COLORS[phase.colorIndex % PHASE_COLORS.length];
      let day = week.start;
      while (day <= week.end) {
        this.dayInfo.set(day, {
          phaseId: phase.id,
          phaseName: phase.name,
          phaseColor,
          weekNumber: week.number,
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

  // Siempre en el mismo paso en que cambian las tiras: si la línea de fase se
  // recalculase solo al responder el backend, al deslizar quedaría un instante
  // con el nombre y la semana de la tira anterior encima de los días nuevos.
  private rebuildSegments(): void {
    this.segmentsBySlide = this.allDateSlides.map((slide) => this.segmentsFor(slide));
  }

  // Tramos consecutivos de la misma fase Y la misma semana dentro de una
  // tira. Como las semanas van de lunes a domingo igual que la tira, un
  // tramo se parte solo cuando cambia la fase (o cuando la fase arrancó a
  // media semana y su S1 es corta).
  private segmentsFor(slide: Date[]): PhaseSegment[] {
    const segments: PhaseSegment[] = [];
    for (const day of slide) {
      const info = this.dayInfo.get(this._utilService.formatDateToYYYYMMDD(day));
      const last = segments[segments.length - 1] as (PhaseSegment & { phaseId: string }) | undefined;
      const phaseId = info?.phaseId || '';
      const weekNumber = info?.weekNumber ?? null;
      if (last && last.phaseId === phaseId && last.weekNumber === weekNumber) {
        last.span++;
        continue;
      }
      segments.push(
        Object.assign(
          { span: 1, color: info?.phaseColor || null, name: info?.phaseName || '', weekNumber },
          { phaseId }
        )
      );
    }
    return segments;
  }

  public infoFor(day: Date): DayWeekInfo | null {
    return this.dayInfo.get(this._utilService.formatDateToYYYYMMDD(day)) || null;
  }

  // Recentrado invisible.
  //
  // Al acabar el deslizamiento el carrusel está en la tira 0 o en la 2, y hay
  // que devolverlo a la 1 sin animación para que vuelva a haber una semana a
  // cada lado. Si al recentrar se reescriben las tres tiras de golpe, la 1
  // todavía pinta la semana de la que venimos durante el salto: eso es el
  // parpadeo (semana nueva, vieja, nueva). Va en tres pasos:
  //
  //   1. la tira central pasa a ser *la misma semana* que la tira que se está
  //      viendo, y el extremo contrario recibe la semana de la que venimos;
  //   2. se salta a la central: es pixel por pixel la imagen que ya había, así
  //      que el salto no se ve;
  //   3. al fotograma siguiente, con el extremo ya fuera de pantalla, se
  //      genera la semana nueva de ese extremo.
  private slide(): void {
    this.flushPendingEdge();

    const index: number = this.swiper.realIndex;
    if (index === CENTER_SLIDE) return;

    const step = index === PREV_SLIDE ? -1 : 1;
    const visibleWeek = this.allDateSlides[index];

    this.currentMonday = this.addWeeks(this.currentMonday, step);

    // Paso 1. El extremo del que venimos se reescribe ya: está fuera de
    // pantalla al otro lado del salto.
    const slides = [...this.allDateSlides];
    slides[CENTER_SLIDE] = visibleWeek;
    slides[step === 1 ? PREV_SLIDE : NEXT_SLIDE] = this.generateWeek(
      this.addWeeks(this.currentMonday, -step)
    );
    this.allDateSlides = slides;
    this.rebuildSegments();
    this._cdRef.detectChanges();

    // Paso 2.
    this.swiper.slideTo(CENTER_SLIDE, 0, false);

    this.weekChangedEvent.emit(new Date(this.currentMonday));

    // Paso 3.
    this.pendingEdge = {
      index: step === 1 ? NEXT_SLIDE : PREV_SLIDE,
      week: this.generateWeek(this.addWeeks(this.currentMonday, step)),
    };
    this.pendingEdgeFrame = requestAnimationFrame(() => this.flushPendingEdge());
  }

  // El timeline se pide aquí y no en `slide`: en ese momento el extremo
  // todavía duplica la semana central, así que el rango de tres semanas se
  // quedaría corto y la semana nueva llegaría sin fase ni color.
  private flushPendingEdge(): void {
    const pending = this.pendingEdge;
    this.cancelPendingEdge();
    if (!pending || this.destroyed) return;

    const slides = [...this.allDateSlides];
    slides[pending.index] = pending.week;
    this.allDateSlides = slides;
    this.rebuildSegments();
    this._cdRef.detectChanges();
    this.loadTimeline();
  }

  private cancelPendingEdge(): void {
    this.pendingEdge = null;
    if (this.pendingEdgeFrame !== null) {
      cancelAnimationFrame(this.pendingEdgeFrame);
      this.pendingEdgeFrame = null;
    }
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

  // Las tiras se identifican por posición y los días por fecha: así Angular
  // reescribe el contenido de las tiras en su sitio en vez de mover los
  // `swiper-slide` de orden en el DOM, que es lo que descolocaba al carrusel
  // y hacía el salto visible.
  public trackBySlide(index: number): number {
    return index;
  }

  public trackByDay(_index: number, day: Date): number {
    return day.getTime();
  }

  private addWeeks(monday: Date, weeks: number): Date {
    const date = new Date(monday);
    date.setDate(date.getDate() + weeks * DAYS_PER_WEEK);
    return date;
  }

  private generateWeek(startDate: Date): Date[] {
    const week: Date[] = [];
    for (let i = 0; i < DAYS_PER_WEEK; i++) {
      const day = new Date(startDate);
      day.setDate(day.getDate() + i);
      week.push(day);
    }
    return week;
  }
}
