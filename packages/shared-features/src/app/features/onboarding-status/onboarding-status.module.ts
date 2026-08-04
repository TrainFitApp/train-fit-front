import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnboardingStatusPageRoutingModule } from './onboarding-status-routing.module';
import { OnboardingStatusPage } from './onboarding-status.page';

@NgModule({
  imports: [SharedModule, OnboardingStatusPageRoutingModule],
  declarations: [OnboardingStatusPage],
})
export class OnboardingStatusPageModule {}
