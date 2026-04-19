import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPage } from './components/sign-in/sign-in.page';

const routes: Routes = [
  {
    path: '',
    component: SignInPage,
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./components/sign-up/sign-up.module').then(
        (m) => m.SignUpPageModule
      ),
  },
  {
    path: 'restore-password',
    loadChildren: () =>
      import('./components/restore-password/restore-password.module').then(
        (m) => m.RestorePasswordPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationPageRoutingModule {}
