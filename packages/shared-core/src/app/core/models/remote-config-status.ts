export interface RemoteConfigMaintenanceStatus {
  state: 'normal' | 'warning' | 'active';
  message?: string;
  startAt?: string;
}

export interface RemoteConfigForceUpdateStatus {
  required: boolean;
  message?: string;
  minVersion?: string;
}

export interface RemoteConfigStatus {
  maintenance: RemoteConfigMaintenanceStatus;
  forceUpdate: RemoteConfigForceUpdateStatus;
}
