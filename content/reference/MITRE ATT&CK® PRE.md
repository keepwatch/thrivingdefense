---
tags:
  - author/Jordan_Anderson
  - type/stub
title: MITRE ATT&CK® PRE
aliases:
created: 2026-04-03,
draft: false
promoted: false
---
I learned about the [PRE platform](https://attack.mitre.org/matrices/enterprise/pre/) while pivoting through MITRE ATT&CK® data looking for patterns. It's the result of a change made in ATT&CK v8 where the PRE-ATT&CK framework was merged into the Enterprise matrix. PRE-ATT&CK was focused on pre-compromise attack preparations, and MITRE admitted in a [blog post explaining the change](https://medium.com/mitre-attack/the-retirement-of-pre-attack-4b73ffecd3d3) that "most adversary Reconnaissance and Resource Development isn’t observable to the majority of defenders." 

The PRE platform makes it obvious that [[some techniques should only be detected opportunistically]]. These activities occur entirely in attacker-controlled space or on third-party infrastructure. Defenders will never have total coverage of techniques like "Gather Victim Identity Information" (which includes scraping, say, LinkedIn), but it's still valuable to opportunistically detect in this space if the right telemetry is available. 

There are two notable exceptions to the yield recommendation above. Defenders can and should seek to monitor brand-targeting domains or certificates acquired by attackers - this includes:

- [Acquire Infrastructure: Domains, Sub-technique T1583.001 - Enterprise | MITRE ATT&CK®](https://attack.mitre.org/techniques/T1583/001/) 
- [Obtain Capabilities: Digital Certificates, Sub-technique T1588.004 - Enterprise | MITRE ATT&CK®](https://attack.mitre.org/techniques/T1588/004/)

The parent techniques and remaining sub-techniques should be [[comprehensively detect the middle of the attack|yielded and only detected opportunistically]].