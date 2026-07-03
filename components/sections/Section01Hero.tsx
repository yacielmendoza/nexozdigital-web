"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants
} from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionIndex } from "@/components/ui/SectionIndex";

// Three.js/WebGL centerpiece — dynamically imported and client-only so the
// (heavy) three + drei bundle is code-split out of the initial page payload
// and never runs during SSR. Keeps the hero's LCP/TBT low.
const HeroArrows3D = dynamic(
  () =>
    import("@/components/three/HeroArrows3D").then((m) => m.HeroArrows3D),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" aria-hidden="true" />
  }
);

/* ==========================================================================
   Cinematic word-reveal — each word clips up into place like a film title
   card, instead of the whole line fading up as one block. Reads as
   "composed typography," not "template fade-in #4." Honors
   prefers-reduced-motion by skipping the clip animation entirely.
   ========================================================================== */
const wordReveal: Variants = {
  hidden: { y: "115%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 1.05, delay: 0.5 + i * 0.07, ease: [0.16, 1, 0.3, 1] }
  })
};

function SplitWords({
  text,
  className,
  startDelayIndex = 0,
  reduceMotion
}: {
  text: string;
  className?: string;
  startDelayIndex?: number;
  reduceMotion: boolean;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.12em] mr-[0.28em]">
          <motion.span
            custom={startDelayIndex + i}
            variants={wordReveal}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            className={className ? `inline-block ${className}` : "inline-block"}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/**
 * Splits the headline into two composed baselines without relying on a
 * fragile "split on every period" hack (which silently breaks if a future
 * edit removes the sentence break or adds an abbreviation). Strategy:
 * 1. Prefer a real sentence boundary (". ") roughly in the first half.
 * 2. Fall back to a word-count midpoint split so any headline — with or
 *    without internal punctuation — still composes into two lines.
 */
function splitHeadline(text: string): [string, string] {
  const sentenceBreak = text.indexOf(". ");
  if (sentenceBreak > -1) {
    const first = text.slice(0, sentenceBreak + 1).trim();
    const second = text.slice(sentenceBreak + 1).trim();
    if (first && second) return [first, second];
  }
  const words = text.split(" ");
  if (words.length < 2) return [text, ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export function Section01Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  /* Scroll-driven "camera move": as the hero scrolls out, the photo plate
     drifts upward slower than the page (parallax depth) and the kinetic
     arrows finish their crossing. Ranges collapse to a no-op when the user
     prefers reduced motion. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const photoY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "22%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.08, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], reduceMotion ? [1, 1] : [1, 0]);
  const arrowsProgress = useTransform(scrollYProgress, [0, 0.6], reduceMotion ? [1, 1] : [0, 1]);

  /* Subtle mouse-driven parallax + arrow-nudge on desktop — the backdrop
     reacts like a handheld camera, not a static poster. No-op under
     reduced-motion (springs simply never receive a non-zero target). */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 40, damping: 20 });
  const springY = useSpring(my, { stiffness: 40, damping: 20 });
  const driftX = useTransform(springX, [-0.5, 0.5], ["-1.4%", "1.4%"]);
  const driftY = useTransform(springY, [-0.5, 0.5], ["-1%", "1%"]);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  const [headlineFirst, headlineSecond] = splitHeadline(t.hero.headline);

  // min-h (not a fixed h-) is deliberate: on wide-but-short windows (real
  // desktop browser chrome — bookmarks bar, promo banners — eats into the
  // visible viewport), a two-line headline can need more height than 100svh
  // leaves. With a FIXED height + bottom-anchored content (items-end below),
  // that overflow pushes upward past the section's own top edge and bleeds
  // into the fixed, pre-scroll-transparent navbar. min-height lets the
  // section itself grow instead, so content never has to escape its own box.
  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[100svh] w-full items-stretch overflow-hidden bg-section-hero"
    >
      <SectionIndex n="01" label="Home" />
      {/* ============== STAGE: full-bleed cinematic photo plate ============== */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: photoY, scale: photoScale, x: driftX }}
      >
        {/* LCP image served through next/image so Next.js emits a
            <link rel="preload"> for it (priority) and serves optimized,
            correctly-sized AVIF/WebP variants. Rendered as the hero's
            background plate; decorative, so alt="" + aria-hidden. */}
        <Image
          src="/nexoz-fondo-hero-16x9-C-diagonal.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "saturate(1.05) brightness(0.92)" }}
        />
        {/* Cinematic letterbox grade: deepen the navy at top/bottom, keep the
            particle wave legible through the middle band where it reads best. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,26,0.86)_0%,rgba(3,10,26,0.32)_28%,rgba(3,10,26,0.18)_55%,rgba(3,10,26,0.7)_82%,rgba(3,10,26,0.96)_100%)]" />
        {/* Left-side darkening so the asymmetric headline (anchored left)
            always sits on a readable field, while the right 40% stays
            brighter and shows off the photography. */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(3,10,26,0.78)_0%,rgba(3,10,26,0.42)_38%,transparent_62%)]" />
      </motion.div>

      {/* Grain/vignette to keep it filmic rather than flat-digital */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_90%_at_50%_50%,transparent_55%,rgba(3,10,26,0.55)_100%)]"
      />

      {/* ============== Real 3D centerpiece: two glass chevrons + particle
          field, replacing the flat SVG. Split-and-converge is still driven
          by scroll (arrowsProgress) so the "camera move" logic carries over
          one-for-one, but the shape now has actual depth/lighting. ============== */}
      {/* Hidden below lg: on a single-column mobile/tablet layout there is no
          dedicated empty zone beside the headline, so the piece would only
          ever collide with the text. It only appears once the 70/30 grid
          below gives it real, guaranteed negative space to live in. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[3%] top-[8%] z-[2] hidden h-[42vh] w-[42vh] max-h-[400px] max-w-[400px] opacity-90 lg:block"
        style={{ y: driftY }}
      >
        <HeroArrows3D progress={arrowsProgress} reduceMotion={reduceMotion} />
      </motion.div>

      {/* Floating glass stat chip overlapping the 3D piece — the Nuvio
          "data card layered on top of the hero visual" motif, echoed here
          and again on the lead form so the site's two loud moments rhyme. */}
      <motion.div
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong absolute right-[6%] top-[46vh] z-[3] hidden items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-xl lg:flex"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 17l5-5 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="leading-none">
          <p className="text-xs font-bold text-white">100% Bilingüe</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ink-muted">Big Spring, TX</p>
        </div>
      </motion.div>

      {/* ============== Frame chrome: top-left coordinates + bottom-right scroll cue, film-HUD feel ============== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[3] hidden sm:block">
        <span className="absolute left-5 top-24 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted/70 lg:left-8">
          N-01 · BIG SPRING, TX
        </span>
        <span className="absolute bottom-8 right-5 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted/70 lg:right-8">
          ES / EN
        </span>
      </div>

      {/* ============== CONTENT: asymmetric 70/30, anchored bottom-left ============== */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-1 items-end px-5 pb-16 pt-28 sm:pb-20 lg:px-12 lg:pb-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[1.45fr_0.55fr] lg:items-end">
          {/* ---- Left 70%: eyebrow + huge two-line composed headline ---- */}
          <div>
            <div className="overflow-hidden">
              <motion.span
                initial={reduceMotion ? { y: "0%" } : { y: "120%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="glass-pill inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-mint backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-orange-accent" />
                {t.hero.eyebrow}
              </motion.span>
            </div>

            {/* Headline composed across two baselines at different scales —
                not centered, not one uniform block. First line large and
                tight to the left edge; second line drops further right and
                picks up the gradient, like a camera rack-focus shift. */}
            <h1 className="mt-7 max-w-5xl text-balance font-[family-name:var(--font-heading)] text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-white">
              <span className="block">
                <SplitWords text={headlineFirst} reduceMotion={reduceMotion} />
              </span>
              {headlineSecond && (
                <span className="mt-1 block bg-gradient-to-r from-mint via-orange-accent to-purple-accent bg-clip-text pl-[6vw] text-transparent sm:pl-[8vw]">
                  <SplitWords text={headlineSecond} startDelayIndex={6} reduceMotion={reduceMotion} />
                </span>
              )}
            </h1>

            <motion.p
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-md text-pretty text-base leading-7 text-ink-muted sm:text-lg"
            >
              {t.hero.subhead}
            </motion.p>
          </div>

          {/* ---- Right 30%: CTAs stacked vertically, off the centerline ---- */}
          <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-4 lg:items-stretch lg:border-l lg:border-white/10 lg:pl-8"
          >
            <a
              href="#diagnostico"
              className="btn-primary group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-mint px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-dark-bg shadow-[0_0_40px_-8px_rgba(3,228,222,0.6)] transition hover:bg-white"
            >
              {t.hero.ctaPrimary}
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#servicios"
              className="glass-pill inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md transition hover:text-mint"
            >
              {t.hero.ctaSecondary}
              <span aria-hidden>↓</span>
            </a>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted/70">
              {t.hero.note}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ============== Scroll cue: thin animated line, bottom-center, film-leader style ============== */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-[4] hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="block h-full w-full origin-top bg-gradient-to-b from-mint to-transparent"
            animate={reduceMotion ? { scaleY: 1 } : { scaleY: [0, 1, 0] }}
            transition={
              reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </span>
      </motion.div>
    </section>
  );
}
