import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'summary',
        loadChildren: () =>
          import('src/app/features/tables/components/summary/summary.module').then(
            (m) => m.SummaryPageModule
          ),
      },
      {
        path: 'diets',
        loadChildren: () =>
          import('src/app/features/diets/diets.module').then((m) => m.DietsPageModule),
      },
      {
        path: 'diets/nutritional-objectives',
        loadChildren: () =>
          import(
            'src/app/features/diets/components/nutritional-objectives/nutritional-objectives.module'
          ).then((m) => m.NutritionalObjectivesModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('src/app/features/profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        // Tab Coach, Fase 1 — visible solo si CoachService.hasActiveCoach()
        // (ver tabs.page.html), pero la ruta en sí no necesita un guard: sin
        // relación activa, GET /coach/dashboard simplemente devuelve listas
        // vacías, no hay datos de terceros que proteger aquí.
        path: 'coach',
        loadChildren: () =>
          import('src/app/features/coach/coach.module').then((m) => m.CoachPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
