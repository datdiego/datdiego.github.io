---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-07-21T18:00:00Z
title: Six Minutes to Patch a Satellite
slug: patching-satellites
featured: false
draft: false
tags:
  - space
  - networks
  - algorithms
  - security
  - systems
description: A spacecraft needs software updates like anything else, but you can only talk to it while it's overhead — and if the upload corrupts, the fix has to fit in the next window. The engineering that follows from that constraint is stranger and more interesting than it sounds.
---

Every computer needs software updates, and the ones in orbit are no exception. Bugs surface, mission requirements change, and — increasingly the urgent one — vulnerabilities get disclosed against a platform that will keep flying for another decade. The patch has to get up there somehow.

On the ground this is a solved, boring problem. You download a few hundred megabytes over a connection that is always on, and if a packet drops, TCP quietly asks for it again. Nobody thinks about it.

In orbit almost none of that holds. The connection is not always on. It is on for a few minutes at a time, on a schedule set by orbital mechanics rather than convenience, at data rates that would embarrass a 1990s modem. And if the file arrives corrupted, you may not get another chance for hours.

I spent a while working on this problem — how to get a software update into space hardware when the link fights you the whole way. What follows is the shape of the problem and the class of solutions, not anybody's results. The interesting part was never the benchmark table anyway. It was discovering which of your intuitions about networking stop being true.

## The Contact Window

Radio needs line of sight. A spacecraft in low Earth orbit is moving at roughly 7.7 km/s, which means it rises above a given ground station's horizon, arcs overhead, and sets again — and while it is below that horizon, there is no link at all. Not a slow link. No link.

The industry terms are pleasingly blunt: **AOS**, acquisition of signal, when the spacecraft clears the horizon; **LOS**, loss of signal, when it drops back below. Between AOS and LOS you have a contact window. For a typical LEO pass over a single ground station, that window is on the order of five to ten minutes, and you might get a handful of usable passes per day.

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="Diagram showing why satellite contact is intermittent. A ground station on the curve of the Earth has a cone of visibility extending upward. A satellite on its orbital arc is inside the cone and labeled in view, acquisition of signal; a second satellite position further along the orbit sits outside the cone and is labeled below horizon, loss of signal. Below, a six-hour timeline shows four short accent-colored AOS blocks separated by much longer LOS gaps." viewBox="0 0 640 380" style="display:block;width:100%;height:auto;max-width:620px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <polygon points="320,164 120,38 520,38" fill="var(--muted)" opacity="0.4"/>
  <line x1="320" y1="164" x2="120" y2="38" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <line x1="320" y1="164" x2="520" y2="38" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <path d="M30 150 Q 320 25 610 150" fill="none" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="6 5"/>
  <path d="M20 215 Q 320 140 620 215" fill="none" stroke="var(--foreground)" stroke-width="2"/>
  <text x="52" y="207" font-size="11" fill="var(--muted-text)">Earth</text>
  <polygon points="312,178 328,178 320,163" fill="var(--accent)"/>
  <text x="320" y="196" text-anchor="middle" font-size="11.5" fill="var(--foreground)">ground station</text>
  <line x1="320" y1="164" x2="352" y2="93" stroke="var(--accent)" stroke-width="2"/>
  <rect x="344" y="82" width="17" height="12" rx="2" fill="var(--accent)"/>
  <text x="374" y="88" font-size="11.5" font-weight="700" fill="var(--accent)">AOS</text>
  <text x="374" y="103" font-size="10.5" fill="var(--muted-text)">in view — link up</text>
  <rect x="82" y="121" width="17" height="12" rx="2" fill="var(--muted-text)"/>
  <text x="108" y="127" font-size="11.5" font-weight="700" fill="var(--muted-text)">LOS</text>
  <text x="108" y="142" font-size="10.5" fill="var(--muted-text)">below horizon — no link</text>
  <rect x="40" y="280" width="560" height="28" rx="6" fill="var(--muted)" stroke="var(--border)" stroke-width="1"/>
  <rect x="64" y="280" width="30" height="28" fill="var(--accent)"/>
  <rect x="196" y="280" width="26" height="28" fill="var(--accent)"/>
  <rect x="330" y="280" width="32" height="28" fill="var(--accent)"/>
  <rect x="470" y="280" width="24" height="28" fill="var(--accent)"/>
  <text x="79" y="272" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent)">AOS</text>
  <text x="209" y="272" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent)">AOS</text>
  <text x="346" y="272" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent)">AOS</text>
  <text x="482" y="272" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent)">AOS</text>
  <text x="145" y="299" text-anchor="middle" font-size="10.5" fill="var(--muted-text)">LOS</text>
  <text x="276" y="299" text-anchor="middle" font-size="10.5" fill="var(--muted-text)">LOS</text>
  <text x="416" y="299" text-anchor="middle" font-size="10.5" fill="var(--muted-text)">LOS</text>
  <text x="547" y="299" text-anchor="middle" font-size="10.5" fill="var(--muted-text)">LOS</text>
  <text x="320" y="334" text-anchor="middle" font-size="11" fill="var(--muted-text)">one ground station, roughly six hours — the link is the exception, not the rule</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 1.</strong> Contact is geometric. The spacecraft is reachable only inside the station's visibility cone, which turns a continuous mission into a series of short, scheduled conversations separated by long silences.</figcaption>
