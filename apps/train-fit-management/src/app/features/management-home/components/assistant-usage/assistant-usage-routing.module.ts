import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssistantUsagePage } from './assistant-usage.page';

const routes: Routes = [{ path: '', component: AssistantUsagePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistantUsagePageRoutingModule {}
