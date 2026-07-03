"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-dark-bg/80">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center">
              <Image
                src="/nexoz-lockup-full.png"
                alt="Nexoz Digital Solutions"
                width={1334}
                height={322}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-ink-muted">
              {t.footer.tagline}
            </p>
            <a
              href="mailto:hola@nexozdigital.com"
              className="mt-5 inline-block text-sm text-mint transition hover:text-white"
            >
              hola@nexozdigital.com
            </a>
          </div>

          {/* Link columns */}
          {t.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-muted transition hover:text-mint"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ink-muted md:flex-row">
          <p>{t.footer.rights}</p>
          <p>{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
