import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DbConfigPage } from './db-config.page';
import { DbConfigPageRoutingModule } from './db-config-routing.module';

@NgModule({
  declarations: [DbConfigPage],
  imports: [SharedModule, DbConfigPageRoutingModule],
})
export class DbConfigPageModule {}
