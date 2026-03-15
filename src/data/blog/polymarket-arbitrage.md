---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-03-12T20:00:00Z
title: "I Researched Polymarket Arbitrage So You Don't Have To"
slug: polymarket-arbitrage
featured: true
draft: false
tags:
  - finance
  - prediction-markets
  - trading
  - research
description: Everyone's talking about "free money" on Polymarket. I spent a week digging into the data. The reality is way more interesting — and way more brutal — than the headlines suggest.
---

Someone in my feed posted about a bot that turned $313 into $414,000 trading BTC contracts on Polymarket. My first thought was "that's incredible." My second thought was "why isn't everyone doing this?"

So I spent a week finding out.

## The Promise

Polymarket is a prediction market — you buy YES or NO shares on binary questions like "Will BTC close above $90K today?" Shares cost between $0.01 and $0.99, representing the crowd's implied probability. If you're right, you get $1. If you're wrong, you get nothing.

The arbitrage pitch is simple: sometimes the market prices are wrong. A YES share costs $0.47, the NO share costs $0.50. That's $0.97 total for a guaranteed $1.00 payout. Buy both sides, pocket $0.03 per share, risk-free.

Scale that up with a bot running thousands of trades per day, and you've got a money printer. At least, that's what the YouTube thumbnails say.

## The Reality: 70% of Traders Lose Money

Let's start with the numbers that the "passive income" crowd doesn't mention.

An analysis of 112,000 Polymarket wallets found that **70-87% of traders lose money**. The top 0.04% — 668 wallets — captured 71% of all profits ($3.7 billion). To break into the top 5% and earn more than $1,000 total, you need to be very, very good. Or very, very fast.

That $313-to-$414K bot? Real. But it ran before January 2026, when Polymarket introduced dynamic taker fees specifically to kill the strategy. The fee on 50-cent BTC contracts now reaches 3.15% — which exceeds the typical arbitrage margin entirely. Polymarket looked at this bot, figured out how it worked, and changed the rules to make it stop working.

This is a recurring theme.

## The Speed Problem

The average arbitrage window on Polymarket has compressed from 12.3 seconds in 2024 to **2.7 seconds** today. And 73% of arbitrage profits are captured by bots operating at sub-100-millisecond latency.

These aren't Python scripts running on someone's laptop. The serious operators co-locate their servers near Polygon's infrastructure in Amsterdam. They're running compiled code on bare metal with direct network paths to the blockchain. Your `while True: check_prices()` loop isn't competing with them — it's providing exit liquidity for them.

The median arbitrage spread is now 0.3%. After fees on both sides of a cross-platform trade, that's often negative.

## What About Cross-Platform Arbitrage?

The most commonly recommended strategy right now is buying YES on Polymarket and NO on Kalshi (or vice versa) when prices diverge on the same event. In theory, the spreads are 3-5% and the windows last minutes instead of seconds.

In practice:

**Settlement divergence kills you.** During the 2024 government shutdown, Polymarket resolved a contract as "Yes" while Kalshi resolved the same event as "No." If you're holding opposite sides on both platforms and they both resolve against you, you lose everything on both legs.

**Fees compound.** Polymarket's dynamic fees + Kalshi's ~$35 per $1,000 position means your 3% gross spread becomes 1% net — and that's on a good day.

**Platform rules change overnight.** Polymarket removed the 500ms taker delay and introduced dynamic fees without warning, breaking "a large number of existing bots" in a single update. Your edge can evaporate between lunch and dinner.

## The Realistic Return Table

Here's what honest math looks like for retail cross-platform arbitrage:

| Capital | Monthly Gross | After Costs | Verdict |
|---------|--------------|-------------|---------|
| $500 | $5-10 | Negative (infra costs exceed returns) | Not viable |
| $5,000 | $50-100 | $0-50 after VPS + fees | Marginal |
| $50,000+ | $500-1,000 | Potentially profitable | Requires professional setup |

This is not the passive income dream. At $5K, you're working for pennies. At $500, you're paying for the privilege of running a bot.

## So Where IS the Edge?

After going through all of this, I asked the more interesting question: is there *any* real edge left for a developer with modest capital?

Three things stood out:

### 1. Weather Markets

This was the surprise find. Weather prediction markets on Kalshi and Polymarket are wildly inefficient because the participants are mostly casual bettors checking their phone weather app. Meanwhile, NOAA's ensemble forecasts are 85-90% accurate 1-2 days out, and the data is completely free.

One documented address scaled $1,000 to $24,000 trading London weather markets since April 2025. An open-source weather bot using GFS ensemble data has documented $1,325 in profit. The key difference from crypto arbitrage: you're not competing against HFT firms. You're competing against people who think "it feels like it'll be warm tomorrow."

I liked this enough to actually build a weather bot. It pulls 51-member ECMWF ensemble forecasts, compares them to Kalshi KXHIGH contract prices, and uses Kelly criterion for position sizing. Right now it's just collecting data — I want to see the signal quality before putting money on it. But the thesis is strong: **information asymmetry where the better information is free and public, but the market participants don't use it.**

### 2. Domain Specialization

Market prices lag news by 30 seconds to several minutes. If you know a niche well — economic data releases, tech policy, geopolitical events — you can spot mispricings that a generalist bot can't. LLMs are a force multiplier here, but they need actual domain knowledge to amplify. "Claude, should I buy this contract?" isn't a strategy.

### 3. High-Probability Bond Stacking

The boring one. Buy YES shares at $0.95-$0.97 on near-certain outcomes. Collect your 3-5% when they resolve. Compound. It's not exciting, but it's 15-30% annualized if you pick your spots carefully and avoid the black swans.

## What I'm Actually Doing

I'm not building a Polymarket arbitrage bot. The research convinced me that pure arbitrage is a game where the house (literally the platform) changes the rules whenever retail starts winning.

Instead, I built a **weather prediction market bot** that runs daily at 6 PM, fetches ensemble forecasts for 5 cities, and compares them to market prices. If the forecasts disagree with the market by more than 8% (after accounting for forecast uncertainty), it flags a signal. Right now it's data collection only — I want 2 weeks of signals before risking anything.

The core bet: **in a market full of people guessing, having a 51-member ensemble forecast from the world's best weather models is an actual, durable edge.** Unlike latency arbitrage, the platform can't patch this by adding fees. The edge comes from the information, not the speed.

We'll see if the data backs it up. I'll write a follow-up when I have results.

## The Takeaway

If you're thinking about prediction market arbitrage:

1. **Pure speed arbitrage is dead at retail.** Sub-100ms bots eat the spread before your Python script even checks the price.
2. **Cross-platform arbitrage is dying.** Fees, settlement risk, and platform rule changes make it marginal at best.
3. **The real edge is information, not speed.** Weather forecasts, domain expertise, or any situation where you know something the market doesn't.
4. **Start with data, not money.** Build the data collection pipeline, prove the signals exist, paper trade, and *then* put up capital. In that order.

The $313-to-$414K story is real. It's also history. The question isn't "how do I replicate that?" — it's "where is the next inefficiency that hasn't been patched yet?"

For my money (literally), it's the weather.
