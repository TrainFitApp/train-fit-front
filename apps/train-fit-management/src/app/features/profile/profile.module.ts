import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssistantModule } from 'src/app/features/assistant/assistant.module';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from 'src/app/features/profile/profile.page';
import { ProfileCoachCardComponent } from 'src/app/features/profile/components/coach-card/profile-coach-card.component';

@NgModule({
  declarations: [ProfilePage, ProfileCoachCardComponent],
  imports: [SharedModule, AssistantModule, ProfilePageRoutingModule],
})
export class ProfilePageModule {}
