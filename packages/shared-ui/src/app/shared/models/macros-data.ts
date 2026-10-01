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
  // Factores de Atwater: las kcal que aporta un gramo de cada macro. Proteína
  // y carbohidrato valen 4 los dos — el valor repetido es el dato correcto, no
  // una errata, así que la regla se acota en esa línea y sigue vigilando el
  // resto del monorepo.
  proteins = 4,
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  carbohydrates = 4,
  fat = 9,
}
