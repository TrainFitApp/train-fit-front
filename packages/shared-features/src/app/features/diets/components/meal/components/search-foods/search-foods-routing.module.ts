import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchFoodsPage } from './search-foods.page';

const routes: Routes = [
  {
    path: '',
    component: SearchFoodsPage,
  },
  {
    path: 'add-product',
    loadChildren: () =>
      import(
        './components/product/components/add-product/add-product.module'
      ).then((m) => m.AddProductPageModule),
  },
  {
    path: 'create-product',
    loadChildren: () =>
      import('./components/create-product/create-product-routing.module').then(
        (m) => m.CreateProductPageRoutingModule
      ),
  },
  {
    path: 'config-recipe',
    loadChildren: () =>
      import('./components/config-recipe/config-recipe.module').then(
        (m) => m.ConfigRecipeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchFoodsPageRoutingModule {}
