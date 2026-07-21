## ADDED Requirements

### Requirement: Complete externalized public copy

The system SHALL source all v1 user-facing site-shell and page copy from matching external English and Unicode Burmese message resources, with no hardcoded public copy in page or shared-shell components.

#### Scenario: English messages drive public copy

- **GIVEN** a user visits an English public route
- **WHEN** the route renders
- **THEN** its visible user-facing copy is resolved from the English message resource

#### Scenario: Burmese messages drive public copy

- **GIVEN** a user visits a Burmese public route
- **WHEN** the route renders
- **THEN** its visible user-facing copy is resolved from the Unicode Burmese message resource

### Requirement: Unicode Burmese visual support

The system SHALL render Burmese content using Unicode text and a Myanmar-capable font or fallback stack, and SHALL NOT require Zawgyi conversion or Zawgyi-encoded message content.

#### Scenario: Burmese glyph rendering

- **GIVEN** a user opens `/my/about`
- **WHEN** Burmese headings, paragraphs, and navigation labels render
- **THEN** they display readable shaped glyphs with no replacement characters or encoding conversion prompt

#### Scenario: English font compatibility

- **GIVEN** a user opens `/en/about`
- **WHEN** the shared typography stack renders English content
- **THEN** English text remains readable while the stack retains the Myanmar-capable fallback used by `/my`
