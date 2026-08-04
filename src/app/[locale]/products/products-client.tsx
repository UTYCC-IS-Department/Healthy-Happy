"use client";

import Image from "next/image";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Locale, Product, ProductListMessages } from "@/lib/product-catalog";
import { assets } from "@/lib/site-data";

export function ProductsClient({
  locale,
  products,
  messages,
}: {
  locale: Locale;
  products: Product[];
  messages: ProductListMessages;
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = useMemo(
    () => [...new Set(products.flatMap((product) => product.tags))],
    [products],
  );
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filtered = products.filter((product) => {
    const matchesSearch =
      !normalizedSearch ||
      product.name.toLocaleLowerCase().includes(normalizedSearch) ||
      product.series.toLocaleLowerCase().includes(normalizedSearch);
    return matchesSearch && (!activeCategory || product.tags.includes(activeCategory));
  });
  const hasActiveFilters = Boolean(search.trim() || activeCategory);
  const resultCount = messages.resultsCount.replace("{count}", String(filtered.length));

  function clearFilters() {
    setSearch("");
    setActiveCategory(null);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 pb-4 pt-8 text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight">{messages.title}</h1>
      </header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mb-8 h-56 overflow-hidden rounded-3xl sm:h-72 lg:h-80">
          <Image
            src={assets.banner}
            alt={messages.bannerAlt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
        </div>
        <section
          aria-label={messages.filter}
          className="mb-8 rounded-2xl border bg-card p-4 sm:p-5"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-primary">{messages.totalItems}</p>
                <p
                  aria-live="polite"
                  className="rounded-full bg-[#eef1e8] px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {resultCount}
                </p>
              </div>
              <label className="relative w-full sm:ml-auto sm:w-64">
                <span className="sr-only">{messages.searchLabel}</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={messages.searchPlaceholder}
                  className="w-full rounded-full border bg-background px-4 py-2.5 pr-10 text-sm font-medium placeholder:text-muted"
                />
                <Search
                  aria-hidden="true"
                  className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                />
              </label>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <p className="shrink-0 text-sm font-semibold text-foreground">{messages.filter}</p>
              <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button
                  type="button"
                  aria-pressed={!activeCategory}
                  onClick={() => setActiveCategory(null)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${!activeCategory ? "border-primary bg-primary text-white" : "bg-background text-foreground hover:border-primary"}`}
                >
                  {messages.allCategories}
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${activeCategory === category ? "border-primary bg-primary text-white" : "bg-background text-foreground hover:border-primary"}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            {hasActiveFilters && (
              <div className="flex items-center justify-between gap-3 border-t pt-3 text-sm">
                <span className="font-medium text-muted">{messages.activeFilters}</span>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4"
                >
                  <X aria-hidden="true" className="size-4" />
                  {messages.clearFilters}
                </button>
              </div>
            )}
          </div>
        </section>
        <div className="w-full">
          {filtered.length > 0 ? (
            <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                  bestSellerLabel={messages.bestSeller}
                />
              ))}
            </div>
          ) : (
            <div className="mb-12 rounded-3xl border border-dashed bg-card px-6 py-16 text-center">
              <p className="text-base font-semibold text-foreground">{messages.noResults}</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
              >
                {messages.clearFilters}
              </button>
            </div>
          )}
        </div>
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#e5e5e5] px-6 py-5">
          <p className="text-sm font-medium">{messages.newsText}</p>
          <a
            href={`/${locale}/products`}
            className="rounded-lg bg-[#6b6b6b] px-4 py-2 text-sm text-white"
          >
            {messages.newsAction} →
          </a>
        </div>
      </div>
    </div>
  );
}
