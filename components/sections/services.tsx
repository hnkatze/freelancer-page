"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Globe, Smartphone, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/content";
import type { Service } from "@/lib/content";
import { EASE_EXPO_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   Icon map — resolves service.icon → lucide component
   ────────────────────────────────────────────────────────────────── */
const ICON_MAP: Record<Service["icon"], LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  workflow: Workflow,
};

/* ─────────────────────────────────────────────────────────────────
   Type-safe translation accessors
   Avoids dynamic string construction that upsets next-intl's types.
   ────────────────────────────────────────────────────────────────── */
type ServicesT = ReturnType<typeof useTranslations<"services">>;

const SERVICE_TITLE_KEYS: Record<Service["slug"], (t: ServicesT) => string> = {
  web: (t) => t("web.title"),
  mobile: (t) => t("mobile.title"),
  automation: (t) => t("automation.title"),
};

const SERVICE_DESC_KEYS: Record<Service["slug"], (t: ServicesT) => string> = {
  web: (t) => t("web.description"),
  mobile: (t) => t("mobile.description"),
  automation: (t) => t("automation.description"),
};

/* ─────────────────────────────────────────────────────────────────
   Motion variants for the services grid
   ────────────────────────────────────────────────────────────────── */
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_EXPO_OUT,
    },
  },
};

/* ─────────────────────────────────────────────────────────────────
   ServiceCard — single bento cell
   ────────────────────────────────────────────────────────────────── */
interface ServiceCardProps {
  service: Service;
  prefersReducedMotion: boolean;
}

function ServiceCard({ service, prefersReducedMotion }: ServiceCardProps) {
  const t = useTranslations("services");
  const IconComponent = ICON_MAP[service.icon];

  const motionProps = prefersReducedMotion
    ? {}
    : { variants: cardVariants };

  return (
    <motion.article
      {...motionProps}
      className="@container"
      aria-labelledby={`service-${service.slug}-title`}
    >
      <Card
        className={cn(
          "group relative h-full overflow-hidden rounded-2xl border-border p-6 lg:p-8",
          "transition-[border-color,box-shadow,transform] duration-200",
          "hover:-translate-y-1 hover:border-primary hover:shadow-glow-brand-sm",
          "focus-within:ring-2 focus-within:ring-ring/50 focus-within:ring-offset-2 focus-within:ring-offset-background",
          "motion-reduce:hover:translate-y-0"
        )}
      >
        {/* Icon */}
        <div className="mb-4">
          <IconComponent
            className="h-6 w-6 text-accent-foreground"
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h3
          id={`service-${service.slug}-title`}
          className="text-xl font-semibold text-foreground"
        >
          {SERVICE_TITLE_KEYS[service.slug](t)}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground">
          {SERVICE_DESC_KEYS[service.slug](t)}
        </p>

        {/* Tech badges */}
        <div
          className="mt-6 flex flex-wrap gap-2"
          aria-label={`Technologies: ${service.tech.join(", ")}`}
        >
          {service.tech.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="rounded-sm border-border bg-muted/50 font-mono text-xs text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ServicesGrid — scroll-reveal wrapper with staggered entrance
   ────────────────────────────────────────────────────────────────── */
function ServicesGrid({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: gridContainerVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-20%" },
      };

  return (
    <motion.div
      {...motionProps}
      className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {services.map((service) => (
        <ServiceCard
          key={service.slug}
          service={service}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Services — main export
   ────────────────────────────────────────────────────────────────── */
export function Services() {
  const t = useTranslations("services");
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="services"
      className="border-t border-border py-16 lg:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">

        {/* Header block — fade + slide up on enter */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.6, ease: EASE_EXPO_OUT }
          }
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent-foreground">
            {t("eyebrow")}
          </span>

          <h2
            id="services-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl"
          >
            {t("title")}
          </h2>

          <p className="mt-4 max-w-[55ch] text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Service cards grid */}
        <ServicesGrid prefersReducedMotion={prefersReducedMotion} />
      </div>
    </section>
  );
}
