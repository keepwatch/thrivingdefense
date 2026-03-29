---
tags:
  - author/Jordan_Anderson
  - type/stub
  - yield-principle
title: Aggressively tune rules linked to yielded techniques
description: Why yielded techniques should be tuned more aggressively and are safer to detect opportunistically.
aliases:
  - Accept more false negatives for yielded techniques
created: 2026-03-07
---
Building off [[some techniques should only be detected opportunistically]] and the principles of *yielded techniques* established there, some techniques are impractical to detect comprehensively. Additionally, because yielded techniques do not represent the core of a detection strategy, it is safer to incur false negatives for these techniques. Since [[false positives and false negatives occur on a continuum]], this means these rules should be tuned much more aggressively (such as excluding whole platforms, zones, or groups instead of going computer-by-computer, or user-by-user).

The inverse principle is that rules linked to comprehensive techniques should be tuned cautiously, to avoid false negatives. 
