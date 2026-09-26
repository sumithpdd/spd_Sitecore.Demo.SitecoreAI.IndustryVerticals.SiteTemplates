import { useSitecore } from '@sitecore-content-sdk/nextjs';

type FieldValue = { value?: unknown };

/** Page fields from the Sitecore route. Empty when the journey fallback has no provider. */
export function useRouteFields(): Record<string, FieldValue> {
  const { page } = useSitecore();
  return (page?.layout?.sitecore?.route?.fields || {}) as Record<string, FieldValue>;
}

export function textField(field: FieldValue | undefined): string {
  const value = field?.value;
  return typeof value === 'string' ? value : '';
}

export function imageFieldSrc(field: FieldValue | undefined): string {
  const value = field?.value;
  if (value && typeof value === 'object' && 'src' in value) {
    const src = (value as { src?: string }).src;
    return src || '';
  }
  return '';
}
