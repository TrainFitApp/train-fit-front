import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerSignInPage } from './sign-in.page';
import { TrainerSignUpPage } from './sign-up.page';
import { TrainerRestorePasswordPage } from './restore-password.page';

const routes: Routes = [
  { path: '', component: TrainerSignInPage },
  { path: 'sign-up', component: TrainerSignUpPage },
  { path: 'restore-password', component: TrainerRestorePasswordPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerAuthenticationRoutingModule {}
