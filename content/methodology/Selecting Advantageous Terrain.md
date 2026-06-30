---
title: Selecting Advantageous Terrain
description: How defenders can identify advantageous terrain and focus limited resources on high-return detection efforts.
created: 2026-03-07
tags:
  - author/Jordan_Anderson
  - type/article
  - theme/coverage
aliases:
---
> "He who defends everything, defends nothing" - Attributed to Frederick the Great

Cybersecurity defenders face scarcity every day. There are a vast number of attacks possible, detections that need to be written or maintained, new technologies to be integrated, and a vast quantity of alerts to review or tune. It can seem impossible to get ahead of the daily operational constraints of human time, data ingest costs, or alert volume incurred by the SOC. Therefore, defenders must concentrate resources on the paths likely to provide the most return on time investment.

Specifically for detection engineering, there is more we can do to understand the terrain of possible threat actor actions, and with that understanding, better focus our resources. [MITRE's ATT&CK](https://attack.mitre.org/) (created in 2013) catalogs threat actor tactics and techniques, attempting to comprehensively document how to attack target organizations. There is a famous heatmap visualization (available in [ATT&CK Navigator](https://mitre-attack.github.io/attack-navigator/)) that shows all the techniques and sub-techniques in a single view. However, to misquote Alfred Korzybski, [ATT&CK is the map, not the territory](https://en.wikipedia.org/wiki/Map%E2%80%93territory_relation), and in order to understand the actual landscape of attack techniques, we must go a layer deeper.

What tools do we have to understand the [[attackers abuse legitimate capabilities|legitimate capabilities that attackers abuse]]? To use a military metaphor, ATT&CK provides a satellite-level view, but we can use aerial reconnaissance and scouting teams on the ground to further refine our knowledge of the terrain. Aerial recon can help identify *yielded space* that should not be further scouted - for example, the valley surrounded by rocky hills is a dangerously exposed position, no matter the detailed terrain on the ground. For those areas that appear defensible from the sky, scouting with ground troops will provide much deeper understanding of the local terrain and how it must be successfully defended.

Moving beyond the metaphor, by looking at MITRE ATT&CK from a high level (like a recon drone), it becomes clear that [[some techniques should only be detected opportunistically]]. For example, ATT&CK includes [93 techniques and sub-techniques](https://attack.mitre.org/matrices/enterprise/pre/) with the Platform value of `PRE`, which means those that "take place outside of the victim environment, often as a preparatory measure to support targeting." Detection engineers at the "victim" organization have no ability to comprehensively detect activity occurring outside their environment, so `PRE`-labeled techniques should not be considered as part of the detection goal.

Performing scouting with ground troops has a real parallel as well. ATT&CK techniques can be comprehended and documented through processes like the [[Technique Research Report (TRR)]]. This knowledge allows decisions about whether each procedure is worth defending in a given environment. For example, some procedures (like the use of [valid credentials for remote email collection](https://github.com/tired-labs/techniques/tree/main/reports/trr0019/exo#procedure-a-valid-credentials) in Exchange Online) closely align to legitimate action (users viewing their email remotely). Whether specific credential methods are very prevalent or barely used at an organization will vastly change how opportunistic or comprehensive the detection can be.

As an aside to the last point, while there are many elements of an organization's detection strategy that vary by organization, there are elements and constraints that are universally true (such as "comprehensive detections of `PRE` activity against your organization are impossible"). It is valuable to identify and standardize what is universally true so this can become part of the best practices validated by management, auditors, and regulators. 

## Action items

What does this information mean practically? 

- We need to identify more techniques that should not be detected comprehensively. The scripts used to calculate coverage for [[ACRE|ACRE]] can help discern difficult-to-comprehensively-detect techniques. What do you think the standards should be?
- We need to better understand non-OS, platform-specific techniques, including for [[Trusted Service Infrastructure (TSI)]]. Consider doing deep technique research and contributing it as a [[Technique Research Report (TRR)]]!
- We need more technologies and processes that [[systematically disrupt attacker behavior]]. 


