---
tags:
  - author/Jordan_Anderson
  - type/article
title: only detect techniques where intent can be identified
description: A three-question framework for deciding which ATT&CK techniques are worth detecting comprehensively
aliases:
created: 2026-03-28
draft: true
---
In [[MITRE ATT&CK® is not designed for detection]], we spoke about the history of ATT&CK — how it works well to identify behavior after malicious activity has been confirmed, but that identified behavior may be hard to detect (due to the difficulty of identifying intent or other difficult-to-acquire context). This post works through these elements with a few examples to identify a core principle.

Consider three questions that help us determine whether the context collection costs are too great to build a comprehensive detection:

- How frequently does the activity in question occur in the environment? 
- Is the user directly connected to the action, or does it occur as an abstraction?
- Can we reasonably and comprehensively infer intent without asking the user?

Let's run these questions against a small subset of common Windows techniques and see if we can extract any principles.

| Technique       | Frequency                                                   | Abstraction                                                                                                                                                                                  | Inference of intent                                                                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PowerShell      | High — 100s of scripts, arbitrary Windows terminal commands | Usually high — as products like VSCode (and increasingly, agentic AI clients) run PowerShell in the background                                                                               | Difficult — scripts can be lengthy and challenging to comprehend, powerful commands can be run for legitimate or illegitimate purposes                                                                                                |
| Scheduled Tasks | High                                                        | High — most users do not create scheduled tasks, applications create them (potentially on the user's behalf)                                                                                 | Difficult — scheduled task telemetry is often limited to task name, executing program, command lines, and schedule. Masquerading is trivial and effective.                                                                            |
| Valid Accounts  | Constant                                                    | High — most authentications (by volume) are invisible to the user, such as authenticating to share drives. Some are more direct, like 4624 type 2s or type 10s, though there are exceptions. | Moderate — baselining authentications can often detect significant anomalies, though using a compromised valid account from the same system(s) it's normally used from is very difficult to detect.                                   |
| Kerberoasting   | Constant                                                    | High — if a user is manually requesting a Kerberos ticket, that's a pretty good sign of malice!                                                                                              | Difficult — Kerberos is used as a fundamental authentication mechanism, including for service accounts. Finding a human who knows why a given auth happened is hard. Baselining can find high volumes of requests, but it's evadable. This is a classic example of how [[attackers abuse legitimate capabilities]]. |
| System Shutdown | High                                                        | High — many shutdowns are automated (not user-initiated) when managing systems as "cattle", not "pets"                                                                                       | Difficult — shutdown commands do not directly record reasons for the shutdown to occur, and the multiple paths to trigger a shutdown may not make parent process information available                                                |
| DCSync          | Very rare                                                   | Low — AD admins should be able to explain intended replications targets                                                                                                                      | Moderate — a limited set of systems make these requests, and any variation stands out                                                                                                                                                 |
(I threw in a bonus technique at the end in case you wondered if any techniques remain to be detected 😏)

## Conclusions

What conclusions can we draw from this exercise?

- If we cannot infer intent from context, we have to ask the user for intent
- If the activity is high abstraction, we cannot ask the user for intent (they will not know the answer)
- If the activity is high frequency, we cannot ask the user for intent (alert fatigue)

> Key principle: If we can't identify intent from context, and we can't ask the user about the activity, we should only detect the technique [[some techniques should only be detected opportunistically|opportunistically]]!

## Postscript

I wondered after writing this post if it was too bold. Would there be anything left to detect after reviewing all ATT&CK techniques with these criteria? However, it does still make sense for us to detect certain types of behaviors within [[Techniques that should always be yielded|yielded techniques]] — it doesn't mean we should turn off all our rules in that category! ==Those rules may still detect malice==, but they just cannot do it comprehensively, and they should not be the foundation of our defensive strategy.
