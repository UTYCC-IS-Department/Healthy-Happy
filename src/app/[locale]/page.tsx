import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function IndexPage({ params }: { params: Promise<{ locale:string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  setRequestLocale(localeParam);
  return <HomePage />;
}