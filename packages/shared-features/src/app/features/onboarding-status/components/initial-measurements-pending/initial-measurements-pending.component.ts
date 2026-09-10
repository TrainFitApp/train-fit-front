import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  InitialMeasurementConflict, InitialMeasurementDefinition, InitialMeasurementDraft,
  InitialMeasurementsState, PendingInitialMeasurements, deviceTimeZone,
  initialMeasurementConflicts, newIntakeRequestId, todayInTimeZone, validateInitialMeasurements,
} from '../../models/initial-measurements';
import { InitialMeasurementsApiService } from '../../services/initial-measurements-api.service';
import { IntakeDraftService } from '../../services/intake-draft.service';
import { InitialMeasurementsEditorComponent } from '../initial-measurements-editor/initial-measurements-editor.component';
import { MeasurementConflictComponent } from '../measurement-conflict/measurement-conflict.component';

interface CompletionDraft {
  rows: InitialMeasurementDraft[];
  requestId: string;
  signature: string;
}

/** Aviso persistente, sin notificaciones repetidas ni otro cuestionario completo. */
@Component({
  selector: 'app-initial-measurements-pending',
  standalone: true,
  imports: [CommonModule, IonicModule, InitialMeasurementsEditorComponent, MeasurementConflictComponent],
  templateUrl: './initial-measurements-pending.component.html',
  styleUrls: ['./initial-measurements-pending.component.scss'],
})
export class InitialMeasurementsPendingComponent implements OnInit, OnDestroy {
  public items: PendingInitialMeasurements[] = [];
  public listError = false;
  public selected: PendingInitialMeasurements | null = null;
  public state: InitialMeasurementsState | null = null;
  public loading = false;
  public saving = false;
  public error = '';
  public success = '';
  public rows: InitialMeasurementDraft[] = [];
  public definitions: InitialMeasurementDefinition[] = [];
  public errors: Record<string, string> = {};
  public missing: InitialMeasurementDefinition[] = [];
  public conflicts: InitialMeasurementConflict[] = [];
  public showMissing = false;
  private readonly timeZone = deviceTimeZone();
  private draftKey = '';
  private requestId = '';
  private signature = '';
  private listRequest: Subscription | null = null;
  private detailRequest: Subscription | null = null;

  public get today(): string { return todayInTimeZone(this.timeZone); }

  constructor(
    private readonly api: InitialMeasurementsApiService,
    private readonly drafts: IntakeDraftService,
    private readonly auth: AuthService,
  ) {}

  public ngOnInit(): void { this.refresh(); }
  public ngOnDestroy(): void {
    this.listRequest?.unsubscribe();
    this.detailRequest?.unsubscribe();
  }

  /** El contenedor Ionic lo llama al volver al perfil. */
  public refresh(): void {
    this.listRequest?.unsubscribe();
    this.listError = false;
    if (!this.auth.user?.roles?.includes('user')) {
      this.items = [];
      return;
    }
    this.listRequest = this.api.pending().subscribe({
      next: ({ items }) => { this.items = (items || []).filter((item) => item.missingFields.length > 0); },
      error: (error: { status?: number }) => {
        this.items = [];
        this.listError = error.status !== 404;
      },
    });
  }

  public open(item: PendingInitialMeasurements): void {
    if (this.saving) return;
    this.selected = item;
    this.state = null;
    this.error = '';
    this.success = '';
    this.conflicts = [];
    this.showMissing = false;
    this.load();
  }

  public load(): void {
    if (!this.selected) return;
    const item = this.selected;
    this.loading = true;
    this.error = '';
    this.detailRequest?.unsubscribe();
    this.detailRequest = this.api.get(item.trainerId).subscribe({
      next: (state) => {
        if (this.selected !== item) return;
        this.state = state;
        this.definitions = state.catalog.filter((definition) => state.missingFields.includes(definition.key));
        this.draftKey = this.drafts.key('measurements', item.trainerId, state.stageId);
        const draft = this.drafts.read<CompletionDraft>(this.draftKey);
        this.rows = (draft?.rows || []).filter((row) => state.missingFields.includes(row.field));
        this.requestId = draft?.requestId || newIntakeRequestId();
        this.signature = draft?.signature || '';
        this.errors = {};
        this.loading = false;
      },
      error: () => {
        if (this.selected !== item) return;
        this.loading = false;
        this.error = 'No se pudieron cargar las medidas pendientes. Reintenta; tu borrador se conserva.';
      },
    });
  }

  public changeRows(rows: InitialMeasurementDraft[]): void {
    this.rows = rows;
    this.errors = {};
    this.error = '';
    this.conflicts = [];
    this.showMissing = false;
    this.saveDraft();
  }

  public close(): void {
    if (this.saving) return;
    this.selected = null;
    this.detailRequest?.unsubscribe();
  }

  public submit(acknowledgeMissing = false): void {
    if (!this.selected || !this.state || this.saving) return;
    const validation = validateInitialMeasurements(this.definitions, this.rows, this.today);
    this.errors = validation.errors;
    this.missing = validation.missing;
    if (Object.keys(validation.errors).length) return;
    if (!validation.values.length) {
      this.error = 'Añade o confirma al menos una de las medidas solicitadas.';
      return;
    }
    if (validation.missing.length && !acknowledgeMissing) {
      this.showMissing = true;
      return;
    }
    const payload = { measurements: validation.values, timeZone: this.timeZone, missingMeasurementsAcknowledged: acknowledgeMissing };
    const signature = JSON.stringify(payload);
    if (this.signature && this.signature !== signature) this.requestId = newIntakeRequestId();
    this.signature = signature;
    this.saveDraft();
    this.saving = true;
    this.error = '';
    this.showMissing = false;
    this.api.complete(this.selected.trainerId, { ...payload, requestId: this.requestId }).subscribe({
      next: () => {
        this.saving = false;
        this.drafts.clear(this.draftKey);
        this.selected = null;
        this.success = 'Medidas iniciales guardadas con sus fechas.';
        this.refresh();
      },
      error: (error: { error?: { message?: string } }) => {
        this.saving = false;
        this.error = error.error?.message || 'No se pudieron guardar las medidas. Conservamos tu borrador; puedes reintentar.';
        this.conflicts = initialMeasurementConflicts(error, validation.values, this.definitions);
      },
    });
  }

  public confirmConflict(): void {
    this.rows = this.rows.map((row) => {
      const conflict = this.conflicts.find((item) => item.field === row.field);
      return conflict ? { ...row, confirmedExisting: false, expectedValue: conflict.currentValue } : row;
    });
    this.conflicts = [];
    this.submit(true);
  }

  public trackByTrainerId(_index: number, item: PendingInitialMeasurements): string { return item.trainerId; }

  private saveDraft(): void {
    this.drafts.save(this.draftKey, { rows: this.rows, requestId: this.requestId, signature: this.signature });
  }
}
