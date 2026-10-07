---
title: "Identifying and managing security threats in OS"
summary: The threats an operating system faces, how it protects itself with authentication, access control and hardening, and how threats are detected and handled.
section: operating-system
order: 4
tags: [operating-system, security, malware, access-control, incident-response]
updatedAt: "2026-10-07"
---

The operating system controls every file, process and device, so whoever
controls the OS controls the computer. OS security is about two things:
**protection** — internal mechanisms that keep processes and users from
interfering with each other's resources — and **security** — defending the
whole system against attacks from outside and misuse from inside. Managing
threats is an ongoing cycle: **identify** them, **protect** against them,
**detect** them when they happen, and **respond and recover**.

> [!NOTE]
> Network-level attacks and cryptography are covered in
> [Network security and cryptography](/docs/network-security-and-cryptography);
> physical protection is in
> [Physical security of IT infrastructure](/docs/physical-security-it-infrastructure).

## Security goals

| Goal | Meaning | OS example |
| --- | --- | --- |
| **Confidentiality** | Only authorised users can read data | File permissions, encryption |
| **Integrity** | Data and programs are not altered without authorisation | Code signing, write protection of system files |
| **Availability** | Systems and data are usable when needed | Resource limits, backups, protection from DoS |
| Authentication | Users are who they claim to be | Passwords, biometrics, MFA |
| Authorisation | Users can do only what they are allowed to | Access control lists, roles |
| Accountability / non-repudiation | Actions can be traced to a user | Audit logs |

The first three form the **CIA triad**.

### Threat, vulnerability and risk

| Term | Meaning | Example |
| --- | --- | --- |
| Asset | Something of value to protect | Customer database |
| Vulnerability | A weakness that could be exploited | An unpatched OS, a weak password |
| Threat | Anything that could exploit a vulnerability and cause harm | A hacker, malware, a careless employee |
| Exploit | The method or code used to take advantage of a vulnerability | A ransomware program using an SMB flaw |
| Risk | The likelihood and impact of a threat exploiting a vulnerability | Risk = threat × vulnerability × impact |

## Security threats to an operating system

### Malware (malicious software)

