---
title: "Switching, modems and error control"
summary: Circuit, message and packet switching; modems and remote network access; and the codes that detect and correct bit errors.
section: networks
order: 2
tags: [networking, switching, modem, remote-access, error-control]
updatedAt: "2026-09-22"
---

Three questions sit underneath this topic. How does a network decide which path
data takes? How does digital data cross a line that was never built for it? And
how does the receiver know that what arrived is what was sent? Switching,
modems and error control are the three answers.

## Switching technologies

A network cannot connect every node to every other node directly: *n* nodes
would need `n(n-1)/2` links, so 100 nodes would need 4,950 of them. Instead a
few intermediate nodes — switches — relay traffic on demand. **Switching is the
method a network uses to choose and hold that path.**

```text diagram: the switching family
                          Switching
                              |
        +---------------------+---------------------+
        |                                           |
  Circuit switching                        Store-and-forward
  (a path is reserved                              |
   end to end first)            +------------------+------------------+
                                |                                     |
                        Message switching                    Packet switching
                        (whole message hops                          |
                         node to node)              +----------------+--------------+
                                                    |                               |
                                              Datagram                      Virtual circuit
                                              (IP, UDP)                     (X.25, Frame Relay,
                                                                             ATM, MPLS)
```

### Circuit switching

A dedicated physical path is established between the two ends and held for the
whole conversation — the telephone network is the archetype. It works in three
phases:

1. **Setup** — signalling reserves a channel on every link along the route.
2. **Data transfer** — bits flow along the reserved path with no per-packet
   addressing, no queuing and no reordering.
3. **Teardown** — the reservation is released so the capacity returns to the
   pool.

The switch itself is built one of two ways. A **space-division switch**
(crossbar) gives each connection its own physical crosspoint; an *n × n*
crossbar needs n² crosspoints, so real exchanges use multistage designs that
cut the count at the cost of occasional **blocking** — a call refused because
no free internal path exists. A **time-division switch** interleaves samples
from many calls onto one shared path using TDM and a time-slot interchanger.

| Strength | Weakness |
| --- | --- |
| Constant, predictable delay; no jitter | Setup delay before anything moves |
| Guaranteed bandwidth once connected | Capacity is wasted during silence |
| No addressing overhead in the data phase | Poor fit for bursty data traffic |
| Data arrives in order | A failed link kills the call |

### Message switching

The whole message is sent to the first node, stored completely, then forwarded
to the next — **store and forward**, with no path reserved in advance and no
limit on message size. Each node needs large secondary storage, and the delay
is the sum of the transmission time at every hop. Telegraph and early email
relays worked this way; it is obsolete today, but it is the conceptual bridge
between circuit and packet switching.

### Packet switching

The message is cut into small, fixed-ceiling **packets**, each carrying a
header, and each forwarded independently through the network. Because packets
are small, a node can start forwarding one while still receiving the next —
**pipelining** — which is why packet switching beats message switching on delay
even though both store and forward.

```text diagram: what a link is doing over time
  CIRCUIT SWITCHING
  A  |<- setup ->|<====== reserved path, yours alone ======>|<- teardown ->|
     the path is held even while nobody is talking: bandwidth is wasted,
     but the delay never changes.

  PACKET SWITCHING
  A  |  P1  |  P2  |      |  P3  |  P4  |      |  P5  |
     |      | Q1   | Q2   |      |      | Q3   |          <- another user
     no setup and no reservation; every packet queues at every hop, so the
     link stays busy but the delay varies (jitter).
```

#### Datagram versus virtual circuit

```text diagram: two ways to carry packets
  DATAGRAM (connectionless)              VIRTUAL CIRCUIT (connection-oriented)

        P2 -> R2 -> .                    setup:  A -- R1 -- R3 -- B
       /             \                                VCI 12   VCI 45
  A -- P1 -> R1 ------ B                 A === P1 P2 P3 (one fixed path) === B
       \             /
        P3 -> R3 -> '                    the header carries a short circuit
                                         identifier instead of a full address,
  every packet carries the full          and the path stands until the call
  destination address and may            is cleared
  arrive out of order
```

| | Datagram | Virtual circuit |
| --- | --- | --- |
| Setup phase | None | Yes, before any data |
| Header carries | Full destination address | Short VCI / label |
| Path | Chosen per packet | Fixed for the call |
| Order | May be out of order | Preserved |
| On node failure | Reroutes automatically | Circuit fails, must be rebuilt |
| Resource reservation | None | Possible (QoS) |
| Examples | IP, UDP | X.25, Frame Relay, ATM, MPLS |

A virtual circuit is **permanent** (PVC, configured by the operator and always
up) or **switched** (SVC, set up per call and cleared afterwards).

### The three compared

