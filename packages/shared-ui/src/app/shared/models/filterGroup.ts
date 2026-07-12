export class SearchFilterGroup {
  public search? = '';
  public page?: number = 0;
  public ownFilter?: boolean = false;
  public favFilter?: boolean = false;
  public shieldFilter?: boolean = false;
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
  public userId?: string;
}
