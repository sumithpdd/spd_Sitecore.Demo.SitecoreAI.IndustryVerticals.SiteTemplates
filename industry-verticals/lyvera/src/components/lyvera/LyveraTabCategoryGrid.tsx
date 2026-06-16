'use client';

import type { JSX } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Placeholder,
  TextField,
  Text as ContentSdkText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { KP_CATEGORY_TABS } from '@/lib/keith-prowse-defaults';
import { sharedComponentModifier } from '@/lib/lyveragroup-themes';
import { placeholderHasComponents, resolveChildPlaceholderKey } from '@/lib/placeholder-utils';
import { textFieldValue } from '@/lib/lyvera-field-utils';

export interface LyveraTabCategoryGridFields {
  TabOneLabel?: TextField;
  TabTwoLabel?: TextField;
}

export type LyveraTabCategoryGridProps = ComponentProps & {
  fields?: LyveraTabCategoryGridFields;
};

type TabKey = 'sport' | 'culture';

function FallbackGrid({ activeTab }: { activeTab: TabKey }): JSX.Element {
  const items = activeTab === 'sport' ? KP_CATEGORY_TABS.sportItems : KP_CATEGORY_TABS.cultureItems;
  return (
    <>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="lyvera-category-grid-item lyvera-category-grid-item--fallback"
          data-lyvera-category-item
          data-category-tab={activeTab}
        >
          <img src={item.image} alt="" className="lyvera-category-grid-item__image" />
          <span className="lyvera-category-grid-item__overlay" aria-hidden />
          <span className="lyvera-category-grid-item__label">{item.label}</span>
        </a>
      ))}
    </>
  );
}

export const Default = (props: LyveraTabCategoryGridProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params ?? {};
  const fields = props.fields ?? {};
  const itemsPh = resolveChildPlaceholderKey(
    props.rendering,
    `lyvera-category-grid-items-${DynamicPlaceholderId ?? '1'}`
  );
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const hasCmsItems = placeholderHasComponents(props.rendering, itemsPh);
  const useFallback = !hasCmsItems && !isEditing;

  const tabOne = textFieldValue(fields.TabOneLabel) || KP_CATEGORY_TABS.tabOne;
  const tabTwo = textFieldValue(fields.TabTwoLabel) || KP_CATEGORY_TABS.tabTwo;

  const [activeTab, setActiveTab] = useState<TabKey>('sport');
  const gridRef = useRef<HTMLDivElement>(null);

  const filterItems = useCallback(() => {
    const root = gridRef.current;
    if (!root || useFallback) return;
    root.querySelectorAll<HTMLElement>('[data-lyvera-category-item]').forEach((el) => {
      const tab = (el.dataset.categoryTab || 'sport').toLowerCase();
      const show = tab === activeTab || tab.includes(activeTab) || !tab;
      el.hidden = !show;
    });
  }, [activeTab, useFallback]);

  useEffect(() => {
    filterItems();
    const root = gridRef.current;
    if (!root || typeof MutationObserver === 'undefined') return;
    const mo = new MutationObserver(() => filterItems());
    mo.observe(root, { childList: true, subtree: true, attributes: true });
    return () => mo.disconnect();
  }, [filterItems]);

  return (
    <section
      className={[sharedComponentModifier(page, 'component lyvera-tab-category-grid'), styles]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      <div className="lyvera-tab-category-grid__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'sport'}
          className={`lyvera-tab-category-grid__tab ${activeTab === 'sport' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('sport')}
        >
          {textFieldValue(fields.TabOneLabel) ? (
            <ContentSdkText field={fields.TabOneLabel} tag="span" />
          ) : (
            tabOne
          )}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'culture'}
          className={`lyvera-tab-category-grid__tab ${activeTab === 'culture' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('culture')}
        >
          {textFieldValue(fields.TabTwoLabel) ? (
            <ContentSdkText field={fields.TabTwoLabel} tag="span" />
          ) : (
            tabTwo
          )}
        </button>
      </div>
      <div ref={gridRef} className="lyvera-tab-category-grid__grid">
        {(hasCmsItems || isEditing) && <Placeholder name={itemsPh} rendering={props.rendering} />}
        {useFallback && <FallbackGrid activeTab={activeTab} />}
      </div>
    </section>
  );
};
