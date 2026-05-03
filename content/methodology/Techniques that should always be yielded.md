---
tags:
  - author/Jordan_Anderson
  - type/stub
title: Techniques that should always be yielded
aliases:
created: 2026-03-27,
draft: false
promoted: false
---
Building on the idea that [[some techniques should only be detected opportunistically]], the next problem is - which ones? Using open-source detection library parsing (originally done for the [[ACRE|ACRE]] metric), as well as detection philosophy discussed on this site or elsewhere, I have identified techniques that should always be yielded (as well as describing the methodology).

NOTE: this is a living document, more to come!

## Conclusions

If all you want is the list of techniques, you can get it `here` (along with an ATT&CK navigator layer `here`). Keep reading if you want to know why I excluded particular techniques.

## Phase 1: Open-source rule library analysis

> NOTE: Because [[MITRE ATT&CK® is not flat]], we have to incorporate MITRE platforms into our analysis. It's possible that a technique should be yielded for Windows but not for macOS.
- Many detections principle: techniques with a large number of detections for a single platform suggest instance-based detection and may need to be yielded
- No detections principle: techniques with NO detections for a platform may represent a [[Technique Research Report (TRR)|TRR research opportunity]] or no detection viability

### PRE platform

![[MITRE ATT&CK® PRE]]

### T1059 - Command and Scripting Interpreter

I've mentioned [[some techniques should only be detected opportunistically|elsewhere]] that scripting tools can be used for an effectively infinite number of malicious purposes. When looking at open-source rule libraries and Atomic Red Team, the technique and sub-techniques are linked to 980 total rules and tests across four ATT&CK platforms, indicating the vast opportunities for malicious activity within these tools. T1059.001 (PowerShell) alone has 339 rules and tests (22 ART, 187 Sigma, 54 Splunk, 76 Elasticsearch), and there are 12 other sub-techniques (plus a parent technique) to consider! Practically, this can turn into a dumping ground for Level 1 indicator-adjacent rules. 

Here are the top hitters from the analysis:

| Technique | Platform | Name                              | Total | ART | Sigma | Splunk |  ES | Tactic(s) |
| --------- | -------- | --------------------------------- | ----: | --: | ----: | -----: | --: | --------- |
| T1059.001 | Windows  | PowerShell                        |   339 |  22 |   187 |     54 |  76 | execution |
| T1059.004 | Linux    | Unix Shell                        |   104 |  17 |    13 |      5 |  69 | execution |
| T1059.003 | Windows  | Windows Command Shell             |    70 |   6 |    27 |     14 |  23 | execution |
| T1059     | Windows  | Command and Scripting Interpreter |   181 |   1 |    59 |     22 |  99 | execution |

Conclusion: T1059 and its children should be yielded across Windows, Mac, and Linux. Opportunistic detection only.

Note: it's possible that this technique can be detected on some platforms where command execution is much rarer (such as ESXi). More research is required there.

### Undetected techniques

Excluding PRE, there are 132 techniques that are not present in Atomic Red Team or any of the three rules libraries evaluated. These are likely good candidates to yield - the absence of tests and rules likely means the community has not quite figured out how to use, classify, or detect these techniques. It should certainly not be used as a coverage standard today!

#### ESXi platform undetected

Interestingly, ATT&CK has a platform for "ESXi", but I was not able to find any open-source detections for this platform x technique combination[^1]. Telemetry does exist but it's hard to collect, so that could be the reason, and this alone does not mean the techniques should be yielded. 


### Notable defense evasion techniques

ATT&CK is planning to rework the defense-evasion category, which is probably good, because several of these techniques are likely being used for [[MITRE ATT&CK Procedures and Instances|instance-level]] rules. 

