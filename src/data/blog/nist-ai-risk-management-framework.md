---
author: Diego Alducin, Ph.D.
pubDatetime: 2026-07-08T19:00:00Z
title: "GOVERN, MAP, MEASURE, MANAGE: A Field Guide to the NIST AI Risk Framework"
featured: false
draft: false
tags:
  - ai-governance
  - ai-safety
  - risk-management
  - nist
  - llm
description: The NIST AI Risk Management Framework gets name-dropped in every "responsible AI" meeting and read by almost no one. Here's what it actually is, why a voluntary framework got so much traction, and how researchers and engineers are really applying it — with the papers to prove it.
---

If you've sat in any meeting about "responsible AI" in the last two years, someone has said the words *NIST AI RMF* in a tone implying everyone already knows what it means. Usually nobody does. The acronym gets dropped like a password — proof you belong in the room — and then the conversation moves on before anyone has to explain it.

That's a shame, because the thing behind the acronym is one of the more genuinely useful documents to come out of the AI-governance scramble. It's short. It's free. It isn't trying to sell you anything. And — the part people miss — it's **voluntary**. No regulator makes you use it. Yet it has quietly become the shared vocabulary that companies, auditors, and researchers reach for when they need to say *"we thought about the risks, and here's how."*

This is the field guide I wish I'd had: what the framework is, why a document nobody is forced to use got so much traction, and how people are actually applying it — with the research to back each claim.

## What it actually is

The NIST AI Risk Management Framework — formally **NIST AI 100-1** — was released on **January 26, 2023** by the U.S. National Institute of Standards and Technology. NIST didn't dream it up on a whim: the **National Artificial Intelligence Initiative Act of 2020** (P.L. 116-283) directed them to build it, through an open, 18-month, multi-stakeholder process.

A few properties make it unusual:

- **Voluntary.** It carries no force of law. You adopt it because it's useful, not because an auditor with a clipboard is coming.
- **Sector- and use-case-agnostic.** The same four functions apply whether you're shipping a loan-approval model, a medical triage tool, or a chatbot.
- **A process, not a checklist.** There is no "NIST-certified" stamp. The RMF is a way of *thinking* about risk that produces artifacts — risk registers, measurement plans, incident playbooks — rather than a box you tick.

The heart of it is four functions. Three of them — **MAP, MEASURE, MANAGE** — form a continuous loop, and the fourth, **GOVERN**, wraps around all of them as the connective tissue: the culture, roles, and accountability that make the other three actually happen instead of living in a slide deck.

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="Diagram of the NIST AI RMF core. GOVERN is a cross-cutting outer function containing three cards — MAP, MEASURE, and MANAGE — connected left to right by arrows, with a dashed return arrow looping from MANAGE back to MAP to show a continuous cycle." viewBox="0 0 640 350" style="display:block;width:100%;height:auto;max-width:620px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <rect x="8" y="8" width="624" height="334" rx="16" fill="var(--muted)" stroke="var(--accent)" stroke-width="2"/>
  <text x="28" y="40" font-size="15" font-weight="700" fill="var(--accent)">GOVERN</text>
  <text x="106" y="40" font-size="12" fill="var(--muted-text)">cross-cutting — culture, roles, policies, accountability</text>
  <rect x="30" y="118" width="176" height="152" rx="10" fill="var(--background)" stroke="var(--border)" stroke-width="1"/>
  <text x="48" y="150" font-size="14" font-weight="700" fill="var(--foreground)">MAP</text>
  <text x="48" y="176" font-size="11.5" fill="var(--muted-text)">Establish context.</text>
  <text x="48" y="195" font-size="11.5" fill="var(--muted-text)">Who, what, where —</text>
  <text x="48" y="214" font-size="11.5" fill="var(--muted-text)">and what could</text>
  <text x="48" y="233" font-size="11.5" fill="var(--muted-text)">plausibly go wrong.</text>
  <rect x="228" y="118" width="176" height="152" rx="10" fill="var(--background)" stroke="var(--border)" stroke-width="1"/>
  <text x="246" y="150" font-size="14" font-weight="700" fill="var(--foreground)">MEASURE</text>
  <text x="246" y="176" font-size="11.5" fill="var(--muted-text)">Analyze, benchmark,</text>
  <text x="246" y="195" font-size="11.5" fill="var(--muted-text)">and track the risks</text>
  <text x="246" y="214" font-size="11.5" fill="var(--muted-text)">you mapped — with</text>
  <text x="246" y="233" font-size="11.5" fill="var(--muted-text)">real metrics.</text>
  <rect x="426" y="118" width="176" height="152" rx="10" fill="var(--background)" stroke="var(--border)" stroke-width="1"/>
  <text x="444" y="150" font-size="14" font-weight="700" fill="var(--foreground)">MANAGE</text>
  <text x="444" y="176" font-size="11.5" fill="var(--muted-text)">Prioritize, act,</text>
  <text x="444" y="195" font-size="11.5" fill="var(--muted-text)">allocate resources,</text>
  <text x="444" y="214" font-size="11.5" fill="var(--muted-text)">respond, and</text>
  <text x="444" y="233" font-size="11.5" fill="var(--muted-text)">recover.</text>
  <line x1="206" y1="194" x2="226" y2="194" stroke="var(--accent)" stroke-width="2"/>
  <polygon points="226,194 217,190 217,198" fill="var(--accent)"/>
  <line x1="404" y1="194" x2="424" y2="194" stroke="var(--accent)" stroke-width="2"/>
  <polygon points="424,194 415,190 415,198" fill="var(--accent)"/>
  <path d="M514 270 C 514 312, 118 312, 118 272" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 4"/>
  <polygon points="118,270 113,280 123,280" fill="var(--accent)"/>
  <text x="316" y="328" text-anchor="middle" font-size="11" fill="var(--muted-text)">continuous and iterative — what you measure and manage feeds back into context</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 1.</strong> The RMF core. <strong>GOVERN</strong> is the cross-cutting function that makes the rest real; <strong>MAP → MEASURE → MANAGE</strong> is a loop, not a waterfall. Structure per NIST AI 100-1, <a href="https://www.nist.gov/itl/ai-risk-management-framework"><em>AI Risk Management Framework 1.0</em></a> (2023).</figcaption>
