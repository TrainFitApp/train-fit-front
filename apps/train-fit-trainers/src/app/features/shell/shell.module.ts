import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShellPageRoutingModule } from './shell-routing.module';
import { ShellPage } from './shell.page';

@NgModule({
  imports: [SharedModule, RouterModule, ShellPageRoutingModule],
  declarations: [ShellPage],
})
export class ShellPageModule {}
