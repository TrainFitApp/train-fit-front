import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchFilterGroup } from '../../models/filterGroup';

@Component({
  selector: 'app-table-filter-icons',
  templateUrl: './table-filter-icons.component.html',
  styleUrls: ['./table-filter-icons.component.scss'],
})
export class TableFilterIconsComponent implements OnInit {
  @Input()
  public disabled: boolean;

  @Output()
  public filterSelection = new EventEmitter<SearchFilterGroup>();

  public filterDescription: string;

  public ownFilter: boolean = false;

  constructor(private translate: TranslateService) {}

  public ngOnInit(): void {
    this.filterDescription = this.translate.instant('TABLES.FILTER_ALL');
  }

  public addFilter(filter: string): void {
    switch (filter) {
      case 'own':
        this.ownFilter = !this.ownFilter;
        break;
    }

    this.setFilterDescription();
  }

  public selectAllFilter(): void {
    this.ownFilter = false;
    this.setFilterDescription();
  }

  public isAllSelected(): boolean {
    return !this.ownFilter;
  }

  public setFilterDescription(): void {
    this.filterDescription = '';

    if (this.ownFilter) {
      this.filterDescription = this.translate.instant('TABLES.FILTER_MINE');
    } else {
      this.filterDescription = this.translate.instant('TABLES.FILTER_ALL');
    }

    const filterGroup: SearchFilterGroup = {
      favFilter: false,
      ownFilter: this.ownFilter,
      shieldFilter: false,
    };

    this.filterSelection.emit(filterGroup);
  }
}