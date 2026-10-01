import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { checkinWeekLabel } from '../clients/checkin-labels.util';
import { ReviewQueueApiService } from './review-queue-api.service';
import { ReviewCounts, ReviewItem, ReviewItemType } from './review-queue.model';

type Filter = 'all' | ReviewItemType;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Bandeja «Por revisar»: todo lo que los clientes han mandado y espera tu
 * respuesta (check-ins, vídeos de técnica, cuestionarios de alta), en una
 * cola ordenada por lo que más lleva esperando. Cada fila abre la pantalla
 * donde ya se revisa eso; aquí no se revisa nada.
 *
 * ?type=checkin|form_check|intake y ?client=<id> llegan desde la Cartera.
 */
@Component({
  selector: 'app-review-queue',
  templateUrl: './review-queue.page.html',
  styleUrls: ['./review-queue.page.scss'],
})
export class ReviewQueuePage {
  public state: 'loading' | 'error' | 'loaded' = 'loading';
  public filter: Filter = 'all';
  public clientFilter: { id: string; name: string } | null = null;
  public items: ReviewItem[] = [];
  public expiring: ReviewItem[] = [];
  public counts: ReviewCounts = { total: 0, checkin: 0, form_check: 0, intake: 0 };
  public technique = true;
  // Precalculada: un array nuevo en cada detección de cambios ya colgó esta app.
  public visible: ReviewItem[] = [];

  constructor(
    private api: ReviewQueueApiService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  public ionViewWillEnter(): void {
    const params = this.route.snapshot.queryParamMap;
    const type = params.get('type') as ReviewItemType | null;
    if (type && ['checkin', 'form_check', 'intake'].includes(type)) this.filter = type;
    const client = params.get('client');
    this.clientFilter = client ? { id: client, name: '' } : null;
    this.load();
  }

  public async load(): Promise<void> {
    if (!this.items.length) this.state = 'loading';
    try {
      const result = await firstValueFrom(this.api.list());
      this.items = result.items;
      this.counts = result.counts;
      this.expiring = result.expiringFormChecks;
      this.technique = result.technique;
      if (this.clientFilter) {
        const match = this.items.find((item) => item.clientId === this.clientFilter?.id);
        this.clientFilter = match ? { id: match.clientId, name: match.clientName } : null;
      }
      this.state = 'loaded';
      this.recompute();
    } catch {
      this.state = 'error';
    }
  }

  public setFilter(filter: Filter): void {
    this.filter = filter;
    this.recompute();
  }

  public clearClient(): void {
    this.clientFilter = null;
    void this.router.navigate([], { relativeTo: this.route, queryParams: { client: null }, queryParamsHandling: 'merge', replaceUrl: true });
    this.recompute();
  }

  private recompute(): void {
    this.visible = this.items.filter(
      (item) =>
        (this.filter === 'all' || item.type === this.filter) &&
        (!this.clientFilter || item.clientId === this.clientFilter.id)
    );
  }

  public open(item: ReviewItem): void {
    switch (item.type) {
      case 'checkin':
        // Progreso › Medidas y check-ins, con esta respuesta abierta.
        void this.router.navigate(['/tabs/clients', item.clientId], {
          queryParams: { name: item.clientName, tab: 'measurements', response: item.id },
        });
        break;
      case 'form_check':
        void this.router.navigate(['/tabs/form-checks', item.id]);
        break;
      case 'intake':
        // El cuestionario se revisa desplegado en la Cartera (el guard no
        // deja abrir la ficha hasta revisarlo).
        void this.router.navigate(['/tabs/clients'], { queryParams: { review: item.clientId } });
        break;
    }
  }

  public icon(type: ReviewItemType): string {
    return type === 'checkin' ? 'clipboard-outline' : type === 'form_check' ? 'videocam-outline' : 'document-text-outline';
  }

  public detail(item: ReviewItem): string {
    if (item.type === 'intake') return this.translate.instant('REVIEW_QUEUE.INTAKE_TITLE');
    if (item.type === 'checkin') {
      const week = checkinWeekLabel(item.week || null);
      return [item.title || this.translate.instant('REVIEW_QUEUE.CHECKIN_TITLE'), week].filter(Boolean).join(' · ');
    }
    return item.title;
  }

  public waiting(item: ReviewItem): string {
    const days = Math.floor((Date.now() - new Date(item.since).getTime()) / DAY_MS);
    if (days <= 0) return this.translate.instant('REVIEW_QUEUE.WAITING_TODAY');
    if (days === 1) return this.translate.instant('REVIEW_QUEUE.WAITING_YESTERDAY');
    return this.translate.instant('REVIEW_QUEUE.WAITING_DAYS', { days });
  }

  // Más de una semana esperando: se marca, no se esconde.
  public isOld(item: ReviewItem): boolean {
    return Date.now() - new Date(item.since).getTime() > 7 * DAY_MS;
  }

  public trackItem(_index: number, item: ReviewItem): string {
    return `${item.type}:${item.id}`;
  }
}
