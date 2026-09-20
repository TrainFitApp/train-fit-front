import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Anthropometry, AnthropometryDTO } from 'src/app/features/diet-days/components/weight-info/models/anthropometry';
import { AnthropometryService } from 'src/app/core/services/anthropometry/anthropometry.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';

@Component({
  selector: 'app-anthropometry-modal',
  templateUrl: './anthropometry-modal.component.html',
  styleUrls: ['./anthropometry-modal.component.scss'],
})
export class AnthropometryModalComponent implements OnInit {
  @Input() existingData: Anthropometry | null = null;
  @Input() selectedDate: string = '';
  @Input() allAnthropometryData: Anthropometry[] = [];
  form: FormGroup;
  isLoading = false;
  maxDate = new Date().toISOString();
  // Catálogo completo — mismo campo que ya escribe el check-in del trainer
  // (ver checkin-field-catalog.js, storage: "anthropometry"): antes este
  // formulario solo tenía 11 campos y usaba bicepsRelaxed/bicepsContracted/calf
  // sin lateralidad, ya deprecados (ver anthropometry-schema.js, backend) —
  // desalineado con lo que el resto de la app ya lee/escribe.
  measurementFields = [
    { key: 'weight', label: 'ANTHROPOMETRY.WEIGHT', unit: 'kg', step: 0.1 },
    { key: 'muscleMass', label: 'ANTHROPOMETRY.MUSCLE_MASS', unit: 'kg', step: 0.1 },
    { key: 'fatMass', label: 'ANTHROPOMETRY.FAT_MASS', unit: 'kg', step: 0.1 },
    { key: 'boneMass', label: 'ANTHROPOMETRY.BONE_MASS', unit: 'kg', step: 0.1 },
    { key: 'residualMass', label: 'ANTHROPOMETRY.RESIDUAL_MASS', unit: 'kg', step: 0.1 },
    { key: 'neck', label: 'ANTHROPOMETRY.NECK', unit: 'cm', step: 0.1 },
    { key: 'shoulders', label: 'ANTHROPOMETRY.SHOULDERS', unit: 'cm', step: 0.1 },
    { key: 'chest', label: 'ANTHROPOMETRY.CHEST', unit: 'cm', step: 0.1 },
    { key: 'waist', label: 'ANTHROPOMETRY.WAIST', unit: 'cm', step: 0.1 },
    { key: 'abdomen', label: 'ANTHROPOMETRY.ABDOMEN', unit: 'cm', step: 0.1 },
    { key: 'hip', label: 'ANTHROPOMETRY.HIP', unit: 'cm', step: 0.1 },
    { key: 'bicepsRelaxedL', label: 'ANTHROPOMETRY.BICEPS_RELAXED_L', unit: 'cm', step: 0.1 },
    { key: 'bicepsRelaxedR', label: 'ANTHROPOMETRY.BICEPS_RELAXED_R', unit: 'cm', step: 0.1 },
    { key: 'bicepsContractedL', label: 'ANTHROPOMETRY.BICEPS_CONTRACTED_L', unit: 'cm', step: 0.1 },
    { key: 'bicepsContractedR', label: 'ANTHROPOMETRY.BICEPS_CONTRACTED_R', unit: 'cm', step: 0.1 },
    { key: 'quadL', label: 'ANTHROPOMETRY.QUAD_L', unit: 'cm', step: 0.1 },
    { key: 'quadR', label: 'ANTHROPOMETRY.QUAD_R', unit: 'cm', step: 0.1 },
    { key: 'thighRelaxed', label: 'ANTHROPOMETRY.THIGH_RELAXED', unit: 'cm', step: 0.1 },
    { key: 'thighContracted', label: 'ANTHROPOMETRY.THIGH_CONTRACTED', unit: 'cm', step: 0.1 },
    { key: 'calfL', label: 'ANTHROPOMETRY.CALF_L', unit: 'cm', step: 0.1 },
    { key: 'calfR', label: 'ANTHROPOMETRY.CALF_R', unit: 'cm', step: 0.1 },
    { key: 'ankleL', label: 'ANTHROPOMETRY.ANKLE_L', unit: 'cm', step: 0.1 },
    { key: 'ankleR', label: 'ANTHROPOMETRY.ANKLE_R', unit: 'cm', step: 0.1 },
  ];

