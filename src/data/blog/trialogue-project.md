---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-04T21:00:00Z
title: "Trialogue: Making LLMs Argue With Each Other"
slug: trialogue-project
featured: false
draft: false
tags:
  - ai
  - llm
  - nextjs
  - fastapi
  - project
description: Building a multi-LLM chat app where GPT-4, Claude, and Gemini can have a three-way conversation. BYOK so I don't go bankrupt.
---

What if you could ask a question and get three different AI perspectives at once?

That's the idea behind Trialogue — a web app where GPT-4, Claude, and Gemini (or whatever models you want) respond simultaneously in a three-way conversation.

And yes, an AI worker is building most of it while I write this blog post.

## The Problem

Every LLM has different strengths:
- **GPT-4** — Great at reasoning, sometimes verbose
- **Claude** — Better at nuance, sometimes too careful
- **Gemini** — Fast, good at factual stuff

When I'm trying to figure something out, I often find myself checking multiple models. Copy question, paste in ChatGPT, copy question, paste in Claude... you get it.

## The Solution

One interface, three models, parallel responses. You ask once, you get three perspectives side by side.

The twist: **BYOK (Bring Your Own Key)**. You plug in your own API keys, and the app never stores them. They live in your browser's localStorage and get passed in request headers. I'm not paying for your tokens, and I'm not storing your credentials.

## The Stack

- **Frontend:** Next.js 16 + Tailwind CSS
- **Backend:** FastAPI (Python)
- **LLM Abstraction:** LiteLLM (one API for 100+ models)
- **Storage:** LocalStorage for keys, nothing server-side

LiteLLM is the secret sauce here. It lets you call OpenAI, Anthropic, Google, Groq, and a bunch of other providers through a single interface. Change the model name, everything else stays the same.

## Current Progress

An AI worker (yes, really) has been building this project. So far:

**Milestone 1: Project Foundation** ✅
- Next.js frontend with Tailwind
- FastAPI backend scaffold
- LiteLLM integration
- Streaming chat endpoint

**Milestone 2: Core Backend** ✅
- Actual LiteLLM API calls
- SSE streaming responses
- API key validation
- Provider/model mapping

**Milestone 3: Frontend** 🔄 *in progress*
- Three-column chat layout
- Model selector
- API key settings modal

You can follow along at [github.com/datdiego/trialogue](https://github.com/datdiego/trialogue).

## The Architecture

```
Browser (your keys in localStorage)
    │
    ▼
FastAPI Backend (stateless, doesn't store anything)
    │
    ▼
LiteLLM → OpenAI / Anthropic / Google / Groq
```

Keys go in the request header (`X-OpenAI-Key`, etc.), never in the body, never in logs. The backend is just a pass-through that handles streaming.

## Why Three?

Three models is a good number. Two is just "compare." Four feels crowded. Three lets you see:
- Where models agree (probably reliable)
- Where they disagree (worth investigating)
- Different reasoning styles

It's like having a panel of experts, except they're all hallucinating with varying confidence levels.

## Free Tier Hacking

The app will suggest free-tier models when available:
- **Gemini 1.5 Flash** — Google's free tier is generous
- **Groq** — Stupid fast, has a free tier
- **Claude Haiku** — Limited free tier exists

So you can test the app without spending money. Nice, right?

## What's Next

Once the frontend is done:
- Debate mode (models respond to each other)
- Response comparison view
- Dark mode (obviously)
- Deploy somewhere (Vercel + Railway probably)

But first, I should go check on that worker. It's been quiet for 20 minutes and either it's done or something broke.

---

*This post will be updated as the project progresses. Or I'll write a "Trialogue v2" post. We'll see.*
