## ADDED Requirements

### Requirement: Combined localized product discovery controls

The system SHALL present a name/series search field and localized category controls on the product catalog. Categories SHALL be derived from the selected locale's de-duplicated product tags and include an all-categories control. The catalog SHALL display only products that match both the active category, when one is selected, and the case-insensitive localized name-or-series search term.

#### Scenario: English search and category filter intersect

- **GIVEN** a user is on `/en/products`
- **WHEN** the user enters an English name or series search term and selects an English category tag
- **THEN** the catalog displays only English-localized products matching both constraints

#### Scenario: Burmese search and category filter intersect

- **GIVEN** a user is on `/my/products`
- **WHEN** the user enters a Unicode Burmese name or series search term and selects a Unicode Burmese category tag
- **THEN** the catalog displays only Burmese-localized products matching both constraints

#### Scenario: User clears catalog filters

- **GIVEN** a catalog has an active category, a search term, or both
- **WHEN** the user activates the localized reset control
- **THEN** the all-categories state is restored, the search term is cleared, and all selected-locale products are displayed

### Requirement: Discoverable filter state and no-results feedback

The system SHALL expose the active category state, a localized count of matching products, and a localized no-results state for the combined filters. Category controls SHALL remain operable on narrow viewports without requiring a product carousel.

#### Scenario: Active category is visually identified

- **GIVEN** a user selects a category on either supported locale
- **WHEN** the catalog rerenders
- **THEN** the selected category has a distinguishable active state and the result count reflects the matching products

#### Scenario: No localized products match

- **GIVEN** a user applies search and category constraints that match no selected-locale products
- **WHEN** the catalog renders the result area
- **THEN** it shows localized no-results feedback and a localized way to reset the filters
