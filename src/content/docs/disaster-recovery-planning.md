---
title: "Disaster recovery planning"
summary: What a disaster recovery plan is, how it relates to business continuity, the key metrics (RTO, RPO), the planning steps, backup and recovery-site strategies, testing, and maintenance.
section: database-web
order: 5
tags: [disaster-recovery, business-continuity, backup, rto, rpo]
updatedAt: "2026-10-07"
---

Every organisation that depends on IT will one day lose some of it — to a
failed disk, a ransomware attack, a fire, a flood or an earthquake. **Disaster
recovery planning** decides, **in advance**, how IT systems and data will be
restored, how quickly, and by whom, so that when disaster strikes the response
follows a tested plan instead of panic. For a bank, where customers expect
ATMs, cards and mobile banking to work around the clock, this is a regulatory
requirement as well as a business necessity.

> [!NOTE]
> Physical protection of the data centre — fire suppression, power, access
> control — is in
> [Physical security of IT infrastructure](/docs/physical-security-it-infrastructure).

## Key concepts

| Term | Meaning |
| --- | --- |
| **Disaster** | Any event that seriously disrupts critical business operations and cannot be handled by normal procedures |
| **Disaster Recovery (DR)** | Restoring IT systems, applications and data after a disaster |
| **Disaster Recovery Plan (DRP)** | A documented, structured set of procedures for recovering IT systems after a disaster |
| **Business Continuity Plan (BCP)** | A wider plan to keep the **entire business** — people, processes, premises, suppliers, communication — running during and after a disruption |
| **Business Impact Analysis (BIA)** | Identifies critical business functions and the impact (financial, legal, reputational) of losing them over time |
| **Risk assessment** | Identifies threats, their likelihood and their impact |
| Incident | A smaller disruption handled by normal operational procedures; it can escalate into a disaster |

### BCP vs DRP

| | Business Continuity Plan | Disaster Recovery Plan |
| --- | --- | --- |
| Scope | The whole organisation | IT systems and data |
| Focus | **Keeping the business operating** during a disruption | **Restoring technology** after a disruption |
| Timing | Before, during and after | Mainly after |
| Covers | Staff, premises, manual workarounds, communication, suppliers | Servers, networks, applications, databases, backups |
| Relationship | The umbrella | **A part of** the BCP |

```text diagram: DRP inside BCP
  ┌──────────────────────────────────────────────────────────────┐
  │ BUSINESS CONTINUITY MANAGEMENT                               │
  │  ┌────────────────────────────────────────────────────────┐  │
  │  │ BUSINESS CONTINUITY PLAN  people · premises · processes│  │
  │  │  ┌──────────────────────────┐  ┌────────────────────┐  │  │
  │  │  │ DISASTER RECOVERY PLAN   │  │ Crisis             │  │  │
  │  │  │ IT systems and data      │  │ communication plan │  │  │
  │  │  └──────────────────────────┘  └────────────────────┘  │  │
  │  └────────────────────────────────────────────────────────┘  │
  └──────────────────────────────────────────────────────────────┘
```

## Types of disasters

| Category | Examples |
| --- | --- |
| Natural | Earthquake, flood, landslide, storm, lightning, fire caused by nature |
| Technological | Hardware failure, disk crash, power outage, network failure, software bugs, data corruption |
| Human — accidental | Accidental deletion, wrong configuration, operator error |
| Human — deliberate | Cyber attack, **ransomware**, sabotage, theft, terrorism |
| External / infrastructure | Telecom or internet provider failure, supplier failure, pandemic, civil unrest |

## Objectives of a DRP

- **Minimise downtime** and keep interruption to critical services short.
- **Limit data loss**.
- **Protect** people first, then assets and reputation.
- Provide a **clear, pre-agreed procedure** and assign roles and
  responsibilities.
- **Restore normal operations** in an orderly way.
- **Meet legal and regulatory requirements** (central bank guidelines,
  contracts, data protection).
- Reduce the financial impact of the disaster.

## Recovery metrics

