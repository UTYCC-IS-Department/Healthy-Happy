import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// Configure the Roboto font
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://healthyandhappymyanmar.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Healthy & Happy Myanmar | Nutritious & Organic Wellness Snacks",
    template: "%s | Healthy & Happy Myanmar",
  },
  description: "A thoughtful wellness foundation for Myanmar and beyond, creating nutritious, organic, and iron-fortified wellness cookies and snacks.",
  keywords: [
    "Healthy and Happy Myanmar",
    "Myanmar snacks",
    "organic cookies",
    "iron fortified cookies",
    "healthy snacks Yangon",
    "wellness food Myanmar",
    "protein bite",
    "peanut butter Myanmar",
  ],
  authors: [{ name: "Healthy & Happy Myanmar Co., Ltd." }],
  creator: "Healthy & Happy Myanmar",
  publisher: "Healthy & Happy Myanmar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${roboto.variable}`}>
      <body className="min-h-full font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}