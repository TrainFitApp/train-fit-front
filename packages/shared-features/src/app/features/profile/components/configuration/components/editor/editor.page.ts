import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonModal, Platform, ToastOptions } from '@ionic/angular';
import { Subscription, merge } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import {
  ACTIVITY_FACTOR,
  ACTIVITY_FACTOR_TYPE,
  ACTIVITY_FACTOR_VALUES,
} from 'src/app/shared/constants/activity-factor';
import {
  OBJETIVES,
  OBJETIVES_VALUES,
  OBJETIVE_TYPE,
  OBJETIVE_TYPES,
} from 'src/app/shared/constants/objetives';
import { SEX, SEX_TYPES } from 'src/app/shared/constants/sex';
import {
  STEPS,
  STEPS_TYPES,
  STEPS_VALUES,
} from 'src/app/shared/constants/steps';
import {
  TRAINING_TYPE,
  calculateTrainingValues,
} from 'src/app/shared/constants/training';
import { USER_VALIDATIONS } from 'src/app/shared/constants/user-validations';
import { MACROS_VALUES, MacrosData } from 'src/app/shared/models/macros-data';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonModal) dateModal: IonModal;
  public isDateModalOpen = false;

  public shouldHighlightActivity = false;

  public user: User;
  public initialFormUser: FormGroup;
  public userForm: FormGroup;

  public objetiveSelected: OBJETIVE_TYPE;
  private initialObjetive: number;
  private initialObjetiveType: OBJETIVE_TYPE;
  public objetive$: Subscription;

  public stepsDescription: string;
  public trainingDescription: string;

  public macrosData: MacrosData;

  public loading: boolean;

  public objetiveFinal: number;

  public calculationError: boolean;

  public STEPS_VALUES = STEPS_VALUES;
  public STEPS = STEPS;
  public STEPS_TYPES = STEPS_TYPES;
  public ACTIVITY_FACTOR = ACTIVITY_FACTOR;
  public ACTIVITY_FACTOR_VALUES = ACTIVITY_FACTOR_VALUES;
  public OBJETIVES = OBJETIVES;
  public OBJETIVE_TYPES = OBJETIVE_TYPES;
  public OBJETIVES_VALUES = OBJETIVES_VALUES;
  public SEX = SEX;
  public SEX_TYPES = SEX_TYPES;
  public USER_VALIDATIONS = USER_VALIDATIONS;
  public TRAINING_TYPE_VALUES: TRAINING_TYPE[] = [];
  public Math = Math;

  constructor(
    private navigationService: NavigationService,
    private userService: UserService,
    private ionicUtilService: IonicUtilService,
    private platform: Platform
  ) { }

  public get activityType(): ACTIVITY_FACTOR_TYPE {
    return this.userService.getActivityFactor(
      this.userForm.controls.activity.value
    );
  }

  public ngOnInit(): void {
    this.user = JSON.parse(JSON.stringify(this.userService.getLocalUser));
    this.initUserForm();
  }

  private initUserForm(): void {
    this.initialFormUser = new FormGroup({});
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, USER_VALIDATIONS.name),
      lastname: new FormControl(this.user.lastname, USER_VALIDATIONS.lastname),
      weight: new FormControl(this.user.weight, USER_VALIDATIONS.weight),
      height: new FormControl(this.user.height, USER_VALIDATIONS.height),
      birth: new FormControl(this.user.birth, USER_VALIDATIONS.birth),
      sex: new FormControl(this.user.sex, USER_VALIDATIONS.sex),
      steps: new FormControl(this.user.steps, USER_VALIDATIONS.steps),
      activity: new FormControl(this.user.activity, USER_VALIDATIONS.activity),
      objetive: new FormControl(
        Math.abs(this.user.objetive),
        USER_VALIDATIONS.objetive
      ),
      objetiveType: new FormControl(null, Validators.required),
      training: new FormControl(this.user.training, USER_VALIDATIONS.training),
      kcalTotal: new FormControl(
        Math.round(this.user.kcalTotal),
        USER_VALIDATIONS.kcalTotal
      ),
      proteinsGTotal: new FormControl(
        Math.round(this.user.proteinsGTotal),
        USER_VALIDATIONS.proteinsGTotal
      ),
      carbohydratesGTotal: new FormControl(
        Math.round(this.user.carbohydratesGTotal),
        USER_VALIDATIONS.carbohydratesGTotal
      ),
      fatGTotal: new FormControl(
        Math.round(this.user.fatGTotal),
        USER_VALIDATIONS.fatGTotal
      ),
    });

    this.initObjetive();
    this.initActivity();
    this.initTraining();
    this.initDescriptions();
    this.handleMacros();

    // Verificar validación inicial del campo activity
    this.checkActivityValidation();

    const observables = [
      this.userForm.controls.weight.valueChanges,
      this.userForm.controls.height.valueChanges,
      this.userForm.controls.birth.valueChanges,
      this.userForm.controls.sex.valueChanges,
      this.userForm.controls.steps.valueChanges,
      this.userForm.controls.activity.valueChanges,
      this.userForm.controls.objetive.valueChanges,
      this.userForm.controls.objetiveType.valueChanges,
      this.userForm.controls.training.valueChanges,
    ];

    merge(...observables).subscribe(() => this.autoCalculate());

    Object.keys(this.userForm.value).forEach((controlName) => {
      this.initialFormUser.addControl(
        controlName,
        new FormControl(this.userForm.value[controlName])
      );
    });
  }
  private initDescriptions(): void {
    this.setStepsDescription();
    this.setTrainingDescription();
  }

  private handleMacros(): void {
    const obs = [
      this.userForm.controls.kcalTotal.valueChanges,
      this.userForm.controls.proteinsGTotal.valueChanges,
      this.userForm.controls.carbohydratesGTotal.valueChanges,
      this.userForm.controls.fatGTotal.valueChanges,
    ];

    merge(...obs).subscribe(() => {
      const kcalTotal = this.userForm.controls.kcalTotal.value;
      const proteinsGTotal = this.userForm.controls.proteinsGTotal.value;
      const carbohydratesGTotal =
        this.userForm.controls.carbohydratesGTotal.value;
      const fatGTotal = this.userForm.controls.fatGTotal.value;

      const proteinKcal = proteinsGTotal * MACROS_VALUES.proteins;
      const carbohydratesKcal =
        carbohydratesGTotal * MACROS_VALUES.carbohydrates;
      const fatKcal = fatGTotal * MACROS_VALUES.fat;

      this.calculationError =
        proteinKcal + carbohydratesKcal + fatKcal > kcalTotal + 25 ||
        proteinKcal + carbohydratesKcal + fatKcal < kcalTotal - 25;
    });
  }

  private initTraining(): void {
    let trainingValues = this.updateTrainingOptions(
      this.userForm.controls.steps.value
    );
    this.userForm.controls.training.setValue(
      this.userForm.controls.training.value
    );

    this.userForm.controls.training.valueChanges.subscribe(() =>
      this.setTrainingDescription()
    );

    this.userForm.controls.steps.valueChanges.subscribe((selectedStep) => {
      this.setStepsDescription();
      if (selectedStep === STEPS[STEPS_TYPES.notCounted].value) {
        this.userForm.controls.activity.setValidators(Validators.required);
      } else {
        this.userForm.controls.activity.clearValidators();
      }
      this.userForm.controls.activity.updateValueAndValidity();

      // Primero saca el id con el value del form para saber a que training nos referimos,
      const idTraining = Object.values(trainingValues).find(
        (trainingTemp) =>
          trainingTemp.value === this.userForm.controls.training.value
      ).id;

      trainingValues = this.updateTrainingOptions(selectedStep);

      // Después con ese id sacamos el training pero actualizado de haber cambiado los steps
      const trainingValue = Object.values(trainingValues).find(
        (trainingTemp) => trainingTemp.id === idTraining
      ).value;
      // desppués con el id training sacamos el valor de ese training y se asigna al form
      this.userForm.controls.training.setValue(trainingValue);
    });
  }

  private updateTrainingOptions(selectedStep: number) {
    const trainingValues = calculateTrainingValues(selectedStep);
    if (trainingValues)
      Object.assign(this.TRAINING_TYPE_VALUES, Object.values(trainingValues));
    return trainingValues;
  }

  public selectObjetive(objetive: OBJETIVE_TYPE): void {
    this.objetiveSelected = objetive;
    this.userForm.controls.objetiveType.setValue(objetive.id);
    this.userForm.controls.objetive.setValue(Math.abs(objetive.value));
  }

  public selectObjetiveFromSelect(event: any): void {
    const selectedId = event.detail.value;
    const selectedObjetive = this.OBJETIVES_VALUES.find(
      (obj) => obj.id === selectedId
    );
    if (selectedObjetive) {
      this.selectObjetive(selectedObjetive);
    }
  }

  public changeObjetive(event: any): void {
    const value = Number(event.detail.value);
    this.userForm.controls.objetive.setValue(value);
  }

  public close(): void {
    if (this.checkAndHandleMissingActivity(true)) return;

    if (this.userForm.valid && !this.calculationError) {
      if (
        JSON.stringify(this.userForm.value) !==
        JSON.stringify(this.initialFormUser.value) ||
        this.hasObjetiveChange()
      ) {
        const alertOptions = {
          header: 'Guardar antes de salir',
          message: 'Tienes cambios sin guardar. ¿Qué deseas hacer?',
          cssClass: 'alert-grid-buttons',
          buttons: [
            {
              text: 'CANCELAR',
              role: 'cancel',
            },
            {
              text: 'GUARDAR',
              handler: () => {
                this.updateUser();
              },
            },
            {
              text: 'NO GUARDAR',
              role: 'destructive',
              handler: () => {
                this.objetiveSelected = this.initialObjetiveType;
                this.userForm.reset(this.initialFormUser.value);
                this.autoCalculate();
                this.ionicUtilService.closeModal();
              },
            },
          ],
        };
        this.ionicUtilService.showAlert(alertOptions);
      } else this.ionicUtilService.closeModal();
    } else {
      const alertOptions = {
        header: 'Faltan campos requeridos',
        message:
          'Por favor, completa todos los campos obligatorios antes de continuar.',
        buttons: [
          {
            text: 'ENTENDIDO',
            role: 'cancel',
          },
        ],
      };
      this.ionicUtilService.showAlert(alertOptions);
    }
  }

  public autoCalculate(): void {
    this.setFinalObjetive();
    setTimeout(() => {
      const userWithFormValues = {
        ...this.user,
        ...this.userForm.value,
        objetive: this.objetiveFinal,
      };
      const user = this.userService.setUserMacrosAndKcal(userWithFormValues);
      Object.assign(this.user, user);
      this.calculate();
      // para que entre en el valueChanges
      this.userForm.controls.kcalTotal.setValue(
        this.userForm.controls.kcalTotal.value
      );
    });
  }

  public setStepsDescription(): void {
    this.stepsDescription = STEPS_VALUES.find(
      (sTemp) => sTemp.value === this.userForm.controls.steps.value
    ).name;
  }

  public setTrainingDescription(): void {
    this.trainingDescription = this.TRAINING_TYPE_VALUES.find(
      (tTemp) => tTemp.value === this.userForm.controls.training.value
    ).name;
  }

  public calculate(): void {
    this.userForm.controls.kcalTotal.setValue(Math.round(this.user.kcalTotal), {
      emitEvent: false,
    });
    this.userForm.controls.proteinsGTotal.setValue(
      Math.round(this.user.proteinsGTotal),
      {
        emitEvent: false,
      }
    );
    this.userForm.controls.carbohydratesGTotal.setValue(
      Math.round(this.user.carbohydratesGTotal),
      {
        emitEvent: false,
      }
    );
    this.userForm.controls.fatGTotal.setValue(Math.round(this.user.fatGTotal), {
      emitEvent: false,
    });
  }

  public updateUser(): void {
    // Verificar validación antes de proceder
    if (this.checkAndHandleMissingActivity(false)) return;

    if (!this.userForm.valid) {
      const alertOptions = {
        header: 'Faltan campos requeridos',
        message:
          'Por favor, completa todos los campos obligatorios antes de guardar.',
        buttons: [
          {
            text: 'ENTENDIDO',
            role: 'cancel',
          },
        ],
      };
      this.ionicUtilService.showAlert(alertOptions);
      return;
    }

    this.loading = true;

    // Crear objeto con solo los campos que han cambiado
    const userToUpdate: Partial<User> = {};
    const formValue = this.userForm.value;

    // Comparar cada campo con el valor inicial y solo incluir los que han cambiado
    Object.keys(formValue).forEach((key) => {
      if (
        key !== 'objetiveType' &&
        formValue[key] !== this.initialFormUser.value[key]
      ) {
        userToUpdate[key] = formValue[key];
      }
    });

    // Verificar si el objetivo ha cambiado
    if (this.hasObjetiveChange()) {
      userToUpdate.objetive = this.objetiveFinal;
    }

    // Solo actualizar si hay cambios
    if (Object.keys(userToUpdate).length === 0) {
      this.ionicUtilService.showToast({
        message: 'No hay cambios para guardar',
        color: 'warning',
        duration: 2000,
      } as ToastOptions);
      this.loading = false;
      return;
    }

    // Incluir el _id del usuario para la actualización
    userToUpdate._id = this.user._id;

    // IMPORTANTE: Preservar workoutInUse y tableInUse para evitar que se deseleccionen
    if (this.user.workoutInUse !== undefined) {
      userToUpdate.workoutInUse = this.user.workoutInUse;
    }
    if (this.user.tableInUse !== undefined) {
      userToUpdate.tableInUse = this.user.tableInUse;
    }

    this.userService.updateUser(userToUpdate as User).subscribe({
      next: (user: User) => {
        this.user = user;
        this.userService.setLocalUser = user; // Actualizar el usuario local
        this.ionicUtilService.showToast({
          message: 'Usuario actualizado correctamente',
          color: 'success',
          duration: 2000,
        } as ToastOptions);
        this.ionicUtilService.closeModal();
        this.loading = false;
      },
      error: (error) => {
        this.ionicUtilService.showToast({
          message: 'Error al actualizar el usuario',
          color: 'danger',
          duration: 2000,
        } as ToastOptions);
        this.loading = false;
      },
    });
  }

  private initObjetive(): void {
    // Determinar el tipo de objetivo basado en el valor actual
    let objetiveType: OBJETIVE_TYPES;
    if (this.user.objetive > 0) {
      objetiveType = OBJETIVE_TYPES.gain;
    } else if (this.user.objetive < 0) {
      objetiveType = OBJETIVE_TYPES.loss;
    } else {
      objetiveType = OBJETIVE_TYPES.maintenance;
    }

    this.userForm.controls.objetiveType.setValue(objetiveType);

    if (this.user.objetive > 0)
      this.objetiveSelected = OBJETIVES[OBJETIVE_TYPES.gain];
    else if (this.user.objetive < 0)
      this.objetiveSelected = OBJETIVES[OBJETIVE_TYPES.loss];
    else this.objetiveSelected = OBJETIVES[OBJETIVE_TYPES.maintenance];

    this.userForm.controls.objetive.setValue(
      Math.abs(this.userForm.controls.objetive.value)
    );

    this.initialObjetive = this.user.objetive;
    this.initialObjetiveType = { ...this.objetiveSelected };

    this.setFinalObjetive();

    this.handleObjetive();
  }

  private handleObjetive(): void {
    this.userForm.controls.objetiveType.valueChanges.subscribe((value) => {
      if (value === OBJETIVE_TYPES.maintenance) {
        this.userForm.controls.objetive.setValue(0);
      }
    });
  }

  private initActivity(): void {
    this.userForm.controls.steps.valueChanges.subscribe((res) => {
      if (res === STEPS[STEPS_TYPES.notCounted].value) {
        this.userForm.controls.activity.setValidators(Validators.required);
        this.userForm.controls.activity.setValue(null);
      } else {
        this.userForm.controls.activity.clearValidators();
      }
      this.userForm.controls.activity.updateValueAndValidity();
    });
  }

  private setFinalObjetive(): void {
    const objetiveType = this.userForm.controls.objetiveType.value;
    const objetiveValue = this.userForm.controls.objetive.value;

    if (objetiveType === OBJETIVE_TYPES.loss) {
      this.objetiveFinal = -Math.abs(objetiveValue);
    } else if (objetiveType === OBJETIVE_TYPES.gain) {
      this.objetiveFinal = Math.abs(objetiveValue);
    } else {
      this.objetiveFinal = 0;
    }
  }

  private hasObjetiveChange(): boolean {
    return (
      this.initialObjetiveType.id !== this.objetiveSelected.id ||
      this.initialObjetive !== this.objetiveFinal
    );
  }

  // Métodos para el selector de fecha mejorado
  public openDatePicker(): void {
    const datetimeButton = document.querySelector('#datetime-button') as any;
    if (datetimeButton) {
      datetimeButton.click();
    }
  }

  public onDateChange(event: any): void {
    const selectedDate = event.detail.value;
    if (selectedDate) {
      this.userForm.get('birth')?.setValue(selectedDate);
      this.userForm.get('birth')?.markAsTouched();
    }
  }

  public getFormattedBirthDate(): string {
    const birthValue = this.userForm.get('birth')?.value;
    if (!birthValue) return '';

    const date = new Date(birthValue);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    return date.toLocaleDateString('es-ES', options);
  }

  public calculateAge(): number {
    const birthValue = this.userForm.get('birth')?.value;
    if (!birthValue) return 0;

    const birthDate = new Date(birthValue);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  private _maxDate: string | null = null;
  private _minDate: string | null = null;

  public getMaxDate(): string {
    if (!this._maxDate) {
      // Máximo: hace 13 años (edad mínima)
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - 13);
      this._maxDate = maxDate.toISOString();
    }
    return this._maxDate;
  }

  public getMinDate(): string {
    if (!this._minDate) {
      // Mínimo: hace 120 años (edad máxima razonable)
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 120);
      this._minDate = minDate.toISOString();
    }
    return this._minDate;
  }

  private checkActivityValidation(): void {
    // Verificar si el campo activity debe ser requerido al inicializar
    if (
      this.userForm.controls.steps.value === STEPS[STEPS_TYPES.notCounted].value
    ) {
      this.userForm.controls.activity.setValidators(Validators.required);
      this.userForm.controls.activity.updateValueAndValidity();
    }
  }

  private checkAndHandleMissingActivity(isClosing: boolean = false): boolean {
    const stepsValue = this.userForm.controls.steps.value;
    const activityControl = this.userForm.controls.activity;

    if (
      stepsValue === STEPS[STEPS_TYPES.notCounted].value &&
      (activityControl.value === null || activityControl.value === undefined || activityControl.value === '')
    ) {
      const buttons: any[] = [
        {
          text: 'RELLENAR',
          handler: () => {
            this.scrollToActivityAndHighlight();
          },
        },
      ];

      if (isClosing) {
        buttons.push({
          text: 'NO GUARDAR',
          role: 'destructive',
          handler: () => {
            this.objetiveSelected = this.initialObjetiveType;
            this.userForm.reset(this.initialFormUser.value);
            this.autoCalculate();
            this.ionicUtilService.closeModal();
          },
        });
      }

      const alertOptions = {
        header: 'Nivel de actividad obligatorio',
        message: 'Has seleccionado que no cuentas tus pasos, por lo que es obligatorio rellenar el nivel de actividad.',
        buttons: buttons,
      };
      this.ionicUtilService.showAlert(alertOptions);
      return true;
    }
    return false;
  }

  private scrollToActivityAndHighlight(): void {
    const element = document.getElementById('activity-card');
    if (element) {
      const yOffset = element.offsetTop - 100; // Ajuste para que no quede pegado arriba
      this.content.scrollToPoint(0, yOffset, 800);

      // Activar animación
      this.shouldHighlightActivity = true;
      setTimeout(() => {
        this.shouldHighlightActivity = false;
      }, 2500); // Duración de la animación + un poco más
    }
  }
}
