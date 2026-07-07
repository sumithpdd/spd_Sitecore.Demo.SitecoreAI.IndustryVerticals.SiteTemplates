import { ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import { Product } from '@/types/products';

const DOC_ICON = (
  <svg viewBox="0 0 48 56" aria-hidden className="spec-download__icon-svg" fill="none">
    <path
      d="M8 4h20l12 12v36a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
      fill="#f5c518"
      stroke="#17243d"
      strokeWidth="1.5"
    />
    <path d="M28 4v12h12" fill="#e6b800" stroke="#17243d" strokeWidth="1.5" />
    <path d="M14 28h20M14 34h20M14 40h14" stroke="#17243d" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

type SpecItem = {
  label: string;
  href?: string;
};

const linkHref = (field?: LinkField) => field?.value?.href?.trim() || '';

const imageHref = (field?: ImageField) => field?.value?.src?.trim() || '';

interface ProductSpecDownloadsProps {
  product: Product;
  isPageEditing?: boolean;
}

export const ProductSpecDownloads = ({ product, isPageEditing }: ProductSpecDownloadsProps) => {
  const items: SpecItem[] = [
    { label: 'Product Data', href: linkHref(product.ProductData) },
    { label: 'Fitting Instructions', href: linkHref(product.FittingInstructions) },
    { label: 'Tech Drawing', href: imageHref(product.TechDrawing) },
    { label: 'Spares Drawing', href: linkHref(product.SparesDrawing) },
  ].filter((item) => item.href || isPageEditing);

  if (!items.length) {
    return null;
  }

  return (
    <ul className="spec-download">
      {items.map((item) => (
        <li key={item.label} className="spec-download__item">
          <span className="spec-download__icon">{DOC_ICON}</span>
          <h2 className="spec-download__label">{item.label}</h2>
          {item.href ? (
            <a
              className="spec-download__btn"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          ) : (
            <span className="spec-download__btn spec-download__btn--placeholder">Download</span>
          )}
        </li>
      ))}
    </ul>
  );
};
