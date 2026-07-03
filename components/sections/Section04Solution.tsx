"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";

export function Section04Solution() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // Section-scoped parallax on the photo panel — same "camera drifts slower
  // than the page" technique as the Hero, so the depth language feels like
  // one authored system instead of a hero-only trick.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const photoY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-section-solution px-5 py-24 lg:px-8"
    >
      <SectionIndex n="04" label="Solution" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(3,228,222,0.10),transparent_38%),radial-gradient(circle_at_90%_80%,rgba(131,67,246,0.10),transparent_36%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ---- Text + differentiators ---- */}
        <div>
          <Reveal>
            <h2 className="max-w-lg text-balance text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
              {t.solution.headline}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-ink-muted">
              {t.solution.body}
            </p>
          </Reveal>

          <div className="mt-10 space-y-6 border-t border-white/10 pt-8">
            {t.solution.differentiators.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="flex items-start gap-4">
                  <span className="glass-pill mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-mint backdrop-blur-md">
                    <Icon name={item.icon as IconName} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-1.5 leading-7 text-ink-muted">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <a
              href="#diagnostico"
              className="group mt-10 inline-flex items-center justify-center gap-2.5 rounded-full bg-mint px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-dark-bg transition hover:bg-white"
            >
              {t.solution.cta}
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>

        {/* ---- Photo panel — diagonal-cut editorial frame, parallax drift ---- */}
        <Reveal direction="right" delay={0.1} className="relative">
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10"
            style={{ clipPath: "polygon(9% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            <motion.div
              aria-hidden
              className="absolute inset-[-6%]"
              style={{ y: photoY }}
            >
              <div
                className="h-full w-full bg-[url('/nexoz-fondo-hero-16x9-A.jpg')] bg-cover bg-center"
                style={{ filter: "saturate(1.05) brightness(0.85)" }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(200deg,rgba(3,10,26,0.15)_0%,rgba(3,10,26,0.55)_65%,rgba(3,10,26,0.85)_100%)]" />
            <div className="absolute left-6 top-6 z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">
                Fig. 02 — Brand Field
              </span>
            </div>
          </div>
          {/* Floating accent card echoing the brand gradient, tucked over the
              panel's cut corner — a bit of dimensional layering. */}
          <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-2xl bg-gradient-to-br from-mint via-orange-accent to-purple-accent opacity-90 blur-0 sm:block lg:h-28 lg:w-28" />
        </Reveal>
      </div>
    </section>
  );
}
