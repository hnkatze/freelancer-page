"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Globe } from "lucide-react";

import { Github } from "@/components/icons/brand";
import { team, type TeamMember } from "@/lib/content";
import { EASE_EXPO_OUT } from "@/lib/motion";
import { Card } from "@/components/ui/card";

/* ─── Motion variants ────────────────────────────────────────────────── */

const containerVariants = {
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
      duration: 0.5,
      ease: EASE_EXPO_OUT,
    },
  },
};

/* ─── Helpers ────────────────────────────────────────────────────────── */

/** Returns initials for the avatar placeholder (e.g. "Camilo Henriquez" → "CH"). */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ─── MemberCard ─────────────────────────────────────────────────────── */

function MemberCard({ member }: { member: TeamMember }) {
  const t = useTranslations();

  return (
    <motion.div variants={cardVariants}>
      <Card
        className="
          group p-6 rounded-2xl border-border
          hover:border-primary
          transition-[border-color,box-shadow] duration-200 ease-out
          hover:shadow-glow-brand-sm
          h-full flex flex-col
        "
      >
        {/*
         * TODO: Replace placeholder with next/image once real photos exist.
         * Replacement path: /public/team/{member.slug}.webp
         * Usage: <Image src={member.avatar} alt={member.name} width={64} height={64} className="rounded-full h-16 w-16 object-cover" />
         */}
        <div
          aria-hidden="true"
          className="
            h-16 w-16 rounded-full bg-brand-gradient
            text-white flex items-center justify-center
            text-xl font-bold select-none shrink-0
          "
        >
          {getInitials(member.name)}
        </div>

        <h3 className="text-lg font-semibold mt-4 text-foreground">
          {member.name}
        </h3>

        <p className="text-sm text-accent-foreground font-medium mt-1">
          {t(`team.roles.${member.roleKey}`)}
        </p>

        <p className="text-sm text-muted-foreground mt-3 flex-1">
          {t(`team.bios.${member.slug}`)}
        </p>

        {/* Social links */}
        {(member.github || member.website) && (
          <div className="flex gap-3 mt-6" role="list" aria-label={`${member.name} links`}>
            {member.github && (
              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub · ${member.name}`}
                role="listitem"
                className="
                  min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2
                  text-muted-foreground hover:text-foreground
                  transition-colors duration-150 ease-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
                  rounded-md
                "
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
            {member.website && (
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Website · ${member.name}`}
                role="listitem"
                className="
                  min-h-[44px] min-w-[44px] flex items-center justify-center
                  text-muted-foreground hover:text-foreground
                  transition-colors duration-150 ease-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
                  rounded-md
                "
              >
                <Globe className="h-5 w-5" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

/* ─── TeamGrid (animated container) ─────────────────────────────────── */

function TeamGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
      variants={containerVariants}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-20%" }}
    >
      {team.map((member) => (
        <MemberCard key={member.slug} member={member} />
      ))}
    </motion.div>
  );
}

/* ─── Section (server-safe shell, client because child uses hooks) ───── */

export function TeamSection() {
  const t = useTranslations("team");

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
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
          id="team-heading"
          className="text-3xl lg:text-4xl font-bold tracking-tight mt-4 text-foreground"
        >
          {t("title")}
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mt-4 max-w-[55ch]">
          {t("subtitle")}
        </p>

        {/* Grid */}
        <TeamGrid />
      </div>
    </section>
  );
}
