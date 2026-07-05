import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const AUTH_LOGIN_FEEDBACK_QUERY_PARAM = 'loginIssue';
export const AUTH_LOGIN_CONNECTION_QUERY_VALUE = 'connection';

export type LoginErrorKind =
  | 'invalid-credentials'
  | 'account-not-verified'
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
  constructor(private translate: TranslateService) {}

  public toLoginFeedback(error: any): LoginErrorFeedback {
    const status = this.getStatus(error);
    const code = this.getCode(error);

    if (this.isAccountNotVerified(status, code)) {
      return {
        kind: 'account-not-verified',
        message: this.translate.instant('AUTH_ERRORS.ACCOUNT_NOT_VERIFIED'),
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

  public isAccountNotVerifiedError(error: any): boolean {
    return this.isAccountNotVerified(this.getStatus(error), this.getCode(error));
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
    const candidates = [
      error?.error?.error,
      error?.error?.code,
      error?.error,
      error?.code,
    ];

    return candidates.find(
      (candidate) => typeof candidate === 'string' && candidate.length > 0
    );
  }
}
