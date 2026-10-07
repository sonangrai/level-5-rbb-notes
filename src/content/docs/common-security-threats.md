---
title: "Common security threats: social engineering, malware, DoS/DDoS and phishing"
summary: How attackers manipulate people, the families of malicious software, how denial-of-service attacks work and are mitigated, and every common type of phishing with how to spot it.
section: cybersecurity
order: 2
tags: [cyber-security, social-engineering, malware, ddos, phishing]
updatedAt: "2026-10-07"
---

Most successful cyber attacks on banks do not start by breaking encryption.
They start by **fooling a person**, slipping in **malicious software**, or
**flooding a service** until it falls over. This note covers the four threats
that appear again and again in incident reports and exam papers: social
engineering, malware, denial of service, and phishing.

## Social engineering

**Social engineering** is the psychological manipulation of people into
**revealing confidential information or performing actions** that compromise
security — such as giving out a password, transferring money, or opening an
infected file. It targets the weakest link in any security system: **the
human**. It is often called "**hacking the human**".

### Why it works: principles of influence

| Principle | How attackers use it | Example |
| --- | --- | --- |
| Authority | Pretend to be someone powerful | "This is the CEO — process this transfer now." |
| Urgency / scarcity | Create time pressure so the victim does not think | "Your account will be blocked in 2 hours." |
| Fear / intimidation | Threaten consequences | "Police case will be filed against you." |
| Trust / familiarity | Pose as a colleague, bank or known brand | "Hi, I'm from your IT helpdesk." |
| Greed / reward | Offer something too good to be true | "You've won a lottery — pay the processing fee." |
| Curiosity | Make the victim want to look | A USB drive labelled "Salary details 2026" |
| Helpfulness | Exploit the wish to help | "I've forgotten my badge, can you let me in?" |
| Social proof | "Everyone else has done it" | "All branch staff have already updated their login." |

### The social engineering life cycle

```text diagram: stages of a social engineering attack
  1. INVESTIGATION         2. HOOK                 3. PLAY                 4. EXIT
  research the target ──► engage, build a  ──► exploit — get the ──► leave without
  (LinkedIn, website,       story, gain trust      data, money or         raising
  social media)                                    access                 suspicion
```

### Social engineering techniques

| Technique | Description |
| --- | --- |
| **Phishing** | Fraudulent messages that impersonate a trusted source (covered in detail below) |
| **Pretexting** | Inventing a believable scenario (pretext) to obtain information — posing as an auditor, IT support or a bank official |
| **Baiting** | Leaving infected media (USB drives) or offering free downloads to lure victims |
| **Quid pro quo** | Offering a service or benefit in exchange for information — "free tech support" in return for login details |
| **Tailgating / piggybacking** | Following an authorised person into a secure area |
| **Impersonation** | Pretending to be a specific person — courier, technician, executive |
| **Vishing** | Voice phishing by phone call |
| **Smishing** | Phishing by SMS |
| **Scareware** | Fake warnings ("Your PC is infected!") that push the victim to install malware or pay |
| **Watering hole** | Infecting a website the target group is known to visit |
| **Honey trap** | Using a fake romantic or social relationship to extract information |
| **Dumpster diving** | Searching trash for documents, notes or old hardware |
| **Shoulder surfing** | Watching someone enter a PIN or password |
| **Business email compromise (BEC)** | Using a compromised or spoofed executive or vendor email to request payments |

> [!WARNING]
> **Common scams targeting bank customers in Nepal** include callers
> pretending to be bank staff asking for OTPs or card details "to update
> KYC", fake prize and lottery messages, fraudulent loan and job offers, and
> fake social-media pages of banks and wallets. A bank will **never** ask a
> customer for a PIN, password or OTP.

### Defences against social engineering

- **Security awareness training** and simulated phishing exercises.
- **Verify identity** through a separate, known channel before acting on
  requests — call back on an official number.
