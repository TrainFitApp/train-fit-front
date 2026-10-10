import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CoachService } from 'src/app/core/services/coach/coach.service';
import {
  IntakeFieldKey,
  IntakeStatus,
  OPEN_INTAKE_TRAINER_KEY,
  OnboardingProfessional,
  OnboardingService,
} from 'src/app/core/services/onboarding/onboarding.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { NutritionPreferencesApiService } from '../nutrition-preferences/services/nutrition-preferences-api.service';
import { InviteResponse, PendingInvite, ProfessionalScope } from '../coach/models/professional-relation.model';
import { ProfessionalsApiService } from '../coach/services/professionals-api.service';
import { IntakeApiService } from './services/intake-api.service';
import { IntakeWizardPrefill, IntakeWizardResult } from './components/intake-wizard/intake-wizard.component';
import { CustomAnswerValue, CustomQuestion } from 'src/app/core/models/custom-question';
import { IntakeMeasurementRequest, IntakePhotoRequest, IntakeVideoRequest } from 'src/app/core/models/intake-requests';
import { inviteResponseErrorKey } from '../coach/models/invite-response-error.util';

type ViewState = 'loading' | 'error' | 'loaded';

interface TrainerGroup {
  trainerId: string;
  trainerName: string;
  scopes: string[];
  intakeStatus: IntakeStatus; // uno por profesional, no por scope
  enabledFields: Set<IntakeFieldKey>; // campos que pide este profesional
  customQuestions: CustomQuestion[]; // sus preguntas propias
  // Lo que pide además de preguntas (medidas, fotos de inicio y vídeos).
  measurementRequests: IntakeMeasurementRequest[];
  photoRequest: IntakePhotoRequest | null;
  videoRequests: IntakeVideoRequest[];
}

const EMPTY_INTAKE_PREFILL: IntakeWizardPrefill = {
  goals: '',
  healthConditions: '',
  experienceLevel: null,
  availability: '',
  trainingLocation: null,
  equipmentTags: [],
  allergies: '',
  favoriteFoods: '',
  dislikedFoods: '',
  cooksAtHome: null,
  dietaryFlags: [],
  weight: null,
  height: null,
  sex: null,
  birth: '',
  steps: null,
  activity: null,
  training: null,
  objective: null,
  customAnswers: {},
  measurements: {},
  photosDayId: null,
  videos: {},
};

// TAREA 3 (coach-tab) — el cuestionario inicial del cliente. Aceptar una
// invitación ya le hace cliente activo: aquí lo rellena (wizard paso a paso,
// ver components/intake-wizard) cuando quiera, lo edita o rehace mientras
// el profesional no lo marque revisado, y después solo lo ve. Nunca bloquea
// la app: se llega desde Coach (al aceptar, directo al formulario de ese
// profesional, o desde su acceso). Es UNO por profesional aunque lleve
// entrenamiento y nutrición: se acepta una vez y se rellena una vez.
@Component({
  selector: 'app-onboarding-status',
  templateUrl: 'onboarding-status.page.html',
  styleUrls: ['onboarding-status.page.scss'],
})
export class OnboardingStatusPage {
  public state: ViewState = 'loading';
  public groups: TrainerGroup[] = [];
  public readonly emptyFieldSet: Set<IntakeFieldKey> = new Set();

  public fillingTrainerId: string | null = null;
  public isSubmitting = false;
  public isLoadingIntake = false;
  public intakePrefill: IntakeWizardPrefill = EMPTY_INTAKE_PREFILL;
  // ¿Se pueden subir fotos y vídeos? (sin almacenamiento, esos pasos no salen)
  public uploads = { images: true, videos: true };

  // Invitaciones que TODAVÍA no ha aceptado, una por profesional con todos
  // sus scopes: se aceptan aquí mismo y su cuestionario se abre al momento.
  public pendingInvites: PendingInvite[] = [];
  public respondingTrainerId: string | null = null;
  // Cuestionario que se abre en cuanto carga la lista (ver openRequestedIntake).
  private openTrainerId: string | null = null;

  constructor(
    private router: Router,
    private onboardingService: OnboardingService,
    private coachService: CoachService,
    private intakeApi: IntakeApiService,
    private nutritionPreferencesApi: NutritionPreferencesApiService,
    private professionalsApi: ProfessionalsApiService,
    private ionicUtilService: IonicUtilService,
    private navigationService: NavigationService,
    private userService: UserService,
    private translate: TranslateService
  ) {}

  public ionViewWillEnter(): void {
    this.openTrainerId = this.navigationService.getTempData<string>(OPEN_INTAKE_TRAINER_KEY);
    this.navigationService.clearTempData(OPEN_INTAKE_TRAINER_KEY);
    this.load();
  }

