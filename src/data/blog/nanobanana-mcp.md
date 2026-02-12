---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-10T16:00:00Z
title: I Gave My AI Assistant an Art Degree (MCP Image Generation)
slug: nanobanana-mcp
featured: false
draft: false
ogImage: ../../assets/images/nanobanana-banner.png
tags:
  - ai
  - mcp
  - tools
  - claude
description: How I connected Google's Imagen 4 to Claude Code via MCP, the difference between nanobanana and a custom server, and why your AI assistant should learn to draw.
---

![A cartoon banana wearing a beret, painting on a tablet surrounded by code symbols](../../assets/images/nanobanana-banner.png)

You know that feeling when you discover your IDE can do something you never expected? That's what happened when I started experimenting with MCP image generation tools inside Claude Code.

## What Even Is MCP?

MCP (Model Context Protocol) is basically a way to give your AI assistant superpowers. Instead of just reading and writing code, you can connect external tools — databases, APIs, services — and the AI can use them directly in conversation.

Think of it like plugins, but standardized. One config file, and suddenly your coding assistant can also search Slack, query your database, or in this case... make art.

## Two Bananas, One Goal

There's some naming confusion worth clearing up here.

**[Nanobanana](https://github.com/Aeven-AI/mcp-nanobanana)** is a community-built npm MCP server (`@aeven/nanobanana-mcp`) that wraps image generation into a set of tools. It supports generating images, editing them, creating icons, patterns, storyboards, and diagrams — all from text prompts. It's a nice all-in-one package if you want something off the shelf.

**Google Imagen 4** (sometimes referred to by its internal codename "nanobanana") is the actual image generation model powering these tools. It's Google's latest diffusion model, available through the Gemini API under the `imagen-4.0-generate-001` endpoint. Think of it as the engine — nanobanana the MCP server is just one possible steering wheel.

I tried the npm package first but ran into issues with outdated model references. So I did what any reasonable person would do: I wrote my own MCP server in about 100 lines of Python that calls the Imagen 4 API directly.

## The Custom Server

The setup is dead simple. A Python script implements the MCP protocol (JSON-RPC over stdio), calls the Imagen 4 API, and saves generated images to disk. Register it in your Claude Code config:

```json
{
  "mcpServers": {
    "imagen": {
      "type": "stdio",
      "command": "python3",
      "args": ["/path/to/imagen-mcp.py"],
      "env": {
        "MODEL_API_KEY": "your-gemini-api-key"
      }
    }
  }
}
```

Restart Claude Code, and you've got image generation. The `MODEL_API_KEY` is a Google Gemini API key — Imagen 4 runs under the same project and billing.

The advantage over the npm package: you control exactly which model version you're hitting, there are no dependency issues, and you can customize the output (aspect ratios, file naming, output directories) however you want. The trade-off is you lose the fancier features like image editing and storyboards — but for generating blog banners and project assets, raw image generation is all I need.

## What Can You Actually Do With This?

The obvious use case is generating assets for your projects without leaving your workflow. Need a placeholder icon? A diagram for your README? A banner for a blog post? Just ask.

But the more interesting pattern is **chaining it with other tools**. Since MCP servers all live in the same session, you can:

1. Have Claude analyze your codebase architecture
2. Generate a diagram of it
3. Drop it into your docs

Or for a blog workflow:
1. Write the post content
2. Generate a banner image that matches the topic
3. Commit everything in one go

No context switching. No opening Figma. No searching stock photo sites for "programmer at desk looking thoughtful."

## The Bigger Picture

MCP is turning coding assistants into something more like operating systems. Each MCP server is a capability module — plug in what you need, unplug what you don't. My current setup has the Imagen server for images, and I'm eyeing a few others:

- **Playwright** for browser automation and testing
- **Supabase** for direct database operations
- **GitHub** for PR management without leaving the terminal

The ecosystem is growing fast. The community is building new MCP servers every week, and the protocol is becoming the standard way to extend AI coding tools.

## Should You Try It?

If you're already using Claude Code, adding an MCP server takes about 30 seconds. The image generation quality from Imagen 4 is genuinely impressive, and having it available in your coding workflow is useful — not just for fun, but for generating actual project assets on the fly.

Just don't confuse the model (Imagen 4 / "nanobanana") with the MCP server (nanobanana npm package). Or do — at least it makes for a good conversation starter.

---

*The banner image for this post was generated using our custom Imagen 4 MCP server, right from the terminal. Meta? Maybe. Useful? Definitely.*
