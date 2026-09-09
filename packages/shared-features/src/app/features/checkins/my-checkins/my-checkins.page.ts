import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CHECKIN_FIELDS_BY_KEY,
  CheckinField,
  scaleLevelsFor,
} from 'src/app/core/constants/checkin-fields';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  CheckinCadence,
  CheckinHistoryEntry,
  FREQUENCY_OPTIONS,
  MyCheckinConfig,
  customQuestionKey,
  isCustomQuestionKey,
} from './models/my-checkin.model';
import { MyCheckinsApiService } from './services/my-checkins-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

const CADENCE_LABELS: Record<CheckinCadence, string> = {
  weekly: 'Semanal',
  biweekly: 'Quincenal',
  once: 'Una vez',
};

@Component({
  selector: 'app-my-checkins',
  templateUrl: 'my-checkins.page.html',
  styleUrls: ['my-checkins.page.scss'],
})
export class MyCheckinsPage implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private requestedId: string | null = null;
  public state: ViewState = 'loading';
  public configs: MyCheckinConfig[] = [];

  public expandedTrainerId: string | null = null;
  public formValues: Record<string, number | string | boolean | null> = {};
  public isSubmitting = false;
  public submittedTrainerIds = new Set<string>();

  // coach-tab FASE2 — "formularios completados".
  public history: CheckinHistoryEntry[] = [];
  public showHistory = false;

  constructor(
    private myCheckinsApi: MyCheckinsApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.requestedId = params.get('requestId');
      this.focusRequested();
    });
    this.load();
  }

  private focusRequested(): void {
    if (!this.requestedId) return;
    const pending = this.configs.find(c => c.requestId === this.requestedId);
    if (pending) { this.expandedTrainerId = this.configKey(pending); this.formValues = {}; }
    else this.showHistory = true;
  }

  public configKey(config: MyCheckinConfig): string { return config.requestId || config.trainerId; }

  // Antes volvía a '/tabs' (defaultHref del ion-back-button nativo que
  // sustituye este botón) — con el único punto de entrada ahora siendo la
  // tarjeta "Mis check-ins" del tab Coach (ver coach.page.html), atrás debe
  // volver ahí, no al tab por defecto.
  public close(): void {
    void this.router.navigate(['/tabs/coach']);
  }

  public load(): void {
    this.state = 'loading';
    this.myCheckinsApi.getMine().subscribe({
      next: (configs) => {
        // Fase 5 — un check-in compuesto SOLO de preguntas propias del coach
        // (sin ningún campo del catálogo) es perfectamente válido; antes
        // este filtro lo descartaba y el cliente no veía nada que responder.
        this.configs = (configs || []).filter(
          (c) => c.enabledFields?.length || c.customQuestions?.some((q) => q.enabled !== false)
        );
        this.state = 'loaded';
        this.focusRequested();
      },
      error: () => {
        this.state = 'error';
      },
    });

    // No bloquea el resto de la pantalla si falla, es una sección aparte.
    this.myCheckinsApi.getHistory().subscribe({
      next: (history) => (this.history = history || []),
      error: () => (this.history = []),
    });
  }

  public toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }

  public historyTrainerName(entry: CheckinHistoryEntry): string {
    if (!entry.trainer) return 'Un profesional';
    return `${entry.trainer.name} ${entry.trainer.lastname}`.trim();
  }

  // El enunciado de una pregunta propia no está en el catálogo: se busca en
  // las configuraciones cargadas. Si el coach la borró, se dice así en vez
  // de mostrar "custom:507f1f…" en el historial del cliente.
  public historyFieldLabel(key: string): string {
    if (isCustomQuestionKey(key)) {
      for (const config of this.configs) {
        const question = (config.customQuestions || []).find(
          (q) => customQuestionKey(q._id) === key
        );
        if (question) return question.label;
      }
      return 'Pregunta eliminada';
    }
    return CHECKIN_FIELDS_BY_KEY.get(key)?.label || key;
  }

  // Un booleano crudo se leería como "true"/"false" en el historial.
  public historyValueLabel(value: number | string | boolean): string {
    if (value === true) return 'Sí';
    if (value === false) return 'No';
    return String(value);
  }

  public historyEntries(entry: CheckinHistoryEntry): { label: string; value: string }[] {
    return Object.entries(entry.values).map(([key, value]) => ({
      label: entry.customQuestions?.find(q => customQuestionKey(q._id) === key)?.label || this.historyFieldLabel(key),
      value: this.historyValueLabel(value),
    }));
  }

  public trackByHistoryId(_index: number, entry: CheckinHistoryEntry): string {
    return entry._id;
  }

  public trainerName(config: MyCheckinConfig): string {
    if (!config.trainer) return 'Tu entrenador';
    return `${config.trainer.name} ${config.trainer.lastname}`.trim();
  }

  public cadenceLabel(config: MyCheckinConfig): string {
    if (config.requestId) return config.closesAt ? `Disponible hasta ${new Date(config.closesAt).toLocaleDateString('es-ES')}` : 'Solicitud puntual';
    return CADENCE_LABELS[config.cadence!] || config.cadence!;
  }

  // Los campos del catálogo y las preguntas propias del coach salen por la
  // misma lista: convertir las segundas a la forma de CheckinField deja que
  // la plantilla las pinte con el mismo código, en vez de duplicar todo el
  // formulario para un segundo tipo de pregunta.
  public fieldsFor(config: MyCheckinConfig): CheckinField[] {
    const catalogFields = config.enabledFields
      .map((key) => CHECKIN_FIELDS_BY_KEY.get(key))
      .filter((f): f is CheckinField => !!f);

    const customFields: CheckinField[] = (config.customQuestions || [])
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
    return `Entre ${field.min} y ${field.max}`;
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
  public missingRequiredLabel(config: MyCheckinConfig): string | null {
    for (const field of this.fieldsFor(config)) {
      if (!field.required) continue;
      const value = this.formValues[field.key];
      if (value === null || value === undefined || value === '') return field.label;
    }
    return null;
  }

  public toggleExpand(config: MyCheckinConfig): void {
    if (this.expandedTrainerId === this.configKey(config)) {
      this.expandedTrainerId = null;
      return;
    }
    this.expandedTrainerId = this.configKey(config);
    this.formValues = {};
  }

  // Acepta boolean además de number: sí/no reutiliza este mismo control de
  // botones que la escala 1-5, en vez de un tercer patrón de selección.
  public setScaleValue(key: string, value: number | boolean): void {
    this.formValues[key] = value;
  }

  public setTextValue(key: string, value: string): void {
    this.formValues[key] = value;
  }

  public hasAnyValue(): boolean {
    return Object.values(this.formValues).some((v) => v !== null && v !== undefined && v !== ('' as unknown));
  }

  public submitResponse(config: MyCheckinConfig): void {
    if (this.isSubmitting || !this.hasAnyValue()) return;

    const missing = this.missingRequiredLabel(config);
    if (missing) {
      this.ionicUtilService.showErrorToast(`"${missing}" es obligatoria`, 'Falta una respuesta', 3000);
      return;
    }

    // Cada tipo se envía en su propia forma. Antes todo lo que no era "text"
    // se casteaba con Number(); con los tipos de la Fase 5 eso convertiría
    // "Casa" en NaN y el campo se perdería en silencio.
    const values: Record<string, number | string | boolean> = {};
    for (const field of this.fieldsFor(config)) {
      const value = this.formValues[field.key];
      if (value === null || value === undefined || value === '') continue;

      if (field.type === 'text') {
        values[field.key] = String(value).trim();
      } else if (field.type === 'select' || field.type === 'frequency') {
        values[field.key] = String(value);
      } else if (field.type === 'yes_no') {
        values[field.key] = value === true || value === 'true';
      } else if (!Number.isNaN(Number(value))) {
        values[field.key] = Number(value);
      }
    }
    if (!Object.keys(values).length) return;

    this.isSubmitting = true;
    this.myCheckinsApi.respond(config.trainerId, values, config.requestId).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.expandedTrainerId = null;
        this.submittedTrainerIds.add(this.configKey(config));
        this.load();
        this.ionicUtilService.showToast({
          message: `Check-in enviado a ${this.trainerName(config)}`,
          duration: 3000,
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        this.ionicUtilService.showErrorToast(
          err?.error?.message || 'No se pudo enviar el check-in',
          'Error',
          3000
        );
      },
    });
  }

  public trackByTrainerId(_index: number, config: MyCheckinConfig): string {
    // NgFor ejecuta este callback sin el contexto de la página.
    return config.requestId || config.trainerId;
  }

  public trackByFieldKey(_index: number, field: CheckinField): string {
    return field.key;
  }
}
