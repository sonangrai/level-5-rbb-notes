---
title: "Physical security of IT infrastructure"
summary: Protecting servers, data centres and devices from theft, tampering, fire, power and environmental threats — layered controls, access control, environmental protection and disaster recovery.
section: computer-intro
order: 3
tags: [computer-fundamentals, security, data-centre, disaster-recovery]
updatedAt: "2026-10-07"
---

**Physical security** is the protection of hardware, buildings, people and
data from physical events that could cause damage or loss — theft, break-in,
vandalism, fire, flood, power failure, and plain accidents. A firewall cannot
stop someone from walking out of the server room with a hard disk, so physical
security is the **foundation** that every other security control rests on.

> [!NOTE]
> Logical (technical) security — firewalls, encryption, malware — is covered
> in [Network security and cryptography](/docs/network-security-and-cryptography).

## What is being protected

| Asset | Examples |
| --- | --- |
| Hardware | Servers, storage arrays, network switches and routers, desktops, laptops, ATMs |
| Facilities | Data centre, server room, network closets, branch offices |
| Media | Hard disks, backup tapes, USB drives, printed reports |
| Supporting systems | Power supply, UPS, generators, air conditioning, cabling |
| People | Staff and visitors — **human safety always comes first** |

Physical security supports the **CIA triad**: it keeps data **confidential**
(no one can steal the disk), preserves **integrity** (no one can tamper with
the hardware), and maintains **availability** (systems keep running through
power cuts and disasters).

## Physical threats

| Category | Threats |
| --- | --- |
| Natural | Earthquake, flood, landslide, lightning, storm, extreme heat or humidity |
| Environmental / infrastructure | Fire, power outage, voltage surge and spike, air-conditioning failure, water leakage, dust, static electricity |
| Human — deliberate | Theft, burglary, vandalism, sabotage, terrorism, unauthorised access, insider misuse |
| Human — accidental | Spilled liquids, dropped equipment, cables pulled out, accidental deletion or shutdown |
| Social engineering | Tailgating, impersonation, shoulder surfing, dumpster diving |

> [!WARNING]
> Nepal lies in a highly **seismic zone**, as the 2015 Gorkha earthquake
> showed. Data centres and disaster recovery sites here must plan for
> earthquakes — seismic bracing of racks, and a recovery site in a different
> geographic area.

### Social engineering attacks on physical security

| Attack | Description | Counter |
| --- | --- | --- |
| Tailgating / piggybacking | Following an authorised person through a secured door | Mantraps, turnstiles, staff awareness |
| Impersonation | Posing as a technician, courier or official to gain entry | Verify identity, escort visitors |
| Shoulder surfing | Watching someone type a PIN or password | Privacy screens, PIN-pad shields |
| Dumpster diving | Searching discarded paper or hardware for information | Shredding, secure media disposal |

## Defence in depth: layers of physical security

Good physical security uses several layers, so an intruder who gets past one
still faces the next.

```text diagram: concentric layers of physical security
  ┌─────────────────────────────────────────────────────────────────┐
  │ 1. PERIMETER — fence, walls, gates, lighting, guards, CCTV       │
  │  ┌───────────────────────────────────────────────────────────┐  │
  │  │ 2. BUILDING — locked entrances, reception, ID badges,      │  │
  │  │    visitor log, alarms                                     │  │
  │  │  ┌─────────────────────────────────────────────────────┐  │  │
  │  │  │ 3. SECURE AREA — server room / data centre:          │  │  │
  │  │  │    access cards, biometrics, mantrap, CCTV           │  │  │
  │  │  │  ┌───────────────────────────────────────────────┐  │  │  │
  │  │  │  │ 4. RACK / DEVICE — locked racks and cabinets,  │  │  │  │
  │  │  │  │    cable locks, port locks, BIOS passwords     │  │  │  │
  │  │  │  │  ┌─────────────────────────────────────────┐  │  │  │  │
  │  │  │  │  │ 5. DATA — disk encryption, secure        │  │  │  │  │
  │  │  │  │  │    disposal                              │  │  │  │  │
  │  │  │  │  └─────────────────────────────────────────┘  │  │  │  │
  │  │  │  └───────────────────────────────────────────────┘  │  │  │
  │  │  └─────────────────────────────────────────────────────┘  │  │
  │  └───────────────────────────────────────────────────────────┘  │
  └─────────────────────────────────────────────────────────────────┘
```

