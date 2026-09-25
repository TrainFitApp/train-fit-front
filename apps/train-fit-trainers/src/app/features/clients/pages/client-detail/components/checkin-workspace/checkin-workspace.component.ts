import { Component, DestroyRef, Input, OnChanges, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CheckinResponseEntry } from '../../models/client-detail.model';
import { CheckinAgendaData, CheckinComparisonRow, CheckinDay, CheckinEntry, CheckinSchedule, CheckinScheduleDraft, CheckinStatus, CheckinTemplateDefinition } from './checkin-workspace.model';
import { compareCheckins } from './checkin-comparison';
import { checkinCadenceLabel, checkinWeekLabel } from '../../../../checkin-labels.util';

function localDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
@Component({ selector: 'app-checkin-workspace', templateUrl: './checkin-workspace.component.html', styleUrls: ['./checkin-workspace.component.scss'] })
export class CheckinWorkspaceComponent implements OnChanges {
  @Input() clientId = '';
  private readonly http = inject(HttpService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private loadSubscription?: Subscription;
  public readonly today = localDate(new Date());
  public readonly weekdays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  public readonly statusLabels: Record<CheckinStatus, string> = { scheduled: 'Programado', open: 'Abierto', unanswered: 'Sin responder', responded: 'Por revisar', reviewed: 'Revisado' };
  public readonly statusIcons: Record<CheckinStatus, string> = { scheduled: 'calendar-outline', open: 'time-outline', unanswered: 'remove-circle-outline', responded: 'mail-unread-outline', reviewed: 'checkmark-circle-outline' };
  public month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  public monthLabel = '';
  public selectedDate = this.today;
  public days: CheckinDay[] = [];
  public state: 'loading' | 'loaded' | 'error' = 'loading';
  public error = '';
  public notice = '';
  public busy = false;
  public data: CheckinAgendaData | null = null;
  public scheduleFilter = '';
  public reviewOnly = false;
  public agenda: CheckinEntry[] = [];
  public selected: CheckinEntry | null = null;
  public referenceId = '';
  public references: CheckinEntry[] = [];
  public rows: CheckinComparisonRow[] = [];
  public trendResponses: CheckinResponseEntry[] = [];
  public readonly emptyQuestions = [];
  public showEvolution = false;
  public showSchedules = false;
  public comment = '';
  public templates: CheckinTemplateDefinition[] = [];
  public templatesState: 'loading' | 'loaded' | 'error' = 'loading';
  public editor: CheckinScheduleDraft | null = null;
  public editingId: string | null = null;

  public ngOnChanges(): void { if (this.clientId) { this.data = null; this.selected = null; this.load(); } }
  private get base(): string { return `trainer/clients/${encodeURIComponent(this.clientId)}`; }
  public load(): void {
    this.loadSubscription?.unsubscribe();
    this.state = 'loading';
    const from = localDate(new Date(this.month.getFullYear(), this.month.getMonth(), 1));
    const to = localDate(new Date(this.month.getFullYear(), this.month.getMonth() + 1, 0));
    this.loadSubscription = this.http.get<CheckinAgendaData>(`${this.base}/checkin-agenda?from=${from}&to=${to}`)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: data => { this.data = data; this.state = 'loaded'; this.rebuild(); },
        error: () => { this.state = 'error'; },
      });
  }
  public changeMonth(delta: number): void { this.month = new Date(this.month.getFullYear(), this.month.getMonth() + delta, 1); this.selectedDate = localDate(this.month); this.selected = null; this.load(); }
  public goToday(): void { const now = new Date(); this.month = new Date(now.getFullYear(), now.getMonth(), 1); this.selectedDate = this.today; this.reviewOnly = false; this.load(); }
  // La fecha ya viene como día de calendario: sin zona horaria que traducir
  // (docs/plan-semanas.md).
  public dateOf(entry: CheckinEntry): string { return entry.date; }
  public formatDate(value: string | null | undefined): string { return value ? new Date(value).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'; }
  public formatDay(value: string | null | undefined): string { return value ? new Date(`${value}T00:00:00Z`).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) : '—'; }
  public formatTime(entry: CheckinEntry): string { return entry.time; }
  public weekLabel(entry: CheckinEntry): string {
    return checkinWeekLabel(entry.week);
  }
  public cadence(schedule: CheckinScheduleDraft): string {
    return checkinCadenceLabel(schedule);
  }
  public rebuild(): void {
    const entries = (this.data?.entries || []).filter(e => !this.scheduleFilter || e.scheduleId === this.scheduleFilter);
    this.monthLabel = this.month.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    const first = new Date(this.month); first.setDate(1 - (first.getDay() + 6) % 7);
    this.days = Array.from({ length: 42 }, (_, i) => {
      const day = new Date(first); day.setDate(first.getDate() + i);
      const date = localDate(day); const matches = entries.filter(e => this.dateOf(e) === date);
      const statuses = [...new Set(matches.map(e => e.status))];
      return { date, number: day.getDate(), currentMonth: day.getMonth() === this.month.getMonth(), count: matches.length, statuses,
        label: `${day.toLocaleDateString('es-ES', { dateStyle: 'long' })}. ${matches.length ? matches.map(e => `${e.name}: ${this.statusLabels[e.status]}`).join('. ') : 'Sin check-ins'}` };
    });
    this.agenda = (this.reviewOnly ? (this.data?.responses || []).filter(e => e.status === 'responded') : entries.filter(e => this.dateOf(e) === this.selectedDate))
      .filter(e => !this.scheduleFilter || e.scheduleId === this.scheduleFilter).sort((a, b) => a.date.localeCompare(b.date));
    const previousId = this.selected?._id;
    const current = this.agenda.find(e => e._id === previousId) || this.agenda[0] || null;
    this.selectEntry(current);
  }
  public chooseDay(day: CheckinDay): void {
    if (this.editor) { this.editor.startDate = day.date; return; }
    this.reviewOnly = false; this.selectedDate = day.date; this.selected = null;
    if (!day.currentMonth) { this.month = new Date(day.date + 'T12:00:00'); this.month.setDate(1); this.load(); } else this.rebuild();
  }
  public selectEntry(entry: CheckinEntry | null): void {
    if (this.selected?._id !== entry?._id) { this.comment = entry?.reviewComment || ''; this.referenceId = ''; }
    this.selected = entry;
    const history = (this.data?.responses || []).filter(r => r.scheduleId === entry?.scheduleId && r.respondedAt && r._id !== entry?._id);
    this.references = history.sort((a, b) => (b.respondedAt || '').localeCompare(a.respondedAt || ''));
    if (!this.references.some(r => r._id === this.referenceId)) this.referenceId = this.references.find(r => (r.respondedAt || '') < (entry?.respondedAt || ''))?._id || '';
    this.updateComparison();
    this.trendResponses = [...(entry?.respondedAt ? [entry] : []), ...history].filter((r): r is CheckinEntry & { respondedAt: string } => !!r.respondedAt).map(r => ({ _id: r._id, respondedAt: r.respondedAt, values: r.values || {} }));
  }
  public updateComparison(): void { this.rows = this.selected?.respondedAt ? compareCheckins(this.selected, this.references.find(r => r._id === this.referenceId) || null) : []; }
  public async openEditor(schedule?: CheckinSchedule): Promise<void> {
    this.error = ''; this.editingId = schedule?._id || null;
    this.editor = schedule ? { ...schedule } : {
      name: '', sourceTemplateId: null,
      startDate: this.selectedDate < this.today ? this.today : this.selectedDate,
      time: '09:00', frequency: 'weekly', interval: 1,
    };
    if (!schedule) await this.loadTemplates();
  }
  public async loadTemplates(): Promise<void> {
    this.templatesState = 'loading';
    try { this.templates = await firstValueFrom(this.http.get<CheckinTemplateDefinition[]>('trainer/checkin-templates')); this.templatesState = 'loaded'; }
    catch { this.templatesState = 'error'; }
  }
  public chooseTemplate(id: string): void { if (this.editor) { this.editor.sourceTemplateId = id; this.editor.name = this.templates.find(t => t._id === id)?.name || ''; } }
  public async save(): Promise<void> {
    if (!this.editor || this.busy) return;
    const draft = { ...this.editor };
    await this.mutate(() => this.editingId ? firstValueFrom(this.http.put(`${this.base}/checkin-schedules/${this.editingId}`, draft)) : firstValueFrom(this.http.post(`${this.base}/checkin-schedules`, draft)), 'Programación guardada', () => { this.editor = null; });
  }
  public async setActive(schedule: CheckinSchedule): Promise<void> {
    await this.mutate(() => firstValueFrom(this.http.patch(`${this.base}/checkin-schedules/${schedule._id}/active`, { active: !schedule.active })), schedule.active ? 'Programación pausada' : 'Programación reanudada');
  }
  // Quitar la programación: las respuestas ya dadas se quedan (son historial
  // del cliente, no de la programación).
  public async remove(schedule: CheckinSchedule): Promise<void> {
    await this.mutate(() => firstValueFrom(this.http.delete(`${this.base}/checkin-schedules/${schedule._id}`)), 'Programación eliminada');
  }
  public async review(): Promise<void> {
    if (!this.selected?.responseId || this.selected.status !== 'responded') return;
    await this.mutate(() => firstValueFrom(this.http.post(`${this.base}/checkin-responses/${this.selected!.responseId}/review`, { comment: this.comment })), 'Respuesta revisada. El comentario está disponible para el cliente');
  }
  private async mutate(action: () => Promise<unknown>, message: string, done?: () => void): Promise<void> {
    if (this.busy) return; this.busy = true; this.error = ''; this.notice = '';
    try { await action(); done?.(); this.notice = message; this.load(); }
    catch (error: unknown) { this.error = (error as { error?: { message?: string } })?.error?.message || 'No se pudo guardar el cambio. Inténtalo de nuevo.'; }
    finally { this.busy = false; }
  }
  public editSelected(): void { const schedule = this.data?.schedules.find(s => s._id === this.selected?.scheduleId); if (schedule) void this.openEditor(schedule); }
  public manageTemplates(): void { void this.router.navigate(['/tabs/checkin-templates']); }
  public trackId(_index: number, item: { _id: string }): string { return item._id; }
  public trackDay(_index: number, item: CheckinDay): string { return item.date; }
  public trackRow(_index: number, item: CheckinComparisonRow): string { return item.key; }
}
