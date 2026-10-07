---
title: "Cyber Resilience Guidelines, 2023 (Nepal Rastra Bank)"
summary: NRB's Cyber Resilience Guidelines — their basis in the CPMI-IOSCO guidance, who they apply to, and the expectations under governance, identification, protection, detection, response and recovery, testing, situational awareness, and learning and evolving.
section: cybersecurity
order: 5
tags: [policy, nepal, nrb, cyber-resilience, banking, payment-systems]
updatedAt: "2026-10-07"
---

**Cyber resilience** is an organisation's ability to **anticipate, withstand,
contain and rapidly recover** from a cyber attack — not just to prevent one.
Nepal Rastra Bank's **Cyber Resilience Guidelines (CRG)**, issued in **August
2023** by the **Payment Systems Department**, set out what NRB expects from the
institutions that run Nepal's payment systems. They complement NRB's older
[IT Guidelines (2012)](/docs/nrb-it-guidelines), which focus on IT governance
and information security in banks.

## Background and basis

| Item | Detail |
| --- | --- |
| Issued by | **Nepal Rastra Bank, Payment Systems Department** |
| Date | **August 2023** |
| Policy basis | **Monetary Policy for FY 2022/23, policy number 128**: "Cyber and Information Security Guideline will be issued for the institutions licensed to carry out payment-related transactions" |
| International basis | **CPMI–IOSCO Guidance on Cyber Resilience for Financial Market Infrastructures (GCR), June 2016**, which supplements the **Principles for Financial Market Infrastructures (PFMI), April 2012** |
| Standards reviewed | **ISO/IEC 27001/27002**, **COBIT 2019**, the **ECB** Cyber Resilience Oversight Expectations (2018), the **FIGI** (World Bank, ITU, CPMI) cyber resilience report (2019), and the **Bank of Canada** expectations (2021) |
| Consultation | Nepal Bankers' Association, PSOs and PSPs |
| Review | May be reviewed or amended at regular intervals or as needed |

> [!NOTE]
> **CPMI** = Committee on Payments and Market Infrastructures (of the **Bank for
> International Settlements, BIS**). **IOSCO** = International Organization of
> Securities Commissions. **FMI** = Financial Market Infrastructure — payment,
> clearing and settlement systems.

### PFMI principles behind the guidance

| Principle | Subject |
| --- | --- |
| 2 | Governance |
| 3 | Framework for the comprehensive management of risks |
| 8 | **Settlement finality** — final settlement at least by the end of the value date |
| 17 | **Operational risk** — including business continuity |
| 20 | FMI links |

Two PFMI elements shape the whole guidance: assuring **settlement finality**,
and the ability to **resume operations within two hours** following a
disruption (**Principle 17, key consideration 6**).

## Applicability

The CRG applies to **licensed institutions (LIs)** — institutions licensed by
NRB's Payment Systems Department:

- **"A", "B", "C" and "D" class banks and financial institutions (BFIs)** —
  commercial banks, development banks, finance companies and microfinance
  institutions;
- **Payment System Operators (PSOs)** — e.g. card switches, clearing houses;
- **Payment Service Providers (PSPs)** — e.g. digital wallets;
- any other **FMI** that NRB designates.

LIs must also make sure that **associated entities** they rely on — service
providers, vendors, participants — meet the same requirements, through
contracts or other means.

### How NRB applies it

- **Risk-based and principle-based** — LIs choose controls in proportion to
  their own cyber risk and their criticality in the financial system.
- The CRG is **not a checklist** of technical controls; NRB allows flexibility
  in how expectations are met.
- LIs should **continuously raise their cyber maturity**, in dialogue with NRB
  over time.
- Each section lists **numbered expectations** — about 190 in total.

## Structure: five categories and three components

```text diagram: the CRG framework
         RISK MANAGEMENT CATEGORIES (applied in order)
  ┌────────────┬────────────────┬────────────┬───────────┬──────────────────────┐
  │ GOVERNANCE │ IDENTIFICATION │ PROTECTION │ DETECTION │ RESPONSE AND RECOVERY│
  └────────────┴────────────────┴────────────┴───────────┴──────────────────────┘
  ┌────────────────────────────────────────────────────────────────────────────┐
  │ OVERARCHING COMPONENTS (apply across all five)                              │
  │   TESTING  ·  SITUATIONAL AWARENESS  ·  LEARNING AND EVOLVING                │
  └────────────────────────────────────────────────────────────────────────────┘
          + Managing cyber risks from INTERCONNECTIONS in every section
```

| Section | Title |
| --- | --- |
| A | Introduction — purpose, approach, design, applicability, interconnections |
| B | **Governance** |
| C | **Identification** |
| D | **Protection** |
| E | **Detection** |
| F | **Response and Recovery** |
| G | **Testing** |
| H | **Situational Awareness** |
| I | **Learning and Evolving** |
| J | Glossary |
| K | References |

