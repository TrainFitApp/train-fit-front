import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { TechniqueVideosPage } from './technique-videos.page';
import { TechniqueVideoEditorComponent } from './technique-video-editor.component';

// Biblioteca de vídeos de técnica del entrenador (docs/plan-medidas-multimedia.md).
const routes: Routes = [{ path: '', component: TechniqueVideosPage }];

@NgModule({
  imports: [SharedModule, NavigationModule, RouterModule.forChild(routes)],
  declarations: [TechniqueVideosPage, TechniqueVideoEditorComponent],
})
export class TechniqueVideosPageModule {}
