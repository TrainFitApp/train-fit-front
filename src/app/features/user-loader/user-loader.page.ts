import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Diet } from 'src/app/core/models/diet';
import { Table } from 'src/app/core/models/table';
import { User } from 'src/app/core/models/user';
import { Workout } from 'src/app/core/models/workout';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DietService } from 'src/app/core/services/diet/diet.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { UserLocalstorageService } from 'src/app/core/services/user/user-localstorage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { ThemeService } from 'src/app/core/services/util/theme.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';

@Component({
  selector: 'app-user-loader',
  templateUrl: './user-loader.page.html',
  styleUrls: ['./user-loader.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        animate('500ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('logoAnimation', [
      state('in', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
    trigger('textAnimation', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('400ms 300ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('progressAnimation', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('400ms 600ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class UserLoaderPage implements OnInit, OnDestroy {
  // Configuración de timeouts
  private readonly LOADING_CONFIG = {
    STEP_DELAY: 300,
    COMPLETION_DELAY: 800,
    EXIT_ANIMATION_DELAY: 500,
  };

  // Variables de estado
  public email: string;
  public loadingStep: number = 0;
  public animationState = 'in';
  public progress = 0;
  public loadingText = 'Iniciando sesión...';

  private readonly loadingMessages = [
    'Iniciando sesión...',
    'Cargando perfil...',
    'Preparando rutinas...',
    'Cargando dieta...',
    'Finalizando...',
  ];

  constructor(
    private userService: UserService,
    private tableService: TableService,
    private dietService: DietService,
    private workoutService: WorkoutService,
    private themeService: ThemeService,
    private navigationService: NavigationService,
    private authService: AuthService,
    private userLocalStorage: UserLocalstorageService
  ) {
    this.email = this.authService.getDecodedUser(
      this.userLocalStorage.getUserToken()
    )?.email;
  }

  ngOnInit() {
    this.startLoadingSequence();
  }

  private startLoadingSequence(): void {
    this.updateLoadingStep(1);
    this.updateProgress(10); // Inicio

    this.userService
      .getUserByEmail(this.email)
      .pipe(
        switchMap((resUser) => {
          this.updateLoadingStep(2);
          this.updateProgress(30); // Usuario cargado
          this.userService.setLocalUser = resUser;

          // Verificar explícitamente si el registro no se terminó
          if (!this.isUserRegistrationComplete(resUser)) {
            throw new Error('INCOMPLETE_USER');
          }

          this.themeService.toggleColorMode(resUser.theme || 'dark');

          this.updateLoadingStep(3);
          this.updateProgress(40); // Preparando datos adicionales

          let tableObservable: Observable<Table>;
          if (resUser.tableInUse) {
            tableObservable = this.tableService.getTableById(
              resUser.tableInUse
            );
          } else tableObservable = of(null);

          let dietObservable: Observable<Diet>;
          if (resUser.dietInUse) {
            dietObservable = this.dietService.getDietById(resUser.dietInUse);
          } else dietObservable = of(null);

          let workoutInUseObservable: Observable<Workout>;
          if (resUser.workoutInUse) {
            workoutInUseObservable = this.workoutService.getWorkoutById(
              resUser.workoutInUse
            );
          } else workoutInUseObservable = of(null);

          return forkJoin([
            tableObservable,
            dietObservable,
            workoutInUseObservable,
          ]);
        })
      )
      .subscribe(
        ([resTable, resDiet, resWorkoutInUse]) => {
          this.updateLoadingStep(4);
          this.updateProgress(80); // Datos cargados

          if (resTable) {
            this.tableService.setCurrentTable = resTable;
          }

          if (resDiet) {
            this.dietService.setCurrentDiet = resDiet;
          }

          if (resWorkoutInUse) {
            this.workoutService.setCurrentWorkout = resWorkoutInUse;
          }

          // Paso final usando configuración
          setTimeout(() => {
            this.updateLoadingStep(5);
            this.updateProgress(100); // Completado
            this.loadingText = '¡Listo!';

            setTimeout(() => {
              this.startExitAnimation();
              setTimeout(() => {
                this.navigationService.goToTabsPage();
              }, this.LOADING_CONFIG.EXIT_ANIMATION_DELAY);
            }, this.LOADING_CONFIG.COMPLETION_DELAY);
          }, this.LOADING_CONFIG.STEP_DELAY);
        },
        (err) => {
          if (err.message === 'INCOMPLETE_USER') {
            // Usuario está incompleto, redirigir a registro sin hacer logout
            this.navigationService.goToSignUp();
            return;
          }

          console.error('Error cargando usuario inicial:', err);
          this.userService.setLocalUser = null;
          this.workoutService.setCurrentWorkout = null;
          this.dietService.setCurrentDiet = null;
          this.tableService.setCurrentTable = null;
          this.authService.logout();
        }
      );
  }

  /**
   * Verifica si el usuario completó todos los datos de registro (macros, medidas, etc.)
   */
  private isUserRegistrationComplete(user: User): boolean {
    return !!(user?.name && user?.lastname && user?.weight && user?.height);
  }

  ngOnDestroy() {
    // Cleanup no longer needed since we removed fake intervals
  }

  // Método para actualizar el progreso real
  private updateProgress(value: number): void {
    this.progress = Math.min(value, 100);
  }

  // Método para iniciar animación de salida
  startExitAnimation() {
    this.animationState = 'out';
  }

  private updateLoadingStep(step: number): void {
    this.loadingStep = step;
    if (step <= this.loadingMessages.length) {
      this.loadingText = this.loadingMessages[step - 1];
    }
  }
}
