export class SearchFilterGroup {
  public search? = '';
  public page?: number = 0;
  public ownFilter?: boolean = false;
  public favFilter?: boolean = false;
  public shieldFilter?: boolean = false;
  // No se manda al backend: lo pautado no es una propiedad del catálogo de
  // productos, sino de la comida que se está editando. Lo resuelve
  // search-foods.page.ts sin salir a la red.
  public pautadoFilter?: boolean = false;
  public defaultOnly?: boolean = false;
  public userId?: string;
}

export class SearchFilterGroupExercises {
  public search? = '';
  public page?: number = 0;
  public ownFilter?: boolean = false;
  public favFilter?: boolean = false;
  public muscleGroups1: string[] = [];
  public muscleGroups2: string[] = [];
  public category: string[] = [];
  public equipment: string[] = [];
  public isCardio?: boolean;
  public isIsometric?: boolean;
  public userId?: string;
}
