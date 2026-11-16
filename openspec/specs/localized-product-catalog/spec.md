## Purpose

Define bilingual, page-scoped product catalog content for Healthy & Happy.

## Requirements

### Requirement: Page-scoped bilingual product resources

The system SHALL provide `product.json` and `product-detail.json` resources for both `en` and `my`, with the same stable product-ID keys and complete visible UI-copy keys for their respective product pages. The product list and detail routes SHALL load these resources through the shared validated page-message contract rather than a product-specific message loader.

#### Scenario: English product resources resolve

- **GIVEN** a user opens an English product route
- **WHEN** the product listing or detail page loads its resources
- **THEN** it resolves the matching English `product.json` and `product-detail.json` data through the shared contract without relying on hardcoded public copy

#### Scenario: Burmese product resources resolve

- **GIVEN** a user opens a Burmese product route
- **WHEN** the product listing or detail page loads its resources
- **THEN** it resolves matching Unicode Burmese `product.json` and `product-detail.json` data through the shared contract with the same product-ID keys as English

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

### Requirement: Locale-aware product navigation and search

The system SHALL preserve the selected locale for product-card, return-to-products, contact/order, and news links, and SHALL search against the selected locale’s product name and series.

#### Scenario: English product flow remains English

- **GIVEN** a user searches or selects a product from `/en/products`
- **WHEN** the user follows a product, return, order, or news link
- **THEN** the resulting matching route remains under `/en`

#### Scenario: Burmese product flow remains Burmese

- **GIVEN** a user searches or selects a product from `/my/products`
- **WHEN** the user follows a product, return, order, or news link
- **THEN** the resulting matching route remains under `/my` and search matches Burmese product name or series text
