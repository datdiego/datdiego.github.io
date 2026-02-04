---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-04T19:00:00Z
title: My $25/Month AI Development Server (GCP Setup)
slug: cloud-dev-server
featured: false
draft: false
tags:
  - devops
  - gcp
  - cloud
  - remote-development
description: How I set up a cheap GCP VM as a persistent development environment for AI coding agents. SSH from my phone, code from anywhere.
---

I wanted a development server that:
1. Runs 24/7
2. Costs less than my coffee habit
3. I can access from literally anywhere (including my phone)

Turns out, GCP's e2-medium VM is perfect for this. $25/month, and I can SSH in from the bus to check on my AI workers. Living in the future is weird.

## The Specs

Nothing fancy:
- **VM:** e2-medium (2 vCPU, 4GB RAM)
- **OS:** Ubuntu 22.04
- **Storage:** 50GB balanced persistent disk
- **Node.js:** v20.20.0
- **Python:** 3.10.12

The important part: it's a **Standard** VM, not a Spot instance. Spot instances are cheaper but Google can yeet them at any moment. I learned this the hard way when my VM disappeared mid-task.

## The Mistake I Made

I initially set up a Spot VM to save money. Bad idea.

Spot VMs can be preempted (killed) whenever Google needs the resources. Great for batch processing. Terrible for a development server where you have tmux sessions you'd like to keep alive.

Migrating from Spot to Standard required creating a whole new VM from a disk snapshot. Fun afternoon.

## SSH From Anywhere

The killer feature is phone access. I use Termius on Android, and I can:
1. SSH into the server
2. Attach to tmux sessions
3. Check on my AI workers
4. Look like a hacker at coffee shops

The tmux sessions persist even when I disconnect. So I can start something on my laptop, close the lid, and pick it up on my phone later. The session just... keeps existing.

## Project Structure

Every project follows the same pattern:

```
~/projects/myproject/
├── PRD.md              # Product requirements
├── docs/               # roadmap.md, architecture.md
├── repo/               # Git repository (actual code)
└── worker/             # AI worker communication files
```

The `worker/` folder is where the magic happens — my Claude Code workers read tasks and write progress reports there. But that's [another post](/posts/orchestrating-ai-workers).

## The Essentials

Things I installed immediately:
- **tmux** — Session persistence
- **gh** — GitHub CLI (authenticated)
- **msmtp** — Email notifications (because I like being pinged about costs)
- **Node.js 20** — For frontend development
- **Python venv** — For backend stuff

## Cost Monitoring

GCP will happily charge you for things you forgot you spun up. I set up a daily email that tells me what I'm spending:

```bash
# Runs every morning at 8am
0 8 * * * ~/cost-monitor.sh
```

The script uses `gcloud billing` commands to fetch costs and emails me a summary. Peace of mind for $0/month extra.

## The Docs

I documented everything at [orchestration-server-docs](https://github.com/datdiego/orchestration-server-docs):
- Server setup
- Phone SSH access
- Security hardening
- Worker orchestration

Because future me will definitely forget how this all works.

## Worth It?

For $25/month, I get:
- Persistent development environment
- AI workers running while I sleep
- Access from any device
- Excuse to SSH into things from my phone

The ROI calculation is left as an exercise for the reader. But hey, at least I'm not paying for a coworking space.
