import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { IntakeFieldKey } from 'src/app/core/services/onboarding/onboarding.service';
import { TrainerInvitesApiService } from './services/trainer-invites-api.service';
import {
  ClientEmailScopeState,
  ClientEmailScopeStatus,
  SendInviteResult,
  TrainerIntakeConfig,
  TrainerInvite,
  TrainerInviteScope,
  TrainerInviteStatus,
} from './models/trainer-invite.model';
import { CustomQuestion } from 'src/app/core/models/custom-question';
import { CheckinField } from 'src/app/core/constants/checkin-fields';
import {
  INTAKE_MEASUREMENT_FIELDS,
  INTAKE_PHOTO_POSES,
  INTAKE_VIDEO_LABEL_MAX,
  IntakeMeasurementRequest,
  IntakePhotoPose,
  IntakePhotoRequest,
  IntakeVideoRequest,
  MAX_INTAKE_VIDEOS,
} from 'src/app/core/models/intake-requests';
import {
  MAX_CUSTOM_QUESTIONS,
  cleanCustomQuestion,
  customQuestionTypeLabel,
  customQuestionsError,
  settleDraftQuestion,
  newCustomQuestion,
} from '../../shared/components/custom-question-editor/custom-question-editor.component';

type ListState = 'loading' | 'error' | 'loaded';

