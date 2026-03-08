---
tags: type/stub
title: Acquire rules for yielded techniques at scale
description: Why yielded techniques are impractical to detect manually and should instead be outsourced to collaboratively developed sources.
aliases:
created: 2026-03-07, 10:28
author: "[[people/Jordan Anderson|Jordan Anderson]]"
---
# Acquire rules for yielded techniques at scale
Building off [[some techniques should only be detected opportunistically]] and the principles of *yielded techniques* established there, some techniques are impractical to detect organization-by-organization. Instead, they should be outsourced to vendors (EDR, A/V, email security appliances, etc.) or shared detection sources and implemented with minimal human effort. 

For example, Sigma rule packs corresponding to the core rule set could be automatically downloaded, run once against log content (to determine rule hit counts), and enabled only if the hit counts are beneath an threshold. Rules not meeting this criteria can be safely ignored (likely not worth the human effort).

From a maintenance perspective, org-specific validation tests should not be prioritized for these rules.