</figure>

In plain terms: **MAP** is where you refuse to skip the boring question — *what is this system for, who does it touch, and how could it hurt someone?* **MEASURE** is where good intentions meet numbers — you actually test for the risks you named instead of asserting they're handled. **MANAGE** is triage and response — you can't fix everything, so you rank, resource, and build a plan for when something breaks. **GOVERN** is the reason any of it survives contact with a real org: someone owns it, someone signs off, and it's written down.

## Why people use a document nobody makes them use

A voluntary framework surviving in the wild is the interesting part. Three things earned it that.

**It gave everyone the same words.** Before the RMF, "trustworthy AI" was a vibe. NIST pinned it to seven concrete characteristics — the properties a system should have for its risk to be considered managed.

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="A checklist of the seven characteristics of trustworthy AI from the NIST AI RMF: valid and reliable; safe; secure and resilient; accountable and transparent; explainable and interpretable; privacy-enhanced; and fair with harmful bias managed." viewBox="0 0 640 340" style="display:block;width:100%;height:auto;max-width:600px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <rect x="8" y="24" width="624" height="34" rx="8" fill="var(--muted)"/>
  <circle cx="30" cy="41" r="4" fill="var(--accent)"/>
  <text x="48" y="46" font-size="13" font-weight="700" fill="var(--foreground)">Valid &amp; reliable</text>
  <text x="252" y="46" font-size="12" fill="var(--muted-text)">— it does what it claims, consistently. (The foundation.)</text>
  <rect x="8" y="66" width="624" height="34" rx="8" fill="var(--muted)"/>
  <circle cx="30" cy="83" r="4" fill="var(--accent)"/>
  <text x="48" y="88" font-size="13" font-weight="700" fill="var(--foreground)">Safe</text>
  <text x="252" y="88" font-size="12" fill="var(--muted-text)">— it doesn't endanger life, health, property, or environment.</text>
  <rect x="8" y="108" width="624" height="34" rx="8" fill="var(--muted)"/>
  <circle cx="30" cy="125" r="4" fill="var(--accent)"/>
  <text x="48" y="130" font-size="13" font-weight="700" fill="var(--foreground)">Secure &amp; resilient</text>
  <text x="252" y="130" font-size="12" fill="var(--muted-text)">— it withstands and recovers from attack and adversity.</text>
  <rect x="8" y="150" width="624" height="34" rx="8" fill="var(--muted)"/>
  <circle cx="30" cy="167" r="4" fill="var(--accent)"/>
  <text x="48" y="172" font-size="13" font-weight="700" fill="var(--foreground)">Accountable &amp; transparent</text>
  <text x="252" y="172" font-size="12" fill="var(--muted-text)">— you can tell who's responsible and what it did.</text>
  <rect x="8" y="192" width="624" height="34" rx="8" fill="var(--muted)"/>
  <circle cx="30" cy="209" r="4" fill="var(--accent)"/>
  <text x="48" y="214" font-size="13" font-weight="700" fill="var(--foreground)">Explainable &amp; interpretable</text>
  <text x="252" y="214" font-size="12" fill="var(--muted-text)">— its outputs and mechanisms can be understood.</text>
  <rect x="8" y="234" width="624" height="34" rx="8" fill="var(--muted)"/>
  <circle cx="30" cy="251" r="4" fill="var(--accent)"/>
  <text x="48" y="256" font-size="13" font-weight="700" fill="var(--foreground)">Privacy-enhanced</text>
  <text x="252" y="256" font-size="12" fill="var(--muted-text)">— it safeguards identity, autonomy, and dignity.</text>
  <rect x="8" y="276" width="624" height="34" rx="8" fill="var(--muted)"/>
  <circle cx="30" cy="293" r="4" fill="var(--accent)"/>
  <text x="48" y="298" font-size="13" font-weight="700" fill="var(--foreground)">Fair</text>
  <text x="252" y="298" font-size="12" fill="var(--muted-text)">— with harmful bias identified and managed.</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 2.</strong> The seven characteristics of trustworthy AI. NIST is explicit that these trade off against each other — you rarely max out all seven at once, and the RMF is the process for negotiating those trade-offs. Wording from <a href="https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/">NIST AIRC, §3</a>.</figcaption>
