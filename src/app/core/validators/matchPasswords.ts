import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable()
export class MatchPasswords {
  public matchPassword(group: FormGroup): ValidationErrors | null {
    if (group.controls.password.value === group.controls.passwordRep.value) {
      return null;
    } else {
      return { notSame: true };
    }
  }
}
