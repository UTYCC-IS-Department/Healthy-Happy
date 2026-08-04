import { notFound } from "next/navigation";
import ContactClient from "./contact-client";
import { hasLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import type { ContactMessages } from "@/i18n/message-types";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return <ContactClient messages={await getMessages<ContactMessages>(locale, "contact")} />;
}
