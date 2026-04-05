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
          import('../tables/components/summary/summary.module').then(
            (m) => m.SummaryPageModule
          ),
      },
      {
        path: 'diets',
        loadChildren: () =>
          import('../diets/diets.module').then((m) => m.DietsPageModule),
      },
      {
        path: 'diets/nutritional-objectives',
        loadChildren: () =>
          import(
            '../diets/components/nutritional-objectives/nutritional-objectives.module'
          ).then((m) => m.NutritionalObjectivesModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
