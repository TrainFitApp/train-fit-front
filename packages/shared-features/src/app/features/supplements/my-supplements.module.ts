import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MySupplementsPageRoutingModule } from './my-supplements-routing.module';
import { MySupplementsPage } from './my-supplements.page';

@NgModule({
  imports: [SharedModule, MySupplementsPageRoutingModule],
  declarations: [MySupplementsPage],
})
export class MySupplementsPageModule {}
