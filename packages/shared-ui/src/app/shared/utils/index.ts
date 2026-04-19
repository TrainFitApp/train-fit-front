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
