---
tags:
  - author/Jordan_Anderson
  - type/article
  - theme/validation
title: "Deliberate practice: writing tests and detections"
description: A structured exercise for practicing the core detection engineering skill — turning threat intelligence into tests and detection rules.
aliases:
created: 2026-04-10
draft: true
---
This exercise develops the core mechanical skill of detection engineering: reading threat intelligence, writing a validation test, and writing a detection rule. It follows the [[Deliberate practice for detection engineering|deliberate practice]] framework and uses an [[Deliberate practice for detection engineering#The AI coach|AI coach]] for feedback.

## Exercise structure

Each exercise follows a four-phase workflow. At lower levels, the coach provides scaffolding (pre-built inputs, hints, partial examples). At higher levels, the learner does more of the work independently.

### Phase 1: Extract detectable behaviors from threat intelligence

**Input:** A threat intelligence article, report, or advisory.

**Task:** Identify the behaviors described in the report that would be worth building a detection test for. Not everything in a threat report is equally useful — the learner must distinguish between:

- **Indicators** (IP addresses, hashes, domains) — low value, trivially changed by attackers. These sit at the bottom of the [[Pyramid of Pain]].
- **Behaviors and TTPs** (process injection techniques, credential access methods, lateral movement patterns) — high value, costly for attackers to change. These are what we want to detect.

**Output:** A prioritized list of candidate detections with:
- A short description of the behavior
- The relevant MITRE ATT&CK technique(s)
- A rationale for why this behavior is worth detecting (not just "it's in the report")

**Evaluation criteria:**
- Did the learner identify behavioral indicators rather than just IOCs?
- Are the ATT&CK mappings accurate?
- Is the rationale sound — does it reference detectability, attacker cost to change, or environmental relevance?
- Did the learner avoid over-extraction (listing everything in the report) or under-extraction (missing key behaviors)?

### Phase 2: Write a test

**Input:** A specific detectable behavior from Phase 1 (or provided by the coach at lower levels).

**Task:** Write a validation test in [Atomic Red Team YAML format](https://github.com/redcanaryco/atomic-red-team/blob/master/atomic_red_team/atomic_test_template.yaml) that simulates the identified behavior. The test should:

- Actually reproduce the technique, not just touch the same files or call the same binary
- Be atomic — test one thing, run independently
- Be repeatable — can be run multiple times without manual cleanup (or include cleanup commands)
- Specify the right platform and executor

**Output:** A complete Atomic Red Team test definition in YAML.

**Evaluation criteria:**
- Does the test simulate the actual behavior described in the intelligence, or just a superficial approximation?
- Is the YAML well-formed and compliant with the Atomic Red Team schema?
- Are input arguments parameterized where appropriate?
- Are dependencies and prerequisites specified?
- Would this test actually produce telemetry that a detection could fire on?

### Phase 3: Analyze results and write a detection rule

**Input:** The test from Phase 2 plus sample log data. At lower levels, the coach generates simulated log output that shows what the test execution would produce. At higher levels, the learner may need to reason about what telemetry the test would generate.

**Task:** Examine the log data, identify the events that correspond to the malicious behavior, and write a detection rule in [Sigma format](https://sigmahq.io/docs/basics/rules.html) that would catch the test execution.

**Output:** A complete Sigma rule in YAML.

**Evaluation criteria:**
- Does the rule correctly detect the test execution?
- Is the log source correctly identified (product, service, category)?
- Is the detection logic precise enough to avoid obvious false positives?
- Is it general enough to catch variations of the technique, not just the exact test parameters?
- Are the Sigma fields and syntax correct?
- Does the rule include appropriate metadata (title, description, level, tags with ATT&CK references)?

### Phase 4: Tune the detection

**Input:** The Sigma rule from Phase 3, plus a broader set of log data that includes both the malicious test execution and legitimate activity that may trigger the rule.

**Task:** Identify potential false positives in the broader log data and refine the detection rule to reduce noise without losing coverage. The learner should be able to articulate:
- What legitimate activity could trigger this rule?
- What filter conditions would exclude the false positives?
- What is the risk that the filter also excludes real attacks (the [[false positives and false negatives occur on a continuum|FP/FN tradeoff]])?

**Output:** A revised Sigma rule with tuning conditions and a brief written explanation of the tuning decisions.

**Evaluation criteria:**
- Were the false positives correctly identified?
- Do the filter conditions actually exclude the false positives without creating blind spots?
- Does the learner demonstrate awareness of the FP/FN tradeoff?
- Is the tuning justified with reasoning, not just pattern-matching on the sample data?

## Progression levels

Progression is designed to span **weeks of practice**, not a single session. A learner should spend multiple sessions at each level before advancing. The AI coach tracks which levels the learner has worked at and adjusts accordingly.

### Level 1 — Guided

The coach provides significant scaffolding:
- A curated threat intel excerpt with the key behaviors already highlighted
- Hints about which ATT&CK techniques are relevant
- A partial test template to complete
- Pre-generated log data with the relevant events marked
- A detection rule skeleton to fill in

**Goal:** Learn the formats (Atomic Red Team YAML, Sigma YAML), understand the workflow, and produce outputs that are structurally correct. Mistakes at this level are mostly about format and syntax.

### Level 2 — Supported

The coach provides the scenario but less hand-holding:
- A real threat intel article (or realistic synthetic one) without pre-highlighted behaviors
- No hints on ATT&CK mapping
- The test must be written from scratch (no template)
- Log data is provided but without markers — the learner must find the relevant events
- The detection rule must be written from scratch

**Goal:** Build independence in each phase. The learner should produce complete, correct outputs without scaffolding. The coach provides feedback after each phase before the learner moves to the next.

### Level 3 — Independent

The coach provides only the starting scenario:
- A complex threat intel report with multiple techniques, some worth detecting and some not
- No intermediate feedback until the learner submits their full set of outputs (test + rule + tuning rationale)
- Log data includes realistic noise and ambiguous events
- The coach provides a comprehensive review at the end

**Goal:** Simulate real-world detection writing. The learner must make judgment calls about what to detect, handle ambiguity, and produce polished outputs.

### Level 4 — Adversarial

The coach actively challenges the learner:
- Scenarios include edge cases, evasion variants, and data source gaps
- The coach critiques outputs from an attacker's perspective ("how would you bypass this detection?")
- The learner must iterate through multiple rounds of hardening
- May include scenarios where the *right* answer is "this isn't worth detecting" or "we lack the telemetry for this"

**Goal:** Develop resilience and critical thinking. The learner should be comfortable defending their decisions and adapting when challenged.

## Using the AI coach

To run this exercise, start a chat session with an AI assistant (such as Claude) using the coaching prompt. The prompt is designed to:

1. Ask the learner for their current level (or determine it from a shared practice log)
2. Present an exercise scenario appropriate for that level
3. Walk through the phases, evaluating each submission
4. Provide specific, actionable feedback — not just "good job" or "try again," but exactly what's strong, what's weak, and what to change
5. Produce a practice log entry at the end of the session

A copy of the coaching prompt is available [[Deliberate practice - test and detection writing coach prompt|here]].

## Example scenario

> **Threat intel excerpt (Level 2):**
> A recent advisory describes an actor using `certutil.exe` to download a second-stage payload from a remote server, decode a Base64-encoded binary dropped to `%TEMP%`, and then execute it via `rundll32.exe`. The payload establishes persistence through a scheduled task that runs at user logon.
> 
> The advisory also lists 3 C2 IP addresses and 2 file hashes.

A strong learner at Level 2 would:
1. **Extract behaviors, not indicators** — identify the `certutil` download, the Base64 decode, the `rundll32` execution, and the scheduled task persistence as the detectable behaviors. Note that the IPs and hashes are low on the Pyramid of Pain and not worth building durable detections around.
2. **Write a test** for one behavior (e.g., the `certutil` download) in Atomic Red Team format, parameterizing the URL and output path.
3. **Write a Sigma rule** targeting `certutil.exe` with `-urlcache` or `-split` flags and a remote URL, referencing the correct Windows process creation log source.
4. **Tune the rule** after reviewing logs showing legitimate `certutil` usage (e.g., certificate enrollment, SCCM operations), adding filters for known legitimate paths or parent processes.
