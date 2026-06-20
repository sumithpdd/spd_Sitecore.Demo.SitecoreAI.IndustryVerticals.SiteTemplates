import { Field, ImageField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

type JsonValueField<T> = { jsonValue?: T };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/** Datasource from integrated GraphQL or flat layout-service fields. */
export const getDatasource = (fields: unknown): Record<string, unknown> | undefined => {
  if (!fields || typeof fields !== 'object') return undefined;
  const gql = (fields as { data?: { datasource?: Record<string, unknown> } }).data?.datasource;
  return gql ?? (fields as Record<string, unknown>);
};

/** Resolve a field for Content SDK components (handles IGQL `{ jsonValue }` and flat JSS). */
export const pickSdkField = <T>(
  source: Record<string, unknown> | undefined,
  ...keys: string[]
): T | undefined => {
  if (!source) return undefined;

  for (const key of keys) {
    const raw = source[key];
    if (raw == null) continue;

    if (typeof raw === 'object' && 'jsonValue' in raw) {
      const jsonValue = (raw as JsonValueField<T>).jsonValue;
      if (jsonValue != null) return jsonValue;
    }

    return raw as T;
  }

  return undefined;
};

/** Recursively unwrap Content SDK / IGQL `{ jsonValue }` shells. */
export const unwrapField = <T>(field?: T | JsonValueField<T>): T | undefined => {
  let current: unknown = field;

  for (let depth = 0; depth < 5; depth += 1) {
    if (current == null || typeof current !== 'object') return current as T | undefined;
    if ('jsonValue' in current && (current as JsonValueField<T>).jsonValue) {
      current = (current as JsonValueField<T>).jsonValue;
      continue;
    }
    break;
  }

  return current as T | undefined;
};

const toPascalCase = (key: string): string => key.charAt(0).toUpperCase() + key.slice(1);

const readStringValue = (value: unknown): string => {
  if (typeof value === 'string') return value.trim();
  if (!isRecord(value)) return '';

  if (typeof value.value === 'string') return value.value.trim();
  if (isRecord(value.value)) return readStringValue(value.value);

  return '';
};

/**
 * Normalize datasource fields from flat JSS or integrated GraphQL
 * (`fields.data.datasource`) into kit field names.
 */
export function resolveKitFields<T extends object>(fields: unknown): Partial<T> {
  if (!fields || typeof fields !== 'object') return {};

  const gqlDs = (fields as { data?: { datasource?: Record<string, unknown> } }).data?.datasource;
  const source = gqlDs ?? (fields as Record<string, unknown>);

  const resolved: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(source)) {
    if (key === 'children') continue;
    const unwrapped = unwrapField(value);
    resolved[key] = unwrapped;
    resolved[toPascalCase(key)] = unwrapped;
  }

  return resolved as Partial<T>;
}

export const textFieldValue = (field?: unknown): string => {
  const unwrapped = unwrapField(field);
  if (typeof unwrapped === 'string') return unwrapped.trim();
  return readStringValue(unwrapped);
};

export const richTextFieldValue = (field?: unknown): string => {
  const unwrapped = unwrapField(field);
  if (typeof unwrapped === 'string') return unwrapped.trim();
  return readStringValue(unwrapped);
};

export const normalizeTextField = (field?: unknown): Field<string> | undefined => {
  const unwrapped = unwrapField(field);
  if (unwrapped && typeof unwrapped === 'object' && 'value' in unwrapped) {
    const value = readStringValue(unwrapped);
    if (value || typeof (unwrapped as Field<string>).value === 'string') {
      return { ...(unwrapped as Field<string>), value };
    }
  }

  const value = textFieldValue(field);
  if (!value && field == null) return undefined;
  return { value };
};

export const normalizeRichTextField = (field?: unknown): RichTextField | undefined => {
  const unwrapped = unwrapField(field);
  if (unwrapped && typeof unwrapped === 'object' && 'value' in unwrapped) {
    const value = readStringValue(unwrapped);
    if (value || typeof (unwrapped as RichTextField).value === 'string') {
      return { ...(unwrapped as RichTextField), value };
    }
  }

  const value = richTextFieldValue(field);
  if (!value && field == null) return undefined;
  return { value };
};

export const normalizeImageField = (field?: unknown): ImageField | undefined => {
  const unwrapped = unwrapField(field);
  if (!unwrapped || typeof unwrapped !== 'object') return undefined;

  if ('value' in unwrapped && isRecord((unwrapped as ImageField).value)) {
    const src = (unwrapped as ImageField).value?.src;
    if (typeof src === 'string') return unwrapped as ImageField;
  }

  return undefined;
};

export const normalizeLinkField = (field?: unknown): LinkField | undefined => {
  const unwrapped = unwrapField(field);
  if (!unwrapped || typeof unwrapped !== 'object') return undefined;

  if ('value' in unwrapped && isRecord((unwrapped as LinkField).value)) {
    const raw = (unwrapped as LinkField).value as Record<string, unknown>;
    const href =
      typeof raw.href === 'string' ? raw.href : typeof raw.url === 'string' ? raw.url : '#';
    const text =
      typeof raw.text === 'string'
        ? raw.text
        : typeof raw.title === 'string'
          ? raw.title
          : 'Learn more';

    return {
      ...(unwrapped as LinkField),
      value: {
        ...(unwrapped as LinkField).value,
        href,
        text,
      },
    };
  }

  return undefined;
};

export const hasTextFieldValue = (field?: unknown): boolean => Boolean(textFieldValue(field));

export const hasRichTextFieldValue = (field?: unknown): boolean =>
  Boolean(richTextFieldValue(field));

export const hasImageFieldValue = (field?: unknown): boolean =>
  Boolean(normalizeImageField(field)?.value?.src);
