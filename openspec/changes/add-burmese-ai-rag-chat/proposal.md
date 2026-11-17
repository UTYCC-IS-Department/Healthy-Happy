## Why

Healthy & Happy needs a simple AI chat that can answer visitor questions in natural Unicode Burmese while grounding responses in the actual project content instead of hallucinating brand, product, or page details. Starting with a generated project knowledge file plus RAG keeps v1 small, auditable, and easier to update than connecting the model directly to the whole codebase at runtime.

## What Changes

- Add a public locale-aware AI chat experience for English and Burmese users, with Burmese as a first-class v1 quality target.
- Add a build-time or admin-triggered project knowledge export that converts approved project content into simple Markdown or text documents for retrieval.
- Add a RAG pipeline that chunks, indexes, retrieves, and cites relevant project knowledge before calling OpenRouter.
- Add server-side OpenRouter integration with configurable model, API key handling, timeout, rate-limit, and fallback behavior.
- Add a Burmese quality evaluation path covering Unicode rendering, Myanmar-language answers, and friendly role-play/persona behavior appropriate for a wellness brand.
- Keep v1 scoped to grounded project Q&A and brand/product guidance; do not add accounts, long-term user memory, voice, image chat, or direct database writes.

## Capabilities

### New Capabilities
- `burmese-ai-rag-chat`: Public AI chat, project knowledge export, retrieval grounding, OpenRouter model calls, and Burmese/role-play quality requirements.

### Modified Capabilities
- `localized-wellness-content`: Require the AI chat user-facing copy and Burmese AI responses to follow the existing Unicode-only Burmese content contract.

## Impact

- Affected frontend routes/components: locale-aware public chat UI, likely under the existing `/${locale}` route tree.
- Affected backend/server code: server-only chat API route, OpenRouter client, RAG retrieval utilities, rate limiting, and request validation.
- Affected content/data: generated Markdown or text knowledge files derived from approved pages, product catalog data, message resources, and selected brand content.
- Affected configuration: `OPENROUTER_API_KEY`, default model identifier, optional embedding/index storage path, request limits, and model evaluation prompts.
- Affected dependencies: lightweight retrieval/indexing libraries or local embedding/vector utilities if not already present; avoid browser-exposed OpenRouter secrets.
- Locales in v1: `en` and `my`; Burmese must be Unicode-only. Future locales should be additive through the same locale-aware chat shell and knowledge export process.
