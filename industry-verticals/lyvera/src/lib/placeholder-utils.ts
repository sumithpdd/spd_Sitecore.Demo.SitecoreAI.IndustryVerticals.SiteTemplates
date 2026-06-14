import type { ComponentProps } from '@/lib/component-props';

type RenderingWithPlaceholders = ComponentProps['rendering'];

export function getPlaceholderSlots(
  rendering: RenderingWithPlaceholders | undefined,
  placeholderName: string
): unknown[] {
  const placeholders = rendering?.placeholders;
  if (!placeholders) {
    return [];
  }

  const candidates = [
    placeholderName,
    placeholderName.startsWith('/') ? placeholderName.slice(1) : `/${placeholderName}`,
    placeholderName.replace(/^\//, ''),
  ];

  for (const key of [...new Set(candidates)]) {
    const slots = placeholders[key];
    if (Array.isArray(slots) && slots.length > 0) {
      return slots;
    }
  }

  return [];
}

export function placeholderHasComponents(
  rendering: RenderingWithPlaceholders | undefined,
  placeholderName: string
): boolean {
  return getPlaceholderSlots(rendering, placeholderName).length > 0;
}

export function resolveChildPlaceholderKey(
  rendering: RenderingWithPlaceholders | undefined,
  preferredName: string
): string {
  if (placeholderHasComponents(rendering, preferredName)) {
    return preferredName;
  }

  const placeholders = rendering?.placeholders;
  if (!placeholders) {
    return preferredName;
  }

  const prefix = preferredName.replace(/-\d+$/, '') || preferredName;
  const matchingKeys = Object.keys(placeholders).filter((key) => {
    if (!key.includes(prefix)) {
      return false;
    }
    const slots = placeholders[key];
    return Array.isArray(slots) && slots.length > 0;
  });

  if (matchingKeys.length === 0) {
    return preferredName;
  }

  const exact = matchingKeys.find(
    (key) => key === preferredName || key.endsWith(`/${preferredName}`)
  );
  if (exact) {
    return exact.includes('/') ? (exact.split('/').pop() ?? exact) : exact;
  }

  const first = matchingKeys[0];
  return first.includes('/') ? (first.split('/').pop() ?? first) : first;
}
