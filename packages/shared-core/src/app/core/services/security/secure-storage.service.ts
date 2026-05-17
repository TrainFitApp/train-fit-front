import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

/**
 * SecureStorageService
 *
 * Thin wrapper over `capacitor-secure-storage-plugin` (the free community
 * plugin available on npm) that provides a clean async API for storing,
 * retrieving and removing sensitive key-value pairs on native platforms.
 *
 * On the web platform the plugin falls back to localStorage, which is
 * acceptable for development but NOT considered secure for production.
 *
 * NOTE: If the project migrates to `@capawesome/capacitor-secure-storage`
 * (paid Capawesome Insiders) in the future, only the three private helpers
 * (`_set`, `_get`, `_remove`) need to be updated.
 */
@Injectable({
  providedIn: 'root',
})
export class SecureStorageService {
  private readonly isNative = Capacitor.isNativePlatform();

  // ─── Public API ───────────────────────────────────────────────────────────

  /**
   * Persist a value under `key` in secure storage.
   * On non-native platforms this is a no-op for sensitive keys.
   */
  public async set(key: string, value: string): Promise<void> {
    try {
      await SecureStoragePlugin.set({ key, value });
    } catch (error) {
      console.error(`[SecureStorage] set failed for key="${key}"`, error);
      throw error;
    }
  }

  /**
   * Retrieve the value stored under `key`.
   * Returns `null` if the key does not exist or on any read error.
   */
  public async get(key: string): Promise<string | null> {
    try {
      const result = await SecureStoragePlugin.get({ key });
      return result?.value ?? null;
    } catch (error) {
      // The plugin throws when a key is missing – treat that as null.
      if (this.isMissingKeyError(error)) {
        return null;
      }
      console.error(`[SecureStorage] get failed for key="${key}"`, error);
      return null;
    }
  }

  /**
   * Remove the entry stored under `key`.
   * Silently ignores "key not found" errors.
   */
  public async remove(key: string): Promise<void> {
    try {
      await SecureStoragePlugin.remove({ key });
    } catch (error) {
      if (!this.isMissingKeyError(error)) {
        console.error(`[SecureStorage] remove failed for key="${key}"`, error);
      }
    }
  }

  /** Whether this device is running on a native Capacitor platform. */
  public get isNativeClient(): boolean {
    return this.isNative;
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  private isMissingKeyError(error: unknown): boolean {
    const msg = String((error as any)?.message ?? error ?? '');
    return msg.includes('Item with given key does not exist') || msg.includes('does not exist');
  }
}
