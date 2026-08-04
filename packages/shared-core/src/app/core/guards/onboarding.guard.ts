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

  if (onboardingService.blocked()) {
    return router.createUrlTree(['/onboarding-status']);
  }
  return true;
};
