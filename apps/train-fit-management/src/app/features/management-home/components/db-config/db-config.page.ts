import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { DbApiService, DbProfile } from './services/db-api.service';

@Component({
  selector: 'app-db-config',
  templateUrl: './db-config.page.html',
  styleUrls: ['./db-config.page.scss'],
})
export class DbConfigPage implements OnInit {
  private readonly navigationService = inject(NavigationService);
  private readonly dbApi = inject(DbApiService);
  private readonly ionicUtil = inject(IonicUtilService);
  private readonly translate = inject(TranslateService);

  public profiles: DbProfile[] = [];
  public selectedName = '';

  public ngOnInit(): void {
    this.loadProfiles();
  }

  public goBack(): void {
    this.navigationService.goBack();
  }

  public loadProfiles(): void {
    this.dbApi.getProfiles().subscribe({
      next: (res) => {
        this.profiles = res.profiles;
        const active = this.profiles.find((p) => p.isActive);
        if (active) this.selectedName = active.name;
      },
      error: (err) => this.ionicUtil.showErrorToast(err, this.translate.instant('MANAGEMENT.DB.LOAD_ERROR')),
    });
  }

  public onDbChange(event: any): void {
    const newName = event.detail.value;
    if (!newName || newName === this.getActiveName()) return;

    this.ionicUtil
      .showAlert({
        header: this.translate.instant('MANAGEMENT.DB.CHANGE_HEADER'),
        message: this.translate.instant('MANAGEMENT.DB.CHANGE_MESSAGE', { name: newName }),
        buttons: [
          { text: this.translate.instant('COMMON.CANCEL'), role: 'cancel' },
          { text: this.translate.instant('MANAGEMENT.DB.CHANGE_CONFIRM'), role: 'confirm', cssClass: 'danger-btn' },
        ],
      })
      .then((alertRes) => {
        if (alertRes?.role === 'confirm') {
          this.switchDb(newName);
        } else {
          this.selectedName = this.getActiveName();
        }
      });
  }

  public getActiveName(): string {
    return this.profiles.find((p) => p.isActive)?.name || '';
  }

  private switchDb(name: string): void {
    this.dbApi.switchDb(name).subscribe({
      next: (res) => {
        this.loadProfiles();
        this.ionicUtil.showSuccessToast(res.message || this.translate.instant('MANAGEMENT.DB.CHANGED_SUCCESS'));
      },
      error: (err) => {
        this.ionicUtil.showErrorToast(err, this.translate.instant('MANAGEMENT.DB.CHANGE_ERROR'));
        this.selectedName = this.getActiveName();
      },
    });
  }
}
