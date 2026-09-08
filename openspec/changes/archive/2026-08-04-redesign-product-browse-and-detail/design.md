## Context

The localized product listing currently presents products in a horizontal snap carousel. Its search field matches the localized product name and series, but the adjacent filter control is only visual and does not affect results. Product cards and the product-detail gallery use the existing locale-neutral product IDs and media, while names, tags, descriptions, prices, and UI labels come from the selected locale's page-message resources.

This change improves browsing without changing the product data model, route structure, media assets, or ordering/contact flows. English (`en`) and Unicode Burmese (`my`) remain first-class locales. Public copy must continue to be externalized and message-resource structures must remain parity-checked against English.

## Goals / Non-Goals

**Goals:**

- Replace the product carousel with a vertically scrollable, responsive grid that is easy to browse on small and large screens.
- Provide an accessible category-chip filter based on the localized tags already present on products, combined with name/series search.
- Make the active filters, result count, empty state, and reset path clear in both supported locales.
- Establish a more polished, consistent visual system for product cards, the product-detail information panel, and gallery states.
- Preserve locale-aware links, stable product IDs, product media, and current localized product content.

**Non-Goals:**

- Adding a backend catalog API, category entity, new product fields, sorting, pagination, or URL-query persistence for filters.
- Changing URLs, product IDs, contact/order behavior, or the existing locale-selection mechanism.
- Introducing a third-party carousel, filtering, or i18n dependency.

## Decisions

### Keep the existing custom page-message loader and JSON namespace structure

The listing and detail pages will continue to use the project's server-only `getPageMessages` contract instead of adding `next-intl` or `react-i18next`. Visible filter and card/control labels will be added to `messages/en/product.json` and `messages/my/product.json`, using the existing lower-camel-case message-key convention. The existing parity checker remains the guard that both resources have the same keys and shapes.

This matches the project-wide i18n setup already used by the product routes, keeps the static-export-compatible architecture intact, and avoids introducing a second translation API. A component-local string map was considered but rejected because it would bypass centralized translation validation.

### Derive categories from localized product tags and filter by exact tag membership

The catalog will collect a stable, de-duplicated list of the selected locale's displayed product tags. Selecting a chip will retain products whose tag array contains that exact tag; the all-categories state will retain all products. Text search will continue to match localized `name` and `series`, and both constraints will be applied together.

This keeps category labels localized without a new category schema. A separate locale-neutral category model was considered, but it would require data migration and translations that are out of scope for this visual/browsing change.

### Use a responsive grid with horizontally scrollable category chips

The results area will become a normal vertically scrolling page section with a responsive card grid rather than horizontal snap cards. Category chips may scroll horizontally on narrow viewports so controls remain compact and usable. Product cards will remain whole-card locale-aware links, with improved spacing, image framing, tag treatment, price emphasis, and visible keyboard-focus/hover states.

This makes all matching products discoverable via normal page scrolling while preserving compact filters on mobile. Keeping the carousel was rejected because it hides catalog breadth and conflicts with filtering.

### Preserve the established locale URL and preference behavior

Product and detail navigation will continue to use `/${locale}/...` links. Locale is selected by the route segment and persisted through the existing `NEXT_LOCALE` browser cookie when the user changes languages. Filtering is transient client state for this iteration; it will not alter the URL or cookie.

This preserves static export and the product flows already in use. URL-synchronized filters were considered but deferred because they add state parsing and shareability requirements beyond the requested browse experience.

### Refine detail presentation without changing gallery content behavior

The detail page will retain the current active-image and thumbnail interaction, product media set, and localized information/actions. Styling will clarify the gallery's selected state and make the product information, badges, tags, price, ingredients, and action area visually coherent with the updated catalog cards.

Replacing the gallery with a carousel or lightbox was rejected: the request removes carousel browsing and neither interaction is required to improve the detail page.

## Risks / Trade-offs

- [Localized tags can be lengthy, especially in Burmese] → Keep chips horizontally scrollable on small screens, avoid fixed widths, and use accessible labels.
- [Tag wording is the category source, so semantically similar tags may not combine] → Use exact displayed tags in this iteration; add a canonical category model only if catalog taxonomy needs it later.
- [New visible controls can drift between locales] → Add all copy to the existing product namespace and run message-parity validation.
- [More elaborate card styling can reduce image readability] → Preserve image alt text, responsive `sizes`, contrast-aware overlays, and focus indicators while verifying mobile layouts.

## Migration Plan

1. Extend both product message resources with matching control and empty/reset copy.
2. Replace the catalog carousel and placeholder filter with the grid, search, category chips, and combined filtering.
3. Refresh card, gallery, and detail styles without changing product data or routes.
4. Run message-parity, typecheck, and production-build validation; roll back by restoring the prior components if visual regressions are found.

## Open Questions

- None. Tags are the approved lightweight category source until a separate catalog taxonomy is needed.
