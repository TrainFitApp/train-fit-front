import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormCheckView } from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';

type Filter = 'pending' | 'reviewed' | 'all';

/**
 * Bandeja de revisiones de técnica: los vídeos que mandan los clientes de
 * entrenamiento. Arriba, el aviso de las que se borran esta semana (90 días
 * de retención salvo «Conservar»).
 */
@Component({
  selector: 'app-form-checks',
  templateUrl: './form-checks.page.html',
  styleUrls: ['./form-checks.page.scss'],
})
export class FormChecksPage {
  public state: 'loading' | 'error' | 'loaded' = 'loading';
  public filter: Filter = 'pending';
  public all: FormCheckView[] = [];
  public pendingCount = 0;
  public expiringSoonCount = 0;

  constructor(private mediaApi: MediaApiService, private router: Router) {}

  public ionViewWillEnter(): void {
    this.load();
  }

  public async load(): Promise<void> {
    if (!this.all.length) this.state = 'loading';
    try {
      const result = await firstValueFrom(this.mediaApi.listTrainerFormChecks());
      this.all = result.formChecks;
      this.pendingCount = result.pendingCount;
      this.expiringSoonCount = result.expiringSoonCount;
      this.state = 'loaded';
    } catch {
      this.state = 'error';
    }
  }

  public get visible(): FormCheckView[] {
    if (this.filter === 'all') return this.all;
    return this.all.filter((check) => check.status === this.filter);
  }

  public get expiringSoon(): FormCheckView[] {
    return this.all.filter((check) => check.expiringSoon);
  }

  public setFilter(filter: Filter): void {
    this.filter = filter;
  }

  public showExpiring(): void {
    this.filter = 'all';
  }

  public open(check: FormCheckView): void {
    void this.router.navigate(['/tabs/form-checks', check.id]);
  }

  public dateLabel(date: string): string {
    return new Date(`${date}T12:00:00`).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  public trackCheck(_index: number, check: FormCheckView): string {
    return check.id;
  }
}
