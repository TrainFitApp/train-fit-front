import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { Location } from '@angular/common';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() showProgress: boolean = false;
  @Input() backButtonLabel: string = 'Volver';
  @Input() customBackAction: boolean = false;

  @Output() backClick = new EventEmitter<void>();

  constructor(private navigationService: NavigationService) {}

  onBackClick(): void {
    if (this.customBackAction) {
      this.backClick.emit();
    } else {
      this.navigationService.goBack();
    }
  }
}
