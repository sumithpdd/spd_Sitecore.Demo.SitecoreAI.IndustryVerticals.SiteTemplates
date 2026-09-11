import { asImageField, asItems, fieldString, itemLabel, SitecoreItem } from '@/lib/sitecore-fields';

export type ListedArticle = {
  id: string;
  url: string;
  title: string;
  kicker: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  categories: string[];
};

export type ListedPerson = {
  id: string;
  url: string;
  name: string;
  jobTitle: string;
  office: string;
  phone: string;
  email: string;
  bio: string;
  photoSrc?: string;
};

export function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function taxonomyLabels(field: unknown): string[] {
  return asItems(field)
    .map(
      (item) =>
        itemLabel(item) || fieldString(item.fields?.Tag) || fieldString(item.fields?.Category)
    )
    .filter(Boolean);
}

export function listedArticlesFromItems(
  items: SitecoreItem[],
  fallbackUrl = '/out-law'
): ListedArticle[] {
  return items
    .map((item) => {
      const title = itemLabel(item);
      if (!title) {
        return null;
      }
      const summary = stripHtml(
        fieldString(item.fields?.ShortDescription) || fieldString(item.fields?.Content)
      );
      return {
        id: item.id || title,
        url: item.url || fallbackUrl,
        title,
        kicker: fieldString(item.fields?.Kicker),
        date: fieldString(item.fields?.PublishedDate),
        readTime: fieldString(item.fields?.ReadTime),
        summary,
        tags: taxonomyLabels(item.fields?.Tags),
        categories: (() => {
          const selected = taxonomyLabels(item.fields?.Categories);
          if (selected.length > 0) {
            return selected;
          }
          const single = fieldString(
            (item.fields?.Category as SitecoreItem | undefined)?.fields?.Category
          );
          return single ? [single] : [];
        })(),
      };
    })
    .filter((item): item is ListedArticle => Boolean(item));
}

export function listedPeopleFromItems(items: SitecoreItem[]): ListedPerson[] {
  return items
    .map((item): ListedPerson | null => {
      const name = itemLabel(item);
      if (!name) {
        return null;
      }
      const photo = asImageField(item.fields?.Photo);
      const src = photo && typeof photo.value === 'object' ? photo.value?.src : undefined;
      return {
        id: item.id || name,
        url: item.url || `/people/${name.toLowerCase().replace(/\s+/g, '-')}`,
        name,
        jobTitle: fieldString(item.fields?.JobTitle),
        office: fieldString(item.fields?.Office),
        phone: fieldString(item.fields?.Phone),
        email: fieldString(item.fields?.Email),
        bio: stripHtml(fieldString(item.fields?.Biography)),
        photoSrc: src || undefined,
      };
    })
    .filter((item): item is ListedPerson => Boolean(item));
}

export function resolverItems(fields?: { items?: unknown; Items?: unknown }): SitecoreItem[] {
  if (!fields) {
    return [];
  }
  if (Array.isArray(fields.items)) {
    return fields.items as SitecoreItem[];
  }
  return asItems(fields.Items);
}
