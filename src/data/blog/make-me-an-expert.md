---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-03-03T10:00:00Z
title: "MakeMeAnExpert: I Built an AI That Teaches Me Something New Every Day"
slug: make-me-an-expert
featured: true
draft: false
ogImage: ../../assets/images/mmae-banner.png
tags:
  - ai
  - learning
  - automation
  - claude
description: What if you could become an expert in any subject in 30 days? I built a system that generates personalized daily lessons, quizzes, and uses the Feynman Technique to actually make knowledge stick.
---

![A glowing brain connected to books and knowledge symbols through digital pathways](../../assets/images/mmae-banner.png)

I've always been jealous of people who can casually explain satellite telemetry or quantum computing at a dinner party. Not in a show-off way — in a "this person genuinely understands something deeply" way.

So I built a system to turn myself into one of those people. One subject at a time.

## The Idea

**MakeMeAnExpert (MMAE)** started as a simple cron job. Every morning at 6 AM, I get an email with a lesson on a subject I want to master. Right now it's "AI/ML in Satellites and Space Systems" — because why start easy?

The system generates a 30-day syllabus that ramps from fundamentals to advanced topics. Day 1 might cover orbital mechanics basics. Day 15 digs into onboard ML inference constraints. Day 30 ties everything together with current research frontiers.

But here's the thing — just *reading* something every morning doesn't make you an expert. Passive consumption is how you end up with 47 saved articles you'll never revisit. I needed the system to force active engagement.

## The Science of Actually Remembering Things

Before building the learning features, I went down a research rabbit hole. Turns out, cognitive science has some strong opinions about what works and what doesn't.

**Dunlosky et al. (2013)** reviewed hundreds of learning studies and ranked techniques by effectiveness. The winners?

| Technique | Effectiveness | Why |
|-----------|--------------|-----|
| Practice testing | HIGH | Forces retrieval, strengthens memory pathways |
| Distributed practice | HIGH | Spacing beats cramming every time |
| Self-explanation | MODERATE | Making yourself articulate "why" deepens understanding |
| Highlighting/re-reading | LOW | Feels productive, isn't |

The Feynman Technique — explaining something in simple terms as if teaching a child — aligns with several of these. It forces retrieval (you can't explain what you don't know), self-explanation (you have to articulate the "why"), and exposes gaps (the moment you stumble, you've found what to study next).

So I baked all of this into the system.

## What a Daily Lesson Looks Like

Every morning's email isn't just a wall of text. It's structured to maximize retention:

**1. The Lesson** — 10-15 minutes of content on the day's topic. Real explanations, not Wikipedia summaries. Includes images from NASA and Wikipedia with proper attribution.

**2. Prediction Prompt** — Before the lesson even starts, I'm asked to predict what I think the answer to a key question will be. Research shows that making predictions (even wrong ones) dramatically improves learning because your brain pays more attention to the correction.

**3. Callback Question** — A question that connects today's lesson to a previous day. "How does today's topic on onboard processing relate to the orbital mechanics you learned on Day 3?" This is spaced repetition in disguise.

**4. Feynman Prompt** — "Explain [today's concept] in simple terms, as if teaching someone with no technical background." I write my explanation in a markdown file in the GitHub repo, and an AI grading system reviews it.

**5. Weekly Quizzes** — Days 7, 14, 21, and 30 include cumulative quizzes. The testing effect (Roediger & Karpicke, 2006) shows that retrieval practice improves long-term retention by ~21% compared to re-studying.

## The Grading System

This is where it gets fun. Each lesson auto-generates answer template files in the repo:

```
answers/
  day-01.md    ← prompts auto-populated when email sends
  day-02.md
  ...
  quiz-week-1.md
```

I fill in my answers directly in GitHub (or clone and edit locally), then run:

```bash
./grading/grade.sh day-01
```

The grading script feeds my answer plus the original lesson context to Claude, which evaluates understanding on multiple dimensions — accuracy, depth, ability to connect concepts — and emails me feedback with a score and suggestions for what to review.

It's like having a patient professor who's available at 11 PM and never judges you for confusing azimuth with altitude.

## Building Toward an App

The cron-job-and-GitHub setup works surprisingly well for a single user (me). But I got excited enough about the concept that I started building a proper web app around it.

The architecture:

- **FastAPI backend** with PostgreSQL — user accounts, subjects, lessons, enrollment tracking, answer submission, AI grading
- **Next.js frontend** — dark "scholar" theme, subject catalog, lesson viewer, progress dashboard with streak tracking
- **AI grading pipeline** — answers evaluated by Claude for understanding depth, not just keyword matching

The idea is that anyone could sign up, pick a subject, and get the same structured 30-day deep-dive experience. The system pre-generates lesson content so there's no waiting, and the grading adapts to your level.

## Lessons from Building a Learning System

A few things surprised me while building this:

**Images matter more than I expected.** Adding NASA imagery and Wikipedia diagrams to lessons made them feel substantially more real. A lesson on synthetic aperture radar hits different when you can see an actual SAR image of a coastline.

**The prediction prompt is secretly the best feature.** It feels trivial — "what do you think X does before reading the answer?" — but it consistently makes me pay closer attention to the actual lesson. My brain treats the lesson as a correction rather than new information, which apparently sticks better.

**Weekly quizzes are genuinely stressful** in a productive way. By Day 14, the quiz covers two weeks of material and I consistently discover gaps I thought I'd filled. That's the whole point.

**Archiving lessons to a separate repo** was a small decision with big value. Having a searchable markdown archive of everything I've learned means I can reference Day 4's orbital mechanics when I'm struggling with Day 18's GPS signal processing.

## What's Next

The first 30-day cycle (AI/ML in Satellites) wraps at the end of March. After that I'm eyeing a few more subjects:

- Distributed systems design
- Computational neuroscience
- History of cryptography

The web app is in active development — backend scaffolding and frontend are done, core API endpoints are being built now. The goal is to have it deployed by mid-March so other people can try it.

If you want to follow along with my satellite AI journey, the daily lessons are being archived at [ai-ml-satellites](https://github.com/datdiego/ai-ml-satellites) as they generate.

The honest truth is that I built this because I was tired of feeling like I only *kind of* understood things. Surface-level knowledge is easy to accumulate and useless to apply. MMAE is my attempt to go deeper — one structured, quiz-enforced, Feynman-prompted day at a time.

And hey, I can already explain what a sun-synchronous orbit is at dinner parties. Progress.
