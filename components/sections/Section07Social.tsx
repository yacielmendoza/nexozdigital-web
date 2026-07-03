"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";

export function Section07Social() {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 bg-section-social px-5 py-24 lg:px-8">
      <SectionIndex n="07" label="Social Proof" />
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
            {t.social.headline}
          </h2>
        </Reveal>

        {/* Stacked featured quotes rather than a 2-up grid — with only two
            testimonials, a side-by-side grid reads half-empty. A single
            confident column, alternating alignment, reads as curated. */}
        <div className="mt-14 space-y-8">
          {t.social.testimonials.map((item, i) => (
            <Reveal key={i} delay={i * 0.12} direction={i % 2 === 0 ? "left" : "right"}>
              <figure
                className={`glass backdrop-blur-lg relative flex flex-col gap-6 rounded-3xl p-8 sm:flex-row sm:items-center lg:p-10 ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="font-[family-name:var(--font-heading)] shrink-0 text-7xl leading-none text-mint/25 lg:text-8xl"
                >
                  &ldquo;
                </span>
                <div className="flex-1">
                  <blockquote className="text-xl leading-9 text-ink sm:text-2xl">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-mint/30 to-purple-accent/30 text-sm font-bold text-white">
                      {item.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-white">
                        {item.name}
                      </span>
                      <span className="block text-xs text-ink-muted">
                        {item.role}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center" delay={0.2}>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted/70">
            {t.social.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
