import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PremiumPageRoutingModule } from './premium-routing.module';
import { PremiumPage } from './premium.page';

@NgModule({
  declarations: [PremiumPage],
  imports: [SharedModule, PremiumPageRoutingModule],
})
export class PremiumPageModule {}
