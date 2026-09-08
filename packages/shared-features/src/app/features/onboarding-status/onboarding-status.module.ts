import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnboardingStatusPageRoutingModule } from './onboarding-status-routing.module';
import { OnboardingStatusPage } from './onboarding-status.page';
import { IntakeWizardComponent } from './components/intake-wizard/intake-wizard.component';

@NgModule({
  imports: [SharedModule, OnboardingStatusPageRoutingModule],
  declarations: [OnboardingStatusPage, IntakeWizardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OnboardingStatusPageModule {}
