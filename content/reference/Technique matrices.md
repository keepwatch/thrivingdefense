---
tags:
  - author/Jordan_Anderson
  - type/stub
title: Technique matrices
description: A collection of ATT&CK-adjacent matrices — SITF, PR3TACK, and others — to expand ACRE's coverage denominator.
aliases:
created: 2026-04-13,
draft: false
promoted: false
---
## What is a technique matrix?

[[MITRE ATT&CK® is not flat|MITRE ATT&CK® provided the OG technique matrix]], displaying a grouped collection of attacker tactics and techniques. Here's an example below:

![[acre_mitre-example-2.png]]
*Source: [helpful reference on how to use ATT&CK Navigator](https://blog.agood.cloud/posts/2022/12/17/doing-more-with-attack-navigator/)*

Of course, it's hard to build something [[Mutually Exclusive and Collectively Exhaustive (MECE)]], and far easier to create a new matrix ([relevant XKCD](https://xkcd.com/927/)), so there are several other matrices with unclear levels of overlap. This page will at least assemble them, and eventually we'll figure out how to deduplicate them for [[ACRE|ACRE]] purposes.

## Other matrices

### SITF

[SITF - SDLC Infrastructure Threat Framework](https://wiz-sec-public.github.io/SITF/)

> A comprehensive framework for understanding and mitigating supply chain security threats across the Software Development Lifecycle infrastructure.

Zach Allen notes from [DEW #151](https://www.detectionengineering.net/p/dew-151-the-security-cognitive-rust) that:
- "They list five components of potential victim infrastructure: Endpoint, VC, CI/CD, Registry & Production."
- "Three stages, Initial Access, Discovery & Lateral Movement and Post-Compromise, connect to ATT&CK, sans post-compromise"

This looks like a valuable resource for anyone trying to understand SDLC attacks and how they relate to other types of attacks!
### PR3TACK

[PR3TACK - Preemptive Tactics & Countermeasures Knowledgebase](https://pr3tack.org/)

> The Preemptive Tactics & Countermeasures Knowledgebase (PR3TACK) is an openly accessible framework designed to catalogue plausible but unobserved adversary tactics, techniques, and procedures (TTPs).

It looks like a good compliment to [[Technique Research Report (TRR)|TRRs]] (and a similar philosophy) - "don't only detect what has been ==observed==, detect what is ==possible==." (related to [[detections based on threat intelligence are always opportunistic]])

Credit to Zach Allen who pointed this out in [DEW #151](https://www.detectionengineering.net/p/dew-151-the-security-cognitive-rust).

