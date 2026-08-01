import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyProfessionalsPageRoutingModule } from './my-professionals-routing.module';
import { MyProfessionalsPage } from './my-professionals.page';

@NgModule({
  imports: [SharedModule, MyProfessionalsPageRoutingModule],
  declarations: [MyProfessionalsPage],
})
export class MyProfessionalsPageModule {}
