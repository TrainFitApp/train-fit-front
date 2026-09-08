import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pendingChangesGuard } from 'src/app/core/guards/pending-changes.guard';
import { RoutinesPage } from './routines.page';
import { RoutineBuilderPage } from './pages/routine-builder/routine-builder.page';

const routes: Routes = [
  { path: '', component: RoutinesPage },
  {
    path: ':id',
    component: RoutineBuilderPage,
    data: { parent: '/tabs/routines' },
    canDeactivate: [pendingChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutinesPageRoutingModule {}
