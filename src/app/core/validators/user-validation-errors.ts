import { AbstractControl } from '@angular/forms';

export interface UserValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}

export interface UserFormGroupControls {
  [key: string]: AbstractControl;
}

export const USER_FORM_CONTROL_FIELDS = {
  name: 'Nombre',
  lastname: 'Apellido',
  birth: 'Fecha de naciemiento',
  weight: 'Peso',
  height: 'Altura',
  sex: 'Sexo',
  steps: 'Pasos',
  activity: 'Actividad diaria',
  training: 'Frecuencia de entrenamiento',
  objetive: 'objetive',
  email: 'Email',
  password: 'Contraseña',
  passwordRep: 'Contraseña',
  termsAndConditions: 'Términos y condiciones',
  policyAndPrivacy: 'Política y privacidad',
} as const;

export const USER_ERROR_MESSAGES = {
  required: (fieldName: string) => `${fieldName} es requerido`,
  pattern: (fieldName: string) => `Formato incorrecto para ${fieldName}`,
  email: (fieldName: string) => `Formato de email incorrecto en ${fieldName}`,
  minlength: (fieldName: string, requiredLength: number) =>
    `${fieldName} mínima requerida: ${requiredLength}`,
  maxlength: (fieldName: string, requiredLength: number) =>
    `${fieldName} máxima permitida: ${requiredLength}`,
  areEqual: (fieldName: string) => `Los campos ${fieldName} deben ser iguales`,
  notSame: (fieldName: string) => `${fieldName}: No son iguales`,
  manHood: (fieldName: string) => `${fieldName}: Debe ser mayor de 16 años`,
  emailExist: (fieldName: string) =>
    `${fieldName}: Este email no está registrado`,
  length: (fieldName: string) =>
    `${fieldName} debe tener entre 6 y 15 caracteres`,
  default: (fieldName: string, errorName: string, errorValue: any) =>
    `${fieldName}: ${errorName}: ${errorValue}`,
  uppercase: (fieldName: string) =>
    `${fieldName} debe incluir al menos una letra mayúscula`,
  lowercase: (fieldName: string) =>
    `${fieldName} debe incluir al menos una letra minúscula`,
};
