import { notFound } from "next/navigation";
import AwardsClient from "./awards-client";
import { hasLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import type { AwardsMessages } from "@/i18n/message-types";
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
    ? "ဂုဏ်ပြုဆုတံဆိပ်များနှင့် အသိအမှတ်ပြုလက်မှတ်များ"
    : "Awards & Certifications";

  const description = isMm
    ? "Healthy & Happy Myanmar ရရှိထားသော နိုင်ငံတော်အဆင့် ထူးချွန်ဆုတံဆိပ်များ၊ ISO နှင့် FDA အသိအမှတ်ပြုလက်မှတ်များ။"
    : "Explore the national excellence awards, food safety certifications, and ISO standard achievements of Healthy & Happy Myanmar.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/awards/`,
      languages: {
        en: `${SITE_URL}/en/awards/`,
        my: `${SITE_URL}/my/awards/`,
        "x-default": `${SITE_URL}/en/awards/`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/awards/`,
      siteName: "Healthy & Happy Myanmar",
      images: [
        {
          url: "https://res.cloudinary.com/dh6jges3r/image/upload/f_auto/q_auto/c_limit,w_1600/healthy-happy-site/images/healthy-happy/award_1784649192452",
          width: 1200,
          height: 630,
          alt: "Healthy & Happy Myanmar Awards",
        },
      ],
      type: "website",
    },
  };
}

export default async function AwardsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return <AwardsClient messages={await getMessages<AwardsMessages>(locale, "awards")} />;
}
