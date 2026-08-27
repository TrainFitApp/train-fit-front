import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyPainPageRoutingModule } from './my-pain-routing.module';
import { MyPainPage } from './my-pain.page';

@NgModule({
  imports: [SharedModule, MyPainPageRoutingModule],
  declarations: [MyPainPage],
})
export class MyPainPageModule {}
