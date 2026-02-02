---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-02T16:00:00Z
title: Teaching Neural Networks Quantum Physics (So They Can Do My Homework)
slug: qubit-dynamics-pinn
featured: true
draft: false
tags:
  - quantum-computing
  - machine-learning
  - physics
description: My master's thesis project where I made neural networks learn the Schrödinger equation. They're now 5000x faster than me at quantum simulations.
---

So for my master's thesis, I decided to do something totally reasonable: teach neural networks quantum physics.

The project is called [qubit_dynamics](https://github.com/datdiego/qubit_dyamics) (yes, there's a typo in the repo name and no, I'm not fixing it — it has character now).

## The Problem

Simulating how qubits behave under different control pulses is *slow*. Like, painfully slow. Traditional quantum simulators (shoutout to QuTiP) are accurate but take their sweet time. When you're trying to figure out how to control a qubit, waiting around isn't fun.

## The Solution

I built two neural network approaches:

1. **PINNs (Physics-Informed Neural Networks)** — These networks have the Schrödinger equation baked right into their loss function. They don't just learn patterns; they learn *physics*. It's like teaching a student the actual rules instead of just having them memorize answers.

2. **QubiNN** — A simpler, data-hungry feedforward network that just learns from examples. No physics, just vibes and gradient descent.

## The Results

QubiNN turned out to be ~5000x faster than running QuTiP directly. Five. Thousand. Times.

PINNs were slightly more accurate for predicting control fields, but QubiNN's speed made it the practical winner for most use cases.

## The Stack

PyTorch for the neural networks, QuTiP for generating training data, and a concerning amount of coffee.

Check out the [repo](https://github.com/datdiego/qubit_dyamics) if you want to see quantum mechanics and deep learning have a weird but productive friendship.
