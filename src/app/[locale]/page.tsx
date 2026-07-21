import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AboutUsPage as AboutUsPageComponent } from "@/components/about-us-page";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "AboutUs" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutUsPage({ params }: { params: Promise<{ locale:string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  setRequestLocale(localeParam);
  return <AboutUsPageComponent />;
}