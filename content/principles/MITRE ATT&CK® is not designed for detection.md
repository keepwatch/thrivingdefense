---
tags:
  - author/Jordan_Anderson
  - type/stub
title: MITRE ATT&CK® is not designed for detection
description: ATT&CK documents what attackers do — not what defenders can detect. Understanding that gap changes everything.
aliases:
created: 2026-03-10,
draft: true
promoted: false
---
MITRE ATT&CK® is **everywhere** in detection engineering. Vendor products label the alerts by ATT&CK technique, EDRs claim 100% mitigation in [evaluation scenarios](https://evals.mitre.org/), and detection engineering consultants recommend building "ATT&CK heatmaps" as the best practice for understanding "detection coverage"[^1]. But have you ever stopped to wonder how ATT&CK was made, and whether it's fit for the detection purpose?

While discussing how [[attackers abuse legitimate capabilities]] with my friend [[Michael H|Michael]], we were asking the same question. How is it possible that so many techniques in ATT&CK are so difficult to detect comprehensively and with low false positive rates? [[some techniques should only be detected opportunistically|Elsewhere]], I've mentioned some of these, and more easily come to mind: PowerShell, Scheduled Tasks, Valid Accounts, Kerberoasting, or System Shutdown. 

The [ATT&CK FAQ](https://attack.mitre.org/resources/faq/) page includes this fascinating tidbit about the origin of ATT&CK:

> ATT&CK ... was created out of a need to document adversary behaviors ... to investigate use of endpoint telemetry data and analytics to improve post-compromise detection of adversaries operating within enterprise networks.

Together, we realized that the purpose of the project was to ==document attacker behaviors== with the goal of improving post-compromise detection, but starting from a very different point than the analysts *triaging* an alert. The ATT&CK researchers *already knew* that a technique was malicious because they could link it to a known intrusion. However, an analyst reviewing an alert does not know the disposition of the activity — in fact, this is the primary task of the analyst! They must infer user intent from context, compare activity to known user or group baselines, or even [ask users directly](https://blog.palantir.com/democratizing-security-detection-71c689b667a5) if they were responsible. This context is often expensive in terms of collection or analysis time, and organizations must naturally choose which leads to prioritize (*à la* the [Funnel of Fidelity](https://specterops.io/blog/2019/11/20/introducing-the-funnel-of-fidelity/)). 

> Key principle: Attacker behavior can be labeled after an incident without those labels corresponding to usable detections

The high costs to collect context for some ATT&CK techniques disqualify them from effective security monitoring. This is not a flaw in ATT&CK, but in how detection engineering applies it. It's one reason why [[some techniques should only be detected opportunistically]], and shows us one of the criteria for yielding — [[only detect techniques where intent can be identified]].

[^1]: See [[ACRE (ATT&CK Coverage Ratio Evaluation)]] as an alternative
