---
tags:
  - author/Jordan_Anderson
  - type/article
title: Agentic IR - go fast or slow down
aliases:
created: 2026-08-21,
draft: true
promoted: false
---
With the launch of models that offer impressive cybersecurity capabilities, many defenders have realized that the old human-driven response processes will not be able to keep up. My coworker [[Gary Portnoy|Gary]] shared [this article](https://www.sygnia.co/blog/inside-an-ai-assisted-cloud-attack/) from Sygnia that nicely sums up the problem (emphasis mine):

>Traditional incident response often relies on the assumption that attacker progression will generate enough observable signals for defenders to investigate and contain activity **before** access materially expands across the environment. The observed attack pattern challenged this assumption.

This means there are two options available for defenders: move faster or slow the attacker down. I'm going to be posting about this over the next few weeks with some thoughts on what levers we can actually pull to achieve this in the world of detection and response.
## Respond faster

"Attackers are using AI, so defenders must as well to keep up" - this is the intuitive platitude, but attackers and defenders are playing different games. Attackers can be single-minded on their mission. They don't have to worry about operational uptime, or increasing CPU load from deploying agents, or getting approval from the right business owner before they use a network link. They can do anything they want as long as they achieve their objective before they are evicted (permanently?), and when the attacker can move MUCH faster than the defender, it's possible to be noisy and still win.

Defenders on the other hand do NOT win only if they defeat the attacker. They must permit the business to continue to operate in a profitable/functional way. Imagine if the defender of a medieval castle burned all the surrounding crops the first time they saw a plume of dust on the horizon. This is a great strategy to deny the attacker forage opportunities during a siege, but it also makes next winter much harder to survive. The same principle occurs when network isolating a service, or disabling a service account. Defenders have blunt tools to contain attacker activity, and those tools inflict a lot of "collateral damage". As a result:

> defenders must have a high & defensible degree of certainty that they face an imminent threat before containing a **production**[^1] host or account

### Can we accelerate the acquisition of certainty?

The answer to this question is "yes", but I don't think we can accelerate it fast enough to solve the problem alone. There's low hanging fruit that looks very similar to what was promised during the SOAR boom:

- Automated enrichment, correlation, and risk scoring
- Executing predefined playbooks
- Targeted, easily reversable containment integrations (this host, this user, this IP)

It is important to consider what the essential difference is of this AI-enabled SOC vs the SOAR promise, because the promise of "automated IR" never materialized for many companies. AI's non-deterministic analysis could provide more certainty, perhaps even enough to execute containment without a human being involved. But I'm skeptical the models (and more importantly, the harness around those models) is ready for that yet - see [[Outsource cognition wisely]].
## Slow attacker down

### Deception and tarpits

Anecdotally, today, it seems AI attackers don't care much about stealth. If they can move faster than the defender can respond even to canary hits, then they have obviated the benefit of the deception technology! 

[Scott Ponte](https://lnkd.in/p/gsBtevBM) has suggested adding tarpits to deception, so that agents interact with deceptive interfaces that harm them in various ways - as the comments to that post suggest, that could include filling their context window (degrading performance), burning compute on useless tasks, etc. Tarpits are not a new principle, but applying to agentic attackers could slow them and give attackers time to catch up!

The big challenges here include the time spent deploying, maintaining, and configuring the deception and tarpit system, and if it's successful, agentic attackers will start looking for deception/tarpit artifacts in an attempt to avoid them. But any case where we can force the attacker to change their behavior is a good sign!

### Deprovisioning

The original Sygnia [article](https://www.sygnia.co/blog/inside-an-ai-assisted-cloud-attack/) I shared suggested taking action "to reduce the attacker’s ability to continue converting access into impact" and to limit the blast radius. The article's authors suggest effectively installing blast doors or drawbridges through the key chokepoints and building a procedural system (including clear decision points) that would permit defenders to quickly close down those paths. 

Interestingly, they include chokepoints that we often fail to consider in incident response:
- Identity
- Cloud control planes
- Source control
- CI/CD

As SpecterOps's Bloodhound team [expands their OpenGraph extensions](https://specterops.io/bloodhound-integrations/),  they continue to identify attack paths very similar to the ones above. In general, the Bloodhound/OpenGraph data is still hard for defenders to use, short of closing high-risk paths one-by-one. However, if there are attack paths that the business needs to remain open for now / will take a long time to remediate, can we build a "drawbridge" over those paths to rapidly raise when there's a threat?

Because these drawbridges might not close down the entire business operation, some of them could be closed during suspected attacks and not just confirmed ones. Perhaps there is an integration that is only required to publish data weekly (but the connection also permits bridging two environments and introduces significant lateral movement risk) - shutting that down during an attack targeting the origin environment would only cause a problem once a week. This approach would still require careful pre-approval and notification if activated, because something will always go wrong, but it could offer significant risk reductions alongside reduced business impact. There's potential for AI-driven or preemptive containment in these areas as well.

Sygnia has some other really good suggestions in the report that should be part of the containment playbook (which requires building these drawbridges and gates in advance so we can activate them when necessary):

- "Restrict outbound internet connectivity for workloads, servers, and cloud resources to approved destinations only"
- "Restrict cloud management/[source code repo/dev platform access] through IP allowlisting and permit access only from trusted corporate locations."
- "Suspend production deployments during active containment" (a great idea with relatively low risk to the company ... though it could be hard to keep a breach a secret!)
- "Restrict repository access to essential personnel only" - perhaps instead of a default-allow access model, the default access level could be upgraded temporarily

### Rate limiting

Agentic AI-empowered attacks can go much faster than the pace we expected from human attackers. Remember, in the old world, after malware was running on our systems, we expected humans to put their "hands on [the] keyboard" and take over control - that was the scary part of the attack. The Sygnia article shows us what AI can do instead:

- "the actor executed several hundred unique SQL queries across dozens of databases, rapidly enumerating schemas and identifying relevant data"
- "In a single observed second, four access keys from four different accounts were used from the same source"
- "What stood out was not that each technique was novel, but that so many were attempted quickly and repeatedly across newly discovered surfaces"

In many cases, we've build systems with the expectations that humans will use them at human speed. Can we build rate limits (by default or that are automatically triggered) into certain key systems to slow down attackers?

Identity systems come to mind as a key target - why should we let attackers quickly acquire large amounts of data (repeatedly, even) from LDAP or AD? Sure, some applications and accounts legitimately need this, but we could baseline those requests. On a related note, I have investigated "high-volume recon attacks" on domain controllers that turned out to be a legitimate but buggy application blasting the DC with LDAP queries - rate-limiting 

LDAP/AD 


Heck, with AD accounts, we could even temporarily lock out the account[^2]






[^1]: Some organizations take a "contain-first" approach for end-user devices, containing while they investigate. The risk of doing that for end-user compute is much much lower than doing it for production workflows

[^2]: Why restrict lockouts to password failure attempts alone? It's low impact, temporary, and reversible. It is hacky though, and runs the risk posed by any automated lockout solution (attackers using this as a DoS). I tend to think that risk is more theoretical than the real benefits.
