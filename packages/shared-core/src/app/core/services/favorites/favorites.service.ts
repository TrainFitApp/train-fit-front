import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { FavoriteKind, UserFavorites } from '../../models/user';

const EMPTY: UserFavorites = { products: [], recipes: [], exercises: [] };

// Favoritos del usuario de la sesión (train-fit-back/components/favorites):
// productos, recetas y ejercicios. Marca y desmarca en el servidor y deja
// `user.favorites` al día, así todas las pantallas leen lo mismo.
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  constructor(private http: HttpService, private userService: UserService) {}

  public ids(kind: FavoriteKind): string[] {
    return this.userService.getLocalUser?.favorites?.[kind] || [];
  }

  public isFavorite(kind: FavoriteKind, id: string | undefined | null): boolean {
    return !!id && this.ids(kind).includes(id);
  }

  public set(kind: FavoriteKind, id: string, favorite: boolean): Observable<void> {
    const path = `favorites/${kind}/${id}`;
    const request$: Observable<void> = favorite ? this.http.put<void>(path, {}) : this.http.delete<void>(path);
    return request$.pipe(tap(() => this.remember(kind, id, favorite)));
  }

  // Devuelve cómo queda: true = ahora es favorito.
  public toggle(kind: FavoriteKind, id: string): Observable<boolean> {
    const next = !this.isFavorite(kind, id);
    return this.set(kind, id, next).pipe(map(() => next));
  }

  // Lo marcado ha dejado de existir (el usuario borró su producto o receta):
  // el servidor ya lo quitó de sus favoritos.
  public forget(kind: FavoriteKind, id: string): void {
    this.remember(kind, id, false);
  }

  private remember(kind: FavoriteKind, id: string, favorite: boolean): void {
    const user = this.userService.getLocalUser;
    if (!user) return;
    const current = user.favorites?.[kind] || [];
    const next = favorite ? (current.includes(id) ? current : [...current, id]) : current.filter((value) => value !== id);
    this.userService.setLocalUser = { ...user, favorites: { ...EMPTY, ...user.favorites, [kind]: next } };
  }
}
