import { Injectable } from '@angular/core';
import { SecureStorageService } from '../security/secure-storage.service';

/**
 * RefreshTokenStoreService
 *
 * Manages secure persistence of the refresh token on native platforms via
 * `SecureStorageService` (backed by `capacitor-secure-storage-plugin`,
 * the free community plugin).
 *
 * Keeps an in-memory cache so that header-based logout/refresh retries can
 * read the token synchronously via `peek()` without an async round-trip.
 */
@Injectable({
  providedIn: 'root',
})
export class RefreshTokenStoreService {
  private static readonly REFRESH_TOKEN_KEY = 'auth_refresh_token';

  private cachedRefreshToken: string | null = null;

  constructor(private secureStorage: SecureStorageService) {
    if (this.isNativeClient) {
      // Warm up the in-memory cache at boot so peek() is ready immediately.
      this.get().catch(() => undefined);
    }
  }

  /** True when running on a native Capacitor platform (iOS / Android). */
  public get isNativeClient(): boolean {
    return this.secureStorage.isNativeClient;
  }

  /**
   * Synchronous peek at the cached refresh token.
   * Use only where async is not possible (e.g. building logout headers).
   */
  public peek(): string | null {
    return this.cachedRefreshToken;
  }

  /**
   * Persist `refreshToken` in secure storage and update the in-memory cache.
   * Passing `null` / `undefined` delegates to `clear()`.
   */
  public async save(refreshToken?: string | null): Promise<void> {
    if (!this.isNativeClient) {
      return;
    }

    if (!refreshToken) {
      await this.clear();
      return;
    }

    this.cachedRefreshToken = refreshToken;

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        await this.secureStorage.set(RefreshTokenStoreService.REFRESH_TOKEN_KEY, refreshToken);
        console.info('[AUTH] refresh_token_saved', { attempt: attempt + 1 });
        return;
      } catch (error) {
        if (attempt === 0) {
          console.warn('[AUTH] refresh_token_save_retry', {
            reason: (error as any)?.message ?? String(error),
          });
          await this.delay(150);
          continue;
        }

        console.error('[AUTH] refresh_token_save_failed', error);
        throw {
          status: 0,
          message: 'Secure storage write failed',
          transientAuthStorage: true,
          error,
        };
      }
    }
  }

  /**
   * Read the refresh token from secure storage.
   * Returns `null` if the key does not exist.
   */
  public async get(): Promise<string | null> {
    if (!this.isNativeClient) {
      return null;
    }

    if (this.cachedRefreshToken) {
      return this.cachedRefreshToken;
    }

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const value = await this.secureStorage.get(RefreshTokenStoreService.REFRESH_TOKEN_KEY);
        this.cachedRefreshToken = value;
        console.info('[AUTH] refresh_token_loaded', {
          found: !!value,
          attempt: attempt + 1,
        });
        return value;
      } catch (error) {
        if (attempt === 0) {
          console.warn('[AUTH] refresh_token_load_retry', {
            reason: (error as any)?.message ?? String(error),
          });
          await this.delay(150);
          continue;
        }

        console.error('[AUTH] refresh_token_load_failed', error);
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

  /**
   * Wipe the refresh token from secure storage and clear the in-memory cache.
   */
  public async clear(): Promise<void> {
    this.cachedRefreshToken = null;

    if (!this.isNativeClient) {
      return;
    }

    await this.secureStorage.remove(RefreshTokenStoreService.REFRESH_TOKEN_KEY);
    console.info('[AUTH] refresh_token_cleared');
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
