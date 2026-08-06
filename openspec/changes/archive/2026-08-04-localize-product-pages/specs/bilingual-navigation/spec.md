## MODIFIED Requirements

### Requirement: Supported locale routing
The application SHALL support English (`en`) and Burmese (`my`) through locale-aware URL segments for the complete v1 public route set, including every valid product-list and product-detail route, and SHALL keep all user-facing copy in matching external message resources.

#### Scenario: English route uses English messages

- **GIVEN** the user opens `/en/products` or a valid `/en/products/[id]` route
- **WHEN** the page renders
- **THEN** the URL remains under `/en` and all visible product-listing or product-detail copy is loaded from English message resources

#### Scenario: Burmese route uses Burmese messages

- **GIVEN** the user opens `/my/products` or a valid `/my/products/[id]` route
- **WHEN** the page renders
- **THEN** the URL remains under `/my` and all visible product-listing or product-detail copy is loaded from Unicode Burmese message resources
