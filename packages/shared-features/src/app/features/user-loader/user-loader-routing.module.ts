import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoaderPage } from './user-loader.page';

const routes: Routes = [
  {
    path: '',
    component: UserLoaderPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class UserLoaderPageRoutingModule {}
