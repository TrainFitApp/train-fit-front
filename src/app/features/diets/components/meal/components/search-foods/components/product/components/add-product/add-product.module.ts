import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddProductPage } from './add-product.page';

const routes: Routes = [
  {
    path: '',
    component: AddProductPage,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [AddProductPage],
})
export class AddProductPageModule {}
