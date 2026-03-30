---
tags:
  - author/Jordan_Anderson
  - type/stub
title: MITRE ATT&CK is not flat
aliases:
created: 2026-03-27,
draft: false
---
The most common representation for MITRE ATT&CK® is a heatmap with two dimensions - width (tactics) and length (technique list). However, it hides depth as well in the form of platforms, which can be viewed in the sidebar[here](https://attack.mitre.org/matrices/enterprise/). You're probably familiar with platforms like Windows, macOS, and Linux, but then things get interesting. What about PRE, Containers, Office Suite, or ESXi? The basic concept is each platform is linked to a subset of techniques, but what we never talk about when discussing coverage is that organizations must detect attacks against each relevant `technique` x `platform` pair to achieve "full coverage". [Valid Accounts, Technique T1078 - Enterprise | MITRE ATT&CK®](https://attack.mitre.org/techniques/T1078/), for example, is in 10 different platforms, and coverage would not be complete without detection in all 10 platforms.

This hidden dimensionality is one reason why [[MITRE ATT&CK® is not designed for detection|ATT&CK is not designed for detection]] — the framework documents attacker behavior without accounting for the per-platform detection effort required. It also means that [[some techniques should only be detected opportunistically]] rather than comprehensively, since covering every technique across every platform is infeasible. See [[ACRE (ATT&CK Coverage Ratio Evaluation)|ACRE]] for an alternative approach to measuring coverage that accounts for these realities.