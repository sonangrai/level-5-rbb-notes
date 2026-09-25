---
title: "Network security and cryptography"
summary: The threats a network faces and the defences against them, then the ciphers, hashes, signatures and certificates underneath.
section: networks
order: 4
tags: [networking, security, cryptography, encryption, pki]
updatedAt: "2026-09-25"
---

Security is the assumption every other part of networking quietly makes. The
protocols on the preceding pages were designed to deliver data, not to protect
it — IP does not care who sent a packet, Ethernet does not care who is
listening, and SMTP will relay anything. Security is what gets added on top,
and cryptography is the mathematics that makes the addition possible.

## Network security

### What is being protected

The classic model is the **CIA triad**, extended in practice by two more
properties.

```text diagram: the security goals
                        CONFIDENTIALITY
                    only the intended party
                         can read it
                              /\
                             /  \
                            /    \
                           /      \
                 INTEGRITY ------- AVAILABILITY
              it arrives unaltered   it is there when
                                        needed

   plus  AUTHENTICATION  - the sender is who they claim to be
         NON-REPUDIATION - the sender cannot later deny sending it
         ACCESS CONTROL  - only the authorised may reach the resource
```

### Attacks

Attacks divide by whether the attacker changes anything.

```text diagram: the attack taxonomy
                            Attacks
                               |
              +----------------+----------------+
              |                                 |
          PASSIVE                            ACTIVE
   observe without altering            alter, inject or disrupt
              |                                 |
    - eavesdropping / sniffing        - masquerade (spoofing)
    - traffic analysis                - replay
                                      - message modification
   hard to detect, easy to            - denial of service
   prevent (encryption)
                                      easy to detect, hard to prevent
```

#### Malware

| Type | Behaviour |
| --- | --- |
| **Virus** | Attaches to a host file; needs a user to run it |
| **Worm** | Self-replicating and self-propagating across a network |
| **Trojan** | Useful-looking program hiding a malicious payload |
| **Ransomware** | Encrypts the victim's data and demands payment |
| **Spyware / keylogger** | Silently collects activity and credentials |
| **Rootkit** | Hides its own presence at a privileged level |
| **Botnet** | Compromised hosts controlled remotely, used for DDoS and spam |
| **Logic bomb** | Dormant code that triggers on a condition or date |

#### Network attacks

- **Sniffing** — capturing traffic with a NIC in promiscuous mode. Trivial on a
  hub, harder on a switch, useless against encrypted traffic.
- **Spoofing** — forging a source address. **IP spoofing** hides the origin;
  **ARP spoofing** poisons a host's ARP cache to redirect LAN traffic;
  **DNS spoofing** returns a false answer so a name resolves to the attacker.
- **Man-in-the-middle** — sitting between two parties, relaying and optionally
  altering. ARP spoofing is the usual way in on a LAN.
- **Session hijacking** — stealing a valid session token and continuing an
  already-authenticated session.
- **Replay** — capturing a valid message and re-sending it later. Defeated with
  timestamps, sequence numbers or nonces.
- **Denial of service** — exhausting a resource. A **SYN flood** leaves
  half-open TCP connections; a **smurf** or **amplification** attack sends small
  spoofed queries to servers that reply with large responses to the victim; a
  **DDoS** does all of it from a botnet.
- **Password attacks** — **brute force** tries everything, a **dictionary
  attack** tries likely words, and a **rainbow table** reverses unsalted hashes
  from precomputed chains.
- **Social engineering** — **phishing**, **spear phishing** at a named target,
  **vishing** by phone, **pretexting**, **shoulder surfing**. The human is the
  attack surface, and no protocol fixes it.
- **Injection** — **SQL injection** and **cross-site scripting** exploit input
  that is concatenated instead of parameterised or escaped.
- **Zero-day** — a vulnerability exploited before a patch exists.

### Defences

#### Firewalls

A firewall enforces a policy on traffic crossing a boundary.

| Generation | Inspects | Notes |
| --- | --- | --- |
| **Packet filter** | Address, port, protocol, per packet | Fast, stateless, easily fooled |
| **Stateful inspection** | The connection, not the packet | Tracks the TCP state table |
| **Application / proxy** | The payload, per protocol | Slow, but understands content |
| **Next-generation** | Application identity, users, IPS, TLS | The modern default |

