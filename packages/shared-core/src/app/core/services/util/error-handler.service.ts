import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Servicio para extraer y formatear mensajes de error del backend
 * Maneja diferentes formatos de respuesta de error HTTP
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  // TranslateService se pide al usarse y no en el constructor: su loader usa
  // HttpClient y este servicio lo usan los interceptores (dependencia circular).
  constructor(private injector: Injector) {}

  private t(key: string): string {
    return this.injector.get(TranslateService).instant(key);
  }

  private get unexpectedMessage(): string {
    return this.t('HTTP_ERRORS.UNEXPECTED');
  }

  private get connectionMessage(): string {
    return this.t('HTTP_ERRORS.CONNECTION');
  }

  private readonly unsafeMessagePattern =
    /(\/api\/|https?:\/\/|Http failure response|stack|trace|TypeError|ReferenceError|SyntaxError|AxiosError|Mongo(Error|ServerError)?|CastError|ECONN|ETIMEDOUT|ENOTFOUND|Cannot\s)/i;
  private readonly sensitiveAuthPattern =
    /(contraseña incorrecta|correo no encontrado|usuario (no existe|inexistente|no encontrado))/i;

  /**
   * Extrae un mensaje de error legible de una respuesta de error HTTP o cualquier error
   * @param error - El objeto de error (HttpErrorResponse, string, object, etc.)
   * @returns Un mensaje de error legible para mostrar al usuario
   */
  public getErrorMessage(error: any): string {
    const status = this.getStatus(error);

    if (status === 0) {
      return this.connectionMessage;
    }

    if (status && status >= 500) {
      return this.unexpectedMessage;
    }

    const extractedMessage = this.extractMessage(error);
    if (extractedMessage && !this.isUnsafeMessage(extractedMessage)) {
      return extractedMessage;
    }

    if (status) {
      return this.getDefaultErrorByStatus(status);
    }

    return this.unexpectedMessage;
  }

  private extractMessage(error: any): string | null {
    if (typeof error === 'string') {
      return error;
    }

    if (typeof error?.error === 'object' && error.error?.message) {
      return error.error.message;
    }

    if (typeof error?.error === 'string') {
      return error.error;
    }

    if (typeof error?.message === 'string') {
      return error.message;
    }

    if (typeof error?.statusMessage === 'string') {
      return error.statusMessage;
    }

    return null;
  }

  private getStatus(error: any): number | undefined {
    const status = Number(error?.status ?? error?.error?.status);
    return Number.isFinite(status) ? status : undefined;
  }

  private isUnsafeMessage(message: string): boolean {
    return (
      this.unsafeMessagePattern.test(message) ||
      this.sensitiveAuthPattern.test(message)
    );
  }

  /**
   * Obtiene un mensaje de error predefinido según el código HTTP
   */
  private getDefaultErrorByStatus(status: number): string {
    const errorMessages: { [key: number]: string } = {
      400: this.t('HTTP_ERRORS.400'),
      401: this.t('HTTP_ERRORS.401'),
      402: this.t('HTTP_ERRORS.402'),
      403: this.t('HTTP_ERRORS.403'),
      404: this.t('HTTP_ERRORS.404'),
      409: this.t('HTTP_ERRORS.409'),
      422: this.t('HTTP_ERRORS.422'),
      429: this.t('HTTP_ERRORS.429'),
      500: this.unexpectedMessage,
      502: this.unexpectedMessage,
      503: this.connectionMessage,
      504: this.t('HTTP_ERRORS.504'),
    };

    return errorMessages[status] || this.unexpectedMessage;
  }

  /**
   * Extrae el mensaje de error y lo formatea con prefijo
   * Útil para toasts con contexto adicional
   */
  public getFormattedErrorMessage(error: any, defaultMessage?: string): string {
    const errorMsg = this.getErrorMessage(error);
    const extractedMessage = this.extractMessage(error);

    if (
      defaultMessage &&
      (errorMsg === this.unexpectedMessage ||
        (!!extractedMessage && this.isUnsafeMessage(extractedMessage)))
    ) {
      return defaultMessage;
    }

    return errorMsg;
  }

  /**
   * Determina si es un error de autenticación
   */
  public isAuthError(error: any): boolean {
    return error?.status === 401 || error?.error?.requiresRelogin === true;
  }

  /**
   * Determina si es un error de validación
   */
  public isValidationError(error: any): boolean {
    return error?.status === 400 || error?.status === 422;
  }

  /**
   * Determina si es un error de servidor
   */
  public isServerError(error: any): boolean {
    return error?.status >= 500;
  }

  /**
   * Determina el color del toast según el tipo de error
   */
  public getToastColorByError(error: any): string {
    if (this.isAuthError(error)) {
      return 'warning';
    }
    if (this.isServerError(error)) {
      return 'danger';
    }
    if (this.isValidationError(error)) {
      return 'warning';
    }
    return 'danger';
  }

  /**
   * Determina el icono del toast según el tipo de error
   */
  public getToastIconByError(error: any): string {
    if (this.isAuthError(error)) {
      return 'lock-open-outline';
    }
    if (this.isServerError(error)) {
      return 'server-outline';
    }
    if (this.isValidationError(error)) {
      return 'alert-circle-outline';
    }
    return 'close-circle-outline';
  }
}
