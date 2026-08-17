import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

export const emptyLink: LinkField = { value: {} };
export const emptyText: Field<string> = { value: '' };
export const emptyImage: ImageField = { value: {} };

export const asLink = (field?: LinkField): LinkField => field ?? emptyLink;
export const asText = (field?: Field<string>): Field<string> => field ?? emptyText;
export const asImage = (field?: ImageField): ImageField => field ?? emptyImage;

export const hasText = (field?: Field<string>) => Boolean(field?.value);
export const hasLink = (field?: LinkField) => Boolean(field?.value?.href || field?.value?.text);

/** Use CMS link when authored; otherwise a demo fallback for live pages. */
export function linkOrFallback(
  field: LinkField | undefined,
  text: string,
  href: string,
  isEditing = false
): LinkField {
  if (isEditing || field?.value?.href || field?.value?.text) {
    return asLink(field);
  }
  return { value: { href, text, linktype: 'internal' } };
}