| | Circuit | Message | Packet |
| --- | --- | --- | --- |
| Dedicated path | Yes | No | No |
| Data unit | Continuous stream | Whole message | Packet |
| Store and forward | No | Yes | Yes |
| Bandwidth | Reserved, fixed | Shared | Shared, statistically multiplexed |
| Setup delay | Yes | No | Only for virtual circuits |
| Transmission delay | Constant | Long, and grows with size | Short, varies |
| Efficiency on bursty data | Poor | Moderate | High |
| Congestion appears as | A refused call | Long queues | Delay, then loss |
| Used by | PSTN, ISDN | Telegraph (obsolete) | The internet |

> [!NOTE]
> Layer-2 **LAN switching** — store-and-forward, cut-through and fragment-free
> — is a different use of the word "switching". It describes how one switch
> handles a frame, not how a network reserves a path. See
> [networking devices](/docs/networking-devices).

## Modems and remote network access

### What a modem does

A **modem** (modulator–demodulator) lets digital data cross a line designed for
analogue signals. On the way out it **modulates** a carrier wave with the bit
stream; on the way in it **demodulates** the received wave back into bits. The
classic case is the telephone local loop, whose usable band is roughly
300–3400 Hz.

```text diagram: a dial-up link is digital at both ends only
   PC A                                                          PC B
  digital           analogue carrier across the local loop      digital
  010110 --> [MODEM] --~~/\~~\/~~/\~~--> [ PSTN ] --~~/\~~--> [MODEM] --> 010110
             modulate                                          demodulate
```

### Modulation techniques

The carrier has three properties to play with, and a scheme may change any of
them:

```text diagram: three ways to carry the bits 1 0 1 1 on a carrier
   bit        1          0          1          1
            -------    -------    -------    -------
   ASK      /\/\/\/    _______    /\/\/\/    /\/\/\/     amplitude varies
   FSK      /\/\/\/    /\/\/\/\/  /\/\/\/    /\/\/\/     frequency varies
   PSK      /\/\/\/    \/\/\/\    /\/\/\/    /\/\/\/     phase flips 180 deg
```

- **ASK** — amplitude shift keying. Simplest and cheapest, but amplitude is
  exactly what noise corrupts, so it is the least robust.
- **FSK** — frequency shift keying. Immune to amplitude noise; needs more
  bandwidth.
- **PSK** — phase shift keying. Noise-resistant and bandwidth-efficient.
  **QPSK** uses four phases to carry 2 bits per symbol.
- **QAM** — quadrature amplitude modulation combines phase *and* amplitude.
  16-QAM carries 4 bits per symbol, 64-QAM carries 6. This is what modern
  modems, cable, DSL and Wi-Fi all use.

### Baud rate versus bit rate

**Baud rate** is symbols per second; **bit rate** is bits per second.

```text diagram: the relationship
   bit rate = baud rate x log2(L)        L = number of signal levels

   2400 baud, 16-QAM  ->  L = 16, log2(16) = 4  ->  9600 bps
```

Baud rate determines the bandwidth needed; bit rate determines the throughput.
They are equal only when one symbol carries exactly one bit.

### Kinds of modem

| Basis | Types |
| --- | --- |
| Placement | Internal (expansion card), external (separate box) |
| Direction | Simplex, half duplex, full duplex |
| Timing | Asynchronous (start/stop bits), synchronous (clocked) |
| Medium | Telephone, cable (DOCSIS), DSL, optical, cellular, satellite |

Standards worth recognising: **V.32** (9.6 kbps), **V.34** (28.8/33.6 kbps),
**V.90** (56 kbps down, 33.6 kbps up), **V.92** (faster upstream and quicker
connect). The 56 kbps figure is asymmetric because it assumes the downstream
path is digital all the way to the exchange.

### Remote network access

Remote access is the ability to reach a private network from outside it. The
technologies fall into three layers.

#### The physical link

| Method | Typical capacity | Notes |
| --- | --- | --- |
| Dial-up (PSTN) | Up to 56 kbps | Ties up the phone line; obsolete |
| ISDN BRI | 2B + D = 128 + 16 kbps | Digital dial-up, fast call setup |
| ISDN PRI | 23B + D (T1) or 30B + D (E1) | Used for trunking to a PBX |
| ADSL / VDSL | 8–100+ Mbps down | Asymmetric; shares the copper with voice |
| Cable | 100+ Mbps | Shared coaxial segment in the neighbourhood |
| Leased line | T1 1.544 Mbps, E1 2.048 Mbps | Permanent, dedicated, expensive |
| Cellular | 4G / 5G | Mobile broadband, SIM-based |

#### The link protocol

- **SLIP** — Serial Line IP. Minimal: no addressing, no authentication, no
  error detection, IP only. Historic.
- **PPP** — the standard. **LCP** negotiates and tests the link, **NCP**
  configures each network-layer protocol, and authentication is **PAP**
  (plaintext, weak) or **CHAP** (challenge–response with a hash, repeated
  during the session).
