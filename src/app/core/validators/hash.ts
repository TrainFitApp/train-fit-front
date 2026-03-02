import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";
import { UserService } from "../services/user/user.service";

@Injectable()
export class HashValidator {
  static createValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService.checkHash(userService.getLocalUser._id, control.value).pipe(
        map(res => res ? { validHash: true } : null));
    }
  };
}