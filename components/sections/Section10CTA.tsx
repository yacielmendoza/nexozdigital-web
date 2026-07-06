"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { AmbientVideo } from "@/components/ui/AmbientVideo";

export function Section10CTA() {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 overflow-hidden bg-dark-bg px-5 py-28 lg:px-8">
      <SectionIndex n="11" label="Contact" />
      {/* Closing bookend — loud again, matching the hero's intensity, with
          the brand's own particle-terrain footage replacing the old flat
          CSS-only gradient animation. */}
      <AmbientVideo
        src="/nexoz-video-manto-terreno.mp4"
        poster="/nexoz-video-manto-terreno-poster.jpg"
        opacity={0.55}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,26,0.2)_0%,rgba(3,10,26,0.55)_55%,rgba(3,10,26,0.9)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_50%,transparent_35%,rgba(3,10,26,0.85)_100%)]"
      />
      {/* Small framed photo panel — a supporting element now, not the
          dominant full-bleed layer (the video owns that role here). */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 right-8 hidden h-28 w-44 overflow-hidden rounded-xl border border-white/15 opacity-70 lg:block"
      >
        <div className="h-full w-full bg-[url('/nexoz-fondo-hero-16x9-B.jpg')] bg-cover bg-center" />
      </div>

      <Reveal className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-6xl">
          {t.finalCta.headlineLead}{" "}
          <span className="editorial-accent text-[1.05em]">
            {t.finalCta.headlineAccent}
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
          {t.finalCta.subhead}
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="#diagnostico"
            className="btn-primary btn-gradient-ring group inline-flex items-center justify-center gap-2.5 rounded-full bg-mint px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-dark-bg shadow-[0_0_50px_-8px_rgba(3,228,222,0.7)] transition hover:bg-white"
          >
            {t.finalCta.cta}
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
        </div>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted/80">
          {t.finalCta.note}
        </p>
      </Reveal>
    </section>
  );
}
