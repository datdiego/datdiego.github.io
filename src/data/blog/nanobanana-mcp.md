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
description: Testing nanobanana, an MCP server that lets Claude Code generate images on the fly. Spoiler — it involves bananas.
---

You know that feeling when you discover your IDE can do something you never expected? That's what happened when I stumbled into MCP image generation tools inside Claude Code.

## What Even Is MCP?

MCP (Model Context Protocol) is basically a way to give your AI assistant superpowers. Instead of just reading and writing code, you can connect external tools — databases, APIs, services — and the AI can use them directly in conversation.

Think of it like plugins, but standardized. One config file, and suddenly your coding assistant can also search Slack, query your database, or in this case... make art.

## Enter the Banana

[Nanobanana](https://github.com/Aeven-AI/mcp-nanobanana) is an MCP server that wraps image generation into a set of tools. Once connected, Claude Code gains the ability to:

- **Generate images** from text prompts with style options
- **Edit existing images** based on descriptions
- **Create icons** in multiple sizes (app icons, favicons)
- **Generate patterns** and seamless textures
- **Create storyboards** — sequential images that tell a visual story
- **Draw diagrams** — flowcharts, architecture diagrams, wireframes

All from a text prompt, right in the terminal.

## Setting It Up

There are a few npm-based MCP servers out there (like `@aeven/nanobanana-mcp`), but I ran into issues with outdated model references. So I did what any reasonable person would do: I wrote my own in about 100 lines of Python.

The setup is simple. Create a Python script that implements the MCP protocol (JSON-RPC over stdio), wraps the Imagen 4.0 API, and saves images to disk. Then register it:

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

Restart Claude Code, and you've got image generation. The `MODEL_API_KEY` is a Google Gemini API key — Imagen 4.0 runs under the same project.

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

MCP is turning coding assistants into something more like operating systems. Each MCP server is a capability module — plug in what you need, unplug what you don't. My current setup has nanobanana for images, and I'm eyeing a few others:

- **Playwright** for browser automation and testing
- **Supabase** for direct database operations
- **GitHub** for PR management without leaving the terminal

The ecosystem is growing fast. The [MCP marketplace](https://github.com/anthropics/claude-code) already has dozens of servers, and the community is building more every week.

## Should You Try It?

If you're already using Claude Code, adding an MCP server takes about 30 seconds. The image generation quality is solid (it's Google Imagen under the hood), and having it available in your coding workflow is genuinely useful — not just for fun, but for generating actual project assets.

Plus, you get to tell people your AI assistant has an art degree. That's worth something.

---

*The banner image for this post was generated using our custom Imagen MCP server, right from the terminal. The irony of an AI writing about an AI's art tools is not lost on me.*