```text diagram: RPO and RTO on a timeline
         RPO (data loss)                         RTO (downtime)
   ◄─────────────────────────►          ◄────────────────────────────────►
   │                         │          │                                │
 ──●─────────────────────────●──────────●────────────────────────────────●────►
  last good                DISASTER                                  systems
  backup / replica          strikes                                  restored
                                     ◄──────────── MTD ──────────────────────►
                                     maximum the business can survive
```

| Metric | Meaning | Example |
| --- | --- | --- |
| **RPO — Recovery Point Objective** | The **maximum acceptable data loss**, measured in time back from the disaster. It decides **how often backups or replication** must happen | RPO of 15 minutes → data must be copied at least every 15 minutes |
| **RTO — Recovery Time Objective** | The **maximum acceptable downtime** — how quickly a system must be restored | RTO of 2 hours for core banking |
| **MTD / MTPD — Maximum Tolerable (Period of) Downtime** | The longest the business can survive without the function before irreversible damage. RTO must be less than MTD | 24 hours |
| **WRT — Work Recovery Time** | Time after systems are restored to verify data and resume normal work. RTO + WRT ≤ MTD | 1 hour |
| **MTBF — Mean Time Between Failures** | Average time a component runs before failing — a measure of reliability | 100 000 hours for a disk |
| **MTTR — Mean Time To Repair / Recover** | Average time to fix a failed component | 4 hours |

> [!TIP]
> **RPO is about data, RTO is about time.** A **lower** RPO or RTO means
> faster, more complete recovery — and a more **expensive** solution. Systems
> are given RPO and RTO targets according to how critical they are.

### Criticality tiers

| Tier | Example systems | Typical RTO | Typical RPO |
| --- | --- | --- | --- |
| Mission-critical | Core banking, card switch, ATM network, payment systems, internet and mobile banking | Minutes to a few hours | Near zero to minutes |
| Business-critical | Email, loan origination, treasury | Hours to a day | Hours |
| Non-critical | HR, intranet, training systems | Days | A day or more |

## The disaster recovery planning process

The widely used **NIST SP 800-34** contingency planning guide sets out seven
steps:

```text diagram: seven steps of contingency planning (NIST SP 800-34)
  1. Develop the contingency planning policy
            │
  2. Conduct the business impact analysis (BIA)
            │
  3. Identify preventive controls
            │
  4. Create recovery strategies
            │
  5. Develop the contingency (DR) plan
            │
  6. Test, train and exercise
            │
  7. Maintain the plan ──────────────► back to step 2 as the business changes
```

| Step | What happens |
| --- | --- |
| 1. Policy | Management approves a formal policy, defines scope, roles and authority, and commits resources. **Senior management support** is essential |
| 2. BIA | Identify critical business processes and the IT systems behind them; estimate the impact of outages over time; set **RTO, RPO and MTD**; prioritise recovery |
| 3. Preventive controls | Reduce the chance and impact of disruption — UPS and generators, fire suppression, RAID, redundant links, antivirus, physical security |
| 4. Recovery strategies | Choose backup methods, recovery sites, replication, alternative suppliers — matched to the RTO and RPO targets and the budget |
| 5. Develop the plan | Write the detailed procedures, contact lists, roles and steps |
| 6. Testing, training, exercises | Prove the plan works and make sure staff know their roles |
| 7. Maintenance | Review and update the plan regularly and after every significant change |

## Contents of a DRP document

| Section | Contents |
| --- | --- |
| Introduction and scope | Purpose, systems covered, assumptions |
| Roles and responsibilities | DR coordinator, recovery teams, their deputies |
| Contact information | Staff, management, vendors, ISPs, regulators, emergency services — kept up to date and available offline |
| Activation criteria | Who can declare a disaster and when |
| Notification and escalation | How and in what order people are informed |
| Recovery priorities | The order in which systems are restored, based on the BIA |
| Recovery procedures | Step-by-step technical instructions for each system |
| Inventory | Hardware, software, licences, network diagrams, configurations |
| Backup and data restoration | Where backups are, how to restore them |
| Alternate site details | Location, access, equipment |
| Communication plan | Messages to staff, customers, media and regulators |
| Return to normal (failback) | How to move operations back to the primary site |
| Testing and maintenance schedule | When and how the plan is tested and reviewed |

