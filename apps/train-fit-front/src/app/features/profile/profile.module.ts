import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from 'src/app/features/profile/profile.page';
import { InitialMeasurementsPendingComponent } from '../../../../../../packages/shared-features/src/app/features/onboarding-status/components/initial-measurements-pending/initial-measurements-pending.component';

@NgModule({
  declarations: [ProfilePage],
  imports: [SharedModule, ProfilePageRoutingModule, InitialMeasurementsPendingComponent],
})
export class ProfilePageModule {}
