## Purpose

Define the common localized shell for every public site route.

## Requirements

### Requirement: Responsive branded site shell

The system SHALL render every public locale route within a shared Healthy & Happy site shell containing the branded header, primary navigation, locale control, and footer derived from the source design.

#### Scenario: English desktop shell

- **GIVEN** a user opens an English public route on a desktop viewport
- **WHEN** the route renders
- **THEN** the page displays the source-derived branded header, desktop navigation, locale control, and footer in English

#### Scenario: Burmese mobile shell

- **GIVEN** a user opens a Burmese public route on a mobile viewport
- **WHEN** the route renders
- **THEN** the page displays Unicode Burmese shell copy and an accessible mobile navigation control without clipped or overlapping content

### Requirement: Accessible locale-aware navigation

The system SHALL expose links to every v1 public page, indicate the active destination, and preserve the current page path when switching between supported locales where the corresponding localized route exists.

#### Scenario: English route navigation

- **GIVEN** a user is viewing `/en/products`
- **WHEN** the user activates the About navigation link
- **THEN** the application navigates to `/en/about` and identifies About as the active destination

#### Scenario: Burmese locale switch

- **GIVEN** a user is viewing `/my/contact`
- **WHEN** the user selects English from the locale control
- **THEN** the application navigates to `/en/contact`, persists the English preference, and renders English navigation labels
