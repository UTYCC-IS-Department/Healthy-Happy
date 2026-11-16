## Why

The product listing and product detail pages currently render English-only copy, English product content, and `/en`-specific links. Myanmar visitors cannot use equivalent `/my/products` or `/my/products/[id]` pages with Unicode Burmese content.

This change introduces an explicit, maintainable product localization boundary now so English and Burmese product copy can evolve independently without duplicating page components.

## What Changes

- Support `en` and `my` locale segments for the product listing and every valid product-detail route.
- Add matching English and Unicode Burmese product message resources named `product.json` and `product-detail.json`.
- Move product-list UI copy and product-detail labels/actions into their page-specific message resources.
- Move locale-dependent product names, series, descriptions, ingredients, prices, and tags out of the English-only catalog data while retaining locale-neutral IDs and image metadata.
- Make product cards, return/order/news links, search behavior, and language switching preserve the active locale.
- Keep English as the default locale; additional locales remain out of scope for this change but the resource loader will be extensible.

## Capabilities

### New Capabilities

- `localized-product-catalog`: Provides locale-specific product-list and product-detail content from separate English and Unicode Burmese resources while preserving stable product IDs and media.

### Modified Capabilities

- `bilingual-navigation`: Product list and product-detail routes must support both locale segments and preserve the selected locale in product navigation.
- `localized-wellness-content`: Product-page public copy and product attributes must be externalized into page-specific English and Unicode Burmese message resources.

## Impact

- Affected routes: `src/app/[locale]/products/page.tsx` and `src/app/[locale]/products/[id]/page.tsx`.
- Affected shared code: locale validation/layout, product data access, `ProductCard`, and any shared language control/link helpers.
- New message files will be introduced under the project’s localization directory for both languages: `product.json` and `product-detail.json`.
- No backend API or third-party dependency is required. Burmese messages must be Unicode-only and rendered with a Myanmar-capable font/fallback stack; Zawgyi conversion is out of scope.
