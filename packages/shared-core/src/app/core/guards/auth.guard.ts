import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

const checkToken = (): boolean | Observable<boolean> => {
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
      router.navigate(['/sign-in']);
      return false;
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
      return of(false);
    })
  );
};

export const authActivateGuard: CanActivateFn = () => checkToken();
export const authMatchGuard: CanMatchFn = () => checkToken();
