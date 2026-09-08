import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { DietTemplatesPageRoutingModule } from './diet-templates-routing.module';
import { ProductSearchModalModule } from '../../shared/components/product-search-modal/product-search-modal.module';
import { MealSnippetPickerModule } from '../../shared/components/meal-snippet-picker/meal-snippet-picker.module';
import { CreateProductPageModule } from 'src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.module';
import { RecipeBuilderModalModule } from '../../shared/components/recipe-builder-modal/recipe-builder-modal.module';
import { RecipeIngredientsEditorModalModule } from '../../shared/components/recipe-ingredients-editor-modal/recipe-ingredients-editor-modal.module';
import { ProductDetailPanelModule } from '../../shared/components/product-detail-panel/product-detail-panel.module';
import { DietTemplatesListPage } from './pages/diet-templates-list/diet-templates-list.page';
import { DietTemplateBuilderPage } from './pages/diet-template-builder/diet-template-builder.page';

@NgModule({
  imports: [
    SharedModule,
    NavigationModule,
    DietTemplatesPageRoutingModule,
    ProductSearchModalModule,
    MealSnippetPickerModule,
    CreateProductPageModule,
    RecipeBuilderModalModule,
    RecipeIngredientsEditorModalModule,
    ProductDetailPanelModule,
  ],
  declarations: [DietTemplatesListPage, DietTemplateBuilderPage],
})
export class DietTemplatesPageModule {}
