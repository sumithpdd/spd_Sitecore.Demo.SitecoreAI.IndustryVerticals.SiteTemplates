type JsonValueField<T> = { jsonValue?: T };

/** Unwrap Content SDK / IGQL field shells (`{ jsonValue: { value } }`). */
export const unwrapField = <T>(field?: T | JsonValueField<T>): T | undefined => {
  if (!field || typeof field !== 'object') return field;
  if ('jsonValue' in field && field.jsonValue) return field.jsonValue;
  return field as T;
};

const toPascalCase = (key: string): string => key.charAt(0).toUpperCase() + key.slice(1);

/**
 * Normalize datasource fields from either flat JSS shape or integrated GraphQL
 * (`fields.data.datasource`) into PascalCase kit field names.
 */
export function resolveKitFields<T extends object>(fields: unknown): Partial<T> {
  if (!fields || typeof fields !== 'object') return {};

  const gqlDs = (fields as { data?: { datasource?: Record<string, unknown> } }).data?.datasource;
  const source = gqlDs ?? (fields as Record<string, unknown>);

  const resolved: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(source)) {
    if (key === 'children') continue;
    const unwrapped = unwrapField(value as JsonValueField<unknown>);
    resolved[key] = unwrapped;
    resolved[toPascalCase(key)] = unwrapped;
  }

  return resolved as Partial<T>;
}
