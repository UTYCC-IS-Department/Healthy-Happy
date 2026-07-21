## Why

The current Next.js application is a bilingual setup sample, while `src copy` contains the intended Healthy & Happy Myanmar website design and content structure. The production application needs that established wellness brand experience in Next.js without losing locale-aware routing or Burmese-language support.

## What Changes

- Replace the starter home screen with the Healthy & Happy site visual system, including its olive, dusty-rose, and warm-neutral palette, serif/sans typography pairing, and responsive layout conventions.
- Introduce a shared site shell with the branded desktop navigation, accessible mobile navigation, footer, and locale switcher.
- Port the source application's Home, About, Products, Product Detail, Rewards, Awards, Contact, and not-found views to locale-prefixed Next.js routes.
- Move product and page content into typed local data and English/Burmese translation catalogs; preserve the source design and information architecture while removing Wouter-specific routing and client-only provider dependencies.
- Validate Unicode Burmese rendering with the selected font stack. English and Burmese (`my`) are in scope for v1; future locales will be added through translation catalogs and locale configuration without component changes.

## Capabilities

### New Capabilities

- `healthy-happy-site-shell`: Provide the shared responsive brand navigation, footer, and locale controls across the public site.
- `healthy-happy-content-pages`: Present the source application's branded wellness pages and product detail experience through locale-aware Next.js routes.
- `localized-wellness-content`: Supply all public copy and product information through English and Unicode Burmese translations.

### Modified Capabilities

- `frontend-foundation`: Replace the starter-page presentation with the Healthy & Happy visual system and public site routing surface.
- `bilingual-navigation`: Extend locale-aware navigation from the setup page to the complete public website route set.

## Impact

- Affected code: `src/app`, `src/components`, `src/i18n`, `messages`, shared styles, and new local content/data modules.
- The source React project in `src copy` remains a read-only design reference; its Wouter routes, Query Client, and toast/tooltip providers are not carried into the Next.js runtime unless a ported feature needs them.
- No external API is required for v1. The existing Next.js, TypeScript, Tailwind CSS, `next-intl`, and Framer Motion stack remains the implementation baseline.
