import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenStoreService {
  private static readonly REFRESH_TOKEN_KEY = 'auth_refresh_token';
  private static readonly MISSING_TOKEN_MESSAGE =
    'Item with given key does not exist';
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
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        await SecureStoragePlugin.set({
          key: RefreshTokenStoreService.REFRESH_TOKEN_KEY,
          value: refreshToken,
        });
        console.info('[AUTH] native_refresh_token_saved', {
          attempt: attempt + 1,
        });
        return;
      } catch (error) {
        if (attempt === 0) {
          console.warn('[AUTH] native_refresh_token_save_retry', {
            reason: (error as any)?.message || String(error),
          });
          await this.delay(150);
          continue;
        }

        console.error('[AUTH] native_refresh_token_save_failed', error);
        throw {
          status: 0,
          message: 'Secure storage write failed',
          transientAuthStorage: true,
          error,
        };
      }
    }
  }

  public async get(): Promise<string | null> {
    if (!this.nativePlatform) {
      return null;
    }

    if (this.cachedRefreshToken) {
      return this.cachedRefreshToken;
    }

    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await SecureStoragePlugin.get({
          key: RefreshTokenStoreService.REFRESH_TOKEN_KEY,
        });
        this.cachedRefreshToken = response?.value || null;
        console.info('[AUTH] native_refresh_token_loaded', {
          found: !!this.cachedRefreshToken,
          attempt: attempt + 1,
        });
        return this.cachedRefreshToken;
      } catch (error) {
        if (this.isMissingTokenError(error)) {
          console.info('[AUTH] native_refresh_token_missing');
          return null;
        }

        if (attempt === 0) {
          console.warn('[AUTH] native_refresh_token_load_retry', {
            reason: (error as any)?.message || String(error),
          });
          await this.delay(150);
          continue;
        }

        console.error('[AUTH] native_refresh_token_load_failed', error);
        throw {
          status: 0,
          message: 'Secure storage read failed',
          transientAuthStorage: true,
          error,
        };
      }
    }

    return null;
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

  private isMissingTokenError(error: any): boolean {
    const message = String(error?.message || error || '');
    return message.includes(RefreshTokenStoreService.MISSING_TOKEN_MESSAGE);
  }

  private delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
