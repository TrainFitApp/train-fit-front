import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssistantUsagePage } from './assistant-usage.page';
import { AssistantUsagePageRoutingModule } from './assistant-usage-routing.module';

@NgModule({
  declarations: [AssistantUsagePage],
  imports: [SharedModule, AssistantUsagePageRoutingModule],
})
export class AssistantUsagePageModule {}
