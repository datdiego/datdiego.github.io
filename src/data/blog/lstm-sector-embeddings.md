---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-08-09T16:00:00Z
title: This LSTM Rediscovered a Classic Trading Factor — Crashes Included
slug: lstm-sector-embeddings
featured: false
draft: true
tags:
  - machine-learning
  - deep-learning
  - finance
  - paper-review
description: A new paper adds two learnable numbers per sector to a standard LSTM stock predictor and nearly doubles its Sharpe ratio. Better yet, you can read what the model learned — it reinvented industry momentum, and inherited every one of its famous failure modes.
---

There's a paper on arXiv this month that I keep thinking about, and not because the headline number is huge. It's because of *what the model learned*, and the fact that we can actually read it.

The paper is ["Cross-Sectional Heterogeneity in LSTM Networks for Financial Time Series"](https://arxiv.org/abs/2608.05755) by Julius Döbelt. The setup is the workhorse of academic deep-learning-for-stocks research: feed an LSTM 60 days of returns for each S&P 500 stock, have it predict whether tomorrow's return beats the cross-sectional median, go long the 10 most confident "yes" names and short the 10 most confident "no" names, rebalance daily, repeat over 27 rolling windows covering 1995–2024.

The twist is almost embarrassingly small. Standard versions of this model treat every stock as interchangeable — the same network processes Exxon and Nvidia and has no idea which is which. Döbelt gives the model a hint: each stock carries a **learnable sector embedding**, a tiny trainable vector for its industry, concatenated to the LSTM's output right before the final classification layer.

How tiny? Eleven sectors, two dimensions each. **Twenty-two numbers**, in a network whose LSTM layer alone has thousands of parameters.

Those 22 numbers take the strategy's annualized Sharpe ratio from **0.39 to 0.69**.

## The cheapest prior in machine learning

I want to dwell on why this works, because it's a lesson that generalizes far beyond finance.

The base LSTM sees only return sequences. In principle, it could infer sector-like structure on its own — energy stocks do co-move, and a big enough model with enough data might cluster them internally. But "in principle" is doing heavy lifting there. Daily returns are brutally noisy, the training windows are only three years long, and the signal-to-noise ratio in this domain is about as bad as machine learning gets. The model spends its capacity just staying afloat.

The embedding hands the model, for free, a piece of structure that finance has known matters since at least Moskowitz and Grinblatt's 1999 work on industry momentum: *which industry a stock belongs to is predictive context*. The model doesn't have to discover the categories; it only has to learn what to *do* with them — two coordinates per sector, positioned by backpropagation wherever they most improve predictions.

This is the classic inductive-bias trade. You inject domain knowledge into the architecture, and the model spends its capacity on the part of the problem you *couldn't* specify by hand. The result beat not just the base LSTM but also a 500-tree random forest (statistically significant at the 1% level on a Diebold-Mariano test), and it did so with the shallowest drawdowns of any model tested.

Meanwhile — and I'll come back to this — the paper's *other* extension went the opposite way. A variant that fed the LSTM macro-financial covariates (VIX, oil, gold, Treasury spreads) turned in the **worst** Sharpe of the lot, at 0.27. More information, worse model.

## Reading the model's mind

Here's the part that makes the paper worth a blog post rather than a footnote. Because the sector signal is confined to 22 numbers feeding a linear layer, you can compute exactly how much each sector biases the model toward "buy" versus "sell" — a per-sector quantity the paper calls Δc. That turns the model from a black box into something you can audit against reality: just correlate the learned sector bias with how sectors actually performed.

Two case studies from the paper, one glorious and one damning.

**2007.** The model's most positive sector bias: Energy. Realized 2007 performance: Energy returned about 37% annualized, the best in the index, and the model's long portfolio was overweight Energy by a massive margin relative to its short leg. The correlation between the learned sector bias and realized sector returns that year was **0.74**. The model had, from price data alone, positioned itself for the energy boom.

**2003.** The model favored Utilities and Healthcare — the sectors that had held up best through the dot-com crash it trained on. Then the market V-bottomed, and the most beaten-down sector, Technology, ripped 54% off the lows. The model was *short-biased* in tech. Correlation between learned bias and realized returns: **−0.91**. About as wrong as it is mathematically possible to be.

If you know your finance literature, you recognize this pattern instantly. Backing the recent sector winners, printing money in trends, getting obliterated when leadership violently rotates at a market bottom — that's not a novel AI behavior. That's **industry momentum**, one of the most-documented factors in the cross-section of returns, complete with its most-documented flaw: momentum crashes. The 2003 wipeout is textbook — literally the same dynamic as the famous momentum crash of 2009, where the "loser" portfolio ripped upward off the March lows and momentum strategies lost half their value in months.

The paper confirms the diagnosis quantitatively: averaged across all 27 test periods, the correlation between learned sector bias and realized sector returns is only **7.6%** — feeble on average, strongly positive in trending regimes, strongly negative in reversals. And on the temporal side, the LSTM's stock-level signal turns out to be the **short-term reversal** effect (recent 5-day losers outperform recent winners), another anomaly documented decades before anyone put a gate in a neural network.

So the honest summary of this deep learning system is: *an LSTM, given freedom to learn anything, learned short-term reversal plus industry momentum* — two factors a quant in 1999 could have handed you on a napkin.

## Is that a disappointment? I don't think so

There's a cynical reading: we spent GPU-hours to reinvent factors from the Clinton administration. But I think that reading misses what's actually valuable here, for three reasons.

**First, recovery is validation.** If your learning system, pointed at raw returns with no hints, independently converges on the same structures that survived 30 years of academic scrutiny, that's evidence the system finds *real* signal rather than hallucinating patterns. It's the finance equivalent of a new telescope re-detecting known planets before you trust its new discoveries.

**Second, knowing *which* factor you've learned tells you exactly how you'll die.** This is the practical payoff of the interpretability. A black-box model that is secretly industry momentum will crash exactly when momentum crashes — 2003, 2009, the post-2020 rotations — and the operator won't know why, or whether the model is broken or just doing the thing it always did. Döbelt's model fails identically, but *legibly*. You can see the momentum bet in the embeddings before the year that punishes it. That's the difference between an unexplained drawdown and a known, priced risk exposure.

**Third, the negative result is a positive contribution.** The covariate model's failure is the finding I'd tattoo on every ML practitioner's forearm. Adding VIX, oil, gold, and rate spreads — variables with impeccable economic justifications — produced overfitting so severe the author needed aggressive dropout just to get validation loss to converge, and still landed at the bottom of the table. Structured, low-dimensional context (which bucket does this stock belong to?) helped; rich, plausible-sounding context hurt. I've hit exactly this in my own trading-agent work: every additional piece of context you feed a decision-maker is another surface for rationalization, and it has to earn its slot with evidence, not plausibility.

## The fine print

Two honesty notes the paper itself is upfront about. The edge decays: pre-2008 Sharpes above 2.0 collapse to something modest and often negative after 2010, with returns spiking only in the 2008 and 2020 dislocations — consistent with markets absorbing these anomalies as they became well-known (and as everyone else pointed LSTMs at the same data). And after realistic transaction costs of 2 basis points per half-turn, what survives is statistically real but economically thin. Nobody should read this paper as a trading system. Daily-rebalanced 20-stock long-short portfolios are a factor-research instrument, not a business.

But as a piece of methodology, it's quietly persuasive. The field keeps arguing about post-hoc explainability — training black boxes and then interrogating them with attribution tools of debatable faithfulness. This paper takes the other road: build the interpretable structure *into* the architecture, keep it small enough to read directly, and let the model tell you in plain numbers which economic bet it's making. The model's best year and its worst year become case studies instead of mysteries.

Twenty-two legible parameters, nearly double the Sharpe, and a full confession of the strategy's identity. That's a good trade.

---

*Paper: Julius Döbelt, "Cross-Sectional Heterogeneity in LSTM Networks for Financial Time Series," [arXiv:2608.05755](https://arxiv.org/abs/2608.05755), August 2026.*
