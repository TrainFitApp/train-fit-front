import { Component, Input } from '@angular/core';
import { CUSTOM_PRODUCT_VALUES } from 'src/app/core/models/customProduct';
import { MEAL_VALUES } from 'src/app/core/models/meal';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})

// TODO: no puedes inicializar el input()
export class SkeletonLoaderComponent {
  @Input()
  public rows: number = MEAL_VALUES.length / 2;
  @Input()
  public detailColumns: number = CUSTOM_PRODUCT_VALUES.length - 1;
  @Input()
  public addButton: boolean;

  public rowsLength = Array();
  public detailColumnsLength = Array();
  constructor() {
    this.rowsLength = Array.from({ length: this.rows });
    this.detailColumnsLength = Array.from({ length: this.detailColumns });
  }
}
