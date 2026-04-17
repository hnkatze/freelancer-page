"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { projects, type Project } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EASE_EXPO_OUT } from "@/lib/motion";

/* ─── Motion variants ────────────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_EXPO_OUT,
    },
  },
};

/* ─── ProjectCard ────────────────────────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  // Root translator — accepts full dotted keys (next-intl v4 pattern)
  const t = useTranslations();

  const spanClass =
    project.span === "wide"
      ? "lg:col-span-2"
      : project.span === "tall"
        ? "row-span-2"
        : "";

  return (
    <motion.div
      variants={cardVariants}
      className={spanClass}
    >
      <Card
        className="
          group relative p-6 lg:p-8 rounded-2xl border-border
          hover:border-primary hover:shadow-glow-brand-sm
          transition-[border-color,box-shadow] duration-200 ease-out
          h-full flex flex-col
        "
      >
        {/* Year */}
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {project.year}
        </span>

        {/* Title */}
        <h3 className="text-xl lg:text-2xl font-semibold mt-4 text-foreground tracking-tight">
          {t(project.titleKey)}
        </h3>

        {/* Summary */}
        <p className="text-sm text-muted-foreground mt-3 flex-1 leading-relaxed">
          {t(project.summaryKey)}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mt-6" role="list" aria-label="Technologies used">
          {project.tech.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-mono text-xs"
              role="listitem"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* View project link */}
        {project.url && (
          <div className="mt-6">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-sm font-medium text-accent-foreground hover:opacity-80
                transition-[opacity] duration-150 ease-out
                inline-flex items-center gap-1
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
                rounded-sm
              "
            >
              {t("projects.view_project")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}

      </Card>
    </motion.div>
  );
}

/* ─── ProjectsGrid (animated container) ─────────────────────────────── */

function ProjectsGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12
        auto-rows-[minmax(220px,_auto)]
        [grid-auto-flow:dense]
      "
      variants={containerVariants}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-20%" }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 lg:py-28 border-t border-border"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <p
          className="font-mono text-xs uppercase tracking-widest text-accent-foreground"
          aria-hidden="true"
        >
          {t("eyebrow")}
        </p>

        {/* Heading */}
        <h2
          id="projects-heading"
          className="text-3xl lg:text-4xl font-bold tracking-tight mt-4 text-foreground"
        >
          {t("title")}
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mt-4 max-w-[55ch]">
          {t("subtitle")}
        </p>

        {/* Bento grid */}
        <ProjectsGrid />
      </div>
    </section>
  );
}
