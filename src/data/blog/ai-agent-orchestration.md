---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-07-07T15:00:00Z
modDatetime: 2026-07-07T22:00:00Z
title: I Made One AI the Manager of All the Other AIs
featured: false
draft: false
tags:
  - ai-agents
  - automation
  - llm
description: I built a fleet of AI agents to do real work, and the hard part turned out to be middle management. Here's the orchestration pattern I landed on — and the research, with numbers, that says why it works.
---

At some point I stopped writing code and started writing *coworkers*. A fleet of AI agents, each pointed at a different project, all supposedly working while I did other things.

It did not go the way the demos promised. One agent is a genius. A pile of agents left unsupervised is a very expensive way to generate merge conflicts.

The thing nobody tells you: the hard part isn't the agents. It's the **middle management**. And I'm not just reporting a hunch — over the last year a handful of research groups quantified exactly the potholes I kept hitting, and the numbers below are theirs, not mine.

## The Problem, With Receipts

A single agent is great until it isn't. It forgets what it did an hour ago, wanders off the task you gave it, and confidently reports "done" on something that doesn't build. Now imagine ten of them, touching the same repos, on their own schedules. That's not automation — that's a group project.

None of those failure modes are personal. They're measured. A team out of UC Berkeley (Cemri et al.) hand-annotated more than 1,600 execution traces across seven popular multi-agent frameworks and built [a taxonomy of *why* these systems fail](https://arxiv.org/abs/2503.13657). The striking part is that only a minority of failures are the model being "dumb." Most are **organizational** — the kind of thing a decent manager exists to prevent.

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="Bar chart of multi-agent failure categories: specification and system design 41.8 percent, inter-agent misalignment 36.9 percent, task verification 21.3 percent." viewBox="0 0 640 205" style="display:block;width:100%;height:auto;max-width:600px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <line x1="205" y1="30" x2="205" y2="192" stroke="var(--border)" stroke-width="1"/>
  <rect x="205" y="44" width="407" height="32" rx="4" fill="var(--muted)"/>
  <rect x="205" y="44" width="378.1" height="32" rx="4" fill="var(--accent)"/>
  <text x="197" y="65" text-anchor="end" font-size="12.5" fill="var(--foreground)">Specification &amp; design</text>
  <text x="591" y="65" text-anchor="start" font-size="14" font-weight="700" fill="var(--foreground)">41.8%</text>
  <rect x="205" y="96" width="407" height="32" rx="4" fill="var(--muted)"/>
  <rect x="205" y="96" width="333.7" height="32" rx="4" fill="var(--accent)"/>
  <text x="197" y="117" text-anchor="end" font-size="12.5" fill="var(--foreground)">Inter-agent misalignment</text>
  <text x="547" y="117" text-anchor="start" font-size="14" font-weight="700" fill="var(--foreground)">36.9%</text>
  <rect x="205" y="148" width="407" height="32" rx="4" fill="var(--muted)"/>
  <rect x="205" y="148" width="192.6" height="32" rx="4" fill="var(--accent)"/>
  <text x="197" y="169" text-anchor="end" font-size="12.5" fill="var(--foreground)">Task verification</text>
  <text x="406" y="169" text-anchor="start" font-size="14" font-weight="700" fill="var(--foreground)">21.3%</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 1.</strong> Where multi-agent LLM systems break, by category — hardly ever raw model stupidity, mostly bad specs, agents talking past each other, and nobody checking the result. Data: Cemri et al., <a href="https://arxiv.org/abs/2503.13657"><em>Why Do Multi-Agent LLM Systems Fail?</em></a> (2025), 1,600+ traces across 7 frameworks.</figcaption>
</figure>

That third bar — nobody checking the result — is the one that used to bite me at 2 a.m. But the first two are where the volume is, and they're pure management failures: fuzzy instructions and agents that can't see what their peers are doing.