</figure>

This single fact reorganizes everything downstream. Your update does not merely need to be small. It needs to *fit in a window* — and to survive the possibility that it won't.

## Why a Corrupted Upload Hurts So Much

Space links are noisy, so spacecraft have always leaned on forward error correction: send redundant information alongside the data so the receiver can repair damage without asking for anything back. The [CCSDS standards](https://ccsds.org/Pubs/130x1g1e1s.pdf) that govern spacecraft telemetry specify a family of these, with Reed-Solomon the workhorse — it is excellent against the burst errors that radio links actually produce, and it can be concatenated with a convolutional inner code when you need more margin.

Forward error correction is wonderful, and it has a hard ceiling. A Reed-Solomon codeword can repair up to a fixed number of damaged symbols. Past that threshold it does not degrade gracefully — it fails, and the only remedy in the legacy playbook is to send the data again.

That is the expensive part. "Send it again" on a home connection costs you a shrug. On a spacecraft link, retransmitting a large file may not fit in the remaining window, which means waiting for the next pass, which may be an hour or six away. Meanwhile the vulnerability you were patching is still there, and the operations team is burning contact time it needed for telemetry and payload data.

So the question becomes obvious: when a file arrives damaged, why are we resending the whole thing? We already got most of it intact.

## Send Only the Difference

This is the idea behind **micropatching**: rather than retransmitting a file, identify precisely which bytes are wrong and transmit only a patch that repairs them.

The concept is not exotic on the ground — `rsync` has done rolling-checksum delta transfer for decades, and binary diff tools like bsdiff underpin how browsers and game clients ship updates. What makes the orbital version its own problem is that the usual assumptions get inverted. On the ground you optimize for bytes because bandwidth is the scarce resource and round trips are nearly free. In orbit, as we will get to, that trade runs the other way.

There is also a security dimension that has pulled this work forward. A software update path is an attack surface — an unauthorized or tampered update to a spacecraft is close to the worst outcome available. As zero-trust architecture requirements work their way into government space acquisitions, the ability to verify and surgically repair exactly what arrived, rather than blindly accepting a bulk transfer, stops being a bandwidth optimization and starts being a security control. Axiom Space's public work on in-space data processing has explicitly named [cybersecurity as a target application](https://www.axiomspace.com/news/snowcone) for orbital edge compute.

## The Part That Is Harder Than It Sounds

"Just diff the files" hides a genuinely interesting algorithmic problem, and the difficulty depends entirely on *what kind* of damage occurred.

If bytes were **modified** in place — the value at offset 4,096 is wrong, but it is still the byte at offset 4,096 — the two copies stay aligned. You can compare position by position, and finding the damage is a matter of narrowing down which regions disagree.

If bytes were **inserted or deleted**, alignment collapses. Insert a single byte near the front and every subsequent byte shifts by one. A position-by-position comparison now reports essentially the entire remainder of the file as corrupt, even though one byte was added. This is exactly the failure mode that classical error correction cannot address at all — Reed-Solomon is defined over fixed-length codewords and assumes the symbols line up.

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="Two diagrams comparing byte alignment. In the first, labeled modification, a sent byte sequence and a received sequence differ in exactly one cell and all other offsets align. In the second, labeled insertion, one extra byte is added to the received sequence, shifting every subsequent byte right by one position, so a comparison by offset flags the entire remainder of the file as mismatched." viewBox="0 0 640 372" style="display:block;width:100%;height:auto;max-width:620px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <text x="20" y="26" font-size="13" font-weight="700" fill="var(--foreground)">MODIFICATION</text>
  <text x="150" y="26" font-size="11.5" fill="var(--muted-text)">— offsets still line up</text>
  <text x="20" y="62" font-size="11.5" fill="var(--muted-text)">sent</text>
  <rect x="96" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="130" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="164" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="198" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="232" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="266" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="300" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="334" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="368" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="402" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="436" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="470" y="44" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <text x="20" y="106" font-size="11.5" fill="var(--muted-text)">received</text>
  <rect x="96" y="88" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="130" y="88" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="164" y="88" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="198" y="88" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="232" y="88" width="30" height="24" rx="3" fill="var(--accent)" stroke="var(--accent)"/>
  <rect x="266" y="88" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="300" y="88" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="334" y="88" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="368" y="88" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="402" y="88" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="436" y="88" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="470" y="88" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <line x1="247" y1="70" x2="247" y2="86" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="96" y="140" font-size="11" fill="var(--muted-text)">One byte changed. Every other offset still matches, so the search only has to</text>
  <text x="96" y="157" font-size="11" fill="var(--muted-text)">locate the disagreeing region — the class of damage classical EDAC handles.</text>
  <line x1="20" y1="188" x2="620" y2="188" stroke="var(--border)" stroke-width="1"/>
  <text x="20" y="222" font-size="13" font-weight="700" fill="var(--foreground)">INSERTION</text>
  <text x="130" y="222" font-size="11.5" fill="var(--muted-text)">— alignment collapses</text>
  <text x="20" y="258" font-size="11.5" fill="var(--muted-text)">sent</text>
  <rect x="96" y="240" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="130" y="240" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="164" y="240" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="198" y="240" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="232" y="240" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="266" y="240" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="300" y="240" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="334" y="240" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="368" y="240" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="402" y="240" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="436" y="240" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <text x="20" y="302" font-size="11.5" fill="var(--muted-text)">received</text>
  <rect x="96" y="284" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="130" y="284" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="164" y="284" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="198" y="284" width="30" height="24" rx="3" fill="var(--background)" stroke="var(--border)"/>
  <rect x="232" y="284" width="30" height="24" rx="3" fill="var(--accent)" stroke="var(--foreground)" stroke-width="1.5"/>
  <rect x="266" y="284" width="30" height="24" rx="3" fill="var(--accent)" stroke="var(--accent)"/>
  <rect x="300" y="284" width="30" height="24" rx="3" fill="var(--accent)" stroke="var(--accent)"/>
  <rect x="334" y="284" width="30" height="24" rx="3" fill="var(--accent)" stroke="var(--accent)"/>
  <rect x="368" y="284" width="30" height="24" rx="3" fill="var(--accent)" stroke="var(--accent)"/>
  <rect x="402" y="284" width="30" height="24" rx="3" fill="var(--accent)" stroke="var(--accent)"/>
  <rect x="436" y="284" width="30" height="24" rx="3" fill="var(--accent)" stroke="var(--accent)"/>
  <rect x="470" y="284" width="30" height="24" rx="3" fill="var(--accent)" stroke="var(--accent)"/>
  <line x1="247" y1="322" x2="247" y2="332" stroke="var(--foreground)" stroke-width="1.5"/>
  <text x="252" y="338" font-size="10.5" fill="var(--foreground)">one byte inserted here</text>
  <text x="96" y="360" font-size="11" fill="var(--muted-text)">Everything downstream shifts. Compared by offset, the rest of the file reads as corrupt.</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 2.</strong> The two damage classes are not equally hard. Modification preserves alignment; insertion and deletion destroy it, which is why an algorithm that assumes fixed offsets cannot repair them at all.</figcaption>
</figure>

That split produces two natural families of search algorithm, and the tradeoff between them is the real design decision.

A **recursive search** assumes alignment and subdivides: compare a region, and if it disagrees, split it and compare the halves, recursing until the damaged bytes are isolated. It is fast and needs very few exchanges, because each round eliminates a large fraction of the file. Its limitation is inherited from its assumption — it handles modifications, which is roughly the same class of damage classical error correction already covers.

A **double breakpoint search** does not assume alignment. Instead of comparing fixed positions, it works inward from both ends to find where the two copies stop agreeing and where they start agreeing again, bracketing the divergent region between two breakpoints. Because it locates boundaries rather than offsets, it survives insertions and deletions — the shift no longer confuses it, since the trailing agreement is discovered rather than assumed. The cost is more bookkeeping and more messages exchanged to converge.

So one algorithm is cheap and narrow; the other is more expensive and can repair damage that forward error correction fundamentally cannot touch. Which you want depends on what went wrong, and you often don't know that in advance.

## The Catch: Elegant Algorithms Are Chatty

Here is the part that I think is genuinely counterintuitive, and it is where ground-network instincts betray you.

Full retransmission is a **one-way** operation. You blast the file up and you are done. It is dumb, it wastes bytes, and it requires exactly one trip across the link.

Micropatching is a **conversation**. One side must ask which regions differ; the other must answer; the first narrows the search and asks again; eventually a patch goes up and gets confirmed. Every one of those turns is a round trip through a link with high latency and low bandwidth — and unlike the byte count, the number of round trips does not shrink just because the damage was small.

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="A sequence diagram comparing two update strategies. On the left, full retransmission shows a single large one-way arrow from ground to spacecraft carrying the entire file, labeled one trip across the link. On the right, patch negotiation shows five alternating smaller arrows between ground and spacecraft — asking which regions differ, answering, narrowing, sending the patch, and confirming — labeled five or more round trips." viewBox="0 0 640 350" style="display:block;width:100%;height:auto;max-width:620px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <rect x="12" y="12" width="296" height="326" rx="12" fill="var(--muted)" stroke="var(--border)" stroke-width="1"/>
  <text x="32" y="40" font-size="13" font-weight="700" fill="var(--foreground)">Full retransmission</text>
  <text x="32" y="59" font-size="11" fill="var(--muted-text)">many bytes, one trip</text>
  <text x="72" y="86" text-anchor="middle" font-size="11" font-weight="700" fill="var(--accent)">ground</text>
  <text x="250" y="86" text-anchor="middle" font-size="11" font-weight="700" fill="var(--accent)">craft</text>
  <line x1="72" y1="96" x2="72" y2="292" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <line x1="250" y1="96" x2="250" y2="292" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <line x1="72" y1="150" x2="240" y2="150" stroke="var(--accent)" stroke-width="6"/>
  <polygon points="250,150 236,142 236,158" fill="var(--accent)"/>
  <text x="156" y="138" text-anchor="middle" font-size="11" fill="var(--foreground)">the entire file, again</text>
  <text x="160" y="318" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--foreground)">1 trip across the link</text>
  <rect x="332" y="12" width="296" height="326" rx="12" fill="var(--muted)" stroke="var(--accent)" stroke-width="2"/>
  <text x="352" y="40" font-size="13" font-weight="700" fill="var(--foreground)">Patch negotiation</text>
  <text x="352" y="59" font-size="11" fill="var(--muted-text)">few bytes, many turns</text>
  <text x="392" y="86" text-anchor="middle" font-size="11" font-weight="700" fill="var(--accent)">ground</text>
  <text x="570" y="86" text-anchor="middle" font-size="11" font-weight="700" fill="var(--accent)">craft</text>
  <line x1="392" y1="96" x2="392" y2="292" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <line x1="570" y1="96" x2="570" y2="292" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <line x1="392" y1="122" x2="560" y2="122" stroke="var(--accent)" stroke-width="2"/>
  <polygon points="570,122 558,116 558,128" fill="var(--accent)"/>
  <text x="478" y="115" text-anchor="middle" font-size="10" fill="var(--muted-text)">which regions differ?</text>
  <line x1="570" y1="158" x2="402" y2="158" stroke="var(--accent)" stroke-width="2"/>
  <polygon points="392,158 404,152 404,164" fill="var(--accent)"/>
  <text x="482" y="151" text-anchor="middle" font-size="10" fill="var(--muted-text)">these ranges</text>
  <line x1="392" y1="194" x2="560" y2="194" stroke="var(--accent)" stroke-width="2"/>
  <polygon points="570,194 558,188 558,200" fill="var(--accent)"/>
  <text x="478" y="187" text-anchor="middle" font-size="10" fill="var(--muted-text)">narrow further</text>
  <line x1="570" y1="230" x2="402" y2="230" stroke="var(--accent)" stroke-width="2"/>
  <polygon points="392,230 404,224 404,236" fill="var(--accent)"/>
  <text x="482" y="223" text-anchor="middle" font-size="10" fill="var(--muted-text)">these exact bytes</text>
  <line x1="392" y1="266" x2="560" y2="266" stroke="var(--accent)" stroke-width="3"/>
  <polygon points="570,266 558,260 558,272" fill="var(--accent)"/>
  <text x="478" y="259" text-anchor="middle" font-size="10" fill="var(--foreground)">the patch</text>
  <text x="480" y="318" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--foreground)">5+ round trips across the link</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 3.</strong> The efficient approach sends far fewer bytes but requires a multi-turn conversation. When latency is the dominant cost, turns — not bytes — set the wall-clock time, and the dumb one-way transfer can win outright.</figcaption>
