import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

const FOOTER_LINKS = [
  { label: 'Clearing', href: '/clearing' },
  { label: 'How to apply', href: '/clearing/how-to-apply' },
  { label: 'Courses', href: '/courses/computer-science-and-ai' },
  { label: 'Study and life', href: '/study-life' },
  { label: 'Accommodation', href: '/accommodation' },
  { label: 'Search', href: '/search' },
];

/**
 * University of Reading site footer with Whiteknights address and links.
 */
export default function SiteFooter(_props: Props): JSX.Element {
  return (
    <footer className="component site-footer bg-[var(--reading-charcoal)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-8 md:py-16">
        <div>
          <h2 className="text-lg font-bold">University</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            Whiteknights
            <br />
            PO Box 217
            <br />
            Reading
            <br />
            RG6 6AH
            <br />
            United Kingdom
          </p>
          <p className="mt-4 text-sm">
            <a href="tel:+441184020900" className="font-bold hover:underline">
              +44 (0) 118 402 0900
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase text-white/70">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase text-white/70">
            Clearing hotline
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            Speak to our advisors about courses, accommodation, and applying through Clearing.
          </p>
          <a href="/clearing" className="reading-btn reading-btn-primary mt-6">
            Apply through Clearing
          </a>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/70 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© University. Demo site for SitecoreAI.</p>
          <p>Whiteknights campus · Reading · Berkshire</p>
        </div>
      </div>
    </footer>
  );
}
