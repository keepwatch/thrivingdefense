# ACRE Score Report — 2026-04-13

## Scores

| Platform | ACRE Score | Covered Techniques | Weighted Score |
|----------|------------|--------------------|----------------|
| Windows  | 0.1115 (11.2%) | 25 / 226 detectable | 35.0 / 314.0 |
| Linux    | 0.1561 (15.6%) | 15 / 98 detectable  | 21.0 / 134.5 |
| macOS    | 0.1038 (10.4%) | 4 / 39 detectable   | 5.5 / 53.0   |

**Detectable threshold:** ≥5 open-source rules (Sigma + Splunk + Elastic combined)

**Tactic weight (1.5×):** persistence, privilege-escalation, defense-evasion, credential-access, discovery, lateral-movement, collection

---

*This is the first run — trend history will appear on the next run after you add detections.*

---

## Top Coverage Gaps — Windows

320 total gaps across all platforms.

| Technique | Name | Weight | Sigma | Splunk | Elastic |
|-----------|------|--------|-------|--------|---------|
| T1218 | System Binary Proxy Execution | 1.5× | 140 | 14 | 18 |
| T1027 | Obfuscated Files or Information | 1.5× | 85 | 6 | 3 |
| T1055 | Process Injection | 1.5× | 26 | 26 | 11 |
| T1087.002 | Domain Account | 1.5× | 21 | 27 | 7 |
| T1036 | Masquerading | 1.5× | 34 | 9 | 11 |
| T1218.005 | Mshta | 1.5× | 7 | 12 | 26 |
| T1098 | Account Manipulation | 1.5× | 16 | 13 | 18 |
| T1003 | OS Credential Dumping | 1.5× | 23 | 7 | 15 |
| T1068 | Exploitation for Privilege Escalation | 1.5× | 10 | 17 | 16 |
| T1133 | External Remote Services | 1.5× | 11 | 31 | 1 |

## Top Coverage Gaps — Linux

| Technique | Name | Weight | Sigma | Splunk | Elastic |
|-----------|------|--------|-------|--------|---------|
| T1068 | Exploitation for Privilege Escalation | 1.5× | 5 | 8 | 37 |
| T1548.003 | Sudo and Sudo Caching | 1.5× | 0 | 35 | 19 |
| T1543 | Create or Modify System Process | 1.5× | 0 | 3 | 36 |
| T1574 | Hijack Execution Flow | 1.5× | 0 | 0 | 33 |
| T1078 | Valid Accounts | 1.5× | 0 | 2 | 32 |
| T1574.006 | Dynamic Linker Hijacking | 1.5× | 2 | 5 | 32 |
| T1082 | System Information Discovery | 1.5× | 9 | 5 | 23 |
| T1014 | Rootkit | 1.5× | 1 | 3 | 22 |
| T1547.006 | Kernel Modules and Extensions | 1.5× | 1 | 7 | 20 |
| T1562.001 | Disable or Modify Tools | 1.5× | 3 | 5 | 20 |

## Top Coverage Gaps — macOS

| Technique | Name | Weight | Sigma | Splunk | Elastic |
|-----------|------|--------|-------|--------|---------|
| T1087.002 | Domain Account | 1.5× | 0 | 11 | 1 |
| T1562.001 | Disable or Modify Tools | 1.5× | 1 | 3 | 8 |
| T1082 | System Information Discovery | 1.5× | 4 | 2 | 5 |
| T1133 | External Remote Services | 1.5× | 1 | 5 | 4 |
| T1110 | Brute Force | 1.5× | 0 | 9 | 1 |
| T1005 | Data from Local System | 1.5× | 0 | 0 | 8 |
| T1543.004 | Launch Daemon | 1.5× | 2 | 0 | 5 |
| T1555.001 | Keychain | 1.5× | 1 | 0 | 5 |
| T1078.003 | Local Accounts | 1.5× | 4 | 0 | 5 |
| T1647 | Plist File Modification | 1.5× | 0 | 1 | 5 |

---

## Output Files

| File | Contents |
|------|----------|
| `acre_current.json` | Today's scores |
| `acre_history.json` | History (1 entry — baseline established) |
| `acre_gaps.json` | 319 prioritized gaps with rule file paths |
| `parsed_detections.json` | 50 normalized detection records |
