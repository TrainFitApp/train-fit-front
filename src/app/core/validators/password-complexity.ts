import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordComplexity {
  static basicComplexity(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null; // No validamos si el campo está vacío, para eso está Validators.required
      }

      // Longitud mínima y máxima
      if (value.length < 6 || value.length > 15) {
        return { length: true };
      }

      // Requiere al menos una letra mayúscula
      if (!/[A-Z]/.test(value)) {
        return { uppercase: true };
      }

      // Requiere al menos una letra minúscula
      if (!/[a-z]/.test(value)) {
        return { lowercase: true };
      }

      return null;
    };
  }
}
