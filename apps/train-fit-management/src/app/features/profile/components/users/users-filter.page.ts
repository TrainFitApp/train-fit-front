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
      withHashOnly: this.usersFilter?.withHashOnly ?? false,
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
}
