## Context

`src copy` is the visual and content reference for the Healthy & Happy public website. It is a Vite React application using Wouter and direct client imports, whereas the target is a Next.js 16 App Router application with `next-intl` and already-established `/en` and `/my` segments. The target must gain the source site's design, page set, and responsive behavior without weakening its locale routing or Unicode Burmese support.

## Goals / Non-Goals

**Goals:**

- Faithfully translate the source site's visual system, page hierarchy, content sections, and navigation into Next.js routes.
- Keep every public string externalized for English and Burmese and preserve the selected locale across route changes.
- Deliver an accessible, responsive site shell and a typed product catalog/detail experience.
- Use server-rendered page components by default and isolate interactive behavior to small client components.

**Non-Goals:**

- Rebuild the source project's Wouter router, React Query setup, toast provider, or unused UI primitives.
- Introduce a CMS, checkout, reward-account backend, or external product API.
- Preserve source-project asset import aliases or placeholder content verbatim where assets/content need replacement for Next.js.

## Decisions

### Use the existing Next.js App Router and `next-intl`

Pages will live below `src/app/[locale]`, with `next-intl` server APIs loading messages for server-rendered pages and client hooks only in interactive translated components. This retains static generation, metadata support, and the current locale boundary. Porting Wouter or adopting `react-i18next` would duplicate routing/localization concerns and make locale-prefixed navigation less reliable.

### Map source routes to locale-prefixed App Router routes

The migration will use `/[locale]`, `/[locale]/about`, `/[locale]/products`, `/[locale]/products/[id]`, `/[locale]/rewards`, `/[locale]/awards`, and `/[locale]/contact`, plus locale-aware not-found handling. The shared header and footer will be composed in the locale layout. Next.js `Link` and route params replace Wouter `Link`, `Switch`, and `useLocation`; navigation no longer requires client-side scroll effects because page navigation provides the appropriate document transition.

### Establish a source-derived design token layer

`globals.css` will define the source palette: warm off-white background, olive primary, dusty-rose secondary, charcoal/navy text, neutral borders, and a restrained radius scale. The typography will use a serif display stack and sans body stack with Myanmar-capable Unicode fallbacks. Existing local shadcn-style primitives will be adapted only where they support the reference design; page sections will remain normal responsive layouts instead of nested decorative cards.

### Externalize copy and keep products typed

`messages/en.json` and `messages/my.json` will use matching namespaces by feature: `navigation`, `footer`, `home`, `about`, `products`, `rewards`, `awards`, `contact`, `notFound`, and `metadata`. Keys use lowerCamelCase and semantic names, for example `products.filters.all` and `footer.contact.email`. Product records will be typed local data with stable IDs and locale-specific values (or translation keys), enabling product cards and detail routes to resolve the same item consistently without a backend.

### Use URL locale as authority and persist explicit selection

The `[locale]` URL segment remains authoritative for rendering. The language control uses the matching path in the other locale and writes the existing locale-preference cookie before navigation; unlocalized entry resolution uses that cookie, then supported browser language, then `en`. This avoids mismatches between visible content and URL while meeting the persisted preference requirement.

### Constrain client components to interactive controls

The mobile menu, language selection write, product filter controls, image-gallery selection, and reduced-motion animation wrappers are client components. Layout, page composition, metadata, and content lookup remain server-side. Framer Motion is retained only for the source-equivalent entrance/interaction enhancements and must honor `prefers-reduced-motion`.

## Risks / Trade-offs

- [Source asset aliases point outside the target project] -> Inventory assets before porting, move licensed required files into `public`, and use `next/image` with explicit dimensions or documented placeholders.
- [Burmese source copy may include inaccurate or mixed-encoding text] -> Treat Unicode-only Burmese as the accepted format, validate visible `/my` pages for replacement characters/shaping, and use Myanmar-capable fallback fonts.
- [Faithful desktop navigation may become cramped on smaller widths] -> Keep the source breakpoint intent, expose an accessible menu button below the desktop threshold, and test mobile and desktop viewports.
- [Translation completeness can drift as pages are ported] -> Use mirrored message namespaces and verify both locales for each route before considering a page complete.
- [Static local content delays future CMS work] -> Keep content boundaries typed and isolated so a future REST/JSON data source can replace them without changing the page shell.

## Migration Plan

1. Inventory the source pages, shared layout, styles, and usable assets; confirm current Next.js 16 guidance before editing implementation files.
2. Create the design token layer, route map, localized message shape, and locale-aware shared shell.
3. Port pages in dependency order: home and products first, product detail next, then informational/reward/contact pages.
4. Validate both locale variants, responsive navigation, product-route not-found handling, typecheck, lint, and production build.
5. Deploy as a coordinated frontend release. Rollback consists of redeploying the prior build; no data migration is involved.

## Open Questions

- Which source image assets are licensed and available for transfer into the Next.js `public` directory?
- Should the current source contact/social URLs remain placeholders or be replaced with production destinations during implementation?
- Is the source product catalog final for v1, or is it a visual placeholder pending authoritative product copy and pricing?
