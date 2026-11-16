import Headline from "@/components/about_us_comp/HeadLine";
import ResearchInnovation from "@/components/about_us_comp/ResearchInnovation";
import WhereCanBuy from "@/components/about_us_comp/WhereCanBuy";
import Sustainability from "@/components/about_us_comp/Sustainability";
import CoreIdentity from "@/components/about_us_comp/CoreIdentity";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import type { AboutMessages } from "@/i18n/message-types";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://healthyandhappymyanmar.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMm = locale === "my";

  const title = isMm ? "ကျွန်ုပ်တို့အကြောင်း" : "About Us";

  const description = isMm
    ? "Healthy & Happy Myanmar ၏ ရည်မှန်းချက်၊ သမိုင်းကြောင်း၊ သဘာဝအာဟာရပြည့် သရေစာမုန့်များ ထုတ်လုပ်မှုနှင့် သုတေသနလုပ်ငန်းစဉ်များ။"
    : "Discover Healthy & Happy Myanmar — pioneering organic, nutritious, and iron-fortified wellness cookies and snacks across Myanmar.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: {
        en: `${SITE_URL}/en/about`,
        my: `${SITE_URL}/my/about`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/about`,
      siteName: "Healthy & Happy Myanmar",
      images: [
        {
          url: "https://res.cloudinary.com/dh6jges3r/image/upload/f_auto/q_auto/c_limit,w_1600/healthy-happy-site/images/healthy-happy/Healthy_and_Happy_Products_(1)_1_1784649192453",
          width: 1200,
          height: 630,
          alt: "Healthy & Happy Myanmar Products and Innovation",
        },
      ],
      locale: isMm ? "my_MM" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://res.cloudinary.com/dh6jges3r/image/upload/f_auto/q_auto/c_limit,w_1600/healthy-happy-site/images/healthy-happy/Healthy_and_Happy_Products_(1)_1_1784649192453"],
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const messages = await getMessages<AboutMessages>(locale, "about");

  const breadcrumbs = [
    { name: locale === "my" ? "ပင်မစာမျက်နှာ" : "Home", url: `/${locale}` },
    { name: locale === "my" ? "ကျွန်ုပ်တို့အကြောင်း" : "About Us", url: `/${locale}/about` },
  ];

  return (
    <div className="w-full">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <Headline messages={messages.headline} />

      <div className="w-full h-3 sm:h-4 md:h-5 bg-[#16b300]" />

      <CoreIdentity messages={messages.coreIdentity} />

      <Sustainability messages={messages.sustainability} />

      <ResearchInnovation locale={locale} messages={messages.research} />

      <WhereCanBuy messages={messages.whereCanBuy} />
    </div>
  );
}
