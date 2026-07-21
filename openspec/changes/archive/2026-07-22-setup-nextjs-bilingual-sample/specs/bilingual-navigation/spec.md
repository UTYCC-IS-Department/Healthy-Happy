## ADDED Requirements

### Requirement: Supported locale routing

The application SHALL support English (`en`) and Burmese (`my`) through locale-aware URL segments, and SHALL keep all user-facing sample-page strings in matching external message resources.

#### Scenario: English route uses English messages

- **GIVEN** the user opens `/en`
- **WHEN** the page renders
- **THEN** the URL remains `/en` and all visible sample copy is loaded from the English message resource

#### Scenario: Burmese route uses Burmese messages

- **GIVEN** the user opens `/my`
- **WHEN** the page renders
- **THEN** the URL remains `/my` and all visible sample copy is loaded from the Burmese Unicode message resource

### Requirement: Working language control

The page SHALL provide an accessible language control that switches between `/en` and `/my`, preserves the current page, and exposes the active locale to assistive technology.

#### Scenario: Switch English to Burmese

- **GIVEN** the user is viewing `/en`
- **WHEN** the user activates the Burmese option
- **THEN** the application navigates to `/my` and displays Burmese copy on the same sample page

#### Scenario: Switch Burmese to English

- **GIVEN** the user is viewing `/my`
- **WHEN** the user activates the English option
- **THEN** the application navigates to `/en` and displays English copy on the same sample page

### Requirement: Locale detection and persistence

The application SHALL use an explicitly selected locale from the URL for the current request, persist a user selection in a locale cookie, and use the persisted locale before browser-language detection when resolving an unlocalized entry request.

#### Scenario: Selected Burmese locale persists

- **GIVEN** the user switches from `/en` to `/my`
- **WHEN** the user later opens the unlocalized root path `/`
- **THEN** the application resolves the user to `/my`

#### Scenario: English is the default locale

- **GIVEN** the user has no locale cookie and the browser does not advertise a supported locale
- **WHEN** the user opens `/`
- **THEN** the application resolves the user to `/en`

### Requirement: Unicode Burmese rendering

The application SHALL use Unicode Burmese translations and a Myanmar-capable font or fallback stack, and SHALL NOT require or mix Zawgyi-encoded content for the sample page.

#### Scenario: Burmese text renders with supported glyphs

- **GIVEN** the user opens `/my` in a browser
- **WHEN** the translated page is displayed
- **THEN** Burmese glyphs render with readable shaping and no replacement characters or Zawgyi conversion step

#### Scenario: English remains readable with Myanmar font support

- **GIVEN** the user opens `/en`
- **WHEN** the translated page is displayed
- **THEN** English text remains readable while the configured font stack remains available for the alternate Burmese route
