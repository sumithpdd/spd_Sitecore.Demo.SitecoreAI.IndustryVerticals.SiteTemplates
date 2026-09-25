export function fieldString(field: unknown): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') {
    const rec = field as { value?: unknown; jsonValue?: { value?: unknown } };
    const value = rec.value ?? rec.jsonValue?.value;
    return value == null ? '' : String(value);
  }
  return '';
}
