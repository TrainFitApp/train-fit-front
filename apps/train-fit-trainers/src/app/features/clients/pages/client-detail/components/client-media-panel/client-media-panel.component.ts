import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormCheckView } from 'src/app/core/models/media';
import { MediaApiService } from 'src/app/core/services/media/media-api.service';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

/**
 * Ficha de cliente › Progreso › Fotos y vídeos (docs/plan-medidas-multimedia.md):
 * sus fotos de progreso (con el comparador), sus vídeos de progreso y sus
 * revisiones de técnica. Lo que se ve lo decide el backend (relación activa,
 * días ocultos, historial compartido).
 */
@Component({
  selector: 'app-client-media-panel',
  templateUrl: './client-media-panel.component.html',
  styleUrls: ['./client-media-panel.component.scss'],
})
export class ClientMediaPanelComponent implements OnChanges {
  @Input() public clientId = '';
  // Las revisiones de técnica solo existen con relación de entrenamiento.
  @Input() public hasTraining = false;

  public section: 'photos' | 'videos' | 'formChecks' = 'photos';
  public formChecks: FormCheckView[] = [];
  public formChecksLoading = false;

  constructor(private mediaApi: MediaApiService, private router: Router) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && this.section === 'formChecks') this.loadFormChecks();
  }

  public select(section: 'photos' | 'videos' | 'formChecks'): void {
    this.section = section;
    if (section === 'formChecks') this.loadFormChecks();
  }

  private async loadFormChecks(): Promise<void> {
    if (!this.clientId) return;
    this.formChecksLoading = true;
    try {
      this.formChecks = (await firstValueFrom(this.mediaApi.listTrainerFormChecks({ clientId: this.clientId }))).formChecks;
    } catch {
      this.formChecks = [];
    } finally {
      this.formChecksLoading = false;
    }
  }

  public open(check: FormCheckView): void {
    void this.router.navigate(['/tabs/form-checks', check.id]);
  }

  public dateLabel(date: string): string {
    return new Date(`${date}T12:00:00`).toLocaleDateString(uiLocale(), { day: 'numeric', month: 'short' });
  }

  public trackCheck(_index: number, check: FormCheckView): string {
    return check.id;
  }
}
