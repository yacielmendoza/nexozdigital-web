"use client";

import type { CSSProperties } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { Service } from "@/lib/content";

// Bespoke gradient per card — no two adjacent cards share a hue-origin
// combination, and card 4 breaks the radial/linear pattern entirely with a
// conic sweep, so the 5-card grid stops reading as one container repeated
// five times.
const CARD_GRADIENTS = [
  "radial-gradient(280px circle at 15% 15%, rgba(3,228,222,0.22), transparent 65%)",
  "linear-gradient(60deg, rgba(3,228,222,0.10) 0%, rgba(131,67,246,0.20) 100%)",
  "radial-gradient(300px circle at 85% 20%, rgba(49,122,247,0.24), transparent 60%)",
  "conic-gradient(from 220deg at 50% 100%, rgba(131,67,246,0.20), rgba(49,122,247,0.14), transparent 55%)",
  "radial-gradient(320px circle at 50% 100%, rgba(131,67,246,0.22), transparent 65%)"
];

export function Section05Services() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="relative z-10 scroll-mt-24 bg-section-services px-5 py-24 lg:px-8">
      <SectionIndex n="05" label="Services" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-mint">
            {t.services.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
            {t.services.headline}
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            {t.services.intro}
          </p>
        </Reveal>

        {/* Editorial masonry — one featured service spans the full width
            instead of a uniform 6-up grid, which is the single strongest
            "generic SaaS template" tell on the page. */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, i) => (
            <Reveal
              key={service.key}
              delay={(i % 3) * 0.08}
              className={i === 0 ? "sm:col-span-2 lg:col-span-3" : undefined}
            >
              {i === 0 ? (
                <FeaturedServiceCard service={service} />
              ) : (
                <ServiceCard service={service} gradientIndex={i - 1} />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedServiceCard({ service }: { service: Service }) {
  return (
    <article className="glass-strong group relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl backdrop-saturate-150 lg:p-10">
      {/* The single loudest card on the page after the hero — full 3-hue
          mesh instead of the old single mint blur circle. */}
      <div
        aria-hidden
        className="gradient-mesh-loud pointer-events-none absolute inset-0 opacity-70 transition group-hover:opacity-100"
      />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center">
        <div className="flex items-start gap-5 lg:w-[38%] lg:shrink-0">
          <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-mint/30 bg-gradient-to-br from-mint/20 to-purple-accent/15 text-mint">
            <Icon name={service.key as IconName} className="h-8 w-8" />
          </span>
          <div>
            <h3 className="text-2xl font-extrabold text-white">
              {service.name}
            </h3>
          </div>
        </div>

        <div className="flex-1">
          <p className="max-w-xl text-lg leading-8 text-ink-muted">
            {service.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {service.bullets.map((bullet) => (
              <li
                key={bullet}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-ink-muted"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#diagnostico"
          className="group/cta inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-mint px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-dark-bg transition hover:bg-white lg:self-center"
        >
          {service.cta}
          <span aria-hidden className="transition group-hover/cta:translate-x-1">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

function ServiceCard({
  service,
  gradientIndex
}: {
  service: Service;
  gradientIndex: number;
}) {
  return (
    <article
      style={{ "--card-gradient": CARD_GRADIENTS[gradientIndex % CARD_GRADIENTS.length] } as CSSProperties}
      className="card-glow-bespoke glass group flex h-full flex-col rounded-2xl p-7 backdrop-blur-md backdrop-saturate-150 transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      {/* 3D icon placeholder — swap for a real WebGL/GLB asset in a later phase */}
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-mint/25 bg-gradient-to-br from-mint/15 to-purple-accent/10 text-mint transition group-hover:shadow-[0_0_28px_-4px_rgba(3,228,222,0.5)]">
        <Icon name={service.key as IconName} className="h-7 w-7" />
      </span>

      <h3 className="mt-5 text-xl font-bold text-white">{service.name}</h3>
      <p className="mt-2.5 leading-7 text-ink-muted">{service.description}</p>

      <ul className="mt-5 space-y-2.5">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5 text-sm text-ink-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
            {bullet}
          </li>
        ))}
      </ul>

      <a
        href="#diagnostico"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.12em] text-mint transition group-hover:gap-2.5"
      >
        {service.cta}
        <span aria-hidden>→</span>
      </a>
    </article>
  );
}
