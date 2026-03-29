import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface PendingChangesComponent {
  canDeactivate: () => boolean | Promise<boolean> | Observable<boolean>;
}

export const pendingChangesGuard: CanDeactivateFn<PendingChangesComponent> = (
  component
) => component.canDeactivate();

