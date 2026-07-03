'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Wrench, Store, PenTool } from 'lucide-react';
import clsx from 'clsx';

const AUDIENCES = [
  { label: 'Homeowners', href: '/homeowners-home', icon: Home },
  { label: 'Installers', href: '/installers-home', icon: Wrench },
  { label: 'Merchants', href: '/merchants-home', icon: Store },
  { label: 'Specifiers', href: '/specifiers-home', icon: PenTool },
] as const;

type AudienceBarProps = {
  className?: string;
  onNavigate?: () => void;
};

export const AudienceBar = ({ className, onNavigate }: AudienceBarProps) => {
  const router = useRouter();
  const pathname = router.asPath.split('?')[0] ?? '';

  return (
    <nav className={clsx('bristan-audience', className)} aria-label="Browse by audience">
      <p className="bristan-audience__mobile-title">Browsing as a</p>
      <ul className="bristan-audience__list">
        {AUDIENCES.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <li key={href} className={clsx('bristan-audience__item', isActive && 'is-active')}>
              <Link href={href} className="bristan-audience__link" onClick={onNavigate}>
                <Icon className="bristan-audience__icon" aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
