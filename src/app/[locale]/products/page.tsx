"use client";
import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { assets, products } from "@/lib/site-data";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.series.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 pb-4 pt-8 text-center">
        <h1 className="text-2xl font-bold">Explore Our Products</h1>
      </header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mb-6 h-56 overflow-hidden rounded-xl">
          <Image
            src={assets.banner}
            alt="Healthy & Happy products"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="mb-6 flex items-center gap-3">
          <span className="whitespace-nowrap text-sm font-medium text-muted">
            Total Items-{filtered.length}
          </span>
          <label className="relative flex-1">
            <span className="sr-only">Search products</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
              className="w-full rounded-md border bg-white px-4 py-2 pr-10 text-sm"
            />
            <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          </label>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md border bg-white px-3 py-2 text-sm"
          >
            <SlidersHorizontal className="size-4" />
            Filter
          </button>
        </div>
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="pb-12 text-center text-muted">No products match your search.</p>
        )}
        <NewsBanner />
      </div>
    </div>
  );
}
function NewsBanner() {
  return (
    <div className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#e5e5e5] px-6 py-5">
      <p className="text-sm font-medium">Check Out news for last updated products</p>
      <button type="button" className="rounded-lg bg-[#6b6b6b] px-4 py-2 text-sm text-white">
        Check out updated news →
      </button>
    </div>
  );
}
