# Platform Coverage Analysis

Produce a technique × platform coverage matrix across Sigma, Splunk Security Content, and Elastic detection rule repos. Output a human-readable summary per platform (Windows, Linux, macOS) showing which ATT&CK techniques have detection rules and which have gaps, plus raw JSON for further analysis.

## Overview

Coverage is: for each MITRE ATT&CK technique × platform pair, how many detection rules exist across each source. Techniques with zero rules across all sources represent gaps.

The three MITRE canonical platform names used throughout are: **Windows**, **Linux**, **macOS**.

The output of this skill — `platform_coverage.json` — is the required input for the ACRE Coverage Calculator skill, which scores your organization's detection coverage against this baseline.

---

## Setup: Detection Repos

All three detection libraries (Sigma, Splunk Security Content, Elastic) are bundled in the [Security-Detections-MCP](https://github.com/MHaggis/Security-Detections-MCP) repo. Before parsing rules, ensure it is present:

```bash
if [ ! -d ~/Security-Detections-MCP ]; then
  git clone --recurse-submodules https://github.com/MHaggis/Security-Detections-MCP ~/Security-Detections-MCP
fi
```

Expected paths after cloning:

| Library | Path |
|---|---|
| Sigma | `~/Security-Detections-MCP/detections/sigma/` |
| Splunk Security Content | `~/Security-Detections-MCP/detections/security_content/` |
| Elastic Detection Rules | `~/Security-Detections-MCP/detections/detection-rules/` |

If any individual library directory is missing after the clone (e.g., a submodule was not initialized), initialize it with `git submodule update --init --recursive` inside `~/Security-Detections-MCP`.

---

## Step 1: Establish the MITRE ATT&CK Baseline

Download the ATT&CK STIX bundle to get the authoritative list of technique × platform pairs. This is the denominator for gap analysis.

```
URL: https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json
```

From the bundle (a JSON object with an `objects` array), extract each object where:
- `type == "attack-pattern"`
- `revoked` is not `true`
- `x_mitre_deprecated` is not `true`

For each, collect:
- **Technique ID**: from `external_references[].external_id` where `source_name == "mitre-attack"` (e.g., `T1059.001`)
- **Technique name**: `name` field
- **Tactics**: `kill_chain_phases[].phase_name` where `kill_chain_name == "mitre-attack"`
- **Platforms**: `x_mitre_platforms` list (e.g., `["Windows", "Linux", "macOS"]`)

Filter the platform list to only `Windows`, `Linux`, and `macOS` when building the endpoint coverage matrix.

---

## Step 2: Parse Sigma Rules

**Local path**: `~/Security-Detections-MCP/detections/sigma/` (present after the Setup step above)  
**Fallback clone**: `git clone --depth=1 https://github.com/SigmaHQ/sigma ~/Security-Detections-MCP/detections/sigma`

**Scan**: all `.yml` files under:
- `rules/` (recursively)
- `rules-threat-hunting/` (recursively)

**Rule format** (YAML):
```yaml
title: Some Rule Name
status: stable
logsource:
    product: windows        # ← platform signal
    category: process_creation
tags:
    - attack.execution
    - attack.t1059.001      # ← technique ID
    - attack.t1059          # ← parent (use sub if present)
```

**Extract technique IDs**: scan `tags[]` for entries matching `attack.tNNNN` or `attack.tNNNN.NNN` (case-insensitive). Use the most-specific ID (subtechnique preferred). Strip the `attack.` prefix and uppercase: `attack.t1059.001` → `T1059.001`.

**Extract platform**: read `logsource.product`. If absent, try `logsource.service`, then `logsource.category`. Lowercase the result.

**Platform mapping — Sigma `logsource.product` → MITRE platform**:

| Sigma value | MITRE platform(s) |
|---|---|
| `windows` | Windows |
| `linux` | Linux |
| `macos` | macOS |
| `antivirus` | Windows, Linux, macOS |
| `webserver`, `apache`, `nginx`, `django`, `ruby_on_rails`, `spring`, `velocity` | Linux (and Windows if rule also targets IIS/Windows deployments) |
| `jvm`, `nodejs`, `python`, `sql` | Linux, Windows |
| `rpc_firewall` | Windows |
| `dns`, `fortigate` | (Network — skip for endpoint analysis) |
| `opencanary` | (Honeypot — skip entirely) |
| `aws`, `azure`, `gcp`, `okta`, `github` | (Cloud/SaaS — skip for endpoint analysis) |
| `unknown` / absent | Skip rule |

For endpoint platform analysis (Windows/Linux/macOS only), skip rules whose logsource maps to Network, Cloud, or SaaS categories.

**Output per rule**: record `{ technique_id, platform, file_path }`. Deduplicate by file path per technique × platform pair. Count unique files, not occurrences.

---

## Step 3: Parse Splunk Security Content

**Local path**: `~/Security-Detections-MCP/detections/security_content/` (present after the Setup step above)  
**Fallback clone**: `git clone --depth=1 https://github.com/splunk/security_content ~/Security-Detections-MCP/detections/security_content`

**Scan**: all `.yml` files under `detections/` (recursively). Skip the `deprecated/` subdirectory.

**Rule format** (YAML):
```yaml
name: Linux GNU Awk Privilege Escalation
id: 0dcf43b9-50d8-42a6-acd9-d1c9201fe6ae
data_source:
    - Sysmon for Linux EventID 1    # ← OS signal (best)
tags:
    asset_type: Endpoint            # ← OS signal (fallback)
    mitre_attack_id:
        - T1548.003                 # ← technique ID (already uppercase)
```

**Extract technique IDs**: read `tags.mitre_attack_id` as a list. Values are already in `TNNNN` or `TNNNN.NNN` format.

**Extract platform** — use this priority order:

1. **`data_source` field** (list of strings): scan each entry for OS keywords:
   - Contains `"Linux"` or `"linux"` → Linux
   - Contains `"macOS"` or `"Mac"` → macOS
   - Contains `"Windows Event Log"`, `"Sysmon EventID"` (without "Linux"), `"CrowdStrike ProcessRollup2"`, `"WinEventLog"` → Windows
   - Multiple OS types present → assign all that match

2. **`tags.asset_type`** (string, fallback when data_source gives no OS signal):
   - `Endpoint` → Windows, Linux, macOS (cross-platform EDR; count toward all three)
   - `Windows` → Windows
   - `Linux` → Linux
   - `macOS` → macOS
   - `Web Server`, `Web Application` → Linux, Windows
   - `Network`, `DNS Servers`, `VPN Appliance`, `Web Proxy`, `Infrastructure` → skip for endpoint analysis
   - `O365 Tenant`, `Azure Active Directory`, `Azure Tenant` → skip
   - `AWS Account`, `AWS Instance`, `S3 Bucket`, `EC2 Snapshot`, `Cloud Compute Instance` → skip
   - `Kubernetes`, `GCP Kubernetes cluster` → skip
   - `GitHub`, `Okta Tenant`, `GSuite`, `CircleCI` → skip

3. If neither field resolves to an endpoint platform, **skip the rule**.

**Note on `Endpoint` asset_type**: The vast majority (~1,415) of endpoint rules use `asset_type: Endpoint` rather than a specific OS. When `data_source` entries are Windows-specific (e.g., `"Sysmon EventID 1"`) the rule targets Windows despite `asset_type: Endpoint`. Use `data_source` to refine when possible; fall back to counting `Endpoint` rules against all three platforms.

**Output per rule**: record `{ technique_id, platform, rule_id }`. Count unique rule IDs per technique × platform.

---

## Step 4: Parse Elastic Detection Rules

**Local path**: `~/Security-Detections-MCP/detections/detection-rules/` (present after the Setup step above)  
**Fallback clone**: `git clone --depth=1 https://github.com/elastic/detection-rules ~/Security-Detections-MCP/detections/detection-rules`

**Scan**: all `.toml` files under `rules/` (recursively). Skip `rules/_deprecated/`.

**Rule format** (TOML):
```toml
[rule]
name = "Linux Clipboard Activity Detected"
tags = ["Domain: Endpoint", "OS: Linux", "Tactic: Collection"]

[[rule.threat]]
framework = "MITRE ATT&CK"
[[rule.threat.technique]]
id = "T1115"
name = "Clipboard Data"
reference = "..."
# subtechnique block (if present — prefer over parent):
# [[rule.threat.technique.subtechnique]]
# id = "T1059.001"

[rule.threat.tactic]
id = "TA0009"
name = "Collection"
```

**Extract technique IDs**: for each `[[rule.threat]]` block, collect all `rule.threat.technique[].id` values. If a technique has `subtechnique` entries, use the subtechnique IDs instead of the parent. Result is a list of technique IDs per rule.

**Extract platform** — use this priority order:

1. **Directory path** (most reliable):
   - `rules/windows/` → Windows
   - `rules/linux/` → Linux
   - `rules/macos/` → macOS
   - `rules/network/` → skip for endpoint analysis
   - `rules/cross-platform/` → derive from tags (step 2)
   - `rules/integrations/<subdir>/` → derive from tags or integration map (step 3)
   - `rules/apm/`, `rules/ml/`, `rules/threat_intel/`, `rules/promotions/` → derive from tags

2. **`tags` field** (for cross-platform, apm, ml, and integrations without a fixed OS):  
   Scan `tags[]` for `"OS: Windows"`, `"OS: Linux"`, `"OS: macOS"`. Assign all that match.

3. **Integration directory map** (for `rules/integrations/<subdir>/` when tags give no OS):

   | Integration subdir | Platform(s) |
   |---|---|
   | `aws`, `aws_bedrock`, `gcp`, `azure`, `azure_openai` | skip |
   | `cloud_defend` | Containers (skip for endpoint) |
   | `kubernetes` | skip |
   | `o365`, `google_workspace`, `okta`, `github` | skip |
   | `lmd` | Windows (Lateral Movement Detection, RDP-focused) |
   | `pad` | Linux (Privileged Access Detection) |
   | `problemchild` | Windows |
   | `fim` | Linux |
   | `cyberarkpas` | Windows |
   | `endpoint` | derive from tags; if no OS tags → Windows, Linux, macOS |
   | `ded` | Windows, Linux |
   | `beaconing`, `dga` | skip (network-layer ML) |

4. If no platform can be determined → skip the rule.

**Output per rule**: record `{ technique_id, platform, file_path }`. Deduplicate by file path per technique × platform pair. Count unique files.

---

## Step 5: Build the Coverage Matrix

For each technique in the ATT&CK baseline (Step 1), for each of its platforms in `{Windows, Linux, macOS}`:

1. Count rules from each source:
   - `sigma_count`: unique Sigma file paths tagged to this technique × platform
   - `splunk_count`: unique Splunk rule IDs for this technique × platform
   - `elastic_count`: unique Elastic file paths for this technique × platform

2. Mark `covered = true` if any count > 0.

3. Record the result as:
   ```json
   {
     "technique_id": "T1059.004",
     "technique_name": "Unix Shell",
     "tactics": ["execution"],
     "platform": "Linux",
     "covered": true,
     "coverage": {
       "Sigma": 12,
       "Splunk": 8,
       "Elasticsearch": 6
     }
   }
   ```

Store results in `platform_coverage.json` with a `metadata` block (total combinations, covered count, uncovered count, generated timestamp).

---

## Step 6: Produce Output

### Human-readable summary (print to terminal)

For each platform (Windows, Linux, macOS), print:

```
## Linux — 247 techniques in ATT&CK baseline

Covered (≥1 rule in any source): 142 / 247  (57%)
Uncovered (zero rules everywhere): 105 / 247  (43%)

By source:
  Sigma:         118 techniques covered
  Splunk:         97 techniques covered
  Elasticsearch:  89 techniques covered

Top 10 most-detected Linux techniques (by open-source rule count):
  T1059.004  Unix Shell                     Sigma:45  Splunk:12  Elastic:8
  T1055      Process Injection              Sigma:23  Splunk:18  Elastic:11
  ...

Linux techniques with ZERO coverage (gaps):
  T1003.008  /etc/passwd and /etc/shadow
  T1068      Exploitation for Privilege Escalation
  ...
  (full list in platform_coverage.json)
```

Repeat this block for Windows and macOS.

### Interpretation notes to include in output

- **Threshold for ACRE**: The ACRE skill counts a technique × platform pair in the detectable baseline only if it has ≥5 combined rules across Sigma + Splunk + Elastic. Pairs below that threshold are excluded from both numerator and denominator when scoring.
- **Zero coverage**: may be genuinely hard to detect, have limited public tooling, or simply lack community attention. These pairs fall outside the ACRE denominator entirely.
- **Covered by only one source**: worth noting — single-source coverage is more fragile than multi-source, and the combined count may not clear the ≥5 threshold.

---

## Notes and Caveats

**Sigma logsource is not always an OS**: Some rules use `service` or `category` instead of `product` (e.g., `category: process_creation` without a product field). These are effectively platform-agnostic Sigma rules; skip them unless a product can be inferred from context.

**Splunk `Endpoint` is over-inclusive**: A rule with `asset_type: Endpoint` will be counted toward Windows, Linux, and macOS unless `data_source` narrows it. This over-estimates cross-platform coverage but matches the conservative assumption in existing analysis.

**Elastic subtechniques vs. parents**: When a rule maps only to a parent technique (e.g., `T1059`) and not a subtechnique, count it toward the parent only. Do not expand it to all subtechniques.

**Revoked and deprecated techniques**: Always exclude techniques where the STIX object has `revoked: true` or `x_mitre_deprecated: true`. Detection rules may reference technique IDs that have since been revoked; skip those counts silently.

**Existing generated files**: If `sigma_technique_platform_counts.json`, `splunk_technique_platform_counts.json`, and `technique_platform_coverage.json` are already present in the working directory, they can be used directly as inputs to Step 5 rather than re-parsing the repos. These files use the same technique × platform structure described above. The existing `find_uncovered_techniques.py` script performs Step 5 and 6 and can be run directly if present.

**Next step**: Once `platform_coverage.json` is written, run the ACRE Coverage Calculator skill to score your organization's detections against this baseline and identify prioritized coverage gaps.