```text diagram: a DMZ, the standard three-legged design
                        INTERNET
                            |
                    +---------------+
                    |   FIREWALL    |
                    +---+-------+---+
                        |       |
               DMZ      |       |      INTERNAL LAN
        web, mail, DNS  |       |   workstations, databases
        reachable from  |       |   reachable from neither
        outside         |       |   the internet nor the DMZ

   A server the public must reach goes in the DMZ, so that compromising
   it still leaves the attacker outside the internal network.
```

#### Detection and the rest

- **IDS / IPS** — an **IDS** detects and alerts, an **IPS** sits inline and
  blocks. Either can be **signature-based** (matches known patterns; blind to
  novelty) or **anomaly-based** (flags deviation from a baseline; noisier).
  **NIDS** watches a network segment, **HIDS** watches one host.
- **VPN** — an encrypted tunnel across a public network; see
  [switching, modems and error control](/docs/switching-modems-error-control).
- **Access control** — **DAC** lets the owner decide, **MAC** enforces
  system-wide labels, and **RBAC** grants by job role. All three serve **least
  privilege**: no more access than the task requires.
- **Authentication factors** — something you **know** (password, PIN), something
  you **have** (token, smart card, OTP), something you **are** (fingerprint,
  iris, face). Using two different categories is **multi-factor**; two passwords
  are not.
- **Segmentation**, **patching**, **antivirus**, **backups**, **logging** and a
  written **security policy**, layered so that no single failure is fatal —
  **defence in depth**.
- **Honeypot** — a deliberately exposed decoy that attracts and records attacks.

#### Wireless security

| Standard | Encryption | Verdict |
| --- | --- | --- |
| **WEP** | RC4 with a 24-bit IV | Broken; recoverable in minutes |
| **WPA** | TKIP | Interim fix; deprecated |
| **WPA2** | AES-CCMP | The long-standing baseline |
| **WPA3** | AES with SAE handshake | Resists offline dictionary attacks |

## Cryptography

### Terms

**Plaintext** is the readable message, **ciphertext** the transformed one, the
**cipher** is the algorithm and the **key** is the secret parameter that
selects one transformation out of many. **Cryptanalysis** is breaking the
result without the key; **cryptology** is both disciplines together.

**Kerckhoffs's principle** governs the whole field: a system must stay secure
even when everything about it except the key is public. Secrecy of the
algorithm — "security through obscurity" — is not security.

### Classical ciphers

#### Caesar cipher

A monoalphabetic **substitution** cipher: shift every letter by a fixed amount.

```text diagram: Caesar cipher with a shift of 3
   plain  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
   cipher D E F G H I J K L M N O P Q R S T U V W X Y Z A B C

   HELLO  ->  KHOOR

   encryption  C = (P + 3) mod 26
   decryption  P = (C - 3) mod 26
```

Only 25 possible keys, so it falls to brute force immediately. A general
monoalphabetic substitution has `26!` keys and still falls, because letter
frequencies survive the substitution.

#### Vigenère cipher

A **polyalphabetic** cipher: the shift changes per position, driven by a
repeating keyword, which flattens the frequency distribution.

```text diagram: Vigenere with the key KEY
   plain   H   E   L   L   O        (7,  4,  11, 11, 14)
   key     K   E   Y   K   E        (10, 4,  24, 10, 4)
   sum    17   8   35  21  18       mod 26
   cipher  R   I   J   V   S
```

#### Transposition ciphers

The letters are kept and their **positions** rearranged.

```text diagram: rail fence cipher, HELLOWORLD over 3 rails
   rail 1   H . . . O . . . L .
   rail 2   . E . L . W . R . D
   rail 3   . . L . . . O . . .

   read the rails in order:  HOL + ELWRD + LO  ->  HOLELWRDLO
```

A **columnar transposition** writes the text into a grid row by row and reads
it out column by column in a keyword-determined order.

### Symmetric key cryptography

One key both encrypts and decrypts, so both parties must already share it.

```text diagram: symmetric encryption
   Alice                                                  Bob
   plaintext --[ encrypt ]--> ciphertext --[ decrypt ]--> plaintext
                   ^                            ^
                   |                            |
                   +---------- same key --------+
                        (shared in advance, secretly)
```