  async openDatePicker(): Promise<void> {
    if (this.form.dirty) {
      const result = await this.ionicUtilService.showAlert({
        header: this.translate.instant('COMMON.UNSAVED_CHANGES'),
        message: this.translate.instant('COMMON.UNSAVED_CHANGES_DISCARD'),
        buttons: [
          { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
          { text: this.translate.instant('COMMON.DISCARD'), role: 'discard' },
        ],
      });
      if (result.role !== 'discard') return;
    }
    const btn = document.getElementById('anthropometry-date-btn');
    if (btn) btn.click();
  }

  onDateChange(event: any): void {
    if (event.detail.value) {
      this.selectedDate = (event.detail.value as string).split('T')[0];
      const existing = this.allAnthropometryData.find(
        (a) => a.date === this.selectedDate
      );
      if (existing) {
        this.measurementFields.forEach((field) => {
          const value = existing[field.key as keyof Anthropometry];
          this.form.get(field.key)?.setValue(value ?? null);
        });
      } else {
        this.measurementFields.forEach((field) => {
          this.form.get(field.key)?.setValue(null);
        });
      }
      this.form.markAsPristine();
    }
  }

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private translate: TranslateService,
    private anthropometryService: AnthropometryService,
    private ionicUtilService: IonicUtilService
  ) {
    this.form = this.fb.group({});
    this.measurementFields.forEach((field) => {
      this.form.addControl(field.key, this.fb.control(null, [Validators.min(0), Validators.max(999)]));
    });
  }

  ngOnInit(): void {
    if (this.existingData) {
      this.measurementFields.forEach((field) => {
        const value = this.existingData[field.key as keyof Anthropometry];
        if (value !== undefined && value !== null) {
          this.form.get(field.key)?.setValue(value);
        }
      });
    }
    this.form.markAsPristine();
  }

  async onSave(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const data: Record<string, number | string> = { date: this.selectedDate };
    let hasData = false;

    this.measurementFields.forEach((field) => {
      const rawValue = this.form.get(field.key)?.value;
      const value = rawValue !== null && rawValue !== undefined && rawValue !== '' ? Number(rawValue) : null;
      if (value !== null && !isNaN(value)) {
        data[field.key] = value;
        hasData = true;
      }
    });

    if (!hasData) {
      await this.ionicUtilService.showWarningToast(this.translate.instant('ANTHROPOMETRY.ENTER_AT_LEAST_ONE'));
      this.isLoading = false;
      return;
    }

    try {
      const result = await this.anthropometryService.upsertAnthropometry(
        data as any
      ).toPromise();

      this.modalController.dismiss(result, 'saved');
    } catch (error: unknown) {
      await this.ionicUtilService.showWarningToast(this.translate.instant('ANTHROPOMETRY.ERROR_SAVING'));
      this.isLoading = false;
    }
  }

  async onCancel(): Promise<void> {
    if (!this.form.dirty) {
      this.modalController.dismiss(null, 'cancel');
      return;
    }

    const t = this.translate.instant.bind(this.translate);
    const alertResult = await this.ionicUtilService.showAlert({
      cssClass: 'unsaved-exit-alert',
      header: t('COMMON.UNSAVED_CHANGES'),
      message: t('COMMON.UNSAVED_CHANGES_SAVE'),
      buttons: [
        {
          text: t('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'unsaved-neutral-btn unsaved-cancel-btn',
        },
        {
          text: t('COMMON.SAVE'),
          role: 'save',
          cssClass: 'unsaved-save-btn',
        },
        {
          text: t('COMMON.DISCARD'),
          role: 'discard',
          cssClass: 'unsaved-neutral-btn unsaved-discard-btn',
        },
      ],
    });

    if (alertResult.role === 'save') {
      await this.onSave();
    } else if (alertResult.role === 'discard') {
      this.modalController.dismiss(null, 'cancel');
    }
  }

  get locale(): string {
    return this.translate.currentLang;
  }

  get displayDate(): string {
    if (!this.selectedDate) return '';
    return new Date(this.selectedDate).toLocaleDateString(this.translate.currentLang, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getFieldLabel(key: string): string {
    const field = this.measurementFields.find((f) => f.key === key);
    return field ? this.translate.instant(field.label) : key;
  }

  getFieldUnit(key: string): string {
    const field = this.measurementFields.find((f) => f.key === key);
    return field ? field.unit : '';
  }
}