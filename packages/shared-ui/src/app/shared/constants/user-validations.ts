import { Validators } from '@angular/forms';
import {
  numberRangeValidator,
  trimmedLengthValidator,
  VALIDATION_LIMITS,
} from 'src/app/core/constants/validation-limits';

export const USER_VALIDATIONS = {
  name: Validators.compose([
    Validators.required,
    trimmedLengthValidator(
      VALIDATION_LIMITS.text.personNameMin,
      VALIDATION_LIMITS.text.personNameMax
    ),
  ]),
  lastname: Validators.compose([
    Validators.required,
    trimmedLengthValidator(
      VALIDATION_LIMITS.text.personNameMin,
      VALIDATION_LIMITS.text.lastnameMax
    ),
  ]),
  weight: Validators.compose([
    Validators.required,
    numberRangeValidator(
      VALIDATION_LIMITS.profile.weightMin,
      VALIDATION_LIMITS.profile.weightMax
    ),
  ]),
  height: Validators.compose([
    Validators.required,
    numberRangeValidator(
      VALIDATION_LIMITS.profile.heightMin,
      VALIDATION_LIMITS.profile.heightMax
    ),
  ]),
  birth: Validators.compose([Validators.required]),
  sex: Validators.compose([Validators.required]),
  steps: Validators.compose([Validators.required]),
  activity: Validators.compose([Validators.required]),
  objetive: Validators.compose([
    Validators.required,
    numberRangeValidator(0, VALIDATION_LIMITS.profile.objectiveKcalMax),
  ]),
  training: Validators.compose([Validators.required]),
  kcalTotal: Validators.compose([
    Validators.required,
    numberRangeValidator(
      VALIDATION_LIMITS.profile.kcalMin,
      VALIDATION_LIMITS.profile.kcalMax
    ),
  ]),
  proteinsGTotal: Validators.compose([
    Validators.required,
    numberRangeValidator(
      VALIDATION_LIMITS.profile.macroGramsMin,
      VALIDATION_LIMITS.profile.macroGramsMax
    ),
  ]),
  carbohydratesGTotal: Validators.compose([
    Validators.required,
    numberRangeValidator(
      VALIDATION_LIMITS.profile.macroGramsMin,
      VALIDATION_LIMITS.profile.macroGramsMax
    ),
  ]),
  fatGTotal: Validators.compose([
    Validators.required,
    numberRangeValidator(
      VALIDATION_LIMITS.profile.macroGramsMin,
      VALIDATION_LIMITS.profile.macroGramsMax
    ),
  ]),
} as const;
