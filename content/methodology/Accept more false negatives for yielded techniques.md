---
tags: type/stub
title: Accept more false negatives for yielded techniques
description: Why yielded techniques should be tuned more aggressively and are safer to detect opportunistically.
aliases:
created: 2026-03-07
author: "[[people/Jordan Anderson|Jordan Anderson]]"
---
Building off [[some techniques should only be detected opportunistically]] and the principles of *yielded techniques* established there, some techniques are impractical to detect comprehensively. Additionally, because yielded techniques do not represent the core of a detection strategy, it is safer to incur false negatives for these techniques. Since [[false positives and false negatives occur on a continuum]], this means these rules should be tuned much more aggressively (such as excluding platforms of thousands of computers at once).

A related principle is that these rules are much less valuable to validate (validation is most useful to identify false negatives).