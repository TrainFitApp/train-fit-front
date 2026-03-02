import { Injectable } from '@angular/core';
import {
  AdMob,
  AdmobConsentStatus,
  AdOptions,
} from '@capacitor-community/admob';
import { ModalOptions, Platform } from '@ionic/angular';
import { AdPreferencesPage } from 'src/app/features/profile/components/configuration/components/ad-preferences/ad-preferences.page';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { UserService } from '../user/user.service';
import { IonicUtilService } from './ionic-util.service';

@Injectable()
export class AdMobService {
  private readonly ID_ANDROID_INTERSECTIAL =
    'ca-app-pub-7032025540653355/3650415135';
  private readonly ID_IOS_INTERSECTIAL =
    'ca-app-pub-7032025540653355/2146101087';

  constructor(
    private readonly _platform: Platform,
    private readonly userService: UserService,
    private readonly ionicUtilService: IonicUtilService
  ) {
    this.initialize();
  }

  public async consent(user: User): Promise<void> {
    const modalOptions: ModalOptions = {
      component: AdPreferencesPage,
    };

    let optionSelected: boolean = (
      await this.ionicUtilService.showModal(modalOptions)
    ).data;

    if (optionSelected !== undefined) user.personalAds = optionSelected;
    await this.userService
      .updateUser(user)
      .toPromise()
      .then((resUser) => (this.userService.setLocalUser = resUser));
  }

  public async interstitial(): Promise<void> {
    const user: User = this.userService.getLocalUser;
    if (user.personalAds === undefined) await this.consent(user);

    const options: AdOptions = {
      adId: this._platform.is('ios')
        ? this.ID_IOS_INTERSECTIAL
        : this.ID_ANDROID_INTERSECTIAL,
      isTesting: !environment.production,
      npa: !user.personalAds,
    };

    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }

  public async initialize(): Promise<void> {
    await AdMob.initialize();
    const [trackingInfo, consentInfo] = await Promise.all([
      AdMob.trackingAuthorizationStatus(),
      AdMob.requestConsentInfo(),
    ]);
    if (trackingInfo.status === 'notDetermined')
      await AdMob.requestTrackingAuthorization();
    const authorizationStatus = await AdMob.trackingAuthorizationStatus();
    if (
      authorizationStatus.status === 'authorized' &&
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdmobConsentStatus.REQUIRED
    ) {
      await AdMob.showConsentForm();
    }
  }
}
