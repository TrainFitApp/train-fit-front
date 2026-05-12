import { Component, OnInit } from '@angular/core';
import {
  AppRuntimePolicy,
  AppUpdateMode,
} from 'src/app/core/models/app-runtime-policy';
import { AppRuntimePolicyApiService } from 'src/app/core/services/app-update/app-runtime-policy-api.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

@Component({
  selector: 'app-runtime-policy',
  templateUrl: './app-runtime-policy.page.html',
  styleUrls: ['./app-runtime-policy.page.scss'],
})
export class AppRuntimePolicyPage implements OnInit {
  public draft: AppRuntimePolicy = this.createDefaultPolicy();
  public isLoading = false;
  public isSaving = false;
  public updateModes: Array<{ value: AppUpdateMode; label: string }> = [
    { value: 'off', label: 'Apagado' },
    { value: 'outdated_only', label: 'Solo versiones antiguas' },
    { value: 'all', label: 'Toda la plataforma' },
  ];

  constructor(
    private readonly appRuntimePolicyApiService: AppRuntimePolicyApiService,
    private readonly userService: UserService,
    private readonly ionicUtilService: IonicUtilService,
    private readonly navigationService: NavigationService
  ) {}

  public ngOnInit(): void {
    const localUser = this.userService.getLocalUser;
    if (!localUser?.roles?.includes('admin')) {
      this.navigationService.goBack();
      return;
    }

    this.loadPolicy();
  }

  public goBack(): void {
    this.navigationService.goBack();
  }

  public loadPolicy(): void {
    this.isLoading = true;
    this.appRuntimePolicyApiService.getRuntimePolicy().subscribe({
      next: (policy) => {
        this.draft = this.normalizePolicy(policy);
        this.isLoading = false;
      },
      error: async (error) => {
        this.isLoading = false;
        await this.ionicUtilService.showErrorToast(
          error,
          'No se pudo cargar el estado de la app'
        );
      },
    });
  }

  public async savePolicy(): Promise<void> {
    if (this.isSaving) {
      return;
    }

    const confirmed = await this.confirmRiskyChanges();
    if (!confirmed) {
      return;
    }

    this.isSaving = true;
    this.appRuntimePolicyApiService.updateRuntimePolicy(this.draft).subscribe({
      next: async (policy) => {
        this.draft = this.normalizePolicy(policy);
        this.isSaving = false;
        await this.ionicUtilService.showSuccessToast('Estado de la app guardado');
      },
      error: async (error) => {
        this.isSaving = false;
        const currentPolicy = error?.error?.currentPolicy;
        if (error?.status === 409 && currentPolicy) {
          this.draft = this.normalizePolicy(currentPolicy);
        }
        await this.ionicUtilService.showErrorToast(
          error,
          'No se pudo guardar el estado de la app'
        );
      },
    });
  }

  public get lastUpdatedLabel(): string {
    if (!this.draft.updatedAt) {
      return 'Sin cambios guardados';
    }

    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(this.draft.updatedAt));
  }

  private async confirmRiskyChanges(): Promise<boolean> {
    const enablesMaintenance = this.draft.maintenance.enabled;
    const enablesAllPlatformUpdate = this.draft.updateRequired.mode === 'all';

    if (!enablesMaintenance && !enablesAllPlatformUpdate) {
      return true;
    }

    const messages: string[] = [];
    if (enablesMaintenance) {
      messages.push('El mantenimiento bloqueara a usuarios normales.');
    }
    if (enablesAllPlatformUpdate) {
      messages.push('El modo de actualizacion bloqueara plataformas completas.');
    }

    const response = await this.ionicUtilService.showAlert({
      header: 'Confirmar cambio operativo',
      message: messages.join(' '),
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Guardar', role: 'confirm', cssClass: 'danger-btn' },
      ],
    });

    return response?.role === 'confirm';
  }

  private normalizePolicy(policy: AppRuntimePolicy): AppRuntimePolicy {
    const fallback = this.createDefaultPolicy();
    return {
      ...fallback,
      ...policy,
      maintenance: {
        ...fallback.maintenance,
        ...(policy?.maintenance || {}),
      },
      updateRequired: {
        ...fallback.updateRequired,
        ...(policy?.updateRequired || {}),
        platforms: {
          ios: {
            ...fallback.updateRequired.platforms.ios,
            ...(policy?.updateRequired?.platforms?.ios || {}),
          },
          android: {
            ...fallback.updateRequired.platforms.android,
            ...(policy?.updateRequired?.platforms?.android || {}),
          },
          web: {
            ...fallback.updateRequired.platforms.web,
            ...(policy?.updateRequired?.platforms?.web || {}),
          },
        },
      },
    };
  }

  private createDefaultPolicy(): AppRuntimePolicy {
    return {
      maintenance: {
        enabled: false,
        title: 'Aplicacion en mantenimiento',
        message: 'Estamos realizando mejoras. Vuelve en unos minutos.',
        expectedEndAt: null,
        retryAfterSeconds: 300,
      },
      updateRequired: {
        mode: 'off',
        title: 'Nueva version disponible',
        message:
          'Para seguir usando TrainFit necesitas instalar la ultima version de la app.',
        platforms: {
          ios: { enabled: false, minVersion: '' },
          android: { enabled: false, minVersion: '' },
          web: { enabled: false, minVersion: '' },
        },
      },
      revision: 1,
      updatedAt: null,
      updatedBy: {
        userId: null,
        email: null,
      },
    };
  }
}
