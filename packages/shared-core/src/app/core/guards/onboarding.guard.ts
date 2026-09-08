import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { OnboardingService } from '../services/onboarding/onboarding.service';

// TAREA 3 (coach-tab) — bloquea dieta/rutina/coach mientras el cliente tenga
// un cuestionario inicial pendiente/en revisión y NINGUNA relación activa
// todavía. OnboardingService ya se rellena en user-loader.page.ts antes de
// navegar a tabs, así que aquí la lectura es síncrona (signal), sin llamada
// HTTP propia — igual de barato que comprobar cualquier otro flag local.
export const onboardingMatchGuard: CanMatchFn = () => {
  const onboardingService = inject(OnboardingService);
  const router = inject(Router);

  // dismissed(): el cliente ya eligió "seguir usando la app" desde
  // onboarding-status — completar el cuestionario deja de ser obligatorio
  // para navegar, así que el guard deja de redirigir hasta el próximo login
  // (ver OnboardingService#dismiss).
  if (onboardingService.blocked() && !onboardingService.dismissed()) {
    return router.createUrlTree(['/onboarding-status']);
  }
  return true;
};
