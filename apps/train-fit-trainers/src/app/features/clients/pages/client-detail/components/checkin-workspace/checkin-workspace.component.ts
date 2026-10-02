import { Component, DestroyRef, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ConfirmSheetComponent } from 'src/app/shared/components/confirm-sheet/confirm-sheet.component';
import { CheckinResponseEntry } from '../../models/client-detail.model';
import { CheckinAgendaData, CheckinComparisonRow, CheckinDay, CheckinEntry, CheckinSchedule, CheckinScheduleDraft, CheckinStatus, CheckinSummary, CheckinTemplateDefinition, ComparisonTab } from './checkin-workspace.model';
import { compareCheckins, tabsFor } from './checkin-comparison';
import { checkinCadenceLabel, checkinWeekLabel } from '../../../../checkin-labels.util';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

function localDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function localTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}
@Component({ selector: 'app-checkin-workspace', templateUrl: './checkin-workspace.component.html', styleUrls: ['./checkin-workspace.component.scss'] })
export class CheckinWorkspaceComponent implements OnChanges {
  private readonly translate = inject(TranslateService);

  @Input() clientId = '';
  // Plantilla con la que abrir "Nueva programación" (llega desde "Aplicar"
  // en Plantillas de check-in).
  @Input() templateToSchedule: string | null = null;
  // Respuesta que abrir al cargar (llega desde la bandeja «Por revisar»).
  @Input() focusResponseId: string | null = null;
  private pendingFocusId: string | null = null;
  // "Ver historial": la pila de paneles (programaciones → histórico de una)
  // la monta client-detail.page.ts, igual que desde el chip de la fase.
  @Output() openHistory = new EventEmitter<void>();
  private readonly http = inject(HttpService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ionicUtilService = inject(IonicUtilService);
  private loadSubscription?: Subscription;
  private summarySubscription?: Subscription;
  public readonly today = localDate(new Date());
  public readonly weekdays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  public readonly statusLabels: Record<CheckinStatus, string> = { scheduled: this.translate.instant('CLIENTS.PROGRAMADO'), open: this.translate.instant('CLIENTS.ABIERTO'), unanswered: this.translate.instant('CLIENTS.SIN_RESPONDER'), responded: this.translate.instant('CLIENTS.POR_REVISAR'), reviewed: this.translate.instant('MY_CHECKINS.REVIEWED') };
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
  // "Check-ins programados" es configuración, no historial: una "una sola
  // vez" cuya fecha ya llegó no tiene nada que gestionar ahí (sigue en el
  // calendario y en las respuestas). Precalculado en rebuild(), nunca un
  // getter: un array nuevo en cada ciclo de detección ya colgó esta app.
  public visibleSchedules: CheckinSchedule[] = [];
  // Abre en "Esperan tu respuesta": es la pregunta diaria del entrenador.
  public reviewOnly = true;
  public agenda: CheckinEntry[] = [];
  public selected: CheckinEntry | null = null;
  public referenceId = '';
  public references: CheckinEntry[] = [];
  public rows: CheckinComparisonRow[] = [];
  // La revisión se parte en pestañas por dato (Peso, Perímetros…). Solo las
  // que este check-in responde; filas de la activa precalculadas.
  public comparisonTabs: { key: ComparisonTab; label: string; count: number }[] = [];
  public selectedComparisonTab: ComparisonTab | null = null;
  public visibleRows: CheckinComparisonRow[] = [];
  public trendResponses: CheckinResponseEntry[] = [];
  public readonly emptyQuestions = [];
  public showEvolution = false;
  public comment = '';
  public templates: CheckinTemplateDefinition[] = [];
  public templatesState: 'loading' | 'loaded' | 'error' = 'loading';
  public editor: CheckinScheduleDraft | null = null;
  public editingId: string | null = null;
  // De dónde salen las preguntas: una plantilla o campos sueltos del
  // catálogo. Excluyentes para el back (checkin-agenda-controller.js).
  public sourceMode: 'template' | 'fields' = 'template';
  // "Cómo va el seguimiento": abiertas y cerradas sin responder del rango.
  public summaryDays = 90;
  public summary: CheckinSummary | null = null;
  public summaryState: 'loading' | 'loaded' | 'error' = 'loading';
  // "Pedir algo puntual": una programación "una sola vez" de hoy.
  public showPuntual = false;
  public puntualFields: string[] = [];

  // Pendiente de enseñar el editor abierto por templateToSchedule cuando la
  // agenda termine de cargar (el formulario vive dentro de ella).
  private scrollToEditorOnLoad = false;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['focusResponseId'] && this.focusResponseId) this.pendingFocusId = this.focusResponseId;
    if (changes['clientId'] && this.clientId) { this.data = null; this.selected = null; this.load(); this.loadSummary(); }
    if (changes['templateToSchedule'] && this.templateToSchedule) void this.openEditorWithTemplate(this.templateToSchedule);
  }
  private async openEditorWithTemplate(templateId: string): Promise<void> {
    await this.openEditor();
    if (this.templates.some(t => t._id === templateId)) this.chooseTemplate(templateId);
    if (this.state === 'loaded') this.scrollToEditor(); else this.scrollToEditorOnLoad = true;
  }
  private scrollToEditor(): void {
    this.scrollToEditorOnLoad = false;
    setTimeout(() => this.host.nativeElement.querySelector('.schedule-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
  private get base(): string { return `trainer/clients/${encodeURIComponent(this.clientId)}`; }
  public load(): void {
    this.loadSubscription?.unsubscribe();
    this.state = 'loading';
    const from = localDate(new Date(this.month.getFullYear(), this.month.getMonth(), 1));
    const to = localDate(new Date(this.month.getFullYear(), this.month.getMonth() + 1, 0));
    this.loadSubscription = this.http.get<CheckinAgendaData>(`${this.base}/checkin-agenda?from=${from}&to=${to}`)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: data => { this.data = data; this.state = 'loaded'; this.rebuild(); if (this.scrollToEditorOnLoad) this.scrollToEditor(); },
        error: () => { this.state = 'error'; },
      });
  }
  public loadSummary(): void {
    this.summarySubscription?.unsubscribe();
    this.summaryState = 'loading';
    this.summarySubscription = this.http.get<CheckinSummary>(`${this.base}/checkin-summary?days=${this.summaryDays}`)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: summary => { this.summary = summary; this.summaryState = 'loaded'; },
        error: () => { this.summaryState = 'error'; },
      });
  }
  public changeSummaryDays(days: number): void { if (days !== this.summaryDays) { this.summaryDays = days; this.loadSummary(); } }
  public changeMonth(delta: number): void { this.month = new Date(this.month.getFullYear(), this.month.getMonth() + delta, 1); this.selectedDate = localDate(this.month); this.selected = null; this.load(); }
  public goToday(): void { const now = new Date(); this.month = new Date(now.getFullYear(), now.getMonth(), 1); this.selectedDate = this.today; this.reviewOnly = false; this.load(); }
  // La fecha ya viene como día de calendario: sin zona horaria que traducir
  // (docs/plan-semanas.md).
  public dateOf(entry: CheckinEntry): string { return entry.date; }
  public formatDate(value: string | null | undefined): string { return value ? new Date(value).toLocaleDateString(uiLocale(), { day: 'numeric', month: 'short', year: 'numeric' }) : '—'; }
  public formatDay(value: string | null | undefined): string { return value ? new Date(`${value}T00:00:00Z`).toLocaleDateString(uiLocale(), { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }) : '—'; }
  public formatTime(entry: CheckinEntry): string { return entry.time; }
  public weekLabel(entry: CheckinEntry): string {
    return checkinWeekLabel(entry.week);
  }
  public cadence(schedule: CheckinScheduleDraft): string {
    return checkinCadenceLabel(schedule);
  }
  public rebuild(): void {
    this.visibleSchedules = (this.data?.schedules || []).filter(s => !(s.frequency === 'once' && s.startDate <= this.today));
    const entries = (this.data?.entries || []).filter(e => !this.scheduleFilter || e.scheduleId === this.scheduleFilter);
    this.monthLabel = this.month.toLocaleDateString(uiLocale(), { month: 'long', year: 'numeric' });
    const first = new Date(this.month); first.setDate(1 - (first.getDay() + 6) % 7);
    this.days = Array.from({ length: 42 }, (_, i) => {
      const day = new Date(first); day.setDate(first.getDate() + i);
      const date = localDate(day); const matches = entries.filter(e => this.dateOf(e) === date);
      const statuses = [...new Set(matches.map(e => e.status))];
      return { date, number: day.getDate(), currentMonth: day.getMonth() === this.month.getMonth(), count: matches.length, statuses,
        label: `${day.toLocaleDateString(uiLocale(), { dateStyle: 'long' })}. ${matches.length ? matches.map(e => `${e.name}: ${this.statusLabels[e.status]}`).join('. ') : this.translate.instant('CLIENTS.SIN_CHECK_INS')}` };
    });
    this.agenda = (this.reviewOnly ? (this.data?.responses || []).filter(e => e.status === 'responded') : entries.filter(e => this.dateOf(e) === this.selectedDate))
      .filter(e => !this.scheduleFilter || e.scheduleId === this.scheduleFilter).sort((a, b) => a.date.localeCompare(b.date));
    const previousId = this.selected?._id;
    // La respuesta pedida manda solo en la primera carga; después, la que
    // el entrenador tenga abierta. Si ya estaba revisada, se busca fuera de
    // «Esperan tu respuesta».
    const focusId = this.data ? this.pendingFocusId : null;
    if (focusId) this.pendingFocusId = null;
    const focused = focusId ? this.findResponse(focusId) : null;
    const current = focused || this.agenda.find(e => e._id === previousId) || this.agenda[0] || null;
    this.selectEntry(current);
    if (focused) setTimeout(() => this.host.nativeElement.querySelector('.review-panel, .response-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
  private findResponse(id: string): CheckinEntry | null {
    const match = (entry: CheckinEntry) => entry.responseId === id || entry._id === id;
    const inAgenda = this.agenda.find(match);
    if (inAgenda) return inAgenda;
    const response = (this.data?.responses || []).find(match);
    if (!response) return null;
    // Revisada: se enseña su día en el calendario, no la lista de pendientes.
    this.reviewOnly = false;
    this.selectedDate = response.date;
    this.agenda = [response];
    return response;
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
  public updateComparison(): void {
    this.rows = this.selected?.respondedAt ? compareCheckins(this.selected, this.references.find(r => r._id === this.referenceId) || null) : [];
    this.comparisonTabs = tabsFor(this.rows);
    // Se conserva la pestaña abierta al cambiar de referencia; si ya no tiene
    // datos, la primera (Peso gana cuando está).
    if (!this.comparisonTabs.some(tab => tab.key === this.selectedComparisonTab)) this.selectedComparisonTab = this.comparisonTabs[0]?.key || null;
    this.chooseComparisonTab(this.selectedComparisonTab);
  }
  // Respuesta de referencia elegida (para la pestaña de fotos).
  public get referenceEntry(): CheckinEntry | null {
    return this.references.find(r => r._id === this.referenceId) || null;
  }
  // Id del día de fotos con el que se respondió (campo progress_photos).
  public photosDayOf(entry: CheckinEntry | null): string | null {
    const value = entry?.values?.['progress_photos'];
    return typeof value === 'string' ? value : null;
  }
  public chooseComparisonTab(tab: ComparisonTab | null): void {
    this.selectedComparisonTab = tab;
    this.visibleRows = this.rows.filter(row => row.tab === tab);
  }
  public async openEditor(schedule?: CheckinSchedule): Promise<void> {
    this.error = ''; this.editingId = schedule?._id || null;
    this.sourceMode = schedule && !schedule.sourceTemplateId ? 'fields' : 'template';
    this.editor = schedule ? { ...schedule, enabledFields: [...(schedule.enabledFields || [])] } : {
      name: '', sourceTemplateId: null, enabledFields: [],
      startDate: this.selectedDate < this.today ? this.today : this.selectedDate,
      time: '09:00', frequency: 'weekly', interval: 1,
    };
    await this.loadTemplates();
  }
  public async loadTemplates(): Promise<void> {
    this.templatesState = 'loading';
    try { this.templates = await firstValueFrom(this.http.get<CheckinTemplateDefinition[]>('trainer/checkin-templates')); this.templatesState = 'loaded'; }
    catch { this.templatesState = 'error'; }
  }
  public chooseTemplate(id: string): void { if (this.editor) { this.editor.sourceTemplateId = id; this.editor.name = this.templates.find(t => t._id === id)?.name || ''; } }
  public chooseSourceMode(mode: 'template' | 'fields'): void { this.sourceMode = mode; }
  public setDraftFields(fields: string[]): void { if (this.editor) this.editor.enabledFields = fields; }
  public get canSave(): boolean {
    if (!this.editor || this.busy) return false;
    return this.sourceMode === 'template' ? !!this.editor.sourceTemplateId : !!this.editor.enabledFields?.length;
  }
  public async save(): Promise<void> {
    if (!this.editor || !this.canSave) return;
    // Solo las preguntas del modo visible: al editar, mandar la misma
    // plantilla no la vuelve a copiar (ver checkin-agenda-controller.js).
    const { name, startDate, time, frequency, interval, revision, sourceTemplateId, enabledFields } = this.editor;
    const body = { name, startDate, time, frequency, interval, revision, ...(this.sourceMode === 'fields' ? { enabledFields } : { sourceTemplateId }) };
    await this.mutate(() => this.editingId ? firstValueFrom(this.http.put(`${this.base}/checkin-schedules/${this.editingId}`, body)) : firstValueFrom(this.http.post(`${this.base}/checkin-schedules`, body)), this.translate.instant('CLIENTS.PROGRAMACION_GUARDADA'), () => { this.editor = null; });
  }
  public async setActive(schedule: CheckinSchedule): Promise<void> {
    await this.mutate(() => firstValueFrom(this.http.patch(`${this.base}/checkin-schedules/${schedule._id}/active`, { active: !schedule.active })), schedule.active ? this.translate.instant('CLIENTS.PROGRAMACION_PAUSADA') : this.translate.instant('CLIENTS.PROGRAMACION_REANUDADA'));
  }
  // Sin cron que adelante la ocurrencia: el back crea una "una sola vez" de
  // hoy con las mismas preguntas, salvo que ya tenga una abierta sin responder.
  public async requestNow(schedule: CheckinSchedule): Promise<void> {
    await this.mutate(
      () => firstValueFrom(this.http.post<{ alreadyOpen?: boolean }>(`${this.base}/checkin-schedules/${schedule._id}/request`, {})),
      result => result?.alreadyOpen ? this.translate.instant('CLIENTS.YA_TIENE_ESTE_CHECK_IN') : this.translate.instant('CLIENTS.CHECK_IN_DISPONIBLE_PARA_EL')
    );
  }
  // Quitar la programación: las respuestas ya dadas se quedan (son historial
  // del cliente, no de la programación).
  public async remove(schedule: CheckinSchedule): Promise<void> {
    const res = await this.ionicUtilService.showModal({
      component: ConfirmSheetComponent,
      componentProps: {
        icon: 'trash-outline',
        iconColor: 'danger',
        title: this.translate.instant('CLIENTS.ELIMINAR', { name: schedule.name }),
        message: this.translate.instant('CLIENTS.DEJARAN_DE_PEDIRSE_SUS_CHECK'),
        confirmText: this.translate.instant('COMMON.DELETE'),
        cancelText: this.translate.instant('COMMON.CANCEL'),
        confirmColor: 'danger',
      },
      cssClass: 'confirm-sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
    if (res?.data !== true) return;
    await this.mutate(() => firstValueFrom(this.http.delete(`${this.base}/checkin-schedules/${schedule._id}`)), this.translate.instant('CLIENTS.PROGRAMACION_ELIMINADA'));
  }
  public openPuntual(): void { this.puntualFields = []; this.showPuntual = true; }
  public closePuntual(): void { this.showPuntual = false; }
  public setPuntualFields(fields: string[]): void { this.puntualFields = fields; }
  public async sendPuntual(): Promise<void> {
    if (!this.puntualFields.length) return;
    const now = new Date();
    const body = { name: this.translate.instant('CLIENTS.PETICION_PUNTUAL'), enabledFields: this.puntualFields, startDate: localDate(now), time: localTime(now), frequency: 'once', interval: 1 };
    await this.mutate(() => firstValueFrom(this.http.post(`${this.base}/checkin-schedules`, body)), this.translate.instant('CLIENTS.ENVIADO_TU_CLIENTE_YA_PUEDE'), () => { this.showPuntual = false; });
  }
  public async review(): Promise<void> {
    if (!this.selected?.responseId || this.selected.status !== 'responded') return;
    await this.mutate(() => firstValueFrom(this.http.post(`${this.base}/checkin-responses/${this.selected!.responseId}/review`, { comment: this.comment })), this.translate.instant('CLIENTS.RESPUESTA_REVISADA_EL_COMENTARIO_ESTA'));
  }
  private async mutate<T>(action: () => Promise<T>, message: string | ((result: T) => string), done?: () => void): Promise<void> {
    if (this.busy) return; this.busy = true; this.error = ''; this.notice = '';
    try {
      const result = await action(); done?.();
      this.notice = typeof message === 'string' ? message : message(result);
      this.load(); this.loadSummary();
    }
    catch (error: unknown) { this.error = (error as { error?: { message?: string } })?.error?.message || this.translate.instant('CLIENTS.NO_SE_PUDO_GUARDAR_EL'); }
    finally { this.busy = false; }
  }
  public editSelected(): void { const schedule = this.data?.schedules.find(s => s._id === this.selected?.scheduleId); if (schedule) void this.openEditor(schedule); }
  public manageTemplates(): void { void this.router.navigate(['/tabs/checkin-templates']); }
  public trackId(_index: number, item: { _id: string }): string { return item._id; }
  public trackDay(_index: number, item: CheckinDay): string { return item.date; }
  public trackRow(_index: number, item: CheckinComparisonRow): string { return item.key; }
  public trackTab(_index: number, item: { key: ComparisonTab }): string { return item.key; }
}
