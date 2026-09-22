---
title: "Networking devices: repeater, hub, switch, router"
summary: What each box actually does to a frame, the layer it works at, and the domains it creates.
section: networks
order: 1
tags: [networking, osi, hardware]
updatedAt: "2026-09-22"
---

Every device on this page moves data from one place to another, and the only
thing that really separates them is **how deep into the frame each one looks**.
A repeater reads voltage, a hub reads nothing, a switch reads the MAC address,
a router reads the IP address. Depth costs time and buys intelligence — that
trade is the whole story.

## Where each device sits

The OSI layer a device works at decides what it can inspect, what it can filter,
and what it must blindly pass on.

```text diagram: device placement on the OSI stack
  OSI layer                      Devices that live here
  ──────────────────────────────────────────────────────────────
  7  Application     ┐
  6  Presentation    ├─ Gateway, proxy, firewall (application)
  5  Session         ┘
  4  Transport       ── Layer-4 load balancer
  3  Network         ── ROUTER, layer-3 switch, brouter
  2  Data link       ── SWITCH, bridge, NIC, access point
  1  Physical        ── REPEATER, HUB, cable, modem, transceiver
```

| Device | Layer | Reads | Forwarding decision |
| --- | --- | --- | --- |
| Repeater | 1 — Physical | Signal only | None; repeats everything |
| Hub | 1 — Physical | Signal only | None; floods every other port |
| Bridge | 2 — Data link | MAC address | Per-segment, in software |
| Switch | 2 — Data link | MAC address | Per-port, in hardware (ASIC) |
| Router | 3 — Network | IP address | Best path from the routing table |

> [!NOTE]
> A device at layer *n* also performs everything below it. A switch repeats and
> regenerates signals like a repeater, then goes further and reads addresses.

## Repeater

A repeater is a two-port physical-layer device that takes a weakened, distorted
signal off one segment and puts a full-strength, correctly-timed copy onto the
next. It exists because copper and fibre both suffer **attenuation** — signal
loss over distance — and because noise accumulates along the way.

```text diagram: a repeater rebuilds a weakened signal, bit by bit
    PC A                    REPEATER                     PC B
      |                        |                           |
      |   ####   ->   ..::..   ->  [ reshape · retime ] ->  ####
      |  strong     attenuated          regenerated        strong
      +---- segment 1 (100 m) ----+---- segment 2 (100 m) ----+
```

### Regeneration, not amplification

This is the classic exam distinction:

- An **amplifier** is analogue. It multiplies whatever arrives, so the noise
  riding on the signal is amplified along with it.
- A **repeater** is digital. It decides whether each incoming bit was a 1 or a
  0, then transmits a brand-new, clean pulse. Noise is discarded rather than
  magnified.

### Properties worth remembering

- Extends the physical length of a LAN segment; it does **not** extend the
  network logically — both sides stay one network, one collision domain and
  one broadcast domain.
- No addressing, no filtering, no buffering. It cannot tell one host from
  another, so it cannot reduce traffic.
- Introduces a small propagation delay, which is why the count is capped.
- Both segments must use the same access method and (traditionally) the same
  media type; a repeater joins Ethernet to Ethernet, never Ethernet to
  Token Ring.

### The 5-4-3 rule

For legacy 10 Mbps Ethernet (10BASE5 / 10BASE2), a path between any two hosts
may cross at most:

- **5** segments,
- **4** repeaters,
- **3** of which may be *populated* with hosts (the other 2 are link segments
  used purely for distance).

The rule exists to keep round-trip propagation delay inside the collision
detection window — beyond it, CSMA/CD stops detecting collisions reliably.

## Hub

A hub is a **multiport repeater**. A frame arriving on one port is regenerated
and pushed out of *every* other port, with no examination of addresses at all.
Physically the wiring is a star; electrically it behaves as a single shared bus.

```text diagram: a hub repeats every frame to every other port
              +-----------------------------+
   A  ------->| 1                           |
              |            H U B            |
   B  <~~~~~~~| 2     (shared medium)       |
   C  <~~~~~~~| 3                           |
   D  <~~~~~~~| 4                           |
              +-----------------------------+

   A sends one frame addressed to C.
   B, C and D all receive it; B and D discard it in their NICs.
   Only one host may transmit at a time — everyone shares the bandwidth.
```

### Consequences of flooding

- **One collision domain.** If two hosts transmit together the signals overlap
  and both frames are destroyed. Ethernet recovers with CSMA/CD: listen before
  sending, detect the collision, send a jam signal, back off for a random
  interval, retry.
- **Half duplex.** A host cannot send and receive at once, because its own
  transmission would collide with the incoming one.
