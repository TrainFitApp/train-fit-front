import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RepoConfigPage } from './repo-config.page';
import { RepoConfigPageRoutingModule } from './repo-config-routing.module';

@NgModule({
  declarations: [RepoConfigPage],
  imports: [SharedModule, RepoConfigPageRoutingModule],
})
export class RepoConfigPageModule {}
