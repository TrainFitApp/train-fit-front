import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProductPage } from './create-product.page';
import { CreateProductPageModule } from './create-product.module';

const routes: Routes = [
  {
    path: '',
    component: CreateProductPage,
  },
];

@NgModule({
  imports: [CreateProductPageModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateProductPageRoutingModule {}
