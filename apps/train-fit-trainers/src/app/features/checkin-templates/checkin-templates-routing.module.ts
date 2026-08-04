import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckinTemplatesPage } from './checkin-templates.page';

const routes: Routes = [
  {
    path: '',
    component: CheckinTemplatesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CheckinTemplatesPageRoutingModule {}
