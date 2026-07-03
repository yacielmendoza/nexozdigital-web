"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis-powered smooth scroll for the whole site.
 * Mounted once near the root. Respects prefers-reduced-motion by skipping the
 * smoothing entirely so the OS-level accessibility setting wins.
 *
 * Lenis virtualizes scroll position, so GSAP's ScrollTrigger (used by several
 * sections) needs to be explicitly kept in sync — otherwise trigger points
 * desync from the actual rendered scroll and animations can fire late or get
 * stuck mid-transition (e.g. elements left at opacity:0). Per GSAP's official
 * Lenis integration: feed Lenis off GSAP's own ticker instead of a separate
 * requestAnimationFrame loop, and forward every Lenis scroll event to
 * ScrollTrigger.update().
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
