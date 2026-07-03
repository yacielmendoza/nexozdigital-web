"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting particle field rendered on a 2D canvas (intentionally NOT
 * Three.js — this is the lightweight hero backdrop). Particles slowly float
 * upward and wrap around; nearby ones are linked with faint mint lines.
 * Particles near the cursor accelerate slightly and their connecting lines
 * glow brighter, creating a subtle interactive "energy field" feel.
 * Pauses when reduced-motion is requested.
 */
export function Particles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;

    // Non-null locals so the nested raf/resize closures stay well-typed.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Cursor position in canvas-local coordinates; null when pointer is away.
    const pointer = { x: 0, y: 0, active: false };
    const CURSOR_RADIUS = 160;
    const LINK_DISTANCE = 120;

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    function resize() {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area, capped for performance.
      const count = Math.min(120, Math.floor((width * height) / 11000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.25 + 0.05),
        r: Math.random() * 1.6 + 0.6
      }));
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function onPointerLeave() {
      pointer.active = false;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Particles within the cursor radius drift slightly faster, giving a
        // gentle "energy field" pull without fully redirecting their path.
        let speedBoost = 1;
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_RADIUS) {
            speedBoost = 1 + (1 - dist / CURSOR_RADIUS) * 1.8;
          }
        }

        p.x += p.vx * speedBoost;
        p.y += p.vy * speedBoost;
        if (p.y < -5) p.y = height + 5;
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(3, 228, 222, 0.55)";
        ctx.fill();
      }

      // Link nearby particles; links closer to the cursor glow brighter.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            let alpha = 0.15 * (1 - dist / LINK_DISTANCE);

            if (pointer.active) {
              const midX = (a.x + b.x) / 2;
              const midY = (a.y + b.y) / 2;
              const cursorDist = Math.hypot(midX - pointer.x, midY - pointer.y);
              if (cursorDist < CURSOR_RADIUS) {
                const boost = 1 - cursorDist / CURSOR_RADIUS;
                alpha = alpha + boost * 0.4;
              }
            }

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(3, 228, 222, ${Math.min(alpha, 0.55)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    if (prefersReduced) {
      // Render a single static frame and stop.
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}
