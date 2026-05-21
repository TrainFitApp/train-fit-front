import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const VALIDATION_LIMITS = {
  text: {
    shortNameMin: 2,
    shortNameMax: 60,
    personNameMin: 1,
    personNameMax: 50,
    lastnameMax: 80,
    productNameMax: 100,
    brandMax: 60,
    descriptionMax: 500,
    noteMax: 500,
    feedbackMin: 20,
    feedbackMax: 2000,
    searchMax: 80,
    ingredientsMax: 1000,
    allergensMax: 300,
  },
  auth: {
    emailMax: 254,
    codeMax: 10,
  },
  profile: {
    weightMin: 30,
    weightMax: 300,
    heightMin: 70,
    heightMax: 300,
    kcalMin: 800,
    kcalMax: 8000,
    macroGramsMin: 0,
    macroGramsMax: 1000,
    percentMin: 0,
    percentMax: 100,
    objectiveKcalMax: 2000,
  },
  workout: {
    weightMin: 0,
    weightMax: 1000,
    repsMin: 0,
    repsMax: 500,
    velocityMin: 0,
    velocityMax: 80,
    minutesMin: 0,
    minutesMax: 999,
    secondsMin: 0,
    secondsMax: 59,
    restPauseMin: 1,
    restPauseMax: 600,
  },
  nutrition: {
    quantityMin: 0.01,
    quantityMax: 10000,
    recipeQuantityMin: 1,
    recipeQuantityMax: 10000,
    kcal100gMin: 0,
    kcal100gMax: 900,
    grams100gMin: 0,
    grams100gMax: 100,
    microDisplayMin: 0,
    microDisplayMax: 100000,
  },
  product: {
    barcodeMax: 32,
    barcodeLengths: [8, 12, 13, 14],
  },
} as const;

export function normalizeTextInput(
  value: unknown,
  maxLength?: number,
): string {
  const normalized = String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return maxLength ? normalized.slice(0, maxLength) : normalized;
}

export function normalizeLongTextInput(
  value: unknown,
  maxLength?: number,
): string {
  const normalized = String(value ?? '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .trim();

  return maxLength ? normalized.slice(0, maxLength) : normalized;
}

export function toFiniteNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function clampNumber(value: unknown, min: number, max: number): number {
  const parsed = toFiniteNumber(value) ?? min;
  return Math.min(max, Math.max(min, parsed));
}

export function trimmedLengthValidator(
  minLength: number,
  maxLength: number,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const text = normalizeTextInput(control.value);
    if (text.length < minLength) {
      return { minlength: { requiredLength: minLength, actualLength: text.length } };
    }
    if (text.length > maxLength) {
      return { maxlength: { requiredLength: maxLength, actualLength: text.length } };
    }
    return null;
  };
}

export function optionalTrimmedLengthValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const text = normalizeLongTextInput(control.value);
    if (!text) return null;
    return text.length > maxLength
      ? { maxlength: { requiredLength: maxLength, actualLength: text.length } }
      : null;
  };
}

export function numberRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = toFiniteNumber(control.value);
    if (value === null) return null;
    if (value < min) return { min: { min, actual: value } };
    if (value > max) return { max: { max, actual: value } };
    return null;
  };
}

export function integerRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = toFiniteNumber(control.value);
    if (value === null) return null;
    if (!Number.isInteger(value)) return { integer: true };
    if (value < min) return { min: { min, actual: value } };
    if (value > max) return { max: { max, actual: value } };
    return null;
  };
}

export function barcodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = normalizeTextInput(control.value, VALIDATION_LIMITS.product.barcodeMax);
    if (!value) return null;
    if (!/^\d+$/.test(value)) return { barcode: true };
    return (VALIDATION_LIMITS.product.barcodeLengths as readonly number[]).includes(
      value.length,
    )
      ? null
      : { barcodeLength: true };
  };
}
