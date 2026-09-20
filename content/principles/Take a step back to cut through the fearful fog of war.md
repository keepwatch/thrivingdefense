---
tags:
  - author/Jordan_Anderson
  - type/article
title: Take a step back
description: Fear can distort security decisions. Question assumptions before committing to costly action
aliases:
  - Take a step back
created: 2026-08-17
draft: false
promoted: false
---
Cybersecurity folks love adopting principles from other fields, especially military ones, with varying degrees of actual applicability. One metaphor we've adopted (that mostly fits) refers to the *fog of war*. The metaphor, commonly associated with Carl von Clausewitz, describes a fog or twilight over the battlefield that makes it difficult to understand what is truly happening and to respond to it effectively. Here's a passage that captures the distortion I'm talking about[^1]:

> All action takes place, so to speak, in a kind of twilight, which like a fog or moonlight, often tends to make things seem grotesque and larger than they really are.

This quote hit me like a gut punch. My previous experience with the concept was shaped by real-time strategy video games like *Age of Empires*, which hide enemy movements and force composition unless your own units can see them. I had never considered the fear-amplified *distortion* effect, although this is hugely relevant to cybersecurity operators who are in survival mode. 

A few years ago, I spent a late night investigating a presumed threat, only to realize that I had failed to question my assumptions early: the threat was nothing more than a mirage. This led to the development of a [[Scoping incident response with questions|scoping questions methodology]], but the general principle is far broader than incident response alone. When we are faced with something scary, when we are making decisions out of fear, we cannot make good decisions. It can feel like we're in [[index|"survival mode"]] (or as my friend Aaron calls it, "lizard brain"), focused on immediate danger instead of questioning our assumptions. But many of these cases aren't life-or-death situations, so we need to deploy another tool to help us make effective decisions.

There are lots of techniques we can use here, but the most broadly applicable one is simply to ==take a step back==. 

- Don't reply to that email that raised your hackles right away. Instead, [[Writing ideas down refines them into truth|make a mind map or talk the problem through with a companion]] to get a better sense of it. 
- In an engineering role, don't always build exactly what you were asked to build. Instead, understand the problem that the requester is trying to solve, then evaluate whether the proposed solution effectively solves the problem. 
- In incident response, separate what you know from what you're assuming, then test those assumptions to make better decisions.  

These approaches are all linked by the need to take a step back and consider the situation before acting instinctively. Of course, [[Efficiency-Thoroughness Tradeoff (ETTO) principle|taking a step back is expensive (in time and effort)]], so there are cases where you have to move faster than that. Knowing when to move fast and when to slow things down is another underrated skill. But when acting would take substantial effort, or being wrong would have significant downstream consequences, we must take a step back and consider our next steps carefully. That pause helps us avoid being driven by the distorted images within the fog of war.

[^1]: He mentions fog elsewhere in his writing, but never uses the exact phrase "fog of war".
