import { Injector, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { verificationMailFailedIn } from '../../utils/verification-mail.util';

export const AUTH_LOGIN_FEEDBACK_QUERY_PARAM = 'loginIssue';
export const AUTH_LOGIN_CONNECTION_QUERY_VALUE = 'connection';

export type LoginErrorKind =
  | 'invalid-credentials'
  | 'account-not-verified'
  | 'wrong-app-for-role'
  | 'storage'
  | 'network'
  | 'timeout'
  | 'server'
  | 'unexpected';

export interface LoginErrorFeedback {
  kind: LoginErrorKind;
  message: string;
  retryable: boolean;
  status?: number;
  code?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthErrorService {
  private _translate: TranslateService | null = null;

  private get translate(): TranslateService {
    if (!this._translate) {
      this._translate = this.injector.get(TranslateService);
    }
    return this._translate;
  }

  constructor(private injector: Injector) {}

  public toLoginFeedback(error: any): LoginErrorFeedback {
    const status = this.getStatus(error);
    const code = this.getCode(error);

    if (this.isAccountNotVerified(status, code)) {
      return {
        kind: 'account-not-verified',
        // El back manda el código nuevo al responder; si el correo no salió,
        // lo dice (verificationMailSent: false) y aquí se avisa de reenviarlo.
        message: this.translate.instant(
          verificationMailFailedIn(error)
            ? 'AUTH_ERRORS.ACCOUNT_NOT_VERIFIED_MAIL_FAILED'
            : 'AUTH_ERRORS.ACCOUNT_NOT_VERIFIED'
        ),
        retryable: false,
        status,
        code,
      };
    }

    // El mensaje lo arma el backend a medida (qué app, qué rol le hace
    // falta a la cuenta) — no hay una traducción estática única que lo
    // cubra, se pasa el mensaje real del servidor tal cual.
    if (this.isWrongAppForRole(status, code)) {
      return {
        kind: 'wrong-app-for-role',
        message: this.getServerMessage(error) || this.translate.instant('AUTH_ERRORS.UNEXPECTED'),
        retryable: false,
        status,
        code,
      };
    }

    if (this.isInvalidCredentials(status, code)) {
      return {
        kind: 'invalid-credentials',
        message: this.translate.instant('AUTH_ERRORS.INVALID_CREDENTIALS'),
        retryable: false,
        status,
        code,
      };
    }

    if (this.isStorageError(error)) {
      return {
        kind: 'storage',
        message: this.translate.instant('AUTH_ERRORS.STORAGE'),
        retryable: true,
        status,
        code,
      };
    }

    if (this.isTimeout(status, error)) {
      return {
        kind: 'timeout',
        message: this.translate.instant('AUTH_ERRORS.TIMEOUT'),
        retryable: true,
        status,
        code,
      };
    }

    if (this.isNetworkError(status, error)) {
      return {
        kind: 'network',
        message: this.translate.instant('AUTH_ERRORS.NETWORK'),
        retryable: true,
        status,
        code,
      };
    }

    if (status && status >= 500) {
      return {
        kind: 'server',
        message: this.translate.instant('AUTH_ERRORS.UNEXPECTED'),
        retryable: true,
        status,
        code,
      };
    }

    return {
      kind: 'unexpected',
      message: this.translate.instant('AUTH_ERRORS.UNEXPECTED'),
      retryable: true,
      status,
      code,
    };
  }

  private isInvalidCredentials(status?: number, code?: string): boolean {
    return (
      status === 401 ||
      status === 404 ||
      code === 'INVALID_CREDENTIALS'
    );
  }

  private isAccountNotVerified(status?: number, code?: string): boolean {
    return status === 403 && code === 'ACCOUNT_NOT_VERIFIED';
  }

  private isWrongAppForRole(status?: number, code?: string): boolean {
    return status === 403 && code === 'WRONG_APP_FOR_ROLE';
  }

  private getServerMessage(error: any): string | undefined {
    const message = error?.error?.message;
    return typeof message === 'string' && message.length > 0 ? message : undefined;
  }

  private isTimeout(status: number | undefined, error: any): boolean {
    return (
      status === 408 ||
      status === 504 ||
      error?.name === 'TimeoutError' ||
      error?.error?.name === 'TimeoutError'
    );
  }

  private isStorageError(error: any): boolean {
    return !!(error?.transientAuthStorage || error?.error?.transientAuthStorage);
  }

  private isNetworkError(status: number | undefined, error: any): boolean {
    const nativeError = error?.error;
    return (
      status === 0 ||
      error?.status === 0 ||
      nativeError?.status === 0 ||
      (typeof ProgressEvent !== 'undefined' &&
        nativeError instanceof ProgressEvent)
    );
  }

  private getStatus(error: any): number | undefined {
    const candidates = [
      error?.status,
      error?.error?.status,
      error?.statusCode,
      error?.originalError?.status,
    ];

    for (const candidate of candidates) {
      const status = Number(candidate);
      if (Number.isFinite(status)) {
        return status;
      }
    }

    return undefined;
  }

  private getCode(error: any): string | undefined {
    const candidates = [error?.error?.code, error?.code];

    return candidates.find(
      (candidate) => typeof candidate === 'string' && candidate.length > 0
    );
  }
}
