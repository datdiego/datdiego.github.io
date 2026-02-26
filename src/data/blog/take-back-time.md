---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-26T12:00:00Z
title: "Take Back Time: I Built an Android App to Track Where My Hours Go"
slug: take-back-time-android-usage-tracker
featured: false
draft: false
tags:
  - android
  - react-native
  - side-project
description: "I got tired of vaguely feeling like I was on my phone too much, so I built an app that shows me the numbers. Here's how Take Back Time works under the hood."
---

I have a theory that most people would be horrified if they saw their actual screen time numbers broken down by app. Not the weekly summary your phone gives you — the real, live, minute-by-minute picture of where your attention goes.

Android has a built-in Digital Wellbeing feature, and it's fine. It gives you a bar chart and a couple of numbers. But I wanted something I could actually customize — something that felt like *my* dashboard, not a corporate wellness initiative. So I built one.

## What Is Take Back Time?

Take Back Time is an Android app that reads your phone's usage statistics and displays them in a way that's actually useful. Time per app, percentage breakdowns, category filters — the basics, done right.

The key word there is "actually useful." I've tried a dozen screen time apps and they all fall into two camps: either they're so minimal they tell you nothing, or they're gamified dopamine traps that ironically become *another* app you waste time on. I wanted a third option: just the data, presented clearly, with no social features, no achievements, no "streaks."

## The Terminal Aesthetic

Here's the part that makes Take Back Time mine: it looks like a terminal.

The design theme is called `maguey-terminal` — part of a shared design system I use across my projects. Think dark backgrounds, monospaced accents, green-on-black vibes. It looks like something a sysadmin would use to monitor server processes, except the "processes" are Instagram and Reddit.

Is it for everyone? Definitely not. But it makes me actually *want* to open the app and check my stats, which is kind of the whole point.

## Under the Hood

The stack is React Native with Expo (bare workflow) and TypeScript. Pretty standard for a cross-platform mobile app, except Take Back Time isn't cross-platform — it's Android only, at least for now. The reason is the most interesting technical piece of the whole project.

### The Kotlin Native Module

Android tracks app usage through a system service called `UsageStatsManager`. It's a Java/Kotlin API with no JavaScript equivalent. React Native's bridge doesn't expose it, Expo doesn't have a plugin for it, and the community packages I found were either abandoned or half-baked.

So I wrote a native Kotlin module.

`UsageStatsModule` is a custom native module that queries `UsageStatsManager`, aggregates the data by app package name, and passes it back to the TypeScript layer as structured JSON. It handles the permission check (usage access is a special permission on Android — users have to grant it manually in Settings), resolves app names from package IDs, and even pulls app icons as base64-encoded strings so the UI can display them without any additional network requests.

Writing Kotlin inside a React Native project feels a bit like renovating one room of your house while living in a completely different architectural style. The bridge layer between Kotlin and TypeScript is fiddly — you're serializing everything through React Native's bridge, which means no complex objects, no callbacks without promises, and a lot of `ReadableMap` wrangling. But once it works, it works well.

### Category Filtering

Android assigns every app a category — social, productivity, games, etc. Take Back Time surfaces these categories as filters, so you can answer questions like "how much time did I spend on social media today?" without doing mental math. The category data comes straight from the system, so there's nothing to configure.

### The Dashboard

The main screen is a dashboard showing your top apps by usage time, with percentages and a visual breakdown. It updates live — or close to it. There's no historical tracking yet (that's a v2 thing), but the real-time view is already revealing enough.

The first time I ran it on my own phone, I discovered I was spending 45 minutes a day on an app I would have sworn I barely used. That's the value proposition in one sentence.

## What Didn't Make v1

The feature I wanted most — app locking and usage timers — didn't make the cut for v1. The idea is simple: set a daily limit for an app, and when you hit it, the app gets blocked. Android supports this through `DevicePolicyManager` and accessibility services, but the implementation is gnarly. Accessibility services require special permissions and Play Store review, and `DevicePolicyManager` is designed for enterprise device management, not consumer apps.

It's on the roadmap for v2, along with usage suggestions ("you've been on Twitter for 30 minutes — maybe go outside?") and historical trend tracking. But v1 needed to ship, and the core experience — see your usage, understand it, feel mildly judged by a terminal-themed dashboard — is complete.

## Why Build This When Digital Wellbeing Exists?

Fair question. Three reasons:

1. **Customization.** I wanted a specific look and specific data views. Digital Wellbeing gives you what Google decided you need.
2. **Widgets.** v2 will include home screen widgets showing live usage stats. Putting the numbers where you can't ignore them is the whole philosophy.
3. **It was a good excuse to write Kotlin.** Sometimes you build things because you want to learn the stack. The native module work taught me more about Android internals than any tutorial would have.

## Try It (Soon)

Take Back Time isn't on the Play Store yet — I'm still cleaning up the rough edges and figuring out the distribution story. If you're interested in trying it or just want to look at the code, keep an eye on [my GitHub](https://github.com/datdiego).

In the meantime, go check your screen time. I dare you.
