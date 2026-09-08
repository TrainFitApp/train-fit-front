import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { InvitesPageRoutingModule } from './invites-routing.module';
import { InvitesPage } from './invites.page';

@NgModule({
  imports: [SharedModule, NavigationModule, InvitesPageRoutingModule],
  declarations: [InvitesPage],
})
export class InvitesPageModule {}
