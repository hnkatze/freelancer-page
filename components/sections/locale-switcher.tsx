"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LOCALES = ["en", "es"] as const;
type Locale = (typeof LOCALES)[number];

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function handleSwitch(locale: Locale) {
    if (locale === currentLocale) return;
    router.replace(pathname, { locale });
  }

  return (
    <div
      role="group"
      aria-label={t("switch")}
      className="flex items-center rounded-md border border-border bg-muted/30 p-0.5 gap-0.5"
    >
      {LOCALES.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <Button
            key={locale}
            variant="ghost"
            size="xs"
            onClick={() => handleSwitch(locale)}
            aria-pressed={isActive}
            aria-label={t(locale)}
            className={cn(
              "min-h-[28px] min-w-[28px] px-2 font-mono text-xs uppercase tracking-widest transition-colors duration-150",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {locale}
          </Button>
        );
      })}
    </div>
  );
}
