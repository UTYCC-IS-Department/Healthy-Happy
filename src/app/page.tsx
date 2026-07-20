import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

export default async function RootPage() {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const requestHeaders = await headers();
  const acceptedLocales = requestHeaders.get("accept-language")?.split(",").map((value) => value.split(";")[0].trim()) ?? [];
  const browserLocale = acceptedLocales.find((value) => locales.includes(value as (typeof locales)[number]));
  const locale = savedLocale && isLocale(savedLocale) ? savedLocale : browserLocale ?? defaultLocale;

  redirect(`/${locale}`);
}
