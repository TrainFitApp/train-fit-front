import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  MaintenanceConfigApiService,
  RemoteConfig,
} from './services/maintenance-config-api.service';

const SEMVER_REGEX = /^\d+\.\d+\.\d+$/;

type PreviewState = 'normal' | 'warning' | 'active';

@Component({
  selector: 'app-maintenance-config',
  templateUrl: './maintenance-config.page.html',
  styleUrls: ['./maintenance-config.page.scss'],
})
export class MaintenanceConfigPage implements OnInit {
  private readonly navigationService = inject(NavigationService);
  private readonly ionicUtil = inject(IonicUtilService);
  private readonly translate = inject(TranslateService);
  private readonly maintenanceApi = inject(MaintenanceConfigApiService);

  public loading = true;
  public saving = false;

  // Snapshot of the last loaded/saved config, used to know what actually changed.
  private lastSavedEnabled = false;
  private lastSavedMinVersionIos = '';
  private lastSavedMinVersionAndroid = '';

  public maintenanceEnabled = false;
  public startAt = '';
  public endAt = '';
  public warningFrom = '';
  public message = '';
  public warningMessage = '';

  public minVersionIos = '';
  public minVersionAndroid = '';
  public forceUpdateMessage = '';

  public updatedBy = '';
  public updatedAt = '';

  public ngOnInit(): void {
    this.loadConfig();
  }

  public goBack(): void {
    this.navigationService.goBack();
  }

  public loadConfig(): void {
    this.loading = true;
    this.maintenanceApi.getConfig().subscribe({
      next: (res) => {
        this.applyConfig(res.config);
        this.loading = false;
      },
      error: (err) => {
        this.ionicUtil.showErrorToast(err, this.translate.instant('MANAGEMENT.MAINTENANCE.LOAD_ERROR'));
        this.loading = false;
      },
    });
  }

  private applyConfig(config: RemoteConfig): void {
    const maintenance = config?.maintenance || ({} as RemoteConfig['maintenance']);
    const forceUpdate = config?.forceUpdate || ({} as RemoteConfig['forceUpdate']);

    this.maintenanceEnabled = !!maintenance.enabled;
    this.startAt = this.isoToDatetimeLocal(maintenance.startAt);
    this.endAt = this.isoToDatetimeLocal(maintenance.endAt);
    this.warningFrom = this.isoToDatetimeLocal(maintenance.warningFrom);
    this.message = maintenance.message || '';
    this.warningMessage = maintenance.warningMessage || '';

    this.minVersionIos = forceUpdate.minVersionIos || '';
    this.minVersionAndroid = forceUpdate.minVersionAndroid || '';
    this.forceUpdateMessage = forceUpdate.message || '';

    this.updatedBy = config?.updatedBy || '';
    this.updatedAt = config?.updatedAt || '';

    this.lastSavedEnabled = this.maintenanceEnabled;
    this.lastSavedMinVersionIos = this.minVersionIos;
    this.lastSavedMinVersionAndroid = this.minVersionAndroid;
  }

  // Mismo algoritmo que remote-config-service.js#calculateMaintenanceStatus,
  // para poder previsualizar el efecto de cambios SIN guardar (GET /config
  // leería el estado ya persistido, no el formulario en edición).
  public get previewState(): PreviewState {
    if (!this.maintenanceEnabled) return 'normal';

    const now = new Date();
    const startAt = this.startAt ? new Date(this.startAt) : null;
    const endAt = this.endAt ? new Date(this.endAt) : null;
    const warningFrom = this.warningFrom ? new Date(this.warningFrom) : null;

    if (endAt && now > endAt) return 'normal';

    if (startAt && now < startAt) {
      if (warningFrom && now >= warningFrom) return 'warning';
      return 'normal';
    }

    return 'active';
  }

