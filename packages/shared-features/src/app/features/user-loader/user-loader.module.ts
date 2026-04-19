import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserLoaderPage } from './user-loader.page';
import { UserLoaderPageRoutingModule } from './user-loader-routing.module';

@NgModule({
  imports: [SharedModule, UserLoaderPageRoutingModule],
  declarations: [UserLoaderPage],
})
export class UserLoaderPageModule {}
