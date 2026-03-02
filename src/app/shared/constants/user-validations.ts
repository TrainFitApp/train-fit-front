import { Validators } from '@angular/forms';

export const USER_VALIDATIONS = {
  name: Validators.compose([
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(100),
  ]),
  lastname: Validators.compose([
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(200),
  ]),
  weight: Validators.compose([
    Validators.required,
    Validators.min(30),
    Validators.max(300),
  ]),
  height: Validators.compose([
    Validators.required,
    Validators.min(70),
    Validators.max(300),
  ]),
  birth: Validators.compose([Validators.required]),
  sex: Validators.compose([Validators.required]),
  steps: Validators.compose([Validators.required]),
  activity: Validators.compose([Validators.required]),
  objetive: Validators.compose([Validators.required]),
  training: Validators.compose([Validators.required]),
  kcalTotal: Validators.compose([Validators.required]),
  proteinsGTotal: Validators.compose([Validators.required]),
  carbohydratesGTotal: Validators.compose([Validators.required]),
  fatGTotal: Validators.compose([Validators.required]),
} as const;