- **PPPoE** — PPP carried inside Ethernet frames, which is how most DSL
  services authenticate subscribers.

#### Access, tunnelling and control

- **RAS** — a Remote Access Server terminates incoming connections and places
  the caller on the internal network.
- **VPN** — a private tunnel across a public network. **Remote-access VPNs**
  connect one user to a site; **site-to-site VPNs** join two networks.
  Protocols: **PPTP** (old, weak), **L2TP/IPsec**, **IPsec** itself (AH for
  integrity, ESP for encryption; transport or tunnel mode) and **SSL/TLS VPN**,
  which needs only a browser.
- **AAA** — authentication, authorisation and accounting, centralised with
  **RADIUS** (UDP, encrypts only the password, combines authn and authz) or
  **TACACS+** (TCP, encrypts the whole payload, separates the three functions).
- **Remote control** — **Telnet** (port 23, plaintext, never use),
  **SSH** (port 22, encrypted, the replacement), **RDP** (port 3389) and
  **VNC** (port 5900) for graphical desktops.

> [!CAUTION]
> Telnet, PAP and PPTP all send credentials in a form an eavesdropper can use.
> In an exam, the secure counterpart is always SSH, CHAP and L2TP/IPsec.

## Error detection and correction

### Why errors happen

A signal degrades in transit through **attenuation**, **distortion**,
**thermal noise**, **crosstalk** and **impulse noise**. The result is one of
two shapes:

- **Single-bit error** — exactly one bit flips. Rare in serial transmission,
  because a disturbance short enough to hit one bit is unusual.
- **Burst error** — two or more bits change within a short span, counted from
  the first corrupted bit to the last. The common case, and the reason CRC
  matters.

Every technique rests on one idea: **redundancy**. The sender adds extra bits
that carry no new information, and the receiver uses them to test the rest.

### Parity check (VRC)

One bit is appended so the total number of 1s is even (even parity) or odd (odd
parity).

```text diagram: even parity
   data 1011001  ->  four 1s, already even  ->  parity 0  ->  sent 10110010
   data 1011011  ->  five 1s, odd           ->  parity 1  ->  sent 10110111
```

It catches every single-bit error and every burst with an **odd** number of
flipped bits — and misses every burst with an even number, which is half of
them. Cheap, weak, and the baseline everything else improves on.

### Two-dimensional parity (LRC)

Arrange the data as a block and add a parity bit to every row *and* every
column.

```text diagram: LRC over four bytes, even parity
              b7 b6 b5 b4 b3 b2 b1 b0    row parity
   byte 1      1  0  0  1  1  0  0  1        0
   byte 2      1  1  1  0  0  0  1  0        0
   byte 3      0  0  1  0  0  1  0  0        0
   byte 4      1  0  0  0  0  1  0  0        0
              -----------------------
   LRC         1  1  0  1  1  0  1  1
```

A single flipped bit now shows up in exactly one row **and** one column, so its
position is known and it can be corrected. Two errors in the same row and the
same pair of columns still cancel out, so detection is not absolute.

### Checksum

Used by IP, TCP and UDP. The data is split into *n*-bit words, added in one's
complement arithmetic, and the complement of the sum is transmitted.

```text diagram: a 4-bit checksum, end to end
   SENDER                                RECEIVER
   1101                                  1101
 + 1011                                + 1011
 ------                               + 0110   <- the checksum
  11000   carry out of 4 bits          ------
   1000 + 1 = 1001   (wrap the carry)   11110 -> 1110 + 1 = 1111
   complement -> 0110 = checksum        complement -> 0000 -> accept
```

If any bit changed, the final result is non-zero and the frame is discarded.
The checksum is easy to compute in software but misses errors that cancel each
other out in the sum.

### Cyclic redundancy check (CRC)

The strongest of the detection methods, and the one used by Ethernet, Wi-Fi and
disk storage. The data is treated as a binary polynomial and divided — modulo 2,
so subtraction is XOR — by an agreed **generator polynomial**. The remainder is
the CRC, appended to the frame. The receiver divides the whole frame by the
same generator: a zero remainder means accept.

```text diagram: CRC for data 100100 with generator 1101 (x^3 + x + 1)
                    1 1 1 1 0 1          <- quotient, discarded
                  ---------------
        1 1 0 1  ) 1 0 0 1 0 0 0 0 0     <- data + 3 appended zeros
                   1 1 0 1
                   -------
                   0 1 0 0 0
                     1 1 0 1
                     -------
                     0 1 0 1 0
                       1 1 0 1
                       -------
                       0 1 1 1 0
                         1 1 0 1
                         -------
                         0 0 1 1 0 0
                             1 1 0 1
                             -------
                             0 0 0 1     <- remainder = CRC = 001

   transmitted frame:  100100 001
   receiver divides 100100001 by 1101 -> remainder 000 -> accept
```

