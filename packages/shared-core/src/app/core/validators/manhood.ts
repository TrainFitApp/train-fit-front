import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../services/user/user.service';

export class ManHoodValidator {
  static manHood(userService: UserService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const age = userService.getAge(control.value);
      if (age > 15) {
        return null;
      } else {
        return { manHood: true };
      }
    };
  }
}