> [!TIP]
> **5 + 3.** Five risk management categories — **Governance, Identification,
> Protection, Detection, Response and Recovery** — and three overarching
> components — **Testing, Situational Awareness, Learning and Evolving**.

## Managing risks from interconnections

LIs are linked to participants, other FMIs, settlement banks, service
providers, fintech vendors and critical infrastructure such as power and
telecoms. These links bring benefits but also **cyber risk that can spread
across the ecosystem**. Every section of the CRG explains how to manage it,
using a risk-based approach.

## B. Governance

**Cyber governance** is the arrangement an LI puts in place to establish,
implement and review its approach to managing cyber risk.

### Cyber resilience strategy

- Form an internal, cross-disciplinary **steering committee** of senior
  management and staff from business, finance, risk, internal audit,
  operations, cyber security, IT, communications, legal and HR to develop the
  strategy and framework.
- The strategy covers: **vision and mission**; goals and outcomes; importance
  to stakeholders; **cyber risk tolerance**; risks borne from and posed to
  others; **cyber maturity targets**; governance; funding and budgeting; and
  integration into people, processes, technology and new business.
- **Board approves** the strategy and has it updated regularly.

### Cyber resilience framework

- The policies, standards, procedures and controls to **identify, protect,
  detect, respond and recover**.
- **Board-approved**, regularly reviewed — especially when strategy, threats,
  critical functions or lessons from incidents and audits change.
- Aligned with the **enterprise operational risk management** framework and
  enterprise architecture.
- Covers the LI's whole **ecosystem**.
- Uses leading standards such as the **ISO/IEC 27000 series** as benchmarks.
- Defines **roles, responsibilities and accountability**.
- Evaluated through **independent compliance programmes and audits**; the LI
  should **routinely commission an external audit**.
- A **roadmap** from the current to the **target maturity** level.

### Role of the board and senior management

| Area | Expectation |
| --- | --- |
| Ultimate responsibility | **The board** — sets cyber risk tolerance and strategy, defines roles, endorses the framework |
| Board meetings | Cyber risks **regularly evaluated** at board meetings |
| Metrics | Risk metrics, KPIs and KRIs to support decisions |
| Senior management oversight | Allocates resources, conducts **self-assessments** of cyber maturity, acts on test results, ensures skilled staff |
| Succession | **Succession plans** for high-risk roles — senior management, system administrators, developers, critical operators |
| Industry drills | Senior management helps plan and **participates in industry-wide exercises** |
| Culture | A strong culture of cyber awareness at all levels; training updated to the threat landscape; **consequences for staff who break security rules** |
| **Board skills** | **At least one board member with cyber security expertise**; board and senior management trained in their responsibilities |
| **Accountability — CISO** | Board and senior management appoint a senior executive such as a **Chief Information Security Officer (CISO)** to implement the cyber resilience framework |

The CISO (or equivalent) must have:

1. sufficient **authority and resources** (people and technology);
2. **direct access to report to the board**;
3. **operational independence from IT operations**; and
4. the necessary skills and knowledge.

## C. Identification

An LI must know **what it needs to protect**: its critical functions, the
information assets that support them, and its external dependencies.

- Identify and document **critical functions, key roles and processes**, and
  processes that depend on **third parties**; keep the lists current.
- Perform a **business impact analysis (BIA)** to quantify the impact of
  disruptions.
- Maintain an **enterprise risk management** framework with regular risk
  assessments.
- **Classify** functions and processes by criticality to prioritise protection,
  detection, response and recovery.
- Maintain a **network map / diagram** — IP addresses, subnets, connected
  components, internal and external links, cloud and third-party connections.
- **Mandatory risk assessment before deploying new technologies**, products,
  services and connections.
- Keep a centrally managed, up-to-date **inventory of information assets** and
  system configurations, categorised by CIA requirements.
- Maintain a **risk register** with risks categorised by criticality; use
  assessment results to choose controls.
- Keep a **central repository of user and system accounts and permissions**,
  protected from unauthorised change.
- Extend identification to the **ecosystem** — participants, linked FMIs,
  service providers, vendors.

## D. Protection

### Controls and resilience by design

- Protective controls in line with **ISO standards**, proportionate to risk and
  systemic role; **multiple independent controls** (**defence in depth**).
- **Resilience by design** — build security into systems from design through
  their whole life cycle; get assurance from vendors.
- **Separate development, test and production** environments; keep test close
  to production.
- Rigorous testing before go-live; security testing in **acceptance testing**.
- **Minimise the attack surface** — disable unused functions and services.

### Strong ICT controls

