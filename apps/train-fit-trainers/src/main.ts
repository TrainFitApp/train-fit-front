import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { SelectPopoverLike, makeSelectPopoverInstant } from './app/shared/utils/instant-select-popover.util';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Todos los ion-select de la app abren su lista sin animación.
document.addEventListener('ionPopoverWillPresent', (event) => {
  makeSelectPopoverInstant(event.target as unknown as SelectPopoverLike | null);
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
