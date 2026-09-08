"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { assets } from "@/lib/site-data";
import type { Locale } from "@/i18n/config";
import type { ShellMessages } from "@/i18n/message-types";
import "flag-icons/css/flag-icons.min.css";

function localePath(pathname: string | null, locale: Locale) {
  if (!pathname) return `/${locale}`;
  return pathname.replace(/^\/(en|my)(?=\/|$)/, `/${locale}`);
}

function persistLocale(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function SiteHeader({
  locale,
  messages,
}: {
  locale: Locale;
  messages: ShellMessages["header"];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    [messages.links.home, ""],
    [messages.links.about, "/about"],
    [messages.links.products, "/products"],
    [messages.links.awards, "/awards"],
    [messages.links.contact, "/contact"],
  ] as const;
  const localizedLinks = links.map(([label, suffix]) => [label, `/${locale}${suffix}`] as const);
  return (
    <nav className="sticky top-0 z-50 bg-[#3d4a2e] text-white shadow-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <span className=" p-1">
            <Image
              src={assets.logo}
              alt={messages.brandAlt}
              width={90}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </span>
          <span className="hidden font-serif text-xl font-bold tracking-wide sm:block">
            {messages.brandName}
          </span>
        </Link>

        <div className="hidden items-center lg:flex">
          {/* nav links */}
          <div className="flex items-center gap-6 lg:flex">
            {localizedLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="py-1 text-sm font-medium hover:underline underline-offset-4"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="ml-2 flex items-center gap-1  pl-4">
            <Link
              href={localePath(pathname, "my")}
              onClick={() => persistLocale("my")}
              className="rounded transition-transform hover:scale-110"
              aria-label={messages.languages.burmese}
            >
              <span className="fi fi-mm text-1xl"></span>
            </Link>

            <Link
              href={localePath(pathname, "en")}
              onClick={() => persistLocale("en")}
              className="rounded transition-transform hover:scale-110"
              aria-label={messages.languages.english}
            >
              <span className="fi fi-gb text-1xl"></span>
            </Link>
          </div>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? messages.closeNavigation : messages.openNavigation}
          aria-expanded={mobileOpen}
          className="p-2 lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/15 px-4 pb-4 pt-2 lg:hidden">
          {localizedLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-md px-2 py-3 text-base font-medium ${
                pathname === href ? "bg-white/10 text-secondary" : "hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="mt-3 border-t border-white/20 pt-3">
            <Link
              href={localePath(pathname, "my")}
              onClick={() => {
                persistLocale("my");
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 rounded-md px-2 py-3 hover:bg-white/10"
            >
              <span className="fi fi-mm text-xl"></span>
              <span className="text-base font-medium">{messages.languages.burmese}</span>
            </Link>

            <Link
              href={localePath(pathname, "en")}
              onClick={() => {
                persistLocale("en");
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 rounded-md px-2 py-3 hover:bg-white/10"
            >
              <span className="fi fi-gb text-xl"></span>
              <span className="text-base font-medium">{messages.languages.english}</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
