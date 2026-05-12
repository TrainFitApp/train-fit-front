export type RirValue = number[] | null;

export interface RirSelection {
  first: number | null;
  second: number | null;
}

export const RIR_FAIL_VALUE = -1;
export const RIR_EMPTY_LABEL = '-';
export const RIR_FAIL_LABEL = 'FALLO';

const MIN_RIR_VALUE = 0;
const MAX_RIR_VALUE = 10;
const RIR_RANGE_PATTERN = /^(\d+)\s*-\s*(\d+)$/;

export function getRirNumberOptions(): number[] {
  return Array.from(
    { length: MAX_RIR_VALUE - MIN_RIR_VALUE + 1 },
    (_, index) => MIN_RIR_VALUE + index
  );
}

export function isAllowedRirNumber(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= MIN_RIR_VALUE &&
    value <= MAX_RIR_VALUE
  );
}

export function buildRirValue(
  first: number | null | undefined,
  second: number | null | undefined
): RirValue {
  if (first === null || first === undefined) {
    return null;
  }

  if (first === RIR_FAIL_VALUE) {
    return [RIR_FAIL_VALUE];
  }

  if (!isAllowedRirNumber(first)) {
    return null;
  }

  if (!isAllowedRirNumber(second) || second === first) {
    return [first];
  }

  return [first, second];
}

export function normalizeRirValue(value: unknown): RirValue {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (value === RIR_FAIL_VALUE) {
    return [RIR_FAIL_VALUE];
  }

  if (isAllowedRirNumber(value)) {
    return [value];
  }

  if (Array.isArray(value)) {
    if (value.some((item) => Number(item) === RIR_FAIL_VALUE)) {
      return [RIR_FAIL_VALUE];
    }

    const first = Number(value[0]);
    const second = value.length > 1 ? Number(value[1]) : null;
    return buildRirValue(first, second);
  }

  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();
  if (!trimmedValue || trimmedValue === RIR_EMPTY_LABEL) {
    return null;
  }

  if (
    trimmedValue.toUpperCase() === RIR_FAIL_LABEL ||
    trimmedValue === RIR_FAIL_VALUE.toString()
  ) {
    return [RIR_FAIL_VALUE];
  }

  const numericValue = Number(trimmedValue);
  if (isAllowedRirNumber(numericValue)) {
    return [numericValue];
  }

  const rangeMatch = trimmedValue.match(RIR_RANGE_PATTERN);
  if (!rangeMatch) {
    return null;
  }

  const first = Number(rangeMatch[1]);
  const second = Number(rangeMatch[2]);
  return buildRirValue(first, second);
}

export function parseRirSelection(value: unknown): RirSelection {
  const normalizedValue = normalizeRirValue(value);

  if (normalizedValue === null) {
    return { first: null, second: null };
  }

  if (normalizedValue[0] === RIR_FAIL_VALUE) {
    return { first: RIR_FAIL_VALUE, second: null };
  }

  return {
    first: normalizedValue[0] ?? null,
    second: normalizedValue[1] ?? null,
  };
}

export function isRirFail(value: unknown): boolean {
  return normalizeRirValue(value)?.[0] === RIR_FAIL_VALUE;
}

export function hasRirValue(value: unknown): boolean {
  return normalizeRirValue(value) !== null;
}

export function formatRirValue(
  value: unknown,
  options: { includeUnit?: boolean; emptyLabel?: string } = {}
): string {
  const normalizedValue = normalizeRirValue(value);
  const emptyLabel = options.emptyLabel ?? RIR_EMPTY_LABEL;

  if (normalizedValue === null) {
    return emptyLabel;
  }

  if (normalizedValue[0] === RIR_FAIL_VALUE) {
    return RIR_FAIL_LABEL;
  }

  const label = normalizedValue.join('-');
  return options.includeUnit ? `${label} RIR` : label;
}
