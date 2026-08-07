import Headline from "@/components/about_us_comp/HeadLine";

import ResearchInnovation from "@/components/about_us_comp/ResearchInnovation";

import WhereCanBuy from "@/components/about_us_comp/WhereCanBuy";

import Sustainability from "@/components/about_us_comp/Sustainability";

import CoreIdentity from "@/components/about_us_comp/CoreIdentity";

import { notFound } from "next/navigation";

import { hasLocale } from "@/i18n/config";

import { getMessages } from "@/i18n/get-messages";

import type { AboutMessages } from "@/i18n/message-types";



export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {

  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const messages = await getMessages<AboutMessages>(locale, "about");

  return (

    <div className="w-full">

      <Headline messages={messages.headline} />

      <div className="w-full h-3 sm:h-4 md:h-5 bg-[#16b300]" />

      <CoreIdentity messages={messages.coreIdentity} />

      <Sustainability messages={messages.sustainability} />

      <ResearchInnovation locale={locale} messages={messages.research} />

      <WhereCanBuy messages={messages.whereCanBuy} />

    </div>

  );

}

function Value({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {

  return (

    <article className="rounded-2xl border bg-white p-5">

      <span className="text-primary">{icon}</span>

      <h3 className="mt-3 text-lg font-bold text-primary">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>

    </article>

  );

}

