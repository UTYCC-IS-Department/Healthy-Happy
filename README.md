This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## AI Chat Runtime

The AI chat uses a server-side Next.js route handler, so this project builds as a server-capable Next.js app instead of a static export. Configure these environment variables locally or in deployment:

```bash
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=qwen/qwen3-235b-a22b-instruct-2507
OPENROUTER_TIMEOUT_MS=20000
AI_CHAT_MAX_MESSAGE_LENGTH=1200
AI_CHAT_RATE_LIMIT_WINDOW_MS=60000
AI_CHAT_RATE_LIMIT_MAX=8
```

Useful commands:

```bash
npm run ai:corpus
npm run ai:check-corpus
npm run ai:evaluate
```

`npm run ai:evaluate` checks the local corpus/retrieval path without calling OpenRouter unless `AI_EVALUATE_LIVE=1` is set and `OPENROUTER_API_KEY` is available.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
