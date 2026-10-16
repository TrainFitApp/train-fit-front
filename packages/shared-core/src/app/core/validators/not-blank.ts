import { AbstractControl, ValidationErrors } from '@angular/forms';

// PURO. Obligatorio que no admite un texto hecho solo de espacios: «   » pasaba
// Validators.required en el nombre y los apellidos del alta y el back, que
// recorta, lo guardaba vacío. Devuelve `required` para reutilizar el aviso.
export function notBlank(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value === null || value === undefined) return { required: true };
  return String(value).trim() ? null : { required: true };
}
