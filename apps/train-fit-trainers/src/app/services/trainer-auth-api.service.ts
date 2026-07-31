import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { HttpService } from 'src/app/core/services/http/http.service';

export interface ProfessionalRegistration {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface TrainerAuthResponse {
  user: User;
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type: string;
}

@Injectable({ providedIn: 'root' })
export class TrainerAuthApiService {
  constructor(private readonly http: HttpService) {}

  public register(payload: ProfessionalRegistration): Observable<User> {
    return this.http.post<User>('users/professional', payload);
  }

  public activate(email: string, code: string): Observable<TrainerAuthResponse> {
    return this.http.post<TrainerAuthResponse>(
      'auth/activate',
      { email, code },
      undefined,
      true
    );
  }

  public me(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>('auth/me');
  }
}
