import { Component, ViewChild, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { FilterMode } from 'src/app/shared/components/filter-icons/filter-icons.component';
import { CreateProductPage } from 'src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page';
import {
  SearchFoodsPage,
  TrainerFoodSelection,
} from 'src/app/features/diets/components/meal/components/search-foods/search-foods.page';
import { TrainerNavigationService } from '../../core/services/trainer-navigation.service';
import { ProductDetailPanelComponent } from '../../shared/components/product-detail-panel/product-detail-panel.component';
import { RecipeBuilderModalComponent } from '../../shared/components/recipe-builder-modal/recipe-builder-modal.component';

// Biblioteca › Alimentos: los productos y recetas del profesional, y el
// catálogo entero para consultar. Mismo planteamiento que ExerciseLibraryPage:
// reutiliza el buscador de alimentos de siempre (SearchFoodsPage) en
// mode="library" — buscador, Productos/Recetas, chips y paginación idénticos
// — y aquí solo se decide qué se abre: la ficha de solo lectura
// (ProductDetailPanelComponent, la misma vista previa del constructor de
// dietas, que edita los productos propios), el alta de producto
// (CreateProductPage) y el constructor de recetas.
@Component({
  selector: 'app-food-library',
  templateUrl: 'food-library.page.html',
  styleUrls: ['food-library.page.scss'],
})
export class FoodLibraryPage {
  private readonly translate = inject(TranslateService);
  private readonly modalController = inject(ModalController);

  @ViewChild(SearchFoodsPage) private foods?: SearchFoodsPage;

  constructor(
    public navigation: TrainerNavigationService,
    private ionicUtilService: IonicUtilService
  ) {}

  public async openDetail(item: TrainerFoodSelection): Promise<void> {
    const modal = await this.modalController.create({
      component: ProductDetailPanelComponent,
      componentProps: {
        product: item.kind === 'product' ? item.product : undefined,
        recipe: item.kind === 'recipe' ? item.recipe : undefined,
        quantity: item.quantity,
        onProductEdited: () => this.foods?.reload(),
      },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
  }

  public create(kind: FilterMode): void {
    if (kind === 'recipes') {
      void this.createRecipe();
    } else {
      void this.createProduct();
    }
  }

  private async createProduct(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateProductPage,
      componentProps: { modalMode: true },
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { role } = await modal.onDidDismiss();
    if (role !== 'confirm') return;
    void this.ionicUtilService.showSuccessToast(this.translate.instant('SHARED_COMPONENTS.PRODUCTO_GUARDADO'));
    this.foods?.reload();
  }

  private async createRecipe(): Promise<void> {
    const modal = await this.modalController.create({
      component: RecipeBuilderModalComponent,
      cssClass: 'tf-panel-modal',
    });
    await modal.present();
    const { role } = await modal.onDidDismiss();
    if (role !== 'confirm') return;
    void this.ionicUtilService.showSuccessToast(this.translate.instant('SHARED_COMPONENTS.RECETA_GUARDADA'));
    this.foods?.reload();
  }
}
