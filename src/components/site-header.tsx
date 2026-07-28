"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { assets } from "@/lib/site-data";
import "flag-icons/css/flag-icons.min.css";

const links = [
  ["Home", "/en"],
  ["About Us", "/en/about"],
  ["Products", "/en/products"],
  ["Rewards", "/en/rewards"],
  ["Awards", "/en/awards"],
  ["Contact Us", "/en/contact"],
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 bg-[#2dc100] text-white shadow-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link href="/en" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span className=" p-1">
            <Image
              src={assets.logo}
              alt="Healthy & Happy Myanmar Logo"
              width={76}
              height={40}
              className="h-12 w-auto object-contain"
              priority
            />
          </span>
          <span className="hidden font-serif text-xl font-bold tracking-wide sm:block">
            Healthy &amp; Happy
          </span>
        </Link>

        <div className="hidden items-center lg:flex">
          {/* nav links */}
          <div className="flex items-center gap-6 lg:flex">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={` py-1 text-sm font-medium transition-colors hover:text-[#fe0002] ${pathname === href ? "border-secondary text-secondary" : "border-transparent"}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="ml-2 flex items-center gap-1  pl-4">
            <Link
              href="/mm"
              className="rounded transition-transform hover:scale-110"
              aria-label="Myanmar"
            >
              <span className="fi fi-mm text-1xl"></span>
            </Link>

            <Link
              href="/en"
              className="rounded transition-transform hover:scale-110"
              aria-label="English"
            >
              <span className="fi fi-gb text-1xl"></span>
            </Link>


          </div>
        </div>


        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          className="p-2 lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/15 px-4 pb-4 pt-2 lg:hidden">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-md px-2 py-3 text-base font-medium ${pathname === href
                ? "bg-white/10 text-secondary"
                : "hover:bg-white/10"
                }`}
            >
              {label}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="mt-3 border-t border-white/20 pt-3">
            <Link
              href="/mm"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-md px-2 py-3 hover:bg-white/10"
            >
              <span className="fi fi-mm text-xl"></span>
              <span className="text-base font-medium">မြန်မာ</span>
            </Link>

            <Link
              href="/en"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-md px-2 py-3 hover:bg-white/10"
            >
              <span className="fi fi-gb text-xl"></span>
              <span className="text-base font-medium">English</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
