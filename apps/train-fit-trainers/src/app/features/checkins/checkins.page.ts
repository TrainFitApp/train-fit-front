import { Component, OnInit } from '@angular/core';
import { CHECKIN_FIELDS_BY_KEY } from 'src/app/core/constants/checkin-fields';
import { CheckinReportEntry } from './models/checkin-report.model';
import { CheckinReportsApiService } from './services/checkin-reports-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

interface ClientOption {
  id: string;
  name: string;
}

// TASK-002 (MASTER_BACKLOG.md) — "Reportes": antes mostraba 4 nombres de
// cliente inventados y un historial de 5 filas hardcodeadas (peso/energía/
// sueño/estrés/adherencia — columnas que ni siquiera existen en el catálogo
// real de campos). Ahora consume GET /trainer/checkins/responses (real,
// agregado de TODOS los clientes). Las columnas fijas se sustituyen por
// chips de campo:valor dinámicos, porque cada cliente puede tener activos
// campos distintos del catálogo (ver checkin-fields.ts) — no hay un set fijo
// de columnas que tenga sentido para todos a la vez.
@Component({
  selector: 'app-checkins',
  templateUrl: 'checkins.page.html',
  styleUrls: ['checkins.page.scss'],
})
export class CheckinsPage implements OnInit {
  public state: ViewState = 'loading';
  public responses: CheckinReportEntry[] = [];
  public selectedClientId: string | 'all' = 'all';

  constructor(private checkinReportsApi: CheckinReportsApiService) {}

  public ngOnInit(): void {
    this.load();
    // TASK-024 (MASTER_BACKLOG.md) — visitar "Reportes" limpia el contador
    // de no-vistos que muestra el badge del sidebar (ShellPage). El badge en
    // sí no se refresca en caliente (se calculó una vez al montar el shell,
    // mismo criterio ya aceptado en TASK-023) — visualmente se actualizará
    // en la próxima carga completa del shell, no en cada navegación interna.
    this.checkinReportsApi.markSeen().subscribe();
  }

  // Mismo patrón ya validado esta sesión (RoutinesPage, DietTemplatesListPage,
  // TemplatesPage): ion-router-outlet cachea la página, ngOnInit solo corre
  // una vez por instancia.
  public ionViewWillEnter(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    this.checkinReportsApi.getMyResponses().subscribe({
      next: (responses) => {
        this.responses = responses;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  public get clientOptions(): ClientOption[] {
    const seen = new Map<string, ClientOption>();
    for (const r of this.responses) {
      if (!r.client) continue;
      if (!seen.has(r.client._id)) {
        seen.set(r.client._id, { id: r.client._id, name: `${r.client.name} ${r.client.lastname}`.trim() });
      }
    }
    return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  public get filteredResponses(): CheckinReportEntry[] {
    if (this.selectedClientId === 'all') return this.responses;
    return this.responses.filter((r) => r.client?._id === this.selectedClientId);
  }

  public get distinctClientCount(): number {
    return this.clientOptions.length;
  }

  public get latestResponseDate(): string | null {
    return this.responses[0]?.respondedAt || null;
  }

  public clientName(entry: CheckinReportEntry): string {
    return entry.client ? `${entry.client.name} ${entry.client.lastname}`.trim() : 'Cliente';
  }

  public checkinFieldLabel(key: string): string {
    return CHECKIN_FIELDS_BY_KEY.get(key)?.label || key;
  }

  public checkinFieldUnit(key: string): string {
    return CHECKIN_FIELDS_BY_KEY.get(key)?.unit || '';
  }

  public valueEntries(entry: CheckinReportEntry): { key: string; value: number | string }[] {
    return Object.entries(entry.values || {}).map(([key, value]) => ({ key, value }));
  }

  public trackByResponseId(_index: number, entry: CheckinReportEntry): string {
    return entry._id;
  }
}
