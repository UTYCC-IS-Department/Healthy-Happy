## Purpose

Define the production frontend foundation for the Healthy & Happy public site.

## Requirements

### Requirement: Next.js frontend foundation

The application SHALL use the Next.js App Router with strict TypeScript, Tailwind CSS, local shadcn/ui-compatible primitives where appropriate, and Framer Motion configured for production builds, and SHALL render the Healthy & Happy public site rather than a setup sample.

#### Scenario: Foundation renders the English site

- **GIVEN** the application dependencies and configuration are installed
- **WHEN** a user opens `/en`
- **THEN** the Next.js site renders without runtime or type errors and displays the Healthy & Happy branded home experience

#### Scenario: Foundation renders the Burmese site

- **GIVEN** the application dependencies and configuration are installed
- **WHEN** a user opens `/my`
- **THEN** the same site structure renders without runtime or type errors with Burmese translations

### Requirement: Responsive public site

The public site SHALL provide coherent source-derived mobile and desktop layouts for the shared shell and every v1 public page.

#### Scenario: English desktop layout

- **GIVEN** the user is at `/en` on a desktop viewport
- **WHEN** the page finishes loading
- **THEN** the user sees the responsive branded home layout, primary navigation, product-oriented content, and footer without overflow or overlapping content

#### Scenario: Burmese mobile layout

- **GIVEN** the user is at `/my` on a mobile viewport
- **WHEN** the page finishes loading
- **THEN** the user sees the same content hierarchy in Burmese with readable text and usable mobile navigation

### Requirement: Framer Motion enhancement

The primary public-site content SHALL use Framer Motion only for non-blocking enhancements that respect reduced-motion preferences.

#### Scenario: Motion is enabled

- **GIVEN** the user has not enabled reduced motion
- **WHEN** a motion-enhanced public page mounts
- **THEN** its enhanced content transitions into its final position and remains fully interactive

#### Scenario: Reduced motion is enabled

- **GIVEN** the user has enabled `prefers-reduced-motion: reduce`
- **WHEN** a motion-enhanced public page mounts
- **THEN** the content is available without a noticeable movement transition
