---
title: "Introduction to cyber security, access control, authentication and passwords"
summary: What cyber security protects and how, threats and vulnerabilities, passive and active attacks, access control models, authentication vs authorisation, and good password management.
section: cybersecurity
order: 1
tags: [cyber-security, access-control, authentication, passwords, attacks]
updatedAt: "2026-10-07"
---

**Cyber security** is the practice of protecting computers, networks,
programs and data from **unauthorised access, attack, damage or theft**. For a
bank, the data is money: account balances, card numbers, PINs and payment
messages are all digital, so a breach can mean direct financial loss, regulatory
penalties and a collapse in customer trust. This note covers the foundations —
what is protected, what threatens it, and the two controls every system relies
on: deciding **who you are** (authentication) and **what you may do**
(authorisation).

> [!NOTE]
> Related notes: [OS security threats](/docs/os-security-threats) (malware
> types, OS hardening, incident response),
> [Network security and cryptography](/docs/network-security-and-cryptography)
> (firewalls, encryption, PKI) and
> [Common security threats](/docs/common-security-threats) (social
> engineering, DDoS, phishing).

## What cyber security protects

### The CIA triad

| Principle | Meaning | Threatened by | Protected by |
| --- | --- | --- | --- |
| **Confidentiality** | Information is disclosed only to authorised people | Eavesdropping, data theft, shoulder surfing | Encryption, access control, data classification |
| **Integrity** | Information is accurate and is not altered without authorisation | Tampering, malware, man-in-the-middle | Hashing, digital signatures, checksums, audit trails |
| **Availability** | Information and systems are accessible when needed | DoS / DDoS, ransomware, hardware failure, disasters | Redundancy, backups, DR sites, DDoS protection |

Additional principles often added, especially in banking:

| Principle | Meaning |
| --- | --- |
| **Authenticity** | Data, transactions and parties are genuine |
| **Non-repudiation** | A party cannot deny having sent or received a transaction — achieved with digital signatures |
| **Accountability** | Every action can be traced to a unique user — through logging and auditing |
| Privacy | Personal data is collected and used only as agreed |

The opposite of CIA is **DAD — Disclosure, Alteration, Destruction (or
Denial)**.

### Domains of cyber security

| Domain | Focus |
| --- | --- |
| Network security | Protecting the network — firewalls, IDS / IPS, VPN, segmentation |
| Application security | Secure coding, testing and patching of software — preventing SQL injection, XSS |
| Endpoint security | Protecting PCs, laptops, phones, ATMs — antivirus, EDR, device control |
| Data security | Encryption, data loss prevention (DLP), classification, backup |
| Identity and access management (IAM) | Who can access what — authentication, authorisation, privileged access |
| Cloud security | Protecting data and services hosted in the cloud |
| Operational security | Processes for handling and protecting data assets |
| Disaster recovery and business continuity | Restoring operations after an incident |
| End-user education | Training people — the most targeted "component" |

### Frameworks and standards

| Framework | Description |
| --- | --- |
| **NIST Cybersecurity Framework (CSF)** | US framework organised into core functions: **Identify, Protect, Detect, Respond, Recover** — version 2.0 (2024) added **Govern** |
| **ISO/IEC 27001** | International standard for an **Information Security Management System (ISMS)**; organisations can be certified against it. **ISO/IEC 27002** gives the detailed controls |
| **PCI DSS** | Payment Card Industry Data Security Standard — mandatory for organisations handling card data |
| **COBIT** | IT governance and management framework (ISACA) — recommended by NRB's IT Guidelines |
| CIS Controls | A prioritised list of practical security controls |

## Threats, vulnerabilities and risk

| Term | Meaning | Example |
| --- | --- | --- |
| **Asset** | Anything of value to protect | Core banking database, customer data, reputation |
| **Threat** | Any potential cause of an unwanted incident that may harm a system | A cyber criminal, ransomware, an earthquake |
| **Threat actor / agent** | The person or thing carrying out the threat | A hacker group |
| **Vulnerability** | A weakness that a threat can exploit | Unpatched server, weak password, untrained staff |
| **Exploit** | Code or a technique that takes advantage of a vulnerability | An exploit kit for an unpatched web server |
| **Risk** | The likelihood that a threat exploits a vulnerability, combined with the impact | Risk = Likelihood × Impact |
| **Control / countermeasure** | A safeguard that reduces risk | Patching, MFA, firewall |
| **Attack vector** | The path an attacker uses to get in | Email attachment, USB drive, exposed remote desktop |
| **Attack surface** | The total of all points where an attacker could try to get in | Every open port, application, user and device |

