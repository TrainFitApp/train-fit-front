import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authMatchGuard } from 'src/app/core/guards/auth.guard';
import { onboardingMatchGuard } from 'src/app/core/guards/onboarding.guard';
import { biometricDataGuard } from 'src/app/guards/biometric-data.guard';
import { DisconnectedComponent } from 'src/app/shared/components/disconnected/disconnected.component';

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
        'src/app/features/diets/components/meal/components/search-foods/search-foods.module'
      ).then((m) => m.SearchFoodsPageModule),
  },
  {
    // MVP-trainers F27 — gate de datos biométricos diferido: esta pantalla
    // depende de calculateKcal (peso/altura/sexo/actividad/objetivo/nacimiento).
    path: 'nutritional-objectives',
    canMatch: [authMatchGuard],
    canActivate: [biometricDataGuard],
    loadChildren: () =>
      import(
        'src/app/features/diets/components/nutritional-objectives/nutritional-objectives.module'
      ).then((m) => m.NutritionalObjectivesModule),
  },

  {
    path: 'sign-in',
    loadChildren: () =>
      import('src/app/features/authentication/authentication.module').then(
        (m) => m.AuthenticationPageModule
      ),
  },
  {
    path: 'current-workout',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        'src/app/features/tables/components/summary/components/current-workout/current-workout.module'
      ).then((m) => m.CurrentWorkoutPageModule),
  },
  {
    path: 'mesocycle',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        'src/app/features/tables/components/summary/components/mesocycle/mesocycle.module'
      ).then((m) => m.MesocyclePageModule),
  },
  {
    path: 'statistics',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        'src/app/features/tables/components/summary/components/statistics/statistics.module'
      ).then((m) => m.StatisticsPageModule),
  },
  {
    path: 'rm-calculator',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        'src/app/features/tables/components/summary/components/rm-calculator/rm-calculator.module'
      ).then((m) => m.RmCalculatorPageModule),
  },
  {
    path: 'search-tables',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        'src/app/features/tables/components/summary/components/search-tables/search-tables.module'
      ).then((m) => m.SearchTablesPageModule),
  },
  {
    path: 'tabs',
    canMatch: [authMatchGuard, onboardingMatchGuard],
    loadChildren: () =>
      import('src/app/features/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    // TAREA 3 — cuestionario inicial / pantalla de espera mientras el
    // cliente no tiene ninguna relación activa todavía. Sin onboardingMatchGuard
    // (sería una redirección circular) — solo requiere sesión iniciada.
    path: 'onboarding-status',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import('src/app/features/onboarding-status/onboarding-status.module').then(
        (m) => m.OnboardingStatusPageModule
      ),
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
    path: 'configuration',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        'src/app/features/profile/components/configuration/configuration.module'
      ).then((m) => m.ConfigurationPageModule),
  },
  {
    // MVP-trainers F17 — check-ins periódicos pedidos por profesionales activos.
    path: 'my-checkins',
    canMatch: [authMatchGuard, onboardingMatchGuard],
    loadChildren: () =>
      import(
        'src/app/features/checkins/my-checkins/my-checkins.module'
      ).then((m) => m.MyCheckinsPageModule),
  },
  {
    // Movimiento 5 Coach Pro — lo que le ha pautado su profesional: qué,
    // cuánto, cuándo y por qué. Solo lectura.
    path: 'my-supplements',
    canMatch: [authMatchGuard, onboardingMatchGuard],
    loadChildren: () =>
      import('src/app/features/supplements/my-supplements.module').then(
        (m) => m.MySupplementsPageModule
      ),
  },
  {
    // Movimiento 5 Coach Pro — qué comprar para cumplir el plan. No hay
    // modelo nuevo detrás: son los mismos días de dieta sumados por producto.
    path: 'my-shopping-list',
    canMatch: [authMatchGuard, onboardingMatchGuard],
    loadChildren: () =>
      import('src/app/features/shopping-list/my-shopping-list.module').then(
        (m) => m.MyShoppingListPageModule
      ),
  },
  {
    // Movimiento 3 Coach Pro — registro DIARIO de dolor por zona (EVA 0-10).
    // Pantalla propia y no un campo del check-in: aquél es semanal, y una
    // molestia va por días. Ver core/constants/pain.ts.
    path: 'my-pain',
    canMatch: [authMatchGuard, onboardingMatchGuard],
    loadChildren: () =>
      import('src/app/features/pain/my-pain.module').then((m) => m.MyPainPageModule),
  },
  {
    // Fase 5 Coach Pro (§16) — qué puede comer en lugar de qué, según lo que
    // haya definido su profesional. Solo lectura: las equivalencias son una
    // prescripción, no algo que el cliente ajuste.
    path: 'my-food-exchanges',
    canMatch: [authMatchGuard, onboardingMatchGuard],
    loadChildren: () =>
      import(
        'src/app/features/food-exchanges/my-food-exchanges.module'
      ).then((m) => m.MyFoodExchangesPageModule),
  },
  {
    // MVP-trainers F29 — preferencias nutricionales del cliente (alergias,
    // favoritos, no le gusta, si cocina en casa), solicitadas por su
    // nutricionista y rellenadas/editadas por el propio cliente.
    path: 'nutrition-preferences',
    canMatch: [authMatchGuard, onboardingMatchGuard],
    loadChildren: () =>
      import(
        'src/app/features/nutrition-preferences/nutrition-preferences.module'
      ).then((m) => m.NutritionPreferencesPageModule),
  },
  {
    path: 'premium',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import('src/app/features/premium/premium.module').then(
        (m) => m.PremiumPageModule
      ),
  },
  {
    path: 'weight-info',
    canMatch: [authMatchGuard],
    loadChildren: () =>
      import(
        'src/app/features/diet-days/components/weight-info/weight-info.module'
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