| Area | Expectations (selected) |
| --- | --- |
| Data protection | Anti-malware at network entry and exit points, email gateways, servers and endpoints; **anti-phishing** controls and staff awareness; **file integrity monitoring**; **encryption** to recognised standards with proper key management; regular **vulnerability assessment**; **input validation** for web applications; secure media handling and **disposal**; clear-desk policy |
| Network security | Secure protocols and encryption, including remote and third-party links; **IDS / IPS** and endpoint security; block **unauthorised devices** and scan for rogue access points; **DDoS protection** (boundary devices, cloud DDoS services, extra capacity); scan and protect **legacy systems** |
| Configuration and change management | Based on standards such as **ITIL**; changes approved by the **board or a Change Advisory Board**; test before production; **baseline secure configurations**; **software whitelisting** (deny-all, permit-by-exception) for critical systems; emergency change process; **rollback plans** |
| Monitoring-ready design | Define a **baseline of normal activity** (traffic, account use, transaction patterns) to spot anomalies; implement **SIEM** or equivalent |
| Segmentation | Secure boundaries using routers, firewalls, IDS / IPS, VPN, **DMZ** and proxies; trusted and untrusted zones; **deny-all, permit-by-exception** between zones; **separate management network** (VLAN); ability to **sever connections instantly** to stop contagion; automated isolation of affected assets |

### Interconnections and third parties

- Set **participation requirements** for participants: connectivity
  restrictions, access and **privileged account management**, authentication,
  encryption, **vulnerability and patch management**, detection and response,
  and awareness training.
- Obtain **assurance** — self-attestations or third-party certifications.
- Require third-party vendors and ICT suppliers to meet cyber resilience
  requirements through **contract clauses**.

### Insider threats

- **Background checks** for new staff and **periodic re-checks**, in proportion
  to access.
- Controls for staff leaving or changing roles.
- **User behaviour monitoring** and **data loss prevention (DLP)**.

### Identity and access management

- Verify identity before creating accounts; every internal and external user
  **uniquely identified**.
- **Multi-factor authentication** for critical systems, processes and roles,
  wherever supported; enforced **password complexity**.
- A formal **access control model** — role-based, rule-based or attribute-based
  — with prompt revocation.
- **Separation of duties** for high-risk transactions — **four-eyes or
  six-eyes** principle.
- Controlled creation, change and deletion of accounts; **maximum failed login
  attempts** enforced.
- Up-to-date record of all accounts, especially **privileged and remote**
  ones; automatic disabling of **inactive, temporary and emergency** accounts;
  alerts when access is elevated; privileged access **on a need-to-use or
  event-by-event basis**.

### Training

Cyber awareness training for all staff — including **spear-phishing** and how
to handle requests for sensitive information — measured for effectiveness, with
**specialised training** for privileged and sensitive roles.

## E. Detection

- Ability to **detect anomalous activity and events** promptly, including from
  **insiders and trusted third parties**.
- Monitoring against **baseline profiles** — unusual users, times, locations,
  devices, transaction sizes or frequencies.
- **Logs** backed up securely and protected from alteration; **time
  synchronisation** so logs can be correlated.
- **Collect, centralise and correlate** event information from many sources
  for continuous monitoring — through a **Security Operations Centre (SOC)**,
  network operations centre or equivalent.
- Multi-layered detection controls covering people, processes and technology.

## F. Response and recovery

### Incident response

- Documented **incident response, resumption and recovery** plans covering
  cyber scenarios; a skilled **incident response team**.
- Staff trained to **preserve digital evidence** for forensic and legal use.

### Resumption within two hours (two-hour RTO)

In line with **PFMI key consideration 17.6**, an LI should design and test
its systems and processes to enable:

1. the **safe resumption of critical operations within two hours** of a
   disruption; and
2. **completion of settlement by the end of the day** of the disruption, even
   in extreme but plausible scenarios.

The LI must also **plan for cases where two hours cannot be met** — for
example, when data integrity is compromised — with contingency plans and
scenario analysis.

```text diagram: the two-hour resumption objective
  disruption                         ≤ 2 hours                   end of the same day
      │◄──────────── resume critical operations safely ──────────►│
      ●──────────────────────────────●──────────────────────────────●
                                     critical services back      settlement completed
```

### Design elements

- Systems designed around **extreme but plausible** cyber scenarios.
- **Data integrity**: ability to identify and restore corrupted data to a known
  good state.
- **Backups** aligned with transaction frequency and volume, protected **at rest
  and in transit**, **tested regularly**, and able to support resumption within
  two hours.

### Communication and reporting

- A **communication plan** for participants, linked FMIs, authorities, service
  providers and the media.
- The incident response plan identifies who must be notified, by whom, what and
  when.
- **Any cyber incident that could be material or systemic must be reported
  immediately** to the relevant oversight and regulatory authorities, following
  NRB's related directives when reporting to NRB.

