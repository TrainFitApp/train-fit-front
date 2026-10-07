import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform, ToastOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Set } from 'src/app/core/models/set';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-set',
  templateUrl: './manage-set.component.html',
  styleUrls: ['./manage-set.component.scss'],
})
export class ManageSetComponent implements OnInit, OnDestroy {
  public readonly isTrainerApp = environment.auth?.clientFamily === 'trainfit-trainers';
  @ViewChild('enterSubmitTarget', { read: ElementRef }) public enterSubmitButton?: ElementRef<HTMLElement>;
  public setForm: FormGroup;
  public set: Set;
  public isCardio: boolean;
  public isIsometric: boolean;
  public readonly REST_PRESETS = [60, 90, 120, 180];
  // Alta continua (planificador de entrenadores): quien abre el panel lo pasa
  // y cada guardado le entrega la serie sin cerrar el panel ni vaciar el
  // formulario, para ir añadiendo series seguidas. Si se abrió editando una
  // serie, el primer guardado la actualiza y los siguientes añaden nuevas.
  public onSetAdded?: (set: Set) => void;
  // Planner: quien abre el panel recibe una función para cargar OTRA serie
  // en este mismo panel (editar otra serie con "Serie objetivo" ya abierto
  // cambia los valores en vez de apilar otro panel encima).
  public registerLoader?: (load: (set?: Set) => void) => void;
  public addedCount = 0;
  public justAdded = false;
  public justUpdated = false;
  private justAddedTimer?: ReturnType<typeof setTimeout>;

  private backButtonSubscription: any;

  constructor(
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService,
    private platform: Platform
  ) {}

  public ngOnInit(): void {
    this.initSetForm();
    this.registerLoader?.((set) => this.loadSet(set));
  }

  // Carga otra serie (o una nueva, sin `set`) en el panel ya abierto. Si hay
  // cambios sin guardar, pregunta antes de descartarlos.
  public loadSet(set?: Set): void {
    const apply = () => {
      this.set = set;
      this.justAdded = false;
      this.justUpdated = false;
      clearTimeout(this.justAddedTimer);
      this.initSetForm();
    };
    if (!this.hasUnsavedChanges()) {
      apply();
      return;
    }
    this.ionicUtilService.showAlert({
      header: this.translate.instant('COMMON.UNSAVED_CHANGES'),
      message: this.translate.instant('TABLES.SWITCH_SET_UNSAVED'),
      buttons: [
        { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          cssClass: 'alert-button-primary',
          handler: () => apply(),
        },
      ],
    });
  }

  public ionViewDidEnter(): void {
    this.backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(9999, () => {
        this.close();
      });
  }

  public ngOnDestroy(): void {
    clearTimeout(this.justAddedTimer);
  }

