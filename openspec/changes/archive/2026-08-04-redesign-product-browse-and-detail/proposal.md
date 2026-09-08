## Why

The product page presents results as a horizontal carousel and exposes a non-functional filter control, making it difficult to browse a catalog or locate a specific item. A clearer product browsing experience and stronger product/detail card design will make the catalog easier to use on both mobile and desktop.

## What Changes

- Replace the horizontal product-card carousel with a responsive, scrollable page layout containing a product grid.
- Add category filter chips sourced from localized product tags and combine the active category with name/series search.
- Provide clear active-filter state, result count, empty state, and reset behavior with localized UI copy.
- Refresh product cards with stronger image hierarchy, badge, price, tag, hover/focus, and responsive styling.
- Refresh the product-detail layout, image gallery, information panel, and actions while preserving product IDs, media, routes, locale-aware links, and translated copy.
- Keep English (`en`) and Unicode Burmese (`my`) in scope; add any new visible control copy to the existing product message namespaces.

## Capabilities

### New Capabilities

- `product-catalog-browsing`: Provides combined name search and localized category filtering for the product catalog.

### Modified Capabilities

- `localized-product-catalog`: Changes product browsing presentation from carousel cards to a responsive grid and improves product/detail visual presentation.

## Impact

- Affected code: `src/app/[locale]/products/products-client.tsx`, `src/components/product-card.tsx`, `src/components/product-gallery.tsx`, product-detail route styles, and product message JSON files.
- No API, URL, product-ID, image/media, or data-model change is expected.
- Existing i18n loader and English/Burmese resource parity remain required; Burmese copy must stay Unicode-only.
