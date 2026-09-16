import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authMatchGuard } from 'src/app/core/guards/auth.guard';
import { DisconnectedComponent } from 'src/app/shared/components/disconnected/disconnected.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-loader',
    pathMatch: 'full',
  },
  {
    // Intercepta ANTES que 'sign-in': el registro de profesional (F01) es una
    // pantalla propia de esta app (sin datos biométricos), no la del wizard
    // compartido de consumidor. NavigationService.goToSignUp() navega siempre
    // a 'sign-in/sign-up' (hardcoded en shared-core) — esta entrada more
    // específica gana el match antes de que 'sign-in' delegue a su propio
    // hijo 'sign-up' (el wizard de consumidor, que aquí nunca se alcanza).
    path: 'sign-in/sign-up',
    loadChildren: () =>
      import('src/app/features/professional-sign-up/sign-up.module').then(
        (m) => m.SignUpPageModule
      ),
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('src/app/features/authentication/authentication.module').then(
        (m) => m.AuthenticationPageModule
      ),
  },
  {
    // Replanteamiento UI/UX — antes TabsPage (barra inferior de 3 destinos).
    // Ahora ShellPage: ion-split-pane + ion-menu. configuration/subscription/
    // checkin-templates/diet-templates viven aquí dentro como hijas — así el
    // panel lateral persistente de escritorio NO desaparece al navegar a
    // ninguna de ellas (ver shell-routing.module.ts).
    path: 'tabs',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import('src/app/features/shell/shell.module').then((m) => m.ShellPageModule),
  },
  {
    // MVP-trainers F02 — redirect: ConfigurationPage#goToTrainerSubscription()
    // (shared-features) navega con ruta absoluta hardcodeada '/subscription'.
    path: 'subscription',
    redirectTo: 'tabs/subscription',
    pathMatch: 'full',
  },
  {
    path: 'user-loader',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import('src/app/features/user-loader/user-loader.module').then(
        (m) => m.UserLoaderPageModule
      ),
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
export class AppRoutingModule {}