## G. Testing

A **comprehensive testing programme** validates the whole framework. Tests
should be **risk-based**, cover the ecosystem, and feed findings back into
improvements.

| Test type | CRG expectations |
| --- | --- |
| **Vulnerability assessment** | A vulnerability management process to classify, prioritise and fix weaknesses; regular scanning of **external-facing and internal** systems, rotating so all environments are covered **through the year**; before deploying new or changed services |
| **Scenario-based testing** | **Tabletop exercises (TTX)** and simulations of extreme but plausible scenarios, informed by **cyber threat intelligence**; tests response, resumption and recovery plans; developed with the ecosystem |
| **Penetration testing** | Simulates real attacks on systems, networks, applications, people and processes; conducted **regularly and after major updates or deployments**; covers all SDLC stages and **mobile apps** |
| **Red team testing** | An independent team (internal and/or external) plays the **adversary** to test people, processes and technology; works with the **blue team** (defenders); based on realistic threat intelligence |
| Industry-wide exercises | Participate to test cross-sector coordination and communication |

## H. Situational awareness

**Situational awareness** means understanding the cyber threat environment
the LI operates in.

- A **cyber threat intelligence (CTI)** process — collect, process and analyse
  information on threat actors, their motives, targets and techniques, from
  internal sources (logs, IDS), trusted providers, and public sources.
- Integrate CTI with the **SOC** — each improves the other.
- **Information sharing** with trusted stakeholders under clear rules,
  using the **Traffic Light Protocol (TLP)** — four colour designations that
  tell recipients how widely they may share information.
- Actively participate in **information-sharing groups**.

| TLP colour (v2.0) | Sharing allowed |
| --- | --- |
| TLP:RED | Named recipients only — not to be shared further |
| TLP:AMBER (and AMBER+STRICT) | Within the recipient's organisation (and its clients) on a need-to-know basis; AMBER+STRICT restricts to the organisation only |
| TLP:GREEN | Within the community, but not publicly |
| TLP:CLEAR | Public — no restriction |

## I. Learning and evolving

- **Continuous learning** from incidents, tests, threat intelligence and
  industry developments, built into staff training and the framework.
- A continuous cyber resilience **training programme**; training for **board
  members and senior management at least once a year**, covering incident
  response, current threats and emerging issues (spear phishing, social
  engineering, mobile security).
- Review skills and competencies as technology and threats change, including
  **cloud, mobile, IoT and insider threats**.
- **Cyber resilience benchmarking** — use **metrics and maturity models** to
  measure maturity against the target and against peers.

## CRG vs IT Guidelines 2012

| | IT Guidelines 2012 | Cyber Resilience Guidelines 2023 |
| --- | --- | --- |
| Issued by | **Bank Supervision Department** | **Payment Systems Department** |
| Applies to | Banks and financial institutions licensed by NRB | **A, B, C, D class BFIs, PSOs, PSPs** and designated FMIs |
| Focus | IT governance, information security, operations, BCP, IS audit, fraud | **Resilience** — withstand and **recover** from cyber attacks |
| Basis | Good practice, COBIT | **CPMI–IOSCO GCR**, PFMI, ISO 27001/27002, COBIT 2019 |
| Approach | Specific requirements | **Principle- and risk-based**, maturity-driven |
| Key role | **Information Security Officer** | **CISO** reporting directly to the board, independent of IT |
| Recovery target | RTO and RPO set in the BCP | **Two-hour resumption** of critical operations |
| Incident reporting | Electronic attacks reported **monthly** | Material or systemic incidents reported **immediately** |

## Quick revision

> [!TIP]
> **One-line answers.** NRB **Cyber Resilience Guidelines, August 2023**,
> issued by the **Payment Systems Department** under **Monetary Policy 2022/23
> (policy no. 128)**; based on **CPMI–IOSCO GCR (2016)**. Applies to **A, B, C,
> D class BFIs, PSOs and PSPs**. **5 categories**: governance, identification,
> protection, detection, response and recovery; **3 components**: testing,
> situational awareness, learning and evolving. **Two-hour resumption** of
> critical operations and settlement by end of day. A **CISO** with direct
> access to the board and independence from IT. At least **one board member
> with cyber expertise**. Board and senior management trained **at least
> annually**.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: the CRG comes from the
> **Payment Systems Department**, not Bank Supervision; it is **risk-based**,
> not a checklist; **resumption within two hours** comes from **PFMI Principle
> 17**; the CISO must be **independent of IT operations**; MFA is expected for
> **critical systems and roles**; **red teams** play attackers, **blue teams**
> defend; **TLP** has **four** colours; a **SOC** centralises and correlates
> events; **material or systemic** incidents are reported **immediately**;
> testing covers **vulnerability assessment, scenario-based tests, penetration
> tests and red teaming**.
