import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { localizeList } from 'src/app/core/i18n/localized-catalog';
import {
  MySupplement,
  MySupplementsApiService,
  SupplementTiming,
} from './services/my-supplements-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

const WEEKDAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
localizeList(WEEKDAY_LABELS, 'SUPPLEMENTS.WEEKDAYS_SHORT');

interface TimingGroup {
  key: string;
  label: string;
  supplements: MySupplement[];
}

/**
 * Movimiento 5 Coach Pro — los suplementos que le ha pautado su profesional.
 *
 * Agrupados por MOMENTO y no por producto: el cliente no abre esta pantalla
 * para consultar qué toma en general, la abre justo antes de entrenar
 * pensando "¿qué me toca ahora?". El orden del catálogo de momentos va de la
 * mañana a la noche, así que el grupo que busca está donde espera.
 *
 * Solo lectura. Es una prescripción.
 */
@Component({
  selector: 'app-my-supplements',
  templateUrl: 'my-supplements.page.html',
  styleUrls: ['my-supplements.page.scss'],
})
export class MySupplementsPage implements OnInit {
  public state: ViewState = 'loading';
  public groups: TimingGroup[] = [];

  private timings: SupplementTiming[] = [];

  constructor(
    private mySupplementsApi: MySupplementsApiService,
    private router: Router,
    private translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public close(): void {
    void this.router.navigate(['/tabs/coach']);
  }

  public load(): void {
    this.state = 'loading';
    // El vocabulario y los datos en paralelo: sin el catálogo, los momentos
    // se leerían como claves crudas ("pre_workout").
    this.mySupplementsApi.getTimings().subscribe({
      next: ({ timings }) => {
        this.timings = timings || [];
        this.loadSupplements();
      },
      error: () => {
        this.timings = [];
        this.loadSupplements();
      },
    });
  }

  private loadSupplements(): void {
    this.mySupplementsApi.getMine().subscribe({
      next: (supplements) => {
        this.groups = this.groupByTiming(supplements || []);
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private groupByTiming(supplements: MySupplement[]): TimingGroup[] {
    const byTiming = new Map<string, MySupplement[]>();
    for (const supplement of supplements) {
      const list = byTiming.get(supplement.timing) || [];
      list.push(supplement);
      byTiming.set(supplement.timing, list);
    }

    // Se recorre el CATÁLOGO, no el Map: así el orden es el de la mañana a
    // la noche y no el de llegada de los datos.
    const ordered = this.timings
      .filter((timing) => byTiming.has(timing.key))
      .map((timing) => ({
        key: timing.key,
        label: timing.label,
        supplements: byTiming.get(timing.key) as MySupplement[],
      }));

    // Momentos que el catálogo no conoce (datos de una versión anterior):
    // van al final en vez de desaparecer.
    const known = new Set(this.timings.map((timing) => timing.key));
    for (const [key, list] of byTiming) {
      if (known.has(key)) continue;
      ordered.push({ key, label: this.translate.instant('DIETS.OTHER_TIME'), supplements: list });
    }

    return ordered;
  }

  public get isEmpty(): boolean {
    return this.state === 'loaded' && !this.groups.length;
  }

  // "Otro momento" lo escribe el entrenador; el resto salen del catálogo.
  public timingDetail(supplement: MySupplement): string {
    return supplement.timing === 'custom' ? supplement.customTiming || '' : '';
  }

  // Vacío = todos los días, que es el caso normal. Se dice solo cuando NO lo
  // es: escribir "todos los días" en cada tarjeta sería ruido.
  public weekdaysLabel(supplement: MySupplement): string {
    const days = supplement.weekdays || [];
    if (!days.length) return '';
    return days.map((day) => WEEKDAY_LABELS[day] || '').filter(Boolean).join(', ');
  }

  public openPurchase(supplement: MySupplement): void {
    if (!supplement.purchaseUrl) return;
    // El backend ya rechaza cualquier esquema que no sea http(s) al guardar
    // (ver sanitizeUrl en supplement-controller.js).
    window.open(supplement.purchaseUrl, '_blank', 'noopener');
  }

  public trackById(_index: number, supplement: MySupplement): string {
    return supplement._id;
  }

  public trackByKey(_index: number, group: TimingGroup): string {
    return group.key;
  }
}
