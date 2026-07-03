"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { AmbientVideo } from "@/components/ui/AmbientVideo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Each point gets its own hue instead of the old all-orange treatment —
// a small, cheap way to plant "every item has its own identity" before
// Services does it more explicitly with full gradient cards.
const HUES = [
  { stroke: "rgba(3,228,222,0.4)", border: "border-mint/30", bg: "bg-mint/10", text: "text-mint" },
  { stroke: "rgba(49,122,247,0.4)", border: "border-orange-accent/30", bg: "bg-orange-accent/10", text: "text-orange-accent" },
  { stroke: "rgba(131,67,246,0.4)", border: "border-purple-accent/30", bg: "bg-purple-accent/10", text: "text-purple-accent" }
];

export function Section03Problem() {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);

  // GSAP ScrollTrigger: heading fades up, cards slide in from alternating sides.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".problem-head", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" }
      });

      gsap.utils.toArray<HTMLElement>(".problem-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" }
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="tier-quiet relative z-10 overflow-hidden px-5 py-24 lg:px-8"
    >
      <SectionIndex n="03" label="Problem" />
      {/* This is the quietest, flattest section on the page by design — its
          only color event is a barely-there ambient texture (the brand's own
          particle-wave footage at 12% opacity), never a page-wide glow. */}
      <AmbientVideo
        src="/nexoz-video-manto-ribbons.mp4"
        poster="/nexoz-video-manto-ribbons-poster.jpg"
        opacity={0.12}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="problem-head mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
            {t.problem.headline}
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            {t.problem.intro}
          </p>
        </div>

        {/* Editorial numbered list — deliberately NOT icon-in-square cards
            (that pattern belongs to Solution/Services below), so three
            back-to-back sections don't read as the same repeated component. */}
        <div className="relative mt-14 divide-y divide-white/10 border-y border-white/10">
          {t.problem.points.map((point, i) => {
            const hue = HUES[i % HUES.length];
            return (
            <article
              key={point.title}
              className="problem-card grid grid-cols-[auto_1fr] items-start gap-5 py-7 sm:grid-cols-[auto_auto_1fr] sm:gap-8"
            >
              <span
                aria-hidden
                className="font-[family-name:var(--font-heading)] text-3xl font-extrabold leading-none text-transparent sm:text-4xl"
                style={{ WebkitTextStroke: `1.5px ${hue.stroke}` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border ${hue.border} ${hue.bg} ${hue.text} sm:flex`}>
                <Icon name={point.icon as IconName} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">{point.title}</h3>
                <p className="mt-2.5 max-w-2xl leading-7 text-ink-muted">
                  {point.body}
                </p>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
