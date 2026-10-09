import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { DietTemplatesPageRoutingModule } from './diet-templates-routing.module';
import { MealSnippetPickerModule } from '../../shared/components/meal-snippet-picker/meal-snippet-picker.module';
import { CreateProductPageModule } from 'src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.module';
import { RecipeBuilderModalModule } from '../../shared/components/recipe-builder-modal/recipe-builder-modal.module';
import { RecipeIngredientsEditorModalModule } from '../../shared/components/recipe-ingredients-editor-modal/recipe-ingredients-editor-modal.module';
import { ProductDetailPanelModule } from '../../shared/components/product-detail-panel/product-detail-panel.module';
import { DietTemplatesListPage } from './pages/diet-templates-list/diet-templates-list.page';
import { DietTemplateBuilderPage } from './pages/diet-template-builder/diet-template-builder.page';
import { DietPhasePickerPage } from './pages/diet-phase-picker/diet-phase-picker.page';
import { DietSuggestionListComponent } from './components/diet-suggestion-list/diet-suggestion-list.component';
import { DietTemplatePreviewPanelComponent } from './components/diet-template-preview-panel/diet-template-preview-panel.component';
import { DietCardModule } from '../../shared/components/diet-card/diet-card.module';
import { MacroAdjustModule } from '../../shared/components/macro-adjust/macro-adjust.module';
import { DietSuggestionDrawerComponent } from './components/diet-suggestion-drawer/diet-suggestion-drawer.component';
import { DayMealEditorModalComponent } from './pages/diet-template-builder/components/day-meal-editor-modal/day-meal-editor-modal.component';
import { PhaseStartSheetComponent } from './components/phase-start-sheet/phase-start-sheet.component';
import { NutritionCalendarModule } from '../clients/pages/client-detail/components/nutrition-calendar/nutrition-calendar.module';

@NgModule({
  imports: [
    SharedModule,
    NavigationModule,
    DietTemplatesPageRoutingModule,
    MealSnippetPickerModule,
    CreateProductPageModule,
    RecipeBuilderModalModule,
    RecipeIngredientsEditorModalModule,
    ProductDetailPanelModule,
    DietCardModule,
    MacroAdjustModule,
    // El calendario de Plan › Nutrición, para elegir desde qué día empieza
    // una fase (PhaseStartSheetComponent).
    NutritionCalendarModule,
  ],
  declarations: [
    DietSuggestionDrawerComponent,
    DayMealEditorModalComponent,
    DietTemplatesListPage,
    DietTemplateBuilderPage,
    DietPhasePickerPage,
    DietSuggestionListComponent,
    DietTemplatePreviewPanelComponent,
    PhaseStartSheetComponent,
  ],
})
export class DietTemplatesPageModule {}
