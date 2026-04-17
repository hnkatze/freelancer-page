"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, Server, Smartphone, Workflow, Globe } from "lucide-react";

import { Magnetic } from "@/components/effects/magnetic";
import { Button } from "@/components/ui/button";
import { EASE_EXPO_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Motion variant factories
   ────────────────────────────────────────────────────────────────── */
const wordContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_EXPO_OUT,
    },
  },
};

/* ─────────────────────────────────────────────────────────────────
   Bento thumb card data (driven by translation keys)
   ────────────────────────────────────────────────────────────────── */
type ThumbItem = {
  titleKey: "thumb_1_title" | "thumb_2_title" | "thumb_3_title" | "thumb_4_title";
  captionKey: "thumb_1_caption" | "thumb_2_caption" | "thumb_3_caption" | "thumb_4_caption";
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  /** Tailwind class for the decorative gradient overlay */
  accentClass: string;
};

const THUMB_ITEMS: ThumbItem[] = [
  {
    titleKey: "thumb_1_title",
    captionKey: "thumb_1_caption",
    Icon: Server,
    accentClass:
      "from-brand-100/80 via-brand-50/40 dark:from-brand-950/60 dark:via-brand-900/30 to-transparent",
  },
  {
    titleKey: "thumb_2_title",
    captionKey: "thumb_2_caption",
    Icon: Smartphone,
    accentClass:
      "from-brand-200/70 via-brand-100/30 dark:from-brand-900/50 dark:via-brand-950/20 to-transparent",
  },
  {
    titleKey: "thumb_3_title",
    captionKey: "thumb_3_caption",
    Icon: Workflow,
    accentClass:
      "from-brand-100/80 via-brand-50/40 dark:from-brand-950/60 dark:via-brand-900/30 to-transparent",
  },
  {
    titleKey: "thumb_4_title",
    captionKey: "thumb_4_caption",
    Icon: Globe,
    accentClass:
      "from-brand-200/70 via-brand-100/30 dark:from-brand-900/50 dark:via-brand-950/20 to-transparent",
  },
];

const ROTATION_INTERVAL_MS = 2500;

/* ─────────────────────────────────────────────────────────────────
   BentoThumbCard — single card in the rotating grid
   ────────────────────────────────────────────────────────────────── */
interface BentoThumbCardProps {
  item: ThumbItem;
  isActive: boolean;
  index: number;
  prefersReducedMotion: boolean;
}

