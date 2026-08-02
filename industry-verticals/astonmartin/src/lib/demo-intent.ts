/** Demo personalisation keys for Crafted For You / ChatGPT GT comparison traffic. */
export function isCraftedForYouIntent(
  search: string | URLSearchParams | null | undefined
): boolean {
  const params =
    typeof search === 'string'
      ? new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
      : search || new URLSearchParams();

  const source = (params.get('utm_source') || '').toLowerCase();
  const campaign = (params.get('utm_campaign') || '').toLowerCase();
  const intent = (params.get('intent') || '').toLowerCase();

  return (
    source === 'chatgpt' ||
    campaign === 'crafted-for-you' ||
    campaign === 'db12-vs-bentley' ||
    intent === 'db12' ||
    intent === 'crafted-for-you'
  );
}
