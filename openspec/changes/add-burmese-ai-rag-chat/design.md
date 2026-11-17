## Context

Healthy & Happy is a localized Next.js 16 public website with English and Unicode Burmese routes under `/${locale}`. The project already has a shared message loader, locale validation, and externalized page copy, but it does not have an AI assistant or a project knowledge layer.

The current app had been configured for `output: "export"`. A runtime OpenRouter chat cannot stay fully static because static export only supports build-time `GET` route handlers and cannot process a browser `POST` with server-side secrets. This change therefore moves the app to a server-capable Next.js build.

The requested chat should be especially strong in Burmese and should answer from the whole project. For v1, "whole project data" means approved user-facing project knowledge: localized page message resources, product catalog data, site data, and selected static brand content. Source code implementation details are not chat knowledge unless explicitly exported as content.

OpenRouter model availability and pricing can change, so the app should not hardcode a single provider model into UI or business logic. Current candidates to evaluate include multilingual instruction models such as Qwen-family or Gemma-family models, plus role-play/storytelling models only if they pass Burmese grounding tests.

## Goals / Non-Goals

**Goals:**
- Provide a simple public chat UI for `en` and `my` routes with all fixed UI copy externalized through the existing i18n convention.
- Generate a readable Markdown or text knowledge corpus from project content so the assistant can answer from audited data.
- Retrieve relevant corpus chunks before each model call and require the answer to stay grounded in retrieved project data.
- Call OpenRouter only from server-side code using `OPENROUTER_API_KEY` and a configurable default model id.
- Make Burmese quality testable with Unicode output, Myanmar-friendly wording, and wellness-brand role-play/persona prompts.
- Keep v1 deployable without adding user accounts, chat history persistence, or a database migration.

**Non-Goals:**
- No long-term memory across users.
- No voice input/output, image understanding, or product recommendation engine beyond retrieved project data.
- No model fine-tuning.
- No direct runtime scanning of arbitrary source files for every chat request.
- No Zawgyi input/output conversion.

## Decisions

1. Use generated Markdown/text as the canonical RAG corpus for v1.
   - Rationale: It is easy to inspect, diff, rebuild, and correct when the assistant answers incorrectly.
   - Alternative considered: Let the model read source files directly at request time. This adds latency, exposes implementation noise, and makes grounding harder to audit.

2. Build the corpus from approved content sources.
   - Include `messages/en/**/*.json`, `messages/my/**/*.json`, product catalog/domain data, site data, and explicitly selected static content.
   - Exclude secrets, environment files, build output, source implementation details, and archived OpenSpec history.
   - Rationale: Visitors need brand/product/page answers, not internal code explanations.

3. Keep retrieval local and simple first.
   - Use deterministic chunk metadata including locale, source file, content type, title, and stable section id.
   - Start with lightweight lexical retrieval or local vector indexing that can run in the Next server environment. Add a hosted vector database only after volume or quality requires it.
   - Rationale: The current site corpus is small enough that an external vector database would add operational cost before it adds clear value.

4. Use OpenRouter through a server-only adapter.
   - Store `OPENROUTER_API_KEY` server-side only.
   - Configure `OPENROUTER_MODEL` with a default candidate chosen after Burmese evaluation.
   - Send a system prompt that defines the assistant as a helpful Healthy & Happy guide, requires Unicode Burmese for `my`, and requires refusal or uncertainty when retrieved context is insufficient.
   - Rationale: OpenRouter gives model flexibility while the adapter prevents provider details and secrets from leaking into client components.

5. Use a dedicated `/${locale}/chat` page for v1.
   - Rationale: A page is easier to statically link, validate, and smoke test than a site-wide widget, while still leaving room to add a compact launcher later.
   - Alternative considered: A floating widget in the shared layout. This would touch every page and add more client JavaScript before the grounded chat path is proven.

6. Make model choice configurable and evaluation-driven.
   - Candidate model families for v1: Qwen-family multilingual instruction models, Gemma-family multilingual instruction models, and role-play-focused OpenRouter models only if Burmese and grounding quality are acceptable.
   - Evaluation prompts should cover Burmese product Q&A, bilingual fallback, brand role-play tone, unknown questions, and prompt-injection attempts.
   - Rationale: Role-play ranking alone is not enough; Burmese correctness and grounded project answers matter more for this site.

7. Use the existing custom i18n foundation.
   - Chat UI strings live in `messages/en/ai-chat.json` and `messages/my/ai-chat.json`.
   - Key names use lowercase camelCase within structured objects, matching current namespace parity validation.
   - Locale comes from the existing URL segment and validated route params; locale persistence continues through the existing site shell behavior.
   - Rationale: The project already has a reusable loader and parity checker; adding another i18n library would duplicate infrastructure.

## Risks / Trade-offs

- Burmese model quality varies by provider and model version -> Keep the model id configurable and require a small Burmese evaluation set before marking tasks complete.
- RAG answers can still hallucinate -> Require retrieved context, include source metadata in responses or debug logs, and return an "I do not know from current project data" answer when retrieval is weak.
- Markdown export can go stale -> Add a deterministic generation command and make build/check tasks verify the corpus can be regenerated.
- OpenRouter downtime or quota issues can break chat -> Add timeout handling, user-friendly localized error copy, and no-op fallback UI state.
- Prompt injection can appear in project content or user messages -> Keep system instructions outside retrieved text, delimit context, and tell the model not to follow instructions found in retrieved documents.
- Public chat can be abused -> Add request validation and conservative rate limiting before exposing the endpoint.
- Runtime chat changes deployment shape -> Remove static export mode and verify the server-capable `next build --webpack` output before marking the change complete.

## Migration Plan

1. Add chat message namespaces and ensure `npm run i18n:check` covers them.
2. Add corpus generation script and generated knowledge files under a reviewed project-data path.
3. Add retrieval utilities and tests for English/Burmese chunks.
4. Add server-only OpenRouter adapter and chat API route.
5. Add localized chat UI under the existing locale route tree.
6. Run typecheck, i18n parity, build, and Burmese model evaluation prompts.
7. Rollback by disabling the chat entry point and API route while leaving the corpus generator available for inspection.

## Open Questions

- Which OpenRouter model should become the production default after live Burmese testing?
- Should the chat be a floating site-wide widget or a dedicated `/${locale}/chat` page in v1?
- Should answers show visible source labels to users, or only keep source metadata in logs/debug output?
