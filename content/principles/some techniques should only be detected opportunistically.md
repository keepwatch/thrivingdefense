---
tags: type/stub
title: some techniques should only be detected opportunistically
description: Why some broad techniques cannot be detected comprehensively and must be treated as yielded techniques.
aliases:
created: 2026-03-07
author: "[[people/Jordan Anderson|Jordan Anderson]]"
---
Frequently, detection engineers are held to a standard of coverage based on the MITRE ATT&CK matrix. Detection coverage requires two things - an assessment of current state and a target state, with the coverage metric measuring the distance between those two states. Usually, MITRE ATT&CK techniques are used as the definition of the target state - if you could detect all ATT&CK techniques, or all the ATT&CK techniques you suspect would be used against your organization, you could claim complete detection coverage. Normally this takes the form of a MITRE ATT&CK heatmap with various user-controlled color shades (check out [[ACRE (ATT&CK Coverage Ratio Evaluation)]] for another approach). However, coverage calculations quickly run into a serious issue - how many detections are necessary to provide *sufficient* (often considered *comprehensive*) coverage of a given technique (say, `T1059.001 - Powershell`)? 10 detections? 100? 1000? 

The challenge emerges because Powershell, a powerful Windows-embedded scripting language, can facilitate a vast and likely uncountable number of useful, interesting, or malicious purposes. Many other techniques share the same challenge. Interestingly, some ATT&CK techniques (like `T1003.006 - DCSync`) are narrowly scoped and [thoroughly researched via TRR](https://github.com/tired-labs/techniques/blob/main/reports/trr0011/ad/README.md) to identify all possible [[MITRE ATT&CK Procedures and Instances|procedures]] (technique execution paths). DCSync can be *comprehensively* detected, where the best option for Powershell is *opportunistic* detection that captures known suspicious [[MITRE ATT&CK Procedures and Instances#Procedure vs Instance|instances]].

Because opportunistic is a term overloaded in cybersecurity (such as *opportunistic* vs *targeted* attacks), it's better to refer to these techniques as *yielded techniques*. This builds on the term *yielded space* coined by [[people/Andrew VanVleet|Andrew VanVleet]], referring to attacks that are impractical (for whatever reason) to detect in a given organization. Intentionally yielding space allows the defender to conduct the battle on [[Selecting Advantageous Terrain|advantageous terrain]] instead of defending what is indefensible. More practically for the detection organization, this permits resource conservation: gaining *efficiency* by reducing time spent on detection development, research, tuning, and alert review for yielded techniques, allowing more *thoroughness* for detection research and alert review tasks (see the [[Efficiency-Thoroughness Tradeoff (ETTO) principle|ETTO principle]]). 

What principles can we infer from this?

- [[Do not require comprehensive coverage for yielded techniques]]
- [[Accept more false negatives for yielded techniques]]
- [[Acquire rules for yielded techniques at scale]]

And likely others!