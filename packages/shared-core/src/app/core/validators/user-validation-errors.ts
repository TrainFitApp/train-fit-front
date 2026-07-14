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
  name: 'USER_FORM.NAME',
  lastname: 'USER_FORM.LASTNAME',
  birth: 'USER_FORM.BIRTH',
  weight: 'USER_FORM.WEIGHT',
  height: 'USER_FORM.HEIGHT',
  sex: 'USER_FORM.SEX',
  steps: 'USER_FORM.STEPS',
  activity: 'USER_FORM.ACTIVITY',
  training: 'USER_FORM.TRAINING',
  objetive: 'USER_FORM.OBJECTIVE',
  email: 'USER_FORM.EMAIL',
  password: 'USER_FORM.PASSWORD',
  passwordRep: 'USER_FORM.PASSWORD',
  termsAndConditions: 'USER_FORM.TERMS',
  policyAndPrivacy: 'USER_FORM.PRIVACY',
} as const;

export const USER_ERROR_MESSAGES = {
  required: (_fieldName: string) => 'USER_ERRORS.REQUIRED',
  pattern: (_fieldName: string) => 'USER_ERRORS.PATTERN',
  email: (_fieldName: string) => 'USER_ERRORS.EMAIL',
  minlength: (_fieldName: string, requiredLength: number) =>
    requiredLength ? `USER_ERRORS.MINLENGTH:${requiredLength}` : 'USER_ERRORS.MINLENGTH',
  maxlength: (_fieldName: string, requiredLength: number) =>
    requiredLength ? `USER_ERRORS.MAXLENGTH:${requiredLength}` : 'USER_ERRORS.MAXLENGTH',
  areEqual: (_fieldName: string) => 'USER_ERRORS.ARE_EQUAL',
  notSame: (_fieldName: string) => 'USER_ERRORS.NOT_SAME',
  manHood: (_fieldName: string) => 'USER_ERRORS.MIN_AGE',
  emailExist: (_fieldName: string) => 'USER_ERRORS.EMAIL_EXIST',
  length: (_fieldName: string) => 'USER_ERRORS.LENGTH',
  default: (_fieldName: string, _errorName: string, _errorValue: any) => 'USER_ERRORS.DEFAULT',
  uppercase: (_fieldName: string) => 'USER_ERRORS.UPPERCASE',
  lowercase: (_fieldName: string) => 'USER_ERRORS.LOWERCASE',
};
