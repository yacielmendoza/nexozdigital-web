"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import { SectionIndex } from "@/components/ui/SectionIndex";

// Quiet-tier deliberate breather right after the loud hero — icons rest at
// ink-muted and only pick up a brand hue on hover, cycling cyan/blue/purple
// per item instead of every icon sharing one static mint color.
const HOVER_HUES = ["#03e4de", "#317af7", "#8343f6"];

export function Section02ProofBar() {
  const { t } = useLanguage();

  return (
    <section className="tier-quiet relative z-10 border-b border-white/10">
      <SectionIndex n="02" label="Proof" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-3 md:grid-cols-4 lg:px-8">
        {t.proof.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            style={{ "--hue": HOVER_HUES[i % 3] } as CSSProperties}
            className="group flex items-center justify-center gap-2.5 px-3 py-4 text-center"
          >
            <Icon
              name={item.icon as IconName}
              className="h-4 w-4 shrink-0 text-ink-muted transition-colors duration-300 group-hover:text-[var(--hue)]"
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted sm:text-xs">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