The number of appended zeros is one less than the length of the generator, so a
4-bit generator produces a 3-bit CRC. A well-chosen generator catches all
single-bit errors, all double-bit errors, every burst shorter than the CRC
itself, and all odd-numbered bursts.

> [!TIP]
> Standard generators: **CRC-8** for ATM headers, **CRC-16** for HDLC and
> Modbus, **CRC-32** for Ethernet, PNG and ZIP.

### Correction: the two strategies

Detection alone is useless unless the frame can be repaired or replaced. There
are exactly two ways.

#### Backward error correction (ARQ)

The receiver detects the error and asks for a retransmission. Cheap in
redundancy, expensive in delay, and useless where there is no return path.

```text diagram: the three ARQ schemes after frame 2 is lost
   STOP-AND-WAIT
     S:  1 --> ack --> 2 --> (lost) ... timeout ... 2 --> ack
     One frame outstanding. Simplest, and it leaves the link idle most
     of the time.

   GO-BACK-N
     S:  1  2  3  4  5          R: discards 3, 4, 5 after 2 goes missing
     S:  2  3  4  5  again      Window of N, receiver needs no buffer.

   SELECTIVE REPEAT
     S:  1  2  3  4  5          R: buffers 3, 4, 5 and NAKs 2
     S:  2  only                Efficient, but needs buffers and reordering.
```

#### Forward error correction (FEC)

Enough redundancy is sent that the receiver can locate and repair the error
itself, with no retransmission. Essential for satellite links, broadcast and
storage — anywhere a retransmission is impossible or too slow.

### Hamming code

The classic FEC block code. Parity bits go at the power-of-two positions
(1, 2, 4, 8, …) and each one checks every position whose index includes its own
bit. For *m* data bits the number of parity bits *r* satisfies `2^r >= m+r+1`,
so 4 data bits need 3 parity bits — the (7,4) code.

```text diagram: (7,4) Hamming code for the data 1011
   position    1    2    3    4    5    6    7
   holds      P1   P2   D1   P4   D2   D3   D4
   data                 1         0    1    1

   P1 checks 1,3,5,7 -> 1,0,1 -> two 1s  -> P1 = 0
   P2 checks 2,3,6,7 -> 1,1,1 -> three 1s -> P2 = 1
   P4 checks 4,5,6,7 -> 0,1,1 -> two 1s  -> P4 = 0

   codeword sent   :  0  1  1  0  0  1  1
   bit 5 is flipped:  0  1  1  0  1  1  1

   C1 over 1,3,5,7 = 0,1,1,1 -> odd  -> 1
   C2 over 2,3,6,7 = 1,1,1,1 -> even -> 0
   C4 over 4,5,6,7 = 0,1,1,1 -> odd  -> 1

   syndrome C4 C2 C1 = 1 0 1 = 5   ->  flip bit 5, the word is repaired
   a syndrome of 000 means no error was found
```

### Hamming distance

The **Hamming distance** between two codewords is the number of positions in
which they differ — `d(x,y)` is the number of 1s in `x XOR y`. The **minimum
Hamming distance** `d_min` of a code is the smallest distance between any two
of its valid codewords, and it decides everything:

| Goal | Requirement |
| --- | --- |
| Detect up to *s* errors | `d_min >= s + 1` |
| Correct up to *t* errors | `d_min >= 2t + 1` |

A simple parity code has `d_min = 2`, so it detects one error and corrects
none. The (7,4) Hamming code has `d_min = 3`, so it detects two errors or
corrects one.

### The techniques compared

| Technique | Redundancy | Detects | Corrects |
| --- | --- | --- | --- |
| Parity (VRC) | 1 bit | Odd-numbered errors | No |
| 2-D parity (LRC) | 1 row + 1 column | Most burst errors | One bit |
| Checksum | 16 bits typically | Most errors; misses cancelling ones | No |
| CRC | 8–32 bits | Nearly all, including bursts | No |
| Hamming | r bits, `2^r >= m+r+1` | Two bits | One bit |
| Reed–Solomon | Varies | Long bursts | Long bursts |

## Quick revision

> [!TIP]
> **One-line answers.** Circuit switching reserves a path and wastes it during
> silence. Packet switching shares the link and pays in jitter. A modem
> modulates digital data onto an analogue carrier and back. Detection finds an
> error, correction repairs it — either by asking again (ARQ) or by carrying
> enough redundancy to fix it in place (FEC).

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: bit rate equals baud rate
> **only** at one bit per symbol; a virtual circuit is packet switching, not
> circuit switching; CRC **detects** but never corrects; the Hamming syndrome
> is read as a binary *position number*, not as a count; and `d_min >= 2t + 1`
> is for correction while `d_min >= s + 1` is for detection.
