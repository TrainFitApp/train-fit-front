import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionalObjectivesComponent } from './nutritional-objectives.component';

const routes: Routes = [
  {
    path: '',
    component: NutritionalObjectivesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionalObjectivesRoutingModule {}
