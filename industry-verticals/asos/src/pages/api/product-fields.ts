import type { NextApiRequest, NextApiResponse } from 'next';
import {
  AFFINITY_FIELD,
  formatAffinityField,
  validateAffinities,
  type Affinity,
} from '@/lib/affinities';
import { SIZE_NOT_WRITTEN, formatSizeField } from '@/lib/product-fields';

const PAGES_API = 'https://xmapps-api.sitecorecloud.io';

type Body = {
  pageId?: string;
  language?: string;
  versionNumber?: number;
  affinities?: Affinity[];
  colour?: string;
  sizes?: string[];
  writeSize?: boolean;
};

type FieldWrite = { name: string; value: string };

/**
 * Writes Affinities (name|value lines), Colour, and Size on a ProductPage.
 * Size is included only when that field is already on the template.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'POST { pageId, affinities, colour, sizes, writeSize }' });
    return;
  }

  const body = (req.body || {}) as Body;
  const pageId = String(body.pageId || '').trim();
  const colour = String(body.colour || '').trim();
  const checked = validateAffinities(body.affinities);
  if (!pageId) {
    res.status(400).json({ error: 'pageId is required' });
    return;
  }
  if ('error' in checked) {
    res.status(400).json({ error: checked.error });
    return;
  }
  if (!colour) {
    res.status(400).json({ error: 'colour is required' });
    return;
  }

  const writeSize = Boolean(body.writeSize);
  const fields: FieldWrite[] = [
    { name: AFFINITY_FIELD, value: formatAffinityField(checked.affinities) },
    { name: 'Colour', value: colour },
  ];
  if (writeSize) {
    fields.push({ name: 'Size', value: formatSizeField(body.sizes || []) });
  }

  const note = writeSize ? '' : SIZE_NOT_WRITTEN;
  const token = process.env.SITECORE_PAGES_API_TOKEN;
  const environmentId = process.env.SITECORE_ENVIRONMENT_ID;
  if (!token) {
    res.status(200).json({
      pageId,
      sizeWritten: writeSize,
      note:
        note ||
        'Saved in this session. The Pages API token is not set, so Sitecore was not updated.',
      fields,
    });
    return;
  }

  const url = new URL(`${PAGES_API}/api/v1/pages/${encodeURIComponent(pageId)}`);
  if (environmentId) url.searchParams.set('environmentId', environmentId);

  try {
    const upstream = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: String(body.language || 'en'),
        versionNumber: body.versionNumber,
        fields,
      }),
    });
    const text = await upstream.text();
    if (!upstream.ok) {
      res
        .status(upstream.status)
        .json({ error: 'Pages API did not accept the fields', note, upstream: text.slice(0, 800) });
      return;
    }
    res.status(200).json({
      pageId,
      sizeWritten: writeSize,
      note: note || 'Saved.',
    });
  } catch {
    res.status(502).json({ error: 'Pages API request failed', pageId });
  }
}