</figure>

The consequence is a crossover. Below some file size, the patch conversation's round trips cost more wall-clock time than simply blasting the file up would have, and the clever algorithm loses to the dumb one. Above that size, the byte savings dominate and micropatching pulls decisively ahead. Latency does not slow both approaches equally — a two-way protocol pays it on every turn, a one-way transfer pays it once.

This is a good lesson to carry out of the domain entirely: **an algorithm's complexity analysis is written in the wrong units if it counts the wrong scarce resource.** Bytes are the obvious cost. On a link like this, turns are the real one.

## Testing It Where It Actually Breaks

You can simulate all of this. You can stand up hardware matching the flight configuration, throttle the link to orbital data rates, inject latency, and corrupt files on purpose. That benchmarking is genuinely necessary — it is how you find the crossover point and characterize each algorithm before you spend precious orbital time.

But a lab replica models the link you *expect*. It does not model the link you get.

This is why in-orbit demonstration matters, and it is now possible in ways it wasn't a decade ago, because commercial edge-compute hardware has flown. An AWS Snowcone has been operating aboard the ISS since 2022 through a partnership with Axiom Space, [remotely operated from the ground](https://www.aboutamazon.com/news/aws/how-do-you-process-space-data-and-imagery-in-low-earth-orbit) and used for exactly this kind of demonstration — a general-purpose computer in orbit that researchers can actually talk to. Put the patch service on hardware like that, put its counterpart on a ground terminal, and you are no longer testing against your assumptions about the link. You are testing against the link.

