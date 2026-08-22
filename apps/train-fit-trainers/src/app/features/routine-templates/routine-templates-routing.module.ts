import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutineTemplatesPage } from './routine-templates.page';

const routes: Routes = [{ path: '', component: RoutineTemplatesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutineTemplatesPageRoutingModule {}
