---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-04T20:00:00Z
title: I Made Claude Code Work While I Sleep (Autonomous AI Workers)
slug: orchestrating-ai-workers
featured: true
draft: false
tags:
  - ai
  - automation
  - devops
  - claude
description: Setting up autonomous Claude Code workers that develop software while I do other things. Yes, I'm basically a manager now.
---

So I had a thought: what if I could have AI agents working on my projects *while I'm not even at my computer*?

Turns out, you can. And it's weirdly satisfying to check on your "employees" and see they've committed code while you were making coffee.

## The Setup

I have a GCP VM running 24/7 (a fancy $25/month e2-medium). On it, I run multiple Claude Code instances in tmux sessions. Each one is assigned to a project and works through a roadmap autonomously.

The architecture looks something like this:

```
Me (Supervisor)
    │
    ├── trialogue-worker (building a multi-LLM chat app)
    ├── webapp-worker (some other project)
    └── api-worker (you get the idea)
```

Each worker reads from a `roadmap.md` file, does the work, and updates a `PROGRESS.md` file. It's like having interns, except they don't need lunch breaks and they actually read the documentation.

## The Magic Command

Here's the incantation that makes it work:

```bash
tmux send-keys -t myproject-worker 'claude --model sonnet --dangerously-skip-permissions -p "Read ../docs/roadmap.md and begin work. Update ../worker/PROGRESS.md with progress."' Enter
```

The `--dangerously-skip-permissions` flag is *chef's kiss*. Without it, Claude asks permission for every file read, which defeats the whole "autonomous" thing. Yes, the flag name is dramatic. No, I'm not running this on anything with my banking credentials.

## The Communication Protocol

Workers and I communicate through files:

- **roadmap.md** — High-level milestones. Worker reads this and figures out what to do.
- **TASKS.md** — Specific assignments if I want to micromanage.
- **PROGRESS.md** — Worker writes updates here. I check it hourly-ish.

It's async communication at its finest. Like Slack, but the other party actually gets things done.

## Does It Actually Work?

Surprisingly, yes.

I started a worker on a new project at 8pm. Went to bed. Woke up to find:
- Complete Next.js frontend scaffold
- FastAPI backend with streaming endpoints
- LiteLLM integration
- A nice commit message

The worker even documented a blocker it found (Node.js version was too old) and continued with what it could do.

## The Catch

Workers use the `-p` (print) flag, which means they exit when done. So it's not *truly* continuous — more like "start task, complete task, stop." I restart them for new milestones.

Also, they can't do things like "run the dev server and click around." They're coders, not QA. That's a *different* autonomous agent project.

## Why This Is Cool

1. **Parallel development** — Multiple projects, one human
2. **Off-hours productivity** — Code happens while I sleep
3. **Documented progress** — Everything's in PROGRESS.md
4. **Git history** — Workers commit their work (no Co-Authored-By though, they're not getting credit)

## The Repo

I documented the whole setup at [orchestration-server-docs](https://github.com/datdiego/orchestration-server-docs). It includes how to set up workers, the file protocol, and various "I broke something" troubleshooting notes.

Now if you'll excuse me, I need to check on my workers. They've been suspiciously quiet.
