import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckinsPage } from './checkins.page';

const routes: Routes = [{ path: '', component: CheckinsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckinsPageRoutingModule {}
