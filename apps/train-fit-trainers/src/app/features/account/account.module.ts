import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { AccountPageRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';

@NgModule({
  imports: [SharedModule, NavigationModule, AccountPageRoutingModule],
  declarations: [AccountPage],
})
export class AccountPageModule {}
