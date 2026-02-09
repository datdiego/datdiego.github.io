---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-09T06:00:00Z
title: "TROTA: Building a Running Analytics App with AI Workers"
slug: trota-project
featured: false
draft: false
tags:
  - projects
  - fitness
  - ai-workers
  - fastapi
  - react
description: A running analytics app built almost entirely by autonomous AI workers. Garmin sync, climb detection, HR zones, and more.
---

## What is TROTA?

TROTA is a personal running analytics app. Think of it as a lightweight, self-hosted alternative to the analytics features you'd find in Strava or Garmin Connect — but focused specifically on the things I care about as a runner.

The stack is FastAPI (Python) on the backend, React on the frontend, and SQLite for storage. Nothing fancy. The interesting part is *how* it was built.

## Built by AI Workers

Most of TROTA was built by autonomous Claude Code workers running on my dev server. I'd write up a task description, point a worker at it, and come back later to review the results. Six phases of development, each one handled by a worker session running in tmux.

The workflow looked something like this:

1. I write what I want in a `TASKS.md` file
2. A worker picks it up and starts coding
3. It updates `PROGRESS.md` as it goes
4. I review, give feedback, assign next batch

It's not magic — I still had to course-correct, review code, and occasionally step in for architectural decisions. But the grunt work? That was all the workers.

## What It Does

**Garmin Sync** — Connects to your Garmin account and pulls activity data. GPX tracks, heart rate, elevation, the works. No manual file uploads needed.

**Route Grouping** — Uses DBSCAN clustering to automatically group runs by GPS coordinates. So all your "morning loop" runs get grouped together, and you can compare your performance over time on the same route.

**Climb Detection** — This one was fun. TROTA analyzes elevation data to find steep climbs in your runs, then categorizes them using Tour de France standards: Cat 4, Cat 3, Cat 2, Cat 1, and HC (Hors Catégorie). We set the minimum threshold at 8% gradient and 30m elevation gain, so it only flags genuinely steep sections.

**HR Zone Analysis** — Five-zone model (Recovery through VO2 Max) with time-in-zone breakdowns, color-coded charts, and per-activity analysis. You can customize your zone thresholds or let it estimate your max HR from age.

**Goals Tracking** — Set distance, elevation, or activity count goals with date ranges and track progress.

## The Climb Analysis Pivot

Originally, TROTA had a "segment analysis" feature — basically detecting interesting sections of a route and tracking your performance on them. Sound familiar? Yeah, that's basically what Strava does, and it's their core IP.

So we pivoted. Instead of generic segments, TROTA now focuses exclusively on **climb detection**. It's a narrower feature but it's genuinely useful for trail runners and hill enthusiasts, and it doesn't step on anyone's toes. The categorization system (Cat 4 through HC) is public domain — it's been used in professional cycling for decades.

## What's Next

Phase 7 is on the horizon: user authentication, PostgreSQL migration, and eventually cloud deployment. But honestly, as a personal tool running locally, it already does everything I need.

The real lesson from TROTA isn't the app itself — it's the development process. Having AI workers handle the implementation while I focus on architecture and product decisions is a workflow I'm increasingly sold on. Not every task lands perfectly, but the velocity is remarkable.

If you're curious about the autonomous worker setup, check out my earlier post on [orchestrating AI workers](/posts/orchestrating-ai-workers).

The code is on [GitHub](https://github.com/datdiego/TROTA).
