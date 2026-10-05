---
tags:
  - type/definition
title: On Detection
description: An index of Jared Atkinson's On Detection series
aliases:
  - "On Detection: Tactical to Functional"
created: 2026-10-05
draft: false
promoted: false
---

*On Detection: Tactical to Functional* is a series by [[Jared Atkinson]] published by SpecterOps. This page collects direct links to the posts in reading order.

## Background

[[people/Jared Atkinson|Jared Atkinson]] wrote this series of articles describing a comprehensive taxonomy for understanding and documenting attacks (far beyond what MITRE defined with Tactics and Techniques). As Jared says in [part 1](https://specterops.io/blog/2022/07/19/part-1-discovering-api-function-usage-through-source-code-review/):

> My recent observation is that a three-tiered taxonomy (such as TTP) is far too limiting to facilitate the necessary conversation to improve our thinking about detection. I believe there are more than three tiers that exist which means our three-tier taxonomy necessarily leads to grouping different things at the top or, in our case, at the bottom of the taxonomy. For this reason, it seems to me that the term “Procedures” is used too broadly to describe too many things and limits our ability to really get into the technical details. Tactics, Techniques, and Procedures are all abstract concepts that serve as categories to group concrete things together. I want to start at the concrete and work my way up to explore all of the levels in between.

Jared believes there are at least six layers, starting with the lowest-level one:

- *functions*
- *operations*
- *procedures* 
- *sub-techniques*
- *techniques*
- *tactics*

Jared mostly writes about the Windows operating system, but the principles apply to every type of detection work - [[Andrew VanVleet|Andrew VanVleet's]] [[Technique Research Report (TRR)|TRR]] methodology is one practical implementation. 

## Series

1. [Discovering API Function Usage through Source Code Review](https://specterops.io/blog/2022/07/19/part-1-discovering-api-function-usage-through-source-code-review/)
2. [Operations](https://specterops.io/blog/2022/08/04/on-detection-tactical-to-functional-2/)
3. [Expanding the Function Call Graph](https://specterops.io/blog/2022/08/09/on-detection-tactical-to-functional-3/)
4. [Compound Functions](https://specterops.io/blog/2022/08/16/part-4-compound-functions/)
5. [Expanding the Operation Graph](https://specterops.io/blog/2022/08/18/part-5-expanding-the-operation-graph/)
6. [What is a Procedure?](https://specterops.io/blog/2022/09/08/part-6-what-is-a-procedure/)
7. [Synonyms](https://specterops.io/blog/2022/09/29/part-7-synonyms/)
8. [Tool Graph](https://specterops.io/blog/2023/06/01/part-8-tool-graph/)
9. [Perception vs. Conception](https://specterops.io/blog/2023/10/20/part-9-perception-vs-conception/)
10. [Implicit Process Create](https://specterops.io/blog/2023/11/01/part-10-implicit-process-create/)
11. [Functional Composition](https://specterops.io/blog/2023/11/14/on-detection-tactical-to-functional-10/)
12. [Behavior vs. Execution Modality](https://specterops.io/blog/2024/05/21/part-12-behavior-vs-execution-modality/)
13. [Why a Single Test Case is Insufficient](https://specterops.io/blog/2024/05/31/part-13-why-a-single-test-case-is-insufficient/)
14. [Sub-Operations](https://specterops.io/blog/2024/06/05/part-14-sub-operations/)
15. [Function Type Categories](https://specterops.io/blog/2025/01/07/part-15-function-type-categories/)
16. [Tool Description](https://specterops.io/blog/2025/01/13/part-16-tool-description/)

List last updated on October 5, 2026.

## Reading tips

The entire series is great, but if you'd like a gentler introduction, you could start with Part 6, 7, and 8 (Parts 1-5 are the background work for those posts). Alternatively, [SpecterOps offers a training on this content](https://specterops.io/training/tradecraft-analysis/), though I haven't taken it so can't personally vouch for it.



