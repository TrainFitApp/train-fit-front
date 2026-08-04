import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachPage } from './coach.page';

const routes: Routes = [
  {
    path: '',
    component: CoachPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CoachPageRoutingModule {}