  public getValidationErrors(): string[] {
    const errors: string[] = [];
    const startAt = this.startAt ? new Date(this.startAt) : null;
    const endAt = this.endAt ? new Date(this.endAt) : null;
    const warningFrom = this.warningFrom ? new Date(this.warningFrom) : null;

    if (warningFrom && !startAt) {
      errors.push(this.translate.instant('MANAGEMENT.MAINTENANCE.ERROR_WARNING_NEEDS_START'));
    }
    if (endAt && !startAt) {
      errors.push(this.translate.instant('MANAGEMENT.MAINTENANCE.ERROR_END_NEEDS_START'));
    }
    if (startAt && endAt && startAt >= endAt) {
      errors.push(this.translate.instant('MANAGEMENT.MAINTENANCE.ERROR_START_BEFORE_END'));
    }
    if (warningFrom && startAt && warningFrom >= startAt) {
      errors.push(this.translate.instant('MANAGEMENT.MAINTENANCE.ERROR_WARNING_BEFORE_START'));
    }
    if (this.minVersionIos && !SEMVER_REGEX.test(this.minVersionIos)) {
      errors.push(this.translate.instant('MANAGEMENT.MAINTENANCE.ERROR_INVALID_VERSION_IOS'));
    }
    if (this.minVersionAndroid && !SEMVER_REGEX.test(this.minVersionAndroid)) {
      errors.push(this.translate.instant('MANAGEMENT.MAINTENANCE.ERROR_INVALID_VERSION_ANDROID'));
    }

    return errors;
  }

  public save(): void {
    const errors = this.getValidationErrors();
    if (errors.length > 0) {
      this.ionicUtil.showWarningToast(errors[0]);
      return;
    }

    const isEscalation =
      (this.maintenanceEnabled && !this.lastSavedEnabled) ||
      (!!this.minVersionIos && this.minVersionIos !== this.lastSavedMinVersionIos) ||
      (!!this.minVersionAndroid && this.minVersionAndroid !== this.lastSavedMinVersionAndroid);

    if (isEscalation) {
      this.ionicUtil
        .showAlert({
          header: this.translate.instant('MANAGEMENT.MAINTENANCE.CONFIRM_HEADER'),
          message: this.translate.instant('MANAGEMENT.MAINTENANCE.CONFIRM_MESSAGE'),
          buttons: [
            { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
            {
              text: this.translate.instant('MANAGEMENT.MAINTENANCE.CONFIRM_SAVE'),
              role: 'confirm',
              cssClass: 'danger-btn',
            },
          ],
        })
        .then((alertRes) => {
          if (alertRes?.role === 'confirm') {
            this.doSave();
          }
        });
      return;
    }

    this.doSave();
  }

  private doSave(): void {
    this.saving = true;
    const patch: Partial<RemoteConfig> = {
      maintenance: {
        enabled: this.maintenanceEnabled,
        startAt: this.datetimeLocalToIso(this.startAt),
        endAt: this.datetimeLocalToIso(this.endAt),
        message: this.message,
        warningMessage: this.warningMessage,
        warningFrom: this.datetimeLocalToIso(this.warningFrom),
      },
      forceUpdate: {
        minVersionIos: this.minVersionIos,
        minVersionAndroid: this.minVersionAndroid,
        message: this.forceUpdateMessage,
      },
    };

    this.maintenanceApi.updateConfig(patch).subscribe({
      next: (res) => {
        this.applyConfig(res.config);
        this.saving = false;
        this.ionicUtil.showSuccessToast(this.translate.instant('MANAGEMENT.MAINTENANCE.SAVED_SUCCESS'));
      },
      error: (err) => {
        this.ionicUtil.showErrorToast(err, this.translate.instant('MANAGEMENT.MAINTENANCE.SAVE_ERROR'));
        this.saving = false;
      },
    });
  }

  private isoToDatetimeLocal(iso: string | null | undefined): string {
    if (!iso) return '';
    const date = new Date(iso);
    if (isNaN(date.getTime())) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  private datetimeLocalToIso(value: string): string | null {
    if (!value) return null;
    const date = new Date(value);
    if (isNaN(date.getTime())) return null;
    return date.toISOString();
  }
}
