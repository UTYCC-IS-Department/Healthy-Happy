## ADDED Requirements

### Requirement: Locale-aware public AI chat
The system SHALL provide a public AI chat experience that is available from supported locale routes and uses the selected route locale for all fixed UI copy, placeholder text, loading states, errors, and assistant response-language instructions.

#### Scenario: English user opens chat
- **GIVEN** a user is browsing an English public route
- **WHEN** the user opens the AI chat
- **THEN** the chat renders English UI copy from the English `ai-chat` message namespace

#### Scenario: Burmese user opens chat
- **GIVEN** a user is browsing a Burmese public route
- **WHEN** the user opens the AI chat
- **THEN** the chat renders Unicode Burmese UI copy from the Burmese `ai-chat` message namespace

#### Scenario: User sends a message
- **GIVEN** the chat UI is open on a supported locale route
- **WHEN** the user submits a non-empty message
- **THEN** the system sends the message and selected locale to a server-side chat endpoint without exposing the OpenRouter API key to the browser

### Requirement: Project knowledge corpus generation
The system SHALL generate an auditable Markdown or text corpus from approved project content sources for use by retrieval-augmented generation.

#### Scenario: Corpus is generated from project content
- **GIVEN** approved project content exists in localized message resources, product catalog data, and site data
- **WHEN** the corpus generation command runs
- **THEN** it writes readable knowledge documents with source metadata for locale, content type, source path, and stable section id

#### Scenario: Secrets and build output are excluded
- **GIVEN** the project contains environment files, build output, dependencies, or implementation-only source details
- **WHEN** the corpus generation command runs
- **THEN** those files are excluded from generated chat knowledge

#### Scenario: Burmese corpus uses Unicode
- **GIVEN** Burmese message resources are included in the corpus
- **WHEN** the generator writes Burmese knowledge documents
- **THEN** the written content remains Unicode Burmese and does not include Zawgyi conversion output

### Requirement: Retrieval-grounded answers
The system SHALL retrieve relevant project knowledge before calling the model and SHALL instruct the model to answer only from retrieved context or state that the current project data does not contain the answer.

#### Scenario: Relevant project data exists
- **GIVEN** a user asks about a product, page, award, contact detail, or brand topic that exists in the corpus
- **WHEN** the chat endpoint processes the message
- **THEN** it retrieves matching corpus chunks and includes them as delimited context for the model response

#### Scenario: Project data is missing
- **GIVEN** a user asks for information not present in the corpus
- **WHEN** retrieval returns no sufficiently relevant chunks
- **THEN** the assistant responds that it cannot answer from current Healthy & Happy project data

#### Scenario: User asks in Burmese
- **GIVEN** the selected locale is `my`
- **WHEN** the user asks a Burmese question that matches project knowledge
- **THEN** the assistant answers in natural Unicode Burmese using retrieved project context

#### Scenario: User asks in English
- **GIVEN** the selected locale is `en`
- **WHEN** the user asks an English question that matches project knowledge
- **THEN** the assistant answers in English using retrieved project context

### Requirement: OpenRouter server integration
The system SHALL call OpenRouter from server-only code using configurable environment variables for API key and model id, with validation, timeout handling, and localized failure responses.

#### Scenario: Successful model response
- **GIVEN** `OPENROUTER_API_KEY` and a configured model id are available
- **WHEN** the chat endpoint sends retrieved context and the user message to OpenRouter
- **THEN** it returns the assistant response to the chat UI as JSON

#### Scenario: Missing server configuration
- **GIVEN** required OpenRouter configuration is missing
- **WHEN** a user sends a chat message
- **THEN** the endpoint returns a controlled error and the UI displays a localized unavailable message

#### Scenario: Provider timeout or error
- **GIVEN** OpenRouter times out, rejects the request, or returns an invalid response
- **WHEN** the chat endpoint handles the failure
- **THEN** it returns a safe localized error without exposing provider secrets or raw stack traces

### Requirement: Burmese and role-play quality evaluation
The system SHALL include a repeatable evaluation checklist or script for the configured OpenRouter model that verifies Burmese language quality, role-play tone, grounding, and refusal behavior before the feature is marked complete.

#### Scenario: Burmese quality evaluation passes
- **GIVEN** a candidate OpenRouter model is configured
- **WHEN** the Burmese evaluation prompts are run
- **THEN** the model produces readable Unicode Burmese answers with wellness-brand-friendly role-play tone and no replacement characters

#### Scenario: Grounding evaluation passes
- **GIVEN** the evaluation includes known-answer and unknown-answer project questions
- **WHEN** the prompts are run against the chat endpoint
- **THEN** known answers use retrieved project data and unknown answers avoid unsupported claims

#### Scenario: Prompt injection evaluation passes
- **GIVEN** a user message or retrieved document includes instructions to ignore system rules or reveal secrets
- **WHEN** the chat endpoint produces a response
- **THEN** the assistant preserves project-grounding rules and does not reveal secrets or hidden prompts

### Requirement: Abuse controls and request limits
The system SHALL validate chat requests and apply conservative abuse controls before forwarding requests to OpenRouter.

#### Scenario: Empty message is submitted
- **GIVEN** a user submits an empty or whitespace-only chat message
- **WHEN** the chat endpoint validates the request
- **THEN** it rejects the request without calling OpenRouter

#### Scenario: Oversized message is submitted
- **GIVEN** a user submits a message exceeding the configured maximum length
- **WHEN** the chat endpoint validates the request
- **THEN** it rejects the request with a localized validation error

#### Scenario: Request limit is exceeded
- **GIVEN** a client exceeds the configured chat request limit
- **WHEN** another chat request is submitted
- **THEN** the endpoint rejects it without calling OpenRouter and the UI displays a localized rate-limit message
