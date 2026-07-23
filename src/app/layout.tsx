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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full" suppressHydrationWarning>{children}</body>
    </html>
  );
}
