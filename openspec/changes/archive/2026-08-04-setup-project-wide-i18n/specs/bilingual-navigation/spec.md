## MODIFIED Requirements

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
