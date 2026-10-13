import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { authMatchGuard } from 'src/app/core/guards/auth.guard';
import { UserService } from 'src/app/core/services/user/user.service';
import { mustPassThroughUserLoader } from './user-loader-redirect.util';

// Sesión válida (la que comprueba authMatchGuard, que renueva el token si hace
// falta) y usuario cargado en memoria. Si falta lo segundo, que es lo que pasa
// en cualquier recarga, manda al user-loader, sin recordar la pantalla en la
// que estaba (ver user-loader-redirect.util.ts). Es la versión de la app
// cliente de authMatchGuard; trainers y management siguen con la compartida.
export const userLoadedMatchGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const redirectToLoader = (allowed: boolean | UrlTree): boolean | UrlTree =>
    allowed === true && mustPassThroughUserLoader(!!userService.getLocalUser, route.path)
      ? router.createUrlTree(['/user-loader'])
      : allowed;

  const auth = authMatchGuard(route, segments);
  if (typeof auth === 'boolean' || auth instanceof UrlTree) {
    return redirectToLoader(auth);
  }
  return from(auth).pipe(map(redirectToLoader));
};
