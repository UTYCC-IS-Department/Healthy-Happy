import { notFound } from "next/navigation";
import HomeClient from "./home-client";
import { hasLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import type { HomeMessages } from "@/i18n/message-types";
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
    ? "Healthy & Happy Myanmar | ကျန်းမာရေးနှင့်ညီညွတ်သော သရေစာမုန့်များ"
    : "Healthy & Happy Myanmar | Nutritious & Organic Wellness Snacks";

  const description = isMm
    ? "Healthy & Happy Myanmar — သဘာဝစစ်စစ် ကုန်ကြမ်းများဖြင့် ပြုလုပ်ထားသော အာဟာရပြည့် ကွတ်ကီးများနှင့် သရေစာမုန့်များ။"
    : "Healthy & Happy Myanmar — thoughtful wellness foundation creating iron-enriched cookies, organic snacks, and wholesome nutrition.";

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/`,
      languages: {
        en: `${SITE_URL}/en/`,
        my: `${SITE_URL}/my/`,
        "x-default": `${SITE_URL}/en/`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/`,
      siteName: "Healthy & Happy Myanmar",
      images: [
        {
          url: "https://res.cloudinary.com/dh6jges3r/image/upload/f_auto/q_auto/c_limit,w_1600/healthy-happy-site/images/healthy-happy/Healthy_and_Happy_Products_(1)_1_1784649192453",
          width: 1200,
          height: 630,
          alt: "Healthy & Happy Myanmar",
        },
      ],
      locale: isMm ? "my_MM" : "en_US",
      type: "website",
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return <HomeClient locale={locale} messages={await getMessages<HomeMessages>(locale, "home")} />;
}
