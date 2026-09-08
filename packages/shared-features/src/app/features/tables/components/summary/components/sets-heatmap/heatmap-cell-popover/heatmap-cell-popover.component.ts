import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heatmap-cell-popover',
  templateUrl: './heatmap-cell-popover.component.html',
  styleUrls: ['./heatmap-cell-popover.component.scss'],
})
export class HeatmapCellPopoverComponent {
  @Input() public date: string;
  @Input() public workoutName: string;
  @Input() public done: number;
  @Input() public total: number;
}
