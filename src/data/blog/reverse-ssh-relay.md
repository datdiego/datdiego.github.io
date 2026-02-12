---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-02-12T21:00:00Z
title: SSH Into My Home PC From Work (For $0/Month)
slug: reverse-ssh-relay
featured: false
draft: false
tags:
  - devops
  - gcp
  - cloud
  - remote-development
description: How I used a GCP free-tier VM as a reverse SSH relay to reach my home WSL2 machine from a locked-down work laptop. No Tailscale, no VPN, no admin rights needed.
---

Here's the problem: I have a WSL2 machine at home running AI workers, side projects, the whole operation. I want to SSH into it from my work laptop. But my work laptop has corporate restrictions — no Tailscale, no VPN clients, no admin privileges. Just a browser and a terminal.

The solution is embarrassingly simple. A tiny VM in the cloud acts as a middleman.

## The Architecture

```
Work Laptop ──SSH──▶ GCP VM (public IP) ──reverse tunnel──▶ Home PC (WSL2)
```

That's it. My home PC maintains a persistent outbound SSH tunnel to the GCP VM. When I connect to the VM from work, the tunnel forwards me straight to my home machine. From the corporate network's perspective, I'm just making an outbound SSH connection to a cloud server. Nothing exotic.

## Why Not Just Port Forward?

My ISP gives me a dynamic IP, my router is behind CGNAT, and even if I could forward port 22, exposing my home machine directly to the internet feels like leaving the front door open with a neon sign.

A relay VM solves all of this. The home PC makes the outbound connection (no port forwarding needed), and the VM has a static IP I can always reach.

## The VM: Free Tier e2-micro

GCP's free tier includes one e2-micro instance in select US regions. That's 0.25 vCPU, 1GB RAM, and 10GB of disk — way more than you need for forwarding SSH packets.

Monthly cost: **$0**. As in, actually free. Not "free for 90 days" free. Free free.

```bash
gcloud compute instances create ssh-relay \
  --zone=us-central1-a \
  --machine-type=e2-micro \
  --image-family=debian-12 \
  --image-project=debian-cloud \
  --boot-disk-size=10GB \
  --boot-disk-type=pd-standard \
  --tags=ssh-relay \
  --metadata=ssh-keys="myuser:$(cat ~/.ssh/id_ed25519.pub)"
```

One command. The firewall rules need two ports open: 22 (for direct SSH to the relay) and 2222 (for the reverse tunnel).

## The Reverse Tunnel

The magic is `autossh` — it establishes a reverse SSH tunnel and keeps it alive. If the connection drops, it reconnects automatically.

```bash
autossh -M 0 -N \
  -o "ServerAliveInterval 30" \
  -o "ServerAliveCountMax 3" \
  -o "ExitOnForwardFailure yes" \
  -R 0.0.0.0:2222:localhost:22 \
  -i ~/.ssh/id_ed25519 myuser@RELAY_IP
```

The `-R 0.0.0.0:2222:localhost:22` flag is the key part: it tells the relay VM to listen on port 2222 and forward traffic back through the tunnel to port 22 on my home machine.

Wrap it in a systemd user service, enable linger so it survives logout, and forget about it. It just runs.

## The Relay Config

The relay VM needs one tweak — `GatewayPorts clientspecified` in sshd_config. Without this, the reverse tunnel only listens on localhost, which means you can't reach it from outside the VM itself. Kind of defeats the purpose.

I also added `ClientAliveInterval` keepalives so dead tunnels get detected within 90 seconds instead of hanging forever.

## Connecting From Work

From my work laptop:

```bash
ssh -p 2222 myuser@RELAY_IP
```

That's it. I'm in my WSL2 machine. Tmux sessions, running workers, everything — right there.

## The Security Story

Some things that make me sleep at night:

- **Key-based auth only** — no passwords anywhere in the chain
- **GCP firewall** restricts incoming traffic to ports 22 and 2222
- **The tunnel is outbound** — my home PC connects to the relay, not the other way around
- **autossh auto-reconnects** — if my home internet blips, the tunnel comes back on its own

Could I make it more paranoid? Sure. IP allowlisting, fail2ban, port knocking. But for a personal relay that just forwards SSH, this is plenty.

## What It Replaced

Before this, I was relying on Tailscale for everything. Great tool, but useless when you can't install it. The corporate laptop situation forced a simpler approach, and honestly? A dumb SSH relay is easier to reason about than a mesh VPN.

Sometimes the boring solution is the right one.

## The Bottom Line

Total setup time: about 15 minutes. Monthly cost: $0. The only dependency is a GCP account with free tier credits and an SSH client on the work laptop — which even the most locked-down corporate machines tend to have.

Now I can check on my AI workers from the office. Whether that's productive or just entertaining is a separate question.
