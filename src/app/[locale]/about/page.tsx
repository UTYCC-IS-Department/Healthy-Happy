import Image from "next/image";
import { FlaskConical, Leaf, Sprout, Users } from "lucide-react";
import type { ReactNode } from "react";
import { assets } from "@/lib/site-data";
import Headline from "@/components/about_us_comp/HeadLine";
import ResearchInnovation from "@/components/about_us_comp/ResearchInnovation";
import WhereCanBuy from "@/components/about_us_comp/WhereCanBuy";
import Sustainability from "@/components/about_us_comp/Sustainability";
import CoreIdentity from "@/components/about_us_comp/CoreIdentity";

const retailers = [
  "Grandmother Hospital",
  "Shan Dila Pharmacy",
  "Ku Kin Tin Pharmacy",
  "Market Plaza",
  "CityMart",
  "Healthy & Happy Store",
  "Family Pharmacy",
  "Local Partners",
];
export default function AboutPage() {
  return (
    <div className="w-full">
      <Headline/>
      <div className="w-full h-60 sm:h-4 md:h-5 bg-[#16b300]" />
      <CoreIdentity/>
      <Sustainability/>
      <ResearchInnovation />
      <WhereCanBuy retailers={retailers} />
    </div>
  );
}
function Value({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="rounded-2xl border bg-white p-5">
      <span className="text-primary">{icon}</span>
      <h3 className="mt-3 text-lg font-bold text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
    </article>
  );
}
