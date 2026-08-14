import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountPageRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';

@NgModule({
  imports: [SharedModule, AccountPageRoutingModule],
  declarations: [AccountPage],
})
export class AccountPageModule {}