  // afterSubmit: acaba de enviar un cuestionario; si ya no le queda ninguno
  // pendiente ni invitación que aceptar, vuelve a Coach en vez de quedarse
  // mirando la lista.
  public load(afterSubmit = false): void {
    this.state = 'loading';
    forkJoin({
      status: this.onboardingService.refresh(),
      pendingInvites: this.professionalsApi.getPendingInvites(),
    }).subscribe({
      next: ({ status, pendingInvites }) => {
        this.pendingInvites = pendingInvites || [];
        const nothingToShow = !status.professionals.length && !this.pendingInvites.length;
        const nothingToDo = !this.pendingInvites.length &&
          !status.professionals.some((professional) => professional.intakeStatus === 'pending');
        if (nothingToShow || (afterSubmit && nothingToDo)) {
          this.goBack();
          return;
        }
        this.groups = status.professionals.map((professional) => this.toGroup(professional));
        this.uploads = status.uploads || { images: true, videos: true };
        this.state = 'loaded';
        this.openRequestedIntake();
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  // Vuelve a Coach (no a /tabs en general) porque es de donde sale el aviso
  // que trae de vuelta aquí (ver CoachPage#goToOnboardingStatus). Si acaba
  // de rechazar su última invitación, el tab Coach ya no existe: a /tabs.
  public goBack(): void {
    void this.router.navigate([this.coachService.hasCoachRelation() ? '/tabs/coach' : '/tabs']);
  }

  // Abre directo el cuestionario pedido al entrar (Coach, tras aceptar) o
  // al aceptar aquí mismo, solo si sigue sin enviar.
  private openRequestedIntake(): void {
    const group = this.groups.find((g) => g.trainerId === this.openTrainerId);
    this.openTrainerId = null;
    if (group?.intakeStatus === 'pending') this.openIntakeForm(group);
  }

  // Una sola respuesta para todos los scopes a los que invita el profesional.
  public respondToInvite(invite: PendingInvite, decision: 'accept' | 'decline'): void {
    if (this.respondingTrainerId) return;
    this.respondingTrainerId = invite.trainerId;
    const request$ =
      decision === 'accept'
        ? this.professionalsApi.acceptInvite(invite.trainerId)
        : this.professionalsApi.declineInvite(invite.trainerId);
    // El tab Coach (y sus permisos) se actualizan antes de recargar: load()
    // puede volver atrás y tiene que saber si Coach sigue existiendo.
    request$
      .pipe(switchMap((response) => this.coachService.refresh().pipe(map(() => response))))
      .subscribe({
        next: (response: InviteResponse) => {
          this.respondingTrainerId = null;
          if (decision === 'accept' && response.scopes.length) this.openTrainerId = invite.trainerId;
          if (decision === 'accept' && response.pending.length) {
            this.ionicUtilService.showErrorToast(
              this.translate.instant('COACH.ACCEPT_TAKEN', { scopes: this.scopeList(response.pending).toLowerCase() }),
              this.translate.instant('COACH.ACCEPT_ERROR'),
              4000
            );
          }
          this.load();
        },
        error: (err) => {
          this.respondingTrainerId = null;
          this.ionicUtilService.showErrorToast(
            this.translate.instant(inviteResponseErrorKey(err, 'ONBOARDING.INVITE_ERROR')),
            this.translate.instant('COMMON.ERROR'),
            3000
          );
        },
      });
  }

  public trackByInviteTrainerId(_index: number, invite: PendingInvite): string {
    return invite.trainerId;
  }

  public scopeList(scopes: ProfessionalScope[]): string {
    return scopes
      .map((scope) => this.translate.instant(scope === 'training' ? 'ONBOARDING.SCOPE_TRAINING' : 'ONBOARDING.SCOPE_NUTRITION'))
      .join(' · ');
  }

  private toGroup(professional: OnboardingProfessional): TrainerGroup {
    return {
      trainerId: professional.trainerId,
      trainerName: professional.trainer
        ? `${professional.trainer.name} ${professional.trainer.lastname}`.trim()
        : this.translate.instant('ONBOARDING.YOUR_PROFESSIONAL'),
      scopes: professional.scopes.map((scope) =>
        this.translate.instant(scope === 'training' ? 'ONBOARDING.SCOPE_TRAINING' : 'ONBOARDING.SCOPE_NUTRITION')
      ),
      intakeStatus: professional.intakeStatus,
      enabledFields: new Set(professional.intakeEnabledFields),
      customQuestions: professional.intakeCustomQuestions,
      measurementRequests: professional.intakeMeasurements || [],
      photoRequest: professional.intakePhotos || null,
      videoRequests: professional.intakeVideos || [],
    };
  }

  public get pendingCount(): number {
    return this.groups.filter((g) => g.intakeStatus === 'pending').length;
  }

  public get hasEditableIntake(): boolean {
    return this.groups.some((g) => g.intakeStatus === 'submitted');
  }

  public get fillingGroup(): TrainerGroup | undefined {
    return this.groups.find((g) => g.trainerId === this.fillingTrainerId);
  }

  public openIntakeForm(group: TrainerGroup): void {
    this.fillingTrainerId = group.trainerId;
    this.intakePrefill = EMPTY_INTAKE_PREFILL;

    // El cuestionario es UNO por par (trainer, cliente) — si este trainer ya
    // le había respondido antes (p. ej. rellenó nutrición y ahora también
    // hay que rellenar entrenamiento), se precarga en vez de partir de cero
    // y perder lo ya escrito. allergies/favoriteFoods/dislikedFoods/
    // cooksAtHome no son por trainer (User.nutritionPreferences), se
    // precargan igual pero desde su propio endpoint.
    this.isLoadingIntake = true;
    forkJoin({
      intake: this.intakeApi.getMine(group.trainerId),
      preferences: this.nutritionPreferencesApi.getMine(),
    }).subscribe({
      next: ({ intake, preferences }) => {
        // El cliente pudo cerrar este formulario o abrir el de otro trainer
        // mientras la petición estaba en curso — no pisar lo que se esté
        // viendo ahora con una respuesta que ya no corresponde.
        if (this.fillingTrainerId !== group.trainerId) return;
        const customAnswers: Record<string, CustomAnswerValue> = {};
        intake?.customAnswers.forEach((answer) => {
          customAnswers[answer.questionId] = answer.value;
        });
        // Lo que ya mandó de medidas, fotos y vídeos: al reabrirlo para
        // corregir no tiene que volver a medirse ni a grabar.
        const measurements: Record<string, number> = {};
        (intake?.measurements || []).forEach((item) => (measurements[item.key] = item.value));
        const videos: Record<string, string> = {};
        (intake?.videos || []).forEach((video) => (videos[video.requestId] = String(video.assetId)));
        this.intakePrefill = {
          goals: intake?.goals || '',
          healthConditions: intake?.healthConditions || '',
          experienceLevel: intake?.experienceLevel ?? null,
          availability: intake?.availability || '',
          trainingLocation: intake?.trainingLocation ?? null,
          equipmentTags: intake?.equipmentTags || [],
          allergies: preferences?.allergies || '',
          favoriteFoods: preferences?.favoriteFoods || '',
          dislikedFoods: preferences?.dislikedFoods || '',
          cooksAtHome: preferences?.cooksAtHome ?? null,
          dietaryFlags: preferences?.dietaryFlags || [],
          // Reciclar lo del registro: el cliente autenticado ya tiene su
          // perfil cargado en local, el intake solo lo confirma.
          ...this.profilePrefillFromUser(),
          customAnswers,
          measurements,
          photosDayId: intake?.photosDayId ? String(intake.photosDayId) : null,
          videos,
        };
        this.isLoadingIntake = false;
      },
      // Fallo silencioso — precargar es una mejora, no un requisito; el
      // formulario ya está en blanco y se puede rellenar igual.
      error: () => {
        this.isLoadingIntake = false;
      },
    });
  }

  public closeIntakeForm(): void {
    this.fillingTrainerId = null;
  }

  // El perfil (peso/altura/sexo/pasos/actividad/frecuencia) que el cliente ya
  // metió al registrarse — el wizard lo enseña prerellenado y el cliente solo
  // ajusta lo que haya cambiado.
  private profilePrefillFromUser(): Pick<
    IntakeWizardPrefill,
    'weight' | 'height' | 'sex' | 'birth' | 'steps' | 'activity' | 'training' | 'objective'
  > {
    const u = this.userService.getLocalUser;
    return {
      weight: Number.isFinite(u?.weight) ? u!.weight : null,
      height: Number.isFinite(u?.height) ? u!.height : null,
      sex: u?.sex === 0 || u?.sex === 1 ? u!.sex : null,
      birth: u?.birth || '',
      steps: Number.isFinite(u?.steps) ? u!.steps : null,
      activity: Number.isFinite(u?.activity) ? u!.activity : null,
      training: Number.isFinite(u?.training) ? u!.training : null,
      objective: Number.isFinite(u?.objetive) ? u!.objetive : null,
    };
  }

  // El envío reescribe peso/altura/pasos/objetivo en `User` (backend): sin
  // recargarlo, editar después precargaría los datos de antes del envío.
  // Mismo par que user-loader.page.ts (getUserByEmail → setLocalUser).
  private refreshLocalUser(): void {
    const email = this.userService.getLocalUser?.email;
    if (!email) return;
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => (this.userService.setLocalUser = user),
      error: () => {}, // se recarga igual en el próximo arranque
    });
  }

  public submitIntake(result: IntakeWizardResult): void {
    if (!this.fillingTrainerId || this.isSubmitting) return;

    const isEdit = this.fillingGroup?.intakeStatus === 'submitted';
    this.isSubmitting = true;
    this.intakeApi
      .submit({ trainerId: this.fillingTrainerId, ...result })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.fillingTrainerId = null;
          this.ionicUtilService.showToast({
            message: isEdit
              ? this.translate.instant('ONBOARDING.UPDATED')
              : this.translate.instant('ONBOARDING.SUBMITTED'),
            duration: 3500,
          });
          this.refreshLocalUser();
          this.load(true);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.ionicUtilService.showErrorToast(
            err?.error?.message || this.translate.instant('ONBOARDING.SUBMIT_ERROR'),
            this.translate.instant('COMMON.ERROR'),
            3000
          );
        },
      });
  }

  public trackByTrainerId(_index: number, group: TrainerGroup): string {
    return group.trainerId;
  }
}
