---
tags:
  - author/Jordan_Anderson
  - type/stub
title: attackers are avoiding EDR
description: Why EDR's success at the endpoint has pushed sophisticated attackers toward edge devices where defenders are blind.
aliases:
created: 2026-03-19,
---
One of the great triumphs of EDR is that it forced a change in attacker behavior. More and more often, attackers will avoid the heavily fortified endpoint and go to the server environments where EDR coverage is more sparse. 

This is what victory for the defender looks like - a gap in the fighting to give enough breathing room before the next wave hits. Let's celebrate what we can.

## Brickstorm
> These intrusions are conducted with a particular focus on maintaining long-term stealthy access by deploying backdoors on appliances that do not support traditional endpoint detection and response (EDR) tools. The actor employs methods for lateral movement and data theft that generate minimal to no security telemetry.

From an [article Google Threat Intel wrote about BRICKSTORM](https://cloud.google.com/blog/topics/threat-intelligence/brickstorm-espionage-campaign)

### F5 fallout

F5 was infiltrated by the China-nexus actors who developed BRICKSTORM (UNC5221), according to [Bloomberg](https://www.bloomberg.com/news/articles/2025-10-16/potentially-catastrophic-breach-of-cyber-firm-blamed-on-china). The actor's average dwell time is 390+ days, per the Bloomberg article, indicating how hard it is to detect attackers using these techniques. Furthermore, the attackers appear to have targeted F5 source code, leading [F5](https://my.f5.com/manage/s/article/K000154696) and [CISA](https://www.cisa.gov/news-events/directives/ed-26-01-mitigate-vulnerabilities-f5-devices) to advocate for complete patching of known vulnerabilities (even as the threat actor has the freedom to parse the code for future vulnerabilities to exploit). F5's awareness of the risk also led them to make Crowdstrike Falcon sensor compatible with their BIG-IP products ([KB article](https://my.f5.com/manage/s/article/K000157015)), showing that they recognize the risk of minimal visibility posed by edge devices (including their own).