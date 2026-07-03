"use client";

/**
 * Ambient background video plate — the two brand particle-wave clips used as
 * a decorative texture layer (never the main content). Contract, matching
 * the motion-system spec:
 *  - Desktop only: below 640px viewport width we never request the video
 *    file at all, just the static poster (mobile data/battery discipline).
 *  - prefers-reduced-motion: static poster too — reduced motion removes the
 *    loop/fade, not the color/texture itself.
 *  - IntersectionObserver-gated play/pause so off-screen sections never
 *    burn GPU decode, and preload="none" so nothing downloads until the
 *    section is actually approaching the viewport.
 *  - One-time opacity fade-in on first intersection (Tier-1 "arrival"),
 *    then holds flat — never scroll-scrubbed, this is a mood layer.
 */

import { useEffect, useRef, useState } from "react";

export function AmbientVideo({
  src,
  poster,
  opacity,
  className
}: {
  src: string;
  poster: string;
  opacity: number;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    setCanPlayVideo(!reduceMotion && isDesktop);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className={`pointer-events-none absolute overflow-hidden transition-opacity duration-[1200ms] ease-out ${className ?? "inset-0"}`}
      style={{ opacity: visible ? opacity : 0 }}
    >
      {canPlayVideo ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
        />
      ) : (
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
    </div>
  );
}
