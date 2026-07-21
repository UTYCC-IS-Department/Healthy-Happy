import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import { assets } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-white">
      <div className="bg-secondary/20 px-4 py-4 text-center text-sm font-medium text-primary">
        Check out our news for the latest updated products!{" "}
        <Link
          href="/en/products"
          className="ml-2 inline-flex items-center gap-1 font-bold hover:text-[#27303a]"
        >
          Shop Now <ArrowRight className="size-3" />
        </Link>
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-md border bg-white p-1">
              <Image
                src={assets.logo}
                alt="Healthy & Happy Myanmar Logo"
                width={63}
                height={33}
                className="h-10 w-auto"
              />
            </span>
            <span className="font-serif text-lg font-bold text-primary">Healthy &amp; Happy</span>
          </div>
          <p className="font-serif text-sm italic text-muted">
            “Daily Nutrition Partner, Every Step of the Way”
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              Yatanarpon Cyber City, Myanmar
            </p>
            <p className="flex gap-2">
              <Phone className="size-4 shrink-0 text-primary" />
              +95 969650030
            </p>
            <p className="flex gap-2 break-all">
              <Mail className="size-4 shrink-0 text-primary" />
              healthyandhappygroup2017@gmail.com
            </p>
          </div>
          <div className="flex gap-4 text-primary">
            <a aria-label="Facebook" href="#">
              <SiFacebook />
            </a>
            <a aria-label="TikTok" href="#">
              <SiTiktok />
            </a>
            <a aria-label="Instagram" href="#">
              <SiInstagram />
            </a>
            <a aria-label="WhatsApp" href="#">
              <SiWhatsapp />
            </a>
          </div>
        </div>
        <FooterColumn
          title="Company"
          links={[
            ["About Us", "/en/about"],
            ["Our Mission & Vision", "/en/about#mission"],
            ["Sustainability", "/en/about#sustainability"],
            ["Awards & Media", "/en/awards"],
          ]}
        />
        <FooterColumn
          title="Products"
          links={[
            ["All Products", "/en/products"],
            ["Nut Diabetes Cookies", "/en/products/nut-cookies-1"],
            ["Spinach Cookies", "/en/products/spinach-cookies-1"],
            ["Protein Bites", "/en/products"],
          ]}
        />
        <FooterColumn
          title="Support"
          links={[
            ["Contact Us", "/en/contact"],
            ["Rewards Program", "/en/rewards"],
            ["Where to Buy", "/en/about#locations"],
          ]}
        />
      </div>
      <div className="bg-primary px-4 py-4 text-xs font-medium text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">
          <p>© 2026 Healthy &amp; Happy | All rights reserved</p>
          <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1">
            Product of Myanmar
          </span>
        </div>
      </div>
    </footer>
  );
}
function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h3 className="mb-4 font-serif text-lg font-bold text-primary">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-muted hover:text-primary">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
