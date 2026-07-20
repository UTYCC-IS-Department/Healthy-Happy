"use client";

import { useTranslations } from "next-intl";
import { AnimatedContent } from "@/components/animated-content";
import { CommandCopy } from "@/components/command-copy";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label={t("brand")}>
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">H</span>
          <span className="text-sm font-bold tracking-tight sm:text-base">{t("brand")}</span>
        </a>
        <LanguageSwitcher />
      </header>

      <AnimatedContent>
        <section id="top" className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:pb-28">
          <div>
            <Badge className="border-[#b9d9c3] bg-[#e7f3ea] text-primary">{t("setupBadge")}</Badge>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#6d8b7a]">{t("heroEyebrow")}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-6xl">{t("heroTitle")}</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">{t("heroDescription")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#included"><Button className="w-full sm:w-auto">{t("primaryAction")}</Button></a>
              <a href="#guide"><Button variant="outline" className="w-full sm:w-auto">{t("secondaryAction")}</Button></a>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-line border-y border-line py-5">
              <Stat value={t("statOneValue")} label={t("statOneLabel")} />
              <Stat value={t("statTwoValue")} label={t("statTwoLabel")} />
              <Stat value={t("statThreeValue")} label={t("statThreeLabel")} />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -right-10 -top-10 size-32 rounded-full border border-[#b8dcc4] bg-[#e2f0e5] opacity-80" />
            <Card className="relative overflow-hidden border-[#c9ded0] bg-[#edf7ef] shadow-[0_24px_70px_rgba(31,83,59,0.12)]">
              <div className="h-2 bg-[#6eb38a]" />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Badge className="border-[#c7e2cf] bg-white text-primary">{t("wellnessTitle")}</Badge>
                  <span className="text-xs font-semibold text-[#6d8b7a]">08:30</span>
                </div>
                <CardTitle className="pt-5 text-2xl leading-tight">{t("wellnessDescription")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex gap-2" aria-hidden="true">
                  <span className="h-2 flex-1 rounded-full bg-[#4c9b70]" />
                  <span className="h-2 flex-1 rounded-full bg-[#8ac39d]" />
                  <span className="h-2 flex-1 rounded-full bg-[#c8e3cf]" />
                  <span className="h-2 flex-1 rounded-full bg-[#c8e3cf]" />
                  <span className="h-2 flex-1 rounded-full bg-[#c8e3cf]" />
                </div>
                <Button variant="outline" className="w-full border-[#b8d6c2] bg-white">{t("wellnessAction")}</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="included" className="border-y border-line bg-white/60">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d8b7a]">{t("sectionEyebrow")}</p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{t("sectionTitle")}</h2>
              <p className="max-w-xl text-base leading-8 text-muted">{t("sectionDescription")}</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <Card className="border-[#d9e6dd] bg-white">
                <CardHeader>
                  <Badge className="w-fit border-[#d1e6d7] bg-[#f0f8f2] text-primary">{t("componentTag")}</Badge>
                  <CardTitle className="pt-3">{t("componentTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="leading-7 text-muted">{t("componentDescription")}</CardContent>
              </Card>
              <Card className="border-[#d9e6dd] bg-[#f5faf6]">
                <CardHeader>
                  <span className="text-3xl" aria-hidden="true">✦</span>
                  <CardTitle className="pt-2">{t("wellnessTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="leading-7 text-muted">{t("wellnessDescription")}</CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="guide" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <Card className="overflow-hidden border-[#c9ded0] bg-[#dfeee3]">
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:p-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4c8062]">{t("guideEyebrow")}</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{t("guideTitle")}</h2>
              </div>
              <div>
                <p className="leading-7 text-[#527062]">{t("guideDescription")}</p>
                <div className="mt-6"><CommandCopy command={t("guideCommand")} /></div>
              </div>
            </div>
          </Card>
        </section>
      </AnimatedContent>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-line px-5 py-7 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <span>{t("brand")}</span>
        <span>{t("footerNote")}</span>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 first:pl-0 last:pr-0 sm:px-5">
      <div className="text-xl font-semibold">{value}</div>
      <div className="mt-1 text-xs leading-5 text-muted">{label}</div>
    </div>
  );
}
