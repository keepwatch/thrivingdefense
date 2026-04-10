---
tags:
  - author/Jordan_Anderson
  - type/article
  - theme/validation
title: Deliberate practice for detection engineering
description: Applying deliberate practice principles to build real detection engineering skill — not just experience.
aliases:
created: 2026-04-10
draft: true
---
## The problem with experience alone

Detection engineers get better by writing detections — right? Not necessarily. Research on expert performance shows that experience alone doesn't reliably produce expertise. Professionals with 20 years of experience don't automatically outperform those with 5. What separates experts from experienced non-experts is **deliberate practice** (DP): focused training on specific sub-skills, with immediate feedback, repeated performance, and progressive difficulty.

> Expert performance can be traced to active engagement in deliberate practice, where training is focused on improving particular tasks. DP also involves the provision of immediate feedback, time for problem-solving and evaluation, and opportunities for repeated performance to refine behavior.
> — Ericsson, [Deliberate Practice and Acquisition of Expert Performance](https://pubmed.ncbi.nlm.nih.gov/18778378/)

Most detection engineers learn on the job — triaging alerts, writing rules under pressure, reacting to the latest threat report. This is *experience*, but it isn't *practice*. There's no coach, no feedback loop, no isolation of component skills, and no progressive challenge. We get better at the things we repeat most (writing Splunk queries, navigating ATT&CK) while our weaknesses persist unexamined.

## Deliberate practice applied to detection engineering

Applying DP to detection engineering means decomposing the craft into trainable sub-skills and creating exercises that isolate each one. Each exercise needs:

1. **A clearly defined task** with a specific, assessable output
2. **Immediate feedback** from an evaluator (human or AI) against defined standards
3. **Repetition with variation** — the same skill applied to different techniques, data sources, and scenarios
4. **Progressive difficulty** — exercises get harder as the learner demonstrates competence
5. **Reflection** — the learner reviews feedback, identifies patterns in their mistakes, and adjusts

This is fundamentally different from a tutorial or a certification lab. Tutorials teach concepts; DP builds skill through repetition and coaching. A learner might complete dozens of exercises at the same level before progressing — and that's the point.

## Exercise types

Each exercise type targets a specific sub-skill. A learner doesn't need to complete all types sequentially — but each type has its own internal progression from easier to harder.

### [[Deliberate practice - writing tests and detections|Writing tests and detections]]

The core mechanical skill: given a threat, write a test that simulates the behavior and a detection rule that identifies it. This exercise follows a [[Turning the TIDE with Test-Initiated Detection Engineering|TIDE]]-influenced workflow — tests come first, detections follow. Tests are written in [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team) format. Detection rules are written in [Sigma](https://sigmahq.io/) format.

*More exercise types will be added over time as this framework matures.*

## The AI coach

Deliberate practice traditionally requires a coach — someone who designs exercises, observes performance, and provides expert feedback. For detection engineering, an AI assistant can fill this role in a chat interface, using a structured prompt that encodes:

- The exercise scenario and instructions
- Evaluation rubrics and quality standards
- The ability to provide immediate, specific feedback on the learner's output
- Awareness of common mistakes and how to correct them

The AI coach is not a replacement for human mentorship. It's a way to make practice *accessible* — available any time, infinitely patient, and consistent in applying evaluation standards. A human mentor can then focus on the harder problems: strategic judgment, career development, and the exercises where the AI's feedback isn't sufficient.

### How it works

1. The learner opens a chat session with the AI coach prompt loaded
2. The coach presents an exercise at the learner's current level
3. The learner works through the exercise, submitting their outputs in the chat
4. The coach evaluates each submission against the rubrics and provides specific feedback
5. The learner revises based on feedback (or moves on if the work meets the standard)
6. At the end of the session, the coach produces a **practice log entry** — a structured summary of what was practiced, what went well, what needs work, and suggested next exercises

### Practice log

The practice log is a lightweight progress-tracking mechanism. After each session, the learner saves the coach's summary to a local file (Markdown or JSON). At the start of the next session, the learner can share prior log entries with the coach so it can:

- Avoid repeating scenarios the learner has already completed well
- Revisit areas where the learner struggled
- Adjust difficulty based on demonstrated skill

This allows progression to span weeks and months, not just a single session.

## Principles

These principles guide how exercises are designed:

1. **Practice the skill, not the tooling.** Exercises focus on detection thinking — understanding attacker behavior, writing meaningful tests, crafting precise rules. Not on navigating a specific SIEM UI.
2. **Behavioral over indicator-based.** Consistent with the [[Pyramid of Pain]], exercises emphasize detecting TTPs over IOCs. Learners should be able to distinguish between a detection that will break when an IP changes and one that catches the underlying behavior.
3. **Test-first mindset.** Following [[Turning the TIDE with Test-Initiated Detection Engineering|TIDE]], exercises reinforce the discipline of writing the test before the detection — ensuring the learner thinks about what they're trying to detect before thinking about how to detect it.
4. **Realistic ambiguity.** Real threat intel is messy. Exercises should include ambiguous scenarios, incomplete information, and legitimate activity that looks suspicious — because that's what the job actually looks like.
5. **Failure is signal.** A learner who gets immediate feedback on a weak detection and revises it is learning faster than one who writes a "correct" detection on the first try. The goal is to find and fix weaknesses, not to get a score.
