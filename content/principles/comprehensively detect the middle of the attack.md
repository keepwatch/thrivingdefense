---
tags:
  - author/Jordan_Anderson
  - type/stub
title: comprehensively detect the middle of the attack
description: Defenders should focus comprehensive detection mid-attack — after initial access but before impact.
aliases:
created: 2026-04-11,
draft: false
promoted: false
---
Comprehensive detection means we should focus our efforts on the parts of attacks that provide the most substantial return on investment (this is the principle of [[some techniques should only be detected opportunistically]]). Intuitively, that's the "middle" of the attack. 


In the heatmap below, the attack path usually flows left-to-right. 
![[acre_mitre-example-2.png]]
[Image source](https://www.mbsecure.nl/blog/2019/5/dettact-mapping-your-blue-team-to-mitre-attack)

Attackers collect background data, gain initial access, establish a persistent foothold, gain privileges, conduct internal reconnaissance, and then try to achieve their objectives. Because detecting *Impact* (during/after objective is successfully accomplished) is too late to be meaningful [^1], and detecting *Execution* is nearly impossible due to the wide variation of attacker payloads/methods, orgs should focus detection on the phase where the attacker is gradually exploring and preparing to achieve their objective. 

[Many](https://taosecurity.blogspot.com/2009/05/defenders-dilemma-and-intruders-dilemma.html) [trusted](https://techcrunch.com/2023/02/07/cybersecurity-teams-beware-the-defenders-dilemma-is-a-lie/) [cybersecurity professionals](https://www.securitymagazine.com/blogs/14-security-blog/post/100902-how-to-transform-the-defenders-dilemma-into-the-defenders-advantage) have observed that the defender needs to be able to detect the attack before the attacker's goals are fully realized, and that the defender has many opportunities to find the attacker before that point. 

> Since we can [[Techniques that should always be yielded|yield early stages of the attack]], and since we must detect before impact, that means we should focus on the techniques in the middle of the attack.

[^1]: Unless the detection drives automatic prevention/response, which it usually doesn't in a SOC (maybe in a vendor product!)
