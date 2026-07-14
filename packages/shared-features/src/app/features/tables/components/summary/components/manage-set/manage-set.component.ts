import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController, Platform, ToastOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Set } from 'src/app/core/models/set';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

@Component({
  selector: 'app-manage-set',
  templateUrl: './manage-set.component.html',
  styleUrls: ['./manage-set.component.scss'],
})
export class ManageSetComponent implements OnInit {
  public setForm: FormGroup;
  public set: Set;
  public isCardio: boolean;
  public isIsometric: boolean;

  private backButtonSubscription: any;

  constructor(
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService,
    private platform: Platform
  ) {}

  public ngOnInit(): void {
    this.initSetForm();
  }

  public ionViewDidEnter(): void {
    this.backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(9999, () => {
        this.close();
      });
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
      });
    } else if (this.isCardio) {
      this.setForm = new FormGroup({
        expectedTime: new FormControl(this.set?.expectedTime ?? null),
        expectedDistance: new FormControl(this.set?.expectedDistance),
        velocity: new FormControl(this.set?.velocity),
      });
    } else {
      // Detectar si el set tiene fallo (expectedRir es [-1])
      const hasFail = this.set?.expectedRir?.[0] === -1;

      this.setForm = new FormGroup({
        weight: new FormControl(this.set?.weight),
        drop: new FormControl(this.set?.drop),
        restPause: new FormControl(this.set?.restPause),
        restPauseEnabled: new FormControl(this.set?.restPause ? true : false),
        rir: new FormControl(this.set?.rir),
        isFail: new FormControl(hasFail),
        rangeREPStart: new FormControl(this.set?.expectedReps?.[0]),
        rangeREPEnd: new FormControl(this.set?.expectedReps?.[1]),
        // No mostrar -1 en los campos de RIR, dejar vacío si hay fallo
        rangeRIRStart: new FormControl(
          hasFail ? null : this.set?.expectedRir?.[0]
        ),
        rangeRIREnd: new FormControl(
          hasFail ? null : this.set?.expectedRir?.[1]
        ),
        velocity: new FormControl(this.set?.velocity),
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
    }

    this.modalController.dismiss(set);
  }
}
