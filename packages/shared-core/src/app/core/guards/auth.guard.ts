import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  AUTH_LOGIN_CONNECTION_QUERY_VALUE,
  AUTH_LOGIN_FEEDBACK_QUERY_PARAM,
} from '../services/auth/auth-error.service';
import { AuthService } from '../services/auth/auth.service';
import { PendingEmailVerificationService } from '../services/auth/pending-email-verification.service';

// TASK-010 (MASTER_BACKLOG.md) — sin capturar la URL solicitada, cualquier
// deep link (notificación, email, enlace directo a un cliente/rutina) que
// requiriera login siempre aterrizaba en el dashboard tras autenticarse. Se
// añade como returnUrl para que sign-in/user-loader puedan restaurarlo (ver
// sign-in.page.ts#handleLoginCorrect/handleSocialSuccess y
// user-loader.page.ts). Nunca se captura '/sign-in' ni rutas vacías —
// evitaría un bucle de redirección sin sentido.
const buildReturnUrl = (router: Router): string | null => {
  const attemptedUrl = router.getCurrentNavigation()?.extractedUrl?.toString();
  if (!attemptedUrl || attemptedUrl === '/' || attemptedUrl.startsWith('/sign-in')) {
    return null;
  }
  return attemptedUrl;
};

const createLoginRedirect = (
  router: Router,
  showConnectionIssue = false
): UrlTree => {
  const returnUrl = buildReturnUrl(router);
  return router.createUrlTree(['/sign-in'], {
    queryParams: {
      ...(showConnectionIssue
        ? {
            [AUTH_LOGIN_FEEDBACK_QUERY_PARAM]: AUTH_LOGIN_CONNECTION_QUERY_VALUE,
          }
        : {}),
      ...(returnUrl ? { returnUrl } : {}),
    },
  });
};

const checkToken = (): boolean | UrlTree | Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const pendingEmailVerificationService = inject(
    PendingEmailVerificationService
  );
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  if (pendingEmailVerificationService.hasPendingVerification()) {
    return router.createUrlTree(['/sign-in/sign-up']);
  }

  console.info('[AUTH] auth_guard_refresh_attempt');
  return authService.restoreSessionSilently().pipe(
    map((restored) => {
      if (restored) {
        return true;
      }

      console.info('[AUTH] auth_guard_redirect_login');
      return createLoginRedirect(router);
    }),
    catchError((err) => {
      if (authService.isTerminalAuthError(err)) {
        authService.logout();
        return of(false);
      }

      console.warn('[AUTH] auth_guard_refresh_transient_failure', {
        status: err?.status,
        message: err?.message,
      });
      // Un corte de red no invalida la sesión ni debe sacar del Planner.
      // Cancela esta navegación; la siguiente petición vuelve a renovar.
      if (authService.user) return of(false);
      return of(createLoginRedirect(router, true));
    })
  );
};
export const authMatchGuard: CanMatchFn = () => checkToken();
