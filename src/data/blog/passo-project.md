---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-18T20:00:00Z
title: "Passo: Building a Bodyweight Workout App in a Weekend"
slug: passo-project
featured: true
draft: false
tags:
  - projects
  - fitness
  - ai
  - passo
description: "How I built Passo — a bodyweight workout generator that adapts to your fitness level — using AI workers and a weekend of coding."
---

![Passo bodyweight workout app illustration](/images/passo-hero.png)

No weights. No gym membership. No excuses.

That's the pitch for [Passo](https://passo-pi.vercel.app) — a bodyweight workout generator I built (mostly via AI workers) over a weekend. The name comes from the Italian for "step" — as in, your next step is always ready.

## What is Passo?

Passo generates bodyweight workout routines that adapt to your fitness level. You pick a difficulty, it hands you a workout. Push-ups, squats, lunges, planks — the kind of exercises you can do in your living room at 6am without waking up your neighbors or your bank account.

The core idea: remove every possible excuse between you and actually doing the workout. No loading a YouTube video. No hunting for equipment. Just open the app, pick your level, and go.

## The Stack

- **Backend:** FastAPI (Python) — because it's fast to build and fast to run
- **Frontend:** Next.js — I wanted server-side rendering and a good mobile feel
- **Database:** SQLite — because it's a personal fitness app, not Twitter

Simple on purpose. Passo is a tool, not a platform.

## Key Features

**Workout Generation** — The app picks exercises, sets, and reps based on your chosen difficulty level. Beginner gets a manageable circuit. Advanced gets something that will make you question your life choices.

**Difficulty Badges** — Each workout shows a clear badge: Beginner, Intermediate, Advanced. No ambiguity about what you're signing up for. You can filter workouts by level or just browse and pick whatever looks appropriately terrifying that day.

**Active Workout Mode** — This is the part I use most. You start a workout and get a guided view: exercise name, reps, a timer, and clear next/done buttons. No scrolling back up to remember what comes next. The app holds your hand just enough.

**Post-Workout Feedback** — After you finish, you rate how it went: too easy, just right, or "I can't feel my arms." This feedback loops back into future workout selection, slowly nudging you toward the right challenge level.

## Built by AI Workers (Again)

If you've read my post on [orchestrating AI workers](/posts/orchestrating-ai-workers), you know the drill. I describe what I want, workers implement it, I review and redirect.

Passo was no different. I wrote a `TASKS.md` with the feature list and system design, pointed a worker at the repo, and went to make coffee. The worker handled the FastAPI endpoints, SQLite schema, Next.js components, and deployment config.

Was it perfect on the first pass? No. The initial workout generation logic was too random — it didn't account for exercise sequencing (don't put two leg exercises back-to-back if you can avoid it) or muscle group balance. That took a second session to fix.

But the scaffolding? The API boilerplate? The repetitive CRUD work? All done without me typing a line.

## What's Coming in v2

The current version is functional but minimal. The backlog for v2 includes:

- **Exercise images** — Short animated GIFs or illustrations showing proper form. Big for beginners who might not know what a "Bulgarian split squat" looks like.
- **Progression tracking** — Log your workouts over time and see a simple chart. Nothing fancy. Just "you did 3 workouts this week, up from 1 last week."
- **Rest timers** — Built-in countdown between sets. Obvious feature I somehow shipped without.
- **Custom workouts** — Let users build and save their own circuits. This gets into full CRUD territory but it's the natural next step.

## Try It

[Passo](https://passo-pi.vercel.app) is live. No account required — just open it, pick a difficulty, and move.

If you find a bug, a weirdly unbalanced workout, or an exercise that should not exist, feel free to yell at me online. That's what the feedback button is for.

The code will be on GitHub once I clean up the embarrassing parts. Which might be a while.
