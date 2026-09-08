import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pendingChangesGuard } from 'src/app/core/guards/pending-changes.guard';
import { ComposeMealPage } from './pages/compose-meal/compose-meal.page';

const routes: Routes = [
  { path: '', component: ComposeMealPage, canDeactivate: [pendingChangesGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealComposePageRoutingModule {}
