import { notFound } from "next/navigation";
import ChatClient from "./chat-client";
import { hasLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import type { AiChatMessages } from "@/i18n/message-types";

export default async function AiChatPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const messages = await getMessages<AiChatMessages>(locale, "ai-chat");

  return <ChatClient locale={locale} messages={messages} />;
}
