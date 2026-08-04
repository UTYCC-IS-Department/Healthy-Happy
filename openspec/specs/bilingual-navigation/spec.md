## Purpose

Define locale-aware public navigation for Healthy & Happy.

## Requirements

### Requirement: Supported locale routing

The application SHALL support English (`en`) and Burmese (`my`) through locale-aware URL segments for the complete v1 public route set, including Home, About, Products, valid Product Detail, Awards, and Contact routes, and SHALL load all visible shared-shell and page copy from matching external message resources through the project-wide i18n contract.

#### Scenario: English route uses English messages

- **GIVEN** the user opens an English public route, including `/en/products` or a valid `/en/products/[id]` route
- **WHEN** the page renders
- **THEN** the URL remains under `/en` and all visible shell and page copy is loaded from English message resources

#### Scenario: Burmese route uses Burmese messages

- **GIVEN** the user opens a Burmese public route, including `/my/products` or a valid `/my/products/[id]` route
- **WHEN** the page renders
- **THEN** the URL remains under `/my` and all visible shell and page copy is loaded from Unicode Burmese message resources

### Requirement: Working language control

The shared site shell SHALL provide an accessible language control whose labels are loaded from selected locale resources, switches between `/en` and `/my`, preserves the current public page when a matching route exists, and exposes the active locale to assistive technology.

#### Scenario: Switch English to Burmese

- **GIVEN** the user is viewing `/en/about`
- **WHEN** the user activates the Burmese option
- **THEN** the application navigates to `/my/about` and displays Unicode Burmese navigation and About-page copy

#### Scenario: Switch Burmese to English

- **GIVEN** the user is viewing `/my/contact`
- **WHEN** the user activates the English option
- **THEN** the application navigates to `/en/contact` and displays English navigation and Contact-page copy

### Requirement: Locale detection and persistence

The application SHALL use an explicitly selected locale from the URL for the current request, persist a user selection in a locale cookie, and use the persisted locale before browser-language detection when resolving an unlocalized entry request.

#### Scenario: Selected Burmese locale persists

- **GIVEN** the user switches from `/en/products` to `/my/products`
- **WHEN** the user later opens the unlocalized root path `/`
- **THEN** the application resolves the user to `/my`

#### Scenario: English is the default locale

- **GIVEN** the user has no locale cookie and the browser does not advertise a supported locale
- **WHEN** the user opens `/`
- **THEN** the application resolves the user to `/en`

### Requirement: Unicode Burmese rendering

The application SHALL use Unicode Burmese translations and a Myanmar-capable font or fallback stack, and SHALL NOT require or mix Zawgyi-encoded content on public routes.

#### Scenario: Burmese text renders with supported glyphs

- **GIVEN** the user opens `/my`
- **WHEN** the translated public page is displayed
- **THEN** Burmese glyphs render with readable shaping and no replacement characters or Zawgyi conversion step

#### Scenario: English remains readable with Myanmar font support

- **GIVEN** the user opens `/en`
- **WHEN** the translated public page is displayed
- **THEN** English text remains readable while the configured font stack remains available for the alternate Burmese route