- Policies that staff will **never** share passwords or OTPs, and IT will
  never ask for them.
- **Dual authorisation** (maker–checker) for payments and changes to vendor
  bank details.
- Visitor management, ID badges, and challenging unknown people.
- Shred sensitive paper; securely dispose of media.
- Limit information published about staff and internal processes.
- MFA, so stolen passwords alone are not enough.

## Malware

**Malware (malicious software)** is any software deliberately designed to
disrupt, damage, gain unauthorised access to, or steal from a computer
system.

### Types of malware

| Type | What it does | Key trait |
| --- | --- | --- |
| **Virus** | Attaches to a legitimate program or file and spreads when the host is run | Needs a **host** and **user action** |
| **Worm** | Standalone program that spreads itself across networks by exploiting vulnerabilities | **Self-replicating**, no user action needed |
| **Trojan horse** | Disguised as legitimate software but carries a hidden malicious payload | **Does not replicate** |
| **Ransomware** | Encrypts files (crypto-ransomware) or locks the device (locker), then demands payment, often in cryptocurrency; modern groups also steal data and threaten to leak it (**double extortion**) | Extortion |
| **Spyware** | Secretly monitors the user and collects information | Stealth |
| **Keylogger** | Records keystrokes to capture passwords and PINs | Software or hardware |
| **Adware** | Shows unwanted adverts, often bundled with free software | Annoyance; privacy risk |
| **Rootkit** | Hides deep in the OS or firmware to give an attacker concealed, privileged control | Very hard to detect |
| **Backdoor** | Provides secret remote access, bypassing authentication | Persistent access |
| **RAT — Remote Access Trojan** | Gives an attacker full remote control of the machine | Control |
| **Bot / botnet** | Infected machines ("zombies") controlled by a **command-and-control (C2)** server, used for DDoS, spam, fraud | Scale |
| **Logic bomb** | Code that triggers when a condition is met (a date, an event) | Dormant until triggered |
| **Time bomb** | A logic bomb triggered by a date or time | Date trigger |
| **Fileless malware** | Lives in memory and abuses legitimate tools (PowerShell, WMI) | Leaves few traces on disk |
| **Cryptojacking** | Secretly uses the victim's computer to mine cryptocurrency | Slowness, high CPU |
| **Banking trojan** | Steals online-banking credentials, often by injecting fake fields into real bank pages | Financial theft (e.g. Zeus, Emotet) |
| **Polymorphic / metamorphic malware** | Changes its code with each infection to evade signature-based antivirus | Evasion |

### Types of viruses

| Virus | Infects |
| --- | --- |
| Boot sector virus | The boot sector or MBR; runs when the computer starts |
| File infector | Executable files (`.exe`, `.com`) |
| Macro virus | Documents with macros (Word, Excel) |
| Multipartite | Both boot sector and files |
| Polymorphic | Changes its signature each time |
| Stealth | Hides the changes it makes |
| Resident | Stays in memory and infects files as they are opened |

### Notable malware incidents

| Year | Malware / incident | Significance |
| --- | --- | --- |
| 1971 | **Creeper** | Considered the first computer worm (experimental, harmless) |
| 1986 | **Brain** | First PC virus (boot sector), written in Pakistan |
| 1988 | **Morris worm** | One of the first worms to spread across the internet |
| 2000 | **ILOVEYOU** | Email worm that infected millions of PCs |
| 2010 | **Stuxnet** | Worm that sabotaged industrial control systems — the first known "cyber weapon" |
| 2016 | **Bangladesh Bank heist** | Attackers used compromised SWIFT credentials to steal about US$81 million |
| 2016 | **Mirai** | Botnet of IoT devices that launched record DDoS attacks |
| 2017 | **WannaCry** | Ransomware worm exploiting an unpatched Windows SMB flaw; hit over 200 000 computers in 150 countries |
| 2017 | **NotPetya** | Destructive malware disguised as ransomware; billions of dollars of damage |
| 2017 | **NIC Asia Bank SWIFT attack (Nepal)** | Attackers compromised the bank's SWIFT system and sent fraudulent transfers abroad — a wake-up call for Nepali banks |

