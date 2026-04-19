import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PremiumPage } from './premium.page';

const routes: Routes = [
  {
    path: '',
    component: PremiumPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiumPageRoutingModule {}
