import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

export const emptyLink: LinkField = { value: {} };
export const emptyText: Field<string> = { value: '' };
export const emptyImage: ImageField = { value: {} };

export const asLink = (field?: LinkField): LinkField => field ?? emptyLink;
export const asText = (field?: Field<string>): Field<string> => field ?? emptyText;
export const asImage = (field?: ImageField): ImageField => field ?? emptyImage;
