import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { TrainerInvitesApiService } from '../../invites/services/trainer-invites-api.service';

// No se entra en un cliente (ficha, planificador, estadísticas, dietas)
// mientras su intake esté sin enviar o por revisar: se vuelve a Clientes con
// su fila desplegada (?review=) para revisarlo allí. Cubre también los
// accesos que no pasan por la Cartera: notificaciones, alertas, enlaces.
// Si la comprobación falla, deja pasar: un corte de red no debe dejar al
// entrenador fuera de sus clientes.
export const intakeReviewedGuard: CanActivateFn = (route) => {
  const clientId = route.paramMap.get('clientId') ?? route.paramMap.get('id');
  if (!clientId) return true;
  const router = inject(Router);
  return inject(TrainerInvitesApiService)
    .getIntakeStatus(clientId)
    .pipe(
      map(({ status }) =>
        status === 'pending' || status === 'submitted'
          ? router.createUrlTree(['/tabs/clients'], { queryParams: { review: clientId } })
          : true
      ),
      catchError(() => of(true))
    );
};