| Technique | Platform | Name                            | Total | ART | Sigma | Splunk |  ES | Tactic(s)                                          |
| --------- | -------- | ------------------------------- | ----: | --: | ----: | -----: | --: | -------------------------------------------------- |
| T1112     | Windows  | Modify Registry                 |   279 |  90 |    80 |     76 |  33 | defense-evasion                                    |
| T1562.001 | Windows  | Disable or Modify Tools         |   242 |  39 |   109 |     80 |  14 | defense-evasion                                    |
| T1218     | Windows  | System Binary Proxy Execution   |   214 |  16 |   143 |     13 |  42 | defense-evasion                                    |
| T1027     | Windows  | Obfuscated Files or Information |   126 |  10 |    86 |      6 |  24 | defense-evasion                                    |
| T1548.002 | Windows  | Bypass User Account Control     |   108 |  27 |    56 |     16 |   9 | privilege-escalation, defense-evasion              |
| T1574.001 | Windows  | DLL Search Order Hijacking      |   105 |   6 |    78 |     15 |   6 | persistence, privilege-escalation, defense-evasion |
| T1218.011 | Windows  | Rundll32                        |    71 |  16 |    28 |     17 |  10 | defense-evasion                                    |
| T1562.002 | Windows  | Disable Windows Event Logging   |    51 |  10 |    24 |     12 |   5 | defense-evasion                                    |
Some notes on the above:
- T1112 - Modify Registry - is incredibly common and fits into an archetype we'll consider in Phase 2 - "impossible to derive intent". Yield.
- T1562.001 - Disabling or Modifying Tools - is both comprehensive and opportunistic at the same time. On the one hand, catching someone disabling a tool is a significant indicator of malice. On the other, there are many different tools and many ways to disable the tools, which could create its own matrix of detection for this technique alone unless this is treated as opportunistic. 
	- A comprehensive detection option (still per-tool) can be "is the tool working right now". Since tools often stop working on their own, even this can be difficult to consistently enforce (though a consistent host integrity check can do wonders to ensure the tooling is running). 
- T1218 - System Binary Proxy Execution - has the same problem as T1562.001. You could call this the [LOLBAS](https://lolbas-project.github.io/) or [GTFObins](https://gtfobins.org/) problem - plenty of in-built applications have fun ways that you can use them to evade prevention or defense controls. As defenders, we should absolutely detect this, but we should do so opportunistically, due to the large number of tools that can be used for this activity. It also shares some of the challenges of T1059, since using this as an execution proxy means the scope can scale to different execution types as well (Powershell, C#, Python, etc). It's impractical to break it down into procedures. Yield the technique and its sub-techniques.
- T1027 - Obfuscated Files or Information - this is unfortunately indivisible into smaller procedures due to it's breadth and lack of specificity. Yield across all platforms.

### Other volumetric analysis


| T1547.001 | Windows  | Registry Run Keys / Startup Folder |    67 |  20 |    32 |      5 |  10 | persistence, privilege-escalation                  |
| --------- | -------- | ---------------------------------- | ----: | --: | ----: | -----: | --: | -------------------------------------------------- |

| T1053.005 | Windows | Scheduled Task                     |  87 |  12 |  36 |  23 |  16 | execution, persistence, privilege-escalation |
| --------- | ------- | ---------------------------------- | --: | --: | --: | --: | --: | -------------------------------------------- |
| T1047     | Windows | Windows Management Instrumentation |  86 |  10 |  44 |  20 |  12 | execution                                    |
| T1003     | Windows | OS Credential Dumping              |  85 |   7 |  26 |   7 |  45 | credential-access                            |
| T1543.003 | Windows | Windows Service                    |  81 |   6 |  37 |  20 |  18 | persistence, privilege-escalation            |
| T1055     | Windows | Process Injection                  |  78 |  13 |  27 |  24 |  14 | defense-evasion, privilege-escalation        |
| T1204.002 | Windows | Malicious File                     |  66 |  13 |  26 |  15 |  12 | execution                                    |
| T1569.002 | Windows | Service Execution                  |  59 |   7 |  37 |  10 |   5 | execution                                    |
| T1018     | Windows | Remote System Discovery            |  53 |  16 |  13 |  18 |   6 | discovery                                    |

## Phase 2: Intent identification

- Intent identification principle: Since [[MITRE ATT&CK® is not designed for detection]], we should [[only detect techniques where intent can be identified]]. 


[^1]: Sigma has [ESXCLI rules for Linux systems](https://github.com/search?q=repo%3ASigmaHQ%2Fsigma%20esxi&type=code), but not rules based on ESXi-specific telemetry
