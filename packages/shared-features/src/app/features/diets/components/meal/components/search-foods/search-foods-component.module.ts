import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MacrosBarsModule } from '../../../macros-bars/macros-bars.module';
import { PautadoItemViewModule } from '../../../pautado-item-view/pautado-item-view.module';
import { CreateFoodSheetComponent } from './components/create-food-sheet/create-food-sheet.component';
import { ProductComponent } from './components/product/product.component';
import { RecentFoodsSheetComponent } from './components/recent-foods-sheet/recent-foods-sheet.component';
import { QuickAddSheetModule } from './components/quick-add-sheet/quick-add-sheet.module';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { SearchFoodsPage } from './search-foods.page';

// El buscador de alimentos sin su ruta: lo declara y lo exporta para usarlo
// como componente (<app-products mode="library">, Biblioteca › Alimentos de
// entrenadores). SearchFoodsPageModule le añade la ruta; importar este no
// arrastra las rutas de search-foods al módulo que lo usa.
//
// PautadoItemViewModule: las cards de producto/receta abren esa vista con
// modalController.create, así que tiene que estar en el scope de estas
// declaraciones y no solo en el de dietas.
@NgModule({
  declarations: [
    CreateFoodSheetComponent,
    ProductComponent,
    RecentFoodsSheetComponent,
    RecipeCardComponent,
    SearchFoodsPage,
  ],
  imports: [SharedModule, MacrosBarsModule, PautadoItemViewModule, QuickAddSheetModule],
  exports: [SearchFoodsPage],
})
export class SearchFoodsComponentModule {}
