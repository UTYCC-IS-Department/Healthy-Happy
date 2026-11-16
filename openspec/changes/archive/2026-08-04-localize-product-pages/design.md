## Context

Healthy & Happy uses Next.js 16 App Router locale segments, but the current locale layout only admits `en`. The product listing is a Client Component for search and the detail route is a Server Component, while both read English-only product data and use hard-coded `/en` links. No localization library is currently installed.

The existing public route design already reserves `[locale]`; this change restores that contract only for the product listing and detail flow. English remains the default locale and Burmese content is Unicode-only.

## Goals / Non-Goals

**Goals:**

- Deliver equivalent `/en/products`, `/my/products`, `/en/products/[id]`, and `/my/products/[id]` experiences for every valid stable product ID.
- Store English and Burmese catalog copy in separate, page-scoped JSON resources: `product.json` and `product-detail.json` for each locale.
- Keep product IDs, images, thumbnails, and other locale-neutral presentation metadata in typed code.
- Ensure all product-page links and search text use the current locale.
- Use a Myanmar-capable font/fallback stack with Unicode Burmese content.

**Non-Goals:**

- Translating non-product routes or site-shell copy in this change.
- Adding a CMS, database, product API, currency conversion, or a third-party translation service.
- Supporting Zawgyi input/content, automatic machine translation, or locales beyond `en` and `my`.

## Decisions

### Use Next.js dictionary modules instead of adding an i18n dependency

Create a small server-only locale module that validates the supported locale and dynamically imports JSON dictionaries. This follows the installed Next.js internationalization guidance, avoids reintroducing an unneeded package, and keeps JSON resources server-side for the Server Component detail route.

The supported-locale list will become the single source of truth used by the locale layout, product routes, and static parameter generation. Locale selection remains URL-led; the existing root redirect can continue to default to `/en` until the broader persistence work is implemented.

Alternatives considered:

- `next-intl`: rejected for this scoped change because it is not installed and the product-only dictionary requirements do not need its client hooks.
- Hard-coded translation objects in page files: rejected because translators cannot maintain them cleanly and it violates the external-resource requirement.

### Split product messages by page concern

Use the following layout:

```
messages/
  en/
    product.json
    product-detail.json
  my/
    product.json
    product-detail.json
```

`product.json` holds listing copy and card-level product fields. `product-detail.json` holds detail labels, actions, and product-detail fields. Both use stable product IDs as object keys. Shared data only contains product IDs and media metadata; it contains no user-facing English product text.

This explicit split matches the requested filenames, allows list and detail content to change independently, and gives both locale directories the same key shape. TypeScript will derive or validate against the English dictionary shape so a missing Burmese key fails during development/build rather than rendering an empty value.

### Preserve the locale through route composition

Read `locale` alongside `id` in the detail route and build list, card, return, and contact URLs from that validated value. The product listing will load its dictionary in a Server Component and pass only the localized catalog and UI strings into a focused client search component, preserving existing client-side filtering without shipping both language files.

The locale layout will statically enumerate `en` and `my`. The detail route will generate the product IDs under each parent locale so production builds create both locale/product combinations.

### Use Unicode Burmese and a Myanmar fallback stack

All `my` JSON values will be Unicode Burmese. Global typography will include a Myanmar-capable fallback after the existing Latin font choices. No conversion library or Zawgyi content is permitted.

## Risks / Trade-offs

- [Burmese glyphs vary by platform/font availability] → Define a Myanmar-capable fallback and manually inspect `/my/products` and a `/my/products/[id]` page in a browser.
- [JSON resources drift between English and Burmese] → Keep identical IDs/key shapes and add a validation/typecheck step for both files.
- [Client-side search can accidentally compare untranslated values] → Pass the selected locale’s catalog records and search only their localized name/series fields.
- [Locale links regress to `/en`] → Centralize locale-aware product URLs and include both locales in route smoke tests.
- [Localized static pages are omitted] → Generate locales at the layout level and verify built output/HTTP responses for both product paths.

## Migration Plan

1. Add dictionaries and the typed locale/catalog loader without removing existing product metadata.
2. Convert product listing, card, and detail rendering to receive locale-specific strings and links.
3. Enable `my` in locale validation/static generation and add the font fallback.
4. Verify JSON shape, typecheck, production build, and English/Burmese product route behavior.
5. Roll back by reverting this change; existing English product URLs and media metadata remain intact.

## Open Questions

- None. The change uses the current product names, prices, and assets as the English baseline, with matching Unicode Burmese translations added during implementation.
