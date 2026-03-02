import { Component } from '@angular/core';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.page.html',
  styleUrls: ['./references.page.scss'],
})
export class ReferencesPage {
  constructor(private readonly navigationService: NavigationService) {}

  public goBack(): void {
    this.navigationService.goBack();
  }
}