### How malware spreads

Email attachments and links; malicious or compromised websites
(**drive-by downloads**); infected USB drives; pirated software and cracks;
fake apps and updates; exploitation of unpatched systems; malicious adverts
(**malvertising**); and remote desktop exposed to the internet.

### Signs of infection

Slow performance, frequent crashes, pop-ups, unknown programs or browser
extensions, changed home page, disabled antivirus, unusual network activity,
files encrypted or renamed with a ransom note, friends receiving messages you
did not send.

### Prevention and response

| Prevention | Response |
| --- | --- |
| Keep OS and software **patched** | **Isolate** the infected device from the network |
| Antivirus / **EDR** with real-time protection | Report to the IT security team immediately |
| Email filtering and attachment sandboxing | Identify the malware and how it entered |
| Least privilege — no admin rights for daily use | Remove it, or rebuild the system from a clean image |
| Application whitelisting on critical systems | Reset passwords used on the device |
| Block macros and executable attachments | Restore data from **clean backups** |
| Disable autorun; control USB media | Learn lessons and close the entry point |
| Regular, **offline / immutable backups** | Do not pay a ransom without legal and management advice — payment does not guarantee recovery |
| User awareness training | |

> [!NOTE]
> **Antivirus detection methods.** *Signature-based* detection matches known
> malware patterns — accurate, but blind to new malware. *Heuristic* and
> *behaviour-based* detection flags suspicious characteristics or actions —
> catches new threats but may raise false positives. *Sandboxing* runs a file
> in an isolated environment to watch what it does.

## Denial of Service (DoS) and Distributed Denial of Service (DDoS)

A **Denial of Service (DoS)** attack aims to make a system, service or network
**unavailable to its legitimate users** by overwhelming it with traffic or
requests, or by exploiting a flaw that makes it crash. It attacks the
**availability** part of the CIA triad.

A **Distributed Denial of Service (DDoS)** attack does the same from **many
sources at once** — usually a **botnet** of thousands of compromised
computers, routers, cameras and other IoT devices.

```text diagram: DoS vs DDoS
  DoS — one attacker                    DDoS — a botnet
                                                ┌── bot ──┐
   ATTACKER ═══════════► TARGET          ATTACKER ── C2 ─┼── bot ──┼══════► TARGET
   (one machine)                          (controller)    ├── bot ──┤        (overwhelmed)
                                                          └── bot ──┘
                                          thousands of compromised devices
```

### DoS vs DDoS

| | DoS | DDoS |
| --- | --- | --- |
| Sources | **One** computer and connection | **Many** distributed computers (botnet) |
| Volume | Limited by one machine's bandwidth | Massive — can exceed terabits per second |
| Blocking | Easy — block one IP address | Hard — traffic comes from thousands of IPs worldwide |
| Tracing | Easier to trace | Hard to trace |
| Speed | Slower | Faster |

### Types of DoS / DDoS attacks

| Category | Targets | Examples |
| --- | --- | --- |
| **Volumetric** | Consume all the **bandwidth** | UDP flood, ICMP (ping) flood, **amplification** attacks using DNS, NTP or memcached servers |
| **Protocol** | Exhaust **server or network-device resources** (connection tables, firewalls) | **SYN flood**, Ping of Death, Smurf attack, fragmented packet attacks |
| **Application layer (Layer 7)** | Exhaust the **application** with legitimate-looking requests | HTTP GET/POST flood, **Slowloris** (holds connections open), attacks on login or search pages |

