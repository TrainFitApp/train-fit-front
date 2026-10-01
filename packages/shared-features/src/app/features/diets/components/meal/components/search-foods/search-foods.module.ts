import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MacrosBarsModule } from '../../../macros-bars/macros-bars.module';
import { PautadoItemViewModule } from '../../../pautado-item-view/pautado-item-view.module';
import { CreateFoodSheetComponent } from './components/create-food-sheet/create-food-sheet.component';
import { ProductComponent } from './components/product/product.component';
import { RecentFoodsSheetComponent } from './components/recent-foods-sheet/recent-foods-sheet.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { SearchFoodsPageRoutingModule } from './search-foods-routing.module';
import { SearchFoodsPage } from './search-foods.page';

@NgModule({
  declarations: [
    CreateFoodSheetComponent,
    ProductComponent,
    RecentFoodsSheetComponent,
    RecipeCardComponent,
    SearchFoodsPage,
  ],
  // PautadoItemViewModule: las cards de producto/receta abren esa vista con
  // modalController.create, y esta página también se carga por su propia ruta
  // (no siempre a través de DietsPageModule), así que tiene que estar en el
  // scope de este módulo y no solo en el de dietas.
  imports: [
    SharedModule,
    MacrosBarsModule,
    PautadoItemViewModule,
    SearchFoodsPageRoutingModule,
  ],
})
export class SearchFoodsPageModule {}

