"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";

export function Section09About() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="relative z-10 scroll-mt-24 bg-section-about px-5 py-24 lg:px-8">
      <SectionIndex n="09" label="About" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Photo placeholder */}
        <Reveal direction="left">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-mint/20 to-purple-accent/20 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-dark-bg-2 to-dark-bg">
              <Image
                src="/yaciel.png"
                alt="Yaciel, fundador de Nexoz Digital, agencia digital bilingüe en Big Spring TX"
                fill
                sizes="(min-width: 1024px) 384px, 90vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">
                  Big Spring, TX
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Story */}
        <Reveal direction="right" delay={0.1}>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-mint">
            {t.about.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            {t.about.headline}
          </h2>
          <div className="mt-6 space-y-4">
            {t.about.paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-8 text-ink-muted">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-mint">
            {t.about.signature}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