### Phases of executing the plan

1. **Notification and activation** — detect the event, assess the damage,
   declare a disaster, notify the team.
2. **Recovery** — move to the alternate site, restore systems and data in
   priority order, resume critical services.
3. **Reconstitution (return to normal)** — repair or rebuild the primary
   site, test it, **fail back**, and close the event with a lessons-learned
   review.

## Recovery strategies

### Backups

| Type | Copies | Backup speed | Restore needs | Storage |
| --- | --- | --- | --- | --- |
| **Full** | Everything | Slowest | Only the last full backup — **fastest restore** | Most |
| **Incremental** | Changes since the **last backup of any type** | **Fastest** | Last full + **every** incremental since — slowest restore | Least |
| **Differential** | Changes since the **last full** backup | Medium; grows each day | Last full + **the latest** differential only | Medium |
| Mirror | An exact live copy | Continuous | Immediate | Same as source; deletions copied too |
| Snapshot | Point-in-time image of a disk or virtual machine | Very fast | Quick roll-back | Small, at first |

```text diagram: what each strategy restores after a Friday failure
  Full backup on Sunday; daily backups Monday–Thursday.

  Incremental:   Sun(full) + Mon + Tue + Wed + Thu     → 5 sets to restore
  Differential:  Sun(full) + Thu (holds Mon–Thu)       → 2 sets to restore
```

**Good backup practice:**

- **3-2-1 rule** — **3** copies of the data, on **2** different types of
  media, with **1** copy **off-site**. Modern versions add **1 offline or
  immutable** copy and **0** errors after verification (3-2-1-1-0) — vital
  against ransomware.
- **Grandfather–father–son (GFS)** rotation — daily (son), weekly (father)
  and monthly (grandfather) backups kept for different periods.
- **Encrypt** backups and store them securely.
- **Test restores regularly** — an untested backup is not a backup.
- Keep backups **geographically separate** from the primary site.

### Recovery sites

| Site | Description | Recovery time | Cost |
| --- | --- | --- | --- |
| **Hot site** | A fully equipped duplicate data centre with up-to-date data (real-time or near-real-time replication); can take over almost immediately | Minutes to hours | **Highest** |
| **Warm site** | Hardware and network are in place, but data must be restored from backups and systems configured | Hours to days | Medium |
| **Cold site** | Only space, power, cooling and connectivity; equipment must be brought in and installed | Days to weeks | **Lowest** |
| Mirror site | Fully redundant, running **in parallel** with the primary at the same time (active–active) | Near zero | Very high |
| Mobile site | A data centre in a trailer or container that can be moved where needed | Days | Medium |
| Reciprocal agreement | Two organisations agree to host each other's systems in an emergency | Varies | Low, but unreliable |
| Cloud DR / **DRaaS** | Disaster Recovery as a Service — systems replicated to a cloud provider and started there on demand | Minutes to hours | Pay-as-you-go |

> [!WARNING]
> The DR site must be **far enough away** not to be hit by the same disaster.
> In Nepal, a DR site in the same seismic area or the same flood zone as the
> primary data centre gives little protection — a data centre in Kathmandu
> Valley is best paired with a DR site in a different region.

### Replication and high availability

