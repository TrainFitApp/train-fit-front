import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvitesPageRoutingModule } from './invites-routing.module';
import { InvitesPage } from './invites.page';

@NgModule({
  imports: [SharedModule, InvitesPageRoutingModule],
  declarations: [InvitesPage],
})
export class InvitesPageModule {}
