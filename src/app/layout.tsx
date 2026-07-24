import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// Configure the Roboto font
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Healthy & Happy",
  description: "A thoughtful wellness foundation for Myanmar and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${roboto.variable}`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}