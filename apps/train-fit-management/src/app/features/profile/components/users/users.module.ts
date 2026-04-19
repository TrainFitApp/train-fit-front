import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileUsersPageRoutingModule } from './users-routing.module';
import { UsersFilterPage } from './users-filter.page';
import { ProfileUsersPage } from './users.page';

@NgModule({
  declarations: [ProfileUsersPage, UsersFilterPage],
  imports: [SharedModule, ProfileUsersPageRoutingModule],
})
export class ProfileUsersPageModule {}
