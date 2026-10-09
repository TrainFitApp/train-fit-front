import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchFoodsComponentModule } from 'src/app/features/diets/components/meal/components/search-foods/search-foods-component.module';
import { CreateProductPageModule } from 'src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.module';
import { ProductDetailPanelModule } from '../../shared/components/product-detail-panel/product-detail-panel.module';
import { RecipeBuilderModalModule } from '../../shared/components/recipe-builder-modal/recipe-builder-modal.module';
import { FoodLibraryPageRoutingModule } from './food-library-routing.module';
import { FoodLibraryPage } from './food-library.page';

@NgModule({
  imports: [
    SharedModule,
    SearchFoodsComponentModule,
    CreateProductPageModule,
    ProductDetailPanelModule,
    RecipeBuilderModalModule,
    FoodLibraryPageRoutingModule,
  ],
  declarations: [FoodLibraryPage],
})
export class FoodLibraryPageModule {}