### Types of controls

| Type | Purpose | Examples |
| --- | --- | --- |
| Deterrent | Discourage an attack | Warning signs, visible CCTV, lighting, guards |
| Preventive | Stop it happening | Locks, fences, access cards, biometrics, mantraps |
| Detective | Notice it happening | CCTV, motion sensors, intrusion alarms, smoke detectors |
| Corrective / recovery | Limit damage and restore | Fire suppression, backups, UPS, disaster recovery site |

## Physical access control

Access control decides **who can enter where, and when**, and records it.
Authentication uses one or more factors:

| Factor | Something you … | Examples |
| --- | --- | --- |
| Knowledge | know | PIN, door code, password |
| Possession | have | Key, smart card, RFID / proximity card, badge, token |
| Inherence | are | Biometrics — fingerprint, face, iris, palm vein, voice |

Using two factors together (card + PIN, or card + fingerprint) is
**two-factor authentication**.

| Control | Description |
| --- | --- |
| Locks | Mechanical keys, combination locks, electronic locks |
| Access card systems | Smart or RFID cards that log every entry and can be revoked instantly |
| Biometric systems | Identify the person, not the card — cannot be lent or easily stolen |
| Mantrap (access vestibule) | Two interlocked doors; the second opens only when the first has closed, so one person passes at a time — stops tailgating |
| Turnstiles | Admit one person per authorised swipe |
| Security guards | Check identity, respond to alarms, escort visitors |
| Visitor management | Register every visitor, issue temporary badges, escort them, log entry and exit |
| ID badges | Worn visibly at all times; challenge anyone without one |

**Principles:**

- **Least privilege** — people get access only to the areas their job needs.
  A teller does not need server-room access.
- **Need to know** and **separation of duties** — no single person controls
  everything.
- **Audit trail** — every entry and exit is logged and reviewed.
- **Prompt revocation** — access is removed as soon as someone leaves or
  changes role.

### Biometric accuracy

| Term | Meaning |
| --- | --- |
| FAR — False Acceptance Rate | An unauthorised person is wrongly accepted (a security risk) |
| FRR — False Rejection Rate | An authorised person is wrongly rejected (an inconvenience) |
| CER / EER — Crossover (Equal) Error Rate | The point where FAR = FRR; **the lower the CER, the more accurate the system** |

## Surveillance and monitoring

- **CCTV** cameras at entrances, server rooms and ATMs, with recordings
  retained for a defined period.
- **Intrusion detection** — motion, door-contact and glass-break sensors
  linked to alarms.
- **Security lighting** around the perimeter.
- A **security operations centre** or guard room monitoring everything around
  the clock.

## Environmental controls

IT equipment is sensitive to power, heat, humidity, fire and water.

### Power protection

| Problem | Meaning | Protection |
| --- | --- | --- |
| Blackout | Complete loss of power | UPS for short term, generator for long term |
| Brownout / sag | Voltage drops below normal | UPS, voltage regulator (AVR) |
| Surge / spike | Sudden voltage increase (spike is very short) | Surge protector, UPS |
| Noise / EMI | Electrical interference | Line conditioner, shielded cables |

- A **UPS (Uninterruptible Power Supply)** provides battery power instantly
  when mains power fails, long enough to switch to a generator or shut down
  safely. Online (double-conversion) UPS gives the cleanest power.
- A **diesel generator** supplies power for hours or days during long outages
  — essential given load-shedding history in Nepal.
