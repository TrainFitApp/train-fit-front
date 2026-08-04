import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyCheckinsPageRoutingModule } from './my-checkins-routing.module';
import { MyCheckinsPage } from './my-checkins.page';

@NgModule({
  imports: [SharedModule, MyCheckinsPageRoutingModule],
  declarations: [MyCheckinsPage],
})
export class MyCheckinsPageModule {}