```text diagram: how the terms connect
   THREAT ACTOR ──uses──► EXPLOIT ──against──► VULNERABILITY ──in──► ASSET
                                                     │
                                         reduced by CONTROLS
                                                     │
                               RISK = likelihood × impact (what is left over)
```

### Threat actors

| Actor | Motive | Skill |
| --- | --- | --- |
| Script kiddies | Curiosity, fame | Low — use ready-made tools |
| Hacktivists | Political or social causes | Medium |
| Cyber criminals / organised crime | **Money** — fraud, ransomware, card theft | Medium to high |
| Nation-state / APT groups | Espionage, sabotage, financial gain for the state | Very high; long-running "advanced persistent threats" |
| Insiders | Revenge, money, negligence | Have legitimate access — very dangerous |
| Competitors | Industrial espionage | Varies |

### Types of vulnerabilities

- **Software** — bugs, unpatched systems, insecure code (buffer overflow,
  injection flaws).
- **Configuration** — default passwords, open ports, unnecessary services,
  weak encryption settings.
- **Human** — lack of awareness, susceptibility to phishing, weak passwords.
- **Process** — no change management, no access reviews, poor
  separation of duties.
- **Physical** — unlocked server rooms, unattended devices.

Publicly known vulnerabilities are catalogued as **CVEs (Common
Vulnerabilities and Exposures)** and scored from 0 to 10 for severity using
**CVSS (Common Vulnerability Scoring System)**. A **zero-day** vulnerability
is one with no patch available yet.

### Risk treatment

| Option | Meaning | Example |
| --- | --- | --- |
| Mitigate (reduce) | Apply controls | Install patches, add MFA |
| Transfer (share) | Shift the impact to someone else | Cyber insurance, outsourcing |
| Avoid | Stop the risky activity | Do not launch an insecure service |
| Accept | Tolerate the risk when controls cost more than the impact | Low-value system with minor risk |

## Security attacks

### Passive vs active attacks

The ITU-T **X.800** security architecture divides attacks into two classes:

| | Passive attack | Active attack |
| --- | --- | --- |
| What the attacker does | **Observes or monitors** — eavesdropping | **Modifies** data or the system, or creates false data |
| Effect on system | No change to data or resources | Data or resources altered or disrupted |
| Threatens | **Confidentiality** | **Integrity and availability** |
| Detection | Hard to detect | Easier to detect |
| Main defence | **Prevention** — encryption | **Detection and recovery** |
| Types | Release of message contents; **traffic analysis** | **Masquerade**, **replay**, **modification of messages**, **denial of service** |

| Active attack | Description |
| --- | --- |
| Masquerade | One entity pretends to be another (using stolen credentials) |
| Replay | Captured data is retransmitted later to produce an unauthorised effect (resending a payment message) |
| Modification of messages | Part of a legitimate message is altered, delayed or reordered ("pay Ram" becomes "pay Hari") |
| Denial of service | Prevents normal use of systems or communication |

**Traffic analysis** — even when messages are encrypted, an attacker can learn
from the pattern: who communicates with whom, how often and how much.

### X.800 security services

| Service | Protects against |
| --- | --- |
| Authentication | Masquerade — confirms the identity of the communicating party |
| Access control | Unauthorised use of resources |
| Data confidentiality | Disclosure — passive attacks |
| Data integrity | Modification, insertion, deletion, replay |
| Non-repudiation | Denial by a sender or receiver of having taken part |
| Availability | Denial of service |

### Common cyber attacks

