import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import {
  RecentFoodKind,
  RecentFoodsService,
} from 'src/app/core/services/recent-foods/recent-foods.service';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { ConfirmSheetComponent } from 'src/app/shared/components/confirm-sheet/confirm-sheet.component';

export interface RecentFoodItem {
  /** _id del Product o de la Recipe. */
  id: string;
  name: string;
  brand?: string;
  quantity?: number | null;
  /** Fecha (YYYY-MM-DD) del último día en que se usó en esta comida. */
  lastUsedAt?: string | null;
}

export const RECENT_FOODS_SHEET_OPTIONS = {
  cssClass: 'recent-foods-sheet-modal',
  breakpoints: [0, 1],
  initialBreakpoint: 1,
};

/**
 * «Recientes de <comida>» del buscador de alimentos (menú ⋮). Quitar uno lo
 * oculta al momento, sin confirmación: no se pierde nada (sale del historial
 * y vuelve a salir si se añade de nuevo), y la fila se queda en su sitio con
 * DESHACER hasta cerrar la hoja. «Borrar todos» sí confirma, porque también
 * oculta los que no caben en la lista.
 *
 * La hoja se puede cerrar deslizándola, así que no devuelve nada al cerrar:
 * avisa a la página con `onChanged` tras cada cambio guardado.
 */
@Component({
  selector: 'app-recent-foods-sheet',
  templateUrl: './recent-foods-sheet.component.html',
  styleUrls: ['./recent-foods-sheet.component.scss'],
})
export class RecentFoodsSheetComponent {
  @Input() public kind: RecentFoodKind = 'product';
  @Input() public mealIndex = 0;
  @Input() public mealName = '';
  @Input() public items: RecentFoodItem[] = [];
  @Input() public onChanged?: () => void;

  public readonly hiddenIds = new Set<string>();
  public readonly pendingIds = new Set<string>();
  public clearingAll = false;

  constructor(
    private modalController: ModalController,
    private recentFoodsService: RecentFoodsService,
    private ionicUtilService: IonicUtilService,
    private translate: TranslateService,
  ) {}

  public get visibleCount(): number {
    return this.items.length - this.hiddenIds.size;
  }

  public trackById(_: number, item: RecentFoodItem): string {
    return item.id;
  }

  public toggle(item: RecentFoodItem): void {
    if (this.pendingIds.has(item.id) || this.clearingAll) return;

    const restoring = this.hiddenIds.has(item.id);
    const body = { mealIndex: this.mealIndex, kind: this.kind, ids: [item.id] };
    const request$ = restoring
      ? this.recentFoodsService.restoreRecentFoods(body)
      : this.recentFoodsService.hideRecentFoods(body);

    // Optimista: la fila cambia al tocar y se revierte si falla.
    this.setHidden(item.id, !restoring);
    this.pendingIds.add(item.id);
    request$
      .pipe(finalize(() => this.pendingIds.delete(item.id)))
      .subscribe({
        next: () => this.onChanged?.(),
        error: () => {
          this.setHidden(item.id, restoring);
          this.showError();
        },
      });
  }

  public async clearAll(): Promise<void> {
    if (this.clearingAll) return;

    const t = this.translate.instant.bind(this.translate);
    const { data } = await this.ionicUtilService.showModal({
      component: ConfirmSheetComponent,
      componentProps: {
        icon: 'time-outline',
        iconColor: 'danger',
        title: t('SEARCH_FOODS.RECENTS_CLEAR_TITLE', { mealName: this.mealName }),
        message: t('SEARCH_FOODS.RECENTS_CLEAR_MESSAGE'),
        confirmText: t('COMMON.DELETE').toUpperCase(),
        cancelText: t('COMMON.CANCEL').toUpperCase(),
        confirmColor: 'danger',
      },
      cssClass: 'confirm-sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
    if (data !== true) return;

    this.clearingAll = true;
    this.recentFoodsService
      .hideRecentFoods({ mealIndex: this.mealIndex, kind: this.kind, all: true })
      .pipe(finalize(() => (this.clearingAll = false)))
      .subscribe({
        next: () => {
          this.onChanged?.();
          this.ionicUtilService.showToast({
            message: t('SEARCH_FOODS.RECENTS_CLEARED', { mealName: this.mealName }),
            duration: 1500,
            position: 'bottom',
          });
          this.modalController.dismiss();
        },
        error: () => this.showError(),
      });
  }

  public close(): void {
    this.modalController.dismiss();
  }

  private setHidden(id: string, hidden: boolean): void {
    if (hidden) {
      this.hiddenIds.add(id);
    } else {
      this.hiddenIds.delete(id);
    }
  }

  private showError(): void {
    this.ionicUtilService.showToast({
      message: this.translate.instant('SEARCH_FOODS.RECENTS_UPDATE_ERROR'),
      duration: 2000,
      position: 'bottom',
    });
  }
}
