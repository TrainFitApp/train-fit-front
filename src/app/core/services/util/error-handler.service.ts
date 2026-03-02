import { Injectable } from '@angular/core';

/**
 * Servicio para extraer y formatear mensajes de error del backend
 * Maneja diferentes formatos de respuesta de error HTTP
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  /**
   * Extrae un mensaje de error legible de una respuesta de error HTTP o cualquier error
   * @param error - El objeto de error (HttpErrorResponse, string, object, etc.)
   * @returns Un mensaje de error legible para mostrar al usuario
   */
  public getErrorMessage(error: any): string {
    // Si es un string, devolverlo tal cual
    if (typeof error === 'string') {
      return error;
    }

    // Si es un objeto con error.error
    if (error?.error) {
      // Backend express devuelve { message: "..." }
      if (typeof error.error === 'object' && error.error.message) {
        return error.error.message;
      }

      // Si error.error es directamente un string
      if (typeof error.error === 'string') {
        return error.error;
      }
    }

    // Si hay un mensaje directo
    if (error?.message) {
      return error.message;
    }

    // Si es una respuesta con statusMessage
    if (error?.statusMessage) {
      return error.statusMessage;
    }

    // Status code + mensaje predefinido
    if (error?.status) {
      return this.getDefaultErrorByStatus(error.status);
    }

    // Por defecto
    return 'Ocurrió un error inesperado. Intenta de nuevo.';
  }

  /**
   * Obtiene un mensaje de error predefinido según el código HTTP
   */
  private getDefaultErrorByStatus(status: number): string {
    const errorMessages: { [key: number]: string } = {
      400: 'Solicitud inválida. Verifica los datos.',
      401: 'No autorizado. Inicia sesión de nuevo.',
      402: 'No se proporcionó token.',
      403: 'No tienes permiso para acceder a esto.',
      404: 'Recurso no encontrado.',
      409: 'Conflicto con los datos. Intenta de nuevo.',
      422: 'Datos inválidos. Verifica los campos.',
      429: 'Demasiadas solicitudes. Espera un momento.',
      500: 'Error del servidor. Intenta más tarde.',
      502: 'Puerta de enlace inválida. Intenta más tarde.',
      503: 'Servicio no disponible. Intenta más tarde.',
      504: 'Tiempo de espera del servidor. Intenta más tarde.',
    };

    return (
      errorMessages[status] || 'Ocurrió un error inesperado. Intenta de nuevo.'
    );
  }

  /**
   * Extrae el mensaje de error y lo formatea con prefijo
   * Útil para toasts con contexto adicional
   */
  public getFormattedErrorMessage(error: any, defaultMessage?: string): string {
    const errorMsg = this.getErrorMessage(error);

    if (
      defaultMessage &&
      errorMsg === 'Ocurrió un error inesperado. Intenta de nuevo.'
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
