import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { NumericKeypadModule } from 'src/app/shared/components/numeric-keypad/numeric-keypad.module';
import { trainFitToastAnimations } from 'src/app/core/services/util/toast-motion';

@NgModule({
  declarations: [AppComponent],
  imports: [IonicModule.forRoot(trainFitToastAnimations), CoreModule, NumericKeypadModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