// Un envío no es una importación masiva: cada email sale en su propia
// petición, bajo el bloqueo de altas del profesional, y con su correo.
const MAX_EMAILS_PER_SEND = 20;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Lo que separa emails al escribir: comas, punto y coma, espacios y saltos
// de línea.
const EMAIL_SEPARATORS = /[\s,;]+/;
// Al pegar se rescatan los emails de cualquier texto: una columna copiada de
// una hoja de cálculo, "Ana <ana@x.com>, Luis <luis@y.com>" de un correo...
const EMAIL_IN_TEXT = /[^\s<>()[\],;:"']+@[^\s<>()[\],;:"']+/g;

// Un email de la caja de destinatarios. `status`: lo que ya hay con ESTE
// profesional por ámbito, para avisar antes de enviar. `failure`: por qué no
// salió en el último envío (se queda en la caja para corregirlo o reintentar).
interface EmailEntry {
  email: string;
  valid: boolean;
  checking: boolean;
  status: ClientEmailScopeStatus | null;
  failure: string | null;
}

// Aviso de un email que ya tiene alguno de los ámbitos marcados: a ese
// ámbito no se le invita, al resto sí.
interface EmailNote {
  email: string;
  text: string;
}

interface SendOutcome {
  sentScopes: TrainerInviteScope[];
  failure: string | null;
  seatsExhausted: boolean;
}

// Lo que no salió en el último envío, con su motivo.
interface SendReport {
  failures: { email: string; reason: string }[];
  seatsExhausted: boolean;
}

// Estado que se enseña de una invitación: el del back más "cancelled", que
// el back guarda como declined con revokedBy "trainer" (la retiró el
// profesional antes de que el cliente respondiera; no la rechazó nadie).
type InviteDisplayStatus = TrainerInviteStatus | 'cancelled';

// Cada acción de una invitación con su fecha y hora, en orden: enviada →
// aceptada | rechazada | cancelada, y aceptada → finalizada.
type InviteEventKind =
  | 'sent'
  | 'accepted'
  | 'declined'
  | 'cancelled'
  | 'ended_by_trainer'
  | 'ended_by_client'
  | 'ended';

interface InviteEvent {
  kind: InviteEventKind;
  at: string;
}

// Una fila por invitación, es decir, por ámbito: entrenamiento y nutrición
// nunca comparten fila aunque se enviaran juntas, porque cada una tiene su
// propia respuesta y su propio final.
interface InviteRow {
  invite: TrainerInvite;
  status: InviteDisplayStatus;
  events: InviteEvent[];
}

// Invitar entrenamiento+nutrición a la vez crea una invitación por ámbito
// — sin agrupar, el listado repetía el mismo email. Una card por CLIENTE,
// con una fila por invitación dentro.
interface GroupedInvite {
  clientEmail: string;
  clientName: string | null;
  rows: InviteRow[];
}

// Medidas que se pueden pedir, por grupo del catálogo de check-in.
interface MeasurementGroup {
  key: string;
  label: string;
  fields: CheckinField[];
}

@Component({
  selector: 'app-invites',
  templateUrl: 'invites.page.html',
  styleUrls: ['invites.page.scss'],
})
export class InvitesPage implements OnInit {
  private readonly translate = inject(TranslateService);

  public form: FormGroup;
  public isSending = false;

  public listState: ListState = 'loading';
  public pendingInvites: TrainerInvite[] = [];
  public historyInvites: TrainerInvite[] = [];
  public cancellingId: string | null = null;

  // Calculados UNA VEZ en loadInvites(), no en un getter/método de plantilla
  // — un getter (o una llamada a método) usado directamente en *ngFor se
  // reevalúa en CADA ciclo de detección de cambios y devuelve arrays/objetos
  // nuevos cada vez, lo que hace que *ngFor destruya y recree todas las
  // filas sin parar y deja la pantalla colgada en cuanto hay invitaciones
  // reales que listar (mismo bug ya visto y corregido en clients.page.ts).
  public groupedPendingInvites: GroupedInvite[] = [];
  public groupedHistoryInvites: GroupedInvite[] = [];

  // Conserva el orden del back (invitación más reciente primero): el
  // cliente con la última invitación va arriba y, dentro de su card, la
  // invitación más reciente también.
  private groupByClient(invites: TrainerInvite[]): GroupedInvite[] {
    const groups = new Map<string, GroupedInvite>();
    for (const invite of invites) {
      const key = invite.clientEmail.toLowerCase();
      if (!groups.has(key)) {
        groups.set(key, { clientEmail: invite.clientEmail, clientName: null, rows: [] });
      }
      const group = groups.get(key)!;
      group.clientName = group.clientName || this.clientName(invite);
      group.rows.push({ invite, status: this.displayStatus(invite), events: this.inviteEvents(invite) });
    }
    return [...groups.values()];
  }

  private clientName(invite: TrainerInvite): string | null {
    const client = invite.client;
    if (!client?.name && !client?.lastname) return null;
    return `${client.name || ''} ${client.lastname || ''}`.trim();
  }

  private displayStatus(invite: TrainerInvite): InviteDisplayStatus {
    return invite.status === 'declined' && invite.revokedBy === 'trainer' ? 'cancelled' : invite.status;
  }

  // Las fechas salen tal cual las guarda el back (ver ScopeLinkSchema):
  // respondedAt es la respuesta del cliente (aceptar o rechazar) y revokedAt
  // el final, sea porque el profesional cancela una invitación sin responder
  // o porque alguien termina la relación. Una fecha que falte (datos
  // antiguos) no se inventa: esa acción simplemente no se lista.
  private inviteEvents(invite: TrainerInvite): InviteEvent[] {
    const events: InviteEvent[] = [{ kind: 'sent', at: invite.invitedAt }];
    if (this.displayStatus(invite) === 'cancelled') {
      if (invite.revokedAt) events.push({ kind: 'cancelled', at: invite.revokedAt });
      return events;
    }
    if (invite.respondedAt) {
      events.push({ kind: invite.status === 'declined' ? 'declined' : 'accepted', at: invite.respondedAt });
    }
    if (invite.status === 'revoked' && invite.revokedAt) {
      const kind: InviteEventKind =
        invite.revokedBy === 'trainer' ? 'ended_by_trainer' : invite.revokedBy === 'client' ? 'ended_by_client' : 'ended';
      events.push({ kind, at: invite.revokedAt });
    }
    return events;
  }

  public trackByClientEmail(_index: number, group: GroupedInvite): string {
    return group.clientEmail;
  }

  public trackByInviteId(_index: number, row: InviteRow): string {
    return row.invite._id;
  }

  // TASK-049 (MASTER_BACKLOG.md) — personalización del cuestionario inicial.
  // Partial: `dietaryFlags` es un IntakeFieldKey pero NO toggleable (el
  // backend lo fuerza en scope nutrición), así que no aparece aquí.
  public readonly intakeFieldLabels: Partial<Record<IntakeFieldKey, string>> = {
    goals: this.translate.instant('INVITES.OBJETIVOS'),
    healthConditions: this.translate.instant('INTAKE.HEALTH_TITLE'),
    experienceLevel: this.translate.instant('INVITES.NIVEL_DE_EXPERIENCIA'),
    availability: this.translate.instant('INVITES.DISPONIBILIDAD'),
    equipment: this.translate.instant('INTAKE.EQUIPMENT_TITLE'),
    allergies: this.translate.instant('INTAKE.ALLERGIES_TITLE'),
    favoriteFoods: this.translate.instant('INTAKE.FAVORITES_TITLE'),
    dislikedFoods: this.translate.instant('INVITES.ALIMENTOS_QUE_NO_LE_GUSTAN'),
    cooksAtHome: this.translate.instant('INVITES.COCINA_EN_CASA'),
  };
  public intakeConfigState: 'loading' | 'error' | 'loaded' = 'loading';
  // El catálogo de campos es un conjunto cerrado ya conocido en compilación
  // (intakeFieldLabels arriba) — no depende de lo que devuelva el backend en
  // cada carga, así que no hace falta guardarlo como estado propio ni
  // esperar la respuesta para saber qué checkboxes mostrar.
  public readonly intakeConfigFields = Object.keys(this.intakeFieldLabels) as IntakeFieldKey[];
  public selectedIntakeFields = new Set<IntakeFieldKey>();
  public savingIntakeConfig = false;

  // Preguntas de texto libre que el trainer añade además de los 9 campos
  // predefinidos — mismo documento (TrainerIntakeConfig), mismo botón
  // "Guardar". Un id temporal (client-side) hasta el primer guardado, para
  // que trackBy/borrar funcionen antes de tener el id real del backend.
  public customQuestions: CustomQuestion[] = [];
  // Pregunta a medio escribir (null = solo se ve el botón de añadir).
  public draftQuestion: CustomQuestion | null = null;
  public readonly maxCustomQuestions = MAX_CUSTOM_QUESTIONS;

  // El panel de cuestionario es GLOBAL del trainer (no hay un enabledFields
  // por scope en el backend, ver train-fit-back/components/trainerIntakeConfig)
  // — este filtro es puramente de presentación: qué checkboxes se OFRECEN en
  // esta pantalla según el scope marcado en el form de invitar de ARRIBA, no
  // cambia qué se guarda (sigue siendo la misma config de 9 campos).
  private readonly trainingIntakeFields: IntakeFieldKey[] = [
    'goals',
    'healthConditions',
    'experienceLevel',
    'availability',
    'equipment',
  ];
  private readonly nutritionIntakeFields: IntakeFieldKey[] = [
    'allergies',
    'favoriteFoods',
    'dislikedFoods',
    'cooksAtHome',
  ];

  // Lo que le pide además de preguntas (core/models/intake-requests.ts).
  // Medidas y fotos se recuerdan entre visitas, como los campos; los vídeos
  // son textos suyos, como las preguntas propias, y se marcan en cada tanda.
  public readonly measurementGroups: MeasurementGroup[] = (['composicion_corporal', 'perimetros'] as const).map((key) => ({
    key,
    label: this.translate.instant(`CHECKIN_FIELD_GROUPS.${key}`),
    fields: INTAKE_MEASUREMENT_FIELDS.filter((field) => field.group === key),
  }));
  // Clave de la medida → obligatoria.
  public selectedMeasurements = new Map<string, boolean>();
  public photoRequest: IntakePhotoRequest | null = null;
  public readonly photoPoses = INTAKE_PHOTO_POSES;
  public videoRequests: IntakeVideoRequest[] = [];
  // Vídeo a medio escribir (null = solo se ve el botón de añadir).
  public videoDraft: string | null = null;
  public readonly maxVideos = MAX_INTAKE_VIDEOS;
  public readonly videoLabelMax = INTAKE_VIDEO_LABEL_MAX;
  // Al abrir el campo de un vídeo nuevo, el cursor va directo a él.
  @ViewChild('videoDraftInput') public set videoDraftInput(input: ElementRef<HTMLInputElement> | undefined) {
    input?.nativeElement.focus();
  }

  constructor(
    private trainerInvitesApi: TrainerInvitesApiService,
    private ionicUtilService: IonicUtilService,
    private router: Router
  ) {}

  // Varios clientes a la vez, como el "Para:" de un correo: cada email es una
  // chip. Al entrar en la caja se comprueba su estado con ESTE profesional
  // (GET /trainer/clients/check-email) para no mandarle un ámbito que el back
  // va a rechazar igual (una invitación sin responder o una relación en curso
  // por ámbito). Es solo un aviso: nunca bloquea el botón de enviar.
  public emailEntries: EmailEntry[] = [];
  public emailDraft = '';
  public emailNotes: EmailNote[] = [];
  public emailsTouched = false;
  public readonly maxEmails = MAX_EMAILS_PER_SEND;
  public sendProgress = { done: 0, total: 0 };
  public sendReport: SendReport | null = null;

  public ngOnInit(): void {
    this.form = new FormGroup({
      training: new FormControl(false),
      nutrition: new FormControl(false),
    });

    this.loadInvites();
    // Carga ya, no solo al marcar un ámbito — hace falta lastScopes para
    // saber si hay que pre-marcar Entrenamiento/Nutrición nada más entrar.
    this.loadIntakeConfig();
  }

  public toggleScope(controlName: 'training' | 'nutrition'): void {
    if (this.isScopeBlocked(controlName)) return;
    const control = this.form.get(controlName);
    const nextValue = !control?.value;
    control?.setValue(nextValue);
    this.syncIntakeFieldsForScope(controlName, nextValue);
    this.refreshEmailNotes();
  }

  // En lugar de ocultar los checkboxes que no encajan con el ámbito
  // marcado, se dejan siempre los 9 visibles y se seleccionan/deseleccionan
  // solos los que pertenecen a ese ámbito al marcar/desmarcar Entrenamiento
  // o Nutrición — el trainer sigue pudiendo ajustar cualquiera a mano
  // después.
  private syncIntakeFieldsForScope(scope: 'training' | 'nutrition', enabled: boolean): void {
    const fields = scope === 'training' ? this.trainingIntakeFields : this.nutritionIntakeFields;
    fields.forEach((field) => {
      if (enabled) this.selectedIntakeFields.add(field);
      else this.selectedIntakeFields.delete(field);
    });
  }

  // Un ámbito se bloquea solo si TODOS los emails ya lo tienen (con uno solo,
  // igual que antes). Si lo tiene una parte, se invita al resto y se avisa
  // email por email (emailNotes).
  public isScopeBlocked(scope: TrainerInviteScope): boolean {
    const valid = this.validEntries;
    return valid.length > 0 && valid.every((entry) => !!entry.status?.[scope]?.blocked);
  }

  public emailScopeStatusMessage(scope: TrainerInviteScope): string | null {
    if (!this.isScopeBlocked(scope)) return null;
    const valid = this.validEntries;
    if (valid.length > 1) return this.translate.instant('INVITES.TODOS_YA_TIENEN_ESTE_AMBITO');
    return this.blockedReason(valid[0].status![scope]);
  }

  private blockedReason(state: ClientEmailScopeState): string {
    switch (state.status) {
      case 'active':
        return this.translate.instant('INVITES.YA_ES_TU_CLIENTE_EN');
      case 'pending':
        return this.translate.instant('INVITES.YA_TIENE_UNA_INVITACION_PENDIENTE');
      default:
        return this.translate.instant('INVITES.YA_EXISTE_UNA_RELACION_EN');
    }
  }

  private get validEntries(): EmailEntry[] {
    return this.emailEntries.filter((entry) => entry.valid);
  }

  private get selectedScopes(): TrainerInviteScope[] {
    return [
      ...(this.form.value.training ? (['training'] as const) : []),
      ...(this.form.value.nutrition ? (['nutrition'] as const) : []),
    ];
  }

  // Lo que se le manda a un email: los ámbitos marcados que no tiene ya.
  private scopesFor(entry: EmailEntry): TrainerInviteScope[] {
    return this.selectedScopes.filter((scope) => !entry.status?.[scope]?.blocked);
  }

  private get sendableEntries(): EmailEntry[] {
    return this.validEntries.filter((entry) => this.scopesFor(entry).length > 0);
  }

  public get sendableCount(): number {
    return this.sendableEntries.length;
  }

  public get hasInvalidEmails(): boolean {
    return this.emailEntries.some((entry) => !entry.valid);
  }

  public entryState(entry: EmailEntry): 'invalid' | 'failed' | 'checking' | 'skipped' | 'ok' {
    if (!entry.valid) return 'invalid';
    if (entry.failure) return 'failed';
    if (entry.checking) return 'checking';
    if (this.hasScopeSelected && !this.scopesFor(entry).length) return 'skipped';
    return 'ok';
  }

  public trackByEmail(_index: number, entry: EmailEntry): string {
    return entry.email;
  }

  // Un separador al escribir cierra el email que va delante; lo que queda
  // detrás sigue en el campo.
  public onEmailInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!EMAIL_SEPARATORS.test(input.value)) {
      this.emailDraft = input.value;
      return;
    }
    const parts = input.value.split(EMAIL_SEPARATORS);
    const rest = parts.pop() ?? '';
    this.addEmails(parts);
    input.value = rest;
    this.emailDraft = rest;
  }

  // Enter con algo escrito lo convierte en chip; con el campo vacío sigue
  // enviando (appSubmitOnEnter ignora un evento ya consumido). Borrar con el
  // campo vacío quita la última chip, como en un correo.
  public onEmailKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.emailDraft.trim()) {
      event.preventDefault();
      this.commitDraft();
    } else if (event.key === 'Backspace' && !this.emailDraft && this.emailEntries.length && !this.isSending) {
      this.removeEmail(this.emailEntries[this.emailEntries.length - 1]);
    }
  }

  public onEmailPaste(event: ClipboardEvent): void {
    const found = (event.clipboardData?.getData('text') || '').match(EMAIL_IN_TEXT);
    if (!found) return;
    event.preventDefault();
    this.addEmails(found);
  }

  public commitDraft(): void {
    if (!this.emailDraft.trim()) return;
    this.addEmails(this.emailDraft.split(EMAIL_SEPARATORS));
    this.emailDraft = '';
  }

  public removeEmail(entry: EmailEntry): void {
    this.emailEntries = this.emailEntries.filter((candidate) => candidate !== entry);
    this.refreshEmailNotes();
  }

  private addEmails(tokens: string[]): void {
    const known = new Set(this.emailEntries.map((entry) => entry.email));
    const added: EmailEntry[] = [];
    let dropped = 0;
    for (const token of tokens) {
      // Sin el punto final de una frase pegada ("escribe a ana@x.com.").
      const email = token.trim().toLowerCase().replace(/\.+$/, '');
      if (!email || known.has(email)) continue;
      if (this.emailEntries.length + added.length >= MAX_EMAILS_PER_SEND) {
        dropped++;
        continue;
      }
      known.add(email);
      added.push({ email, valid: EMAIL_PATTERN.test(email), checking: false, status: null, failure: null });
    }
    if (dropped) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('INVITES.MAXIMO_EMAILS', { max: MAX_EMAILS_PER_SEND, count: dropped }),
        duration: 3500,
      });
    }
    if (!added.length) return;
    this.emailEntries = [...this.emailEntries, ...added];
    added.filter((entry) => entry.valid).forEach((entry) => this.checkEmail(entry));
    this.refreshEmailNotes();
  }

  // Fallo silencioso: no bloquea al trainer, el back igual protege al enviar
  // (mismo índice único); esto es solo el aviso anticipado.
  private checkEmail(entry: EmailEntry): void {
    entry.checking = true;
    this.trainerInvitesApi.checkClientEmailStatus(entry.email).subscribe({
      next: (status) => {
        entry.checking = false;
        // Quitado mientras tanto: no pinta avisos de un email que ya no está.
        if (!this.emailEntries.includes(entry)) return;
        entry.status = status;
        this.uncheckBlockedScopes();
        this.refreshEmailNotes();
      },
      error: () => {
        entry.checking = false;
      },
    });
  }

  // Un ámbito marcado que ahora resulta bloqueado para todos no se manda
  // igual: se desmarca solo, junto con el aviso.
  private uncheckBlockedScopes(): void {
    (['training', 'nutrition'] as TrainerInviteScope[]).forEach((scope) => {
      if (this.isScopeBlocked(scope) && this.form.get(scope)?.value) {
        this.form.get(scope)?.setValue(false);
        this.syncIntakeFieldsForScope(scope, false);
      }
    });
  }

  // Calculado aquí (al cambiar emails o ámbitos), no en un getter de
  // plantilla: ver groupedPendingInvites.
  private refreshEmailNotes(): void {
    const selected = this.selectedScopes;
    this.emailNotes = this.emailEntries.flatMap((entry) =>
      selected
        .filter((scope) => entry.status?.[scope]?.blocked)
        .map((scope) => ({
          email: entry.email,
          text: `${this.scopeLabel(scope)}: ${this.blockedReason(entry.status![scope])}`,
        }))
    );
  }

  public get hasScopeSelected(): boolean {
    return !!(this.form?.value.training || this.form?.value.nutrition);
  }

  public loadInvites(): void {
    this.listState = 'loading';
    this.trainerInvitesApi.getMyInvites().subscribe({
      next: (invites) => {
        // El back las manda de la más reciente a la más antigua.
        this.pendingInvites = (invites || []).filter((invite) => invite.status === 'pending');
        this.historyInvites = (invites || []).filter((invite) => invite.status !== 'pending');

        this.groupedPendingInvites = this.groupByClient(this.pendingInvites);
        this.groupedHistoryInvites = this.groupByClient(this.historyInvites);

        this.listState = 'loaded';
      },
      error: () => {
        this.listState = 'error';
      },
    });
  }

  public async submit(): Promise<void> {
    if (this.isSending) return;
    this.commitDraft();
    if (!this.settlePendingQuestion()) return;
    this.emailsTouched = true;
    const entries = this.sendableEntries;
    if (!this.hasScopeSelected || this.hasInvalidEmails || !entries.length) {
      this.form.markAllAsTouched();
      return;
    }

    // El cuestionario (campos, preguntas, medidas, fotos y vídeos) no se
    // guarda en cada click: se guarda al enviar, y ANTES de enviar, porque
    // cada invitación se lleva una copia de lo guardado. Si no se puede
    // guardar, no sale ninguna invitación con un formulario que no es el
    // que se ve en pantalla.
    this.isSending = true;
    if (!(await this.saveIntakeConfig())) {
      this.isSending = false;
      return;
    }

    this.sendReport = null;
    this.sendProgress = { done: 0, total: entries.length };
    const report: SendReport = { failures: [], seatsExhausted: false };
    const sent: { entry: EmailEntry; scopes: TrainerInviteScope[] }[] = [];

    // De uno en uno: cada alta pasa por el bloqueo de altas del profesional
    // (en paralelo chocarían entre sí) y, en cuanto se acaban las plazas, no
    // se intenta ninguno más.
    for (const entry of entries) {
      const outcome: SendOutcome = report.seatsExhausted
        ? { sentScopes: [], failure: this.translate.instant('INVITES.SIN_PLAZAS_LIBRES'), seatsExhausted: true }
        : await this.sendOne(entry);
      if (outcome.seatsExhausted) report.seatsExhausted = true;
      if (outcome.sentScopes.length) sent.push({ entry, scopes: outcome.sentScopes });
      if (outcome.failure) report.failures.push({ email: entry.email, reason: outcome.failure });
      entry.failure = outcome.sentScopes.length ? null : outcome.failure;
      this.sendProgress = { ...this.sendProgress, done: this.sendProgress.done + 1 };
    }

    this.isSending = false;
    // Los que han salido (aunque sea en un solo ámbito) dejan la caja; los
    // que no, se quedan marcados para corregirlos o reintentarlos.
    const sentEntries = new Set(sent.map(({ entry }) => entry));
    this.emailEntries = this.emailEntries.filter((entry) => !sentEntries.has(entry));
    this.sendReport = report.failures.length ? report : null;
    this.refreshEmailNotes();
    if (!sent.length) return;

    const message =
      sent.length === 1
        ? this.translate.instant('INVITES.INVITACION_DE_ENVIADA_CORRECTAMENTE', {
            labels: sent[0].scopes.map((scope) => this.scopeLabel(scope)).join(this.translate.instant('COACH.AND')),
          })
        : this.translate.instant('INVITES.INVITACIONES_ENVIADAS_A', { count: sent.length });
    this.ionicUtilService.showToast({ message, duration: 3500 });
    if (!this.emailEntries.length) {
      this.form.reset({ training: false, nutrition: false });
      this.emailsTouched = false;
    }
    this.loadInvites();
  }

  private async sendOne(entry: EmailEntry): Promise<SendOutcome> {
    try {
      const response = await lastValueFrom(this.trainerInvitesApi.sendInvite(entry.email, this.scopesFor(entry)));
      return this.outcomeOf(response.results);
    } catch (err: any) {
      // MVP-trainers F21 — límite de clientes del plan alcanzado: el resumen
      // lleva a ampliar plazas en vez de un error sin acción posible.
      if (err?.error?.code === 'TRAINER_LIMIT_REACHED') {
        return { sentScopes: [], failure: this.translate.instant('INVITES.SIN_PLAZAS_LIBRES'), seatsExhausted: true };
      }
      // 400 con todos los ámbitos rechazados (ya es cliente de otro
      // profesional…): el motivo viene por ámbito, no en message.
      if (Array.isArray(err?.results)) return this.outcomeOf(err.results);
      return {
        sentScopes: [],
        failure: err?.error?.message || this.translate.instant('INVITES.NO_SE_PUDO_ENVIAR_LA'),
        seatsExhausted: false,
      };
    }
  }

  private outcomeOf(results: Pick<SendInviteResult, 'scope' | 'success' | 'error'>[]): SendOutcome {
    const failed = results.filter((result) => !result.success);
    return {
      sentScopes: results.filter((result) => result.success).map((result) => result.scope),
      failure: failed.length ? failed.map((result) => `${this.scopeLabel(result.scope)}: ${result.error}`).join(' · ') : null,
      seatsExhausted: false,
    };
  }

  public goToSeats(): void {
    void this.router.navigate(['/tabs/subscription'], { queryParams: { reason: 'seats' } });
  }

  public async confirmCancel(invite: TrainerInvite): Promise<void> {
    const alert = await this.ionicUtilService.showAlert({
      header: this.translate.instant('INVITES.CANCELAR_INVITACION'),
      message: this.translate.instant('INVITES.SEGURO_QUE_QUIERES_CANCELAR_LA', { p0: this.scopeLabel(invite.scope), clientEmail: invite.clientEmail }),
      buttons: [
        { text: this.translate.instant('COMMON.GO_BACK'), role: 'cancel' },
        {
          text: this.translate.instant('INVITES.CANCELAR_INVITACION'),
          cssClass: 'alert-button-danger',
          handler: () => this.cancelInvite(invite),
        },
      ],
    });
    void alert;
  }

  private cancelInvite(invite: TrainerInvite): void {
    this.cancellingId = invite._id;
    this.trainerInvitesApi.cancelInvite(invite._id).subscribe({
      next: () => {
        this.cancellingId = null;
        this.ionicUtilService.showToast({
          message: this.translate.instant('INVITES.INVITACION_CANCELADA'),
          duration: 2500,
        });
        this.loadInvites();
      },
      error: () => {
        this.cancellingId = null;
        this.ionicUtilService.showErrorToast(
          this.translate.instant('INVITES.NO_SE_PUDO_CANCELAR_LA'),
          this.translate.instant('COMMON.ERROR'),
          3000
        );
      },
    });
  }

  public scopeLabel(scope: TrainerInviteScope): string {
    return scope === 'training' ? this.translate.instant('TRAINER_COMMON.TRAINING') : this.translate.instant('TRAINER_COMMON.NUTRITION');
  }

  // --- TASK-049: personalizar cuestionario inicial ---
  // Sin config guardada todavía, el backend devuelve el catálogo COMPLETO
  // (9 campos) como valor por defecto — si se cargara tal cual, la primera
  // vez que un trainer marca un solo ámbito verían los 9 campos marcados en
  // vez de solo los 5/4 que tienen sentido para ese ámbito. Se filtra lo
  // cargado por el/los ámbito(s) ya marcados en el form de arriba: si el
  // trainer sí había guardado antes una selección propia dentro de esa
  // categoría (p. ej. sin "Equipamiento"), ese subconjunto se respeta igual
  // porque el filtro solo QUITA lo que sobra, nunca añade nada nuevo.
  private filterFieldsForActiveScopes(fields: Set<IntakeFieldKey>): Set<IntakeFieldKey> {
    const wantsTraining = !!this.form?.value.training;
    const wantsNutrition = !!this.form?.value.nutrition;
    const result = new Set<IntakeFieldKey>();
    fields.forEach((field) => {
      const inTraining = this.trainingIntakeFields.includes(field);
      const inNutrition = this.nutritionIntakeFields.includes(field);
      if ((wantsTraining && inTraining) || (wantsNutrition && inNutrition)) {
        result.add(field);
      }
    });
    return result;
  }

  public loadIntakeConfig(): void {
    this.intakeConfigState = 'loading';
    this.trainerInvitesApi.getIntakeConfig().subscribe({
      next: (config) => {
        // Se recuerdan los últimos checkboxes de ámbito marcados — antes de
        // filtrar los campos por ámbito activo, si no se filtrarían contra
        // el form todavía vacío (Entrenamiento/Nutrición sin marcar).
        this.form.patchValue(
          {
            training: (config.lastScopes || []).includes('training'),
            nutrition: (config.lastScopes || []).includes('nutrition'),
          },
          { emitEvent: false }
        );
        this.selectedIntakeFields = this.filterFieldsForActiveScopes(new Set(config.enabledFields));
        // Al entrar normal a la pantalla, las preguntas custom ya guardadas
        // aparecen SIN marcar — el trainer las vuelve a marcar a mano si
        // quiere incluirlas en esta tanda. Solo aparecen marcadas de
        // entrada las que se acaban de crear en esta misma sesión (ver
        // addCustomQuestion, que se añade después de esta carga y por tanto
        // no pasa por aquí).
        this.customQuestions = (config.customQuestions || []).map((q) => ({ ...q, enabled: false }));
        // Igual que las preguntas propias: los vídeos guardados aparecen sin
        // marcar y se marcan para esta tanda.
        this.applyRequests(config);
        this.videoRequests = this.videoRequests.map((video) => ({ ...video, enabled: false }));
        this.intakeConfigState = 'loaded';
      },
      error: () => {
        this.intakeConfigState = 'error';
      },
    });
  }

  public toggleIntakeField(field: IntakeFieldKey): void {
    if (this.selectedIntakeFields.has(field)) {
      this.selectedIntakeFields.delete(field);
    } else {
      this.selectedIntakeFields.add(field);
    }
  }

  public startCustomQuestion(): void {
    this.draftQuestion = newCustomQuestion();
  }

  public cancelCustomQuestion(): void {
    this.draftQuestion = null;
  }

  // Sin enunciado no se avisa en rojo: el botón desactivado ya lo dice.
  public get draftQuestionError(): string | null {
    if (!this.draftQuestion?.label.trim()) return null;
    const error = customQuestionsError([this.draftQuestion]);
    return error ? this.translate.instant(error.key, error.params) : null;
  }

  public get canAddDraftQuestion(): boolean {
    return !!this.draftQuestion?.label.trim() && !this.draftQuestionError;
  }

  // Pregunta redactada sin pulsar «AÑADIR»: se añade al enviar; si no es
  // válida, se avisa y no sale ninguna invitación (antes se perdía).
  private settlePendingQuestion(): boolean {
    const settled = settleDraftQuestion(this.draftQuestion, this.customQuestions);
    this.customQuestions = settled.questions;
    this.draftQuestion = settled.draft;
    if (!settled.error) return true;
    this.ionicUtilService.showToast({
      message: this.translate.instant('INVITES.PREGUNTA_SIN_ANADIR', {
        error: this.translate.instant(settled.error.key, settled.error.params),
      }),
      duration: 4000,
    });
    return false;
  }

  // Una pregunta recién creada sale marcada: se envía en esta invitación.
  public addCustomQuestion(): void {
    if (!this.draftQuestion || !this.canAddDraftQuestion) return;
    this.customQuestions = [...this.customQuestions, { ...cleanCustomQuestion(this.draftQuestion), enabled: true }];
    this.draftQuestion = null;
  }

  public removeCustomQuestion(index: number): void {
    this.customQuestions = this.customQuestions.filter((_, i) => i !== index);
  }

  public toggleCustomQuestionEnabled(index: number): void {
    this.customQuestions = this.customQuestions.map((q, i) =>
      i === index ? { ...q, enabled: q.enabled === false } : q
    );
  }

  public trackByIndex(index: number): number {
    return index;
  }

  // "Sí / No · Obligatoria", "Número (h)"…
  public questionMeta(question: CustomQuestion): string {
    const type = customQuestionTypeLabel(question.type) + (question.type === 'number' && question.unit ? ` (${question.unit})` : '');
    return question.required ? `${type} · ${this.translate.instant('CUSTOM_QUESTION.REQUIRED')}` : type;
  }

  // --- Medidas, fotos y vídeos que le pide ---

  private applyRequests(config: TrainerIntakeConfig): void {
    this.selectedMeasurements = new Map((config.measurements || []).map((m) => [m.key, m.required === true]));
    this.photoRequest = config.photos ? { poses: [...config.photos.poses], required: config.photos.required === true } : null;
    this.videoRequests = (config.videos || []).map((video) => ({ ...video }));
  }

  public isMeasurementSelected(key: string): boolean {
    return this.selectedMeasurements.has(key);
  }

  public isMeasurementRequired(key: string): boolean {
    return this.selectedMeasurements.get(key) === true;
  }

  // Marcar una medida la pide como opcional; obligatoria es un paso más.
  public toggleMeasurement(key: string): void {
    if (this.selectedMeasurements.has(key)) this.selectedMeasurements.delete(key);
    else this.selectedMeasurements.set(key, false);
  }

  public toggleMeasurementRequired(key: string): void {
    if (this.selectedMeasurements.has(key)) this.selectedMeasurements.set(key, !this.selectedMeasurements.get(key));
  }

  public get measurementCount(): number {
    return this.selectedMeasurements.size;
  }

  public trackByMeasurementGroup(_index: number, group: MeasurementGroup): string {
    return group.key;
  }

  public trackByField(_index: number, field: CheckinField): string {
    return field.key;
  }

  public togglePhotos(): void {
    this.photoRequest = this.photoRequest ? null : { poses: [...INTAKE_PHOTO_POSES], required: false };
  }

  // Siempre queda al menos una pose: quitar la última es no pedir fotos.
  public togglePose(pose: IntakePhotoPose): void {
    if (!this.photoRequest) return;
    const poses = this.photoRequest.poses.includes(pose)
      ? this.photoRequest.poses.filter((item) => item !== pose)
      : INTAKE_PHOTO_POSES.filter((item) => item === pose || this.photoRequest!.poses.includes(item));
    if (poses.length) this.photoRequest = { ...this.photoRequest, poses };
  }

  public togglePhotosRequired(): void {
    if (this.photoRequest) this.photoRequest = { ...this.photoRequest, required: !this.photoRequest.required };
  }

  public startVideo(): void {
    this.videoDraft = '';
  }

  public cancelVideo(): void {
    this.videoDraft = null;
  }

  public onVideoDraft(event: Event): void {
    this.videoDraft = (event.target as HTMLInputElement).value;
  }

  // Enter añade el vídeo en vez de enviar la invitación (appSubmitOnEnter
  // ignora un evento ya consumido).
  public onVideoDraftKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    this.addVideo();
  }

  // Uno recién creado sale marcado: se pide en esta invitación.
  public addVideo(): void {
    const label = (this.videoDraft || '').trim().slice(0, INTAKE_VIDEO_LABEL_MAX);
    if (!label || this.videoRequests.length >= MAX_INTAKE_VIDEOS) return;
    this.videoRequests = [...this.videoRequests, { label, required: false, enabled: true }];
    this.videoDraft = null;
  }

  public removeVideo(index: number): void {
    this.videoRequests = this.videoRequests.filter((_, i) => i !== index);
  }

  public toggleVideoEnabled(index: number): void {
    this.videoRequests = this.videoRequests.map((video, i) => (i === index ? { ...video, enabled: video.enabled === false } : video));
  }

  public toggleVideoRequired(index: number): void {
    this.videoRequests = this.videoRequests.map((video, i) => (i === index ? { ...video, required: !video.required } : video));
  }

  // Ya no se guarda en cada click: se guarda una sola vez al enviar las
  // invitaciones (ver submit()), que se llevan una copia de lo guardado.
  // Sin la configuración cargada no se guarda nada (se pisaría la que
  // tiene con una vacía): las invitaciones copian la que ya estaba.
  public async saveIntakeConfig(): Promise<boolean> {
    if (this.intakeConfigState !== 'loaded') return true;
    if (this.savingIntakeConfig) return false;
    this.savingIntakeConfig = true;
    const measurements: IntakeMeasurementRequest[] = INTAKE_MEASUREMENT_FIELDS.filter((field) =>
      this.selectedMeasurements.has(field.key)
    ).map((field) => ({ key: field.key, required: this.selectedMeasurements.get(field.key) === true }));
    try {
      const config = await lastValueFrom(
        this.trainerInvitesApi.updateIntakeConfig({
          enabledFields: [...this.selectedIntakeFields],
          customQuestions: this.customQuestions,
          measurements,
          photos: this.photoRequest,
          videos: this.videoRequests,
          lastScopes: this.selectedScopes,
        })
      );
      this.selectedIntakeFields = new Set(config.enabledFields);
      this.customQuestions = config.customQuestions || [];
      this.applyRequests(config);
      return true;
    } catch (err: any) {
      this.ionicUtilService.showErrorToast(
        err?.error?.message || this.translate.instant('INVITES.NO_SE_PUDO_GUARDAR_LA'),
        this.translate.instant('COMMON.ERROR'),
        3000
      );
      return false;
    } finally {
      this.savingIntakeConfig = false;
    }
  }
}