| Attack | How it works |
| --- | --- |
| **SYN flood** | Sends many TCP SYN requests but never completes the three-way handshake; the server's half-open connection table fills up |
| **Ping of Death** | Sends malformed or oversized ping packets (over 65 535 bytes) that crash older systems |
| **Smurf attack** | Sends ICMP echo requests to a network's broadcast address with the victim's spoofed IP; every host replies to the victim |
| **DNS amplification** | Sends small DNS queries with the victim's spoofed IP to open resolvers, which send much larger responses to the victim |
| **Teardrop** | Sends overlapping, malformed IP fragments that crash systems unable to reassemble them |
| **HTTP flood** | Floods a web server with seemingly genuine page requests |

```text diagram: SYN flood
  Normal handshake:   Client ──SYN──► Server ──SYN-ACK──► Client ──ACK──► connected

  SYN flood:          Attacker ──SYN (spoofed IP)──► Server ──SYN-ACK──► (nobody)
                      Attacker ──SYN──► … thousands more …
                      Server waits for ACKs that never come; its table of
                      half-open connections fills; real users are refused
```

### Impact and motives

Impact: websites, internet and mobile banking, ATMs and payment systems
become unavailable; lost revenue and reputation; DDoS is sometimes used as a
**smokescreen** to distract the security team while another attack (fraud,
data theft) happens. Motives: extortion (**ransom DDoS**), hacktivism,
competition, revenge.

### Mitigation

- **DDoS protection services** and **content delivery networks (CDNs)** that
  absorb and filter attack traffic (Cloudflare, Akamai, AWS Shield).
- **Rate limiting** and traffic filtering on routers and firewalls.
- **SYN cookies** to defend against SYN floods.
- **Over-provisioned bandwidth** and load balancing.
- **Web Application Firewalls (WAF)** for Layer 7 attacks; CAPTCHA on login and
  search pages.
- **Blackhole / sinkhole routing** with the ISP to drop attack traffic.
- Anomaly detection and a tested **DDoS response plan** with the ISP.
- Disable unnecessary services; close open DNS resolvers.
- Keep devices patched so they are not recruited into botnets.

## Phishing and its types

**Phishing** is a type of social engineering in which attackers send
**fraudulent messages that appear to come from a trusted source** — a bank,
government office, delivery company or colleague — to trick victims into
**revealing sensitive information** (passwords, card numbers, OTPs) or
**installing malware**. The name comes from "fishing": casting bait and
waiting for victims to bite.

```text diagram: anatomy of a phishing email
  From:    Nepal Bank Support <security@nepa1bank-verify.com>   ← look-alike domain
  Subject: URGENT: Your account will be suspended in 24 hours   ← urgency, fear

  Dear Customer,                                               ← generic greeting
  We detected unusual activity. Verify your account
  immediately or it will be blocked.

        [ Verify Now ]  → http://bit.ly/3xYz…                  ← hidden, shortened link
                          (real target: login-update.xyz)

  Bank Security Team                                           ← no real contact details
```

### Types of phishing

| Type | Channel / target | Description |
| --- | --- | --- |
| **Email (bulk / deceptive) phishing** | Mass email | Generic messages sent to thousands, hoping some will respond |
| **Spear phishing** | Email to **specific individuals or groups** | Personalised using research on the target (name, job, colleagues) — much more convincing |
| **Whaling** | Spear phishing aimed at **senior executives** ("big fish") | Targets CEOs, CFOs, board members — often about legal or financial matters |
| **CEO fraud / BEC** | Email impersonating an executive or supplier | Asks finance staff to make urgent payments or change bank details |
| **Clone phishing** | Email | Copies a legitimate email previously received, but replaces links or attachments with malicious ones |
| **Vishing** | **Voice** calls | Caller pretends to be from the bank, police or tax office; may spoof caller ID |
| **Smishing** | **SMS** / messaging apps | Texts with malicious links — fake prizes, parcel delivery, account alerts |
| **Pharming** | **DNS poisoning** or hosts-file malware | Redirects users to a fake site even when they type the correct address — no bait message needed |
| **Angler phishing** | **Social media** | Fake customer-service accounts reply to complaints and steal details |
| **Search engine phishing** | Search results | Fake sites ranked or advertised in search results |
| **Evil twin** | **Wi-Fi** | A fake wireless hotspot mimicking a legitimate one captures traffic and logins |
| **Pop-up phishing** | Browser | Fake pop-ups claiming infection or prize |
| **Quishing** | **QR codes** | Malicious QR codes on posters, emails or stickers over genuine payment QR codes |
| **Watering hole** | Websites | Compromises a website the target group visits |
| **Man-in-the-middle phishing (AiTM)** | Reverse-proxy sites | Relays the real login in real time to steal session cookies, bypassing simple MFA |

