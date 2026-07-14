export function cleanObject(data: any, excludeFields: string[] = []): any {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const cleaned: any = {};

  Object.keys(data).forEach((key) => {
    if (excludeFields.includes(key)) {
      cleaned[key] = data[key];
      return;
    }

    const value = data[key];

    if (
      value === null ||
      value === undefined ||
      value === 0 ||
      value === '' ||
      value === false
    ) {
      return;
    }

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      cleaned[key] = cleanObject(value, excludeFields);
      return;
    }

    cleaned[key] = value;
  });

  return cleaned;
}

export function preparePayload(data: any): any {
  return cleanObject(data);
}

export function splitTextIntoSteps(text?: string | null): string[] {
  if (!text) return [];

  return String(text)
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((step) => step.trim().length > 0);
}

/**
 * Formats a duration given in whole seconds as "M:SS" (minutes, colon,
 * zero-padded 2-digit seconds). Minutes are NOT capped/rolled into hours —
 * e.g. 4530 -> "75:30". Used for isometric hold times and cardio times,
 * stored as a single scalar string (Set.time / Set.expectedTime) instead of
 * separate min/sec numbers.
 */
export function formatSecondsAsTime(totalSeconds: number): string {
  if (totalSeconds == null || isNaN(totalSeconds) || totalSeconds < 0) {
    return '0:00';
  }
  const rounded = Math.round(totalSeconds);
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Parses a "M:SS" string (as produced by formatSecondsAsTime) back into
 * total whole seconds. Returns 0 for null/undefined/malformed input so
 * callers can safely use it in comparisons/sorts (e.g. "longest hold ever").
 */
export function parseTimeToSeconds(time: string | null | undefined): number {
  if (!time) return 0;
  const parts = String(time).trim().split(':');
  if (parts.length !== 2) return 0;
  const minutes = Number(parts[0]);
  const seconds = Number(parts[1]);
  if (isNaN(minutes) || isNaN(seconds)) return 0;
  return minutes * 60 + seconds;
}
