import { identity } from '@sitecore-content-sdk/events';
import { persistIdentifiedUser } from 'lib/cdp/cdp-identified-user';
import { recordIdentityEvent } from 'lib/cdp/cdp-session-tracker';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Demo customer for Jack storyboard identify. */
export const DEMO_CUSTOMER_EMAIL = 'jack.customer@brother.demo';

function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}

export function displayNameFromEmail(email: string): string {
  const value = email.trim();
  const [localPart] = value.split('@');
  const [firstPart, ...rest] = localPart.split(/[._-]+/).filter(Boolean);
  const first = capitalize(firstPart) || 'Customer';
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
  const firstName = capitalize(firstPart) || 'Customer';
  const lastName = rest.map(capitalize).join(' ') || 'Customer';

  await identity({
    channel: 'WEB',
    currency: 'GBP',
    identifiers: [{ id: value, provider: 'email' }],
    email: value,
    firstName,
    lastName,
    extensionData: {
      brand: 'Brother',
      industry: 'Printing and Labelling',
      persona: 'Customer',
    },
  });

  persistIdentifiedUser({ email: value, firstName, lastName });
  recordIdentityEvent(value);
}
