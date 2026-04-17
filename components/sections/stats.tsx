"use client";

import { useReducedMotion, motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Counter } from "@/components/effects/counter";
import { stats } from "@/lib/content";
import { EASE_EXPO_OUT } from "@/lib/motion";

export function Stats() {
  const t = useTranslations();
  const shouldReduce = useReducedMotion();

  return (
    <section
      aria-label={t("stats.eyebrow")}
      className="border-t border-border py-12 lg:py-16"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <p className="font-mono text-xs uppercase tracking-widest text-accent-foreground">
          {t("stats.eyebrow")}
        </p>

        {/* Stats grid */}
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 mt-8">
          {stats.map((entry, index) => (
            <motion.div
              key={entry.labelKey}
              initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={
                shouldReduce
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      delay: 0.1 * index,
                      ease: EASE_EXPO_OUT,
                    }
              }
              className="flex flex-col"
            >
              <dt className="order-2 text-sm text-muted-foreground mt-2 font-medium">
                {t(entry.labelKey as Parameters<typeof t>[0])}
              </dt>
              <dd className="order-1">
                <Counter
                  target={entry.value}
                  suffix={entry.suffix}
                  className="text-4xl lg:text-5xl font-bold tracking-tight bg-brand-gradient bg-clip-text text-transparent tabular-nums"
                />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
