---
tags: type/stub
title: detections based on threat intelligence are always opportunistic
description: Why threat intelligence can only provide an opportunistic, not comprehensive, understanding of attack methods.
aliases:
created: 2026-03-07, 09:49
author: "[[people/Jordan Anderson|Jordan Anderson]]"
---
# detections based on threat intelligence are always opportunistic

This can be expanded more, but said very simply:

- Attackers only exercise some of the likely possible attack paths
- Of the attacks conducted by attackers, only some are detected
- Of the attacks detected, only some are publicized

Therefore, it is impossible to achieve comprehensive knowledge of how to execute a technique by ingesting threat intelligence. Additionally, while it can be useful to use threat intelligence and In-The-Wild detail to shape priorities, overreliance on this data can lead to detection overfitting on attackers bad enough to be detected.

Said another way, it's impossible for an understand of what all attackers are doing today to produce a comprehensive understanding of what they could do in a particular area, which means [[Technique Research Report (TRR)]]-style research is good for comprehensive detection, and threat intelligence helpfully feeds opportunistic detection

