import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import {
  TrainerClientApiService,
  TrainerInvitation,
  TrainerScope,
} from '../../services/trainer-client-api.service';

@Component({
  selector: 'app-trainer-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class TrainerInvitePage {
  private readonly formBuilder = inject(FormBuilder);

  public readonly inviteForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    training: [true],
    nutrition: [false],
  });
  public invitations: TrainerInvitation[] = [];
  public loading = false;
  public loadingInvitations = true;
  public cancellingId: string | null = null;
  public error = '';
  public success = '';

  constructor(
    private readonly api: TrainerClientApiService,
    private readonly translate: TranslateService
  ) {}

  public ionViewWillEnter(): void {
    this.loadInvitations();
  }

  public sendInvitation(): void {
    const value = this.inviteForm.getRawValue();
    const scopes: TrainerScope[] = [];
    if (value.training) scopes.push('training');
    if (value.nutrition) scopes.push('nutrition');

    if (this.inviteForm.invalid || scopes.length === 0 || this.loading) {
      this.inviteForm.markAllAsTouched();
      if (scopes.length === 0) {
        this.error = this.translate.instant('TRAINERS.INVITE.SELECT_SCOPE');
      }
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';
    this.api.invite(value.email.trim().toLowerCase(), scopes).subscribe({
      next: ({ results }) => {
        const successes = results.filter((result) => result.success);
        const failures = results.filter((result) => !result.success);
        if (successes.length) {
          this.success = this.translate.instant('TRAINERS.INVITE.SUCCESS');
          this.inviteForm.controls.email.reset();
          this.loadInvitations();
        }
        if (failures.length) {
          this.error = failures.map((result) => result.error).filter(Boolean).join(' · ');
        }
        this.loading = false;
      },
      error: (error) => {
        this.error =
          error?.message ||
          error?.error?.message ||
          this.translate.instant('TRAINERS.INVITE.SEND_ERROR');
        this.loading = false;
      },
    });
  }

  public cancel(invitation: TrainerInvitation): void {
    if (this.cancellingId || invitation.status !== 'pending') return;
    this.cancellingId = invitation._id;
    this.api.cancelInvitation(invitation._id).subscribe({
      next: () => {
        this.cancellingId = null;
        this.loadInvitations();
      },
      error: (error) => {
        this.error =
          error?.message ||
          this.translate.instant('TRAINERS.INVITE.CANCEL_ERROR');
        this.cancellingId = null;
      },
    });
  }

  private loadInvitations(): void {
    this.loadingInvitations = true;
    this.api
      .getInvitations()
      .pipe(finalize(() => (this.loadingInvitations = false)))
      .subscribe({
        next: (invitations) => (this.invitations = invitations),
        error: () =>
          (this.error = this.translate.instant('TRAINERS.INVITE.LOAD_ERROR')),
      });
  }
}
