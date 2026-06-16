/** Strip Sitecore style item GUIDs from SXA `params.styles` (pipe-separated). */
export function normalizeSxaStyles(styles?: string): string {
  if (!styles) return '';

  return styles
    .split('|')
    .map((token) => token.trim())
    .filter((token) => token.length > 0 && !token.startsWith('{'))
    .join(' ');
}