| Type | How it works | Spreads by |
| --- | --- | --- |
| Virus | Attaches itself to a host program or file; runs when the host runs | Needs **human action** — opening an infected file |
| Worm | A standalone program that copies itself across networks | **Self-replicating** — no human action needed (e.g. WannaCry, 2017) |
| Trojan horse | Disguised as useful software, but performs hidden harmful actions | User installs it willingly; **does not replicate** |
| Ransomware | Encrypts files or locks the system and demands payment | Email attachments, exploits |
| Spyware | Secretly gathers information about the user | Bundled software, malicious sites |
| Keylogger | Records keystrokes to steal passwords and PINs | Trojans, malicious hardware |
| Adware | Displays unwanted advertisements | Bundled with free software |
| Rootkit | Hides deep in the OS (even the kernel) to give an attacker hidden, privileged control and conceal other malware | Exploits, trojans |
| Backdoor | A secret way into the system that bypasses normal authentication | Left by malware or a rogue developer |
| Logic bomb | Malicious code that triggers when a condition is met (a date, an employee's removal from payroll) | Planted by insiders |
| Botnet | A network of infected computers ("zombies") controlled remotely | Worms, trojans; used for DDoS and spam |
| Fileless malware | Runs in memory using legitimate OS tools (PowerShell), leaving few files | Exploits, scripts |

### Attacks on the OS

| Attack | Description |
| --- | --- |
| Buffer overflow | A program writes more data than a buffer can hold, overwriting nearby memory — attackers use it to run their own code |
| Privilege escalation | An attacker with limited access gains higher privileges, such as administrator or root |
| Password attacks | Brute force (try every combination), dictionary attack (common words), credential stuffing (reused leaked passwords) |
| Denial of Service (DoS) | Exhausts CPU, memory or other resources so legitimate users are refused service |
| Zero-day exploit | Attacks a vulnerability unknown to the vendor, before a patch exists |
| Trap door | A hidden entry point in a program |
| Man-in-the-middle | Intercepts communication between two parties |
| Phishing and social engineering | Tricks users into revealing credentials or running malware |
| Insider threat | Misuse by employees or contractors with legitimate access |
| Unpatched software and misconfiguration | Default passwords, unnecessary services, open shares, outdated OS |

> [!WARNING]
> Running an **unsupported OS** — one that no longer receives security
> updates, such as Windows XP or Windows 7 — leaves known vulnerabilities
> permanently open. The 2017 **WannaCry** ransomware spread mainly through
> unpatched Windows systems.

## Protection mechanisms in the OS

### Authentication

Authentication verifies a user's identity before granting access.

| Factor | Examples |
| --- | --- |
| Something you **know** | Password, PIN, security question |
| Something you **have** | Smart card, OTP token, mobile phone (SMS or app code) |
| Something you **are** | Fingerprint, face, iris |

**Multi-factor authentication (MFA)** combines two or more different factors —
a password plus an OTP, for example.

**Good password practice:** at least 8–12 characters mixing upper and lower
case, digits and symbols; no dictionary words or personal details; not reused
across systems; changed when compromised; account **lockout** after repeated
failed attempts. The OS stores passwords as salted **hashes**, never in plain
text.

### Authorisation and access control

After authentication, the OS decides **what the user may do**.

| Model | Who decides access | Example |
| --- | --- | --- |
| DAC — Discretionary Access Control | The **owner** of the resource | UNIX permissions, Windows file sharing |
| MAC — Mandatory Access Control | A central **policy** based on security labels (Top Secret, Secret …); users cannot change it | Military systems, SELinux |
| RBAC — Role-Based Access Control | Permissions are assigned to **roles**; users get roles | Teller, branch manager, auditor in a core banking system |
| ABAC — Attribute-Based Access Control | Rules based on attributes (time, location, department) | "Allow only during office hours from the branch network" |

**Implementing access control:**

```text diagram: access matrix, read by row or by column
                File A        File B        Printer
  Ram         read, write     read           print
  Sita        read            —              print
  Admin       own, all        own, all       manage

  Column → Access Control List (ACL): who may access this object
  Row    → Capability list: what this user may access
```

### Key security principles

| Principle | Meaning |
| --- | --- |
| **Least privilege** | Give users and programs only the minimum access they need |
| Separation of duties | Split critical tasks so no one person can complete them alone |
| Need to know | Access only to information required for the job |
| Defence in depth | Several layers of protection, so one failure is not fatal |
| Fail-safe defaults | Deny access unless explicitly permitted |
| Complete mediation | Check every access, every time |

### OS hardening

**Hardening** is reducing the system's **attack surface** — removing
everything that is not needed and securing what remains.

- Install security **patches and updates** promptly; use only supported OS
  versions.
- **Disable unnecessary services, ports and protocols**; uninstall unused
  software.
- **Rename or disable default accounts** (Administrator, Guest) and change
  all default passwords.
- Apply strong **password and lockout policies** (Group Policy in Windows).
- Use standard (non-admin) accounts for daily work; **UAC** or `sudo` for
  admin tasks.
- Enable the **host firewall** and **antivirus / EDR**.
- Turn on **disk encryption** (BitLocker, LUKS, FileVault).
- Enable **Secure Boot** and BIOS/UEFI passwords; disable booting from USB.
- Restrict **USB and removable media**.
- Follow a recognised baseline such as the **CIS Benchmarks**.

### Built-in OS security features

| Feature | Windows | UNIX / Linux |
| --- | --- | --- |
| Accounts and privilege | User / Administrator accounts, UAC | Users / root, `sudo` |
| File permissions | NTFS permissions and ACLs | rwx permissions, ACLs |
| Mandatory controls | Mandatory Integrity Control | SELinux, AppArmor |
| Encryption | BitLocker, EFS | LUKS, dm-crypt |
| Firewall | Windows Defender Firewall | iptables / nftables, ufw, firewalld |
| Antimalware | Microsoft Defender | ClamAV and third-party tools |
| Logging | Event Viewer (Security log) | syslog, journald, `/var/log`, auditd |
| Updates | Windows Update, WSUS | apt, yum / dnf |

Memory protections such as **ASLR** (Address Space Layout Randomization) and
**DEP / NX** (Data Execution Prevention) make buffer-overflow attacks much
harder. **Sandboxing** runs untrusted programs in a restricted environment.

## Identifying threats

Threats must be found before or as they cause damage.

| Method | What it does |
| --- | --- |
| Vulnerability scanning | Tools check systems for missing patches and misconfigurations (Nessus, OpenVAS, Qualys) |
| Penetration testing | Authorised ethical hackers attempt real attacks to find weaknesses |
| Antivirus / antimalware | Detects malware by **signatures** (known patterns) and **heuristics / behaviour** (suspicious actions) |
| EDR — Endpoint Detection and Response | Continuously monitors endpoints for suspicious behaviour and can isolate them |
| IDS / IPS | Intrusion Detection System alerts; Intrusion Prevention System also blocks. **HIDS** runs on a host, **NIDS** watches the network |
| Log monitoring and auditing | Review login attempts, privilege changes, file access |
| SIEM — Security Information and Event Management | Collects and correlates logs from many systems to spot attacks (Splunk, QRadar, Wazuh) |
| File integrity monitoring | Alerts when critical system files change (Tripwire) |
| Security audits | Periodic review against policy and regulations |

**Signs of compromise:** a sudden slowdown, unknown processes or programs,
unexpected pop-ups, disabled antivirus, new unknown user accounts, files
encrypted or renamed, unusual network traffic, repeated failed logins.

## Managing threats

### Risk management

1. **Identify** assets, threats and vulnerabilities.
2. **Assess** the likelihood and impact of each risk.
3. **Treat** each risk:
   - **Mitigate** — apply controls to reduce it.
   - **Transfer** — share it, for example through insurance or outsourcing.
   - **Avoid** — stop the risky activity.
   - **Accept** — tolerate it when the cost of control is higher than the
     risk.
4. **Monitor** and review continuously.

### Patch management

A **patch** is a software update that fixes bugs or security holes. A
patch-management process keeps an inventory of systems, tracks new patches,
**tests** them, deploys them on a schedule (critical patches urgently), and
verifies they were applied — with tools such as WSUS, SCCM / Intune or
Ansible.

### Incident response

When a security incident happens, a planned response limits the damage. The
widely used **NIST** life cycle:

```text diagram: incident response life cycle (NIST SP 800-61)
   ┌──────────────┐   ┌────────────────────┐   ┌─────────────────────────┐   ┌─────────────────┐
   │ 1. PREPARE   │──►│ 2. DETECT AND      │──►│ 3. CONTAIN, ERADICATE   │──►│ 4. POST-INCIDENT│
   │ policy, team,│   │    ANALYSE         │   │    AND RECOVER          │   │    ACTIVITY     │
   │ tools,       │   │ alerts, logs,      │   │ isolate the system,     │   │ lessons learned,│
   │ training     │   │ confirm and assess │   │ remove malware, restore │   │ improve controls│
   └──────────────┘   └────────────────────┘   └─────────────────────────┘   └────────┬────────┘
          ▲                                                                           │
          └───────────────────────────────────────────────────────────────────────────┘
```

Many textbooks list the same steps as six phases: **Preparation,
Identification, Containment, Eradication, Recovery, Lessons learned
(PICERL)**.

> [!CAUTION]
> When a machine is infected, **disconnect it from the network** to stop the
> spread, but do not simply wipe it at once — evidence for investigation may
> be lost. Report the incident according to the organisation's policy.

### User awareness

Most attacks start with a human. Regular training should teach staff to
recognise phishing, avoid unknown USB drives and downloads, lock screens when
away, use strong unique passwords, and report suspicious activity
immediately.

### Backups

Backups are the last line of defence, especially against ransomware: follow
the **3-2-1 rule**, keep at least one copy **offline or immutable**, and test
restores regularly. See [Disaster recovery planning](/docs/disaster-recovery-planning).

## Quick revision

> [!TIP]
> **One-line answers.** CIA = confidentiality, integrity, availability. Virus
> needs a host and human action; worm self-replicates; trojan pretends to be
> useful and does not replicate; rootkit hides privileged access. MFA = two or
> more different factors. DAC = owner decides; MAC = policy decides; RBAC =
> role decides. Least privilege = minimum access needed. Hardening = reducing
> the attack surface. Incident response = prepare, detect, contain/eradicate/
> recover, learn.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: a **worm** spreads without
> user action, a **virus** does not; a **trojan does not replicate**; a
> **logic bomb** waits for a trigger condition; password + PIN is **not** MFA
> — both are "something you know"; an **IDS detects**, an **IPS also
> blocks**; **zero-day** means no patch exists yet; an **ACL** is attached to
> the object, a **capability list** to the user; **RBAC** suits banks with
> clearly defined job roles; signature-based antivirus **cannot** detect new,
> unknown malware.
