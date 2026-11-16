import { notFound } from "next/navigation";
import HomeClient from "./home-client";
import { hasLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import type { HomeMessages } from "@/i18n/message-types";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return <HomeClient locale={locale} messages={await getMessages<HomeMessages>(locale, "home")} />;
}