function BentoThumbCard({
  item,
  isActive,
  index,
  prefersReducedMotion,
}: BentoThumbCardProps) {
  const t = useTranslations("hero");
  const { Icon, accentClass, titleKey, captionKey } = item;

  const cardVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.6,
          delay: 0.4 + index * 0.08,
          ease: EASE_EXPO_OUT,
        },
      };

  return (
    <motion.div
      {...cardVariants}
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4",
        "transition-[border-color,box-shadow,opacity] duration-300",
        isActive
          ? "border-brand-600 shadow-glow-brand-sm opacity-100"
          : "border-border opacity-70"
      )}
      aria-current={isActive ? "true" : undefined}
    >
      {/* Decorative gradient background */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          accentClass
        )}
      />

      {/* Icon — decorative oversized mark */}
      <div aria-hidden="true" className="relative mb-3">
        <Icon
          className={cn(
            "h-8 w-8 transition-colors duration-300",
            isActive ? "text-accent-foreground" : "text-muted-foreground"
          )}
          aria-hidden
        />
      </div>

      {/* Text */}
      <div className="relative">
        <p
          className={cn(
            "text-sm font-semibold leading-tight transition-colors duration-300",
            isActive ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {t(titleKey)}
        </p>
        <p className="mt-0.5 font-mono text-xs text-muted-foreground">
          {t(captionKey)}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   AuroraBackground — atmospheric orb layer behind hero content
   ────────────────────────────────────────────────────────────────── */

/** Three orb configs — varying hue, size and timing so they feel independent */
const ORB_CONFIGS = [
  {
    // Violet — top-left
    style: {
      width: "40rem",
      height: "40rem",
      top: "-10rem",
      left: "-10rem",
      background:
        "radial-gradient(circle at center, oklch(0.58 0.22 280 / 0.35), transparent 70%)",
    },
    animate: { x: [0, 48, -24, 0], y: [0, -32, 20, 0] },
    duration: 22,
  },
  {
    // Blue-violet — bottom-right
    style: {
      width: "48rem",
      height: "48rem",
      bottom: "-12rem",
      right: "-8rem",
      background:
        "radial-gradient(circle at center, oklch(0.55 0.22 260 / 0.30), transparent 70%)",
    },
    animate: { x: [0, -36, 16, 0], y: [0, 24, -20, 0] },
    duration: 26,
  },
  {
    // Magenta-violet — center-right
    style: {
      width: "32rem",
      height: "32rem",
      top: "30%",
      right: "22%",
      background:
        "radial-gradient(circle at center, oklch(0.56 0.20 290 / 0.25), transparent 70%)",
    },
    animate: { x: [0, 20, -40, 0], y: [0, -16, 28, 0] },
    duration: 18,
  },
];

function AuroraBackground({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Orbs rely on mix-blend-screen which is a no-op on light backgrounds.
  // Skip rendering entirely on light — hero still has its radial decoration.
  // Wait for mount so server and first client render match.
  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {ORB_CONFIGS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[80px] mix-blend-screen"
          style={orb.style}
          animate={prefersReducedMotion ? undefined : orb.animate}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: orb.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop",
                }
          }
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   BentoGrid — 2×2 rotating bento visual
   ────────────────────────────────────────────────────────────────── */
function BentoGrid({
  prefersReducedMotion,
  parallaxY,
}: {
  prefersReducedMotion: boolean;
  parallaxY: ReturnType<typeof useTransform<number, number>>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % THUMB_ITEMS.length);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const gridVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, delay: 0.3, ease: EASE_EXPO_OUT },
      };

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : { y: parallaxY }}
      className="w-full"
    >
      <motion.div
        {...gridVariants}
        className="grid grid-cols-2 gap-3"
        aria-label="Selected work highlights"
      >
        {THUMB_ITEMS.map((item, i) => (
          <BentoThumbCard
            key={item.titleKey}
            item={item}
            isActive={activeIndex === i}
            index={i}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   WordStagger — splits a string into animated word spans
   ────────────────────────────────────────────────────────────────── */
function WordStagger({
  text,
  className,
  prefersReducedMotion,
}: {
  text: string;
  className?: string;
  prefersReducedMotion: boolean;
}) {
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className={cn("inline-block", className)}
          style={{ marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Hero — main export
   ────────────────────────────────────────────────────────────────── */
export function Hero() {
  const t = useTranslations("hero");
  const prefersReducedMotion = useReducedMotion() ?? false;

  // Parallax based on global page scroll to avoid container offset warnings.
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, -120]);

  const titlePre = t("title_pre");
  const titleKeyword = t("title_keyword");

  // Keyword words — need separate spans but wrapped in gradient
  const keywordWords = titleKeyword.split(" ");

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-40"
      aria-labelledby="hero-heading"
    >
      {/* Aurora / floating orbs — atmospheric depth layer */}
      <AuroraBackground prefersReducedMotion={prefersReducedMotion} />

      {/* Background radial decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_left_center,oklch(0.24_0.10_280/0.25),transparent_60%)]"
      />

      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.5fr_1fr]">

          {/* ── Left column — content ── */}
          <div className="flex flex-col">

            {/* Badge pill */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-glow-brand-sm animate-pulse motion-reduce:animate-none"
                  aria-hidden="true"
                />
                {t("badge")}
              </span>
            </div>

            {/* Headline with word-by-word stagger */}
            <motion.h1
              id="hero-heading"
              className="text-display font-bold tracking-tight text-foreground"
              initial={prefersReducedMotion ? undefined : "hidden"}
              animate={prefersReducedMotion ? undefined : "visible"}
              variants={prefersReducedMotion ? undefined : wordContainerVariants}
            >
              {/* title_pre words */}
              <WordStagger
                text={titlePre}
                prefersReducedMotion={prefersReducedMotion}
              />
              {/* title_keyword — gradient highlight */}
              {prefersReducedMotion ? (
                <span className="bg-brand-gradient bg-clip-text text-transparent">
                  {titleKeyword}
                </span>
              ) : (
                keywordWords.map((word, i) => (
                  <motion.span
                    key={`kw-${word}-${i}`}
                    variants={wordVariants}
                    className="inline-block bg-brand-gradient bg-clip-text text-transparent"
                    style={{ marginRight: i < keywordWords.length - 1 ? "0.25em" : 0 }}
                  >
                    {word}
                  </motion.span>
                ))
              )}
              {/* Punctuation */}
              {!prefersReducedMotion && (
                <motion.span
                  variants={wordVariants}
                  className="inline-block text-foreground"
                >
                  .
                </motion.span>
              )}
              {prefersReducedMotion && (
                <span className="text-foreground">.</span>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-6 max-w-[55ch] text-lg text-muted-foreground"
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 0.6, delay: 0.8 }
              }
            >
              {t("subtitle")}
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 0.5, delay: 1.0 }
              }
            >
              {/* Primary CTA — magnetic */}
              <Magnetic strength={0.35} range={90} className="inline-block">
                <Button
                  size="lg"
                  className={cn(
                    "group/cta bg-brand-gradient text-brand-gradient-fg shadow-glow-brand",
                    "min-h-[44px] px-8 py-3.5 text-base font-semibold",
                    "transition-[opacity,box-shadow] duration-200",
                    "hover:opacity-90",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  {t("cta_primary")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover/cta:translate-x-0.5 motion-reduce:group-hover/cta:translate-x-0"
                    aria-hidden="true"
                  />
                </Button>
              </Magnetic>

              {/* Secondary CTA — magnetic (lighter) */}
              <Magnetic strength={0.2} range={70} className="inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-h-[44px] px-8 py-3.5 text-base font-semibold"
                >
                  {t("cta_secondary")}
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* ── Right column — bento rotating thumbnails (parallax) ── */}
          <div className="relative w-full">
            <BentoGrid
              prefersReducedMotion={prefersReducedMotion}
              parallaxY={parallaxY}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
