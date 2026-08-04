import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellPage } from './shell.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ShellPage,
    children: [
      {
        path: 'clients',
        loadChildren: () =>
          import('src/app/features/clients/clients.module').then(
            (m) => m.ClientsPageModule
          ),
      },
      {
        path: 'invites',
        loadChildren: () =>
          import('src/app/features/invites/invites.module').then(
            (m) => m.InvitesPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('src/app/features/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        // Replanteamiento MVP (nutrición) — biblioteca de plantillas de dieta.
        path: 'diet-templates',
        loadChildren: () =>
          import('src/app/features/diet-templates/diet-templates.module').then(
            (m) => m.DietTemplatesPageModule
          ),
      },
      {
        // Alcanzable desde el menú lateral. Código compartido
        // (NavigationService.goToConfiguration en shared-core) navega con la
        // ruta absoluta 'configuration' — resuelta aquí vía redirect en
        // app-routing.module.ts, no rompe al vivir anidada.
        path: 'configuration',
        loadChildren: () =>
          import(
            'src/app/features/profile/components/configuration/configuration.module'
          ).then((m) => m.ConfigurationPageModule),
      },
      {
        // MVP-trainers F02 — paywall/suscripción del profesional.
        path: 'subscription',
        loadChildren: () =>
          import('src/app/features/subscription/subscription.module').then(
            (m) => m.SubscriptionPageModule
          ),
      },
      {
        // MVP-trainers F17 — plantillas de check-in del profesional.
        path: 'checkin-templates',
        loadChildren: () =>
          import('src/app/features/checkin-templates/checkin-templates.module').then(
            (m) => m.CheckinTemplatesPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ShellPageRoutingModule {}
