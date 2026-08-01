import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from 'src/app/features/profile/profile.page';

@NgModule({
  declarations: [ProfilePage],
  imports: [SharedModule, ProfilePageRoutingModule],
})
export class ProfilePageModule {}
