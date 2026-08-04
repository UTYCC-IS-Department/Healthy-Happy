## Purpose

Define the reusable project-wide i18n contract for localized public pages.

## Requirements

### Requirement: Reusable validated page-message loading

The system SHALL provide one server-only project-wide page-message loader that accepts a validated supported locale and a lowercase kebab-case namespace, loads `messages/<locale>/<namespace>.json`, and verifies that the selected resource has the same nested object keys and array shape as the English baseline resource before returning it.

#### Scenario: English page messages load through the shared contract

- **GIVEN** an English server-rendered public page requests its namespace
- **WHEN** it loads messages for `en`
- **THEN** the shared loader returns the matching English resource without hardcoded public copy

#### Scenario: Burmese page messages load through the shared contract

- **GIVEN** a Burmese server-rendered public page requests its namespace
- **WHEN** it loads messages for `my`
- **THEN** the shared loader returns the matching Unicode Burmese resource after confirming it matches the English resource structure

#### Scenario: A translation resource is incomplete

- **GIVEN** a page namespace has a missing or mismatched key in its Burmese resource
- **WHEN** that namespace is loaded for `my`
- **THEN** the system fails with an actionable namespace and key-path error instead of rendering incomplete localized copy

### Requirement: Reusable localized-page onboarding convention

The system SHALL document how a future public page or locale adds matching namespace resources, preserves identical key structure, validates its route locale, and loads selected messages in its Server Component before passing only needed copy to any Client Component.

#### Scenario: A future page adds English and Burmese resources

- **GIVEN** a developer localizes a new public page
- **WHEN** they follow the documented convention
- **THEN** they create matching `messages/en/<namespace>.json` and `messages/my/<namespace>.json` files and use the shared loader without creating a page-specific message loader

#### Scenario: A future locale is added

- **GIVEN** a developer adds a supported locale after v1
- **WHEN** they extend the shared locale configuration and provide every required namespace
- **THEN** existing public routes resolve the new locale’s messages through the same shared loader without route-specific i18n infrastructure

#### Scenario: Burmese content follows the convention

- **GIVEN** a developer adds Burmese text for a current or future page
- **WHEN** they create the `my` namespace resource
- **THEN** its text is Unicode Burmese and does not require or include a Zawgyi conversion step
