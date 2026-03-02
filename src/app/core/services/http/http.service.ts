import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HTTP_HEADERS, HttpHeader } from '../../models/http-header';
import { UtilService } from '../util/util.service';

@Injectable()
export class HttpService {
  private readonly BASIC_AUTHORIZATION = 'Basic';
  private readonly BEARER_AUTHORIZATION = 'Bearer';

  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private utilService: UtilService) {}

  public get<T>(
    endpoint: string,
    headers?: HttpHeaders,
    withCredentials?: boolean
  ): Observable<any> {
    const endpointUrl = this.getEndpointUrl(endpoint);
    const options: any = {};
    if (headers) {
      options.headers = headers;
    }
    if (withCredentials) {
      options.withCredentials = true;
    }
    return this.http
      .get<T>(endpointUrl, options)
      .pipe(catchError((exception) => this.handleError(exception)));
  }

  public post<T>(
    endpoint: string,
    body: any,
    headers?: HttpHeader,
    withCredentials?: boolean
  ): Observable<any> {
    const requestOptions = this.getRequestOptions(headers, withCredentials);
    return this.http
      .post<T>(this.getEndpointUrl(endpoint), body, requestOptions)
      .pipe(catchError((exception) => this.handleError(exception)));
  }

  private getRequestOptions(
    headers: HttpHeader,
    withCredentials?: boolean
  ): any {
    const requestOptions: any = {};
    if (headers) {
      requestOptions.headers = new HttpHeaders({ ...headers });
    }
    if (withCredentials) {
      requestOptions.withCredentials = true;
    }
    return requestOptions;
  }

  // TODO: No se si se usa
  public postWithoutMessage<T>(
    endpoint: string,
    body: any,
    headers?: HttpHeader,
    withCredentials?: boolean
  ): Observable<any> {
    const requestOptions = this.getRequestOptions(headers, withCredentials);
    return this.http
      .post<T>(this.getEndpointUrl(endpoint), body, requestOptions)
      .pipe(
        catchError((exception) => this.handleErrorWithoutMessage(exception))
      );
  }

  public put<T>(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http
      .put<T>(this.getEndpointUrl(endpoint), body, reqOpts)
      .pipe(catchError((exception) => this.handleError(exception)));
  }

  public delete<T>(endpoint: string, reqOpts?: any): Observable<any> {
    return this.http
      .delete<T>(this.getEndpointUrl(endpoint), reqOpts)
      .pipe(catchError((exception) => this.handleError(exception)));
  }

  public cloneRequestWithTokenAuthorization(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    const headerValue = this.getAuthorization(token);
    return request.clone({
      headers: request.headers.set(
        HTTP_HEADERS.auth.authorization.id,
        headerValue
      ),
    });
  }

  public getLoginAuthorizationHeaders(
    email: string,
    password: string
  ): HttpHeader {
    const authorization = this.getLoginAuthorization(email, password);
    const authorizationHeader = new HttpHeader(
      HTTP_HEADERS.auth.authorization.id,
      authorization
    );
    return {
      ...authorizationHeader,
      ...HTTP_HEADERS.login.disableBrowserPopup.header,
      ...HTTP_HEADERS.login.contentType.header,
    };
  }

  private getAuthorization(token: string): string {
    return `${this.BEARER_AUTHORIZATION} ${token}`;
  }

  private getLoginAuthorization(email: string, password: string): string {
    const credentials = btoa(`${email}:${password}`);
    return `${this.BASIC_AUTHORIZATION} ${credentials}`;
  }

  private handleError(exception): Observable<any> {
    // Preservar el error original con toda su información incluyendo el status
    let error = exception;

    // Si el error tiene una estructura HttpErrorResponse, preservarla completamente
    if (exception?.status && (exception?.error || exception?.message)) {
      // IMPORTANTE: Priorizar el mensaje del backend (exception.error.message)
      // sobre el mensaje genérico de Angular (exception.message = "Http failure response for...")
      const backendMessage =
        (typeof exception.error === 'object'
          ? exception.error?.message
          : null) || exception.message;

      error = {
        // Spread el error del backend para obtener sus propiedades
        ...(typeof exception.error === 'object' ? exception.error : {}),
        status: exception.status,
        // El mensaje del backend tiene prioridad sobre el genérico de Angular
        message: backendMessage,
        // Preservar el error original completo para acceso en capas superiores
        error: exception.error,
      };
    } else if (exception?.error) {
      // Si hay error interno, asegurar que el status se preserve
      if (typeof exception.error === 'object') {
        error = {
          ...exception.error,
          status: exception.status || exception.error.status,
        };
      } else {
        error = {
          error: exception.error,
          status: exception.status,
        };
      }
    } else if (exception?.status) {
      // Si solo hay status, preservarlo
      error = { ...exception, status: exception.status };
    }

    return this.handlePropagationError(error);
  }

  // TODO: No se si se usa
  private handleErrorWithoutMessage(exception): Observable<any> {
    const error = !!exception?.error ? { ...exception?.error } : exception;
    if (!!exception?.error) {
      alert(error);
    }
    return throwError(exception);
  }

  private handlePropagationError(exception): Observable<any> {
    return throwError(exception);
  }

  private getEndpointUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }

  public getFromLocalStorage(key: string): any {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return null;
    }
  }
}
