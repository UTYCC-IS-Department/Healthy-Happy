import { notFound } from "next/navigation";
import ContactClient from "./contact-client";
import { hasLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/get-messages";
import type { ContactMessages } from "@/i18n/message-types";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://healthyandhappymyanmar.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMm = locale === "my";

  const title = isMm ? "ဆက်သွယ်ရန်" : "Contact Us";

  const description = isMm
    ? "Healthy & Happy Myanmar သို့ ဆက်သွယ်မေးမြန်းရန်၊ လက်လီလက်ကား မှာယူရန်နှင့် ရုံးချုပ်လိပ်စာ။"
    : "Contact Healthy & Happy Myanmar for retail inquiries, wholesale partnerships, and consumer support.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        en: `${SITE_URL}/en/contact`,
        my: `${SITE_URL}/my/contact`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/contact`,
      siteName: "Healthy & Happy Myanmar",
      images: [
        {
          url: "https://res.cloudinary.com/dh6jges3r/image/upload/f_auto/q_auto/c_limit,w_1600/healthy-happy-site/images/healthy-happy/contact_us_1784649192452",
          width: 1200,
          height: 630,
          alt: "Contact Healthy & Happy Myanmar",
        },
      ],
      type: "website",
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return <ContactClient messages={await getMessages<ContactMessages>(locale, "contact")} />;
}
