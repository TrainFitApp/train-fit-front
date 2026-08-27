import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPainPage } from './my-pain.page';

const routes: Routes = [{ path: '', component: MyPainPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MyPainPageRoutingModule {}
