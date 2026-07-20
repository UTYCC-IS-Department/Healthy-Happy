"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const options = [
  { value: "en", message: "languageEnglish" },
  { value: "my", message: "languageMyanmar" },
] as const;

export function LanguageSwitcher() {
  const pathname = usePathname();
  const t = useTranslations("home");
  const activeLocale = pathname.split("/")[1] === "my" ? "my" : "en";

  return (
    <div className="flex items-center gap-3" aria-label={t("languageLabel")}>
      <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted sm:inline">
        {t("languageLabel")}
      </span>
      <div className="flex rounded-full border bg-white p-1 shadow-sm" role="group" aria-label={t("activeLanguage")}>
        {options.map((option) => {
          const href = `/${option.value}`;
          const isActive = activeLocale === option.value;
          return (
            <Link
              key={option.value}
              href={href}
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${option.value}; Path=/; Max-Age=31536000; SameSite=Lax`;
              }}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "text-muted hover:bg-accent hover:text-foreground",
              )}
            >
              {t(option.message)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
