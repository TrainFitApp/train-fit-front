import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { AppUpdateModule } from 'src/app/features/app-update/app-update.module';

@NgModule({
  declarations: [AppComponent],
  imports: [IonicModule.forRoot(), CoreModule, AppUpdateModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