What the real environment adds, above all, is AOS/LOS cycles that arrive on orbital mechanics' schedule rather than yours — mid-transfer, mid-negotiation, without warning.

## What LOS Does to a Conversation

Now recall that micropatching is stateful. The two sides are partway through a negotiation: certain regions have been ruled out, certain candidates are still open, a patch is half-delivered. That state lives on both ends and only makes sense as a pair.

Then the spacecraft goes below the horizon.

A brief dropout is survivable — the sockets stall, the session state is still valid on both sides, and when the link returns the conversation picks up where it left off. But as the outage lengthens, this stops working. Connections time out. Session state on one side may be discarded while the other still believes the negotiation is live. The two ends can come back with incompatible ideas about what has already been agreed, which is worse than having no state at all. And this is precisely where the one-way approach's stupidity becomes a virtue: a blind retransmission has no conversational state to lose. It either arrived or it didn't.

So the real engineering problem is not "which search algorithm is fastest." It is **how do you make a stateful protocol survive an adversary that severs the link at unpredictable intervals for unpredictable durations?** That pushes you toward checkpointing progress durably on both ends, making every exchange idempotent and resumable, designing the session to be reconstructible from what each side already knows, and treating an outage as an expected state transition rather than an error. Robustness across LOS is the hard requirement. Algorithm efficiency is the easy part sitting on top of it.

