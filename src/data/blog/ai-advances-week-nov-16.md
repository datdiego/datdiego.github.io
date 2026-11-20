---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-11-18T04:00:23Z
title: "AI advances of the week"
slug: ai-advances-week-nov-16
featured: false
draft: true
tags:
  - ai
  - news
  - agents
  - security
  - models
description: "My weekly roundup of AI news, from agent protocols and new frontier models to AI-driven offensive security frameworks."
---

I will review at the end of the week and pick the top 5 for video.

## Releasing Personal Agent Protocol 1.0 (5 minute read)

https://sierra.ai/blog/releasing-poppy?utm_source=tldrai

The Personal Agent Protocol enables personal agents to interact with companies through business agents, websites, and APIs. v.0 of the protocol is now available. The protocol defines how personal agents connect with companies that implement it. Customers control what personal agents can and can't do, and can manage their access over time.

## GPT-6 Astra Tackles a Fundamental Physics Problem (15 minute read)

https://openai.com/index/step-toward-defining-the-standard-model/?utm_source=tldrai

Physicist Nathaniel Craig worked with GPT-6 Astra to develop a candidate lattice formulation of the Standard Model, addressing a longstanding challenge in defining the theory without relying on perturbative approximations. Astra helped construct the mathematical framework and develop a detailed proof supporting the proposed approach.

## NVIDIA's Rubin HPC (2 minute read)

[https://blogs.nvidia.com/blog/rubin-hpc/?utm_source=tldrai](https://blogs.nvidia.com/blog/rubin-hpc/?utm_source=tldrai)

Rubin HPC is a new Nvidia GPU designed to speed up the simulations AI agents use in science, engineering, and analytics. It has more than 50,000 cores, a record for a single GPU. It is expected to be available in 2028.

## Advancing computer-use agents for healthcare teams (8 minute read)

https://openai.com/index/advancing-computer-use-for-healthcare-teams/?utm_source=tldrai

OpenAI's computer-use agents streamline healthcare workflows by automating repetitive tasks like MRI authorizations and administrative processes.

# TOP

[**Inside the Loop: Five AI Attack Frameworks that Never Ask Permission (15 minute read)**](https://tracking.tldrnewsletter.com/CL0/https:%2F%2Fwww.elastic.co%2Fsecurity-labs%2Fthreat-command%2Fagentic-offensive-frameworks-detection-artex%3Futm_source=tldrinfosec/1/010001a1e9d8104a-dba84dd0-172a-4d9e-afad-4a075c7aeb42-000000/dhh_ix1nSLzsZ0TtEYZVvOD9nN6fGw7XX-PF7YOpkQo=452)

Elastic analyzed five agentic offensive frameworks: ARTEX, CyberStrikeAI, Cairn, PentAGI, and HexStrike. These tools let an LLM drive scanners, shells, and cloud CLIs in bursts of two to 25 seconds. None of them enforce authorization in code, and ARTEX and CyberStrikeAI switch to new proxies and User-Agents when blocked. GTIG and Mandiant have already seen four of them in real intrusions, and Microsoft has linked ARTEX to Storm-0940. Defenders should choose ahead of time which detections can trigger automatic containment. Defenders should also pair IP blocks with token and session revocation, and track how quickly each identity acts and in what order across sessions rather than relying on framework fingerprints, which Elastic's own ES|QL hunt only partly addresses.

## New foundation model releases

[**Introducing GPT-6.2 Astra and Sol (14 minute read)**](https://tracking.tldrnewsletter.com/CL0/https:%2F%2Flinks.tldrnewsletter.com%2FhDkUEr/1/010001a1ef122589-de8f39ab-867c-4849-8cde-0f3e08a6fbee-000000/-JZAVwE7KCFMu4Kd1cFUyQJb39QJg66AHV6syjorE5Q=452)

OpenAI released GPT-6.2 Astra, a frontier model for the hardest projects, and GPT-6.2 Sol, an efficient everyday model. Both are available now in ChatGPT Work, Codex, and the API.

[**Gemini 4 Neon (12 minute read)**](https://tracking.tldrnewsletter.com/CL0/https:%2F%2Fblog.google%2Finnovation-and-ai%2Fmodels-and-research%2Fgemini-models%2Fintroducing-gemini-4-neon%2F%3Futm_source=tldrai/1/010001a1f43b4c24-4f1519c1-85f8-4df8-b22b-fdb80459b96f-000000/rm7L3u3WKIKBNVzWcaQttXT-XdUinCbkFRKxkIpFm-c=452)

Google introduced Gemini 4 Neon, a fast, frontier-level model for complex coding, knowledge work, and science tasks. It scored 61 on the Artificial Analysis Intelligence Index and is priced at $3 per million input tokens and $15 per million output tokens. [Discuss on TLDR →](https://tracking.tldrnewsletter.com/CL0/https:%2F%2Fcommunity.tldr.tech%2Ft%2Fintroducing-gemini-4-neon%3Futm_source=tldrai%26utm_medium=newsletter%26utm_campaign=2026-11-19/1/010001a1f43b4c24-4f1519c1-85f8-4df8-b22b-fdb80459b96f-000000/Q7l8zUYzDhMzmphwcHwr41_8Fl3jCZ1zoqiQXIb_w7g=452)

---

[**Genie 4 (7 minute read)**](https://tracking.tldrnewsletter.com/CL0/https:%2F%2Fblog.google%2Finnovation-and-ai%2Fmodels-and-research%2Fgoogle-deepmind%2Fgenie-4-now-available-project-genie%2F%3Futm_source=tldrai/1/010001a1f43b4c24-4f1519c1-85f8-4df8-b22b-fdb80459b96f-000000/QJzUuATgEyVUWDySusxgG43jSFQanvZ6fC3SpW_CkdM=452)

Google opened Genie 4, its model for generating interactive worlds, to eligible Google AI Ultra subscribers in Project Genie. Users can edit a world by typing prompts while exploring it.
