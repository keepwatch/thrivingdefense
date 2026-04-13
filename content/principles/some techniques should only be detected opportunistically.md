---
tags:
  - author/Jordan_Anderson
  - theme/coverage
  - type/article
title: some techniques should only be detected opportunistically
description: Why some techniques cannot be detected comprehensively, and the implications of that state
aliases:
created: 2026-03-07
promoted: true
---
Frequently, detection engineers are held to a standard of coverage based on the MITRE ATT&CK matrix. Detection coverage requires two things - an assessment of current state and a target state, with the coverage metric measuring the distance between those two states. Usually, MITRE ATT&CK techniques are used as the definition of the target state - if you could detect all ATT&CK techniques, or all the ATT&CK techniques you suspect would be used against your organization, you could claim complete detection coverage. Normally this takes the form of a MITRE ATT&CK heatmap with various user-controlled color shades (check out [[ACRE (ATT&CK Coverage Ratio Evaluation)]] for another approach). However, coverage calculations quickly run into a serious issue - how many detections are necessary to provide *sufficient* (often considered *comprehensive*) coverage of a given technique (say, `T1059.001 - PowerShell`)? 10 detections? 100? 1000? 

The challenge emerges because PowerShell, a powerful Windows scripting language, can facilitate a vast and likely uncountable number of useful, interesting, or malicious purposes. Many other techniques share the same challenge. Interestingly, some ATT&CK techniques (like `T1003.006 — DCSync`) are narrowly scoped and [thoroughly researched](https://github.com/tired-labs/techniques/blob/main/reports/trr0011/ad/README.md) in a [[Technique Research Report (TRR)|TRR]] to identify all possible [[MITRE ATT&CK Procedures and Instances|procedures]] (technique execution paths). DCSync can be *comprehensively* detected, whereas the best option for PowerShell is *opportunistic* detection that captures known suspicious [[MITRE ATT&CK Procedures and Instances#Procedure vs Instance|instances]].

Because opportunistic is an overloaded term in cybersecurity (such as *opportunistic* vs *targeted* attacks), it's better to refer to these techniques as [[Techniques that should always be yielded|yielded techniques]]. This builds on the term *yielded space* coined by [[people/Andrew VanVleet|Andrew VanVleet]] in [TTPIs: Extending the Classic Model](https://medium.com/@vanvleet/ttpis-extending-the-classic-model-058c572b76f3), referring to attacks that are impractical (for whatever reason) to detect in a given organization. Intentionally yielding space allows the defender to conduct the battle on [[Selecting Advantageous Terrain|advantageous terrain]] instead of defending what is indefensible. More practically for the detection organization, this permits resource conservation: gaining *efficiency* by reducing time spent on detection development, research, tuning, and alert review for yielded techniques, allowing more *thoroughness* for detection research and alert review tasks for comprehensively-covered techniques (see the [[Efficiency-Thoroughness Tradeoff (ETTO) principle|ETTO principle]]). 
## Principles

What principles can we infer from this? Since the current default is for us to treat our detection libraries with the same level of excellence and maintenance for each technique and rule, the principles are framed in the negative (but include a corollary principle for how to treat comprehensive detections):

- [[Do not require comprehensive coverage for yielded techniques]]
- [[Aggressively tune rules linked to yielded techniques]]
- [[Acquire rules and tests for yielded techniques at scale]]

To be clear, opportunistic detections can absolutely detect attacker activity and should still be part of our arsenal, but we must stop treating opportunistic and comprehensive detections the same. Far more of our scarce time (research, content creation/maintenance, and analyst review) must go towards comprehensive detection in order for us to move beyond surviving to thriving.  

## Related content

- [[Techniques that should always be yielded]]