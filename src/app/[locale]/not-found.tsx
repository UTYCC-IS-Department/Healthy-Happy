"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import en from "../../../messages/en/not-found.json";
import my from "../../../messages/my/not-found.json";

export default function NotFound() {
  const isBurmese = usePathname()?.startsWith("/my");
  const messages = isBurmese ? my : en;
  const homePath = isBurmese ? "/my" : "/en";
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <AlertCircle className="mb-6 size-16 text-muted" />
      <h1 className="mb-4 text-4xl font-bold text-primary">404</h1>
      <p className="mb-8 text-xl text-muted">{messages.title}</p>
      <Link href={homePath} className="rounded-full bg-primary px-6 py-3 font-medium text-white">
        {messages.action}
      </Link>
    </div>
  );
}
