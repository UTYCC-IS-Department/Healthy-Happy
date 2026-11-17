## 1. Setup and Architecture Checks

- [x] 1.1 Read the relevant Next.js 16 docs in `node_modules/next/dist/docs/` for App Router route handlers, Server Components, environment variables, and any API deprecations before writing implementation code.
- [x] 1.2 Inspect the current locale route tree, message loader, product catalog, site data, and build scripts to confirm exact integration points.
- [x] 1.3 Choose the v1 chat entry point shape, either a dedicated `/${locale}/chat` page or a compact site-wide widget, and document the chosen route/component ownership.
- [x] 1.4 Add required environment variable names and local setup notes for `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, request limits, and model timeout.

## 2. Localized Chat Copy

- [x] 2.1 Add `messages/en/ai-chat.json` with chat labels, placeholder, actions, loading text, validation errors, unavailable state, rate-limit copy, and accessibility labels.
- [x] 2.2 Add matching Unicode Burmese `messages/my/ai-chat.json` with identical key structure.
- [x] 2.3 Wire the chat page or widget Server Component through the existing validated message loader and pass only needed serializable copy into Client Components.
- [x] 2.4 Run `npm run i18n:check` and fix any message parity issues.

## 3. Project Knowledge Corpus

- [x] 3.1 Create a deterministic corpus generation script that reads approved project content sources and writes Markdown or text knowledge files with stable source metadata.
- [x] 3.2 Include localized message resources, product catalog data, site data, and selected brand/static content in the generated corpus.
- [x] 3.3 Exclude secrets, environment files, build output, dependency folders, implementation-only source details, and OpenSpec archives from the generated corpus.
- [x] 3.4 Add a package script for regenerating the corpus and verify the generated files are readable and diff-friendly.
- [x] 3.5 Add checks or tests confirming Burmese generated corpus text remains Unicode and source metadata is present.

## 4. Retrieval Layer

- [x] 4.1 Implement chunk loading with metadata for locale, source path, content type, title, and stable section id.
- [x] 4.2 Implement simple local retrieval suitable for the current corpus size, with relevance scoring and a minimum confidence threshold.
- [x] 4.3 Add tests for English and Burmese retrieval against known project questions.
- [x] 4.4 Add behavior for weak or empty retrieval that returns a grounded "not in current project data" result without calling unsupported content facts.

## 5. OpenRouter Chat Backend

- [x] 5.1 Implement a server-only OpenRouter client adapter that reads configuration from environment variables and never exposes secrets to client code.
- [x] 5.2 Implement the chat route handler with strict JSON request validation for locale, message length, empty messages, and supported locales.
- [x] 5.3 Compose model prompts with delimited retrieved context, the Healthy & Happy guide persona, Unicode Burmese response rules for `my`, and prompt-injection resistance instructions.
- [x] 5.4 Add timeout handling, provider error handling, safe JSON responses, and localized UI error states.
- [x] 5.5 Add conservative request limiting before forwarding requests to OpenRouter.

## 6. Chat Frontend

- [x] 6.1 Build the chat UI using existing project styling conventions with stable responsive layout for mobile and desktop.
- [x] 6.2 Support message submit, pending state, validation errors, provider unavailable state, and rate-limit state.
- [x] 6.3 Preserve selected locale in requests and render English or Unicode Burmese assistant messages without glyph or layout issues.
- [x] 6.4 Ensure the UI does not hardcode user-facing copy outside message resources.

## 7. Model Evaluation and Verification

- [x] 7.1 Create a repeatable Burmese and role-play evaluation checklist or script for candidate OpenRouter models.
- [ ] 7.2 Evaluate the configured model with Burmese known-answer, English known-answer, unknown-answer, role-play tone, and prompt-injection prompts.
- [x] 7.3 Record the selected default model id and rationale in project documentation or environment notes.
- [x] 7.4 Run `npm run typecheck`.
- [x] 7.5 Run `npm run build`.
- [x] 7.6 Run `openspec validate --changes` and fix any spec/task validation failures.
