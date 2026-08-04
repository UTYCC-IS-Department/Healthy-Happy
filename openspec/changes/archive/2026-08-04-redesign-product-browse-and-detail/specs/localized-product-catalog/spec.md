## MODIFIED Requirements

### Requirement: Localized product catalog rendering

The system SHALL render product names, series, descriptions, ingredients, prices, tags, list-page UI copy, and detail-page labels/actions from the selected locale's resources, while preserving locale-neutral product IDs and media metadata. The product listing SHALL present matching products as a responsive grid in the normal vertically scrollable page flow rather than a horizontal product carousel. Product cards, the detail gallery, and the detail information panel SHALL provide a consistent accessible visual hierarchy for media, badges, tags, prices, and interactive states.

#### Scenario: English catalog content renders

- **GIVEN** a user visits `/en/products` or a valid `/en/products/[id]` route
- **WHEN** the page renders
- **THEN** product content and visible product-page UI copy are English values from the English resources, and catalog results appear as English product cards in the responsive grid

#### Scenario: Burmese catalog content renders

- **GIVEN** a user visits `/my/products` or a valid `/my/products/[id]` route
- **WHEN** the page renders
- **THEN** product content and visible product-page UI copy are Unicode Burmese values from the Burmese resources, and catalog results appear as Burmese product cards in the responsive grid