- **Redundant power** — dual power supplies in servers, fed from separate
  circuits; an **ATS (automatic transfer switch)** moves the load between
  sources.
- Proper **earthing (grounding)** and lightning arresters.

### Temperature and humidity

- Data centres use **precision air conditioning (CRAC units)**, typically
  keeping temperature around **18–27 °C** (ASHRAE recommendation).
- **Hot aisle / cold aisle** layout: racks face each other so cold air is drawn
  in from one aisle and hot air expelled into the next, improving cooling.
- Humidity is kept moderate — roughly **40–60 % relative humidity**. Too high
  causes condensation and corrosion; too low causes **static electricity**.
- Temperature and humidity sensors raise alerts before equipment overheats.

### Fire detection and suppression

```text diagram: the fire triangle — remove any side to stop a fire
                 HEAT
                  ╱╲
                 ╱  ╲
                ╱FIRE╲
               ╱______╲
         FUEL            OXYGEN
```

**Detection:** smoke detectors (ionisation, photoelectric), heat detectors,
and **VESDA** (very early smoke detection apparatus) that samples air
continuously for the earliest warning.

| Fire class (international) | Fuel | Extinguisher |
| --- | --- | --- |
| A | Ordinary combustibles — paper, wood, cloth | Water, foam |
| B | Flammable liquids — petrol, oil | CO₂, foam, dry powder |
| C | Flammable gases | Dry powder |
| Electrical (Class C in the US, Class E in some systems) | Live electrical equipment | **CO₂, clean agent** — never water |

**Suppression systems for IT areas:**

| System | How it works | Note |
| --- | --- | --- |
| Clean agent gas (FM-200, Novec 1230, inert gases) | Absorbs heat or reduces oxygen; leaves no residue | **Preferred for server rooms** — does not damage equipment |
| CO₂ | Displaces oxygen | Effective but dangerous to people; for unoccupied areas |
| Wet-pipe sprinkler | Pipes always full of water | Damages electronics; common in general office areas |
| Dry-pipe sprinkler | Pipes hold air; water enters only when triggered | For cold areas |
| Pre-action sprinkler | Needs two triggers (detector + heat) before water flows | Best water-based option for data centres — avoids accidental discharge |

> [!CAUTION]
> **Halon** was once the standard gas for computer rooms but is banned under
> the **Montreal Protocol** because it depletes the ozone layer. Never use
> water on live electrical equipment.

### Water and other hazards

- Raised floors with **water leak detectors**; no water pipes over server
  racks; server rooms not in basements prone to flooding.
- Dust control and clean rooms; anti-static flooring and wrist straps.
- **Seismic bracing** — racks bolted to the floor and to each other.

## Data centre design and site selection

- Avoid flood plains, landslide areas, airports' flight paths and hazardous
  industries.
- Place the server room in the **interior** of the building, away from
  windows and external walls, and not on the ground floor or in the basement.
- Unmarked building, with minimal signage that a data centre is inside.
- **Redundant** power feeds, network links from different providers, and
  cooling.
- Structured, labelled cabling in locked trays.

### Data centre tiers (Uptime Institute)

| Tier | Redundancy | Availability | Downtime per year |
| --- | --- | --- | --- |
| Tier I | Basic, no redundancy (N) | 99.671 % | ~28.8 hours |
| Tier II | Redundant components (N+1) | 99.741 % | ~22 hours |
| Tier III | Concurrently maintainable — any part can be maintained without shutdown | 99.982 % | ~1.6 hours |
| Tier IV | Fault tolerant (2N or 2N+1) — survives any single failure | 99.995 % | ~26 minutes |

## Device and endpoint security

- **Cable locks** (Kensington locks) for laptops and desktops.
- **Locked racks and cabinets** in the server room.
- **Port locks** and disabled USB ports to stop data theft and malware.
- **BIOS / UEFI passwords** and disabled booting from USB.
- **Full-disk encryption** (BitLocker, FileVault) so a stolen disk is
  useless.
