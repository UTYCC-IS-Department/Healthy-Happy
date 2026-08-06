import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hasLocale, locales } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import type { ShellMessages } from "@/i18n/message-types";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const messages = await getMessages<ShellMessages>(locale, "shell");

  return (
    <div lang={locale} className="flex min-h-screen flex-col">
      <SiteHeader locale={locale} messages={messages.header} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} messages={messages.footer} />
    </div>
  );
}
