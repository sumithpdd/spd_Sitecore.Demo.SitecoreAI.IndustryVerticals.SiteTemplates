import { identity } from '@sitecore-cloudsdk/events/browser';
import { persistIdentifiedUser } from '@/lib/cdp/cdp-identified-user';
import { recordIdentityEvent } from '@/lib/cdp/cdp-session-tracker';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}

export function displayNameFromEmail(email: string): string {
  const value = email.trim();
  const [localPart] = value.split('@');
  const [firstPart, ...rest] = localPart.split(/[._-]+/).filter(Boolean);
  const first = capitalize(firstPart) || 'Subscriber';
  const last = rest.map(capitalize).join(' ');
  return last ? `${first} ${last}` : first;
}

export async function identifyVisitorByEmail(email: string): Promise<void> {
  const value = email.trim();
  if (!EMAIL_REGEX.test(value)) {
    throw new Error('Please enter a valid email address.');
  }

  const [localPart] = value.split('@');
  const [firstPart, ...rest] = localPart.split(/[._-]+/).filter(Boolean);
  const firstName = capitalize(firstPart) || 'Subscriber';
  const lastName = rest.map(capitalize).join(' ');

  await identity({
    channel: 'WEB',
    currency: 'GBP',
    identifiers: [{ id: value, provider: 'email' }],
    email: value,
    firstName,
    lastName,
  });

  persistIdentifiedUser({ email: value, firstName, lastName });
  recordIdentityEvent(value);
}
