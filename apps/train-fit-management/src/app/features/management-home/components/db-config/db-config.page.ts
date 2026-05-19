import { Component, OnInit, inject } from '@angular/core';
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
      error: (err) => this.ionicUtil.showErrorToast(err, 'Error al cargar perfiles'),
    });
  }

  public onDbChange(event: any): void {
    const newName = event.detail.value;
    if (!newName || newName === this.getActiveName()) return;

    this.ionicUtil
      .showAlert({
        header: 'Cambiar Base de Datos',
        message: `¿Cambiar a "${newName}"? Se reiniciará el servidor automáticamente.`,
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          { text: 'Cambiar', role: 'confirm', cssClass: 'danger-btn' },
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
        this.ionicUtil.showSuccessToast(res.message || 'Base de datos cambiada');
      },
      error: (err) => {
        this.ionicUtil.showErrorToast(err, 'Error al cambiar BD');
        this.selectedName = this.getActiveName();
      },
    });
  }
}
