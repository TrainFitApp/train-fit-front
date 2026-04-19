import { Injectable } from '@angular/core';

/**
 * Security service to handle token management and security best practices
 */
@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private static readonly TOKEN_CHECK_INTERVAL = 60000; // Check every minute
  private tokenCheckInterval: any;

  constructor() {}

  /**
   * Start periodic token expiration check
   * This helps detect token expiration before making API calls
   */
  public startTokenExpirationCheck(onExpired: () => void): void {
    this.stopTokenExpirationCheck();

    this.tokenCheckInterval = setInterval(() => {
      if (this.isTokenExpiringSoon()) {
        onExpired();
      }
    }, SecurityService.TOKEN_CHECK_INTERVAL);
  }

  /**
   * Stop periodic token check
   */
  public stopTokenExpirationCheck(): void {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
      this.tokenCheckInterval = null;
    }
  }

  /**
   * Check if access token is expiring soon (within 2 minutes)
   * Returns true if token expires in less than 2 minutes
   */
  private isTokenExpiringSoon(): boolean {
    try {
      const tokenStr = localStorage.getItem('currentUser');
      if (!tokenStr) return false;

      const token = JSON.parse(tokenStr);
      if (!token?.access_token) return false;

      // Decode JWT to get expiration
      const payload = this.decodeToken(token.access_token);
      if (!payload?.exp) return false;

      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;

      // Refresh if less than 2 minutes remaining
      return timeUntilExpiration < 2 * 60 * 1000;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return false;
    }
  }

  /**
   * Decode JWT token payload
   */
  private decodeToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = parts[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Clear all sensitive data from browser storage
   */
  public clearAllSecurityData(): void {
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
  }

  /**
   * Generate a random state string for OAuth flows
   */
  public generateRandomState(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
      ''
    );
  }

  /**
   * Validate that a response state matches the request state (for OAuth)
   */
  public validateState(requestState: string, responseState: string): boolean {
    return requestState === responseState;
  }
}
