## ADDED Requirements

### Requirement: Source-derived public page set

The system SHALL provide locale-prefixed Home, About, Products, Rewards, Awards, Contact, and not-found pages whose information architecture and responsive visual treatment are derived from `src copy`.

#### Scenario: English public pages are available

- **GIVEN** a user visits each English v1 public route
- **WHEN** the route resolves
- **THEN** the corresponding source-derived page content renders at `/en`, `/en/about`, `/en/products`, `/en/rewards`, `/en/awards`, and `/en/contact`

#### Scenario: Burmese public pages are available

- **GIVEN** a user visits each Burmese v1 public route
- **WHEN** the route resolves
- **THEN** the corresponding page structure renders with Burmese copy at `/my`, `/my/about`, `/my/products`, `/my/rewards`, `/my/awards`, and `/my/contact`

### Requirement: Product listing and detail routes

The system SHALL display the v1 local product catalog and provide a locale-prefixed detail route for each valid stable product ID.

#### Scenario: English product detail

- **GIVEN** an English user selects a listed product with ID `iron-enriched-cookies-1`
- **WHEN** the product route opens
- **THEN** `/en/products/iron-enriched-cookies-1` displays that product's translated image, series, description, ingredients, tags, and price

#### Scenario: Burmese product detail

- **GIVEN** a Burmese user selects a listed product with ID `iron-enriched-cookies-1`
- **WHEN** the product route opens
- **THEN** `/my/products/iron-enriched-cookies-1` displays the same product identity with Burmese localized product content

### Requirement: Unknown product handling

The system SHALL present the localized not-found experience when a product ID is absent from the catalog.

#### Scenario: Unknown English product

- **GIVEN** a user opens `/en/products/unknown-product`
- **WHEN** the product lookup fails
- **THEN** the system responds with the English not-found experience

#### Scenario: Unknown Burmese product

- **GIVEN** a user opens `/my/products/unknown-product`
- **WHEN** the product lookup fails
- **THEN** the system responds with the Burmese not-found experience
