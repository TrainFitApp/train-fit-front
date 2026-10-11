import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { formatLocalNumber } from 'src/app/core/utils/local-number.util';
import { localIsoDate } from 'src/app/core/utils/local-date.util';
import { uiLocale } from 'src/app/core/i18n/localized-catalog';
import { TranslateDbPipe } from 'src/app/shared/pipes/translate-db.pipe';
import { ASSISTANT_ERROR_CODES } from '../assistant-catalog';
import { shiftIsoDay } from '../assistant-view.util';
import { AssistantLink, AssistantLine, AssistantMessage, AssistantSuggestion } from '../models/assistant.model';

const NUMBER_PARAMS = new Set([
  'kcal',
  'goalKcal',
  'goalProtein',
  'remaining',
  'grams',
  'from',
  'to',
  'count',
  'filled',
  'skipped',
  'days',
  'total',
  'min',
  'max',
  'protein',
  'carbs',
  'fat',
  'kg',
  'reps',
  'value',
  'oneRm',
  'percentage',
  'adherence',
  'alerts',
  'logged',
  'onTarget',
  'sets',
  'number',
  'level',
  'first',
  'last',
  'overdue',
  'extra',
  'target',
  'atp',
  'seats',
  'usage',
  'limit',
  'steps',
  'unread',
  'invalid',
  'done',
  'allowance',
]);
// Con un decimal (pesos, medidas y objetivos de hábito: 2,5 L); el resto, enteros.
const ONE_DECIMAL = new Set(['kg', 'value', 'oneRm', 'first', 'last', 'protein', 'carbs', 'fat', 'target']);
// Datos que son un valor de una lista cerrada, con su texto en ASSISTANT.<lista>.<valor>.
const VOCABULARY: Record<string, string> = {
  flag: 'ASSISTANT.FLAGS',
  measure: 'ASSISTANT.MEASURES',
  objective: 'ASSISTANT.OBJECTIVES',
  type: 'ASSISTANT.REVIEW_TYPES',
  sexKey: 'ASSISTANT.SEX',
  activity: 'ASSISTANT.ACTIVITY',
  lang: 'ASSISTANT.LANGS',
  theme: 'ASSISTANT.THEMES',
  tier: 'ASSISTANT.TIERS',
  habit: 'ASSISTANT.HABITS',
  frequency: 'ASSISTANT.FREQUENCIES',
  method: 'ASSISTANT.PAYMENT_METHODS',
  notification: 'ASSISTANT.NOTIFICATION_TYPES',
  timing: 'SUPPLEMENTS.TIMINGS',
};
// Días de calendario ("YYYY-MM-DD") que se cuentan como «hoy», «ayer»…
const DATE_PARAMS = new Set(['date', 'fromDate', 'toDate', 'since', 'startDate', 'dueDate']);
const MEAL_PARAMS = new Set(['meal', 'fromMeal', 'toMeal']);
// Nombres que vienen de la base (ejercicios, sesiones): traducidos como en el resto de la app.
const DB_PARAMS = new Set(['exercise', 'workout']);
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
const KNOWN_ERRORS = new Set(ASSISTANT_ERROR_CODES);

// El texto de lo que cuenta el asistente: cada mensaje es un código con sus
// datos (back), y aquí se pinta con su plantilla y los datos en el idioma del
// usuario (números, días, comidas y pantallas).
@Injectable({ providedIn: 'root' })
export class AssistantTextService {
  private readonly translate = inject(TranslateService);

  public number(value: unknown, decimals = 0): string {
    return formatLocalNumber(value, { minDecimals: 0, maxDecimals: decimals });
  }

  /** «hoy», «mañana», «ayer» o «lun 12 oct». */
  public day(iso: string): string {
    const today = localIsoDate();
    if (iso === today) return this.translate.instant('ASSISTANT.DAY.TODAY');
    if (iso === shiftIsoDay(today, 1)) return this.translate.instant('ASSISTANT.DAY.TOMORROW');
    if (iso === shiftIsoDay(today, -1)) return this.translate.instant('ASSISTANT.DAY.YESTERDAY');
    const date = new Date(`${iso}T12:00:00`);
    if (Number.isNaN(date.getTime())) return iso;
    return new Intl.DateTimeFormat(uiLocale(), { weekday: 'short', day: 'numeric', month: 'short' }).format(date);
  }

