"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionIndex } from "@/components/ui/SectionIndex";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// The 4 steps advance along the brand gradient left-to-right instead of
// repeating one accent color, so the connecting line + ghost numbers
// literally trace cyan→blue→purple as progress through the process.
const STEP_HUES = ["#03e4de", "#1fb2ed", "#317af7", "#8343f6"];

export function Section06Process() {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);

  // Animated timeline: the connecting line draws in, then steps pop sequentially.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".process-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" }
      });

      gsap.from(".process-step", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" }
      });
    },
    { scope: root }
  );

  return (
    <section
      id="proceso"
      ref={root}
      className="relative z-10 scroll-mt-24 bg-section-process px-5 py-24 lg:px-8"
    >
      <SectionIndex n="06" label="Process" />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-mint">
            {t.process.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
            {t.process.headline}
          </h2>
        </div>

        <div className="relative mt-20">
          {/* Connecting line behind the steps (desktop) — thicker, sits at
              mid-card height so the alternating stagger below reads as a
              single path the steps hang off of, not a flat template row. */}
          <div
            aria-hidden
            className="process-line absolute left-0 right-0 top-1/2 hidden h-[2px] -translate-y-1/2 lg:block"
            style={{
              background: "linear-gradient(90deg, #03e4de 0%, #317af7 55%, #8343f6 100%)",
              opacity: 0.35
            }}
          />

          <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {t.process.steps.map((step, i) => {
              const hue = STEP_HUES[i % STEP_HUES.length];
              return (
              <li
                key={step.number}
                className={`process-step relative ${
                  i % 2 === 0 ? "lg:-translate-y-6" : "lg:translate-y-6"
                }`}
              >
                <div
                  className="glass relative overflow-hidden rounded-2xl p-6 backdrop-blur-md backdrop-saturate-150 transition"
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${hue}66`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
                >
                  {/* Ghost number — same numbered-index language as the
                      Problem section, so the two sections read as one
                      authored system rather than unrelated components. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-4 font-[family-name:var(--font-heading)] text-7xl font-extrabold"
                    style={{ WebkitTextStroke: `1px ${hue}22`, color: "transparent" }}
                  >
                    {step.number}
                  </span>

                  <svg
                    aria-hidden
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="relative"
                    style={{ color: hue }}
                  >
                    <path
                      d="M8 5l8 7-8 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <h3 className="relative mt-4 text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-7 text-ink-muted">
                    {step.description}
                  </p>
                </div>
              </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
