## MODIFIED Requirements

### Requirement: Complete externalized public copy

The system SHALL source all current v1 user-facing public site-shell and page copy—including Home, About, Products, Product Detail, Awards, Contact, and localized not-found copy; product names and attributes; labels, actions, placeholders, alt text, and accessibility labels—from matching external English and Unicode Burmese message resources through the shared project-wide i18n contract, with no hardcoded public copy in route or shared-shell components.

#### Scenario: English messages drive all public copy

- **GIVEN** a user visits an English public route, including the English Home, About, Products, Product Detail, Awards, or Contact route
- **WHEN** the route renders
- **THEN** its visible user-facing and accessibility copy is resolved from English message resources

#### Scenario: Burmese messages drive all public copy

- **GIVEN** a user visits a Burmese public route, including the Burmese Home, About, Products, Product Detail, Awards, or Contact route
- **WHEN** the route renders
- **THEN** its visible user-facing and accessibility copy is resolved from Unicode Burmese message resources

### Requirement: Unicode Burmese visual support

The system SHALL render Burmese content using Unicode text and a Myanmar-capable font or fallback stack, and SHALL NOT require Zawgyi conversion or Zawgyi-encoded message content.

#### Scenario: Burmese glyph rendering

- **GIVEN** the user opens `/my/about`
- **WHEN** Burmese headings, paragraphs, and navigation labels render
- **THEN** they display readable shaped glyphs with no replacement characters or encoding conversion prompt

#### Scenario: English font compatibility

- **GIVEN** the user opens `/en/about`
- **WHEN** the shared typography stack renders English content
- **THEN** English text remains readable while the stack retains the Myanmar-capable fallback used by `/my`
