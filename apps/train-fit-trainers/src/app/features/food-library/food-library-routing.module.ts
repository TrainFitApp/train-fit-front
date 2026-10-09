import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodLibraryPage } from './food-library.page';

const routes: Routes = [{ path: '', component: FoodLibraryPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodLibraryPageRoutingModule {}
