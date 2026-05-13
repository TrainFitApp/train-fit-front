import { Injectable } from '@angular/core';

export type LoginErrorKind =
  | 'invalid-credentials'
  | 'account-not-verified'
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
  private readonly invalidCredentialsMessage =
    'Correo o contraseña incorrectos';
  private readonly connectionMessage = 'No se pudo conectar. Inténtalo de nuevo';
  private readonly timeoutMessage =
    'La conexión tardó demasiado. Inténtalo de nuevo';
  private readonly unexpectedMessage = 'Ha ocurrido un error inesperado';

  public toLoginFeedback(error: any): LoginErrorFeedback {
    const status = this.getStatus(error);
    const code = this.getCode(error);

    if (this.isAccountNotVerified(status, code)) {
      return {
        kind: 'account-not-verified',
        message:
          'Cuenta no verificada. Te hemos enviado un nuevo código al correo.',
        retryable: false,
        status,
        code,
      };
    }

    if (this.isInvalidCredentials(status, code)) {
      return {
        kind: 'invalid-credentials',
        message: this.invalidCredentialsMessage,
        retryable: false,
        status,
        code,
      };
    }

    if (this.isTimeout(status, error)) {
      return {
        kind: 'timeout',
        message: this.timeoutMessage,
        retryable: true,
        status,
        code,
      };
    }

    if (this.isNetworkError(status, error)) {
      return {
        kind: 'network',
        message: this.connectionMessage,
        retryable: true,
        status,
        code,
      };
    }

    if (status && status >= 500) {
      return {
        kind: 'server',
        message: this.unexpectedMessage,
        retryable: true,
        status,
        code,
      };
    }

    return {
      kind: 'unexpected',
      message: this.unexpectedMessage,
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
