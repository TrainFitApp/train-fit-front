export type AppUpdateMode = 'off' | 'outdated_only' | 'all';
export type AppRuntimePlatform = 'ios' | 'android' | 'web';

export interface AppRuntimePlatformPolicy {
  enabled: boolean;
  minVersion: string;
}

export interface AppRuntimePolicy {
  maintenance: {
    enabled: boolean;
    title: string;
    message: string;
    expectedEndAt: string | null;
    retryAfterSeconds: number;
  };
  updateRequired: {
    mode: AppUpdateMode;
    title: string;
    message: string;
    platforms: Record<AppRuntimePlatform, AppRuntimePlatformPolicy>;
  };
  revision: number;
  updatedAt?: string | null;
  updatedBy?: {
    userId?: string | null;
    email?: string | null;
  };
}

export interface AppRuntimeStatus {
  clientFamily: string;
  platform: AppRuntimePlatform;
  clientVersion: string;
  managementClient: boolean;
  maintenance: {
    enabled: boolean;
    applies: boolean;
    title: string;
    message: string;
    expectedEndAt: string | null;
    retryAfterSeconds: number;
  };
  updateRequired: {
    mode: AppUpdateMode;
    enabled: boolean;
    applies: boolean;
    platformEnabled: boolean;
    title: string;
    message: string;
    minVersion: string;
    currentVersion: string;
  };
  revision: number;
}
