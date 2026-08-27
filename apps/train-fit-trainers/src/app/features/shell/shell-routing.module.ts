import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellPage } from './shell.page';
import { TableInContextResolver } from 'src/app/features/clients/resolvers/table-in-context.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ShellPage,
    children: [
      {
        // Nueva pantalla de aterrizaje (mockup "TrainFit Panel" > Dashboard) —
        // vista agregada de clientes/tareas/check-ins/alertas de un vistazo.
        path: 'dashboard',
        loadChildren: () =>
          import('src/app/features/dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        // Mockup "TrainFit Panel" > Plantillas, hoy **Biblioteca**: lo que el
        // entrenador prepara para dárselo a un cliente (entrenamientos,
        // rutinas, dietas, intercambios, ejercicios). La ruta sigue siendo
        // 'templates' a propósito — renombrarla rompería los enlaces
        // guardados de quien ya usa la app sin ganar nada: el nombre que ve
        // el usuario está en la cabecera y en el menú, no en la URL.
        path: 'templates',
        loadChildren: () =>
          import('src/app/features/templates/templates.module').then(
            (m) => m.TemplatesPageModule
          ),
      },
      {
        // Movimiento 6 Coach Pro — cuánto estimula cada ejercicio a cada
        // músculo y cuánto castiga a cada articulación, según ESTE
        // entrenador. Alcanzable desde Mi método: es literalmente eso, y no
        // material que se le dé al cliente.
        path: 'exercise-scores',
        loadChildren: () =>
          import('src/app/features/exercise-scores/exercise-scores.module').then(
            (m) => m.ExerciseScoresPageModule
          ),
      },
      {
        // Movimiento 1 Coach Pro — la otra mitad del antiguo hub: cómo
        // trabaja el entrenador (check-ins, protocolos, automatizaciones).
        path: 'method',
        loadChildren: () =>
          import('src/app/features/method/method.module').then(
            (m) => m.MethodPageModule
          ),
      },
      {
        // Mockup "TrainFit Panel" > Rutinas — builder de biblioteca de
        // ejercicios + tabla de días/series. Visual únicamente por ahora
        // (Fase 1), sin conexión al motor real de rutinas.
        path: 'routines',
        loadChildren: () =>
          import('src/app/features/routines/routines.module').then(
            (m) => m.RoutinesPageModule
          ),
      },
      {
        // Rutinas -> Plantillas (rediseño 2026-08) — biblioteca de plantillas
        // de rutina COMPLETA (microciclos/splits/workouts) del profesional,
        // distinta de /tabs/routines (biblioteca de WorkoutTemplate: un solo
        // día/sesión). Reemplaza a la antigua RoutinesOverviewPage, que
        // mostraba rutinas ya asignadas a clientes (esa vista se elimina: esa
        // info ya vive en la ficha de cada cliente) — ver templates.page.ts.
        // La ruta del Planificador en modo plantilla va DECLARADA ANTES que
        // esta (más específica primero, mismo criterio que TASK-026 para
        // 'clients/:clientId/tables/:tableId/planner' vs 'clients').
        path: 'routine-templates/:tableId/planner',
        resolve: { table: TableInContextResolver },
        data: { templateMode: true },
        loadChildren: () =>
          import('src/app/features/planner/planner.module').then(
            (m) => m.PlannerPageModule
          ),
      },
      {
        path: 'routine-templates',
        loadChildren: () =>
          import('src/app/features/routine-templates/routine-templates.module').then(
            (m) => m.RoutineTemplatesPageModule
          ),
      },
      {
        // TASK-042 (MASTER_BACKLOG.md) — catálogo de ejercicios como pantalla
        // propia, alcanzable desde la categoría "Ejercicios" en Biblioteca
        // (/tabs/templates), no como destino nuevo del sidebar.
        path: 'exercises',
        loadChildren: () =>
          import('src/app/features/exercise-library/exercise-library.module').then(
            (m) => m.ExerciseLibraryPageModule
          ),
      },
      {
        // TASK-026 (MASTER_BACKLOG.md) — antes vivía como ruta raíz en
        // app-routing.module.ts ('clients/:clientId/tables/:tableId/planner',
        // fuera de 'tabs'): el usuario perdía el sidebar al entrar, y había
        // dos espacios de nombres de URL distintos para "clients" (este y el
        // 'clients' de justo abajo). Anidada aquí, la URL real pasa a ser
        // '/tabs/clients/:clientId/tables/:tableId/planner' — mismo
        // namespace que la ficha de cliente. Declarada ANTES que 'clients'
        // (más específica primero) para que el Router la resuelva
        // directamente en vez de depender del backtracking tras intentar
        // encajarla, sin éxito, dentro de ClientsPageModule. El guard de la
        // ruta padre 'tabs' (authMatchGuard) ya cubre esta ruta, no hace
        // falta repetirlo. TableInContextResolver se reutiliza tal cual —
        // sigue sembrando la tabla del cliente antes de activar la ruta.
        path: 'clients/:clientId/tables/:tableId/planner',
        resolve: { table: TableInContextResolver },
        loadChildren: () =>
          import('src/app/features/planner/planner.module').then(
            (m) => m.PlannerPageModule
          ),
      },
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
        // Sin tocar: NavigationService.goToProfile() (shared-core, usado por
        // las 3 apps del monorepo) navega con ruta absoluta hardcodeada
        // 'tabs/profile' — cambiar esta ruta rompería ese contrato
        // compartido. El footer del sidebar de esta app enlaza a
        // /tabs/account (más abajo), no a esta.
        path: 'profile',
        loadChildren: () =>
          import('src/app/features/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        // "Mi cuenta" — página local propia de esta app (no el ProfilePage
        // compartido de arriba, orientado a macros/dieta del consumidor).
        // Ver MVP-trainers/tareas-grandes/TAREA5.
        path: 'account',
        loadChildren: () =>
          import('src/app/features/account/account.module').then(
            (m) => m.AccountPageModule
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
      {
        // Fase 5 Coach Pro — grupos de intercambio de alimentos (§16).
        // Alcanzable desde Biblioteca: es material para el cliente.
        path: 'food-exchanges',
        loadChildren: () =>
          import('src/app/features/food-exchanges/food-exchanges.module').then(
            (m) => m.FoodExchangesPageModule
          ),
      },
      {
        // Fase 4 Coach Pro — protocolos: la metodología del coach empaquetada.
        // Alcanzable desde Mi método (method.page.ts), no como destino propio
        // del sidebar: se define una vez, no es un flujo de trabajo diario.
        path: 'protocols',
        loadChildren: () =>
          import('src/app/features/protocols/protocols.module').then(
            (m) => m.ProtocolsPageModule
          ),
      },
      {
        // Fase 3 Coach Pro — reglas WHEN/IF/THEN del profesional. El
        // constructor vive en la subruta ':id' (con 'new' como literal), no
        // en un panel: es un formulario largo y el botón de volver del móvil
        // debe salir de la regla, no de la sección.
        path: 'automations',
        loadChildren: () =>
          import('src/app/features/automations/automations.module').then(
            (m) => m.AutomationsPageModule
          ),
      },
      {
        // TAREA5 (auditoría UX, Fase D) — componer una comida y aplicarla
        // de una vez a varios clientes, sin pasar por la ficha de uno solo.
        path: 'meal-compose',
        loadChildren: () =>
          import('src/app/features/meal-compose/meal-compose.module').then(
            (m) => m.MealComposePageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ShellPageRoutingModule {}