| Technique | Description |
| --- | --- |
| **Synchronous replication** | Data is written to the primary and the replica **at the same time**; the write completes only when both confirm. **RPO ≈ 0**, but needs short distance and fast links |
| **Asynchronous replication** | Data is written to the primary first and copied to the replica shortly after. Works over long distances; a small amount of data may be lost |
| RAID | Protects against individual disk failure — **not a backup** (see [RAID](/docs/organization-of-hard-disk#raid)) |
| Clustering | Several servers work as one; if one fails, another takes over (**failover**) |
| Load balancing | Spreads traffic across servers, so losing one does not stop the service |
| Database log shipping, Oracle Data Guard, SQL Server Always On | Database-level replication to a standby |
| Virtualisation | Virtual machines can be restored or moved to other hardware quickly |

**Failover** — switching to a standby system when the primary fails.
**Failback** — returning to the primary once it is restored.

## Testing the plan

A plan that has never been tested will fail when it is needed. Tests range
from discussion to full shutdown, increasing in realism, cost and risk:

| Test | How it works | Disruption |
| --- | --- | --- |
| **Checklist (desk check)** | Team members review the plan to confirm it is complete and current | None |
| **Structured walkthrough / tabletop exercise** | The team meets and talks through a disaster scenario step by step | None |
| **Simulation** | A realistic scenario is acted out, using the recovery procedures, without affecting live systems | Minimal |
| **Parallel test** | Systems are brought up at the DR site and run **alongside** the primary, which keeps running | Low |
| **Full interruption (cut-over) test** | The primary site is **actually shut down** and operations move to the DR site | **Highest** — most realistic, most risky |

After each test, document the results, gaps and lessons, and update the
plan.

## DR team and roles

| Role | Responsibility |
| --- | --- |
| Senior management / steering committee | Approves the plan and budget; authorises disaster declaration |
| DR coordinator / manager | Leads planning, testing and the actual recovery |
| Damage assessment team | Assesses the extent of the damage and estimates recovery time |
| Technical recovery teams | Restore servers, network, databases and applications |
| Communication team | Informs staff, customers, media and regulators |
| Business unit representatives | Confirm that business functions are working after recovery |
| Vendors and service providers | Supply hardware, software and support under agreed SLAs |

## Plan maintenance

Review and update the plan:

- At least **annually**, and after each test.
- After **changes** — new systems, upgrades, staff changes, office moves, new
  suppliers.
- After any **real incident**.

Keep copies **off-site and offline** — a plan stored only on the server that
has failed cannot be read. Train staff regularly, and include new employees.

## DRP in banking

Regulators require banks to plan for continuity because a bank's failure to
operate affects the whole payment system. In Nepal, section 8 of **Nepal
Rastra Bank's Information Technology Guidelines (2012)** requires banks to:

- Have a **board-approved BCP policy**, and appoint a **senior officer as
  Head of BCP**.
- Form a **BCP team** of senior officers at **head office and branches**.
- **Test the BCP at least annually** — both **planned and unplanned** tests —
  with testing **audited by internal audit**.
- Specify **RPO and RTO** in the BCP, and choose a **hot, warm or cold** backup
  site (their own or outsourced) that meets them.
- Design the data centre, DR, network and delivery channels for **high
  availability with no single point of failure**.
- **Check data and transaction integrity between the DC and DR site**
  periodically, preferably at **End of Day / Beginning of Day**.
- Maintain an **incident response plan**, including communication and alerting
  regulators.

NRB's **Cyber Resilience Guidelines (2023)** add, for payment-related
institutions, the expectation to **resume critical operations within two
hours** of a disruption and complete settlement by the end of the day.

See [NRB IT Guidelines](/docs/nrb-it-guidelines#8-business-continuity-and-disaster-recovery-planning)
and [Cyber Resilience Guidelines](/docs/nrb-cyber-resilience-guidelines#f-response-and-recovery)
for the full requirements.

## Quick revision

> [!TIP]
> **One-line answers.** DRP = restoring IT after a disaster; BCP = keeping the
> whole business running (DRP is part of BCP). BIA identifies critical
> functions and sets RTO and RPO. RPO = maximum data loss (how often to back
> up); RTO = maximum downtime (how fast to recover). Hot site = fastest and
> most expensive; cold site = slowest and cheapest. 3-2-1 = 3 copies, 2 media,
> 1 off-site. Full interruption is the most realistic and riskiest test.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: the DRP is a **subset** of
> the BCP; **RPO** concerns **data**, **RTO** concerns **time**; RTO must be
> **less than** MTD; **incremental** backup is fastest to take but slowest to
> restore; **differential** needs only the last full + latest differential;
> **RAID is not a backup**; **synchronous** replication gives RPO ≈ 0;
> a **warm** site has hardware but needs data restored; the **checklist**
> test is the least disruptive; the first priority in any disaster is
> **human safety**; a DRP must be **tested and updated** regularly.
