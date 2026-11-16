## Why

The site has locale-aware URLs but most public copy remains hardcoded, while products use a separate localization path. A project-wide i18n foundation is needed now so every current page can be translated consistently and future pages can be added without inventing another translation system.

## What Changes

- Establish one shared, server-only i18n configuration and page-message loader for all public routes, with English as the baseline and structural validation for Unicode Burmese resources.
- Externalize visible copy for the shared header/footer, Home, About, Products, Product Detail, Awards, Contact, and locale-specific not-found experience into reusable message namespaces.
- Refactor every public page and shared component to consume selected locale messages, passing only the required copy into Client Components.
- Simplify product localization so product IDs and media remain locale-neutral while product copy uses the same shared page-message contract as every other page.
- Remove confirmed redundant or product-only localization code after all consumers use the shared foundation.
- Keep English (`en`) and Unicode Burmese (`my`) as v1 locales; use a namespace convention that lets future locales and pages be added through resources rather than new loaders.

## Capabilities

### New Capabilities

- `reusable-page-i18n`: Provides the shared configuration, validated message loading, and onboarding convention used by every public page.

### Modified Capabilities

- `bilingual-navigation`: Shared navigation and footer copy render from the selected locale resources.
- `localized-wellness-content`: All current public page copy renders from English or Unicode Burmese resources through the shared contract.
- `localized-product-catalog`: Product list and detail rendering use the shared project-wide i18n contract while preserving catalog behavior.

## Impact

- Affected code: `src/i18n/*`, `messages/`, all public route pages, shared site shell, page-specific client components, and `src/lib/product-catalog.ts`.
- Public route shapes, product IDs, media, forms, and APIs remain unchanged.
- No new dependency is required; the existing Next.js App Router and TypeScript setup remains in use.
- Burmese copy is Unicode-only and must render with a Myanmar-capable font/fallback; Zawgyi is unsupported.
