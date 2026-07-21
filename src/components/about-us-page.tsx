import { getTranslations } from "next-intl/server";

export async function AboutUsPage() {
  const t = await getTranslations("AboutUs");

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
      <p className="text-lg leading-relaxed">
        {t("content")}
      </p>
    </main>
  );
}