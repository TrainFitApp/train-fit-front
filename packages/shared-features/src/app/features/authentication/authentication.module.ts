import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationPageRoutingModule } from './authentication-routing.module';
import { SignInPage } from './components/sign-in/sign-in.page';

@NgModule({
  imports: [SharedModule, AuthenticationPageRoutingModule],
  declarations: [SignInPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationPageModule {}
