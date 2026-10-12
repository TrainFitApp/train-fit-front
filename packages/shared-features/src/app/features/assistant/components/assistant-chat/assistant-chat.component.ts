import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, firstValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssistantService } from '../../services/assistant.service';
import { AssistantTextService } from '../../services/assistant-text.service';
import { AssistantApiService } from '../../services/assistant-api.service';
import { chosenFoodTotal, energyTone, validFoodGrams } from '../../assistant-view.util';
import { shrinkPhoto } from '../../assistant-photo';
import {
  AssistantBubble,
  AssistantDietOption,
  AssistantFoodLine,
  AssistantLink,
  AssistantMacros,
  AssistantRoutineOption,
  AssistantSuggestion,
  ReferralState,
} from '../../models/assistant.model';

// Lo elegido en una vista previa: la opción (dieta, rutina, receta,
// plantilla…), el producto y los gramos de cada alimento al apuntar comida y
// si guarda también el objetivo.
interface PreviewChoice {
  option: number;
  items: number[];
  grams: (number | null)[];
  setGoal: boolean;
}

// Paso de los botones − / + de los gramos.
const GRAMS_STEP = 10;

// Dictado del navegador (Chrome, Safari): sin él, el botón no sale y queda el
// micrófono del teclado del móvil.
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: any) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start(): void;
  stop(): void;
};
const SpeechRecognitionCtor: (new () => SpeechRecognitionLike) | undefined =
  typeof window !== 'undefined' ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : undefined;

// Portapapeles con plan B: execCommand sigue funcionando donde no está el
// API asíncrono (WebView antiguas, contexto no seguro).
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      area.remove();
    }
  }
}

const SETTLED_KEYS: Record<NonNullable<AssistantBubble['settled']>, string> = {
  confirmed: 'ASSISTANT.PREVIEW.STATE_CONFIRMED',
  discarded: 'ASSISTANT.PREVIEW.STATE_DISCARDED',
  expired: 'ASSISTANT.PREVIEW.STATE_EXPIRED',
};

