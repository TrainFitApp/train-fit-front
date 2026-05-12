import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRuntimePolicyRoutingModule } from './app-runtime-policy-routing.module';
import { AppRuntimePolicyPage } from './app-runtime-policy.page';

@NgModule({
  declarations: [AppRuntimePolicyPage],
  imports: [SharedModule, AppRuntimePolicyRoutingModule],
})
export class AppRuntimePolicyModule {}
