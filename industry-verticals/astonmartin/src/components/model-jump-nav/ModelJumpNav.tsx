import { JSX } from 'react';
import { Field, Text as ContentSdkText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import clsx from 'clsx';

interface Fields {
  Items?: Field<string>;
}

type Props = ComponentProps & { fields: Fields };

/** Jump links — Items is a pipe-separated list: Label|#anchor|Label2|#anchor2 */
export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const raw = fields?.Items?.value || '';
  const pairs = raw
    .split('|')
    .reduce<{ label: string; href: string }[]>((acc, part, idx, arr) => {
      if (idx % 2 === 0 && arr[idx + 1]) {
        acc.push({ label: part.trim(), href: arr[idx + 1].trim() });
      }
      return acc;
    }, []);

  return (
    <nav
      className={clsx(
        'component model-jump-nav sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur',
        params?.styles
      )}
      id={params?.RenderingIdentifier}
      aria-label="Model families"
    >
      <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-6 py-3 text-xs font-semibold tracking-wide uppercase md:px-10">
        {isEditing && <ContentSdkText field={fields?.Items} />}
        {!isEditing &&
          pairs.map((item) => (
            <a key={item.href} href={item.href} className="shrink-0 text-neutral-700 hover:text-[var(--am-teal)]">
              {item.label}
            </a>
          ))}
      </div>
    </nav>
  );
};
