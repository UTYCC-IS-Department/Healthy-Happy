import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
