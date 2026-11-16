## Context

Healthy & Happy already has `/en/...` and `/my/...` routes plus locale validation and selection persistence, but nearly all shell and page copy is hardcoded. Product pages currently have their own message-loader wrapper and message files, whereas Home, About, Awards, Contact, the shell, and localized not-found state do not share the same content boundary.

This change establishes one project-wide translation setup for all current public routes: Home, About, Products, Product Detail, Awards, Contact, and not-found, plus the header/footer. English and Unicode Burmese are required in v1. URL locale remains authoritative, and existing user-preference persistence remains intact. Product IDs, media metadata, URLs, forms, and non-text behavior must not change.

## Goals / Non-Goals

**Goals:**

- Define a single locale configuration and server-only message-loading API for all public page and shell copy.
- Store translations in scalable namespace resources and verify every Burmese namespace matches the English key structure.
- Migrate all current public copy, including accessibility labels and client-component text, to the shared resources.
- Keep page composition route-local and pass selected, typed copy as props only where a Client Component needs it.
- Make a new page/locale onboarding path resource-driven, with no new loader or provider per page.

**Non-Goals:**

- Changing URLs, product media/IDs, forms, animations, page design, or business logic.
- Adding a CMS, machine translation, Zawgyi compatibility, new locales, or browser-side translation state.
- Translating third-party embed content or external social-platform UI.

## Decisions

### One shared server-only foundation, not an i18n library migration

The existing `src/i18n/config.ts` and `getMessages` approach will be expanded rather than adding `next-intl`. It already matches the Next.js App Router, requires no dependency, keeps whole translation catalogs out of browser bundles, and lets Server Components load only their namespaces. A client-side provider was considered, but would add runtime state where route-based server selection is sufficient.

### Namespaced JSON resources for each locale

Use `messages/<locale>/<namespace>.json` with lowercase kebab-case names: `shell`, `home`, `about`, `product`, `product-detail`, `awards`, `contact`, and `not-found`. The loader accepts the validated locale and namespace, loads the English baseline plus the selected locale, recursively checks object keys and array shapes, and returns selected typed data. One monolithic `en.json`/`my.json` file was considered, but namespace files keep page ownership clear and prevent every route from loading the entire site catalog.

### Server pages own loading; Client Components receive selected copy

Each route Server Component validates `params.locale`, loads its namespace, and passes only needed messages/data into interactive components. The locale layout loads `shell` messages and passes them to `SiteHeader` and `SiteFooter`. Existing page-specific JSX remains in route files; reusable UI components accept content props instead of importing translations or inspecting the URL themselves.

### Preserve domain data outside translation infrastructure

Product IDs, image/video paths, navigation targets, and other locale-neutral metadata stay in domain/data modules. Product names, descriptions, tags, prices, labels, accessibility copy, and UI actions live in the `product` and `product-detail` namespaces. Catalog-specific ID/media alignment checks remain in the catalog module, but product-only message imports and loaders are removed.

### Route locale and Unicode Burmese remain the source of truth

The selected `/en` or `/my` segment determines the rendered copy. Because this project uses static export, the unlocalized root page resolves a saved locale cookie or browser-language preference in a small client-side redirect; locale route rendering remains server-side. All `my` message files must contain Unicode Burmese. The global font stack must include a Myanmar-capable fallback and be browser-checked for shaped glyphs.

## Risks / Trade-offs

- [Migrating the current large page components misses a visible string or accessibility label] → Audit each public route and shared component, then verify both locales route by route.
- [A Burmese resource drifts from English] → Validate keys/array shape against the English baseline with namespace and key-path failures.
- [Passing content into Client Components increases props] → Pass compact page-specific message objects; do not make components load global catalogs.
- [Burmese fonts vary by browser/device] → Use Unicode-only resources, a Myanmar-capable fallback stack, and visual verification on `/my` routes.

## Migration Plan

1. Finalize shared config, loader, parity validation, and message namespace documentation.
2. Create matching English/Burmese resources for the shell and every current public route.
3. Migrate shared shell, then routes and their client components; simplify the product catalog once it consumes the same contract.
4. Verify locale switching, persistence, all route content, key product flows, accessibility labels, and Burmese glyph rendering.
5. Run typecheck and production build. Rollback is source-only: restore previous component copy/props; no database, URL, or content-data migration is required.

## Open Questions

- None. V1 supports English and Burmese; further locales are added later by creating the same namespace set and extending the locale config.