- **Shared bandwidth.** A 10 Mbps hub with 10 active hosts gives roughly
  1 Mbps each, and throughput *falls* as load rises because collisions rise.
- **No security.** Every host's NIC sees every frame, so a card in promiscuous
  mode captures all traffic on the segment.

### Types of hub

| Type | Behaviour |
| --- | --- |
| Passive | Splits the signal only — no power, no regeneration |
| Active | Regenerates and retimes the signal (a true multiport repeater) |
| Intelligent / managed | Active, plus management, monitoring and stacking |

> [!WARNING]
> Hubs are obsolete in production networks and are no longer manufactured. They
> survive in exams as the contrast that makes a switch's behaviour meaningful.

## Switch

A switch is a multiport bridge that forwards frames using the **destination MAC
address**, in hardware, at wire speed. It keeps a **MAC address table** (also
called a CAM table or forwarding table) mapping addresses to ports.

```text diagram: a switch forwards only to the port that owns the address
   MAC address table              +-----+
   +-------------------+------+   |  1  |--- A   (AA:..:01)
   | AA:BB:CC:00:00:01 | Fa0/1|   |  2  |--- B   (AA:..:02)
   | AA:BB:CC:00:00:02 | Fa0/2|   |  3  |--- C   (AA:..:03)
   | AA:BB:CC:00:00:03 | Fa0/3|   |  4  |--- D   (AA:..:04)
   | AA:BB:CC:00:00:04 | Fa0/4|   +-----+
   +-------------------+------+    SWITCH

   A -> C : the frame enters port 1, the table says :03 is on port 3,
            so it leaves port 3 and nowhere else.
            B and D hear nothing, and may talk to each other at the
            same instant. Four ports = four collision domains.
```

### How the table is built

A switch starts with an empty table and learns by observation:

1. **Learning** — for every frame received, record the *source* MAC address
   against the port it arrived on, with an ageing timer (300 s by default).
2. **Flooding** — if the *destination* is unknown, or is a broadcast
   (`FF:FF:FF:FF:FF:FF`) or multicast address, send it out of every port except
   the one it came in on. This is why a switch's first frame to a new host
   behaves like a hub's.
3. **Forwarding** — if the destination is known, send it out of that one port.
4. **Filtering** — if the destination is known and sits on the *same* port the
   frame arrived on, drop it; the two hosts can hear each other already.

### Forwarding methods

| Method | Waits for | Latency | Error checking |
| --- | --- | --- | --- |
| Store-and-forward | The entire frame | Highest | Full CRC; bad frames dropped |
| Cut-through | First 6 bytes (destination MAC) | Lowest | None; forwards runts and errors |
| Fragment-free | First 64 bytes | Middle | Catches collision fragments |

### What a switch gives you

- **Micro-segmentation** — one collision domain per port, so with full duplex
  collisions disappear entirely and CSMA/CD is switched off.
- **Dedicated bandwidth** — each port gets the full link rate rather than a
  share, and full duplex doubles the usable throughput.
- **Simultaneous conversations** — the switching fabric carries many
  port-to-port transfers at once.
- **VLANs** — ports can be grouped into separate logical LANs, splitting one
  physical switch into several broadcast domains. Traffic between VLANs needs a
  router or a layer-3 switch.
- **STP** — the Spanning Tree Protocol blocks redundant links so that a loop
  between switches cannot cause a broadcast storm.

### Layer-2 versus layer-3 switch

A layer-3 switch adds routing between VLANs in the same ASIC hardware. It
routes like a router but is optimised for high-speed LAN traffic, typically
lacking the WAN interfaces and the wide protocol support of a real router.

## Router

A router connects **different networks** and forwards packets using the
destination **IP address**. Where a switch asks "which port owns this MAC?", a
router asks "which of my neighbours is closest to this network?".

```text diagram: a router joins two networks and stops broadcasts
   Network A - 192.168.1.0/24            Network B - 10.0.0.0/24

       PC1     PC2                          PC3     PC4
        |       |                            |       |
        +---+---+                            +---+---+
          Switch A                             Switch B
             |                                    |
             | Fa0/0                        Fa0/1 |
             | 192.168.1.1              10.0.0.1  |
             +-------------- ROUTER --------------+

   PC1 -> PC2 : same network, the switch handles it; the router never sees it.
   PC1 -> PC3 : different network, so PC1 sends the frame to its default
                gateway 192.168.1.1 and the router forwards it on.
   PC1's ARP broadcast reaches PC2 only — a router never forwards broadcasts.
```

### What happens to a packet

1. The frame arrives; the router strips the layer-2 header.
2. It reads the destination IP and looks it up in the routing table, choosing
   the entry with the **longest matching prefix** (the most specific route).
