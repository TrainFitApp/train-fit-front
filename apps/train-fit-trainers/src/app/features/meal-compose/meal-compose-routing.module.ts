import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeMealPage } from './pages/compose-meal/compose-meal.page';

const routes: Routes = [{ path: '', component: ComposeMealPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealComposePageRoutingModule {}