> [!TIP]
> **Memory aid.** *Spear* = targeted person; *whaling* = big fish
> (executives); *vishing* = voice; *smishing* = SMS; *pharming* = no bait,
> redirected by DNS; *clone* = copy of a real email.

### How to recognise phishing

- **Sender address** does not match the organisation, or uses a look-alike
  domain (`nepa1bank.com`, `bank-np-secure.com`).
- **Urgent or threatening** language — "act now", "account suspended".
- **Generic greetings** — "Dear customer".
- **Requests for sensitive information** — PIN, password, OTP, CVV — which no
  genuine bank asks for.
- **Mismatched links** — hover to see the real address before clicking.
- **Unexpected attachments**, especially `.zip`, `.exe`, `.html` or
  macro-enabled documents.
- **Spelling and grammar mistakes**, poor formatting (though AI-written phishing
  is often flawless).
- **Too good to be true** — prizes, refunds, unexpected payments.
- **Website clues** — wrong domain, missing or odd padlock details (note that a
  padlock and HTTPS alone do **not** prove a site is genuine).

### What to do

| If you receive a suspected phish | If you have already clicked or replied |
| --- | --- |
| Do not click links or open attachments | Disconnect the device from the network |
| Do not reply or call numbers in the message | Change passwords at once, from a clean device |
| Verify through the official website or phone number | Contact the bank to block cards and accounts if financial details were shared |
| Report it to the IT security team (use the "report phishing" button) | Report to IT security and, for fraud, to the police — in Nepal, the **Nepal Police Cyber Bureau** |
| Delete it after reporting | Monitor accounts for unusual activity |

### Organisational defences

- Email security gateways with spam, malware and link filtering.
- Email authentication — **SPF, DKIM and DMARC** — to block spoofed sender
  domains.
- **Phishing-resistant MFA** (FIDO2 keys, passkeys) for staff.
- Regular **phishing simulations** and training.
- Look-alike domain monitoring and takedown.
- Clear verification procedures for payment requests and changes to bank
  details.
- Customer awareness campaigns — SMS, website notices, branch posters.

## Quick revision

> [!TIP]
> **One-line answers.** Social engineering = manipulating people ("hacking the
> human"). Pretexting = invented scenario; baiting = infected bait; quid pro
> quo = something in exchange; tailgating = following into a secure area.
> Virus needs a host; worm self-replicates; trojan disguises itself;
> ransomware encrypts and demands payment; rootkit hides privileged access.
> DoS = one source; DDoS = many sources (botnet); SYN flood exhausts
> half-open connections. Phishing = fraudulent message from a "trusted"
> source; spear = targeted; whaling = executives; vishing = voice; smishing =
> SMS; pharming = DNS redirection.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: a **worm** needs no user
> action, a **virus** does; a **trojan does not replicate**; **DDoS** attacks
> **availability**; a **botnet** is controlled through a **C2** server;
> **pharming** needs no clicked link; **whaling** targets **executives**, not
> random users; **HTTPS** does not prove a site is genuine; **signature-based**
> antivirus misses **new** malware; **SPF, DKIM and DMARC** fight **email
> spoofing**; WannaCry spread through **unpatched** Windows systems; banks
> **never** ask for OTPs or PINs.
