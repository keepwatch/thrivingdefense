---
tags:
  - author/Jordan_Anderson
  - type/stub
  - yield-principle
title: Acquire rules and tests for yielded techniques at scale
description: Why yielded techniques should be outsourced to collaboratively maintained, shared detection sources.
aliases:
  - Acquire rules for yielded techniques at scale
created: 2026-03-07, 10:28
---
Building off [[some techniques should only be detected opportunistically]] and the principles of *yielded techniques* established there, some techniques are impractical to detect organization-by-organization. Instead, detection and validation should be outsourced to vendors (EDR, A/V, email security appliances, etc.) or shared research efforts, and implemented with minimal per-organization effort. 

As an example of how to automate the acquisition of these rules, Sigma rule packs for the [core rule set](https://github.com/SigmaHQ/sigma/blob/r2026-01-01/Releases.md) could be automatically downloaded, run once against log content (to determine rule hit counts), and enabled only if the hit counts are beneath a threshold in that organization's environment. Rules not meeting this criteria can be safely ignored, as they are likely not worth the human effort to make them sufficiently quiet to be useful.

Another post includes [[detection libraries must be repeatedly validated#How to do repeated validation|pros and cons of buying or building a validation approach]]; both approaches could allow the acquisition of validation tests at scale for yielded techniques.

The inverse of this principle is that rules written for non-yielded techniques must be added thoughtfully (*a la* [[Turning the TIDE with Test-Initiated Detection Engineering|TIDE]]) and [[detection libraries must be repeatedly validated|repeatedly validated]] to check for false negatives.