The "forgets what it did an hour ago" problem has its own literature, too. Language models get measurably *worse* at using information as it drifts toward the middle of a long context — the now-famous ["lost in the middle" curve](https://arxiv.org/abs/2307.03172). Stuff at the start and end stays sharp; the muddled middle quietly falls out of attention.

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="A U-shaped curve showing model accuracy is high when the key fact is at the start or end of a long context and sags when it is in the middle." viewBox="0 0 640 245" style="display:block;width:100%;height:auto;max-width:560px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <line x1="72" y1="28" x2="72" y2="198" stroke="var(--border)" stroke-width="1"/>
  <line x1="72" y1="198" x2="600" y2="198" stroke="var(--border)" stroke-width="1"/>
  <path d="M96,66 C 190,84 252,150 330,152 C 412,154 500,86 588,64" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="96" cy="66" r="5" fill="var(--accent)" stroke="var(--background)" stroke-width="2"/>
  <circle cx="330" cy="152" r="5" fill="var(--accent)" stroke="var(--background)" stroke-width="2"/>
  <circle cx="588" cy="64" r="5" fill="var(--accent)" stroke="var(--background)" stroke-width="2"/>
  <text x="40" y="116" text-anchor="middle" transform="rotate(-90 40 116)" font-size="11.5" fill="var(--muted-text)">accuracy</text>
  <text x="96" y="216" text-anchor="middle" font-size="11" fill="var(--muted-text)">start</text>
  <text x="330" y="216" text-anchor="middle" font-size="11" fill="var(--muted-text)">middle</text>
  <text x="588" y="216" text-anchor="middle" font-size="11" fill="var(--muted-text)">end</text>
  <text x="336" y="236" text-anchor="middle" font-size="11.5" fill="var(--muted-text)">position of the key fact within a long context &#8594;</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 2.</strong> The "lost in the middle" effect: an agent's recall of its own earlier steps degrades as they slide into the middle of a growing context window. Shape after Liu et al., <a href="https://arxiv.org/abs/2307.03172"><em>Lost in the Middle</em></a> (2023); illustrative.</figcaption>
</figure>

So the first thing I had to accept: I wasn't going to prompt my way out of this. The failures are structural, so the fix had to be structural too.

## The Idea: Give Them a Boss

So I built a hierarchy. One **orchestrator** — the manager — and a rotating cast of **workers** it delegates to. The orchestrator doesn't write much code itself. Its whole job is deciding what needs doing, spawning a worker for exactly that, and verifying the result before anything counts as finished.

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="Diagram: a human director hands work to an orchestrator, which sends structured briefs down to three workers (dev, QA, security), each with its own context window, and receives verified results back." viewBox="0 0 640 352" style="display:block;width:100%;height:auto;max-width:600px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <defs>
    <marker id="ar" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--muted-text)"/></marker>
    <marker id="arA" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)"/></marker>
  </defs>
  <rect x="225" y="16" width="190" height="46" rx="10" fill="var(--muted)" stroke="var(--border)" stroke-width="1"/>
  <text x="320" y="44" text-anchor="middle" font-size="14" font-weight="600" fill="var(--foreground)">Director (human)</text>
  <line x1="320" y1="62" x2="320" y2="124" stroke="var(--muted-text)" stroke-width="1.5" marker-end="url(#ar)"/>
  <rect x="205" y="126" width="230" height="66" rx="12" fill="var(--muted)" stroke="var(--accent)" stroke-width="2"/>
  <text x="320" y="156" text-anchor="middle" font-size="15" font-weight="700" fill="var(--foreground)">Orchestrator</text>
  <text x="320" y="177" text-anchor="middle" font-size="11.5" fill="var(--muted-text)">plans · delegates · verifies</text>
  <line x1="295" y1="194" x2="128" y2="258" stroke="var(--muted-text)" stroke-width="1.5" marker-end="url(#ar)"/>
  <line x1="318" y1="194" x2="316" y2="258" stroke="var(--muted-text)" stroke-width="1.5" marker-end="url(#ar)"/>
  <line x1="345" y1="194" x2="512" y2="258" stroke="var(--muted-text)" stroke-width="1.5" marker-end="url(#ar)"/>
  <line x1="176" y1="260" x2="303" y2="196" stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="5 4" marker-end="url(#arA)"/>
  <line x1="372" y1="260" x2="337" y2="196" stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="5 4" marker-end="url(#arA)"/>
  <line x1="566" y1="260" x2="360" y2="196" stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="5 4" marker-end="url(#arA)"/>
  <rect x="34" y="262" width="176" height="70" rx="10" fill="var(--muted)" stroke="var(--border)" stroke-width="1"/>
  <text x="122" y="290" text-anchor="middle" font-size="13" font-weight="600" fill="var(--foreground)">Worker · dev</text>
  <text x="122" y="310" text-anchor="middle" font-size="10.5" fill="var(--muted-text)">own context window</text>
  <rect x="232" y="262" width="176" height="70" rx="10" fill="var(--muted)" stroke="var(--border)" stroke-width="1"/>
  <text x="320" y="290" text-anchor="middle" font-size="13" font-weight="600" fill="var(--foreground)">Worker · QA</text>
  <text x="320" y="310" text-anchor="middle" font-size="10.5" fill="var(--muted-text)">own context window</text>
  <rect x="430" y="262" width="176" height="70" rx="10" fill="var(--muted)" stroke="var(--border)" stroke-width="1"/>
  <text x="518" y="290" text-anchor="middle" font-size="13" font-weight="600" fill="var(--foreground)">Worker · security</text>
  <text x="518" y="310" text-anchor="middle" font-size="10.5" fill="var(--muted-text)">own context window</text>
  <line x1="40" y1="150" x2="70" y2="150" stroke="var(--muted-text)" stroke-width="1.5"/>
  <text x="76" y="154" text-anchor="start" font-size="10.5" fill="var(--muted-text)">structured brief</text>
  <line x1="40" y1="172" x2="70" y2="172" stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="5 4"/>
  <text x="76" y="176" text-anchor="start" font-size="10.5" fill="var(--muted-text)">verified result</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 3.</strong> The orchestrator–worker pattern I run: the manager hands each worker a scoped brief, each worker gets its own fresh context window, and results only count once verified. It mirrors Anthropic's <a href="https://www.anthropic.com/engineering/multi-agent-research-system">lead-agent / subagent design</a> and the role split in <a href="https://arxiv.org/abs/2308.00352">MetaGPT</a>.</figcaption>