- **Screen lock** after inactivity, and a **clear desk, clear screen policy**.
- Asset inventory and tagging of all equipment; **mobile device management**
  for phones and laptops that can wipe a lost device remotely.
- **ATM security** — CCTV, anti-skimming devices, PIN-pad shields, alarm
  systems, safes and secure cash-loading procedures.

### Secure media disposal

Deleting files or formatting a disk does **not** erase the data — it can be
recovered.

| Method | How |
| --- | --- |
| Overwriting (wiping) | Write patterns over every sector, possibly several passes |
| Degaussing | A strong magnetic field erases magnetic media (HDD, tape); does not work on SSDs |
| Physical destruction | Shredding, crushing, drilling, incineration |
| Cryptographic erase | Destroy the key of an encrypted drive |
| Paper | Cross-cut shredding |

## Business continuity and disaster recovery

| Term | Meaning |
| --- | --- |
| BCP — Business Continuity Plan | How the organisation keeps critical operations running during and after a disaster |
| DRP — Disaster Recovery Plan | How IT systems and data are restored after a disaster (part of BCP) |
| RPO — Recovery Point Objective | The maximum acceptable **data loss**, measured in time — "we can lose at most 1 hour of transactions" |
| RTO — Recovery Time Objective | The maximum acceptable **downtime** — "systems must be back within 4 hours" |
| BIA — Business Impact Analysis | Identifies critical processes and the impact of losing them |

### Recovery sites

| Site | Description | Recovery time | Cost |
| --- | --- | --- | --- |
| Hot site | Fully equipped, with real-time copies of data; can take over almost immediately | Minutes to hours | Highest |
| Warm site | Hardware and connectivity in place, data needs restoring | Hours to days | Medium |
| Cold site | Space, power and cooling only; equipment must be brought in | Days to weeks | Lowest |

### Backups

- **Full** backup copies everything. **Incremental** copies changes since the
  last backup of any kind — fastest to take, slowest to restore.
  **Differential** copies changes since the last full backup.
- **3-2-1 rule** — keep **3** copies of data, on **2** different media, with
  **1** copy off-site.
- Backup media must themselves be stored securely and **tested** regularly by
  actually restoring them.

> [!NOTE]
> Nepal Rastra Bank's [IT Guidelines](/docs/nrb-it-guidelines) require banks
> to have a board-approved BCP tested at least annually, a hot, warm or cold
> backup site meeting their RPO and RTO, a data centre located to minimise
> natural and man-made risks with restricted physical access, and CCTV at every
> ATM (without capturing the PIN).

## Policies and people

- A written **physical security policy**, approved by management.
- **Security awareness training** — challenge strangers, never hold doors
  for people without badges, report lost cards immediately.
- **Background checks** for staff with access to critical areas.
- Regular **audits, drills** (fire, evacuation, DR) and maintenance of UPS,
  generators and fire systems.
- Incident reporting and response procedures.

## Quick revision

> [!TIP]
> **One-line answers.** Physical security = protecting hardware, facilities
> and people from physical threats. Defence in depth = several layers from the
> perimeter to the data. Mantrap stops tailgating. UPS for short power cuts,
> generator for long ones. Clean agent gas (FM-200) for server rooms. RPO =
> acceptable data loss; RTO = acceptable downtime. Hot site = fastest
> recovery, most expensive.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: a **mantrap** prevents
> **tailgating**; **lower CER** means a **more accurate** biometric system;
> **Halon** is **banned**; never use **water** on electrical fires — use CO₂
> or clean agent; **low humidity** causes **static**, high humidity causes
> **corrosion**; **degaussing** does not work on **SSDs**; formatting does
> **not** securely erase data; incremental backup is the **fastest to back
> up**, full backup the **fastest to restore**; Tier IV is **fault
> tolerant**; human safety always comes **before** equipment.
