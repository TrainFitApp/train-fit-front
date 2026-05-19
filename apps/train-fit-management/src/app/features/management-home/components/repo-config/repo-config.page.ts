import { Component, OnInit, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { RepoApiService } from './services/repo-api.service';

@Component({
  selector: 'app-repo-config',
  templateUrl: './repo-config.page.html',
  styleUrls: ['./repo-config.page.scss'],
})
export class RepoConfigPage implements OnInit {
  private readonly navigationService = inject(NavigationService);
  private readonly repoApi = inject(RepoApiService);
  private readonly ionicUtil = inject(IonicUtilService);

  public token = '';
  public isPulling = false;
  public pullResult: { success: boolean; stdout: string; stderr: string } | null = null;

  public ngOnInit(): void {
    this.loadToken();
  }

  public goBack(): void {
    this.navigationService.goBack();
  }

  public loadToken(): void {
    this.repoApi.getToken().subscribe({
      next: (res) => (this.token = res.token),
      error: () => (this.token = ''),
    });
  }

  public saveToken(): void {
    this.repoApi.saveToken(this.token).subscribe({
      next: () => this.ionicUtil.showSuccessToast('Token guardado'),
      error: (err) => this.ionicUtil.showErrorToast(err, 'Error al guardar token'),
    });
  }

  public confirmPull(): void {
    this.ionicUtil
      .showAlert({
        header: 'Git Pull',
        message: '¿Ejecutar sudo git pull? Los cambios se aplicarán al servidor.',
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          { text: 'Pull', role: 'confirm', cssClass: 'danger-btn' },
        ],
      })
      .then((alertRes) => {
        if (alertRes?.role === 'confirm') {
          this.runPull();
        }
      });
  }

  private runPull(): void {
    this.isPulling = true;
    this.pullResult = null;
    this.repoApi
      .pull()
      .pipe(finalize(() => (this.isPulling = false)))
      .subscribe({
        next: (res) => {
          this.pullResult = res;
          if (res.success) {
            this.ionicUtil.showSuccessToast('Pull completado');
          } else {
            this.ionicUtil.showErrorToast(new Error(res.stderr), 'Error en pull');
          }
        },
        error: (err) => {
          this.pullResult = { success: false, stdout: '', stderr: err.message || 'Error de conexión' };
          this.ionicUtil.showErrorToast(err, 'Error al ejecutar pull');
        },
      });
  }
}
