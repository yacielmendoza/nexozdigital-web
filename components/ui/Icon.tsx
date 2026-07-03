import type { SVGProps } from "react";

/**
 * Lightweight stroke-icon set used across the site. All icons inherit color
 * from `currentColor` and share a 24×24 viewbox. Referenced by string name
 * from the bilingual content so copy and visuals stay decoupled.
 */
export type IconName =
  // proof bar
  | "star"
  | "pin"
  | "globe"
  | "bolt"
  // problem
  | "search-off"
  | "clock"
  | "language"
  // solution
  | "handshake"
  | "target"
  | "cpu"
  // services (keyed by Service.key)
  | "web"
  | "marketing"
  | "ai"
  | "brand"
  | "seo"
  | "tech";

const PATHS: Record<IconName, ReactNodeChildren> = {
  star: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z" />,
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </>
  ),
  bolt: <path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13l0-8z" />,
  "search-off": (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3M8 8l6 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  language: (
    <>
      <path d="M4 5h10M9 3v2M11.5 5c0 4-3 7-7.5 8M6 8c1.2 2.4 3.6 4.2 6.5 5" />
      <path d="M13 21l4-9 4 9M14.5 17.5h5" />
    </>
  ),
  handshake: (
    <>
      <path d="M11 17l-2 2-3.5-3.5a2 2 0 0 1 0-2.8L9 9l3 2 3-2 3.5 3.5a2 2 0 0 1 0 2.8L15 19l-2-2" />
      <path d="M9 9L6 6 3 9M15 9l3-3 3 3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  cpu: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <path d="M9 3v2.5M15 3v2.5M9 18.5V21M15 18.5V21M3 9h2.5M3 15h2.5M18.5 9H21M18.5 15H21" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="14" rx="2" />
      <path d="M3 9h18M6.5 6.7h.01M9 6.7h.01" />
    </>
  ),
  marketing: (
    <>
      <path d="M3.5 9.5l13-5v15l-13-5z" />
      <path d="M3.5 9.5H8v5H3.5zM8 14.5v4l3 1v-4" />
    </>
  ),
  ai: (
    <>
      <rect x="5" y="7" width="14" height="11" rx="3" />
      <path d="M12 7V3.5M8.5 3.5h7" />
      <circle cx="9.5" cy="12.5" r="1.2" />
      <circle cx="14.5" cy="12.5" r="1.2" />
      <path d="M2.5 12.5H5M19 12.5h2.5" />
    </>
  ),
  brand: (
    <>
      <path d="M12 3l2.2 4.8L19.5 9l-3.7 3.6.9 5.4L12 15.5 7.3 18l.9-5.4L4.5 9l5.3-1.2L12 3z" />
    </>
  ),
  seo: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.2 15.2L21 21" />
      <path d="M8 11l2 2 3.5-4" />
    </>
  ),
  tech: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2 2 6-6a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6z" />
    </>
  )
};

type ReactNodeChildren = React.ReactNode;

export function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
