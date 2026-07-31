import { NgModule } from '@angular/core';
import { TrainerSharedModule } from '../../trainer-shared.module';
import { TrainerTabsRoutingModule } from './tabs-routing.module';
import { TrainerTabsPage } from './tabs.page';

@NgModule({
  imports: [TrainerSharedModule, TrainerTabsRoutingModule],
  declarations: [TrainerTabsPage],
})
export class TrainerTabsModule {}
