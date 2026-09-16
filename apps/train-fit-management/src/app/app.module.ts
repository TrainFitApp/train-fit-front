import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { NumericKeypadModule } from 'src/app/shared/components/numeric-keypad/numeric-keypad.module';

@NgModule({
  declarations: [AppComponent],
  imports: [IonicModule.forRoot(), CoreModule, NumericKeypadModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
