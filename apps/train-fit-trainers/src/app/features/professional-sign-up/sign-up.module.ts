import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignUpPageRoutingModule } from './sign-up-routing.module';
import { SignUpPage } from './sign-up.page';

@NgModule({
  imports: [SharedModule, SignUpPageRoutingModule],
  declarations: [SignUpPage],
})
export class SignUpPageModule {}
