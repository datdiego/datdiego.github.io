---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-18T08:00:00Z
title: "The Night Shift: What My AI Workers Build While I Sleep"
slug: night-shift-ai-workers
featured: true
draft: false
tags:
  - ai
  - orchestration
  - automation
  - claude
description: My AI workers pulled 89 commits across 6 repos in one weekend. Here's what happens when you let autonomous agents run overnight.
---

A couple weeks ago I wrote about [setting up autonomous AI workers](/posts/orchestrating-ai-workers) — Claude Code instances running in tmux sessions, cranking through tasks while I do other things. At the time it was a proof of concept. A fun experiment.

This weekend it became something else entirely.

## The Numbers

Between Saturday and Monday morning, the system produced:

- **89 commits** across 6 repositories
- **3 projects** taken through a full development cycle (dev → QA → security audit → design → QA review → orchestrator review)
- **300+ tests** written and passing
- **Security audits** completed on all 3 apps
- **A complete design system** applied across every frontend
- **Logos and OG images** generated, approved, and integrated

All while I was watching TV, sleeping, or eating tacos.

## How the Night Shift Actually Works

The system runs on a schedule now — 9 automated sessions per day, timed around when I'm not at my computer:

```
Overnight:  1:00 AM, 3:00 AM, 5:30 AM, 8:00 AM
Afternoon:  4:00 PM, 5:30 PM, 7:00 PM
Fallback:   12:00 PM, 10:00 PM
```

Each session, the orchestrator (Claude Opus) wakes up, reads my notes, checks what workers finished, decides what's next, launches new workers, logs everything, and goes back to sleep. It's like having a project manager who never gets tired and never complains about standups.

The workers are Claude Sonnet instances, each specializing in a role:

| Role | What They Do |
|------|-------------|
| **Dev** | Write features, build backends and frontends |
| **QA** | Write tests, run test suites, find bugs |
| **Cyber** | Security audits, fix vulnerabilities, harden configs |
| **Design** | Apply design system themes, integrate logos, UI polish |

When one role finishes, the orchestrator advances the project to the next phase and launches the appropriate worker. It's a pipeline.

## A Real Weekend's Work

Here's what actually happened this weekend, project by project:

### TROTA (Running Analytics App)
Started with: Google OAuth implementation needed.
Ended with: Complete freemium subscription system — OAuth login, 3 subscription tiers, cache-only free tier, pro tier with full DB access, subscription management API, upgrade CTAs throughout the UI, security audit passed, design system applied. **93 tests passing.**

That's 22 commits. One developer would take a week. The workers did it in 48 hours.

### Calisthenics (Workout Generator)
Started with: A project description and nothing else.
Ended with: Full-stack app — FastAPI backend with 38 exercises, workout generation algorithm, Next.js frontend with workout flow UI, workout logging and history, 106 tests, security hardened, design system applied. **Ready for deployment.**

From zero to deployable in 12 commits. The project literally didn't exist on Saturday morning.

### Trialogue (Multi-LLM Chat)
Started with: QA phase needed after debate mode was built.
Ended with: Full cycle complete — security audit (XSS fixes, CSP hardening, input validation), design system applied (mexican-bright theme), logo integrated, QA review passed. **Marked deployment-ready.**

## The Failure Stories

It's not all smooth. Here are some things that went wrong:

**Gemini went on strike.** I tried using Google's Gemini CLI for design workers. It failed spectacularly — the CLI doesn't have write tools, the sandbox blocks file access, and "untrusted folder" detection overrides autonomous mode. Three attempts, three failures. We switched everything to Claude Sonnet and it worked immediately.

**Codex workers couldn't install dependencies.** The OpenAI Codex sandbox doesn't let workers install Python packages. We fixed this by pre-installing all dependencies into uv virtual environments *before* the worker launches. Now every worker gets a ready-to-go environment.

**Workers stepping on each other.** Two workers writing to the same repo at the same time? Bad idea. The session scheduler now separates tasks so only one worker touches each repo at a time.

## The Director Experience

Here's the weird part: my role has completely changed. I'm not a developer anymore. I'm a director.

My actual workflow looks like this:

1. **Morning**: Wake up. Read the email report. See what was built overnight.
2. **Review**: Look at the commits, check the test counts, skim the PROGRESS.md files.
3. **Notes**: Write 5-10 lines of direction in the updates file. "Auth still broken, skip it." "Change the font." "Add cards to the landing page."
4. **Approve**: Look at generated logos, pick the ones I like.
5. **Continue**: Go about my day. The orchestrator reads my notes and adjusts.

The orchestrator sends me email reports with tables showing project status, test counts, phase transitions, and git activity. I just... read them. And occasionally type feedback.

## What I've Learned

**AI workers are better at boring tasks than you think.** Writing 53 backend tests? Running security audits against OWASP top 10? Applying a CSS theme to every component in a frontend? These are tedious, systematic tasks that humans hate and machines handle perfectly.

**The orchestrator pattern matters.** Without the orchestrator managing the pipeline, you'd have chaos. Workers don't know what other workers did. They don't know what phase the project is in. The orchestrator tracks everything and makes sure work flows in the right direction.

**You still need humans for decisions.** The system generates logos and I pick which ones I like. It builds subscription tiers and I decide the pricing model. It applies themes and I say "that font is wrong." The creative and strategic decisions are still mine.

**Failure recovery is automatic.** When a Gemini worker fails, the orchestrator notes it as a blocker, relaunches with a different model, and moves on. When tests fail, it sends the code back to dev. The system handles failure as part of the normal flow, not as a crisis.

## The Meta Moment

Right now, as I write this, the orchestrator is running Session 13. It's 1 AM. I should be sleeping. But the orchestrator? It's checking on QA workers, advancing project phases, and launching new tasks for the blog you're reading right now.

Yes, the AI workers are building the blog that tells you about the AI workers. We've gone full meta.

## What's Next

Three projects are now deployment-ready. The next step is actually deploying them — setting up Vercel and Railway configs, configuring production environment variables, and doing a final director review.

After that? More projects. The system scales linearly: add a TASKS.md, point a worker at it, and let the pipeline run. I have a backlog of ideas that would have taken months to build solo. With this setup, I might clear them in weeks.

The future of software development isn't AI replacing developers. It's AI making one person as productive as a small team. You just have to be comfortable being the director instead of the coder.

And honestly? Waking up to 89 new commits feels pretty good.
