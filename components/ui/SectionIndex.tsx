/**
 * Quiet wayfinding label ("03 — Problem") carried through every section so
 * the page reads as one authored, indexed system rather than stacked
 * template blocks. Desktop only — adds noise at small viewports for no gain.
 */
export function SectionIndex({ n, label }: { n: string; label: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-5 top-6 z-20 hidden items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.28em] text-ink-muted/40 lg:flex lg:left-8"
    >
      <span className="h-px w-5 bg-ink-muted/30" />
      {n} — {label}
    </span>
  );
}
