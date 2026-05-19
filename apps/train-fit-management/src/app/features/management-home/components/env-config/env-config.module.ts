import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnvConfigPage } from './env-config.page';
import { EnvConfigPageRoutingModule } from './env-config-routing.module';

@NgModule({
  declarations: [EnvConfigPage],
  imports: [SharedModule, EnvConfigPageRoutingModule],
})
export class EnvConfigPageModule {}
