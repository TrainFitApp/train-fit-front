import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  AUTH_LOGIN_CONNECTION_QUERY_VALUE,
  AUTH_LOGIN_FEEDBACK_QUERY_PARAM,
} from '../services/auth/auth-error.service';
import { AuthService } from '../services/auth/auth.service';

const createLoginRedirect = (
  router: Router,
  showConnectionIssue = false
): UrlTree => {
  return router.createUrlTree(['/sign-in'], {
    queryParams: showConnectionIssue
      ? {
          [AUTH_LOGIN_FEEDBACK_QUERY_PARAM]: AUTH_LOGIN_CONNECTION_QUERY_VALUE,
        }
      : undefined,
  });
};

const checkToken = (): boolean | Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
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
      if (err?.error?.requiresRelogin || err?.requiresRelogin) {
        authService.logout();
        return of(false);
      }

      console.warn('[AUTH] auth_guard_refresh_transient_failure', {
        status: err?.status,
        message: err?.message,
      });
      return of(createLoginRedirect(router, true));
    })
  );
};

export const authActivateGuard: CanActivateFn = () => checkToken();
export const authMatchGuard: CanMatchFn = () => checkToken();
