import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { AppUpdateModule } from 'src/app/features/app-update/app-update.module';
import { MaintenanceModule } from 'src/app/features/maintenance/maintenance.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicModule.forRoot(),
    CoreModule,
    AppUpdateModule,
    MaintenanceModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
