## MODIFIED Requirements

### Requirement: Complete externalized public copy

The system SHALL source all v1 user-facing site-shell and page copy, including product names, attributes, list-page copy, and detail-page labels/actions, from matching external English and Unicode Burmese message resources, with no hardcoded public copy in page or shared-shell components.

#### Scenario: English messages drive public copy

- **GIVEN** a user visits an English public route, including an English product-list or product-detail route
- **WHEN** the route renders
- **THEN** its visible user-facing copy is resolved from the English message resources

#### Scenario: Burmese messages drive public copy

- **GIVEN** a user visits a Burmese public route, including a Burmese product-list or product-detail route
- **WHEN** the route renders
- **THEN** its visible user-facing copy is resolved from the Unicode Burmese message resources
