import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authMatchGuard } from './core/guards/auth.guard';
import { DisconnectedComponent } from './shared/components/disconnected/disconnected.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-loader',
    pathMatch: 'full',
  },
  {
    path: 'search-foods',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        './features/diets/components/meal/components/search-foods/search-foods.module'
      ).then((m) => m.SearchFoodsPageModule),
  },
  {
    path: 'nutritional-objectives',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        './features/diets/components/nutritional-objectives/nutritional-objectives.module'
      ).then((m) => m.NutritionalObjectivesModule),
  },

  {
    path: 'sign-in',
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationPageModule
      ),
  },
  {
    path: 'current-workout',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        './features/tables/components/summary/components/current-workout/current-workout.module'
      ).then((m) => m.CurrentWorkoutPageModule),
  },
  {
    path: 'mesocycle',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        './features/tables/components/summary/components/mesocycle/mesocycle.module'
      ).then((m) => m.MesocyclePageModule),
  },
  {
    path: 'statistics',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        './features/tables/components/summary/components/statistics/statistics.module'
      ).then((m) => m.StatisticsPageModule),
  },
  {
    path: 'search-tables/:own',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        './features/tables/components/summary/components/search-tables/search-tables.module'
      ).then((m) => m.SearchTablesPageModule),
  },
  {
    path: 'tabs',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import('./features/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'user-loader',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import('./features/user-loader/user-loader.module').then(
        (m) => m.UserLoaderPageModule
      ),
  },
  {
    path: 'configuration',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        './features/profile/components/configuration/configuration.module'
      ).then((m) => m.ConfigurationPageModule),
  },
  {
    path: 'weight-info',
    loadChildren: () =>
      import(
        './features/diet-days/components/weight-info/weight-info.module'
      ).then((m) => m.WeightInfoPageModule),
  },
  {
    path: 'disconnected',
    component: DisconnectedComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