| Attack | Description |
| --- | --- |
| Malware | Viruses, worms, trojans, ransomware, spyware (see [common threats](/docs/common-security-threats#malware)) |
| Phishing and social engineering | Tricking people into revealing information or running malware |
| Denial of service (DoS / DDoS) | Overwhelming a system so it cannot serve users |
| Man-in-the-middle (MITM) | Secretly intercepting and possibly altering communication between two parties — often on public Wi-Fi |
| **SQL injection** | Inserting malicious SQL through input fields to read or alter the database |
| Cross-site scripting (XSS) | Injecting malicious scripts into web pages viewed by other users |
| Cross-site request forgery (CSRF) | Tricking a logged-in user's browser into sending an unwanted request |
| Session hijacking | Stealing a session cookie or token to take over a logged-in session |
| Password attacks | Brute force, dictionary, credential stuffing, spraying (see below) |
| DNS spoofing / poisoning | Redirecting users to a fake site by corrupting DNS data |
| Zero-day exploit | Attacking an unknown, unpatched vulnerability |
| Advanced persistent threat (APT) | A long, stealthy, targeted intrusion, often by a nation-state group |
| Supply chain attack | Compromising a trusted vendor or software update to reach its customers |
| Insider attack | Misuse by someone with legitimate access |
| Card skimming | Copying card data with a device fitted on an ATM or POS terminal |

```text diagram: SQL injection
  Login form input:   username = admin' --      password = anything

  Query the developer intended:
    SELECT * FROM users WHERE username = 'admin' AND password = 'anything'

  Query actually run (everything after -- is a comment):
    SELECT * FROM users WHERE username = 'admin' -- ' AND password = '…'
                                                    └─ password check removed

  Defence: parameterised queries (prepared statements), input validation,
           least-privilege database accounts, web application firewall
```

## Access control mechanisms

**Access control** is the selective restriction of access to resources. It
answers four questions — the **IAAA** sequence:

```text diagram: the access control sequence
  1. IDENTIFICATION    Who do you claim to be?        username, account number, card
          │
  2. AUTHENTICATION    Prove it.                      password, OTP, fingerprint
          │
  3. AUTHORISATION     What are you allowed to do?    permissions, roles
          │
  4. ACCOUNTABILITY    What did you do?               audit logs, monitoring
```

Some texts list **AAA** — Authentication, Authorisation and **Accounting**
(recording usage) — used by RADIUS and TACACS+ servers.

### Subjects and objects

- **Subject** — an active entity that requests access: a user, process or
  device.
- **Object** — a passive entity that contains information: a file, database,
  printer.

### Access control models

| Model | Who decides | How it works | Example |
| --- | --- | --- | --- |
| **DAC — Discretionary** | The **owner** of the object | The owner grants permissions at their discretion, usually through ACLs | Windows NTFS and UNIX file permissions; sharing a Google Doc |
| **MAC — Mandatory** | The **system**, based on a central policy | Subjects get **clearances** and objects get **labels** (Top Secret, Secret, Confidential, Unclassified); access is granted only if they match. Users cannot change it | Military and government systems, SELinux |
| **RBAC — Role-Based** | The administrator, by **role** | Permissions are assigned to roles (teller, branch manager, auditor); users are assigned roles | Core banking systems, enterprise applications |
| **Rule-Based** | Rules set by administrators | Global rules apply to all users | Firewall rules; "no login after 8 p.m." |
| **ABAC — Attribute-Based** | Policies over **attributes** | Combines user, resource and environment attributes (department, time, location, device) | "Managers may approve loans up to Rs. 50 lakh from branch network during office hours" |

### Security models: Bell–LaPadula and Biba

Two classic formal models used with MAC:

| Model | Protects | Rules | Memory aid |
| --- | --- | --- | --- |
| **Bell–LaPadula** | **Confidentiality** | **No read up** (simple security property) — cannot read data above your level. **No write down** (\*-property) — cannot write to a lower level, so secrets cannot leak down | Military secrecy |
| **Biba** | **Integrity** | **No read down** — do not read less trustworthy data. **No write up** — cannot corrupt more trustworthy data | The reverse of Bell–LaPadula |

### Implementing access control

- **Access Control List (ACL)** — attached to each **object**, listing which
  subjects may access it and how.
- **Capability list** — attached to each **subject**, listing what it may
  access.
- **Access control matrix** — the full table of subjects × objects; ACLs are
  its columns, capability lists its rows.

### Access control principles

| Principle | Meaning |
| --- | --- |
| **Least privilege** | Give only the minimum access needed for the job |
| **Need to know** | Access to information only when the job requires it |
| **Separation (segregation) of duties** | Split critical tasks so one person cannot complete them alone — **maker–checker** (four-eyes) in banking |
| Job rotation and mandatory leave | Expose fraud that depends on one person always being present |
| Default deny | Anything not explicitly allowed is denied |
| Periodic access review | Regularly confirm that each user's access is still needed; remove access promptly on exit or transfer |

### Types of security controls

| By function | Purpose | Example |
| --- | --- | --- |
| Preventive | Stop an incident | Firewall, MFA, locks |
| Detective | Identify an incident | IDS, CCTV, log review, audits |
| Corrective | Fix after an incident | Restoring from backup, patching |
| Deterrent | Discourage an attack | Warning banners, visible cameras |
| Recovery | Restore operations | DR site, BCP |
| Compensating | Alternative when the main control is not possible | Extra monitoring for a legacy system |

| By nature | Example |
| --- | --- |
| Administrative (managerial) | Policies, procedures, training, background checks |
| Technical (logical) | Encryption, firewalls, passwords, ACLs |
| Physical | Guards, locks, fences, biometric doors |

## Authentication and authorisation

### Authentication vs authorisation

| | Authentication | Authorisation |
| --- | --- | --- |
| Question | **Who are you?** | **What can you do?** |
| Purpose | Verifies identity | Grants or denies permissions |
| Order | **Comes first** | Comes after successful authentication |
| Based on | Credentials — password, OTP, biometrics | Policies, roles, permissions |
| Visible to the user | Yes — the user enters credentials | Usually not — the system decides |
| Example | Logging in to internet banking with user ID, password and OTP | Being allowed to view balance and transfer up to a set limit, but not change the limit |
| Protocols / standards | Passwords, Kerberos, OpenID Connect, SAML | OAuth 2.0, RBAC, ACLs |

### Authentication factors

| Factor | Type | Examples |
| --- | --- | --- |
| Something you **know** | Knowledge | Password, PIN, passphrase, security question |
| Something you **have** | Possession | Debit card, smart card, mobile phone (OTP), hardware token, security key |
| Something you **are** | Inherence (biometric) | Fingerprint, face, iris, voice, palm vein |
| Somewhere you **are** | Location | IP address range, GPS location |
| Something you **do** | Behaviour | Typing rhythm, signature dynamics |

- **Single-factor** — one factor (password only).
- **Two-factor (2FA) / multi-factor (MFA)** — two or more factors from
  **different** categories. An ATM uses card (have) + PIN (know).
- Two passwords, or a password plus a security question, are still
  **single-factor** — both are something you know.

### Authentication methods

| Method | How it works |
| --- | --- |
| Password / PIN | Shared secret; the most common and the weakest alone |
| OTP — One-Time Password | A code valid once. **HOTP** is counter-based; **TOTP** is time-based (changes every 30–60 s, as in authenticator apps). Banks send OTPs by SMS or app |
| Hardware token | A device that generates OTPs or holds a cryptographic key |
| Smart card | A chip card holding a certificate or key (EMV chip debit cards) |
| Biometrics | Physical or behavioural traits; measured by FAR, FRR and CER (see [biometric accuracy](/docs/physical-security-it-infrastructure#biometric-accuracy)) |
| Digital certificates / PKI | Proves identity with a private key and a certificate from a trusted CA |
| Passkeys / FIDO2 | Passwordless login with a cryptographic key stored on the device, unlocked by fingerprint or PIN — resistant to phishing |
| Single Sign-On (SSO) | One login gives access to many applications (Kerberos, SAML, OpenID Connect) |
| Kerberos | A ticket-based network authentication protocol using a trusted **Key Distribution Center (KDC)**; used by Windows Active Directory |

### Authorisation in practice

- Permissions are defined through ACLs, roles or policies.
- **Transaction limits** (per transaction and per day) are a form of
  authorisation used in mobile and internet banking.
- **Privilege escalation** — gaining more rights than authorised — is a
  key attack to monitor.
- **Privileged Access Management (PAM)** tools control, record and limit the
  use of administrator accounts, often issuing time-limited ("just-in-time")
  privileges.

## Password management

Passwords remain the most widely used — and most attacked — authentication
method.

### Attacks on passwords

| Attack | How it works | Defence |
| --- | --- | --- |
| **Brute force** | Try every possible combination | Long passwords, account lockout, rate limiting |
| **Dictionary attack** | Try common words and known passwords | Avoid dictionary words; block common passwords |
| **Rainbow table** | Look up pre-computed hashes to reverse stolen password hashes | **Salting** hashes |
| **Credential stuffing** | Reuse username–password pairs leaked from other sites | Unique password per site; MFA |
| **Password spraying** | Try one common password against many accounts, avoiding lockout | MFA, ban common passwords, monitoring |
| Keylogging | Malware or hardware records keystrokes | Antimalware, virtual keyboards, MFA |
| Phishing | Trick the user into typing the password on a fake site | Awareness, MFA, passkeys |
| Shoulder surfing | Watch someone type | Privacy screens, cover the PIN pad |
| Social engineering | Ask for it by pretending to be IT support | "IT will never ask for your password" policy |

### Characteristics of a strong password

- **Long** — at least 12 characters; length matters more than complexity.
- A mix of upper and lower case letters, numbers and symbols, where required.
- **Not** based on personal information (name, date of birth, phone number,
  pet's name) or dictionary words.
- **Unique** — never reused across accounts.
- A **passphrase** of several random words (`river-tiger-candle-89`) is both
  strong and memorable.

```text diagram: why length beats complexity
  Possible combinations = (size of character set) ^ (length)

  8 characters,  lower case only (26):          26^8  ≈ 2 × 10^11
  8 characters,  all 95 printable characters:   95^8  ≈ 7 × 10^15
  16 characters, lower case only (26):          26^16 ≈ 4 × 10^22   ← far stronger
```

### Password policy (organisational)

| Policy element | Typical requirement |
| --- | --- |
| Minimum length | 8 characters at minimum; 12+ recommended; longer for admin accounts |
| Complexity | Mix of character types (traditional); modern guidance focuses on length and blocking known-bad passwords |
| History | Cannot reuse the last *n* passwords |
| Expiry | Periodic change (traditional, e.g. 90 days); modern guidance changes only when compromise is suspected |
| Account lockout | Lock after a set number of failed attempts (e.g. 3–5) |
| First login | Force a change of the initial or default password |
| Storage | Never in plain text; never written on sticky notes |
| Sharing | Passwords must never be shared — every user has a unique ID |
| MFA | Required for remote access, privileged accounts and critical systems |

> [!NOTE]
> **Modern guidance (NIST SP 800-63B):** prefer long passwords and
> passphrases (allow at least 64 characters), screen new passwords against
> lists of breached and common passwords, do **not** force arbitrary
> composition rules or periodic changes, do not use password hints or
> knowledge-based questions, and use MFA. Many organisations — and many exam
> questions — still follow the traditional rules above, so know both.

### How systems store passwords

Passwords must never be stored in plain text or with reversible encryption.
They are stored as **salted hashes**:

```text diagram: salting and hashing a password
  user password:  Kathmandu@2024
  random salt:    9f3a7c…               (unique per user, stored with the hash)
  stored value:   hash(salt + password) using a slow algorithm
                  — bcrypt, scrypt, Argon2 or PBKDF2

  At login: hash(salt + typed password) is compared with the stored value.
  The salt makes identical passwords produce different hashes and
  defeats rainbow tables; the slow algorithm makes brute force expensive.
```

Fast general-purpose hashes like MD5 and SHA-1 are **unsuitable** for
passwords.

### Password managers

A **password manager** stores all passwords in an encrypted vault unlocked by
one strong master password (plus MFA). It generates long random passwords,
fills them in automatically, and only fills them on the genuine website — which
also protects against phishing. Examples: Bitwarden, 1Password, KeePass, and
the managers built into browsers and operating systems.

### Good practice for users and banks

- Never share a password, PIN or OTP — a bank will **never** ask for them.
- Use MFA wherever offered; change default passwords immediately.
- Log out and lock the screen when leaving a workstation.
- Use separate accounts for administration and daily work.
- Disable accounts promptly when staff leave.
- Store privileged and emergency ("break-glass") passwords in a PAM vault, with
  **dual control**.

## Quick revision

> [!TIP]
> **One-line answers.** CIA = confidentiality, integrity, availability.
> Threat = potential danger; vulnerability = weakness; risk = likelihood ×
> impact. Passive attack = eavesdropping and traffic analysis (threatens
> confidentiality); active attack = masquerade, replay, modification, DoS.
> IAAA = identification, authentication, authorisation, accountability.
> DAC = owner decides; MAC = labels and clearances; RBAC = roles.
> Bell–LaPadula = no read up, no write down (confidentiality); Biba = no read
> down, no write up (integrity). MFA = factors from different categories.
> Passwords are stored as salted hashes.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: **authentication comes
> before authorisation**; password + PIN is **not** MFA; encryption defends
> **passive** attacks, detection defends **active** ones; **replay** resends
> captured data; **non-repudiation** is provided by **digital signatures**;
> **ACLs** belong to objects, **capabilities** to subjects; MAC is enforced by
> the **system**, not the owner; **salting** defeats **rainbow tables**;
> **credential stuffing** exploits password **reuse**; maker–checker is
> **separation of duties**; TOTP codes are **time-based**.
