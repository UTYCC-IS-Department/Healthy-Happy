## 1. Project Foundation

- [x] 1.1 Initialize the Next.js App Router project with strict TypeScript and the required package scripts.
- [x] 1.2 Install and configure Tailwind CSS, shared CSS variables, path aliases, and baseline responsive styles.
- [x] 1.3 Install and configure `next-intl`, Framer Motion, and the shadcn/ui CLI using versions compatible with the selected Next.js release.
- [x] 1.4 Initialize shadcn/ui and add the local `Button`, `Badge`, and `Card` components used by the sample page.
- [x] 1.5 Configure a Unicode Myanmar-capable font with a readable sans-serif fallback and verify the font loads in the app.

## 2. Locale Infrastructure

- [x] 2.1 Create typed locale definitions for `en` and `my`, register the supported locales, and configure `app/[locale]` routing.
- [x] 2.2 Add `messages/en.json` and `messages/my.json` with matching dot-separated keys for navigation, page copy, component guidance, and accessibility labels.
- [x] 2.3 Implement middleware or equivalent request handling for locale-prefixed routes, root fallback, cookie persistence, and supported browser-language detection.
- [x] 2.4 Add the locale layout/provider and ensure components read all visible text through `next-intl` message lookups.

## 3. Sample Page

- [x] 3.1 Build the single responsive Healthy & Happy sample page with a header, introduction, wellness sample content, and shadcn/ui demonstration.
- [x] 3.2 Implement the accessible English/Myanmar language control that preserves the page while navigating between `/en` and `/my` and updates the locale cookie.
- [x] 3.3 Add the shadcn component guide with a copyable `npx shadcn@latest add <component>` command and localized explanatory text.
- [x] 3.4 Add a small Framer Motion entrance animation for the primary content with reduced-motion handling.
- [x] 3.5 Add localized metadata and ensure Burmese Unicode text has no replacement characters, hardcoded component copy, or Zawgyi content.

## 4. Verification

- [x] 4.1 Run formatting, linting, type checking, and production build checks; resolve configuration or strict-TypeScript failures.
- [x] 4.2 Verify `/en` and `/my` in a browser at mobile and desktop widths, including layout wrapping, font rendering, and no text overlap.
- [x] 4.3 Verify English-to-Burmese and Burmese-to-English switching, root-path locale detection, cookie persistence, and accessible active-language state.
- [x] 4.4 Verify the Framer Motion entrance behavior and `prefers-reduced-motion` behavior, then document the final local run command.
