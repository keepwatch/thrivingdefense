---
title: attackers abuse legitimate capabilities
description: Detection is challenging because attackers predominantly abuse applications with legitimate capabilities.
aliases:
created: 2026-03-07
tags:
  - type/stub
author: "[[people/Jordan Anderson|Jordan Anderson]]"
---
# attackers abuse legitimate capabilities
One of the reasons detection is challenging is that nearly every action we seek to *detect* has a legitimate purpose. For example, in [Kerberoasting](https://attack.mitre.org/techniques/T1558/003/), requesting a ticket is a normal part of the Kerberos workflow and therefore difficult to detect consistently. Practically, this takes an opportunistic thresholding approach (X requests in Y time) rather than a comprehensive one - see this [Sigma example](https://github.com/SigmaHQ/sigma/blob/master/rules/windows/builtin/security/win_security_kerberoasting_activity.yml#L7). 

There are some defensive categories that are less frequently used for legitimate purpose:

- [Defense Evasion](https://attack.mitre.org/tactics/TA0005/) is great to detect, as long as the actor actually tries these actions (which are ancillary to their objectives)
- [Impact](https://attack.mitre.org/tactics/TA0040) actions aren't often legitimate (such as discovering a file system being encrypted by ransomware), but occur so late in the attack that the should be prevented, not detected

One final point: remember that any activity likely to be malicious can also be *prevented* and is less important to detect. Therefore, many detection rules are focusing on the harder cases that are difficult to distinguish from normal (non-malicious) activity.

Credit to [[people/Michael H|Michael]] for the original idea.