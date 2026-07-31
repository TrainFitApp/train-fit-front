import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import {
  TrainerClientApiService,
  TrainerClientSummary,
} from '../../services/trainer-client-api.service';

@Component({
  selector: 'app-trainer-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class TrainerClientsPage {
  public clients: TrainerClientSummary[] = [];
  public loading = true;
  public error = false;

  constructor(
    private readonly api: TrainerClientApiService,
    private readonly router: Router
  ) {}

  public ionViewWillEnter(): void {
    this.loadClients();
  }

  public loadClients(event?: CustomEvent): void {
    this.loading = !event;
    this.error = false;
    this.api
      .getClients()
      .pipe(finalize(() => {
        this.loading = false;
        void event?.detail?.complete();
      }))
      .subscribe({
        next: (clients) => (this.clients = clients),
        error: () => (this.error = true),
      });
  }

  public invite(): void {
    void this.router.navigate(['/tabs/invite']);
  }

  public openClient(client: TrainerClientSummary): void {
    if (!client.user?._id) return;
    void this.router.navigate(['/tabs/clients', client.user._id]);
  }

  public initials(client: TrainerClientSummary): string {
    const name = client.user?.name || client.user?.email || '?';
    const lastname = client.user?.lastname || '';
    return `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  }
}
