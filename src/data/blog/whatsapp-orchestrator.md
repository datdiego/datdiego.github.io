---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-08T12:00:00Z
title: Controlling My Dev Server Through WhatsApp (Because Why Not)
slug: whatsapp-orchestrator
featured: false
draft: false
tags:
  - ai
  - automation
  - whatsapp
  - orchestration
description: Built a WhatsApp bridge so I can check on my AI workers from my phone. Baileys, ban risks, and questionable life choices.
---

I have a problem: I run autonomous AI workers on a remote server, but checking on them requires SSH-ing in from my phone, which is... not fun.

Solution? Build a WhatsApp bridge so I can text "status" and get a reply. Like texting your employees, except they're not real and they don't judge my 2am check-ins.

## The Vision

The goal is simple: send WhatsApp messages to orchestrate the dev server.

```
Me: "status"
Bridge: "Server up, 2 workers active, costs looking fine"

Me: "progress trota"
Bridge: "Phase 6 analytics in progress, HR zones implemented"

Me: "/ask what's left on the roadmap?"
Bridge: *forwards to LLM, returns answer*
```

Eventually, voice notes too. Because typing "check on all projects" is apparently too much effort.

## Baileys vs. Cloud API

WhatsApp has an official Cloud API for businesses. I'm not using it. Here's why:

### The Cloud API Route
- Requires business account registration
- Needs a second phone number (or port your main one)
- Costs money per message (not much, but still)
- Subject to Meta's delightful terms of service
- **In January 2026, Meta banned AI chatbots on Cloud API** (yep)

### The Baileys Route
- Open source library that mimics WhatsApp Web
- No business registration, no extra phone number
- Link via QR code like you would with WhatsApp Web
- Completely free
- Self-hosted on my VM
- Lighter than whatsapp-web.js (no Chromium dependency, ~50MB RAM)

The tradeoff? **Ban risk.**

## The Ban Risk Thing

Let's be clear: using Baileys violates WhatsApp's terms of service. They don't *want* you automating their platform unless you're paying for Cloud API.

### Mitigation Strategy

I'm not exactly running a spam operation here, so the actual risk is manageable:

1. **Use a burner SIM** — Not my main number. If it gets banned, no big deal.
2. **Single user, low volume** — It's just me sending <50 messages/day.
3. **Human-like delays** — Random 1-3 second delays before replying.
4. **Exponential backoff** — Don't hammer their servers on reconnect.
5. **Fallback plan** — If it gets banned, switch to Telegram Bot API (official, free, zero risk).

The gamble: it's a personal use case with minimal message volume. WhatsApp probably doesn't care enough to ban me when they're busy dealing with actual spammers sending thousands of messages per day.

Famous last words? We'll see.

## The Architecture

```
Phone (WhatsApp)
    ↓
WhatsApp Servers (WebSocket)
    ↓
Baileys Library (on dev-server)
    ↓
Command Parser
    ↓
Execute: tmux list / ps aux / read PROGRESS.md / invoke LLM
    ↓
Reply via Baileys
    ↓
Phone
```

The bridge runs as a PM2 service. It maintains a persistent WebSocket connection to WhatsApp's servers, same as WhatsApp Web does in your browser.

## Implementation (Phase 1 MVP)

Phase 1 is the "prove it works" stage:

**Completed:**
- ✅ Baileys connection with QR code pairing
- ✅ Persistent auth state (survives restarts)
- ✅ Whitelist-only message handling (security first)
- ✅ Command parser with simple routing
- ✅ Commands: `status`, `workers`, `costs`, `progress <project>`
- ✅ PM2 process management
- ✅ Health check endpoint
- ✅ Human-like response delays

**Example Commands:**

```bash
# Check server health
"status" → CPU, memory, disk, uptime

# List worker sessions
"workers" → Active tmux sessions with "worker" in the name

# Quick cost summary
"costs" → GCP instance cost estimates

# Project progress
"progress trota" → Reads ~/projects/trota/worker/PROGRESS.md
```

Simple. Effective. No frills.

## What's Next (Phase 2)

- Voice note transcription (Whisper)
- `/ask` commands that forward to the LLM
- Rich message formatting (bold, code blocks)
- Telegram fallback bot (if WhatsApp bans me)

## What's After That (Phase 3)

- Worker dispatch from phone: "start worker on trota phase 7"
- Scheduled status pings (morning reports)
- Screenshot/progress photo attachments

## Why This Matters

The orchestrator architecture is all about *removing friction*. I can already SSH in and run commands. But that's:
- Slow on mobile
- Requires switching apps
- Breaks flow if I'm doing something else

WhatsApp is already on my phone. It's always open. I can check on workers while waiting in line at the grocery store. Or at 2am when I randomly wonder if a worker finished.

It's the difference between "I should check on that later" and actually checking on it.

## The Bigger Picture

This isn't just about WhatsApp. It's about building a **command-and-control interface** for the orchestrator.

Right now I have:
- SSH (full access, heavy)
- WhatsApp bridge (quick status checks, lightweight)

Future interfaces:
- Voice (dictate tasks, get updates)
- Web dashboard (visual monitoring)
- Email (daily/weekly reports)

Each interface serves a different context. SSH for deep work. WhatsApp for quick checks. Voice for brainstorming while walking. Email for passive awareness.

The orchestrator doesn't care how you talk to it. It just works.

## Final Thoughts

Will my WhatsApp account get banned? Maybe. Probably not, but maybe.

Is this a questionable use of technology? Absolutely.

Is it cool? Yes.

Will I switch to Telegram if needed? Also yes.

Now if you'll excuse me, I need to test this thing. Time to send "status" and see what happens.

*Update: It works. My phone buzzed with a server report. I feel like a supervillain.*
