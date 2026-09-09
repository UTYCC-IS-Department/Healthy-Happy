import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  ShoppingBag,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import { assets } from "@/lib/site-data";
import type { Locale } from "@/i18n/config";
import type { ShellMessages } from "@/i18n/message-types";

export function SiteFooter({ locale, messages }: { locale: Locale; messages: ShellMessages["footer"] }) {
  return (
    <footer className="relative w-full bg-white text-neutral-800">
      {/* Connected Floating Green Banner */}
      <div className="bg-gradient-to-b from-[#f2f0e9] to-white from-50% to-50%">
        <div className="mx-auto max-w-5xl px-4 py-2 sm:px-10">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#15b000] px-6 py-6 shadow-md sm:flex-row sm:px-10 sm:py-9">
            <p className="text-center text-base font-bold text-white sm:text-left sm:text-lg">
              {messages.newsText}
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#6c6c6c] px-5 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800"
            >
              {messages.newsAction} <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="max-h-50 rounded-md border-none bg-white p-1 max-w-[100px]">
                <Image
                  src={assets.logo}
                  alt={messages.brandAlt}
                  width={80}
                  height={40}
                  className="h-auto w-full object-contain"
                />
              </span>
              <div>
                <h3 className="text-[25px] font-black leading-tight text-black">
                  Healthy &amp; Happy
                </h3>
                <p className="mt-3 text-[11px] font-bold text-black">
                  {messages.tagline}
                </p>
              </div>
            </div>

            <p className="max-w-sm text-xs font-extrabold leading-relaxed text-black">
              {messages.description}
            </p>

            <div className="space-y-2 text-xs font-medium text-neutral-700">
              <p className="mt-auto flex items-start gap-2 font-bold">
                <MapPin className="mt-0.5 size-4 shrink-0 text-black" />
                <span>
                  {messages.address}
                </span>
              </p>
              <p className="mt-5 flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-black" />
                +95 969650030
              </p>
              <p className="mt-5 flex items-center gap-2 break-all">
                <Mail className="size-4 shrink-0 text-black" />
                healthyandhappygroup2017@gmail.com
              </p>
            </div>

            <div className="pt-2">
              <p className="mb-2 text-xs font-bold text-black">
                {messages.follow}
              </p>
              <div className="flex gap-4 text-base text-black">
                <a aria-label={messages.social.facebook} href="#" className="hover:opacity-75">
                  <SiFacebook />
                </a>
                <a aria-label={messages.social.tiktok} href="#" className="hover:opacity-75">
                  <SiTiktok />
                </a>
                <a aria-label={messages.social.instagram} href="#" className="hover:opacity-75">
                  <SiInstagram />
                </a>
                <a aria-label={messages.social.whatsapp} href="#" className="hover:opacity-75">
                  <SiWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <FooterColumn
            title={messages.columns.company}
            icon={<Building2 className="size-4 text-black" />}
            links={[
              [messages.links.products, `/${locale}/products`],
              [messages.links.about, `/${locale}/about`],
              [messages.links.awards, `/${locale}/awards`],
              [messages.links.contact, `/${locale}/contact`],
            ]}
          />

          {/* Products Links */}
          <FooterColumn
            title={messages.columns.products}
            icon={<ShoppingBag className="size-4 text-black" />}
            links={[
              [messages.links.proteinBites, `/${locale}/products`],
              [messages.links.nutCookies, `/${locale}/products/nut-cookies-1`],
              [messages.links.spinachCookies, `/${locale}/products/spinach-cookies-1`],
            ]}
          />

          {/* Support Links */}
          <FooterColumn
            title={messages.columns.support}
            icon={<HelpCircle className="size-4 text-black" />}
            links={[
              [messages.links.help, `/${locale}/contact`],
              [messages.links.productInfo, `/${locale}/about#info`],
              [messages.links.faq, `/${locale}/faq`],
            ]}
          />
        </div>

        {/* Partner Boxes & "Product of Myanmar" Row */}
        <div className="mt-10 grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Left empty space under Brand Info */}
          <div className="hidden lg:block" />

          {/* Partner Boxes aligned under Company, Products, Support */}
          {/* <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-4 lg:col-span-2">
            <div className="flex h-12 w-full items-center justify-center bg-[#c28e8e] text-sm font-bold text-black sm:w-28">
              UTYCC
            </div>
            <div className="h-12 w-full bg-[#c28e8e] sm:w-28" />
            <div className="h-12 w-full bg-[#c28e8e] sm:w-28" />
            <div className="h-12 w-full bg-[#c28e8e] sm:w-28" />
          </div> */}

          {/* Product of Myanmar aligned on the right */}
          {/* <div className="text-center md:text-right">
            <span className="text-xl font-extrabold text-black">
              {messages.productOfMyanmar}
            </span>
          </div> */}
        </div>

        {/* Copyright Line */}
        <div className="mt-10 text-center text-xs font-bold text-black sm:mt-16">
          {messages.copyright}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  icon,
  links,
}: {
  title: string;
  icon?: React.ReactNode;
  links: string[][];
}) {
  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-base font-extrabold text-black">
        {icon}
        {title}
      </h3>
      <ul className="space-y-2 text-xs font-semibold text-neutral-800">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="transition hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
