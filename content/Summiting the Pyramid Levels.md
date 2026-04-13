---
tags: [author/Jordan_Anderson, type/stub]
title: Summiting the Pyramid Levels
aliases:

created: 2026-04-12,

draft: true

promoted: false
---
Summiting the Pyramid (StP) is a MITRE approach that seeks to decompose the top triangle of the [[Pyramid of Pain]], creating more precise criteria about the coverage and classification of different TTP-driven detections.

There are several components of StP, but one of the most valuable concepts is StP Levels, which allow detection engineers to assess the brittleness of their rules.

## Levels

- Level 1: Rule detects indicators that can easily be changed by attackers (filename, command line argument, pipename, etc). This evokes the indicator-based approach alluded to in the [[Pyramid of Pain]]; though the indicators are not those named in the Pyramid.
- Level 2: Rule detects attributes core to an attacker-developed tool. A rule written to detect the process launch of Mimikatz (assuming it followed a particular path) would be an example here; it can be changed by the attacker (with more work required than Level 1)
- Level 3: Rule detects attributes core to a system-provided tool, such as when an attacker is using rundll32.exe to execute malware. The attacker cannot usually modify the trusted software being abused (changing the code of rundll32.exe) without invalidating the application's signature - so detections based on something core to these inherent, local, organization-controlled tools are much less brittle. 
- Level 4: Rule detects behavior core to some implementations of a technique
- Level 5: Rule detects behavior core to a technique

Feel free to read the [more comprehensive treatment on the official website](https://center-for-threat-informed-defense.github.io/summiting-the-pyramid/levels/) - this is a quick summary and reference.

## The technique definition problem 

On one hand, StP does a great job of defining how a "TTP"-based rule could actually be quite brittle. Levels 1-3 especially are clearly described and can be intuitively, consistently mapped to the rule library, helping show whether the rule could be easily evaded by attackers. However, levels 4-5 are much harder to define and likely to become dumping grounds as a result. If combined with the [[Technique Research Report (TRR)]], which seeks to systematically define procedures and techniques, level 4 rules could correspond to "completely detect a procedure".

This brings up a related problem that levels 1-3 focus on [[MITRE ATT&CK Procedures and Instances|instances]], specific tools or approaches that could be used to implement a technique. Detecting these instances can be useful [[some techniques should only be detected opportunistically|opportunistically]], though attackers can regularly develop new tooling (and therefore create new instances) faster than defenders can keep up. This problem will certainly worsen with GenAI-powered malware development.