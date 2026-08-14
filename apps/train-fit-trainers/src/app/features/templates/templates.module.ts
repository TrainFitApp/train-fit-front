import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TemplatesPageRoutingModule } from './templates-routing.module';
import { TemplatesPage } from './templates.page';

@NgModule({
  imports: [SharedModule, TemplatesPageRoutingModule],
  declarations: [TemplatesPage],
})
export class TemplatesPageModule {}
