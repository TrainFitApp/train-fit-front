import { Injectable, computed, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";
import { Subject, firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/core/services/user/user.service";
import { TableService } from "src/app/core/services/table/table.service";
import { NutritionalGoalService } from "src/app/core/services/nutritional-goal/nutritional-goal.service";
import { ThemeService } from "src/app/core/services/util/theme.service";
import { I18nService } from "src/app/core/i18n/i18n.service";
import { AssistantApiService } from "./assistant-api.service";
import { AssistantTextService } from "./assistant-text.service";
import { TranslateService } from "@ngx-translate/core";
import {
  AssistantApp,
  AssistantBubble,
  AssistantChoice,
  AssistantEnergy,
  AssistantImage,
  AssistantLink,
  AssistantReply,
  AssistantState,
  AssistantTurn,
  AssistantView,
} from "../models/assistant.model";
import { mascotMood, routeFor, viewFromUrl } from "../assistant-view.util";

export interface AssistantRefresh {
  target: string;
  date?: string;
}

// Lo que dura la cara de contenta tras hacer algo, y el aviso con lo que hizo
// cuando el chat se cierra para llevarte a la pantalla (app cliente).
const CELEBRATE_MS = 2400;
const SPEECH_MS = 5000;
// Con DESHACER, el aviso se queda un poco más.
const SPEECH_WITH_UNDO_MS = 8000;

// Estado del asistente trAInfit en la app: disponibilidad, energía, la
// conversación en pantalla y qué hacer con cada turno (llevar a la pantalla,
// avisar a las pantallas que tienen que recargarse). La conversación que ve
// el modelo la guarda el back; esta es solo la de la pantalla.
@Injectable({ providedIn: "root" })
export class AssistantService {
  private readonly api = inject(AssistantApiService);
  private readonly text = inject(AssistantTextService);
  private readonly router = inject(Router);
  private readonly navController = inject(NavController);
  private readonly toastController = inject(ToastController);
  private readonly userService = inject(UserService);
  private readonly tableService = inject(TableService);
  private readonly nutritionalGoalService = inject(NutritionalGoalService);
  private readonly translate = inject(TranslateService);
  private readonly themeService = inject(ThemeService);
  private readonly i18nService = inject(I18nService);

  private readonly family = environment.auth?.clientFamily;
  public readonly app: AssistantApp =
    this.family === "trainfit-trainers" ? "trainer" : "client";
  // Management no tiene asistente, y `assistantVisible: false` en el
  // environment lo apaga en la app: en ambos casos ni se pregunta al back.
  public readonly supported =
    environment.assistantVisible &&
    (this.family === "trainfit-front" || this.family === "trainfit-trainers");

  private readonly _state = signal<AssistantState | null>(null);
  private readonly _bubbles = signal<AssistantBubble[]>([]);
  public readonly state = this._state.asReadonly();
  public readonly bubbles = this._bubbles.asReadonly();
  public readonly busy = signal(false);
  public readonly open = signal(false);
  // Último coste de un mensaje (se enseña junto a la barra un momento).
  public readonly lastCost = signal<number | null>(null);
  private readonly celebrating = signal(false);
  private loading = false;

  // La mascota sale si el asistente existe para este usuario en esta app
  // (con un profesional activo, no; apagado o sin energía, sale dormida).
  public readonly visible = computed(() => {
    const state = this._state();
    return (
      !!state &&
      state.reason !== "professional" &&
      state.reason !== "unsupported_app"
    );
  });
  public readonly available = computed(() => !!this._state()?.available);
  public readonly energy = computed<AssistantEnergy | null>(
    () => this._state()?.energy ?? null,
  );
  public readonly needsConsent = computed(
    () => this.available() && !this._state()?.consent,
  );
  public readonly canSendPhoto = computed(
    () => this.available() && !!this._state()?.photo,
  );
  // El día que mira en Dietas (lo cuenta la pantalla): «apunta aquí» va a ese día.
  private diaryDate: string | null = null;
  public readonly mood = computed(() =>
    mascotMood({
      available: this.available(),
      level: this.energy()?.level,
      busy: this.busy(),
      celebrating: this.celebrating(),
    }),
  );

  // Cerrar el chat de la app cliente (lo cierra quien abrió su hoja).
  private readonly close$ = new Subject<void>();
  public readonly closeRequests$ = this.close$.asObservable();

  private readonly refresh$ = new Subject<AssistantRefresh>();
  // Pantallas que tienen que recargarse. Si ya están abiertas se enteran por
  // `refreshes$`; si no, lo recogen al entrar (`takeRefresh`).
  public readonly refreshes$ = this.refresh$.asObservable();
  private readonly pending = new Map<string, AssistantRefresh>();

  private nextId = 1;
  private celebrateTimer: ReturnType<typeof setTimeout> | null = null;

  /** Estado (al arrancar y al abrir el chat): si la mascota sale y su energía. */
  public load(): void {
    if (this.loading || !this.supported) return;
    this.loading = true;
    this.api.getState().subscribe({
      next: (state) => {
        this._state.set(state);
        this.loading = false;
      },
      // Sin respuesta, sin mascota: el asistente nunca rompe la pantalla.
      error: () => (this.loading = false),
    });
  }

  public async acceptConsent(): Promise<void> {
    await firstValueFrom(this.api.giveConsent());
    this._state.update((state) =>
      state ? { ...state, consent: true } : state,
    );
  }

  /** Un mensaje, con la foto del plato si la hay (`photo`: miniatura para la burbuja). */
  public async send(
    raw: string,
    image: AssistantImage | null = null,
    photo?: string,
  ): Promise<void> {
    const text = raw.trim();
    if ((!text && !image) || this.busy()) return;
    this.push({
      from: "user",
      text: text || this.translate.instant("ASSISTANT.UI.PHOTO_SENT"),
      photo,
    });
    await this.run(() => this.api.sendMessage(text, this.view(), image));
  }

  public async quick(intent: string, label: string): Promise<void> {
    if (this.busy()) return;
    this.push({ from: "user", text: label });
    await this.run(() => this.api.runQuick(intent, this.view()));
  }

  /** Lo que tiene en pantalla ahora (ver assistant-view.util.ts#viewFromUrl). */
  public view(): AssistantView {
    return viewFromUrl(this.app, this.router.url, this.diaryDate);
  }

  /** Dietas cuenta qué día está mirando (null al salir). */
  public setDiaryDate(date: string | null): void {
    this.diaryDate = date;
  }

  /** DESHACER lo recién hecho (desde su burbuja o desde el aviso). */
  public async undo(undoId: string, bubbleId?: number): Promise<void> {
    if (this.busy()) return;
    const owner =
      bubbleId ??
      this._bubbles().find((bubble) => bubble.turn?.undo?.id === undoId)?.id;
    if (owner) this.mark(owner, { undone: true });
    await this.run(() => this.api.confirmAction(undoId, {}));
  }

  /** 👍/👎 de una respuesta; tocar el mismo otra vez lo quita. */
  public rate(bubble: AssistantBubble, value: "up" | "down"): void {
    const ref = bubble.turn?.ref;
    if (!ref) return;
    const next = bubble.feedback === value ? null : value;
    this.mark(bubble.id, { feedback: next });
    this.api.rateReply(ref, next).subscribe({
      error: () => this.mark(bubble.id, { feedback: bubble.feedback ?? null }),
    });
  }

  public async followLink(link: AssistantLink): Promise<void> {
    if (link.quick) return this.quick(link.quick, this.text.link(link));
    if (link.navigate) this.go(link.navigate);
  }

  /** CONFIRMAR una vista previa: la elegida y, en las dietas, si guarda el objetivo. */
  public async confirm(
    bubble: AssistantBubble,
    choice: AssistantChoice = {},
  ): Promise<void> {
    const actionId = bubble.turn?.action?.id;
    if (!actionId || this.busy()) return;
    const ok = await this.run(() => this.api.confirmAction(actionId, choice), {
      replacing: bubble.id,
    });
    if (!ok) this.settle(bubble.id, "expired");
  }

  public async discard(bubble: AssistantBubble): Promise<void> {
    const actionId = bubble.turn?.action?.id;
    if (!actionId) return;
    this.settle(bubble.id, "discarded");
    this.api.cancelAction(actionId).subscribe({ error: () => undefined });
  }

  /** Un aviso de la mascota que no viene del back (p. ej. una foto que no se pudo leer). */
  public pushError(message: string): void {
    this.push({ from: "assistant", error: message });
  }

  public reset(): void {
    this._bubbles.set([]);
    this.api.resetConversation().subscribe({ error: () => undefined });
  }

  /** Lo pendiente de recargar para una pantalla que entra (y se da por recogido). */
  public takeRefresh(target: string): AssistantRefresh | null {
    const refresh = this.pending.get(target) || null;
    this.pending.delete(target);
    return refresh;
  }

  public markRefreshHandled(target: string): void {
    this.pending.delete(target);
  }

  public setEnergy(energy: AssistantEnergy): void {
    this._state.update((state) => (state ? { ...state, energy } : state));
  }

  // --- Turnos -------------------------------------------------------------------------

  private push(bubble: Omit<AssistantBubble, "id">): AssistantBubble {
    const full = { ...bubble, id: this.nextId++ };
    this._bubbles.update((list) => [...list, full]);
    return full;
  }

  private settle(id: number, settled: AssistantBubble["settled"]): void {
    this.mark(id, { settled });
  }

  private mark(id: number, changes: Partial<AssistantBubble>): void {
    this._bubbles.update((list) =>
      list.map((bubble) =>
        bubble.id === id ? { ...bubble, ...changes } : bubble,
      ),
    );
  }

  private async run(
    call: () => ReturnType<AssistantApiService["sendMessage"]>,
    { replacing }: { replacing?: number } = {},
  ): Promise<boolean> {
    this.busy.set(true);
    try {
      const reply: AssistantReply = await firstValueFrom(call());
      if (replacing) this.settle(replacing, "confirmed");
      this.setEnergy(reply.energy);
      this.lastCost.set(reply.cost || null);
      const bubble = this.push({ from: "assistant", turn: reply.turn });
      this.expireUndo(bubble);
      await this.apply(reply.turn);
      return true;
    } catch (err: any) {
      if (err?.energy) this.setEnergy(err.energy);
      this.push({ from: "assistant", error: this.text.error(err) });
      return false;
    } finally {
      this.busy.set(false);
    }
  }

  // Lo que hace la app con un turno: llevar a la pantalla y recargar lo que
  // el asistente acaba de cambiar.
  private async apply(turn: AssistantTurn): Promise<void> {
    if (turn.kind === "done") {
      this.celebrate();
      await this.refreshAfter(turn);
    }
    if ((turn.kind === "navigate" || turn.kind === "done") && turn.navigate) {
      this.go(turn.navigate, this.text.message(turn.message), turn.undo?.id);
    }
  }

  // El botón DESHACER de una burbuja se apaga cuando caduca en el back.
  private expireUndo(bubble: AssistantBubble): void {
    const expiresAt = bubble.turn?.undo?.expiresAt;
    if (!expiresAt) return;
    const left = new Date(expiresAt).getTime() - Date.now();
    setTimeout(() => this.mark(bubble.id, { undone: true }), Math.max(0, left));
  }

  private async refreshAfter(turn: AssistantTurn): Promise<void> {
    const targets = turn.refresh || [];
    const date =
      typeof turn.navigate?.params?.["date"] === "string"
        ? (turn.navigate.params["date"] as string)
        : undefined;
    if (targets.includes("profile")) await this.reloadProfile();
    if (targets.includes("goals")) await this.reloadGoals(turn.data?.goalId);
    if (targets.includes("training") && turn.data?.tableId)
      await this.useRoutine(turn.data.tableId);
    for (const target of targets) {
      const refresh = { target, date };
      this.pending.set(target, refresh);
      this.refresh$.next(refresh);
    }
  }

  // El perfil recién cambiado (nombre, idioma, tema…): el usuario local al día
  // y su idioma y su tema aplicados, igual que al entrar en la app.
  private async reloadProfile(): Promise<void> {
    const email = this.userService.getLocalUser?.email;
    if (!email) return;
    const user = await firstValueFrom(
      this.userService.getUserByEmail(email),
    ).catch(() => null);
    if (!user) return;
    this.userService.setLocalUser = user;
    if (user.lang) this.i18nService.switchLang(user.lang);
    if (user.theme) this.themeService.toggleColorMode(user.theme);
  }

  private async reloadGoals(goalId: string | null | undefined): Promise<void> {
    await firstValueFrom(this.nutritionalGoalService.refreshFromServer()).catch(
      () => undefined,
    );
    const user = this.userService.getLocalUser;
    if (user && goalId && user.goalInUse !== goalId)
      this.userService.setLocalUser = { ...user, goalInUse: goalId };
  }

  // La rutina que acaba de copiar queda en uso: lo mismo que crear una a mano.
  private async useRoutine(tableId: string): Promise<void> {
    const table = await firstValueFrom(
      this.tableService.getTableById(tableId),
    ).catch(() => null);
    const user = this.userService.getLocalUser;
    if (!table || !user) return;
    this.userService.setLocalUser = {
      ...user,
      tableInUse: table._id,
      workoutInUse: undefined,
    };
    this.tableService.setCurrentTable = table;
  }

  /**
   * Lleva a una pantalla de la lista blanca de esta app; en el móvil, cierra
   * el chat y lo cuenta en un aviso (con DESHACER si `undoId`).
   */
  public go(
    navigate: AssistantTurn["navigate"],
    summary?: string,
    undoId?: string,
  ): void {
    const route = routeFor(this.app, navigate);
    if (!route) return;
    const extras = { queryParams: route.queryParams, state: route.state };
    if (this.app === "trainer") {
      void this.router.navigate(route.path, extras);
      return;
    }
    this.close();
    if (summary) void this.say(summary, undoId);
    const isTab = route.path[0].startsWith("/tabs/");
    void (isTab
      ? this.navController.navigateRoot(route.path, extras)
      : this.navController.navigateForward(route.path, extras));
  }

  public close(): void {
    this.open.set(false);
    this.close$.next();
  }

  // Lo que acaba de hacer, contado al llegar a la pantalla (el chat ya está
  // cerrado). Un aviso arriba; si se puede deshacer, con su botón (tocar la
  // mascota reabre el chat).
  private async say(text: string, undoId?: string): Promise<void> {
    await this.toastController.dismiss().catch(() => undefined);
    const toast = await this.toastController.create({
      message: text,
      duration: undoId ? SPEECH_WITH_UNDO_MS : SPEECH_MS,
      position: "top",
      cssClass: "tf-assistant-toast",
      buttons: undoId
        ? [
            {
              text: this.translate.instant("ASSISTANT.UI.UNDO"),
              handler: () => void this.undo(undoId),
            },
          ]
        : [],
    });
    await toast.present();
  }

  private celebrate(): void {
    this.celebrating.set(true);
    if (this.celebrateTimer) clearTimeout(this.celebrateTimer);
    this.celebrateTimer = setTimeout(
      () => this.celebrating.set(false),
      CELEBRATE_MS,
    );
  }
}
