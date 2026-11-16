## 1. Localized catalog controls

- [x] 1.1 Add matching English and Unicode Burmese product-message keys for category browsing, filter state, result feedback, and reset behavior.
- [x] 1.2 Update the product message type contract and run parity validation to confirm both locale resources retain identical structure.

## 2. Product browsing experience

- [x] 2.1 Replace the placeholder filter and horizontal carousel in `products-client.tsx` with combined localized name/series search and tag-derived category state.
- [x] 2.2 Render responsive, accessible, horizontally scrollable category chips, active-filter feedback, result counts, and reset/no-results states.
- [x] 2.3 Render filtered products in a responsive vertical grid while preserving localized product-card links and current product IDs/media.

## 3. Product visual refresh

- [x] 3.1 Refine `ProductCard` image treatment, best-seller badge, content hierarchy, tags, price, and hover/focus styles for the new grid.
- [x] 3.2 Refine the product-detail layout and `ProductGallery` selected-thumbnail/media states while preserving localized content, actions, and gallery interaction.
- [x] 3.3 Check responsive catalog and detail layouts for readable English and Unicode Burmese text without carousel-dependent interactions.

## 4. Verification

- [x] 4.1 Run the i18n message-parity check and resolve any English/Burmese resource mismatch.
- [x] 4.2 Run TypeScript validation and a production build, resolving regressions in the affected product routes.
