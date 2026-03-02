import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesocyclePage } from './mesocycle.page';

const routes: Routes = [
  {
    path: '',
    component: MesocyclePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesocyclePageRoutingModule {}
