## 1. Localization foundation

- [x] 1.1 Add typed `en`/`my` locale validation and server-side dictionary loading compatible with Next.js App Router.
- [x] 1.2 Add matching `messages/en/` and `messages/my/` `product.json` and `product-detail.json` files with identical stable product-ID and UI-copy keys; populate Burmese content as Unicode text.
- [x] 1.3 Separate locale-neutral product IDs/media metadata from localized catalog attributes and validate that both language resources satisfy the expected shape.
- [x] 1.4 Configure and verify a Myanmar-capable global font/fallback stack without reducing English readability.

## 2. Locale-aware product experiences

- [x] 2.1 Update the locale layout and static generation to accept `en` and `my`, reject unsupported locales, and generate both locale segments.
- [x] 2.2 Refactor the products listing into server/client boundaries that load the selected locale’s copy and retain client-side localized search.
- [x] 2.3 Update `ProductCard` and listing actions to build locale-aware product and related links.
- [x] 2.4 Update product-detail loading, static params, labels, product attributes, and return/order/news links for the active locale.

## 3. Verification

- [x] 3.1 Verify JSON syntax and English/Burmese resource-key parity, including all current product IDs.
- [x] 3.2 Run `npm run typecheck` and `npm run build`.
- [x] 3.3 Smoke-test English and Burmese listing/detail paths, locale-preserving navigation, localized search, invalid product IDs, and readable Unicode Burmese glyphs.
