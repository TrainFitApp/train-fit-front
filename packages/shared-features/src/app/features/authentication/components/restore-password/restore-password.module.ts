import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RestorePasswordPage } from './restore-password.page';

const routes: Routes = [
  {
    path: '',
    component: RestorePasswordPage,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [RestorePasswordPage],
})
export class RestorePasswordPageModule {}