  public ionViewWillLeave(): void {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  public close(): void {
    if (this.hasUnsavedChanges()) {
      this.showExitConfirmation();
    } else {
      this.modalController.dismiss();
    }
  }

  private hasUnsavedChanges(): boolean {
    if (!this.setForm) return false;

    // Verificar si el formulario está sucio (ha sido modificado)
    return this.setForm.dirty;
  }

  private showExitConfirmation(): void {
    const alertOptions = {
      header: this.translate.instant('COMMON.UNSAVED_CHANGES'),
      message: this.translate.instant('COMMON.UNSAVED_CHANGES_EXIT'),
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.CONFIRM'),
          cssClass: 'alert-button-primary',
          handler: () => {
            this.modalController.dismiss();
          },
        },
      ],
    };
    this.ionicUtilService.showAlert(alertOptions);
  }

  public initSetForm(): void {
    if (this.isIsometric) {
      this.setForm = new FormGroup({
        expectedTime: new FormControl(this.set?.expectedTime ?? null),
        weight: new FormControl(this.set?.weight, [Validators.min(0), Validators.max(2000)]),
        restSeconds: new FormControl(this.set?.restSeconds, [Validators.min(0), Validators.max(600)]),
        restSecondsEnabled: new FormControl(this.set?.restSeconds ? true : false),
      });
    } else if (this.isCardio) {
      this.setForm = new FormGroup({
        expectedTime: new FormControl(this.set?.expectedTime ?? null),
        expectedDistance: new FormControl(this.set?.expectedDistance, [Validators.min(0), Validators.max(100000)]),
        velocity: new FormControl(this.set?.velocity, [Validators.min(0), Validators.max(50)]),
        restSeconds: new FormControl(this.set?.restSeconds, [Validators.min(0), Validators.max(600)]),
        restSecondsEnabled: new FormControl(this.set?.restSeconds ? true : false),
      });
    } else {
      // Detectar si el set tiene fallo (expectedRir es [-1])
      const hasFail = this.set?.expectedRir?.[0] === -1;

      this.setForm = new FormGroup({
        weight: new FormControl(this.set?.weight, [Validators.min(0), Validators.max(2000)]),
        drop: new FormControl(this.set?.drop),
        restPause: new FormControl(this.set?.restPause, [Validators.min(0), Validators.max(600)]),
        restPauseEnabled: new FormControl(this.set?.restPause ? true : false),
        rir: new FormControl(this.set?.rir),
        isFail: new FormControl(hasFail),
        rangeREPStart: new FormControl(this.set?.expectedReps?.[0], [Validators.min(0), Validators.max(999)]),
        rangeREPEnd: new FormControl(this.set?.expectedReps?.[1], [Validators.min(0), Validators.max(999)]),
        // No mostrar -1 en los campos de RIR, dejar vacío si hay fallo
        rangeRIRStart: new FormControl(
          hasFail ? null : this.set?.expectedRir?.[0], [Validators.min(0), Validators.max(20)]
        ),
        rangeRIREnd: new FormControl(
          hasFail ? null : this.set?.expectedRir?.[1], [Validators.min(0), Validators.max(20)]
        ),
        velocity: new FormControl(this.set?.velocity, [Validators.min(0), Validators.max(50)]),
        restSeconds: new FormControl(this.set?.restSeconds, [Validators.min(0), Validators.max(600)]),
        restSecondsEnabled: new FormControl(this.set?.restSeconds ? true : false),
      });

      this.setForm.get('drop').valueChanges.subscribe((res) => {
        if (res)
          this.setForm.get('restPause').setValue(!res, { emitEvent: false });
      });
      this.setForm.get('restPause').valueChanges.subscribe((res) => {
        if (res) this.setForm.get('drop').setValue(!res, { emitEvent: false });
      });

      this.setForm.get('isFail').valueChanges.subscribe((res) => {
        if (res) {
          this.setForm
            .get('rangeRIRStart')
            .setValue(null, { emitEvent: false });
          this.setForm.get('rangeRIREnd').setValue(null, { emitEvent: false });
        }
      });
    }

    // restSecondsEnabled ahora es formControlName (no [checked] de una sola
    // vía), así que se puede togglear tocando el checkbox directamente o la
    // card entera — en ambos casos dispara valueChanges, así que el
    // limpiado del valor va aquí y no en el click handler (que solo cubría
    // el caso "clic en la card").
    this.setForm.get('restSecondsEnabled').valueChanges.subscribe((enabled) => {
      if (!enabled) {
        this.setForm.get('restSeconds')?.setValue(null, { emitEvent: false });
      }
    });
  }

  public get isContinuousAdd(): boolean {
    return this.isTrainerApp && !!this.onSetAdded;
  }

  public get isEditingExisting(): boolean {
    return !!this.set?._id;
  }

  public get canSubmit(): boolean {
    return !!this.setForm?.valid && !this.isRepsRangeInvalid && !this.isRirRangeInvalid;
  }

  public get expectedTimeControl(): FormControl {
    return this.setForm.get('expectedTime') as FormControl;
  }

  public get isRestPauseChecked(): boolean {
    return this.setForm?.get('restPauseEnabled')?.value || false;
  }

  public get isRepsRangeInvalid(): boolean {
    const start = this.setForm?.get('rangeREPStart')?.value;
    const end = this.setForm?.get('rangeREPEnd')?.value;
    if (
      start === null ||
      start === undefined ||
      start === '' ||
      end === null ||
      end === undefined ||
      end === ''
    ) {
      return false;
    }
    return Number(end) <= Number(start);
  }

  public get isRirRangeInvalid(): boolean {
    const start = this.setForm?.get('rangeRIRStart')?.value;
    const end = this.setForm?.get('rangeRIREnd')?.value;
    if (
      start === null ||
      start === undefined ||
      start === '' ||
      end === null ||
      end === undefined ||
      end === ''
    ) {
      return false;
    }
    return Number(end) <= Number(start);
  }

  public setRestPreset(seconds: number): void {
    this.setForm.get('restSeconds')?.setValue(seconds);
  }

  public toggleRestSeconds(): void {
    // El limpiado de restSeconds al desactivar vive en el valueChanges de
    // initSetForm — se dispara igual venga el toggle de aquí (clic en la
    // card) o del propio checkbox (formControlName).
    const control = this.setForm.get('restSecondsEnabled');
    if (control) {
      control.setValue(!control.value);
    }
  }

  public toggleCheckbox(controlName: string): void {
    const control = this.setForm.get(controlName);
    if (control) {
      control.setValue(!control.value);
    }
  }

  public toggleRestPause(): void {
    const control = this.setForm.get('restPauseEnabled');
    if (control) {
      const newValue = !control.value;
      control.setValue(newValue);

      // Si se desactiva, limpiar el valor del input
      if (!newValue) {
        this.setForm.get('restPause')?.setValue(null);
      }
    }
  }

  // Métodos para incrementar/decrementar contadores
  public incrementCounter(controlName: string, startAt: number = 0): void {
    const control = this.setForm.get(controlName);
    if (!control) return;

    const currentValue = control.value;
    // Si es null, undefined o vacío, empezar en startAt
    const newValue =
      currentValue === null || currentValue === undefined || currentValue === ''
        ? startAt
        : Number(currentValue) + 1;

    control.setValue(newValue);
  }

  public decrementCounter(controlName: string, minValue: number = 0): void {
    const control = this.setForm.get(controlName);
    if (!control) return;

    const currentValue = Number(control.value);
    if (currentValue > minValue) {
      control.setValue(currentValue - 1);
    }
  }

  public incrementEndCounter(
    startControlName: string,
    endControlName: string,
    startAt: number = 0
  ): void {
    const startControl = this.setForm.get(startControlName);
    const endControl = this.setForm.get(endControlName);
    if (!endControl || !startControl) return;

    const currentValue = endControl.value;
    const startValue = Number(startControl.value) || startAt;

    // Si es null, undefined o vacío, empezar en el valor de start o startAt
    let newValue: number;
    if (
      currentValue === null ||
      currentValue === undefined ||
      currentValue === ''
    ) {
      newValue = startValue > startAt ? startValue : startAt;
    } else {
      newValue = Number(currentValue) + 1;
    }

    endControl.setValue(newValue);
  }

  public decrementEndCounter(
    startControlName: string,
    endControlName: string
  ): void {
    const startControl = this.setForm.get(startControlName);
    const endControl = this.setForm.get(endControlName);
    if (!endControl || !startControl) return;

    const currentValue = Number(endControl.value);
    const startValue = Number(startControl.value) || 0;

    // No permitir que el valor final sea menor que el valor inicial
    if (currentValue > startValue) {
      endControl.setValue(currentValue - 1);
    }
  }

  public submit(): void {
    if (this.isTrainerApp && !this.canSubmit) return;

    // Validación: Si rest pause está marcado pero no hay segundos
    if (
      this.setForm.get('restPauseEnabled')?.value &&
      (!this.setForm.get('restPause')?.value ||
        this.setForm.get('restPause')?.value <= 0)
    ) {
      const toastOptions: ToastOptions = {
        message: this.translate.instant('TABLES.REST_PAUSE_REQUIRED'),
        duration: 3000,
      };
      this.ionicUtilService.showToast(toastOptions);
      return;
    }

    let set: Set = { ...this.set };

    if (this.isIsometric) {
      if (this.setForm.controls.expectedTime.value) {
        set.expectedTime = this.setForm.controls.expectedTime.value;
      }

      if (
        this.setForm.controls.weight.value !== null &&
        this.setForm.controls.weight.value !== undefined
      )
        set.weight = this.setForm.controls.weight.value;

      // Igual que restPause: si el checkbox está desactivado, no confiar en
      // que el control restSeconds esté ya a null (defensa extra por si el
      // valueChanges no llegó a correr) y forzar null explícitamente.
      set.restSeconds = this.setForm.controls.restSecondsEnabled.value
        ? this.setForm.controls.restSeconds.value ?? null
        : null;
    } else if (this.isCardio) {
      if (this.setForm.controls.expectedTime.value) {
        set.expectedTime = this.setForm.controls.expectedTime.value;
      }

      if (
        this.setForm.controls.expectedDistance.value !== null &&
        this.setForm.controls.expectedDistance.value !== undefined
      )
        set.expectedDistance = this.setForm.controls.expectedDistance.value;

      if (
        this.setForm.controls.velocity.value !== null &&
        this.setForm.controls.velocity.value !== undefined
      )
        set.velocity = this.setForm.controls.velocity.value;

      // Igual que restPause: si el checkbox está desactivado, no confiar en
      // que el control restSeconds esté ya a null (defensa extra por si el
      // valueChanges no llegó a correr) y forzar null explícitamente.
      set.restSeconds = this.setForm.controls.restSecondsEnabled.value
        ? this.setForm.controls.restSeconds.value ?? null
        : null;
    } else {
      if (
        !isNaN(this.setForm.controls.rangeREPStart.value) ||
        !isNaN(this.setForm.controls.rangeREPEnd.value)
      ) {
        set.expectedReps = [];
        if (
          this.setForm.controls.rangeREPStart.value !== null &&
          this.setForm.controls.rangeREPStart.value !== undefined
        )
          set.expectedReps[0] = this.setForm.controls.rangeREPStart.value;

        if (
          this.setForm.controls.rangeREPEnd.value !== null &&
          this.setForm.controls.rangeREPEnd.value !== undefined
        )
          set.expectedReps[1] = this.setForm.controls.rangeREPEnd.value;
      }

      // Procesar isFail (fallo) ANTES de procesar el rango RIR
      const isFail = this.setForm.controls.isFail.value || false;

      if (isFail) {
        // Si hay fallo, establecer expectedRir a [-1]
        set.expectedRir = [-1];
      } else {
        // Si no hay fallo, procesar el rango RIR normalmente
        const hasRirStart =
          this.setForm.controls.rangeRIRStart.value !== null &&
          this.setForm.controls.rangeRIRStart.value !== undefined &&
          this.setForm.controls.rangeRIRStart.value !== '' &&
          !isNaN(this.setForm.controls.rangeRIRStart.value);

        const hasRirEnd =
          this.setForm.controls.rangeRIREnd.value !== null &&
          this.setForm.controls.rangeRIREnd.value !== undefined &&
          this.setForm.controls.rangeRIREnd.value !== '' &&
          !isNaN(this.setForm.controls.rangeRIREnd.value);

        if (hasRirStart || hasRirEnd) {
          set.expectedRir = [];
          if (hasRirStart) {
            set.expectedRir[0] = Number(
              this.setForm.controls.rangeRIRStart.value
            );
          }
          if (hasRirEnd) {
            set.expectedRir[1] = Number(
              this.setForm.controls.rangeRIREnd.value
            );
          }
        } else {
          // Si no hay valores de RIR y no hay fallo, enviar array vacío para que el pre-save hook lo limpie
          set.expectedRir = [];
        }
      }

      if (
        this.setForm.controls.weight.value !== null &&
        this.setForm.controls.weight.value !== undefined
      )
        set.weight = this.setForm.controls.weight.value;

      if (
        this.setForm.controls.drop.value !== null &&
        this.setForm.controls.drop.value !== undefined
      )
        set.drop = this.setForm.controls.drop.value;

      // Si restPauseEnabled está desactivado, establecer restPause como null
      if (!this.setForm.controls.restPauseEnabled.value) {
        set.restPause = null;
      } else if (
        this.setForm.controls.restPause.value !== null &&
        this.setForm.controls.restPause.value !== undefined
      ) {
        set.restPause =
          this.setForm.controls.restPause.value > 0
            ? this.setForm.controls.restPause.value
            : 0;
      }

      if (
        this.setForm.controls.rir.value !== null &&
        this.setForm.controls.rir.value !== undefined
      )
        set.rir = this.setForm.controls.rir.value;

      if (
        this.setForm.controls.velocity.value !== null &&
        this.setForm.controls.velocity.value !== undefined
      )
        set.velocity = this.setForm.controls.velocity.value;

      // Igual que restPause: si el checkbox está desactivado, no confiar en
      // que el control restSeconds esté ya a null (defensa extra por si el
      // valueChanges no llegó a correr) y forzar null explícitamente.
      set.restSeconds = this.setForm.controls.restSecondsEnabled.value
        ? this.setForm.controls.restSeconds.value ?? null
        : null;
    }

    if (this.isContinuousAdd) {
      this.onSetAdded(set);
      this.justUpdated = this.isEditingExisting;
      if (this.justUpdated) {
        // La serie editada ya está guardada: lo siguiente es una serie nueva
        // (sin _id/orden de la editada) con los valores que quedan en pantalla.
        this.set = undefined;
      } else {
        this.addedCount++;
      }
      // Los valores se quedan para la siguiente serie; pristine para que
      // cerrar tras añadir no pregunte por cambios sin guardar.
      this.setForm.markAsPristine();
      this.justAdded = true;
      clearTimeout(this.justAddedTimer);
      this.justAddedTimer = setTimeout(() => (this.justAdded = false), 1500);
      return;
    }

    this.modalController.dismiss(set);
  }
}