</figure>

**It's a Rosetta stone, not a dead end.** NIST publishes official *crosswalks* mapping the RMF to ISO/IEC 42001, the OECD principles, and other regimes, plus a **Playbook** of concrete suggested actions and a living **Roadmap**. So the work you do to satisfy the RMF isn't stranded — it translates into whatever compliance language your market speaks next. That's a big reason companies invest in it despite it being optional.

**It scales from the mundane to the catastrophic.** The RMF is deliberately high-level, which lets specialists extend it toward their own worst case. The clearest example is the resource that Anthony Barrett, Dan Hendrycks, and colleagues wrote explicitly "as a risk management practices resource for NIST for AI RMF version 1.0" — [*Actionable Guidance for High-Consequence AI Risk Management*](https://arxiv.org/abs/2206.08966) — which translates the framework's abstract functions into concrete guidance for systems whose failures could be catastrophic. The RMF is the trunk; guidance like this is a branch.

## How it gets applied — from PDF to running system

A framework is only worth the operationalization someone does on top of it. The honest test isn't whether people cite the RMF; it's whether they can turn "MEASURE" into a real dashboard. Here's where the recent literature gets interesting, because engineers have started doing exactly that.

The cleanest worked example I've found is [**AAGATE**](https://arxiv.org/abs/2510.25863) (Huang et al., 2025), a Kubernetes-native governance platform for *agentic* AI that describes itself as "a NIST AI RMF-aligned governance platform." What makes it useful reading is that it refuses to leave the functions abstract — it bolts a specific, existing security tool onto each one.

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="A table mapping NIST AI RMF functions to concrete tools in the AAGATE platform. GOVERN maps to a zero-trust service mesh, policy engine, and accountability logs. MAP maps to the MAESTRO agentic-AI threat-modeling framework. MEASURE maps to OWASP AIVSS plus SEI SSVC scoring. MANAGE maps to the Cloud Security Alliance Agentic AI Red Teaming Guide." viewBox="0 0 640 306" style="display:block;width:100%;height:auto;max-width:620px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <text x="16" y="22" font-size="12.5" font-weight="700" fill="var(--foreground)">From framework to running controls: one build's mapping</text>
  <rect x="8" y="40" width="150" height="56" rx="9" fill="var(--muted)" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="83" y="74" text-anchor="middle" font-size="14" font-weight="700" fill="var(--accent)">GOVERN</text>
  <rect x="166" y="40" width="466" height="56" rx="9" fill="var(--background)" stroke="var(--border)" stroke-width="1"/>
  <text x="184" y="64" font-size="12.5" fill="var(--foreground)">Zero-trust service mesh, explainable policy engine,</text>
  <text x="184" y="84" font-size="12.5" fill="var(--foreground)">behavioral analytics, accountability logs</text>
  <rect x="8" y="104" width="150" height="56" rx="9" fill="var(--muted)" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="83" y="138" text-anchor="middle" font-size="14" font-weight="700" fill="var(--accent)">MAP</text>
  <rect x="166" y="104" width="466" height="56" rx="9" fill="var(--background)" stroke="var(--border)" stroke-width="1"/>
  <text x="184" y="137" font-size="12.5" fill="var(--foreground)">MAESTRO agentic-AI threat modeling</text>
  <rect x="8" y="168" width="150" height="56" rx="9" fill="var(--muted)" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="83" y="202" text-anchor="middle" font-size="14" font-weight="700" fill="var(--accent)">MEASURE</text>
  <rect x="166" y="168" width="466" height="56" rx="9" fill="var(--background)" stroke="var(--border)" stroke-width="1"/>
  <text x="184" y="201" font-size="12.5" fill="var(--foreground)">OWASP AIVSS + SEI SSVC vulnerability scoring</text>
  <rect x="8" y="232" width="150" height="56" rx="9" fill="var(--muted)" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="83" y="266" text-anchor="middle" font-size="14" font-weight="700" fill="var(--accent)">MANAGE</text>
  <rect x="166" y="232" width="466" height="56" rx="9" fill="var(--background)" stroke="var(--border)" stroke-width="1"/>
  <text x="184" y="265" font-size="12.5" fill="var(--foreground)">Cloud Security Alliance Agentic AI Red Teaming Guide</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 3.</strong> This is what "applying the RMF" looks like in practice — each function becomes a concrete control backed by an existing security tool. Mapping from Huang et al., <a href="https://arxiv.org/abs/2510.25863"><em>AAGATE: A NIST AI RMF-Aligned Governance Platform for Agentic AI</em></a> (2025).</figcaption>
</figure>

That pattern repeats across domains once you go looking:

- **LLM and RAG systems.** Oz and Keskin's chapter [*Operationalizing NIST AI RMF for LLMs*](https://doi.org/10.5772/intechopen.1014752) instantiates all four functions for a retrieval-augmented enterprise assistant — GOVERN becomes named owners and data stewards, MAP becomes use-case cards and threat models, MEASURE becomes multi-metric evaluation, MANAGE becomes monitoring and release gates — with a before/after case study.
- **Cybersecurity and frontier models.** Ee et al.'s [*Adapting cybersecurity frameworks to manage frontier AI risks*](https://arxiv.org/abs/2408.07933) borrows the RMF's *functional* structure and pairs it with NIST's older, battle-tested Cybersecurity Framework to build a defense-in-depth stack for the highest-stakes systems.
- **Multi-framework harmonization.** Increasingly the RMF shows up as one pillar among several. Work on operational risk tiering like [CORTEX](https://arxiv.org/abs/2508.19281) and on autonomous-transport governance like [UGAF-ITS](https://arxiv.org/abs/2604.22789) explicitly harmonizes the NIST RMF with the EU AI Act and ISO/IEC 42001 — treating the voluntary framework as the piece that "structures voluntary practice" alongside the mandatory ones. This is exactly why those official crosswalks matter.

## The generative-AI addendum

The 2023 framework predates the moment generative models ate the discourse, so NIST shipped a targeted extension: the **Generative AI Profile (NIST-AI-600-1)**, released **July 26, 2024**, developed in part to satisfy Executive Order 14110. Rather than reinvent the four functions, the Profile enumerates **12 risk categories** unique to or amplified by generative AI — think confabulation ("hallucination"), dangerous CBRN or cyber uplift, data-privacy leakage, and harmful-bias amplification — and attaches **200+ suggested actions** slotted back into GOVERN / MAP / MEASURE / MANAGE. If you build with LLMs, the Profile is the part of the RMF you'll actually live in day to day.

## Where it falls short (because it does)

I like the RMF, but a field guide that only sells you the upside is marketing. Three honest caveats:

**Voluntary means uneven.** No teeth means adoption is a choice, and plenty of teams "align with NIST" in a slide and nowhere else. The framework can't make you serious; it can only give serious people structure.

**A process invites theater.** Because there's no certification, "we followed the RMF" can mean a rigorous measurement program or a filled-in template nobody revisits. The artifacts are only as honest as the org producing them.

**No single framework is complete.** A metric-driven security audit by Madhavan et al., [*Quantifying Security Vulnerabilities*](https://arxiv.org/abs/2502.08610), scored several major AI standards against a catalog of identified risks and reported that the NIST AI RMF 1.0, on its own, left a large majority of those specific security risks unaddressed.

<figure style="margin:2.25rem 0">
<svg role="img" aria-label="A single horizontal bar showing that roughly 69 percent of identified AI security risks were not addressed by the NIST AI RMF 1.0 alone, according to one metric-driven audit." viewBox="0 0 640 150" style="display:block;width:100%;height:auto;max-width:600px;margin:0 auto;font-family:var(--font-sans,ui-sans-serif,system-ui,sans-serif)">
  <text x="20" y="30" font-size="12.5" font-weight="700" fill="var(--foreground)">Coverage of identified AI security risks — RMF 1.0 alone</text>
  <rect x="20" y="56" width="560" height="36" rx="8" fill="var(--muted)"/>
  <rect x="20" y="56" width="388" height="36" rx="8" fill="var(--accent)"/>
  <text x="36" y="80" font-size="14" font-weight="700" fill="var(--background)">69.23% not addressed</text>
  <text x="580" y="80" text-anchor="end" font-size="12" fill="var(--muted-text)">addressed →</text>
  <text x="20" y="122" font-size="11.5" fill="var(--muted-text)">One audit's metric across three major standards — a reminder that the RMF is a</text>
  <text x="20" y="140" font-size="11.5" fill="var(--muted-text)">starting structure, not a complete security control set. It's why profiles and crosswalks exist.</text>
</svg>
<figcaption style="font-size:.82rem;line-height:1.5;color:var(--muted-text);margin:.6rem auto 0;text-align:center;max-width:560px"><strong style="color:var(--foreground)">Figure 4.</strong> The critical read: no voluntary meta-framework covers everything by itself. Figure per one audit's methodology in Madhavan et al. (2025); treat it as motivation to pair the RMF with domain controls, not as a scoreboard.</figcaption>
</figure>

The right way to read that number isn't "the RMF is bad" — it's "the RMF is scaffolding." It's designed to be composed with the Generative AI Profile, with sector profiles, with your own threat models. "We're NIST-aligned" is a starting line, not a finish line.

## The bottom line

If you build or ship AI, the RMF is close to the cheapest risk insurance available. It's free, it's readable in an afternoon, and it gives you a shared structure for making the implicit explicit — which is where most AI incidents actually originate. In my experience the disasters almost never happen in **MEASURE**, the part everyone rushes to instrument. They happen because nobody did **MAP** — nobody stopped to ask who this touches and how it could hurt them — and nobody did **GOVERN**, so when it broke, no one owned it.

Start there. Two functions, honestly done, put you ahead of most of the field. The rest of the framework is just how you keep it that way.

---

### Sources & further reading

- NIST — [AI Risk Management Framework (AI RMF 1.0), NIST AI 100-1](https://www.nist.gov/itl/ai-risk-management-framework) (Jan 26, 2023) · [DOI: 10.6028/NIST.AI.100-1](https://doi.org/10.6028/NIST.AI.100-1)
- NIST — [Characteristics of Trustworthy AI (AIRC §3)](https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/) and the [official crosswalks](https://www.nist.gov/itl/ai-risk-management-framework/crosswalks-nist-artificial-intelligence-risk-management-framework)
- NIST — [Generative AI Profile, NIST-AI-600-1](https://doi.org/10.6028/NIST.AI.600-1) (Jul 26, 2024)
- Barrett, Hendrycks, Newman & Nonnecke — [*Actionable Guidance for High-Consequence AI Risk Management*](https://arxiv.org/abs/2206.08966) (2022, rev. 2023)
- Huang et al. — [*AAGATE: A NIST AI RMF-Aligned Governance Platform for Agentic AI*](https://arxiv.org/abs/2510.25863) (2025)
- Oz & Keskin — [*Operationalizing NIST AI RMF for LLMs: Architecture, RAG and Secure Deployment*](https://doi.org/10.5772/intechopen.1014752) (2026)
- Ee et al. — [*Adapting cybersecurity frameworks to manage frontier AI risks*](https://arxiv.org/abs/2408.07933) (2024)
- Madhavan, Yazdinejad, Zarrinkalam & Dehghantanha — [*Quantifying Security Vulnerabilities: Gaps in Current AI Standards*](https://arxiv.org/abs/2502.08610) (2025)
- Muhammad et al. — [*CORTEX: Composite Overlay for Risk Tiering and Exposure*](https://arxiv.org/abs/2508.19281) (2025) · Butt, Iqbal & Iqbal — [*UGAF-ITS*](https://arxiv.org/abs/2604.22789) (2026)