  /** «4 de marzo de 1992»: una fecha que no es de esta semana (nacimiento). */
  public fullDate(iso: string): string {
    const date = new Date(`${iso}T12:00:00`);
    if (!ISO_DAY.test(iso) || Number.isNaN(date.getTime())) return iso;
    return new Intl.DateTimeFormat(uiLocale(), { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  }

  public meal(slot: string): string {
    return this.translate.instant(`ASSISTANT.MEALS.${slot}`);
  }

  public screen(screen: string): string {
    return this.translate.instant(`ASSISTANT.SCREENS.${screen}`);
  }

  public message(message: AssistantMessage | null | undefined): string {
    if (!message?.code) return '';
    return this.render(`ASSISTANT.MESSAGES.${message.code}`, message.params, '');
  }

  /** Una línea de datos de un turno o de una vista previa. */
  public line(line: AssistantLine | null | undefined): string {
    if (!line?.code) return '';
    return this.render(`ASSISTANT.LINES.${line.code}`, line.params, this.translate.instant('ASSISTANT.UI.NONE'));
  }

  /** El texto de una sugerencia del momento. */
  public suggestion(suggestion: AssistantSuggestion): string {
    return this.render(`ASSISTANT.SUGGEST.${suggestion.code}`, suggestion.params, '');
  }

  // Cada dato en el idioma del usuario según lo que es (por su nombre).
  // `none`: lo que se pinta en lugar de un dato que no hay.
  private render(key: string, raw: Record<string, unknown> | undefined, none: string): string {
    const params: Record<string, unknown> = {};
    for (const [name, value] of Object.entries(raw || {})) params[name] = this.param(name, value, none);
    return String(this.translate.instant(key, params)).replace(/ {2,}/g, ' ').trim();
  }

  private param(name: string, value: unknown, none: string): unknown {
    if (name === 'rir') return this.rir(value);
    if (value === null || value === undefined || value === '') return none;
    if (DATE_PARAMS.has(name) && typeof value === 'string') return this.day(value);
    if ((name === 'from' || name === 'to') && typeof value === 'string' && ISO_DAY.test(value)) return this.day(value);
    if (MEAL_PARAMS.has(name) && typeof value === 'string') return this.meal(value);
    if (name === 'screen' && typeof value === 'string') return this.screen(value);
    if (DB_PARAMS.has(name) && typeof value === 'string') return new TranslateDbPipe(this.translate).transform(value);
    if (name === 'birthDate' && typeof value === 'string') return this.fullDate(value);
    if (VOCABULARY[name] && typeof value === 'string') return this.translate.instant(`${VOCABULARY[name]}.${value}`);
    if (name === 'scopes' && Array.isArray(value)) return value.map((scope) => this.translate.instant(`ASSISTANT.SCOPES.${scope}`)).join(', ');
    if (name === 'amount' && typeof value === 'number') return this.money(value);
    if (name === 'change' && typeof value === 'number') return `${value > 0 ? '+' : ''}${this.number(value, 1)}`;
    if (NUMBER_PARAMS.has(name) && typeof value === 'number') return this.number(value, ONE_DECIMAL.has(name) ? 1 : 0);
    return value;
  }

  // RIR de una serie: «· RIR 2», «· al fallo» (-1) o nada si no lo dijo.
  private rir(value: unknown): string {
    if (typeof value !== 'number') return '';
    if (value < 0) return this.translate.instant('ASSISTANT.UI.RIR_FAILURE');
    return this.translate.instant('ASSISTANT.UI.RIR', { rir: this.number(value) });
  }

  // Céntimos de euro a importe en el idioma del usuario.
  private money(cents: number): string {
    return new Intl.NumberFormat(uiLocale(), { style: 'currency', currency: 'EUR' }).format(cents / 100);
  }

  public link(link: AssistantLink): string {
    if (link.label?.text) return link.label.text;
    return link.label?.code ? this.translate.instant(`ASSISTANT.LINKS.${link.label.code}`) : '';
  }

  /** El error de una petición contado por la mascota. */
  public error(err: any): string {
    const code = err?.error?.code || err?.code;
    if (code && KNOWN_ERRORS.has(code)) {
      return this.translate.instant(`ASSISTANT.ERRORS.${code}`, {
        date: err?.energy?.resetsOn ? this.day(err.energy.resetsOn) : '',
      });
    }
    if (err?.status === 0) return this.translate.instant('ASSISTANT.ERRORS.OFFLINE');
    if (err?.status >= 500) return this.translate.instant('ASSISTANT.ERRORS.ASSISTANT_UNAVAILABLE');
    const serverMessage = err?.error?.message || err?.message;
    return typeof serverMessage === 'string' && serverMessage && err?.status < 500
      ? serverMessage
      : this.translate.instant('ASSISTANT.ERRORS.GENERIC');
  }
}
