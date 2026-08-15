import { Component } from '@angular/core';
import { ToastOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TutorialContent } from 'src/app/core/models/tutorial';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { TutorialCatalogService } from 'src/app/core/services/tutorial/tutorial-catalog.service';
import { TutorialService } from 'src/app/core/services/tutorial/tutorial.service';

const SUMMARY_SCREEN_ID = 'training.summary';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.page.html',
  styleUrls: ['./tutorials.page.scss'],
})
export class TutorialsPage {
  constructor(
    public navigationService: NavigationService,
    private readonly tutorialCatalogService: TutorialCatalogService,
    private readonly tutorialService: TutorialService,
    private readonly ionicUtilService: IonicUtilService,
    private readonly translate: TranslateService
  ) {}

  public get tutorials(): TutorialContent[] {
    return [...this.tutorialCatalogService.catalog()].sort((a, b) => a.order - b.order);
  }

  public isPending(key: string): boolean {
    return this.tutorialService.isPending(key);
  }

  public getTitle(tutorial: TutorialContent): string {
    return tutorial.steps[0]?.title || tutorial.key;
  }

  public closeModal(): void {
    this.navigationService.goBack();
  }

  // Solo la pantalla de Entrenamientos es un destino seguro para navegar
  // directamente (siempre disponible). El resto (entreno en curso, mesociclo
  // de una rutina activa, estadísticas) depende de contexto que puede no
  // existir en este momento (sin workout/tabla activa) — para esos, se marca
  // pendiente y se avisa de que aparecerá la próxima vez que se visite esa
  // pantalla, en vez de forzar una navegación que podría quedar rota.
  public replay(tutorial: TutorialContent): void {
    this.tutorialService.reopenGroup(tutorial.key);
    this.tutorialService.requestManualStart(tutorial.key);

    if (tutorial.screenId === SUMMARY_SCREEN_ID) {
      this.navigationService.goToTabsSummaryPage();
      return;
    }

    this.ionicUtilService.showToast({
      message: this.translate.instant('TUTORIALS.WILL_SHOW_NEXT_VISIT'),
      duration: 2500,
      position: 'bottom',
      color: 'success',
    } as ToastOptions);
  }
}
