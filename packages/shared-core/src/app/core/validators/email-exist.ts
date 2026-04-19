import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  take,
  catchError,
  tap,
} from 'rxjs/operators';
import { UserService } from '../services/user/user.service';

@Injectable()
export class EmailExistValidator {
  static createValidator(userService: UserService): AsyncValidatorFn {
    let lastValue: string | null = null;
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value: string = control.value;
      if (!value || typeof value !== 'string' || value.trim() === '')
        return of(null);
      if (control.errors && (control.errors as any)['email']) return of(null);
      if (lastValue === value) return of(null);

      return timer(400).pipe(
        switchMap(() => {
          if (control.value !== value) return of(null);
          return userService.checkEmail(value).pipe(
            map((exists) => (exists ? { emailExist: true } : null)),
            catchError(() => of(null))
          );
        }),
        tap(() => (lastValue = value)),
        take(1)
      );
    };
  }
}
