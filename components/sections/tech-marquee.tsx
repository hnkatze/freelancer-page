"use client";

import { useReducedMotion, motion } from "motion/react";
import { useTranslations } from "next-intl";

import { techStack } from "@/lib/content";

/** Bullet separator between tech names in the marquee track. */
function Separator() {
  return (
    <span aria-hidden="true" className="text-accent-foreground select-none">
      ·
    </span>
  );
}

/** A single rendered list of tech names for one marquee pass. */
function TrackItems() {
  return (
    <>
      {techStack.map((name) => (
        <span key={name} className="flex items-center gap-8 shrink-0">
          <span className="font-mono text-lg lg:text-xl font-medium text-muted-foreground hover:text-foreground transition-colors duration-150">
            {name}
          </span>
          <Separator />
        </span>
      ))}
    </>
  );
}

export function TechMarquee() {
  const t = useTranslations();
  const shouldReduce = useReducedMotion();

  return (
    <section
      aria-label={t("tech_marquee.label")}
      className="border-y border-border py-8 lg:py-10 overflow-hidden"
    >
      {/* Label */}
      <p className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t("tech_marquee.label")}
      </p>

      {/* Marquee track */}
      <div
        className="mt-6 relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {shouldReduce ? (
          /* Reduced motion: static, wrapping flex row */
          <div
            role="list"
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 px-8"
          >
            {techStack.map((name) => (
              <span
                key={name}
                role="listitem"
                className="font-mono text-lg lg:text-xl font-medium text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        ) : (
          /* Animated marquee: two identical tracks side-by-side */
          <div className="flex gap-8 whitespace-nowrap" aria-hidden="true">
            <motion.div
              className="flex shrink-0 gap-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              style={{ willChange: "transform" }}
            >
              {/* Two copies inside the motion div so the loop is seamless */}
              <TrackItems />
              <TrackItems />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
