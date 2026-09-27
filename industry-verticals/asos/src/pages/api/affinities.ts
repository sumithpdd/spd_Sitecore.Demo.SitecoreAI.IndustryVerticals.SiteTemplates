import type { NextApiRequest, NextApiResponse } from 'next';
import {
  AFFINITY_FIELD,
  formatAffinityField,
  validateAffinities,
  type Affinity,
} from '@/lib/affinities';

const PAGES_API = 'https://xmapps-api.sitecorecloud.io';

type Body = {
  pageId?: string;
  language?: string;
  versionNumber?: number;
  affinities?: Affinity[];
};

/**
 * Assigns page affinities through the Sitecore Pages API.
 * PATCH /api/v1/pages/{pageId} writes the Affinities field (name|value lines, max 10).
 * Performance → Settings → Affinities is the UI for the same name/value pairs.
 * https://doc.sitecore.com/sai/en/users/sitecoreai/audience-and-insights/affinities/set-up-affinities-for-a-site.html
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'POST { pageId, affinities: [{ name, value }] }' });
    return;
  }

  const body = (req.body || {}) as Body;
  const pageId = String(body.pageId || '').trim();
  const language = String(body.language || 'en');
  const checked = validateAffinities(body.affinities);
  if (!pageId) {
    res.status(400).json({ error: 'pageId is required' });
    return;
  }
  if ('error' in checked) {
    res.status(400).json({ error: checked.error });
    return;
  }

  const fieldValue = formatAffinityField(checked.affinities);
  const payload = {
    language,
    versionNumber: body.versionNumber,
    fields: [{ name: AFFINITY_FIELD, value: fieldValue }],
  };
  const token = process.env.SITECORE_PAGES_API_TOKEN;
  const environmentId = process.env.SITECORE_ENVIRONMENT_ID;

  if (!token) {
    res.status(503).json({
      error:
        'SITECORE_PAGES_API_TOKEN is not set. Affinities are serialized on the Affinities field and can be written with this request once a token is available.',
      pageId,
      affinities: checked.affinities,
      request: {
        method: 'PATCH',
        url: `${PAGES_API}/api/v1/pages/${pageId}`,
        body: payload,
      },
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
      body: JSON.stringify(payload),
    });
    const text = await upstream.text();
    res.status(upstream.ok ? 200 : upstream.status).json({
      pageId,
      affinities: checked.affinities,
      field: AFFINITY_FIELD,
      upstream: text.slice(0, 800),
    });
  } catch {
    res.status(502).json({ error: 'Pages API request failed', pageId });
  }
}
