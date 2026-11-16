# Project-wide messages

Every public route and shared shell component uses this folder for visible copy.

```
messages/
  en/
    shell.json
    home.json
    about.json
    product.json
    product-detail.json
    awards.json
    contact.json
    not-found.json
  my/
    # the same namespace files and JSON key structure
```

## Rules

- `en` and `my` are the v1 locales. Add a locale in `src/i18n/config.ts` only after creating every namespace for it.
- Namespace filenames use lowercase kebab-case and are owned by the page or shared feature that renders them.
- English is the structural baseline. Object keys, value types, and array lengths must match in every locale.
- Burmese (`my`) messages must use Unicode Burmese only. Do not add Zawgyi text or a conversion step.
- Keep stable IDs, image/video paths, URLs, and domain metadata in code. Put user-facing labels, descriptions, accessibility text, and placeholders here.

## Using messages in a route

Load messages in the Server Component after validating the route locale, then pass only the required serializable object to a Client Component.

```tsx
const { locale } = await params;
if (!hasLocale(locale)) notFound();

const messages = await getMessages<HomeMessages>(locale, "home");
return <HomeClient locale={locale} messages={messages} />;
```

Shared shell copy is loaded by `src/app/[locale]/layout.tsx` and passed to `SiteHeader` and `SiteFooter`.

## Verification

Run `npm run i18n:check` after changing message files. It verifies that the English and Burmese namespace sets and JSON shapes match. The server loader performs the same shape check at runtime for every requested namespace.
