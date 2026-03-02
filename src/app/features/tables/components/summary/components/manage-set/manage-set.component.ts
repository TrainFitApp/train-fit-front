import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController, Platform, ToastOptions } from '@ionic/angular';
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

  private backButtonSubscription: any;

  constructor(
    private modalController: ModalController,
    private ionicUtilService: IonicUtilService,
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
      header: 'Cambios sin guardar',
      message: '¿Deseas salir sin guardar los cambios?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'CONFIRMAR',
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
    if (this.isCardio) {
      this.setForm = new FormGroup({
        expectedSec: new FormControl(this.set?.expectedSec),
        expectedMin: new FormControl(this.set?.expectedMin),
        velocity: new FormControl(this.set?.velocity),
      });
    } else {
      this.setForm = new FormGroup({
        weight: new FormControl(this.set?.weight),
        drop: new FormControl(this.set?.drop),
        restPause: new FormControl(this.set?.restPause),
        restPauseEnabled: new FormControl(this.set?.restPause ? true : false),
        rir: new FormControl(this.set?.rir),
        expectedFail: new FormControl(this.set?.expectedFail),
        rangeREPStart: new FormControl(this.set?.expectedReps?.[0]),
        rangeREPEnd: new FormControl(this.set?.expectedReps?.[1]),
        rangeRIRStart: new FormControl(this.set?.expectedRir?.[0]),
        rangeRIREnd: new FormControl(this.set?.expectedRir?.[1]),
        velocity: new FormControl(this.set?.velocity),
      });

      this.setForm.get('drop').valueChanges.subscribe((res) => {
        if (res)
          this.setForm.get('restPause').setValue(!res, { emitEvent: false });
      });
      this.setForm.get('restPause').valueChanges.subscribe((res) => {
        if (res) this.setForm.get('drop').setValue(!res, { emitEvent: false });
      });

      this.setForm.get('expectedFail').valueChanges.subscribe((res) => {
        if (res) {
          this.setForm
            .get('rangeRIRStart')
            .setValue(null, { emitEvent: false });
          this.setForm.get('rangeRIREnd').setValue(null, { emitEvent: false });
        }
      });
    }
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
        message: 'Debes ingresar los segundos de descanso para REST PAUSE',
        duration: 3000,
      };
      this.ionicUtilService.showToast(toastOptions);
      return;
    }

    let set: Set = { ...this.set };

    if (this.isCardio) {
      if (
        this.setForm.controls.expectedSec.value !== null &&
        this.setForm.controls.expectedSec.value !== undefined
      )
        set.expectedSec = this.setForm.controls.expectedSec.value;

      if (
        this.setForm.controls.expectedMin.value !== null &&
        this.setForm.controls.expectedMin.value !== undefined
      )
        set.expectedMin = this.setForm.controls.expectedMin.value;

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

      if (
        !isNaN(this.setForm.controls.rangeRIRStart.value) ||
        !isNaN(this.setForm.controls.rangeRIREnd.value)
      ) {
        set.expectedRir = [];
        if (
          this.setForm.controls.rangeRIRStart.value !== null &&
          this.setForm.controls.rangeRIRStart.value !== undefined
        )
          set.expectedRir[0] = this.setForm.controls.rangeRIRStart.value;

        if (
          this.setForm.controls.rangeRIREnd.value !== null &&
          this.setForm.controls.rangeRIREnd.value !== undefined
        )
          set.expectedRir[1] = this.setForm.controls.rangeRIREnd.value;
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
        this.setForm.controls.expectedFail.value !== null &&
        this.setForm.controls.expectedFail.value !== undefined
      )
        set.expectedFail = this.setForm.controls.expectedFail.value;

      if (
        this.setForm.controls.velocity.value !== null &&
        this.setForm.controls.velocity.value !== undefined
      )
        set.velocity = this.setForm.controls.velocity.value;
    }

    this.modalController.dismiss(set);
  }
}
