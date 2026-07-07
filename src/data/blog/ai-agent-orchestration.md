---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-07-07T15:00:00Z
title: I Made One AI the Manager of All the Other AIs
featured: false
draft: false
tags:
  - ai-agents
  - automation
  - llm
description: Automating real work with AI agents turned out to be less about the agents and more about the middle management. Here's the orchestration pattern I landed on.
---

At some point I stopped writing code and started writing *coworkers*. A fleet of AI agents, each pointed at a different project, all supposedly working while I did other things.

It did not go the way the demos promised. One agent is a genius. A pile of agents left unsupervised is a very expensive way to generate merge conflicts.

The thing nobody tells you: the hard part isn't the agents. It's the **middle management**.

## The Problem

A single agent is great until it isn't. It forgets what it did an hour ago, wanders off the task you gave it, and confidently reports "done" on something that doesn't build. Now imagine ten of them, touching the same repos, on their own schedules. That's not automation — that's a group project.

What I actually needed was structure: someone to hand out the work, someone to check it, and a rule that stops the whole thing from spinning in circles.

## The Idea: Give Them a Boss

So I built a hierarchy. One **orchestrator** — the manager — and a rotating cast of **workers** it delegates to. The orchestrator doesn't write much code itself. Its whole job is deciding what needs doing, spawning a worker for exactly that, and verifying the result before anything counts as finished.

Think less "swarm of autonomous geniuses" and more "one slightly paranoid tech lead running standups."

## Structured Handoffs

The trick that made it actually work: treat agents like contractors, not oracles.

Every task goes out as a structured brief — the goal, the context, which files are fair game, and the exact commands that prove it's done. Every worker reports back in the same shape — status, what it changed, what it ran, and where it got stuck.

No vibes. No "looks good to me." If a worker can't show the verification command passing, the task isn't done. Turns out the single biggest quality upgrade wasn't a smarter model — it was refusing to accept work that couldn't prove itself.

## A State Machine, Not a To-Do List

Each project moves through explicit phases — build, test, review, and so on. The rule is boring and load-bearing: **you can go backward, but you can never skip forward.** If review finds a problem, the project drops back a phase; it doesn't get to sprint ahead because an agent felt optimistic.

This one constraint quietly kills the failure mode where an eager agent declares victory and marches three steps past a broken foundation.

## When Workers Fail (They Will)

The last piece is knowing when to *stop*. Every failure has a retry budget. Miss it, and the item gets escalated to a human — me — instead of looping forever.

Infinite retries are how you wake up to a thousand commits that all say "fix tests" and a repo that's somehow worse than when you went to bed. Bounded retries plus escalation is the difference between an autonomous system and a runaway one.

## What I Actually Learned

Most of the engineering here had nothing to do with prompting. It was the stuff you'd put around any unreliable-but-capable worker: clear specs, verification you can't fake, states you can't skip, and a hard limit on how long anything's allowed to be stuck.

The models keep getting smarter. The scaffolding is what makes a pile of them behave like a team instead of a very polite riot.