3. It decrements the TTL and discards the packet if TTL reaches zero, returning
   an ICMP "time exceeded" message. This is what kills routing loops.
4. It recalculates the header checksum, builds a **new** layer-2 frame for the
   outgoing interface, and transmits it.

The source and destination IP addresses stay the same end to end; the MAC
addresses are rewritten at every hop.

### The routing table

| Destination | Mask | Next hop | Interface | Metric |
| --- | --- | --- | --- | --- |
| 192.168.1.0 | /24 | directly connected | Fa0/0 | 0 |
| 10.0.0.0 | /24 | directly connected | Fa0/1 | 0 |
| 172.16.0.0 | /16 | 10.0.0.2 | Fa0/1 | 2 |
| 0.0.0.0 | /0 | 10.0.0.254 | Fa0/1 | 1 |

The last row is the **default route** — where anything unmatched goes.

### Static versus dynamic routing

| | Static | Dynamic |
| --- | --- | --- |
| Built by | An administrator, by hand | A routing protocol |
| Adapts to failure | No | Yes, by reconverging |
| Overhead | None | CPU, memory and bandwidth |
| Suits | Small or stub networks | Large, changing networks |

Dynamic protocols fall into two families: **distance vector** (RIP, EIGRP —
each router tells its neighbours the whole table) and **link state** (OSPF,
IS-IS — each router floods link information and computes shortest paths with
Dijkstra's algorithm). **BGP** is the path-vector protocol that routes between
autonomous systems on the internet.

### Other router functions

- **Broadcast containment** — each interface is its own broadcast domain.
- **NAT / PAT** — translates private addresses to a public one.
- **DHCP** server or relay, and DNS forwarding on small routers.
- **ACLs and firewalling** — filter by address, protocol or port.
- **WAN connectivity** — joins dissimilar media and protocols, LAN to leased
  line, fibre or cellular.

## Collision and broadcast domains

This comparison is the single most examined point on the topic.

| Device with *n* ports | Collision domains | Broadcast domains |
| --- | --- | --- |
| Repeater (2 ports) | 1 | 1 |
| Hub | 1 | 1 |
| Bridge / switch | *n* | 1 (per VLAN) |
| Router | *n* | *n* |

- A **collision domain** is the set of interfaces whose transmissions can
  collide. Switches break it up; hubs do not.
- A **broadcast domain** is the set of interfaces a broadcast frame reaches.
  Only a router — or a VLAN boundary on a switch — breaks it up.

## Comparison at a glance

| | Repeater | Hub | Switch | Router |
| --- | --- | --- | --- | --- |
| OSI layer | 1 | 1 | 2 | 3 |
| Ports | 2 | Many | Many | Few, often mixed media |
| Address used | None | None | MAC | IP |
| Data unit | Bit / signal | Bit / signal | Frame | Packet |
| Forwarding | Repeat all | Flood all | Learn, then forward | Best path lookup |
| Duplex | Half | Half | Full | Full |
| Bandwidth | Shared | Shared | Dedicated per port | Dedicated per port |
| Collision domains | 1 | 1 | One per port | One per port |
| Broadcast domains | 1 | 1 | 1 (per VLAN) | One per interface |
| Filters traffic | No | No | Yes, by MAC | Yes, by IP / ACL |
| Connects | Two segments | Hosts in one LAN | Hosts in one LAN | Different networks |
| Table kept | None | None | MAC address table | Routing table |
| Cost / latency | Lowest | Low | Medium | Highest |

## Related devices

- **Bridge** — the switch's two-port ancestor; same layer-2 logic but forwards
  in software, so it is far slower.
- **Gateway** — operates up to layer 7 and translates between *different*
  protocol stacks, for example a mail gateway between two messaging systems. In
  everyday speech "default gateway" just means the router a host sends
  off-network traffic to.
- **Brouter** — bridges what it cannot route and routes what it can.
- **Modem** — modulates and demodulates, converting digital data to an analogue
  carrier and back. Layer 1.
- **NIC** — the host's own layer-2 interface, carrying the burned-in MAC
  address.
- **Access point** — a layer-2 device that bridges wireless clients onto a
  wired LAN; essentially a wireless switch that behaves like a hub, because the
  radio medium is shared.

## Quick revision

> [!TIP]
> **One-line answers.** Repeater = regenerates a signal over distance.
> Hub = multiport repeater, floods everything, one collision domain.
> Switch = multiport bridge, forwards by MAC, one collision domain per port.
> Router = joins networks, forwards by IP, blocks broadcasts.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: a repeater **regenerates**
> and does not merely amplify; a switch does **not** break broadcast domains
> unless VLANs are configured; a router **does** decrement TTL while a switch
> does not; and an unknown destination makes a switch flood, exactly like a hub.
