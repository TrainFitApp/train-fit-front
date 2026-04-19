import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MacrosBarsModule } from '../../../macros-bars/macros-bars.module';
import { ProductComponent } from './components/product/product.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { SearchFoodsPageRoutingModule } from './search-foods-routing.module';
import { SearchFoodsPage } from './search-foods.page';

@NgModule({
  declarations: [
    ProductComponent,
    RecipeCardComponent,
    SearchFoodsPage,
  ],
  imports: [SharedModule, MacrosBarsModule, SearchFoodsPageRoutingModule],
})
export class SearchFoodsPageModule {}

