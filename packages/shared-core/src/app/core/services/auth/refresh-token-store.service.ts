import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenStoreService {
  private static readonly REFRESH_TOKEN_KEY = 'auth_refresh_token';
  private cachedRefreshToken: string | null = null;
  private readonly nativePlatform = Capacitor.isNativePlatform();

  constructor() {
    if (this.nativePlatform) {
      // Warm up in-memory cache for fast header access (logout/refresh retries).
      this.get().catch(() => undefined);
    }
  }

  public get isNativeClient(): boolean {
    return this.nativePlatform;
  }

  public peek(): string | null {
    return this.cachedRefreshToken;
  }

  public async save(refreshToken?: string | null): Promise<void> {
    if (!this.nativePlatform) {
      return;
    }

    if (!refreshToken) {
      await this.clear();
      return;
    }

    this.cachedRefreshToken = refreshToken;
    await SecureStoragePlugin.set({
      key: RefreshTokenStoreService.REFRESH_TOKEN_KEY,
      value: refreshToken,
    });
  }

  public async get(): Promise<string | null> {
    if (!this.nativePlatform) {
      return null;
    }

    if (this.cachedRefreshToken) {
      return this.cachedRefreshToken;
    }

    try {
      const response = await SecureStoragePlugin.get({
        key: RefreshTokenStoreService.REFRESH_TOKEN_KEY,
      });
      this.cachedRefreshToken = response?.value || null;
      return this.cachedRefreshToken;
    } catch (_error) {
      return null;
    }
  }

  public async clear(): Promise<void> {
    this.cachedRefreshToken = null;
    if (!this.nativePlatform) {
      return;
    }

    try {
      await SecureStoragePlugin.remove({
        key: RefreshTokenStoreService.REFRESH_TOKEN_KEY,
      });
    } catch (_error) {
      // no-op: token may not exist yet
    }
  }
}
