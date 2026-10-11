import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssistantModule } from 'src/app/features/assistant/assistant.module';
import { ShellPageRoutingModule } from './shell-routing.module';
import { ShellPage } from './shell.page';

@NgModule({
  imports: [SharedModule, RouterModule, AssistantModule, ShellPageRoutingModule],
  declarations: [ShellPage],
})
export class ShellPageModule {}