## Why This Is Getting More Urgent

Spacecraft used to be substantially fixed function. They are increasingly software-defined, which means their capability — and their vulnerability surface — is defined by code that will need to change while the vehicle is on orbit. At the same time, constellations have gone from a handful of expensive assets to hundreds or thousands of small ones, which multiplies the number of vehicles needing updates while each still gets only its own narrow slice of contact time.

Layer on the security requirement. When a disclosed vulnerability affects an entire constellation, "we'll push the patch over the next few weeks as passes allow" is a genuinely uncomfortable sentence. The efficiency of your update path becomes a measure of how quickly you can respond to a threat — which is why this sits inside the [zero-trust](https://www.cisa.gov/zero-trust-maturity-model) conversation now rather than in a networking-optimization backlog.

## The Takeaway

Getting software into a spacecraft is a good reminder that engineering intuitions are local to their environment. On the ground, bandwidth is scarce and round trips are free, so you optimize bytes and reach for the cleverest diff you can find. Move the same problem into orbit and the scarcity flips: round trips become the expensive resource, connection state becomes a liability rather than an asset, and below a certain file size the sophisticated approach is simply worse than shouting the whole file again and hoping.

The constraint that dominates is not bandwidth. It is that you are talking through a keyhole that closes on a schedule you don't control — and every design decision is really an answer to the question of what happens when it closes mid-sentence.
