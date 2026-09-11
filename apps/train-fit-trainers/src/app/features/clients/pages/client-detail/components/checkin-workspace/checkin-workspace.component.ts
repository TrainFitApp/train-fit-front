import { Component, DestroyRef, Input, OnChanges, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CheckinResponseEntry } from '../../models/client-detail.model';
import { CalendarCheckin, CheckinCalendarData, CheckinComparisonRow, CheckinDay, CheckinSchedule, CheckinScheduleDraft, CheckinStatus, CheckinTemplateDefinition, ComparisonTab } from './checkin-workspace.model';
import { compareCheckins, tabsFor } from './checkin-comparison';

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
  public readonly statusLabels: Record<CheckinStatus, string> = { scheduled: 'Programado', pending: 'Pendiente', unanswered: 'Sin responder', responded: 'Por revisar', reviewed: 'Revisado', cancelled: 'Cancelado', legacy: 'Histórico anterior' };
  public readonly statusIcons: Record<CheckinStatus, string> = { scheduled: 'calendar-outline', pending: 'time-outline', unanswered: 'remove-circle-outline', responded: 'mail-unread-outline', reviewed: 'checkmark-circle-outline', cancelled: 'close-circle-outline', legacy: 'archive-outline' };
  public month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  public monthLabel = '';
  public selectedDate = this.today;
  public days: CheckinDay[] = [];
  public state: 'loading' | 'loaded' | 'error' = 'loading';
  public error = '';
  public notice = '';
  public busy = false;
  public data: CheckinCalendarData | null = null;
  public scheduleFilter = '';
  // Fase 9c — "Check-ins programados" es una lista de configuración, no de
  // historial: una programación "una sola vez" que ya lanzó su única
  // solicitud (nextRunAt vuelve a null en cuanto se materializa, ver
  // checkin-calendar-service.js#materializeLocked) no tiene ya nada que
  // gestionar ahí y se queda ocupando sitio para siempre si no se filtra.
  // Precalculado en rebuild(), NO como getter: un getter que hace .filter()
  // en la plantilla devuelve un array nuevo cada ciclo de detección de
  // cambios, y eso ya colgó esta app dos veces (ver memoria del proyecto).
  public visibleSchedules: CheckinSchedule[] = [];
  // Abre por "Por revisar": es la pregunta diaria del entrenador. Antes
  // abría en el día seleccionado, que la mayoría de días no tiene nada.
  public reviewOnly = true;
  public agenda: CalendarCheckin[] = [];
  public selected: CalendarCheckin | null = null;
  public referenceId = '';
  public references: CalendarCheckin[] = [];
  public rows: CheckinComparisonRow[] = [];
  // Fase "pestañas por dato" — la revisión de un check-in se divide en
  // Peso / Composición corporal / Perímetros / Seguimiento del
  // entrenamiento / Bienestar / Comentario / Tus preguntas. Solo se listan
  // las que tienen algo que enseñar en ESTE check-in (tabsFor ya filtra),
  // así que un check-in de solo medidas no arrastra pestañas vacías.
  public comparisonTabs: { key: ComparisonTab; label: string; count: number }[] = [];
  public selectedComparisonTab: ComparisonTab | null = null;
  public get visibleComparisonRows(): CheckinComparisonRow[] {
    return this.rows.filter(row => row.tab === this.selectedComparisonTab);
  }
  public chooseComparisonTab(tab: ComparisonTab): void { this.selectedComparisonTab = tab; }
  public trendResponses: CheckinResponseEntry[] = [];
  public readonly emptyQuestions = [];
  public showEvolution = false;
  public comment = '';
  public templates: CheckinTemplateDefinition[] = [];
  public templatesState: 'loading' | 'loaded' | 'error' = 'loading';
  public editor: CheckinScheduleDraft | null = null;
  public editingId: string | null = null;
  // Fase 8 — solo importa al CREAR: de dónde salen las preguntas de la
  // programación nueva. Al editar, el formulario nunca vuelve a tocar
  // enabledFields (ver comentario en CheckinScheduleDraft), así que el modo
  // no se muestra ni se lee.
  public sourceMode: 'template' | 'fields' = 'template';
  private requestKeys = new Map<string, string>();

  public ngOnChanges(): void { if (this.clientId) { this.data = null; this.selected = null; this.load(); } }
  private get base(): string { return `trainer/clients/${encodeURIComponent(this.clientId)}`; }
  public load(): void {
    this.loadSubscription?.unsubscribe();
    this.state = 'loading';
    const from = localDate(new Date(this.month.getFullYear(), this.month.getMonth(), 1));
    const to = localDate(new Date(this.month.getFullYear(), this.month.getMonth() + 1, 0));
    this.loadSubscription = this.http.get<CheckinCalendarData>(`${this.base}/checkin-calendar?from=${from}&to=${to}`)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: data => { this.data = data; this.state = 'loaded'; if (!data.reviewCount) this.reviewOnly = false; this.rebuild(); },
        error: () => { this.state = 'error'; },
      });
  }
  public changeMonth(delta: number): void { this.month = new Date(this.month.getFullYear(), this.month.getMonth() + delta, 1); this.selectedDate = localDate(this.month); this.selected = null; this.load(); }
  public goToday(): void { const now = new Date(); this.month = new Date(now.getFullYear(), now.getMonth(), 1); this.selectedDate = this.today; this.reviewOnly = false; this.load(); }
  public dateOf(entry: CalendarCheckin): string {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: entry.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(entry.scheduledAt));
    const part = (type: string): string => parts.find(p => p.type === type)?.value || '';
    return `${part('year')}-${part('month')}-${part('day')}`;
  }
  public formatDate(value: string | null | undefined): string { return value ? new Date(value).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'; }
  public formatTime(entry: CalendarCheckin): string { return new Date(entry.scheduledAt).toLocaleTimeString('es-ES', { timeZone: entry.timeZone, hour: '2-digit', minute: '2-digit' }); }
  public cadence(schedule: CheckinScheduleDraft): string {
    const unit = schedule.frequency === 'daily' ? 'días' : schedule.frequency === 'weekly' ? 'semanas' : 'meses';
    if (schedule.frequency === 'once') return 'Una vez';
    if (schedule.frequency === 'weekly' && schedule.interval === 1) return `Cada ${new Date(schedule.startDate + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long' })}`;
    if (schedule.frequency === 'monthly' && schedule.interval === 1) return `Día ${Number(schedule.startDate.slice(-2))} de cada mes`;
    return schedule.interval === 1 ? 'Cada día' : `Cada ${schedule.interval} ${unit}`;
  }
  public rebuild(): void {
    this.visibleSchedules = (this.data?.schedules || []).filter(s => !(s.frequency === 'once' && !s.nextRunAt));
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
    this.agenda = (this.reviewOnly ? this.data?.pendingReviews || [] : entries.filter(e => this.dateOf(e) === this.selectedDate))
      .filter(e => !this.scheduleFilter || e.scheduleId === this.scheduleFilter).sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
    const previousId = this.selected?._id;
    const current = this.agenda.find(e => e._id === previousId) || this.agenda[0] || null;
    this.selectEntry(current);
  }
  public chooseDay(day: CheckinDay): void {
    if (this.editor) { this.editor.startDate = day.date; return; }
    this.reviewOnly = false; this.selectedDate = day.date; this.selected = null;
    if (!day.currentMonth) { this.month = new Date(day.date + 'T12:00:00'); this.month.setDate(1); this.load(); } else this.rebuild();
  }
  public selectEntry(entry: CalendarCheckin | null): void {
    if (this.selected?._id !== entry?._id) { this.comment = entry?.reviewComment || ''; this.referenceId = ''; }
    this.selected = entry;
    const history = (this.data?.responses || []).filter(r => r.scheduleId === entry?.scheduleId && r.respondedAt && r._id !== entry?._id);
    this.references = history.sort((a, b) => (b.respondedAt || '').localeCompare(a.respondedAt || ''));
    if (!this.references.some(r => r._id === this.referenceId)) this.referenceId = this.references.find(r => (r.respondedAt || '') < (entry?.respondedAt || ''))?._id || '';
    this.updateComparison();
    this.trendResponses = [...(entry?.respondedAt ? [entry] : []), ...history].filter((r): r is CalendarCheckin & { respondedAt: string } => !!r.respondedAt).map(r => ({ _id: r._id, respondedAt: r.respondedAt, values: r.values || {} }));
  }
  public updateComparison(): void {
    this.rows = this.selected?.respondedAt ? compareCheckins(this.selected, this.references.find(r => r._id === this.referenceId) || null) : [];
    this.comparisonTabs = tabsFor(this.rows);
    // Se conserva la pestaña activa si sigue teniendo datos (p. ej. al
    // cambiar la referencia de comparación sobre el mismo check-in); si no
    // existe ya o no había ninguna elegida, se abre en la primera de la
    // lista — que sigue el orden fijo de TAB_ORDER, así que "Peso" gana
    // cuando está presente.
    if (!this.comparisonTabs.some(tab => tab.key === this.selectedComparisonTab)) {
      this.selectedComparisonTab = this.comparisonTabs[0]?.key || null;
    }
  }
  public async openEditor(schedule?: CheckinSchedule): Promise<void> {
    this.error = ''; this.editingId = schedule?._id || null;
    this.sourceMode = 'template';
    this.editor = schedule ? { ...schedule } : {
      name: '', sourceTemplateId: null, enabledFields: [],
      startDate: this.selectedDate < this.today ? this.today : this.selectedDate,
      time: '09:00', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Madrid', frequency: 'weekly', interval: 1,
    };
    if (!schedule) await this.loadTemplates();
  }
  public async loadTemplates(): Promise<void> {
    this.templatesState = 'loading';
    try { this.templates = await firstValueFrom(this.http.get<CheckinTemplateDefinition[]>('trainer/checkin-templates')); this.templatesState = 'loaded'; }
    catch { this.templatesState = 'error'; }
  }
  public chooseTemplate(id: string): void { if (this.editor) { this.editor.sourceTemplateId = id; this.editor.name = this.templates.find(t => t._id === id)?.name || ''; } }
  // Fase 8a — elegir plantilla o elegir campos son alternativas EXCLUYENTES
  // para el backend (saveSchedule mira sourceTemplateId antes que
  // enabledFields): cambiar de modo limpia el otro camino para que no quede
  // un sourceTemplateId de una plantilla ya no visible en el formulario.
  public chooseSourceMode(mode: 'template' | 'fields'): void {
    this.sourceMode = mode;
    if (!this.editor) return;
    if (mode === 'fields') this.editor.sourceTemplateId = null;
    else this.editor.enabledFields = [];
  }
  public setDraftFields(fields: string[]): void { if (this.editor) this.editor.enabledFields = fields; }
  public get canSave(): boolean {
    if (!this.editor || this.busy) return false;
    if (this.editingId) return true;
    return this.sourceMode === 'template' ? !!this.editor.sourceTemplateId : !!this.editor.enabledFields?.length;
  }
  public async save(): Promise<void> {
    if (!this.editor || this.busy || !this.canSave) return;
    const draft = { ...this.editor };
    await this.mutate(() => this.editingId ? firstValueFrom(this.http.put(`${this.base}/checkin-schedules/${this.editingId}`, draft)) : firstValueFrom(this.http.post(`${this.base}/checkin-schedules`, draft)), 'Programación guardada', () => { this.editor = null; });
  }
  public async setActive(schedule: CheckinSchedule): Promise<void> {
    await this.mutate(() => firstValueFrom(this.http.patch(`${this.base}/checkin-schedules/${schedule._id}/active`, { active: !schedule.active })), schedule.active ? 'Programación pausada' : 'Programación reanudada');
  }
  public async requestNow(schedule: CheckinSchedule): Promise<void> {
    if (!this.requestKeys.has(schedule._id)) this.requestKeys.set(schedule._id, crypto.randomUUID());
    await this.mutate(() => firstValueFrom(this.http.post(`${this.base}/checkin-schedules/${schedule._id}/request`, { requestKey: this.requestKeys.get(schedule._id) })), 'Check-in disponible para el cliente', () => { this.requestKeys.delete(schedule._id); this.selectedDate = this.today; this.month = new Date(new Date().getFullYear(), new Date().getMonth(), 1); });
  }
  public async review(): Promise<void> {
    if (!this.selected || this.selected.status !== 'responded') return;
    await this.mutate(() => firstValueFrom(this.http.post(`${this.base}/checkin-requests/${this.selected!._id}/review`, { comment: this.comment })), 'Respuesta revisada. El comentario está disponible para el cliente');
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
  public trackTab(_index: number, item: { key: ComparisonTab }): string { return item.key; }
}
