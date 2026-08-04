import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authMatchGuard } from 'src/app/core/guards/auth.guard';
import { DisconnectedComponent } from 'src/app/shared/components/disconnected/disconnected.component';
import { TableInContextResolver } from 'src/app/features/clients/resolvers/table-in-context.resolver';

const routes: Routes = [
  {
    // Replanteamiento MVP (rutinas) — constructor completo (splits, workouts,
    // ejercicios, series) reutilizado tal cual desde shared-features; el
    // resolver siembra la tabla del CLIENTE (no la del profesional) antes de
    // activar la ruta. Backend ya abierto a "trainer" con comprobación de
    // relación activa (ver components/tables/table-access.js).
    path: 'clients/:clientId/tables/:tableId/mesocycle',
    canMatch: [authMatchGuard],
    resolve: { table: TableInContextResolver },
    loadChildren: () =>
      import(
        'src/app/features/tables/components/summary/components/mesocycle/mesocycle.module'
      ).then((m) => m.MesocyclePageModule),
  },
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
    // Redirect, no ruta real: NavigationService.goToConfiguration()
    // (shared-core, compartido por las 3 apps) navega con ruta absoluta
    // hardcodeada 'configuration' — este redirect la reenvía a la ubicación
    // real dentro del shell sin obligar a shared-core a saber que en esta
    // app concreta la ruta vive anidada. pathMatch:'full' porque solo debe
    // interceptar la ruta exacta, no cualquier cosa que empiece por ella.
    path: 'configuration',
    redirectTo: 'tabs/configuration',
    pathMatch: 'full',
  },
  {
    // MVP-trainers F02 — redirect: ConfigurationPage#goToTrainerSubscription()
    // (shared-features) navega con ruta absoluta hardcodeada '/subscription'.
    path: 'subscription',
    redirectTo: 'tabs/subscription',
    pathMatch: 'full',
  },
  {
    // MVP-trainers F17 — redirect: ConfigurationPage#goToCheckinTemplates()
    // (shared-features) navega con ruta absoluta hardcodeada '/checkin-templates'.
    path: 'checkin-templates',
    redirectTo: 'tabs/checkin-templates',
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