</figure>

This isn't a personal quirk; it's roughly the shape Anthropic landed on for their own [multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system): a lead agent that plans and delegates, and subagents that each work a slice with their own context window. Giving each worker a fresh window is half the point — it's a direct dodge of the "lost in the middle" decay from Figure 2, because no single agent has to hold the entire project in its head.

In Anthropic's internal evals, that arrangement (an Opus lead with Sonnet subagents) beat a single Opus agent by a wide margin — but at a real cost.

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="Two stat cards: multi-agent quality was 90.2 percent higher than a single agent on the research eval, at roughly 15 times the token cost of a one-turn chat." viewBox="0 0 640 176" style="display:block;width:100%;height:auto;max-width:600px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <rect x="46" y="24" width="258" height="128" rx="14" fill="var(--muted)" stroke="var(--border)" stroke-width="1"/>
  <text x="175" y="54" text-anchor="middle" font-size="11" letter-spacing="1.4" fill="var(--muted-text)">RESEARCH-EVAL QUALITY</text>
  <text x="175" y="104" text-anchor="middle" font-size="42" font-weight="800" fill="var(--accent)">+90.2%</text>
  <text x="175" y="130" text-anchor="middle" font-size="12" fill="var(--muted-text)">vs. a single-agent baseline</text>
  <rect x="336" y="24" width="258" height="128" rx="14" fill="var(--muted)" stroke="var(--border)" stroke-width="1"/>
  <text x="465" y="54" text-anchor="middle" font-size="11" letter-spacing="1.4" fill="var(--muted-text)">TOKEN COST</text>
  <text x="465" y="104" text-anchor="middle" font-size="42" font-weight="800" fill="var(--foreground)">&#8776;15&#215;</text>
  <text x="465" y="130" text-anchor="middle" font-size="12" fill="var(--muted-text)">vs. a one-turn chat</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 4.</strong> Orchestration isn't free. The quality jump is real, and so is the bill. Source: Anthropic, <a href="https://www.anthropic.com/engineering/multi-agent-research-system"><em>How we built our multi-agent research system</em></a> (2025).</figcaption>
</figure>

That right-hand card is the discipline the hype skips. You spin up a manager and a crew *because the task is worth roughly fifteen chats' worth of tokens* — not because more agents is automatically better. Think less "swarm of autonomous geniuses" and more "one slightly paranoid tech lead running standups," and only for work that earns it.

## The Honest Counterargument

I should flag the other camp, because it's persuasive and it kept me honest. The team behind Devin published a piece with the blunt title ["Don't Build Multi-Agents."](https://cognition.com/blog/dont-build-multi-agents) Their argument: the moment you fan work out to parallel subagents that can't see each other's context, they start making *conflicting implicit decisions*. Their example is a "build a Flappy Bird clone" task where one subagent renders a Super Mario–style background while another draws a bird that doesn't match — nobody was wrong locally, but nobody shared context, so the pieces don't fit. Their rule of thumb: prefer a single-threaded agent with continuous context, and only get fancy when you truly have to.

Both things are true at once, and that tension *is* the design problem. Look back at Figure 1: the two biggest bars are bad specification and inter-agent misalignment — which is precisely the failure Cognition is warning about. Multi-agent wins when the work genuinely splits into independent pieces *and* every worker gets a crisp brief. It loses when you shatter one coherent task across agents who are quietly guessing about each other.

