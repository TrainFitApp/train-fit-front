export class MacrosData {
  public kcal: number = 0;
  public protein: number = 0;
  public carbohydrate: number = 0;
  public fat: number = 0;
}

export interface MacrosBars {
  hideKcal?: boolean;
  hideMinKcal?: boolean;
  hideMaxKcal?: boolean;
  hideMinProtein?: boolean;
  hideMaxProtein?: boolean;
  hideMinCarbohydrates?: boolean;
  hideMaxCarbohydrates?: boolean;
  hideMinFat?: boolean;
  hideMaxFat?: boolean;
  hideBars?: boolean;
}

export enum MACROS_VALUES {
  proteins = 4,
  carbohydrates = 4,
  fat = 9,
}
