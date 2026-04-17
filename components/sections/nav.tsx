"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/sections/locale-switcher";
import { EASE_EXPO_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "services", href: "#services" },
  { key: "team", href: "#team" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
] as const;

type NavKey = (typeof NAV_LINKS)[number]["key"];

export function Nav() {
  const t = useTranslations("nav");
  const prefersReducedMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  // We target the native <button> inside the hamburger wrapper div
  const hamburgerWrapRef = useRef<HTMLDivElement>(null);

  // Scroll-driven header: drive backdrop + border opacity via motion values
  const { scrollY } = useScroll();
  const SCROLL_THRESHOLD = 32;

  // Numeric 0→1 opacity values — Motion interpolates numbers cleanly
  const backdropOpacity = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, 1]);

  // Close mobile menu on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        // Return focus to the hamburger trigger
        const btn = hamburgerWrapRef.current?.querySelector<HTMLElement>("button");
        btn?.focus();
      }
    },
    [menuOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Trap focus inside mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableEls = Array.from(
      menu.querySelectorAll<HTMLElement>(focusableSelectors)
    );
    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    first?.focus();

    function trapFocus(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    menu.addEventListener("keydown", trapFocus);
    return () => menu.removeEventListener("keydown", trapFocus);
  }, [menuOpen]);

  const entranceVariants = prefersReducedMotion
    ? {}
    : {
        initial: { y: -24, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.5, ease: EASE_EXPO_OUT },
      };

  return (
    <>
      <motion.header
        {...entranceVariants}
        className="fixed inset-x-0 top-0 z-50 h-16"
        role="banner"
      >
        {/* Scroll-animated backdrop — opacity 0→1 as user scrolls past 32px */}
        <motion.div
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          style={{ opacity: backdropOpacity }}
          aria-hidden="true"
        />
        {/* Border bottom — fades in with backdrop */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-border"
          style={{ opacity: borderOpacity }}
          aria-hidden="true"
        />

        <nav
          aria-label={t("home")}
          className="relative mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6 lg:px-8"
        >
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-1.5 font-sans text-base font-semibold text-foreground",
              "transition-colors duration-150 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
            aria-label="Axiom — home"
          >
            {/* Icon mark — small violet square */}
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
            {/* Wordmark — accent on first word */}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              axiom
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul
            className="hidden items-center gap-1 md:flex"
            role="list"
          >
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground",
                    "transition-colors duration-150",
                    "hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  {t(key as NavKey)}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Locale + Theme — always visible */}
            <div className="flex items-center gap-1">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>

            {/* Mobile hamburger */}
            <div ref={hamburgerWrapRef} className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label={menuOpen ? t("menu_close") : t("menu_open")}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="min-h-[44px] min-w-[44px]"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div
          id="mobile-nav"
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label={t("menu_open")}
          className={cn(
            "fixed inset-x-0 top-16 z-40 border-b border-border md:hidden",
            "bg-background/95 backdrop-blur-md",
            "animate-in fade-in slide-in-from-top-2 duration-200",
            "motion-reduce:animate-none"
          )}
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-screen-xl px-6 py-4"
          >
            <ul className="flex flex-col gap-1" role="list">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex min-h-[44px] items-center rounded-lg px-4 text-sm font-medium text-muted-foreground",
                      "transition-colors duration-150",
                      "hover:bg-muted hover:text-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    )}
                  >
                    {t(key as NavKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Overlay to close mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
