import { notFound } from "next/navigation";
import AwardsClient from "./awards-client";
import { hasLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import type { AwardsMessages } from "@/i18n/message-types";

export default async function AwardsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return <AwardsClient messages={await getMessages<AwardsMessages>(locale, "awards")} />;
}