| Algorithm | Type | Key size | Notes |
| --- | --- | --- | --- |
| **DES** | Block, 64-bit | 56 bits | Broken by brute force |
| **3DES** | Block, 64-bit | 112 / 168 bits | DES three times; slow, retired |
| **AES** | Block, 128-bit | 128 / 192 / 256 | The current standard |
| **Blowfish / Twofish** | Block | Up to 448 bits | Free alternatives |
| **RC4** | Stream | 40–2048 bits | Broken; removed from TLS |
| **ChaCha20** | Stream | 256 bits | Fast in software, used in TLS 1.3 |

A **block cipher** works on fixed-size blocks and needs a **mode of operation**:
**ECB** encrypts each block independently and leaks patterns, so **CBC**,
**CTR** or **GCM** are used instead. A **stream cipher** produces a keystream
XORed with the data, one bit or byte at a time.

The weakness is not the maths but the **key distribution problem**: the key has
to reach the other party over some channel that is already secure, and *n*
parties who all need to talk privately require `n(n-1)/2` keys — 4,950 keys for
100 people.

### Asymmetric key cryptography

Each party holds a **key pair**: a public key anyone may have, and a private
key that never leaves the owner. What one key does, only the other undoes —
and which key you start with decides what you achieve.

```text diagram: the direction decides the property
   CONFIDENTIALITY                    AUTHENTICATION
   encrypt with the RECIPIENT'S       encrypt with the SENDER'S
   PUBLIC key                         PRIVATE key
   -> only their private key          -> anyone can verify with the
      can open it                        sender's public key, so only
                                         the sender could have made it
```

#### RSA, worked through

Security rests on the difficulty of factoring the product of two large primes.

```text diagram: RSA with deliberately tiny numbers
   1  choose primes           p = 3,  q = 11
   2  modulus                 n = p x q = 33
   3  totient                 phi = (p-1)(q-1) = 2 x 10 = 20
   4  public exponent e       gcd(e, 20) = 1  ->  e = 7
   5  private exponent d      7d = 1 mod 20   ->  d = 3   (7 x 3 = 21)

      public key  = (e, n) = (7, 33)
      private key = (d, n) = (3, 33)

   encrypt  m = 2   ->  C = 2^7 mod 33  = 128 mod 33 = 29
   decrypt  C = 29  ->  M = 29^3 mod 33 = 24389 mod 33 = 2   (recovered)
```

Real keys are 2048 or 4096 bits. **ECC** reaches equivalent strength with far
smaller keys — a 256-bit ECC key is roughly a 3072-bit RSA key — which is why
it dominates on mobile and in TLS.

#### Diffie–Hellman key exchange

Two parties agree a shared secret over a channel an eavesdropper is watching,
without ever transmitting it.

```text diagram: Diffie-Hellman with p = 23, g = 5
   public, agreed openly:  p = 23,  g = 5

   ALICE                                          BOB
   secret a = 6                                   secret b = 15
   A = 5^6  mod 23 = 8    --- sends 8 --->
                          <--- sends 19 ---       B = 5^15 mod 23 = 19

   shared = 19^6 mod 23 = 2        shared = 8^15 mod 23 = 2

   An eavesdropper sees 23, 5, 8 and 19 — and must solve the discrete
   logarithm problem to get 2.
```

Plain Diffie–Hellman authenticates nobody, so it is vulnerable to a
man-in-the-middle unless combined with signatures or certificates.

### Hash functions

A hash maps input of any length to a fixed-length **digest**. It is not
encryption: there is no key and no way back.

Required properties:

- **Deterministic** — the same input always gives the same digest.
- **One-way** — infeasible to recover the input from the digest.
- **Avalanche effect** — flipping one input bit changes about half the output
  bits.
- **Collision resistant** — infeasible to find two inputs with the same digest.

| Algorithm | Digest | Status |
| --- | --- | --- |
| **MD5** | 128 bits | Broken — collisions are cheap |
| **SHA-1** | 160 bits | Broken — collisions demonstrated in 2017 |
| **SHA-256 / SHA-512** | 256 / 512 bits | Current standard |
| **SHA-3** | Variable | Different internal design, as a hedge |
| **bcrypt / scrypt / Argon2** | Variable | *Deliberately slow*, for passwords |

