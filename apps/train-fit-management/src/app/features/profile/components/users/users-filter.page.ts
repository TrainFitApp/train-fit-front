import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersFilter } from './users-filter.model';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.page.html',
  styleUrls: ['./users-filter.page.scss'],
})
export class UsersFilterPage implements OnInit {
  @Input() public usersFilter: UsersFilter = new UsersFilter();

  public draftFilter: UsersFilter = new UsersFilter();

  constructor(private readonly modalController: ModalController) {}

  public ngOnInit(): void {
    this.draftFilter = {
      premiumOnly: this.usersFilter?.premiumOnly ?? false,
      premiumLifetimeOnly: this.usersFilter?.premiumLifetimeOnly ?? false,
      withHashOnly: this.usersFilter?.withHashOnly ?? false,
      activitySort: this.usersFilter?.activitySort ?? null,
    };
  }

  public close(): void {
    void this.modalController.dismiss();
  }

  public apply(): void {
    void this.modalController.dismiss({
      usersFilter: this.draftFilter,
    });
  }

  public togglePremiumFilter(): void {
    const isNowActive = !this.draftFilter.premiumOnly;
    if (!isNowActive) {
      this.draftFilter = {
        ...this.draftFilter,
        premiumOnly: false,
        premiumLifetimeOnly: false,
      };
    } else {
      this.draftFilter = {
        ...this.draftFilter,
        premiumOnly: true,
        premiumLifetimeOnly: false,
      };
    }
  }

  public togglePremiumLifetimeFilter(): void {
    const isNowActive = !this.draftFilter.premiumLifetimeOnly;
    if (isNowActive) {
      this.draftFilter = {
        ...this.draftFilter,
        premiumLifetimeOnly: true,
        premiumOnly: false,
      };
    } else {
      this.draftFilter = {
        ...this.draftFilter,
        premiumLifetimeOnly: false,
        premiumOnly: false,
      };
    }
  }

  public toggleHashFilter(): void {
    this.draftFilter = {
      ...this.draftFilter,
      withHashOnly: !this.draftFilter.withHashOnly,
    };
  }

  /** Activa/desactiva el padre "Actividad". Si se desactiva limpia el sort. */
  public get isActivityActive(): boolean {
    return this.draftFilter.activitySort !== null;
  }

  public toggleActivityFilter(): void {
    if (this.isActivityActive) {
      this.draftFilter = { ...this.draftFilter, activitySort: null };
    } else {
      // Activar con descendente por defecto (más reciente primero)
      this.draftFilter = { ...this.draftFilter, activitySort: 'desc' };
    }
  }

  public setActivitySort(sort: 'asc' | 'desc'): void {
    this.draftFilter = { ...this.draftFilter, activitySort: sort };
  }
}
