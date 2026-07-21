## 1. Migration Preparation

- [x] 1.1 Read the relevant Next.js 16 App Router, routing, image, and internationalization guidance in `node_modules/next/dist/docs/` and record any applicable deprecations before implementation edits.
- [x] 1.2 Inventory the source pages, shared components, local UI primitives, and image assets; identify every asset that can be legally moved into the Next.js project and document replacements for unavailable files.
- [x] 1.3 Define the source-derived color, typography, border, and responsive design tokens in the target global styles, including a tested Myanmar-capable Unicode font fallback stack.

## 2. Locale and Content Foundation

- [x] 2.1 Expand the English and Unicode Burmese message resources into matching semantic namespaces for site shell, page content, metadata, product labels, and not-found states.
- [x] 2.2 Create typed local product/content data with stable product IDs and locale-aware values or translation keys, and add helpers for product lookup.
- [x] 2.3 Update locale middleware/entry resolution and the language control so selections persist in a locale cookie and route switching preserves the current matching public path.

## 3. Shared Site Shell

- [x] 3.1 Implement the locale-aware shared header with source-derived branding, active route styling, desktop navigation, and accessible mobile-menu behavior.
- [x] 3.2 Implement the source-derived shared footer with localized company, support, contact, and social-link content.
- [x] 3.3 Compose the shared shell in the locale layout and ensure all public routes inherit correct document language and locale context.

## 4. Public Page Migration

- [x] 4.1 Replace the starter home page with the source-derived responsive home experience, including its hero, feature categories, product highlights, awards, and contact call-to-action.
- [x] 4.2 Implement localized About, Rewards, Awards, and Contact pages using the source information architecture and responsive layouts.
- [x] 4.3 Implement the localized Products listing with typed catalog cards, filter controls where represented by the source design, and locale-aware detail links.
- [x] 4.4 Implement the localized dynamic Product Detail route with gallery, descriptions, ingredients, tags, price, and localized unknown-product handling.
- [x] 4.5 Implement locale-aware not-found metadata and visual treatment for unmatched site and product routes.

## 5. Motion, Accessibility, and Quality

- [x] 5.1 Port only source-equivalent Framer Motion enhancements and confirm reduced-motion users receive fully available static content.
- [x] 5.2 Verify keyboard navigation, visible focus states, menu and locale-control labels, heading hierarchy, image alt text, and responsive behavior across mobile and desktop viewports.
- [x] 5.3 Verify each public route in `/en` and `/my`, confirming no hardcoded public copy, readable Unicode Burmese shaping, matching locale URLs, and no clipped or overlapping text.
- [x] 5.4 Run `npm run typecheck`, `npm run lint`, and `npm run build`; resolve implementation-caused failures and document any pre-existing or toolchain-only failures.