So my job as "manager" isn't to spawn more agents. It's to make the handoffs unambiguous and to guarantee no two workers are ever secretly editing the same thing — one worker per repo at a time, full stop. That single rule deletes the Flappy Bird failure before it can happen.

## Structured Handoffs

The trick that made it actually work: treat agents like contractors, not oracles.

Every task goes out as a structured brief — the goal, the context, which files are fair game, the acceptance criteria, and the *exact commands* that prove it's done. Every worker reports back in the same fixed shape — status, what it changed, what it ran, and where it got stuck. It's boring paperwork, and it's the most important code in the system. A brief that says "improve the checkout flow" is how you get a Flappy Bird; a brief that says "modify only these three files, make `pnpm test:checkout` pass, don't touch the schema" is how you get something you can actually merge.

This is almost verbatim the lesson from both sides of the debate. Anthropic found that vague delegation ("go research the semiconductor shortage") produced duplicated, overlapping work, and that the fix was giving every subagent "an objective, an output format, guidance on tools, and clear task boundaries." MetaGPT — an academic framework that has agents role-play a whole software company — makes the same bet its central thesis, [literally writing it as `Code = SOP(Team)`](https://arxiv.org/abs/2308.00352): encode the *standard operating procedures* a good org already uses, and quality falls out of the process rather than out of any one agent's brilliance.

No vibes. No "looks good to me." If a worker can't show the verification command passing, the task isn't done. The single biggest quality upgrade in the whole system wasn't a smarter model — it was refusing to accept work that couldn't prove itself.

## A State Machine, Not a To-Do List

Each project moves through explicit phases — build, test, review, and so on. The rule is boring and load-bearing: **you can go backward, but you can never skip forward.** If review finds a problem, the project drops back a phase; it doesn't get to sprint ahead because an agent felt optimistic.

This targets a specific, measured weakness. That ~21% task-verification slice from Figure 1 splits into three nasty little modes: *premature termination* (declaring done too early), *no or incomplete verification* (a rubber-stamp check), and *incorrect verification* (checking the wrong thing). And here's the part that changed my design: the Berkeley team found that bolting a verifier onto the end **isn't enough on its own** — one framework with a dedicated reviewer role still shipped correct code only about a third of the time. Verification has to be woven *through* the phases, not sprinkled on at the finish line. A state machine you can't fast-forward is how you force that.

## When Workers Fail (They Will)

The last piece is knowing when to *stop*. Every failure has a retry budget. Miss it, and the item gets escalated to a human — me — instead of looping forever.

This is the direct antidote to the single most common failure mode in the entire dataset:

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="Horizontal bar chart of individual failure modes. Step repetition is the largest at 17.1 percent, followed by disobey task spec 11 percent, unaware of termination 9.8 percent, premature termination 7.8 percent, no or incomplete verification 6.8 percent, incorrect verification 6.7 percent, loss of conversation history 3.3 percent, disobey role spec 0.5 percent." viewBox="0 0 640 282" style="display:block;width:100%;height:auto;max-width:600px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <line x1="250" y1="20" x2="250" y2="262" stroke="var(--border)" stroke-width="1"/>
  <rect x="250" y="28" width="366" height="19" rx="3" fill="var(--muted)"/>
  <rect x="250" y="28" width="347.7" height="19" rx="3" fill="var(--accent)" opacity="1"/>
  <text x="242" y="42" text-anchor="end" font-size="11.5" font-weight="700" fill="var(--foreground)">Step repetition</text>
  <text x="603.7" y="42" text-anchor="start" font-size="11.5" font-weight="700" fill="var(--foreground)">17.1%</text>
  <rect x="250" y="58" width="366" height="19" rx="3" fill="var(--muted)"/>
  <rect x="250" y="58" width="223.7" height="19" rx="3" fill="var(--accent)" opacity="0.5"/>
  <text x="242" y="72" text-anchor="end" font-size="11.5" fill="var(--foreground)">Disobey task spec</text>
  <text x="479.7" y="72" text-anchor="start" font-size="11.5" font-weight="600" fill="var(--muted-text)">11.0%</text>
  <rect x="250" y="88" width="366" height="19" rx="3" fill="var(--muted)"/>
  <rect x="250" y="88" width="199.3" height="19" rx="3" fill="var(--accent)" opacity="0.5"/>
  <text x="242" y="102" text-anchor="end" font-size="11.5" fill="var(--foreground)">Unaware of termination</text>
  <text x="455.3" y="102" text-anchor="start" font-size="11.5" font-weight="600" fill="var(--muted-text)">9.8%</text>
  <rect x="250" y="118" width="366" height="19" rx="3" fill="var(--muted)"/>
  <rect x="250" y="118" width="158.6" height="19" rx="3" fill="var(--accent)" opacity="0.5"/>
  <text x="242" y="132" text-anchor="end" font-size="11.5" fill="var(--foreground)">Premature termination</text>
  <text x="414.6" y="132" text-anchor="start" font-size="11.5" font-weight="600" fill="var(--muted-text)">7.8%</text>
  <rect x="250" y="148" width="366" height="19" rx="3" fill="var(--muted)"/>
  <rect x="250" y="148" width="138.3" height="19" rx="3" fill="var(--accent)" opacity="0.5"/>
  <text x="242" y="162" text-anchor="end" font-size="11.5" fill="var(--foreground)">No/incomplete verification</text>
  <text x="394.3" y="162" text-anchor="start" font-size="11.5" font-weight="600" fill="var(--muted-text)">6.8%</text>
  <rect x="250" y="178" width="366" height="19" rx="3" fill="var(--muted)"/>
  <rect x="250" y="178" width="136.2" height="19" rx="3" fill="var(--accent)" opacity="0.5"/>
  <text x="242" y="192" text-anchor="end" font-size="11.5" fill="var(--foreground)">Incorrect verification</text>
  <text x="392.2" y="192" text-anchor="start" font-size="11.5" font-weight="600" fill="var(--muted-text)">6.7%</text>
  <rect x="250" y="208" width="366" height="19" rx="3" fill="var(--muted)"/>
  <rect x="250" y="208" width="67.1" height="19" rx="3" fill="var(--accent)" opacity="0.5"/>
  <text x="242" y="222" text-anchor="end" font-size="11.5" fill="var(--foreground)">Loss of conversation history</text>
  <text x="323.1" y="222" text-anchor="start" font-size="11.5" font-weight="600" fill="var(--muted-text)">3.3%</text>
  <rect x="250" y="238" width="366" height="19" rx="3" fill="var(--muted)"/>
  <rect x="250" y="238" width="10.2" height="19" rx="3" fill="var(--accent)" opacity="0.5"/>
  <text x="242" y="252" text-anchor="end" font-size="11.5" fill="var(--foreground)">Disobey role spec</text>
  <text x="266.2" y="252" text-anchor="start" font-size="11.5" font-weight="600" fill="var(--muted-text)">0.5%</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 5.</strong> Individual failure modes (from the specification and verification categories of Figure 1). The single largest — bigger than any verification failure — is <strong style="color:var(--foreground)">step repetition</strong>: agents redoing work they've already done. Data: Cemri et al., <a href="https://arxiv.org/abs/2503.13657"><em>Why Do Multi-Agent LLM Systems Fail?</em></a> (2025).</figcaption>
</figure>

Step repetition — agents grinding the same ground because nothing told them to quit — tops the chart. Infinite retries are how you wake up to a thousand commits that all say "fix tests" and a repo that's somehow worse than when you went to bed. Bounded retries plus escalation is the difference between an autonomous system and a runaway one — and it's the cheapest insurance in the whole design.

## What I Actually Learned

Most of the engineering here had nothing to do with prompting. It was the stuff you'd put around any unreliable-but-capable worker: clear specs, verification you can't fake, states you can't skip, and a hard limit on how long anything's allowed to be stuck. When I finally went looking for the research, it was almost eerie how neatly the failure taxonomies lined up with the guardrails I'd been forced to build — specification, coordination, verification, and knowing when to stop. The same walls, in the same order.

The models keep getting smarter. The scaffolding is what makes a pile of them behave like a team instead of a very polite riot.

---

### Further reading

- Cemri et al., [*Why Do Multi-Agent LLM Systems Fail?*](https://arxiv.org/abs/2503.13657) (UC Berkeley) — the failure taxonomy behind Figures 1 and 5.
- Anthropic, [*How we built our multi-agent research system*](https://www.anthropic.com/engineering/multi-agent-research-system) — the orchestrator/worker pattern and the numbers in Figure 4.
- Cognition, [*Don't Build Multi-Agents*](https://cognition.com/blog/dont-build-multi-agents) — the case for single-threaded agents and shared context.
- Hong et al., [*MetaGPT: Meta Programming for a Multi-Agent Collaborative Framework*](https://arxiv.org/abs/2308.00352) — encoding standard operating procedures as agent workflows.
- Liu et al., [*Lost in the Middle: How Language Models Use Long Contexts*](https://arxiv.org/abs/2307.03172) — the effect sketched in Figure 2.
