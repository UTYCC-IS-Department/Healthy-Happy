## ADDED Requirements

### Requirement: Next.js frontend foundation
The application SHALL use the Next.js App Router with strict TypeScript, Tailwind CSS, shadcn/ui local components, and Framer Motion configured for production builds.

#### Scenario: Foundation renders in English
- **GIVEN** the application dependencies and configuration are installed
- **WHEN** a user opens `/en`
- **THEN** the Next.js page renders without runtime or type errors and displays the Healthy & Happy sample content

#### Scenario: Foundation renders in Burmese
- **GIVEN** the application dependencies and configuration are installed
- **WHEN** a user opens `/my`
- **THEN** the same page structure renders without runtime or type errors with Burmese translations

### Requirement: Responsive sample page
The sample page SHALL provide a coherent mobile and desktop layout with a header, language control, wellness-oriented introduction, shadcn component demonstration, and setup guidance.

#### Scenario: User views the English sample page
- **GIVEN** the user is at `/en`
- **WHEN** the page finishes loading
- **THEN** the user can see the translated introduction, at least one visible shadcn/ui component, and guidance for adding another shadcn/ui component

#### Scenario: User views the Burmese sample page
- **GIVEN** the user is at `/my`
- **WHEN** the page finishes loading
- **THEN** the user can see the Burmese introduction, the same component demonstration, and Burmese setup guidance without clipped or overlapping text

### Requirement: Framer Motion enhancement
The primary sample content SHALL use a Framer Motion entrance transition that does not block interaction and respects reduced-motion preferences.

#### Scenario: Motion is enabled
- **GIVEN** the user has not enabled reduced motion
- **WHEN** the sample page mounts
- **THEN** the primary content transitions into its final position and remains fully interactive

#### Scenario: Reduced motion is enabled
- **GIVEN** the user has enabled `prefers-reduced-motion: reduce`
- **WHEN** the sample page mounts
- **THEN** the content is available without a noticeable movement transition

### Requirement: shadcn addition guidance
The sample page SHALL show a concise, copyable command and explanation for adding a new shadcn/ui component, and the demonstrated UI SHALL be implemented from local shadcn/ui source files.

#### Scenario: Developer reads the English guide
- **GIVEN** the user is at `/en`
- **WHEN** the user reviews the component guide
- **THEN** the page shows the `shadcn` add-component command and identifies the local UI component usage

#### Scenario: Developer reads the Burmese guide
- **GIVEN** the user is at `/my`
- **WHEN** the user reviews the component guide
- **THEN** the page shows the same actionable command with Burmese explanatory text
