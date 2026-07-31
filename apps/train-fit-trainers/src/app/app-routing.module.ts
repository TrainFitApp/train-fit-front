import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authMatchGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (module) => module.TrainerAuthenticationModule
      ),
  },
  {
    path: 'user-loader',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import('./features/user-loader/user-loader.module').then(
        (module) => module.TrainerUserLoaderModule
      ),
  },
  {
    path: 'tabs',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import('./features/tabs/tabs.module').then(
        (module) => module.TrainerTabsModule
      ),
  },
  { path: 'disconnected', redirectTo: 'sign-in' },
  { path: '**', redirectTo: 'user-loader' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
