import { notFound } from "next/navigation";
import ChatClient from "./chat-client";
import { hasLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import type { AiChatMessages } from "@/i18n/message-types";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://healthyandhappymyanmar.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMm = locale === "my";

  const title = isMm
    ? "AI အာဟာရနှင့် ကျန်းမာရေးလက်ထောက်"
    : "AI Wellness & Nutrition Assistant";

  const description = isMm
    ? "Healthy & Happy Myanmar ၏ AI အာဟာရလက်ထောက်နှင့် စကားပြောဆိုပြီး သင့်ကျန်းမာရေးအတွက် သင့်တော်သော အစားအစာများကို မေးမြန်းပါ။"
    : "Chat with Healthy & Happy AI Wellness Assistant for personalized snack recommendations, nutrition facts, and wellness tips.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/chat`,
      languages: {
        en: `${SITE_URL}/en/chat`,
        my: `${SITE_URL}/my/chat`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/chat`,
      siteName: "Healthy & Happy Myanmar",
      type: "website",
    },
  };
}

export default async function AiChatPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const messages = await getMessages<AiChatMessages>(locale, "ai-chat");

  return <ChatClient locale={locale} messages={messages} />;
}
