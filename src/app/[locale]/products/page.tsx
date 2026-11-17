import { notFound } from "next/navigation";
import { ProductsClient } from "./products-client";
import { buildLocalizedProducts, hasLocale, type ProductListMessages } from "@/lib/product-catalog";
import type { ProductDetailMessages } from "@/lib/product-catalog";
import { getMessages } from "@/i18n/get-messages";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://healthyandhappymyanmar.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isMm = locale === "my";

  const title = isMm ? "ထုတ်ကုန်များ" : "Products & Snacks";

  const description = isMm
    ? "Healthy & Happy Myanmar ၏ သဘာဝအာဟာရပြည့် ကွတ်ကီးများ၊ မြေပဲထောပတ်နှင့် ကျန်းမာရေးနှင့်ညီညွတ်သော သရေစာမုန့်များ။"
    : "Explore our range of healthy snacks — Iron Enriched Cookies, Peanut Butter, Protein Bites, Energy Bars, and Spinach Cookies.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/products/`,
      languages: {
        en: `${SITE_URL}/en/products/`,
        my: `${SITE_URL}/my/products/`,
        "x-default": `${SITE_URL}/en/products/`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/products/`,
      siteName: "Healthy & Happy Myanmar",
      images: [
        {
          url: "https://res.cloudinary.com/dh6jges3r/image/upload/f_auto/q_auto/c_limit,w_1600/healthy-happy-site/images/healthy-happy/Healthy_and_Happy_Products_(1)_1_1784649192453",
          width: 1200,
          height: 630,
          alt: "Healthy & Happy Myanmar Products",
        },
      ],
      locale: isMm ? "my_MM" : "en_US",
      type: "website",
    },
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const [messages, detailMessages] = await Promise.all([
    getMessages<ProductListMessages>(locale, "product"),
    getMessages<ProductDetailMessages>(locale, "product-detail"),
  ]);
  return <ProductsClient locale={locale} products={buildLocalizedProducts(messages, detailMessages)} messages={messages} />;
}
