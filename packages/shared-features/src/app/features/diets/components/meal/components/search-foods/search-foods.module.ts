import { NgModule } from '@angular/core';
import { SearchFoodsComponentModule } from './search-foods-component.module';
import { SearchFoodsPageRoutingModule } from './search-foods-routing.module';

// La pantalla por ruta (/search-foods del cliente y management). Las
// declaraciones viven en SearchFoodsComponentModule.
@NgModule({
  imports: [SearchFoodsComponentModule, SearchFoodsPageRoutingModule],
})
export class SearchFoodsPageModule {}
