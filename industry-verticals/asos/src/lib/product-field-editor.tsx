'use client';

import { JSX, useMemo, useState } from 'react';
import { parseAffinityField, type Affinity } from '@/lib/affinities';
import {
  AFFINITY_GROUPS,
  COLOUR_SWATCHES,
  SIZE_NOT_WRITTEN,
  UK_SIZE_OPTIONS,
  affinityKey,
  isListedAffinity,
  parseSizeField,
} from '@/lib/product-fields';

type Props = {
  pageId: string;
  affinities: string;
  colour: string;
  sizes: string;
  fallbackSizes: string[];
  sizeFieldPresent: boolean;
};

function sameColour(left: string, right: string): boolean {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

export default function ProductFieldEditor({
  pageId,
  affinities,
  colour,
  sizes,
  fallbackSizes,
  sizeFieldPresent,
}: Props): JSX.Element {
  const initialAffinities = useMemo(() => parseAffinityField(affinities), [affinities]);
  const [selected, setSelected] = useState<Affinity[]>(initialAffinities);
  const [pickedSizes, setPickedSizes] = useState<string[]>(() => {
    const stored = parseSizeField(sizes);
    if (stored.length) return stored;
    return parseSizeField(fallbackSizes.join('\n'));
  });
  const [pickedColour, setPickedColour] = useState(colour);
  const [query, setQuery] = useState('');
  const [extraName, setExtraName] = useState('');
  const [extraValue, setExtraValue] = useState('');
  const [extraError, setExtraError] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const extras = selected.filter((row) => !isListedAffinity(row));
  const storedColour = colour.trim();
  const colourInList = COLOUR_SWATCHES.some((swatch) => sameColour(swatch.label, storedColour));
  const swatches = COLOUR_SWATCHES.filter((swatch) =>
    swatch.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const toggleAffinity = (row: Affinity) => {
    const key = affinityKey(row);
    setSelected((current) => {
      if (current.some((item) => affinityKey(item) === key)) {
        return current.filter((item) => affinityKey(item) !== key);
      }
      return [...current, row];
    });
  };

  const toggleSize = (size: string) => {
    setPickedSizes((current) =>
      current.includes(size) ? current.filter((item) => item !== size) : [...current, size]
    );
  };

  const addPair = () => {
    const name = extraName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, '_')
      .replace(/^_+|_+$/g, '');
    const value = extraValue
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, '_')
      .replace(/^_+|_+$/g, '');
    if (!name || !value) {
      setExtraError('Use a key and a value, for example product_type|denim.');
      return;
    }
    const row = { name, value };
    if (selected.some((item) => affinityKey(item) === affinityKey(row))) {
      setExtraError('That pair is already selected.');
      return;
    }
    setSelected((current) => [...current, row]);
    setExtraName('');
    setExtraValue('');
    setExtraError('');
  };

  const save = async () => {
    setSaving(true);
    setNote('');
    try {
      const response = await fetch('/api/product-fields', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId,
          affinities: selected,
          colour: pickedColour,
          sizes: pickedSizes,
          writeSize: sizeFieldPresent,
        }),
      });
      const body = (await response.json()) as { note?: string; error?: string };
      if (!response.ok) {
        setNote(body.error || 'Save failed.');
        return;
      }
      setNote(body.note || (sizeFieldPresent ? 'Saved.' : SIZE_NOT_WRITTEN));
    } catch {
      setNote('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="asos-fields" aria-label="Product fields">
      <h2>Product fields</h2>

      <fieldset>
        <legend>Affinities</legend>
        {AFFINITY_GROUPS.map((group) => (
          <div key={group.name} className="asos-fields__group">
            <p>{group.label}</p>
            <div>
              {group.values.map((value) => {
                const row = { name: group.name, value };
                const on = selected.some((item) => affinityKey(item) === affinityKey(row));
                return (
                  <label key={value} className={on ? 'is-on' : undefined}>
                    <input type="checkbox" checked={on} onChange={() => toggleAffinity(row)} />
                    {value}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
        {extras.length > 0 ? (
          <div className="asos-fields__group">
            <p>Already on this item</p>
            <div>
              {extras.map((row) => (
                <label key={affinityKey(row)} className="is-on">
                  <input type="checkbox" checked onChange={() => toggleAffinity(row)} />
                  {affinityKey(row)}
                </label>
              ))}
            </div>
          </div>
        ) : null}
        <div className="asos-fields__add">
          <input
            aria-label="Affinity key"
            placeholder="key"
            value={extraName}
            onChange={(event) => setExtraName(event.target.value)}
          />
          <span>|</span>
          <input
            aria-label="Affinity value"
            placeholder="value"
            value={extraValue}
            onChange={(event) => setExtraValue(event.target.value)}
          />
          <button type="button" onClick={addPair}>
            Add pair
          </button>
        </div>
        {extraError ? <p className="asos-fields__note">{extraError}</p> : null}
      </fieldset>

      <fieldset>
        <legend>Size</legend>
        <div className="asos-fields__sizes">
          {UK_SIZE_OPTIONS.map((size) => (
            <label key={size} className={pickedSizes.includes(size) ? 'is-on' : undefined}>
              <input
                type="checkbox"
                checked={pickedSizes.includes(size)}
                onChange={() => toggleSize(size)}
              />
              UK {size}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Colour</legend>
        <input
          className="asos-fields__search"
          type="search"
          placeholder="Search colours"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {!colourInList && storedColour ? (
          <button
            type="button"
            className={`asos-fields__swatch ${sameColour(pickedColour, storedColour) ? 'is-on' : ''}`}
            onClick={() => setPickedColour(storedColour)}
          >
            <span style={{ backgroundColor: '#d0d0d0' }} />
            {storedColour}
          </button>
        ) : null}
        <div className="asos-fields__colours">
          {swatches.map((swatch) => (
            <button
              key={swatch.label}
              type="button"
              className={`asos-fields__swatch ${sameColour(pickedColour, swatch.label) ? 'is-on' : ''}`}
              onClick={() => setPickedColour(swatch.label)}
            >
              <span style={{ backgroundColor: swatch.hex }} />
              {swatch.label}
            </button>
          ))}
        </div>
      </fieldset>

      <button type="button" className="asos-fields__save" onClick={save} disabled={saving}>
        {saving ? 'Saving' : 'Save fields'}
      </button>
      {note ? <p className="asos-fields__note">{note}</p> : null}
    </section>
  );
}
