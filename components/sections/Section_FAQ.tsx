"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { FaqItem } from "@/lib/content";

/**
 * FAQ section built for both UX and AEO/GEO (Answer/Generative Engine
 * Optimization) — each question renders as plain, crawlable text (no
 * lazy-mounted content) and the active language's Q&A pairs are also
 * emitted as a schema.org FAQPage JSON-LD block so AI/search engines can
 * lift direct answers.
 */
export function SectionFAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section className="relative z-10 bg-section-faq px-5 py-24 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SectionIndex n="10" label="FAQ" />

      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
            {t.faq.headline}
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink-muted">
            {t.faq.subhead}
          </p>
        </Reveal>

        <div className="glass mt-12 divide-y divide-white/10 overflow-hidden rounded-2xl backdrop-blur-md backdrop-saturate-150">
          {t.faq.items.map((item, i) => (
            <FaqRow
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  item,
  isOpen,
  onToggle
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`px-5 transition sm:px-7 ${
        isOpen ? "border-l-2 border-mint/60 bg-mint/[0.03]" : "border-l-2 border-transparent"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-semibold text-white sm:text-lg">
          {item.question}
        </span>
        <span
          aria-hidden
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-mint/30 text-mint transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-10 leading-7 text-ink-muted sm:pr-14">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