Passwords are stored as a hash of the password plus a **salt** — a unique
random value per user — so identical passwords produce different digests and a
precomputed rainbow table is useless. A **MAC** or **HMAC** adds a secret key to
the hash, proving integrity *and* origin.

### Digital signatures

A signature gives integrity, authentication and non-repudiation at once. The
whole message is not signed — its hash is, because asymmetric operations are
slow.

```text diagram: signing and verifying
   SENDER                                    RECEIVER
   message --> [ hash ] --> digest           message --> [ hash ] --> digest A
                             |                                            |
                  [ encrypt with sender's                                 |
                    PRIVATE key ]                                      compare
                             |                                            |
                         signature ---- sent with the message ---> [ decrypt
                                                                   with sender's
                                                                   PUBLIC key ]
                                                                        |
                                                                    digest B

   digest A = digest B  ->  unaltered, and only the holder of the private
                            key could have produced it
```

Note the signature does **not** hide the message. Confidentiality needs
encryption as well.

### Certificates and PKI

A public key is only useful if you know whose it is. A **digital certificate**
binds an identity to a public key, and a **Certificate Authority** vouches for
the binding by signing it.

```text diagram: the chain of trust
   Root CA  (self-signed, pre-installed in the OS and browser)
      |  signs
   Intermediate CA
      |  signs
   Server certificate for example.com
      |
   Your browser walks the chain upward; if it reaches a root it already
   trusts, and no certificate in the chain is expired or revoked (CRL,
   OCSP), the identity is accepted.
```

An **X.509** certificate carries the subject, the public key, the issuer, a
validity period, a serial number and the CA's signature. **PKI** is the whole
apparatus: CAs, registration authorities, repositories and revocation.

### TLS

TLS is where all of this meets: asymmetric cryptography to authenticate and
agree a key, then symmetric cryptography for the data.

```text diagram: the TLS handshake, in outline
   CLIENT                                              SERVER
     |  ClientHello: versions, cipher suites, random      |
     |--------------------------------------------------->|
     |  ServerHello: chosen suite, random, CERTIFICATE     |
     |<---------------------------------------------------|
     |  verify the certificate chain against a trusted CA  |
     |  key exchange (ECDHE) -> shared session key         |
     |<-------------------------------------------------->|
     |  Finished, then all traffic under the SYMMETRIC key |
     |<==================================================>|

   Asymmetric is used only to authenticate and agree the key, because it
   is far too slow for bulk data.
```

**Forward secrecy** comes from using an ephemeral Diffie–Hellman key per
session: compromising the server's long-term private key later does not decrypt
traffic captured earlier.

### Symmetric versus asymmetric

| | Symmetric | Asymmetric |
| --- | --- | --- |
| Keys | One shared secret | Public and private pair |
| Speed | Fast — suits bulk data | Slow — roughly 1000× |
| Key distribution | The hard problem | Solved: publish the public key |
| Keys for *n* parties | `n(n-1)/2` | `2n` |
| Provides | Confidentiality | Confidentiality, authentication, non-repudiation |
| Examples | AES, 3DES, ChaCha20 | RSA, ECC, Diffie–Hellman |

In practice the two are combined in a **hybrid** scheme: asymmetric
cryptography transports a freshly generated symmetric key, and that key
encrypts the traffic. TLS, PGP and SSH all work this way.

## Quick revision

> [!TIP]
> **One-line answers.** Confidentiality, integrity and availability are the
> goals. Passive attacks read, active attacks alter. Symmetric is fast but
> cannot distribute its key; asymmetric distributes keys but is slow; real
> systems use both. A hash proves integrity, a signature adds origin, a
> certificate binds a key to an identity.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: hashing is **not**
> encryption, because nothing reverses it; a digital signature does **not**
> encrypt the message; you encrypt with the recipient's **public** key for
> secrecy but with your own **private** key to sign; Diffie–Hellman exchanges a
> key and does **not** encrypt or authenticate; an IDS only alerts while an IPS
> blocks; and two passwords are not two factors.
