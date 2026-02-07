---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-07T04:00:00Z
title: "Trialogue Is Live: Lessons From Deploying My First AI App"
slug: trialogue-launch
featured: true
draft: false
tags:
  - trialogue
  - ai
  - devops
  - nextjs
  - fastapi
description: Trialogue is live. Here's what went wrong (and right) deploying a Next.js + FastAPI app to Vercel and Railway.
---

[Trialogue](https://trialogue-dun.vercel.app) is live. You can go use it right now. Chat with Claude, Gemini, and Groq side by side, compare their responses, and even try it without any API keys thanks to the built-in demo mode.

It took about a week from "I should build this" to "it's deployed and working." Here's what I learned shipping it.

## The Stack

- **Frontend:** Next.js on Vercel (free tier)
- **Backend:** FastAPI on Railway (free tier)
- **AI:** LiteLLM routing to OpenAI, Anthropic, Google, Groq
- **Architecture:** BYOK (Bring Your Own Key) + demo mode with free models

The whole thing costs me roughly $0/month to host. Users bring their own API keys, or use the demo models (Gemini Flash and Groq Llama) for free.

## Things That Went Sideways

### CORS: The Classic

My favorite bug was a CORS error that wasn't actually a CORS error. When FastAPI crashes with a 500, the CORS middleware never gets to add its headers. So the browser sees "missing CORS headers" and reports that, hiding the actual server crash underneath.

**Lesson:** If you see CORS + 500, ignore CORS. Check your server logs.

### Environment Variables That Aren't

Vercel's `NEXT_PUBLIC_` variables get baked into the JavaScript bundle at build time. Setting them after deploy does nothing. You have to `vercel env add`, then *redeploy*. I spent an embarrassing amount of time wondering why my frontend was still calling `localhost:8000` in production.

### Rate Limiting Is Trickier Than It Looks

I tried to call `slowapi`'s rate limiter dynamically inside a function. Turns out `limiter.limit()` is a decorator factory, not a runtime function. It crashed with a cryptic `AttributeError: 'Request' object has no attribute '__name__'`. Just use the decorator.

Also: your frontend probably has retry logic. Each retry counts against the rate limit. A single user hitting one error can burn through 4+ requests. Set limits higher than you think during development.

### Model IDs Are Not Universal

LiteLLM uses `provider/model` format for some providers (`gemini/gemini-2.0-flash`, `groq/llama-3.3-70b-versatile`) but bare names for others (`gpt-4o`, `claude-sonnet-4-5-20250929`). My backend validator only knew about the bare prefixes, so Gemini and Groq requests got 422'd. Update your validation when you update your model list.

## Things That Went Right

### Demo Mode

Adding server-side demo keys for free models (Gemini Flash and Groq Llama) was the best decision. Users can try the app immediately without signing up for anything. The keys are rate-limited and never exposed to the client. A "DEMO" badge makes it clear when you're using demo vs. your own keys.

### Deploy Backend First

Simple but important: deploy your backend first, get the URL, then set it as a frontend env var. Sounds obvious, but I did it backwards the first time.

### Railway Is Nice

`railway up backend --path-as-root` and you're deployed. One gotcha: `$PORT` in your start command needs to be wrapped in a shell (`sh -c '...'`) or Railway passes it as a literal string. But overall, the developer experience is smooth.

## What's Next

Debate mode is coming — a feature where models actually respond to each other's answers in rounds. Not just side-by-side comparison, but actual AI-to-AI discussion. That's being worked on as you read this.

If you want to try Trialogue: **[trialogue-dun.vercel.app](https://trialogue-dun.vercel.app)**

Source code: **[github.com/datdiego/trialogue](https://github.com/datdiego/trialogue)**

And if you find it useful, [buy me a coffee on Ko-fi](https://ko-fi.com/datdiego).
