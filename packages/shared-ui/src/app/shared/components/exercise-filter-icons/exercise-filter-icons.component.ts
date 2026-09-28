import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchFilterGroup } from '../../models/filterGroup';

@Component({
  selector: 'app-exercise-filter-icons',
  templateUrl: './exercise-filter-icons.component.html',
  styleUrls: ['./exercise-filter-icons.component.scss'],
})
export class ExerciseFilterIconsComponent implements OnInit {
  @Input()
  public disabled: boolean;

  // Pegado al buscador (biblioteca del entrenador): sin márgenes laterales
  // propios y sin la fila de descripción, que repetía el chip activo.
  @Input()
  public compact = false;

  @Output()
  public filterSelection = new EventEmitter<SearchFilterGroup>();

  public filterDescription: string;

  public ownFilter: boolean = false;
  public favFilter: boolean = false;

  constructor(private translate: TranslateService) {}

  public ngOnInit(): void {
    this.filterDescription = this.translate.instant('EXERCISE_FILTER.ALL_EXERCISES');
  }

  public addFilter(filter: string): void {
    switch (filter) {
      case 'own':
        this.ownFilter = !this.ownFilter;
        if (this.ownFilter) {
          this.favFilter = false; // Can't be both own and fav at same time
        }
        break;
      case 'fav':
        this.favFilter = !this.favFilter;
        if (this.favFilter) {
          this.ownFilter = false; // Can't be both fav and own at same time
        }
        break;
    }

    this.setFilterDescription();
  }

  public selectAllFilter(): void {
    this.ownFilter = false;
    this.favFilter = false;
    this.setFilterDescription();
  }

  public isAllSelected(): boolean {
    return !this.ownFilter && !this.favFilter;
  }

  public setFilterDescription(): void {
    this.filterDescription = '';

    if (this.ownFilter) {
      this.filterDescription = this.translate.instant('EXERCISE_FILTER.MY_EXERCISES');
    } else if (this.favFilter) {
      this.filterDescription = this.translate.instant('EXERCISE_FILTER.FAVORITE_EXERCISES');
    } else {
      this.filterDescription = this.translate.instant('EXERCISE_FILTER.ALL_EXERCISES');
    }

    const filterGroup: SearchFilterGroup = {
      favFilter: this.favFilter,
      ownFilter: this.ownFilter,
      shieldFilter: false, // Not applicable for exercises
    };

    this.filterSelection.emit(filterGroup);
  }
}
