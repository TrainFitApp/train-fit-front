import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { ThemeService } from './core/services/util/theme.service';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {
    this.rootRoutes();
    // Force dark theme regardless of OS preference
    this.themeService.toggleColorMode('dark');
  }

  private rootRoutes(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
