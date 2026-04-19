import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserLocalstorageService } from '../services/user/user-localstorage.service';

const checkToken = (): boolean => {
  const authService = inject(AuthService);
  const userLocalstorageService = inject(UserLocalstorageService);
  const router = inject(Router);

  // If user is authenticated in memory, allow access
  if (authService.isAuthenticated()) {
    return true;
  }

  // If not in memory, check if there's a token in localStorage
  const token = userLocalstorageService.getUserToken();

  if (token) {
    // Token exists - let the request go through
    // If it's expired, the interceptor will refresh it automatically
    return true;
  }

  // No token at all - just redirect to sign-in (don't call logout)
  // This prevents clearing the refresh token cookie unnecessarily
  router.navigate(['/sign-in']);
  return false;
};

export const authActivateGuard: CanActivateFn = () => checkToken();
export const authMatchGuard: CanMatchFn = () => checkToken();
