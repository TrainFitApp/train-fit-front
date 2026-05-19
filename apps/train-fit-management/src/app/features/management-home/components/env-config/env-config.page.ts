import { Component, OnInit, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { EnvApiService, EnvEntry } from './services/env-api.service';

@Component({
  selector: 'app-env-config',
  templateUrl: './env-config.page.html',
  styleUrls: ['./env-config.page.scss'],
})
export class EnvConfigPage implements OnInit {
  private readonly navigationService = inject(NavigationService);
  private readonly envApi = inject(EnvApiService);
  private readonly ionicUtil = inject(IonicUtilService);

  public entries: EnvEntry[] = [];
  public isLoading = false;
  public editingKey: string | null = null;
  public editValue = '';
  public showAddForm = false;
  public newKey = '';
  public newValue = '';

  public ngOnInit(): void {
    this.loadEntries();
  }

  public goBack(): void {
    this.navigationService.goBack();
  }

  public loadEntries(): void {
    this.isLoading = true;
    this.envApi
      .list()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => (this.entries = res.entries),
        error: (err) => this.ionicUtil.showErrorToast(err, 'Error al cargar variables'),
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
        this.ionicUtil.showSuccessToast('Variable actualizada');
      },
      error: (err) => this.ionicUtil.showErrorToast(err, 'Error al actualizar'),
    });
  }

  public toggleEntry(entry: EnvEntry): void {
    this.envApi.toggle(entry.key).subscribe({
      next: (res) => {
        Object.assign(entry, res.entry);
        this.ionicUtil.showSuccessToast(
          entry.commented ? 'Variable deshabilitada' : 'Variable habilitada'
        );
      },
      error: (err) => this.ionicUtil.showErrorToast(err, 'Error al cambiar estado'),
    });
  }

  public deleteEntry(entry: EnvEntry): void {
    this.ionicUtil
      .showAlert({
        header: 'Eliminar variable',
        message: `¿Eliminar "${entry.key}" definitivamente?`,
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          { text: 'Eliminar', role: 'confirm', cssClass: 'danger-btn' },
        ],
      })
      .then((alertRes) => {
        if (alertRes?.role === 'confirm') {
          this.envApi.delete(entry.key).subscribe({
            next: () => {
              this.entries = this.entries.filter((e) => e.key !== entry.key);
              this.ionicUtil.showSuccessToast('Variable eliminada');
            },
            error: (err) => this.ionicUtil.showErrorToast(err, 'Error al eliminar'),
          });
        }
      });
  }

  public addEntry(): void {
    if (!this.newKey || !/^[A-Z_][A-Z0-9_]*$/.test(this.newKey)) {
      this.ionicUtil.showWarningToast('Formato de clave inválido (solo MAYUSCULAS, números, _)');
      return;
    }
    this.envApi.create(this.newKey, this.newValue).subscribe({
      next: (res) => {
        this.entries.push(res.entry);
        this.showAddForm = false;
        this.newKey = '';
        this.newValue = '';
        this.ionicUtil.showSuccessToast('Variable creada');
      },
      error: (err) => this.ionicUtil.showErrorToast(err, 'Error al crear'),
    });
  }
}
