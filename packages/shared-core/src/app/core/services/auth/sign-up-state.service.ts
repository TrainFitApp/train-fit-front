import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';
import { ACTIVITY_FACTOR_TYPE } from 'src/app/shared/constants/activity-factor';

@Injectable({
  providedIn: 'root',
})
export class SignUpStateService {
  private userSubject = new BehaviorSubject<User>(null);
  private yearsSubject = new BehaviorSubject<number>(null);
  private activityTypeSubject = new BehaviorSubject<ACTIVITY_FACTOR_TYPE>(null);
  private registerSocialPendingSubject = new BehaviorSubject<boolean>(false);
  private socialProviderSubject = new BehaviorSubject<
    'google' | 'apple' | null
  >(null);

  user$ = this.userSubject.asObservable();
  years$ = this.yearsSubject.asObservable();
  activityType$ = this.activityTypeSubject.asObservable();
  registerSocialPending$ = this.registerSocialPendingSubject.asObservable();
  socialProvider$ = this.socialProviderSubject.asObservable();

  setSignUpState(
    user: User,
    years: number,
    activityType: ACTIVITY_FACTOR_TYPE,
    registerSocialPending: boolean,
    socialProvider: 'google' | 'apple' | null = null
  ) {
    this.userSubject.next(user);
    this.yearsSubject.next(years);
    this.activityTypeSubject.next(activityType);
    this.registerSocialPendingSubject.next(registerSocialPending);
    this.socialProviderSubject.next(socialProvider);
  }

  clearState() {
    this.userSubject.next(null);
    this.yearsSubject.next(null);
    this.activityTypeSubject.next(null);
    this.registerSocialPendingSubject.next(false);
    this.socialProviderSubject.next(null);
  }
}
