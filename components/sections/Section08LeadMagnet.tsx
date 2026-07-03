"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";

type Status = "idle" | "loading" | "success" | "error";

export function Section08LeadMagnet() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language })
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="diagnostico"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-section-lead px-5 py-24 lg:px-8"
    >
      <SectionIndex n="08" label="Lead Magnet" />
      {/* Second "loud" peak on the page, deliberately matching the hero's
          intensity — this is the primary conversion moment. */}
      <div aria-hidden className="gradient-mesh-loud pointer-events-none absolute inset-0" />

      <div className="glass-strong relative mx-auto grid max-w-6xl gap-10 rounded-3xl p-7 backdrop-blur-2xl md:p-10 lg:grid-cols-[1fr_1fr]">
        {/* Floating stat chip — the Nuvio "data card overlapping the hero
            visual" motif, echoed here to rhyme with the same chip on the
            hero, bookending the page's two loud moments. */}
        <div className="glass-strong absolute -top-5 left-7 z-10 hidden items-center gap-2 rounded-full px-4 py-2 backdrop-blur-xl sm:flex">
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse-glow rounded-full bg-mint" />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            {t.lead.form.trustNote}
          </span>
        </div>

        {/* Pitch */}
        <Reveal direction="left">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-mint">
            {t.lead.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            {t.lead.headline}
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            {t.lead.description}
          </p>
          <ul className="mt-7 space-y-3.5">
            {t.lead.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/15 text-xs text-mint">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* "What happens after you submit" — lowers submit anxiety on the
              highest-intent form on the site. */}
          <ol className="mt-8 space-y-2.5 border-t border-white/10 pt-6">
            {t.lead.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-3 text-sm text-ink-muted">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Form */}
        <Reveal direction="right" delay={0.1}>
          {status === "success" ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-mint/30 bg-mint/10 p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint text-2xl text-dark-bg">
                ✓
              </span>
              <p className="mt-5 text-lg font-bold leading-8 text-mint">
                {t.lead.form.success}
              </p>
              <p className="mt-2 max-w-xs leading-7 text-ink-muted">
                {t.lead.form.successNext}
              </p>
              <a
                href="#servicios"
                className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-mint transition hover:text-white"
              >
                {t.hero.ctaSecondary} →
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <Field label={t.lead.form.name} name="name" autoComplete="name" />
              <Field
                label={t.lead.form.email}
                name="email"
                type="email"
                autoComplete="email"
              />
              <Field
                label={t.lead.form.phone}
                name="phone"
                type="tel"
                autoComplete="tel"
                required={false}
              />

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  {t.lead.form.businessType}
                </span>
                <select
                  name="businessType"
                  required
                  defaultValue=""
                  className="glass-input w-full rounded-xl px-4 py-3.5 text-white backdrop-blur-sm transition focus:border-mint focus:outline-none focus:ring-2 focus:ring-[#03E4DE] focus:ring-offset-2 focus:ring-offset-[#030A1A]"
                >
                  <option value="" disabled>
                    {t.lead.form.businessTypePlaceholder}
                  </option>
                  {t.lead.form.businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary btn-gradient-ring mt-2 rounded-full bg-orange-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-dark-bg transition hover:bg-mint disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? t.lead.form.sending : t.lead.form.submit}
              </button>
              <p className="text-center text-xs text-ink-muted">{t.lead.form.trustNote}</p>

              {status === "error" && (
                <p className="rounded-xl border border-orange-accent/30 bg-orange-accent/10 px-4 py-3 text-sm leading-6 text-orange-soft">
                  {t.lead.form.error}
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = true
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
        {label}
      </span>
      <input
        required={required}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="glass-input w-full rounded-xl px-4 py-3.5 text-white backdrop-blur-sm transition placeholder:text-ink-muted/70 focus:border-mint focus:outline-none focus:ring-2 focus:ring-[#03E4DE] focus:ring-offset-2 focus:ring-offset-[#030A1A]"
      />
    </label>
  );
}
