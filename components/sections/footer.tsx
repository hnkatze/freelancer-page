import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";

import { Github, Linkedin } from "@/components/icons/brand";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { socials } from "@/lib/content";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border bg-background"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-screen-xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Top row — wordmark + nav columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto]">
          {/* Wordmark + tagline */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 font-sans text-base font-semibold text-foreground focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Axiom — home"
            >
              {/* Icon mark */}
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-gradient"
                aria-hidden="true"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 10L6 2L10 10"
                    stroke="oklch(0.080 0.004 265)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                axiom
              </span>
            </Link>
            <p className="max-w-[32ch] text-sm text-muted-foreground">
              {t("tagline")}
            </p>
          </div>

          {/* Product column */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
              {t("sections.product")}
            </p>
            <ul className="flex flex-col gap-2" role="list">
              <li>
                <a
                  href="#services"
                  className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Team column */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
              {t("sections.team")}
            </p>
            <ul className="flex flex-col gap-2" role="list">
              <li>
                <a
                  href="#team"
                  className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
              {t("sections.legal")}
            </p>
            <ul className="flex flex-col gap-2" role="list">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Bottom row — copyright + socials */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            &copy; {year} Axiom.{" "}
            <span className="whitespace-nowrap">{t("rights")}</span>
          </p>

          {/* Social icons */}
          <div
            className="flex items-center gap-1"
            aria-label="Social links"
            role="list"
          >
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label="GitHub"
              className={
                "flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg text-muted-foreground " +
                "transition-colors duration-150 hover:text-foreground " +
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              }
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label="LinkedIn"
              className={
                "flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg text-muted-foreground " +
                "transition-colors duration-150 hover:text-foreground " +
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              }
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${socials.email}`}
              role="listitem"
              aria-label="Email"
              className={
                "flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg text-muted-foreground " +
                "transition-colors duration-150 hover:text-foreground " +
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              }
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
