import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  public ownFilter: boolean = false;

  constructor() {}

  public ngOnInit(): void {}

public addFilter(filter: string): void {
    switch (filter) {
      case 'own':
        this.ownFilter = !this.ownFilter;
        break;
    }

    const filterGroup: SearchFilterGroup = {
      favFilter: false,
      ownFilter: this.ownFilter,
      shieldFilter: false,
    };

    this.filterSelection.emit(filterGroup);
  }

  public selectAllFilter(): void {
    this.ownFilter = false;

    const filterGroup: SearchFilterGroup = {
      favFilter: false,
      ownFilter: this.ownFilter,
      shieldFilter: false,
    };

    this.filterSelection.emit(filterGroup);
  }

  public isAllSelected(): boolean {
    return !this.ownFilter;
  }
}