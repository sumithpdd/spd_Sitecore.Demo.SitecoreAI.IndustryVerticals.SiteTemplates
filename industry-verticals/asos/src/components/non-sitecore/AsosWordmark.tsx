import { JSX } from 'react';

/** Vector stand-in for the wordmark so the header stays sharp at any size. */
export function AsosWordmark({ className = '' }: { className?: string }): JSX.Element {
  return (
    <svg
      className={`asos-wordmark ${className}`.trim()}
      viewBox="0 0 86 24"
      role="img"
      aria-label="ASOS"
    >
      <text x="0" y="19">
        asos
      </text>
    </svg>
  );
}
