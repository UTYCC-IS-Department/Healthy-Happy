import React from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://healthyandhappymyanmar.com";

export function OrganizationJsonLd({ locale = "en" }: { locale?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Healthy & Happy Myanmar Co., Ltd.",
    alternateName: "Healthy & Happy Myanmar",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: "https://res.cloudinary.com/dh6jges3r/image/upload/f_auto/q_auto/c_limit,w_1600/healthy-happy-site/images/healthy-happy/Healthy_-_Happy_Myanmar_Logo_1_1784649192455",
      width: "400",
      height: "200",
    },
    image: "https://res.cloudinary.com/dh6jges3r/image/upload/f_auto/q_auto/c_limit,w_1600/healthy-happy-site/images/healthy-happy/Healthy_and_Happy_Products_(1)_1_1784649192453",
    description:
      locale === "my"
        ? "ကျန်းမာရေးနှင့် ညီညွတ်သော သဘာဝအာဟာရပြည့် သရေစာမုန့်များ ထုတ်လုပ်ဖြန့်ချိရေး လုပ်ငန်းစု။"
        : "Producer and manufacturer of natural, nutritious, and iron-fortified wellness cookies and organic snacks in Myanmar.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MM",
      addressLocality: "Yangon",
    },
    sameAs: [
      "https://www.facebook.com/healthyandhappymyanmar",
      "https://www.instagram.com/healthyandhappymyanmar",
      "https://www.tiktok.com/@healthyandhappymyanmar",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English", "Burmese"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  image,
  url,
  inStock = true,
}: {
  name: string;
  description: string;
  image: string;
  url: string;
  inStock?: boolean;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    brand: {
      "@type": "Brand",
      name: "Healthy & Happy Myanmar",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "MMK",
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
