import { Injectable } from "@angular/core";

export interface PendingEmailVerificationState {
  flow: "email-verification";
  email: string;
  createdAt: string;
  codeSentAt: string;
}

@Injectable({
  providedIn: "root",
})
export class PendingEmailVerificationService {
  private readonly STORAGE_KEY = "trainfit.pendingEmailVerification";

  public start(email: string): PendingEmailVerificationState | null {
    const normalizedEmail = this.normalizeEmail(email);
    if (!normalizedEmail) {
      return null;
    }

    const now = new Date().toISOString();
    const state: PendingEmailVerificationState = {
      flow: "email-verification",
      email: normalizedEmail,
      createdAt: now,
      codeSentAt: now,
    };

    this.save(state);
    return state;
  }

  public markCodeSent(email?: string): PendingEmailVerificationState | null {
    const existing = this.get();
    const normalizedEmail = this.normalizeEmail(email ?? existing?.email ?? "");
    if (!normalizedEmail) {
      return null;
    }

    const state: PendingEmailVerificationState = {
      flow: "email-verification",
      email: normalizedEmail,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      codeSentAt: new Date().toISOString(),
    };

    this.save(state);
    return state;
  }

  public get(): PendingEmailVerificationState | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) {
        return null;
      }

      const parsed = JSON.parse(raw) as PendingEmailVerificationState;
      if (!this.isValidState(parsed)) {
        this.clear();
        return null;
      }

      return {
        flow: "email-verification",
        email: this.normalizeEmail(parsed.email),
        createdAt: parsed.createdAt,
        codeSentAt: parsed.codeSentAt,
      };
    } catch {
      this.clear();
      return null;
    }
  }

  public hasPendingVerification(): boolean {
    return !!this.get();
  }

  public clear(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn("[AUTH] pending_email_verification_clear_failed", error);
    }
  }

  private save(state: PendingEmailVerificationState): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("[AUTH] pending_email_verification_save_failed", error);
    }
  }

  private isValidState(state: PendingEmailVerificationState | null): boolean {
    return (
      state?.flow === "email-verification" &&
      !!this.normalizeEmail(state.email) &&
      this.isValidDate(state.createdAt) &&
      this.isValidDate(state.codeSentAt)
    );
  }

  private isValidDate(value: string): boolean {
    return !!value && !Number.isNaN(new Date(value).getTime());
  }

  private normalizeEmail(email: string): string {
    return typeof email === "string" ? email.trim().toLowerCase() : "";
  }
}
