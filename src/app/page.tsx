"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

function preferredLocale() {
  const saved = document.cookie.match(/(?:^|; )NEXT_LOCALE=(en|my)(?:;|$)/)?.[1];
  if (saved === "en" || saved === "my") return saved;
  return navigator.language.toLowerCase().startsWith("my") ? "my" : defaultLocale;
}

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${preferredLocale()}`);
  }, [router]);

  return null;
}
