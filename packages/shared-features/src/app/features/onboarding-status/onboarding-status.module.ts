import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnboardingStatusPageRoutingModule } from './onboarding-status-routing.module';
import { OnboardingStatusPage } from './onboarding-status.page';
import { IntakeWizardComponent } from './components/intake-wizard/intake-wizard.component';
import { InitialMeasurementsEditorComponent } from './components/initial-measurements-editor/initial-measurements-editor.component';
import { MeasurementConflictComponent } from './components/measurement-conflict/measurement-conflict.component';

@NgModule({
  imports: [SharedModule, OnboardingStatusPageRoutingModule, InitialMeasurementsEditorComponent, MeasurementConflictComponent],
  declarations: [OnboardingStatusPage, IntakeWizardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OnboardingStatusPageModule {}
