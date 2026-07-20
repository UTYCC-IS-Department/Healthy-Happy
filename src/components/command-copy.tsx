"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function CommandCopy({ command }: { command: string }) {
  const t = useTranslations("home");
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-[#102c24] p-3 sm:flex-row sm:items-center sm:justify-between">
      <code className="overflow-x-auto whitespace-nowrap px-2 text-sm text-[#d7f5e2]">{command}</code>
      <Button variant="outline" className="shrink-0 border-[#496b5d] bg-transparent text-[#e4f7e9] hover:bg-[#23483a] hover:text-white" onClick={copyCommand}>
        {copied ? t("copiedCommand") : t("copyCommand")}
      </Button>
    </div>
  );
}
