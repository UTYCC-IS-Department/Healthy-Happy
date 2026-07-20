## Context

The repository currently contains OpenSpec configuration but no application implementation or existing product specs. The change establishes the first usable Healthy & Happy page and the conventions that future pages will extend. The page is intentionally one route per locale, with no backend or content management dependency.

## Goals / Non-Goals

**Goals:**

- Create a strict TypeScript Next.js App Router foundation using Tailwind CSS, shadcn/ui, and Framer Motion.
- Render one polished, responsive sample page at `/en` and `/my`.
- Keep all visible copy in typed locale message files and demonstrate adding a shadcn component in-page.
- Make locale switching, URL state, and persistence work without a full reload.
- Render Burmese as Unicode with an explicitly selected Myanmar-capable font.

**Non-Goals:**

- No wellness data model, API routes, authentication, CMS, or database.
- No locale-specific page content beyond the sample guide.
- No translation management service or automatic machine translation.
- No additional locales in v1; the message structure must merely make them easy to add later.

## Decisions

### Use `next-intl` with App Router locale segments

Use `next-intl` because it provides typed-friendly message loading, server and client integration, and locale-aware navigation that fits Next.js App Router. `react-i18next` was not selected because it adds more provider and SSR setup for this narrow App Router sample. A custom context was rejected because it would duplicate routing, message lookup, and formatting behavior.

Use `app/[locale]/page.tsx` as the one page entry point, with `app/[locale]/layout.tsx` loading the locale messages. Configure `en` and `my` as supported locales and redirect `/` to a detected or default locale. The route segment is the source of truth for the current rendered language.

### Store messages by locale with stable dot-separated keys

Keep messages at `messages/en.json` and `messages/my.json`. Keys use lower camel case grouped by surface, for example `home.title`, `home.languageLabel`, and `home.shadcnGuide`. Components receive translated strings through `next-intl` rather than embedding user-facing text. New locales add a sibling JSON file and register the locale without changing component code.

### Persist the user-selected locale in a cookie

The language control navigates to the alternate locale segment and sets a `NEXT_LOCALE` cookie. Middleware reads that cookie first, then an accepted browser language, and falls back to `en`. The URL remains shareable and takes precedence for the current request; the cookie affects future visits to `/`.

### Use shadcn/ui as local source components

Initialize shadcn/ui with Tailwind-compatible CSS variables and add only the components needed by the page, such as `Button`, `Card`, and `Badge`. The sample guide explains the `npx shadcn@latest add <component>` workflow using a code-styled block, while the actual UI demonstrates the installed components. Avoid a separate UI framework or a custom component registry.

### Use Framer Motion for one purposeful entrance transition

Wrap the page’s primary content in a small client component and animate opacity/vertical offset on mount. Keep the static page usable without animation and honor `prefers-reduced-motion`. This validates the dependency without turning the setup guide into an animation showcase.

### Use a Unicode Myanmar-capable font

Load a font with Burmese glyph coverage through `next/font/google` or a locally verified equivalent, with a sans-serif fallback. Translation files and source code use Unicode Burmese only. Verification must include visual inspection or browser testing of Burmese glyph shaping; Zawgyi text and a Zawgyi font are excluded.

## Risks / Trade-offs

- [Risk] `next-intl` configuration can vary with Next.js versions → Pin compatible versions and verify the production build and both locale URLs.
- [Risk] Burmese glyphs may fall back to an unsuitable font or render with incorrect shaping → Select a font with Burmese coverage, include a fallback stack, and test the actual `my` page in a browser.
- [Risk] Client-side locale switching can briefly show stale text → Navigate through locale-aware links and derive messages from the URL segment on each render.
- [Risk] shadcn initialization can generate config that conflicts with Tailwind versions → Run the generator against the selected Next.js/Tailwind setup and keep generated files scoped to `components/ui`.

## Migration Plan

1. Initialize the Next.js application and install the pinned UI, animation, and i18n dependencies.
2. Add locale routing, message files, shared styles, and the sample page.
3. Run type checking/build validation and browser checks for `/en`, `/my`, switching, persistence, responsive layout, and reduced motion.
4. Rollback is deleting the new application/configuration change; there is no existing runtime data or API migration.

## Open Questions

- Which specific production wellness pages and domain vocabulary should replace the sample guide after this foundation is accepted?
- Should future locales use the same URL-first strategy for SEO metadata and localized content, or add locale-specific metadata in a later change?
