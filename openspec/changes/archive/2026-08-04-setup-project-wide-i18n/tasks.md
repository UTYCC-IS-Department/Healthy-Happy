## 1. Shared i18n foundation

- [x] 1.1 Review the installed Next.js 16 documentation for App Router Server and Client Component boundaries before changing route/component localization.
- [x] 1.2 Finalize the single locale config and server-only typed message loader with English-baseline structural validation and actionable missing-resource/key errors.
- [x] 1.3 Add focused checks for English and Burmese namespace loading, unsupported locales, and mismatched translation structures.
- [x] 1.4 Update `messages/README.md` with namespace naming, supported-locale onboarding, Unicode Burmese rules, server loading, and client-prop handoff.

## 2. Create project-wide translation resources

- [x] 2.1 Add matching `en` and Unicode `my` resources for shared shell navigation, footer content, language-control labels, and relevant accessibility labels.
- [x] 2.2 Add matching resources for Home and About page copy, including content currently held in page-specific components.
- [x] 2.3 Complete/refine matching resources for Products and Product Detail, keeping IDs, media metadata, and message keys aligned.
- [x] 2.4 Add matching resources for Awards, Contact, and localized not-found copy, including form labels/placeholders and accessibility text.

## 3. Migrate all public consumers

- [x] 3.1 Update the locale layout, `SiteHeader`, and `SiteFooter` to render selected shell messages without deriving user-facing copy from hardcoded constants.
- [x] 3.2 Convert the Home route and its interactive child components to receive selected messages while preserving current interactions and locale-aware links.
- [x] 3.3 Convert the About, Awards, Contact, and localized not-found routes/components to receive selected messages while preserving layouts, forms, embeds, and animations.
- [x] 3.4 Convert product list/detail routes and client-component inputs to the same shared loader; simplify `src/lib/product-catalog.ts` and remove confirmed redundant product-only i18n code.
- [x] 3.5 Audit all current public route and shared-component user-facing strings, including alt text, button labels, placeholders, and ARIA labels, to confirm they come from selected resources.

## 4. Verify routes and language experience

- [x] 4.1 Verify `/en` and `/my` variants of Home, About, Products, a valid Product Detail, Awards, and Contact render selected-locale content with no hardcoded fallback copy.
- [x] 4.2 Verify language switching preserves the matching route, the selected preference is honored from `/`, and product search/navigation/contact/news links retain he selected locale.
- [x] t4.3 Browser-check Burmese public routes for Unicode glyph shaping, Myanmar-capable font fallback, and absence of replacement characters or Zawgyi conversion.
- [x] 4.4 Run `npm run typecheck` and `npm run build`, documenting any pre-existing failures separately from this change.
