---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-07-21T16:00:00Z
title: My Trading Agent Acts Twice a Week. Here's How I Grade It Anyway.
slug: grading-rare-decisions
featured: false
draft: true
tags:
  - ai-agents
  - finance
  - statistics
  - machine-learning
  - evaluation
description: An AI that makes rare, high-stakes decisions is nearly impossible to evaluate by its outcomes — the sample size math is brutal. The fix is old, comes from weather forecasters, and works anywhere the world tells you what would have happened.
---

I built an AI agent that trades options. Every morning it looks at a live chart, reads the tape, and decides: call, put, or sit on its hands. Most days it sits on its hands. When it does act, it acts maybe twice a week.

Which raises an awkward question: **how do I know if it's any good?**

The obvious answer — "look at the results" — turns out to be almost useless. Not because results don't matter, but because at two decisions a week, the results won't contain statistically meaningful information for *years*. This post is about the trick that gets around that, why weather forecasters figured it out in 1950, and why the same problem shows up in medicine, hiring, and bail hearings — usually without the clean solution I got to use.

## The Sample Size Wall

Here's the math that ruins everything. Suppose my agent has a genuine edge — say it's right 55% of the time in a domain where a coin flip gets you 50%. That's a *real* edge; compounded carefully, it's a living. Now: how many decisions do I need to observe before I can statistically distinguish that agent from the coin?

The standard power calculation (one-sided test, 95% confidence, 80% power) says roughly **600 observations**. To tell a *good* decision-maker from a *random* one. At two trades a week, 600 trades takes about six years.

Six years! By then the market regime has changed twice, the model has been deprecated, and I've hopefully moved on to more lucrative hobbies. And it gets worse: trade outcomes aren't even clean samples of decision quality. A trade's result mixes the directional call with execution, exit timing, and plain luck. The signal you're trying to measure arrives pre-diluted.

This isn't a trading problem. It's the general curse of **rare, high-stakes decisions**. A surgeon's judgment, a VC's picks, a hiring manager's offers — anywhere decisions are infrequent and outcomes are noisy, outcome-counting is a nearly information-free way to evaluate the decision-maker on any human timescale. We do it anyway, mostly because it feels rigorous.

## The Trick: The Agent Decides More Often Than It Acts

Here's the thing I eventually noticed about my own system: the agent only *acts* twice a week, but it *decides* constantly.

Every ten minutes during its morning window, it produces a full directional read — direction, confidence, reasoning — whether or not it trades. Most of those reads end in "no trade." I used to treat those as non-events. Log line, shrug, move on.

They're not non-events. They're **predictions**. And predictions can be graded, because the market goes on to do something whether you traded or not. So I wrote a scorer that takes every logged read and asks: what did the underlying actually do 15, 30, and 60 minutes later?

- A directional read is *right* if the tape moved the way it leaned.
- A "no trade, this is chop" read is *right* if the tape actually chopped — and *wrong* if it ran. Declining to act is a prediction too, and it gets graded like one.

Suddenly I'm not collecting two labeled samples a week. I'm collecting about **eleven a day** — call it forty-plus a week, a twenty-fold increase, on the *exact* decisions the strategy is made of. The 600-observation wall that stood six years away now stands about four months away. Same agent, same decisions, no extra risk taken to generate the data. The information was always there; I just wasn't writing it down.

## Weather Forecasters Solved This in 1950

None of this is my idea. Meteorologists have lived with this exact problem forever — they issue probabilistic forecasts daily, single outcomes never validate a probability, and yet somehow they had to figure out which forecasters were good.

