"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Language } from "@/lib/content";

const LANGS: Array<{ key: Language; label: string }> = [
  { key: "es", label: "ES" },
  { key: "en", label: "EN" }
];

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  // Switch to a glassmorphism bar once the user scrolls past the hero fold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open, compensating for the
  // scrollbar width so page content doesn't shift horizontally.
  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      firstMenuLinkRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [menuOpen]);

  // Escape closes the menu and returns focus to the trigger.
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* Floating liquid-glass bar — a frosted, refractive pill detached from
          the viewport edges, brightening as you scroll. */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 sm:px-5 lg:px-6 ${
          scrolled ? "glass-nav-scrolled py-2.5" : "glass-nav py-3"
        }`}
      >
        {/* Logo */}
        <a href="#top" className="flex items-center" aria-label="Nexoz Digital">
          <Image
            src="/nexoz-lockup-compact.png"
            alt="Nexoz Digital"
            width={520}
            height={126}
            priority
            className="h-7 w-auto object-contain sm:h-8"
          />
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.16em] text-ink-muted md:flex"
        >
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-mint"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <LangToggle language={language} setLanguage={setLanguage} />

          {/* Full CTA from sm+; a compact icon-only version stays visible
              below sm so the primary conversion action is never hidden
              behind the hamburger on phones. */}
          <a
            href="#diagnostico"
            className="hidden rounded-full bg-mint px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-dark-bg transition hover:bg-white sm:inline-flex"
          >
            {t.navCta}
          </a>
          <a
            href="#diagnostico"
            aria-label={t.navCta}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-mint text-dark-bg transition hover:bg-white sm:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Hamburger — 44px touch target with a backing circle so it
              stays legible over busy hero photography before scroll. */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="glass-pill relative flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md md:hidden"
          >
            <span
              className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-white transition-all ${
                menuOpen ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-white transition-all ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-white transition-all ${
                menuOpen ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu — a separate floating liquid-glass panel below the bar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass-strong mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl backdrop-blur-2xl backdrop-saturate-150 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {/* Visible close control (WCAG 2.1.2 / 2.4.3) — mirrors the
                  Escape-key handler for pointer and screen-reader users. */}
              <div className="mb-1 flex justify-end">
                <button
                  type="button"
                  aria-label="Cerrar menú de navegación"
                  onClick={() => {
                    setMenuOpen(false);
                    hamburgerRef.current?.focus();
                  }}
                  className="glass-pill flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:text-mint"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {t.nav.map((item, i) => (
                <a
                  key={item.href}
                  ref={i === 0 ? firstMenuLinkRef : undefined}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-[0.12em] text-ink-muted transition hover:bg-white/5 hover:text-mint"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#diagnostico"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-mint px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-dark-bg"
              >
                {t.navCta}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function LangToggle({
  language,
  setLanguage
}: {
  language: Language;
  setLanguage: (l: Language) => void;
}) {
  return (
    <div className="glass-pill grid grid-cols-2 rounded-full p-0.5 backdrop-blur-md">
      {LANGS.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => setLanguage(item.key)}
          className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
            language === item.key
              ? "bg-mint text-dark-bg shadow-[0_2px_10px_-2px_rgba(3,228,222,0.5)]"
              : "text-ink-muted hover:text-white"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
