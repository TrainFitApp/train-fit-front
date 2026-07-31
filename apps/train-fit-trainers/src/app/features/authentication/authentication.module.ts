import { NgModule } from '@angular/core';
import { TrainerSharedModule } from '../../trainer-shared.module';
import { TrainerAuthenticationRoutingModule } from './authentication-routing.module';
import { TrainerSignInPage } from './sign-in.page';
import { TrainerSignUpPage } from './sign-up.page';
import { TrainerRestorePasswordPage } from './restore-password.page';

@NgModule({
  imports: [TrainerSharedModule, TrainerAuthenticationRoutingModule],
  declarations: [
    TrainerSignInPage,
    TrainerSignUpPage,
    TrainerRestorePasswordPage,
  ],
})
export class TrainerAuthenticationModule {}