Glenn Brier's answer, in [a 1950 paper](https://doi.org/10.1175/1520-0493%281950%29078%3C0001:VOFEIT%3E2.0.CO;2) that's aged better than most software, was to score *every* forecast against *every* outcome — the now-eponymous Brier score. The deeper idea, formalized later as [proper scoring rules](https://sites.stat.washington.edu/raftery/Research/PDF/Gneiting2007jasa.pdf) (Gneiting & Raftery, 2007), is that a well-designed score makes honesty optimal: the forecaster's best strategy is to report what they actually believe. And a forecast record decomposes into two separate skills:

- **Calibration** — when you say 70%, does it happen about 70% of the time?
- **Resolution** — do you say meaningfully different things on different days, or do you hedge everything toward the base rate?

This decomposition is exactly what I want from my agent. It labels some reads "high probability" — those are the ones that trade real decisions. Calibration asks: is the hit rate on *those* reads actually higher than on the ordinary ones? If not, the confidence label is decoration, and the gating logic built on top of it is decoration squared. That's a question I can answer in weeks with the full decision log, and could not answer in years with trades alone.

Philip Tetlock's Good Judgment Project ran this same playbook on geopolitical forecasting — thousands of graded predictions per person, not vibes — and found that forecasting skill is real, measurable, and improvable *once you grade at prediction granularity*. The people who looked brilliant on anecdotes were often mediocre on the scoreboard, and vice versa. The scoreboard only exists if you log the predictions.

## The Luxury I Have That a Judge Doesn't

There's a nasty asymmetry hiding in all of this, and it's worth naming because it defines where this trick works.

In markets, the counterfactual is **observable**. If my agent declines to trade, the price still moves, and I can grade the decision it didn't act on. Reality generously runs the control arm for free.

Most domains aren't like that. A judge who denies bail never observes whether the defendant *would have* fled — the outcome only exists for the people released. Lakkaraju, Kleinberg, and colleagues called this [the selective labels problem](https://cs.stanford.edu/~jure/pubs/contraction-kdd17.pdf), and it quietly poisons naive comparisons between human and algorithmic decisions: your outcome data was *generated by* the decision-maker you're trying to evaluate. Medicine has it (untried treatments produce no outcomes), hiring has it (rejected candidates vanish), lending has it (declined loans never default or repay). The reinforcement learning community has built an entire subfield — off-policy evaluation, with tools like [doubly robust estimators](https://arxiv.org/abs/1103.4601) — essentially to *approximate* the thing the market hands me for free.

So the honest statement of my method is: **when the world shows you the counterfactual, log it and grade it — that's cheap and pure signal. When it doesn't, you've entered one of statistics' hard neighborhoods, and no amount of logging discipline substitutes for careful causal inference.**

Trading, forecasting, content ranking, demand prediction — observable counterfactuals, grade everything. Bail, treatment, hiring — selective labels, tread carefully.

## Grade the Guardrails Too

One more layer, because this is where it gets fun. My agent doesn't operate alone — it's wrapped in mechanical guardrails, veto rules that can block an entry the model wanted: *don't chase a climax bar, don't take a stop that drowns in noise.*

Every rule that blocks an action is *also* making a prediction — "acting here would have gone badly" — so every veto writes a ledger record with full context. Later, the same counterfactual machinery grades the rule: did the vetoed entries actually go on to lose? A guardrail that can't be falsified isn't a safety feature; it's a superstition with a config flag. Just recently one of those vetoes earned its keep in replay — the entry it blocked would have been stopped out within minutes — which is a much better reason to keep a rule than "it sounds prudent."

This inverts the usual relationship with safety rules. Normally they accumulate like scar tissue: each added after an incident, none ever removed, because removal can't be justified. If every rule logs its counterfactuals, rules earn their place with evidence, and the ones that only block good decisions eventually stand trial.

## One Honest Caveat

Decision-grading measures the *decision*, not the *P&L*. My agent trades instruments where execution costs, spreads, and time decay eat a real slice of any directional edge — so a positive score on the reads is a **ceiling** on results, not an estimate of them. It answers "does the judgment have signal?" months before the outcome record can, and that's the question that determines whether everything downstream is worth tuning at all. If the reads are coin flips, no exit logic will save you, and it's better to learn that in month two than in year six.

## The Takeaway

If you're building an agent — or evaluating a human — whose actions are rare:

1. **Realize it decides far more often than it acts.** Every "not now," every "pass," every threshold-not-met is a prediction wearing a trench coat.
2. **Log decisions at full granularity** — direction, confidence, reasoning, context — at decision time, not reconstructed later.
3. **Grade against observable counterfactuals** on fixed horizons, mechanically, including the decisions *not* to act. Check calibration, not just hit rate — confidence that doesn't stratify outcomes is noise.
4. **Make the guardrails log their counterfactuals too**, so rules can be falsified instead of accumulating forever.

The sample size wall never moved. I just stopped throwing away 95% of my samples.
