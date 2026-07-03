import { LinkField } from '@sitecore-content-sdk/nextjs';

export type MaybeWrappedField<T> = T | { jsonValue?: T | null };

/** Unwrap EE / IGQL `{ jsonValue }` fields to flat SDK field shape. */
export function pickField<T>(field?: MaybeWrappedField<T>): T | undefined {
  if (!field || typeof field !== 'object') {
    return undefined;
  }

  if ('jsonValue' in field) {
    return (field as { jsonValue?: T | null }).jsonValue ?? undefined;
  }

  return field as T;
}

/** Only pass links with a resolved href to `<Link>` — malformed links render as [object Object]. */
export function getValidLinkField(field?: LinkField): LinkField | undefined {
  const link = pickField(field);
  return link?.value?.href ? link : undefined;
}
