'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const UTILITY_LINKS = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Customer Care', href: '/customer-care' },
  { label: 'Contact Us', href: '/contact-us' },
] as const;

type HeritageUtilityBarProps = {
  className?: string;
  onNavigate?: () => void;
};

export const HeritageUtilityBar = ({ className, onNavigate }: HeritageUtilityBarProps) => {
  const router = useRouter();
  const pathname = router.asPath.split('?')[0] ?? '';

  return (
    <nav className={clsx('heritage-utility', className)} aria-label="Utility navigation">
      <ul className="heritage-utility__list">
        {UTILITY_LINKS.map(({ label, href }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <li key={href} className={clsx('heritage-utility__item', isActive && 'is-active')}>
              <Link href={href} className="heritage-utility__link" onClick={onNavigate}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
