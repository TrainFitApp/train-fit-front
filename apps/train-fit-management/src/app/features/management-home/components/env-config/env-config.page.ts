import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { EnvApiService, EnvEntry } from './services/env-api.service';

@Component({
  selector: 'app-env-config',
  templateUrl: './env-config.page.html',
  styleUrls: ['./env-config.page.scss'],
})
export class EnvConfigPage implements OnInit, OnDestroy {
  private readonly platform = inject(Platform);
  private readonly navigationService = inject(NavigationService);
  private readonly envApi = inject(EnvApiService);
  private readonly ionicUtil = inject(IonicUtilService);
  private readonly translate = inject(TranslateService);

  public entries: EnvEntry[] = [];
  public isLoading = false;
  public editingKey: string | null = null;
  public editValue = '';
  public showAddForm = false;
  public newKey = '';
  public newValue = '';

  private backButtonSubscription: Subscription | null = null;

  public ngOnInit(): void {
    this.loadEntries();
    this.registerHardwareBackButton();
  }

  public ngOnDestroy(): void {
    this.backButtonSubscription?.unsubscribe();
  }

  public goBack(): void {
    this.navigationService.goBack();
  }

  private registerHardwareBackButton(): void {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }

  public loadEntries(): void {
    this.isLoading = true;
    this.envApi
      .list()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => (this.entries = res.entries),
        error: (err) => this.ionicUtil.showErrorToast(err, this.translate.instant('MANAGEMENT.ENV.LOAD_ERROR')),
      });
  }

  public startEdit(entry: EnvEntry): void {
    this.editingKey = entry.key;
    this.editValue = entry.value;
  }

  public cancelEdit(): void {
    this.editingKey = null;
    this.editValue = '';
  }

  public saveEdit(entry: EnvEntry): void {
    this.envApi.update(entry.key, this.editValue).subscribe({
      next: (res) => {
        Object.assign(entry, res.entry);
        this.editingKey = null;
        this.editValue = '';
        this.ionicUtil.showSuccessToast(this.translate.instant('MANAGEMENT.ENV.UPDATED_SUCCESS'));
      },
      error: (err) => this.ionicUtil.showErrorToast(err, this.translate.instant('MANAGEMENT.ENV.UPDATE_ERROR')),
    });
  }

  public toggleEntry(entry: EnvEntry): void {
    this.envApi.toggle(entry.key).subscribe({
      next: (res) => {
        Object.assign(entry, res.entry);
        this.ionicUtil.showSuccessToast(
          entry.commented ? this.translate.instant('MANAGEMENT.ENV.TOGGLE_DISABLED') : this.translate.instant('MANAGEMENT.ENV.TOGGLE_ENABLED')
        );
      },
      error: (err) => this.ionicUtil.showErrorToast(err, this.translate.instant('MANAGEMENT.ENV.TOGGLE_ERROR')),
    });
  }

  public deleteEntry(entry: EnvEntry): void {
    this.ionicUtil
      .showAlert({
        header: this.translate.instant('MANAGEMENT.ENV.DELETE_HEADER'),
        message: this.translate.instant('MANAGEMENT.ENV.DELETE_MESSAGE', { key: entry.key }),
        buttons: [
          { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
          { text: this.translate.instant('COMMON.DELETE'), role: 'confirm', cssClass: 'danger-btn' },
        ],
      })
      .then((alertRes) => {
        if (alertRes?.role === 'confirm') {
          this.envApi.delete(entry.key).subscribe({
            next: () => {
              this.entries = this.entries.filter((e) => e.key !== entry.key);
              this.ionicUtil.showSuccessToast(this.translate.instant('MANAGEMENT.ENV.DELETED_SUCCESS'));
            },
            error: (err) => this.ionicUtil.showErrorToast(err, this.translate.instant('MANAGEMENT.ENV.DELETE_ERROR')),
          });
        }
      });
  }

  public addEntry(): void {
    if (!this.newKey || !/^[A-Z_][A-Z0-9_]*$/.test(this.newKey)) {
      this.ionicUtil.showWarningToast(this.translate.instant('MANAGEMENT.ENV.INVALID_KEY'));
      return;
    }
    this.envApi.create(this.newKey, this.newValue).subscribe({
      next: (res) => {
        this.entries.push(res.entry);
        this.showAddForm = false;
        this.newKey = '';
        this.newValue = '';
        this.ionicUtil.showSuccessToast(this.translate.instant('MANAGEMENT.ENV.CREATED_SUCCESS'));
      },
      error: (err) => this.ionicUtil.showErrorToast(err, this.translate.instant('MANAGEMENT.ENV.CREATE_ERROR')),
    });
  }
}
