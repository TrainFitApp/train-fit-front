import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  CHECKIN_FIELDS_BY_KEY,
  CheckinField,
  scaleLevelsFor,
} from 'src/app/core/constants/checkin-fields';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ConfirmSheetComponent } from 'src/app/shared/components/confirm-sheet/confirm-sheet.component';
import {
  CheckinHistoryEntry,
  MyCheckin,
  customQuestionKey,
  isCustomQuestionKey,
} from './models/my-checkin.model';
import { MyCheckinsApiService } from './services/my-checkins-api.service';
import { FREQUENCY_OPTIONS } from 'src/app/core/models/custom-question';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';

type ViewState = 'loading' | 'error' | 'loaded';

// wide: texto largo (comentarios) ocupa la fila entera de la rejilla en vez
// de estrangularse en media columna.
interface HistoryRow { label: string; value: string; wide: boolean }

@Component({
  selector: 'app-my-checkins',
  templateUrl: 'my-checkins.page.html',
  styleUrls: ['my-checkins.page.scss'],
})
export class MyCheckinsPage implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private requestedScheduleId: string | null = null;
  private returnUrl = '/tabs/coach';
  public state: ViewState = 'loading';
  public checkins: MyCheckin[] = [];

  public expandedTrainerId: string | null = null;
  public formValues: Record<string, number | string | boolean | null> = {};
  public isSubmitting = false;
  public submittedTrainerIds = new Set<string>();

  // coach-tab FASE2 — "formularios completados".
  public history: CheckinHistoryEntry[] = [];
  public showHistory = false;
  // Filas ya resueltas (etiqueta + valor) por respuesta. Se calculan una vez
  // al cargar, no en cada ciclo de detección de cambios: un array nuevo por
  // ciclo desde la plantilla hacía que *ngFor destruyese y recrease las
  // filas sin parar.
  private historyRows = new Map<string, HistoryRow[]>();
  private readonly translate = inject(TranslateService);

  constructor(
    private myCheckinsApi: MyCheckinsApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.requestedScheduleId = params.get('scheduleId');
      // Solo rutas internas absolutas: nada de '//host' ni URLs externas.
      const returnUrl = params.get('returnUrl');
      if (returnUrl?.startsWith('/') && !returnUrl.startsWith('//')) this.returnUrl = returnUrl;
      this.focusRequested();
    });
    this.load();
  }

  private focusRequested(): void {
    if (!this.requestedScheduleId) return;
    const pending = this.checkins.find((c) => c.scheduleId === this.requestedScheduleId);
    if (pending) {
      this.expandedTrainerId = this.checkinKey(pending);
      this.formValues = this.valuesOf(pending);
    } else {
      this.showHistory = true;
    }
  }

  public checkinKey(checkin: MyCheckin): string { return checkin._id; }

  // Lo ya respondido, para corregirlo sin volver a teclearlo todo mientras
  // la semana siga abierta. Sin responder, arranca con las medidas que ya
  // apuntó en el periodo (autorrelleno): el cliente revisa y envía.
  private valuesOf(checkin: MyCheckin): Record<string, number | string | boolean | null> {
    if (checkin.respondedAt) return { ...(checkin.values || {}) };
    const prefilled: Record<string, number> = {};
    for (const [key, { value }] of Object.entries(checkin.prefill || {})) prefilled[key] = value;
    return prefilled;
  }

  // Día de la medida que rellenó este campo, mientras el cliente no la cambie.
  public prefillDateFor(checkin: MyCheckin, key: string): string | null {
    const prefilled = checkin.prefill?.[key];
    if (!prefilled || checkin.respondedAt || this.formValues[key] !== prefilled.value) return null;
    return this.shortDay(prefilled.date);
  }

  // Aviso encima del formulario cuando se ha autorrellenado: cuántos campos
  // y de qué días son las medidas que apuntó el cliente.
  public prefillNotice(checkin: MyCheckin): string | null {
    const prefilled = Object.values(checkin.prefill || {});
    if (checkin.respondedAt || !prefilled.length) return null;
    const days = [...new Set(prefilled.map((p) => p.date))]
      .sort()
      .map((d) => this.translate.instant('MY_CHECKINS.ON_DAY', { day: this.shortDay(d) }));
    const when =
      days.length > 1
        ? `${days.slice(0, -1).join(', ')}${this.translate.instant('COACH.AND')}${days[days.length - 1]}`
        : days[0];
    const fields =
      prefilled.length === 1
        ? this.translate.instant('MY_CHECKINS.FIELDS_ONE')
        : this.translate.instant('MY_CHECKINS.FIELDS_COUNT', { count: prefilled.length });
    return this.translate.instant('MY_CHECKINS.PREFILL_NOTICE', { fields, when });
  }

  public cardIcon(checkin: MyCheckin): string {
    if (this.isDone(checkin)) return 'checkmark-circle';
    return checkin.week ? 'sync-circle' : 'calendar';
  }

  public isDone(checkin: MyCheckin): boolean {
    return this.submittedTrainerIds.has(this.checkinKey(checkin)) || !!checkin.respondedAt;
  }

  // Por defecto vuelve a la tarjeta "Mis check-ins" del tab Coach (ver
  // coach.page.html). Otros puntos de entrada (la tarjeta del check-in de
  // aviso en Dietas) pasan ?returnUrl para volver a donde estaban.
  public close(): void {
    void this.router.navigateByUrl(this.returnUrl);
  }

  public load(): void {
    this.state = 'loading';
    this.myCheckinsApi.getMine().subscribe({
      next: (checkins) => {
        // Fase 5 — un check-in compuesto SOLO de preguntas propias del coach
        // (sin ningún campo del catálogo) es perfectamente válido; antes
        // este filtro lo descartaba y el cliente no veía nada que responder.
        this.checkins = (checkins || []).filter(
          (c) => c.enabledFields?.length || c.customQuestions?.some((q) => q.enabled !== false)
        );
        this.state = 'loaded';
        this.buildHistoryRows();
        this.focusRequested();
      },
      error: () => {
        this.state = 'error';
      },
    });

    // No bloquea el resto de la pantalla si falla, es una sección aparte.
    this.myCheckinsApi.getHistory().subscribe({
      next: (history) => {
        this.history = history || [];
        this.buildHistoryRows();
      },
      error: () => (this.history = []),
    });
  }

  // Depende de configs (etiquetas de preguntas propias) y de history: se
  // recalcula cuando llega cualquiera de las dos.
  private buildHistoryRows(): void {
    this.historyRows = new Map(
      this.history.map((entry) => [
        entry._id,
        Object.entries(entry.values || {}).map(([key, value]) => {
          // Fotos: el valor es el id del día de fotos, no algo que leer.
          const text =
            CHECKIN_FIELDS_BY_KEY.get(key)?.type === 'photos'
              ? this.translate.instant('MEDIA.CHECKIN_HISTORY_SENT')
              : this.historyValueLabel(value);
          return {
            label:
              entry.customQuestions?.find((q) => customQuestionKey(q._id) === key)?.label ||
              this.historyFieldLabel(key),
            value: text,
            wide: text.length > 18,
          };
        }),
      ])
    );
  }

  public toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }

  // Cada respuesta pasada es un acordeón: 30 medidas desplegadas de golpe
  // por cada envío hacían la lista ilegible.
  public expandedHistoryId: string | null = null;

  public toggleHistoryEntry(entry: CheckinHistoryEntry): void {
    this.expandedHistoryId = this.expandedHistoryId === entry._id ? null : entry._id;
  }

  public historyTrainerName(entry: CheckinHistoryEntry): string {
    if (!entry.trainer) return this.translate.instant('ONBOARDING.A_PROFESSIONAL');
    return `${entry.trainer.name} ${entry.trainer.lastname}`.trim();
  }

  // El enunciado de una pregunta propia no está en el catálogo: se busca en
  // las configuraciones cargadas. Si el coach la borró, se dice así en vez
  // de mostrar "custom:507f1f…" en el historial del cliente.
  public historyFieldLabel(key: string): string {
    if (isCustomQuestionKey(key)) {
      for (const checkin of this.checkins) {
        const question = (checkin.customQuestions || []).find(
          (q) => customQuestionKey(q._id) === key
        );
        if (question) return question.label;
      }
      return this.translate.instant('MY_CHECKINS.QUESTION_DELETED');
    }
    return CHECKIN_FIELDS_BY_KEY.get(key)?.label || key;
  }

  // Un booleano crudo se leería como "true"/"false" en el historial.
  public historyValueLabel(value: number | string | boolean): string {
    if (value === true) return this.translate.instant('COMMON.YES');
    if (value === false) return this.translate.instant('COMMON.NO');
    return String(value);
  }

  public historyEntries(entry: CheckinHistoryEntry): HistoryRow[] {
    return this.historyRows.get(entry._id) || [];
  }

  public trackByHistoryId(_index: number, entry: CheckinHistoryEntry): string {
    return entry._id;
  }

  public trainerName(checkin: MyCheckin): string {
    if (!checkin.trainer) return this.translate.instant('MY_CHECKINS.YOUR_TRAINER');
    return `${checkin.trainer.name} ${checkin.trainer.lastname}`.trim();
  }

  // De qué periodo es este check-in: la semana de su fase de dieta si la
  // tiene, y hasta cuándo se puede responder.
  public periodLabel(checkin: MyCheckin): string {
    if (checkin.week) {
      const r = checkin.week;
      const fin = r.end ? ` – ${this.shortDay(r.end)}` : '';
      return `${this.translate.instant('COACH.WEEK_N', { n: r.number })} · ${this.shortDay(r.start)}${fin}`;
    }
    return checkin.closesDate
      ? this.translate.instant('MY_CHECKINS.PERIOD_RANGE', { from: this.shortDay(checkin.date), to: this.shortDay(checkin.closesDate) })
      : this.translate.instant('MY_CHECKINS.PERIOD_FROM', { from: this.shortDay(checkin.date) });
  }

  private shortDay(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString(uiLocale(), { day: 'numeric', month: 'short', timeZone: 'UTC' });
  }

  // Los campos del catálogo y las preguntas propias del coach salen por la
  // misma lista: convertir las segundas a la forma de CheckinField deja que
  // la plantilla las pinte con el mismo código, en vez de duplicar todo el
  // formulario para un segundo tipo de pregunta.
  public fieldsFor(checkin: MyCheckin): CheckinField[] {
    // El catálogo no marca obligatorios: lo decide el coach por plantilla
    // (requiredFields), igual que `required` en sus preguntas propias.
    const required = new Set(checkin.requiredFields || []);
    const catalogFields = checkin.enabledFields
      .map((key) => CHECKIN_FIELDS_BY_KEY.get(key))
      .filter((f): f is CheckinField => !!f)
      .map((f) => (required.has(f.key) ? { ...f, required: true } : f));

    const customFields: CheckinField[] = (checkin.customQuestions || [])
      .filter((question) => question.enabled !== false)
      .map((question) => ({
        key: customQuestionKey(question._id),
        label: question.label,
        type: question.type,
        unit: question.unit,
        options: question.options,
        required: question.required,
        // Una pregunta propia no se guarda en Anthropometry ni pertenece a
        // ningún grupo del catálogo: va con el resto del bienestar, que es
        // donde el formulario agrupa lo que no son medidas.
        group: 'bienestar',
        storage: 'wellbeing',
      }));

    return [...catalogFields, ...customFields];
  }

  public get frequencyOptions(): string[] {
    return FREQUENCY_OPTIONS;
  }

  // El catálogo trae min/max para validar en el backend (isPlausibleValue),
  // pero el cliente nunca los veía hasta enviar y que el servidor rechazara
  // el valor. Las preguntas propias del coach no declaran min/max (no hay
  // forma de fijarlos al crearlas) — placeholder vacío en ese caso, no un
  // rango inventado.
  public numberPlaceholder(field: CheckinField): string {
    if (field.min === undefined || field.max === undefined) return '';
    return this.translate.instant('MY_CHECKINS.BETWEEN', { min: field.min, max: field.max });
  }

  public optionsFor(field: CheckinField): string[] {
    return field.type === 'frequency' ? FREQUENCY_OPTIONS : field.options || [];
  }

  // Movimiento 2 Coach Pro — devuelve null (no []) cuando el campo no tiene
  // anclas, porque la plantilla lo usa con `as` para elegir entre el
  // selector de números pelados y el de frases; un array vacío pasaría el
  // truthy check y dejaría el control en blanco.
  //
  // Sin anclas se quedan las preguntas propias del coach: las escribe él, y
  // la app no puede inventarle qué significa su 3.
  public anchorsFor(field: CheckinField): string[] | null {
    return field.anchors?.length ? field.anchors : null;
  }

  // Niveles del selector numérico de respaldo. Se calculan en vez de
  // escribir [1,2,3,4,5] en la plantilla, que era donde el 5 estaba
  // realmente clavado.
  public levelsFor(field: CheckinField): number[] {
    const levels = scaleLevelsFor(field);
    const cacheKey = String(levels);
    // Misma referencia entre ciclos de detección de cambios: un array nuevo
    // en cada uno haría que *ngFor destruyese y recrease los botones sin
    // parar (mismo problema ya visto en clients.page.ts#reviewSummaries).
    if (!this.levelsCache.has(cacheKey)) {
      this.levelsCache.set(
        cacheKey,
        Array.from({ length: levels }, (_unused, index) => index + 1)
      );
    }
    return this.levelsCache.get(cacheKey) as number[];
  }

  private readonly levelsCache = new Map<string, number[]>();

  // Una obligatoria sin responder bloquea el envío. Se dice cuál falta en
  // vez de dejar un botón desactivado sin explicación.
  public missingRequiredLabel(checkin: MyCheckin): string | null {
    for (const field of this.fieldsFor(checkin)) {
      if (!field.required) continue;
      const value = this.formValues[field.key];
      if (value === null || value === undefined || value === '') return field.label;
    }
    return null;
  }

  public toggleExpand(checkin: MyCheckin): void {
    if (this.expandedTrainerId === this.checkinKey(checkin)) {
      this.expandedTrainerId = null;
      return;
    }
    this.expandedTrainerId = this.checkinKey(checkin);
    // Arranca con lo que ya respondió: mientras la semana siga abierta,
    // enviar otra vez es CORREGIR, no empezar de cero.
    this.formValues = this.valuesOf(checkin);
  }

  // Acepta boolean además de number: sí/no reutiliza este mismo control de
  // botones que la escala 1-5, en vez de un tercer patrón de selección.
  public setScaleValue(key: string, value: number | boolean): void {
    this.formValues[key] = value;
  }

  public setTextValue(key: string, value: string): void {
    this.formValues[key] = value;
  }

  public setPhotosValue(key: string, dayId: string | null): void {
    this.formValues[key] = dayId;
  }

  public hasAnyValue(): boolean {
    return Object.values(this.formValues).some((v) => v !== null && v !== undefined && v !== ('' as unknown));
  }

  public submitResponse(checkin: MyCheckin): void {
    if (this.isSubmitting || !this.hasAnyValue()) return;

    const missing = this.missingRequiredLabel(checkin);
    if (missing) {
      this.ionicUtilService.showErrorToast(
        this.translate.instant('MY_CHECKINS.REQUIRED_ANSWER', { label: missing }),
        this.translate.instant('MY_CHECKINS.MISSING_ONE'),
        3000
      );
      return;
    }

    // Cada tipo se envía en su propia forma. Antes todo lo que no era "text"
    // se casteaba con Number(); con los tipos de la Fase 5 eso convertiría
    // "Casa" en NaN y el campo se perdería en silencio.
    const values: Record<string, number | string | boolean> = {};
    for (const field of this.fieldsFor(checkin)) {
      const value = this.formValues[field.key];
      if (value === null || value === undefined || value === '') continue;

      if (field.type === 'text') {
        values[field.key] = String(value).trim();
      } else if (field.type === 'select' || field.type === 'frequency' || field.type === 'photos') {
        values[field.key] = String(value);
      } else if (field.type === 'yes_no') {
        values[field.key] = value === true || value === 'true';
      } else if (!Number.isNaN(Number(value))) {
        values[field.key] = Number(value);
      }
    }
    if (!Object.keys(values).length) return;

    // Una respuesta por check-in: mientras su periodo siga abierto, volver a
    // enviar lo CORRIGE. Se avisa antes, con la fecha de lo que se va a
    // pisar.
    if (checkin.respondedAt) {
      void this.confirmOverwrite(checkin).then((ok) => ok && this.send(checkin, values));
      return;
    }
    this.send(checkin, values);
  }

  private async confirmOverwrite(checkin: MyCheckin): Promise<boolean> {
    const when = checkin.updatedAt || checkin.respondedAt;
    const fecha = when ? new Date(when).toLocaleDateString(uiLocale(), { day: 'numeric', month: 'long' }) : null;
    const res = await this.ionicUtilService.showModal({
      component: ConfirmSheetComponent,
      componentProps: {
        icon: 'sync-circle-outline',
        iconColor: 'primary',
        title: checkin.week
          ? this.translate.instant('MY_CHECKINS.ALREADY_ANSWERED_WEEK', { n: checkin.week.number })
          : this.translate.instant('MY_CHECKINS.ALREADY_ANSWERED'),
        message: fecha
          ? this.translate.instant('MY_CHECKINS.OVERWRITE_DATED', { date: fecha })
          : this.translate.instant('MY_CHECKINS.OVERWRITE'),
        confirmText: this.translate.instant('MY_CHECKINS.UPDATE'),
        cancelText: this.translate.instant('COMMON.CANCEL'),
      },
      cssClass: 'confirm-sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
    return res.data === true;
  }

  private send(checkin: MyCheckin, values: Record<string, number | string | boolean>): void {
    this.isSubmitting = true;
    this.myCheckinsApi.respond(checkin.scheduleId, values).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.expandedTrainerId = null;
        this.submittedTrainerIds.add(this.checkinKey(checkin));
        this.load();
        this.ionicUtilService.showToast({
          message: this.translate.instant('MY_CHECKINS.SENT_TO', { name: this.trainerName(checkin) }),
          duration: 3000,
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || this.translate.instant('MY_CHECKINS.SUBMIT_ERROR'),
          this.translate.instant('COMMON.ERROR'),
          3000
        );
      },
    });
  }

  public trackByCheckinId(_index: number, checkin: MyCheckin): string {
    // NgFor ejecuta este callback sin el contexto de la página.
    return checkin._id;
  }

  public trackByFieldKey(_index: number, field: CheckinField): string {
    return field.key;
  }
}
