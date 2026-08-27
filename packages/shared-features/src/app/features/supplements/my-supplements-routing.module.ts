import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySupplementsPage } from './my-supplements.page';

const routes: Routes = [{ path: '', component: MySupplementsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MySupplementsPageRoutingModule {}