// El chat de trAInfit: cabecera con la mascota y su energía, la conversación
// (mensajes, datos, vistas previas con CONFIRMAR) y el cuadro para escribir
// con los atajos que no gastan. Lo usan la hoja de la app cliente y el panel
// del menú lateral de trainers (`layout`).
@Component({
  selector: 'app-assistant-chat',
  templateUrl: './assistant-chat.component.html',
  styleUrls: ['./assistant-chat.component.scss'],
})
export class AssistantChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  public readonly assistant = inject(AssistantService);
  public readonly text = inject(AssistantTextService);
  private readonly api = inject(AssistantApiService);
  private readonly translate = inject(TranslateService);

  @Input() public layout: 'sheet' | 'panel' = 'sheet';
  @Output() public closed = new EventEmitter<void>();

  @ViewChild('scroll') private scroll?: ElementRef<HTMLElement>;
  @ViewChild('input') private input?: ElementRef<HTMLTextAreaElement>;

  public readonly speechSupported = !!SpeechRecognitionCtor;
  public listening = false;
  private recognition: SpeechRecognitionLike | null = null;

  public draft = '';
  public showEnergy = false;
  public referral: ReferralState | null = null;
  public redeemCode = '';
  public redeemMessage: string | null = null;
  public redeemError = false;
  public copied = false;
  public accepting = false;
  // Lo elegido en cada vista previa (por burbuja): opción y guardar objetivo.
  public choices: Record<number, PreviewChoice> = {};

  private lastBubbleCount = 0;
  private readonly destroy$ = new Subject<void>();

  public readonly macroKeys: ('protein' | 'carbs' | 'fat')[] = ['protein', 'carbs', 'fat'];

  public ngOnInit(): void {
    if (!this.assistant.state()) this.assistant.load();
  }

  public ngAfterViewChecked(): void {
    const count = this.assistant.bubbles().length + (this.assistant.busy() ? 1 : 0);
    if (count !== this.lastBubbleCount && this.scroll) {
      this.lastBubbleCount = count;
      const element = this.scroll.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  public ngOnDestroy(): void {
    this.recognition?.stop();
    this.destroy$.next();
    this.destroy$.complete();
  }

  // --- Energía ------------------------------------------------------------------------

  public get level(): number {
    return this.assistant.energy()?.level ?? 0;
  }

  public get tone(): string {
    return energyTone(this.level);
  }

  public get canWrite(): boolean {
    return this.assistant.available() && this.tone !== 'empty' && !this.assistant.needsConsent();
  }

  public get resetsOn(): string {
    const energy = this.assistant.energy();
    return energy ? this.text.day(energy.resetsOn) : '';
  }

  public toggleEnergy(): void {
    this.showEnergy = !this.showEnergy;
    if (this.showEnergy && !this.referral) {
      this.api
        .getReferral()
        .pipe(takeUntil(this.destroy$))
        .subscribe({ next: (referral) => (this.referral = referral), error: () => undefined });
    }
  }

  // Compartir si el sistema sabe (móvil); si no, o si falla sin que lo haya
  // cancelado el usuario, al portapapeles. Sin nada de eso, el código sigue a
  // la vista y se puede seleccionar.
  public async copyCode(): Promise<void> {
    if (!this.referral) return;
    const { code } = this.referral;
    if (navigator.share) {
      try {
        await navigator.share({ text: this.translate.instant('ASSISTANT.INVITE.SHARE_TEXT', { code }) });
        return;
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') return;
      }
    }
    if (!(await copyText(code))) return;
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);
  }

  public async redeem(): Promise<void> {
    const code = this.redeemCode.trim();
    if (!code) return;
    try {
      await firstValueFrom(this.api.redeemReferral(code));
      this.redeemError = false;
      this.redeemMessage = this.translate.instant('ASSISTANT.INVITE.REDEEMED');
      this.referral = await firstValueFrom(this.api.getReferral());
      this.redeemCode = '';
    } catch (err) {
      this.redeemError = true;
      this.redeemMessage = this.text.error(err);
    }
  }

  // --- Conversación --------------------------------------------------------------------

  public async accept(): Promise<void> {
    if (this.accepting) return;
    this.accepting = true;
    try {
      await this.assistant.acceptConsent();
      setTimeout(() => this.input?.nativeElement.focus(), 50);
    } finally {
      this.accepting = false;
    }
  }

  public async send(): Promise<void> {
    const text = this.draft.trim();
    if (!text || !this.canWrite || this.assistant.busy()) return;
    this.draft = '';
    setTimeout(() => this.autosize());
    await this.assistant.send(text);
  }

  // Crece con el texto hasta su tope (Safari no tiene field-sizing).
  public autosize(): void {
    const element = this.input?.nativeElement;
    if (!element) return;
    element.style.height = 'auto';
    element.style.height = `${Math.min(element.scrollHeight, 120)}px`;
  }

  // Intro envía; Mayús+Intro, salto de línea.
  public onEnter(event: Event): void {
    const keyboard = event as KeyboardEvent;
    if (keyboard.shiftKey || keyboard.isComposing) return;
    keyboard.preventDefault();
    void this.send();
  }

  public quick(intent: string): void {
    void this.assistant.quick(intent, this.translate.instant(`ASSISTANT.QUICK.${intent}`));
  }

  /** Los atajos fijos, sin los que ya salen como sugerencia del momento. */
  public get quickChips(): string[] {
    const suggested = new Set((this.assistant.state()?.suggestions || []).map((suggestion) => suggestion.intent));
    return (this.assistant.state()?.quickActions || []).filter((intent) => !suggested.has(intent));
  }

  public suggest(suggestion: AssistantSuggestion): void {
    void this.assistant.quick(suggestion.intent, this.text.suggestion(suggestion));
  }

  // --- Dictado y foto ------------------------------------------------------------------

  public toggleDictation(): void {
    if (this.listening) {
      this.recognition?.stop();
      return;
    }
    if (!SpeechRecognitionCtor) return;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = (this.translate.currentLang || 'es').startsWith('en') ? 'en-US' : 'es-ES';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event: any) => {
      const heard = Array.from(event.results || [])
        .map((result: any) => result[0]?.transcript || '')
        .join(' ')
        .trim();
      if (heard) this.draft = `${this.draft} ${heard}`.trim().slice(0, 500);
      setTimeout(() => this.autosize());
    };
    recognition.onend = () => {
      this.listening = false;
      this.recognition = null;
    };
    recognition.onerror = () => {
      this.listening = false;
      this.recognition = null;
    };
    this.recognition = recognition;
    this.listening = true;
    recognition.start();
  }

  // La foto del plato: se reduce aquí y va con lo escrito (si hay algo).
  public async sendPhoto(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file || !this.canWrite || this.assistant.busy()) return;
    try {
      const { image, preview } = await shrinkPhoto(file);
      const text = this.draft.trim();
      this.draft = '';
      setTimeout(() => this.autosize());
      await this.assistant.send(text, image, preview);
    } catch {
      this.assistant.pushError(this.translate.instant('ASSISTANT.ERRORS.ASSISTANT_PHOTO_INVALID'));
    }
  }

  public undo(bubble: AssistantBubble): void {
    const undoId = bubble.turn?.undo?.id;
    if (undoId) void this.assistant.undo(undoId, bubble.id);
  }

  public rate(bubble: AssistantBubble, value: 'up' | 'down'): void {
    this.assistant.rate(bubble, value);
  }

  public follow(link: AssistantLink): void {
    void this.assistant.followLink(link);
  }

  public reset(): void {
    this.choices = {};
    this.assistant.reset();
  }

  public trackById(_: number, bubble: AssistantBubble): number {
    return bubble.id;
  }

  // --- Vistas previas ------------------------------------------------------------------

  public choiceOf(bubble: AssistantBubble): PreviewChoice {
    if (!this.choices[bubble.id]) this.choices[bubble.id] = { option: 0, items: [], grams: [], setGoal: !!bubble.turn?.preview?.setGoal };
    return this.choices[bubble.id];
  }

  public setGoalChoice(bubble: AssistantBubble, value: boolean): void {
    this.choiceOf(bubble).setGoal = value;
  }

  public settledKey(bubble: AssistantBubble): string {
    return SETTLED_KEYS[bubble.settled || 'expired'];
  }

  public get greetingKey(): string {
    if (!this.assistant.available()) return 'ASSISTANT.STATUS.DISABLED';
    return this.assistant.app === 'trainer' ? 'ASSISTANT.GREETING_TRAINER' : 'ASSISTANT.GREETING_CLIENT';
  }

  public pick(bubble: AssistantBubble, option: number): void {
    if (bubble.settled) return;
    this.choiceOf(bubble).option = option;
  }

  public confirm(bubble: AssistantBubble): void {
    const choice = this.choiceOf(bubble);
    const intent = bubble.turn?.action?.intent;
    void this.assistant.confirm(bubble, {
      option: choice.option,
      ...(intent === 'build_diet' ? { setGoal: choice.setGoal } : {}),
      ...(intent === 'log_food'
        ? {
            items: this.foodLines(bubble).map((_, index) => this.foodPick(bubble, index)),
            grams: this.foodLines(bubble).map((_, index) => choice.grams[index] ?? null),
          }
        : {}),
    });
  }

  /** Los gramos de un alimento: los que dejó o los propuestos. */
  public foodGrams(bubble: AssistantBubble, line: number): number {
    return this.choiceOf(bubble).grams[line] ?? this.foodLines(bubble)[line]?.grams ?? 0;
  }

  public setFoodGrams(bubble: AssistantBubble, line: number, value: unknown): void {
    if (bubble.settled) return;
    const grams = validFoodGrams(value);
    this.choiceOf(bubble).grams[line] = grams;
  }

  public stepFood(bubble: AssistantBubble, line: number, direction: 1 | -1): void {
    const next = this.foodGrams(bubble, line) + direction * GRAMS_STEP;
    this.setFoodGrams(bubble, line, Math.max(GRAMS_STEP, Math.round(next / GRAMS_STEP) * GRAMS_STEP));
  }

  /** Las kcal de la opción elegida a los gramos que dejó. */
  public foodKcal(bubble: AssistantBubble, line: number, kcal: number): number {
    const proposed = this.foodLines(bubble)[line]?.grams || 0;
    return proposed ? Math.round((kcal * this.foodGrams(bubble, line)) / proposed) : kcal;
  }

  public foodLines(bubble: AssistantBubble): AssistantFoodLine[] {
    return bubble.turn?.preview?.items || [];
  }

  public hasFoodAlternatives(bubble: AssistantBubble): boolean {
    return !bubble.settled && this.foodLines(bubble).some((item) => item.options.length > 1);
  }

  public foodPick(bubble: AssistantBubble, line: number): number {
    return this.choiceOf(bubble).items[line] ?? 0;
  }

  public pickFood(bubble: AssistantBubble, line: number, option: number): void {
    if (bubble.settled) return;
    this.choiceOf(bubble).items[line] = option;
  }

  public foodTotal(bubble: AssistantBubble): AssistantMacros {
    return chosenFoodTotal(this.foodLines(bubble), this.choiceOf(bubble).items, this.choiceOf(bubble).grams);
  }

  public discard(bubble: AssistantBubble): void {
    void this.assistant.discard(bubble);
  }

  public dietOptions(bubble: AssistantBubble): AssistantDietOption[] {
    return (bubble.turn?.preview?.options || []) as AssistantDietOption[];
  }

  public routineOptions(bubble: AssistantBubble): AssistantRoutineOption[] {
    return (bubble.turn?.preview?.options || []) as AssistantRoutineOption[];
  }

  public timingLabel(timing: string | undefined): string {
    return timing ? this.translate.instant(`SUPPLEMENTS.TIMINGS.${timing}`) : '';
  }

  public flagLabels(flags: string[]): string {
    return flags.map((flag) => this.translate.instant(`ASSISTANT.FLAGS.${flag}`)).join(', ');
  }

  /** % de lo comido frente al objetivo (barras del día), con tope visual. */
  public share(value: number, goal: number | null | undefined): number {
    if (!goal) return 0;
    return Math.min(100, Math.round((value / goal) * 100));
  }
}
