---
title: "Internet services and IP addressing"
summary: The services that run on top of TCP/IP, and the addressing scheme underneath them — classes, subnetting, CIDR, NAT and IPv6.
section: networks
order: 3
tags: [networking, internet, tcp-ip, ipv4, ipv6, subnetting]
updatedAt: "2026-09-25"
---

The internet is two things stacked. Underneath is a single addressing and
delivery scheme that every attached machine agrees on; on top of it sits an
open-ended set of services that assume the delivery works. This page takes the
top half first, because that is what people actually use, then goes down into
the addressing that makes it possible.

## Internet services

An internet service is an application-layer protocol running over TCP/IP,
almost always in the **client–server** model: a server waits on a well-known
port, a client opens a connection to it, and the two exchange messages in an
agreed format.

### The World Wide Web

The Web is one service among many — not a synonym for the internet. It is built
on **HTTP**, a stateless request–response protocol, and addresses resources
with a **URL**:

```text diagram: the parts of a URL
   https://www.example.com:443/docs/guide?page=2#intro
   \___/   \_____________/ \_/\_________/\_____/\____/
     |            |         |      |        |      |
   scheme       host      port    path    query  fragment
   (protocol)                                    (client-side only)
```

- **Methods** — `GET` retrieves, `POST` submits, `PUT` replaces, `PATCH`
  modifies, `DELETE` removes, `HEAD` fetches headers only.
- **Status codes** — `1xx` informational, `2xx` success (`200 OK`), `3xx`
  redirect (`301` permanent, `302` temporary), `4xx` client error (`400`,
  `401`, `403`, `404`), `5xx` server error (`500`, `503`).
- **HTTPS** is HTTP inside a **TLS** tunnel on port 443, giving encryption,
  integrity and server authentication through certificates.
- **Versions** — HTTP/1.1 added persistent connections; HTTP/2 added
  multiplexing and header compression over one TCP connection; HTTP/3 moves to
  **QUIC** over UDP to escape head-of-line blocking.

### Electronic mail

Mail splits into pushing a message out and pulling it down.

```text diagram: the path of one message
   Sender's client --SMTP--> Sender's mail server --SMTP--> Recipient's
                                                             mail server
                                                                  |
   Recipient's client <--POP3 or IMAP-------------------------- mailbox
```

- **SMTP** (port 25, or 587 for submission) pushes mail between servers. It
  only sends; it cannot retrieve.
- **POP3** (110) downloads and by default deletes from the server.
- **IMAP** (143) leaves mail on the server and synchronises state.
- **MIME** extends the plain-ASCII format so mail can carry non-English text,
  images, audio and attachments.

| | POP3 | IMAP |
| --- | --- | --- |
| Mail stored on | The client, after download | The server |
| Multiple devices | Poor — each sees a different mailbox | Designed for it |
| Offline access | Full | Needs caching |
| Server storage | Minimal | Grows with the mailbox |
| Folder management | Local only | Synchronised |

### File transfer

- **FTP** uses **two** connections: port 21 for commands and port 20 for data.
  In **active** mode the server opens the data connection back to the client,
  which firewalls usually block; in **passive** mode the client opens both,
  which is why passive is the default today.
- **TFTP** (69, over UDP) is a stripped-down version with no authentication,
  used for booting devices and loading firmware.
- **SFTP** (22) is file transfer inside SSH; **FTPS** is FTP wrapped in TLS.
  They are different things despite the similar names.

### Domain Name System

DNS maps names to addresses through a distributed hierarchy: root → top-level
domain → authoritative server.

```text diagram: resolving www.example.com from a cold cache
   1  The browser's stub resolver asks the recursive resolver (usually the ISP)
   2  Resolver asks a ROOT server           -> "ask the .com servers"
   3  Resolver asks a .com TLD server       -> "ask ns1.example.com"
   4  Resolver asks that AUTHORITATIVE
      name server                           -> "A record = 93.184.216.34"
   5  Resolver caches the answer for its TTL and returns it
   6  The browser opens a TCP connection to 93.184.216.34

   Step 1 is RECURSIVE   — the resolver promises a final answer.
   Steps 2-4 are ITERATIVE — each server refers, none chases on your behalf.
```

DNS uses **UDP port 53** for ordinary queries and switches to **TCP 53** for
zone transfers and responses too large for a datagram.

| Record | Holds |
| --- | --- |
| `A` / `AAAA` | IPv4 / IPv6 address for a name |
| `CNAME` | An alias pointing at another name |
| `MX` | Mail server for the domain, with a priority |
| `NS` | Authoritative name servers for the zone |
| `PTR` | Address to name, for reverse lookups |
| `SOA` | Zone's authority, serial number and timers |
| `TXT` | Free text, used by SPF, DKIM and domain verification |

### Automatic configuration

**DHCP** hands a host its address, mask, default gateway and DNS servers
through a four-message exchange.

```text diagram: DHCP, the DORA exchange
   CLIENT                                                    SERVER
     |  D  DISCOVER   broadcast: "is there a DHCP server?"       |
     |---------------------------------------------------------->|
     |  O  OFFER      "you may have 192.168.1.50"                 |
     |<----------------------------------------------------------|
     |  R  REQUEST    broadcast: "I accept that offer"            |
     |---------------------------------------------------------->|
     |  A  ACK        lease confirmed, with mask, gateway, DNS    |
     |<----------------------------------------------------------|

   Client uses UDP port 68, server UDP port 67. A relay agent forwards
   the broadcast when the server sits on another subnet.
```

If no server answers, the host self-assigns an **APIPA** address from
`169.254.0.0/16` — a link-local address that reaches the local segment and
nothing else. Seeing one in practice means DHCP failed.

### Other services

- **Remote login** — Telnet (23, plaintext) and SSH (22, encrypted). See
  [switching, modems and error control](/docs/switching-modems-error-control).
- **VoIP** — voice over IP, with SIP for signalling and RTP for the media.
- **Instant messaging and social networking** — XMPP and a great many
  proprietary protocols.
- **Usenet newsgroups** (NNTP, 119) and **IRC** (194) — the older discussion
  services, largely historical.
- **Search engines**, **e-commerce**, **e-banking**, **e-learning** and
  **e-governance** — services in the applied sense rather than new protocols.
- **Cloud services** — IaaS, PaaS and SaaS, reached over HTTPS.
- **Streaming**, using HTTP-based adaptive delivery rather than raw RTP today.

### Well-known ports

| Port | Service | Port | Service |
| --- | --- | --- | --- |
| 20 / 21 | FTP data / control | 110 | POP3 |
| 22 | SSH, SFTP, SCP | 123 | NTP |
| 23 | Telnet | 143 | IMAP |
| 25 | SMTP | 161 / 162 | SNMP |
| 53 | DNS | 443 | HTTPS |
| 67 / 68 | DHCP server / client | 993 / 995 | IMAPS / POP3S |
| 69 | TFTP | 3389 | RDP |
| 80 | HTTP | 1433 / 3306 / 5432 | SQL Server / MySQL / PostgreSQL |

Ports 0–1023 are **well known**, 1024–49151 are **registered**, and
49152–65535 are **dynamic** or ephemeral — the range a client draws its own
source port from.

## Internet protocol and addressing

### The TCP/IP model

```text diagram: TCP/IP beside OSI
   OSI                            TCP/IP                 Examples
   7  Application   )
   6  Presentation   >--------->  Application            HTTP, DNS, SMTP
   5  Session       )
   4  Transport     ----------->  Transport              TCP, UDP
   3  Network       ----------->  Internet               IP, ICMP, ARP
   2  Data link     )
   1  Physical       >--------->  Network access         Ethernet, Wi-Fi, PPP
```

**IP** is the internet layer's delivery protocol, and it is deliberately
minimal: **connectionless**, **unreliable** and **best-effort**. It does not
guarantee delivery, order or freedom from duplication. Anything stronger is the
job of TCP above it.

### The IPv4 datagram header

```text diagram: the IPv4 header, six rows of 32 bits
   row 1  [ Version 4 ][ IHL 4 ][ DSCP/ECN 8 ][ Total length 16 ]
   row 2  [ Identification 16 ][ Flags 3 ][ Fragment offset 13 ]
   row 3  [ TTL 8 ][ Protocol 8 ][ Header checksum 16 ]
   row 4  [ Source IP address 32 ]
   row 5  [ Destination IP address 32 ]
   row 6  [ Options 0-40 bytes ][ Padding ]      <- rows 1-5 are the usual 20 bytes
```

| Field | Purpose |
| --- | --- |
| Version | 4 for IPv4 |
| IHL | Header length in 32-bit words; 5 means no options |
| Total length | Header plus data, up to 65,535 bytes |
| Identification, Flags, Offset | Reassembling a fragmented datagram |
| TTL | Hop counter; at zero the packet dies and ICMP reports it |
| Protocol | What is inside — 1 ICMP, 6 TCP, 17 UDP |
| Header checksum | Covers the header only, and is recomputed at every hop |

### IPv4 addresses

An IPv4 address is **32 bits**, written as four decimal octets, and splits into
a **network part** and a **host part**. The split is what the **subnet mask**
records: a run of 1s for the network, then 0s for the host.

```text diagram: one address, two ways of writing the same split
   address   192 . 168 .  10 .  25
             11000000.10101000.00001010.00011001

   mask      255 . 255 . 255 .   0      =  /24
             11111111.11111111.11111111.00000000
             \______ network ________/ \_ host _/

   network   192.168.10.0      address AND mask
   broadcast 192.168.10.255    host bits all 1
   hosts     192.168.10.1 - 192.168.10.254
```

### Classful addressing

The original scheme fixed the split at an octet boundary, decided by the
leading bits.

| Class | Leading bits | First octet | Default mask | Networks | Hosts each |
| --- | --- | --- | --- | --- | --- |
| A | `0` | 1–126 | /8 | 126 | 16,777,214 |
| B | `10` | 128–191 | /16 | 16,384 | 65,534 |
| C | `110` | 192–223 | /24 | 2,097,152 | 254 |
| D | `1110` | 224–239 | — | Multicast | — |
| E | `1111` | 240–255 | — | Reserved | — |

Two are subtracted from every host count: the all-zeros address names the
network and the all-ones address is its broadcast.

#### Reserved and special ranges

| Range | Meaning |
| --- | --- |
| `0.0.0.0/8` | "This network"; `0.0.0.0` also means "any" or "unknown" |
| `127.0.0.0/8` | Loopback — `127.0.0.1` is always this machine |
| `10.0.0.0/8` | Private (RFC 1918) |
| `172.16.0.0/12` | Private — 172.16 through 172.31 |
| `192.168.0.0/16` | Private |
| `169.254.0.0/16` | APIPA link-local, self-assigned when DHCP fails |
| `255.255.255.255` | Limited broadcast, never forwarded by a router |

### Subnetting

Classful addressing wasted enormous ranges, so the host part is borrowed from
to create smaller networks. Two formulas do all the work:

```text diagram: the arithmetic of subnetting
   number of subnets       = 2^n      n = bits borrowed from the host part
   usable hosts per subnet = 2^h - 2  h = host bits remaining
   block size              = 256 - (the interesting octet of the mask)
```

**Worked example — split `192.168.10.0/24` into four subnets.**
Four subnets need `2^n >= 4`, so borrow 2 bits: `/24` becomes `/26`, the mask
is `255.255.255.192`, and the block size is `256 - 192 = 64`. Six host bits
remain, so `2^6 - 2 = 62` usable hosts each.

| Subnet | Network | First host | Last host | Broadcast |
| --- | --- | --- | --- | --- |
| 1 | 192.168.10.0 | 192.168.10.1 | 192.168.10.62 | 192.168.10.63 |
| 2 | 192.168.10.64 | 192.168.10.65 | 192.168.10.126 | 192.168.10.127 |
| 3 | 192.168.10.128 | 192.168.10.129 | 192.168.10.190 | 192.168.10.191 |
| 4 | 192.168.10.192 | 192.168.10.193 | 192.168.10.254 | 192.168.10.255 |

**Worked example — which subnet holds `172.16.35.123/20`?**
A `/20` mask is `255.255.240.0`, so the interesting octet is the third and the
block size is `256 - 240 = 16`. The blocks run 0, 16, 32, 48 …, and 35 falls in
the block starting at 32.

```text diagram: locating the subnet
   network    172.16.32.0
   broadcast  172.16.47.255      (32 + 16 - 1 = 47 in the third octet)
   hosts      172.16.32.1  -  172.16.47.254
   count      2^12 - 2  =  4094
```

### CIDR, VLSM and supernetting

**CIDR** drops classes entirely and writes the prefix length explicitly —
`192.168.10.0/26` — so a network can be any size. **VLSM** applies different
masks inside one address block, giving a point-to-point link a `/30` (two
usable addresses) while a user LAN takes a `/24`. **Supernetting** goes the
other way, aggregating adjacent blocks into one shorter prefix so the routing
table stays small: four consecutive `/24`s become a single `/22`.

### NAT

**NAT** translates private addresses to public ones at the network edge, which
is what has let IPv4 survive its address exhaustion.

```text diagram: PAT, one public address for a whole LAN
   192.168.1.10:4001 ---.                      .--- 93.184.216.34:80
   192.168.1.11:5210 ---+--> [ NAT ROUTER ] ---+
   192.168.1.12:3300 ---'    203.0.113.5       '--- the internet

   translation table
   192.168.1.10:4001  <->  203.0.113.5:60001
   192.168.1.11:5210  <->  203.0.113.5:60002
   192.168.1.12:3300  <->  203.0.113.5:60003
```

**Static NAT** is one-to-one, **dynamic NAT** draws from a pool, and **PAT**
(NAT overload) multiplexes many hosts onto one address by rewriting the port as
well. NAT conserves addresses and hides the internal topology, at the cost of
breaking end-to-end addressing and any protocol that carries addresses in its
payload.

### IPv6

IPv6 raises the address to **128 bits**, written as eight groups of four hex
digits. Two abbreviation rules apply:

```text diagram: abbreviating an IPv6 address
   full      2001:0db8:0000:0000:0000:ff00:0042:8329
   rule 1    drop leading zeros in each group
             2001:db8:0:0:0:ff00:42:8329
   rule 2    replace the longest run of all-zero groups with ::
             2001:db8::ff00:42:8329          (:: may appear only once)
```

- **No broadcast.** Its work is done by multicast (`ff00::/8`) and the new
  **anycast**, which delivers to the nearest member of a group.
- **Address types** — global unicast (`2000::/3`), link-local (`fe80::/10`),
  unique local (`fc00::/7`), loopback (`::1`), unspecified (`::`).
- **Simpler header** — a fixed 40 bytes, with no checksum and no fragmentation
  by routers, so forwarding is cheaper.
- **Built-in features** — IPsec support, stateless autoconfiguration (SLAAC)
  and **NDP**, which replaces ARP.
- **Transition** — dual stack, tunnelling (6to4, Teredo) and translation
  (NAT64).

| | IPv4 | IPv6 |
| --- | --- | --- |
| Size | 32 bits | 128 bits |
| Notation | Dotted decimal | Colon-separated hex |
| Address space | ~4.3 × 10⁹ | ~3.4 × 10³⁸ |
| Header | 20–60 bytes, variable | 40 bytes, fixed |
| Checksum | Yes, in the header | None |
| Broadcast | Yes | No — multicast and anycast |
| Configuration | Manual or DHCP | SLAAC or DHCPv6 |
| Fragmentation | Sender or router | Sender only |
| IPsec | Optional | Part of the design |

### The supporting protocols

| Protocol | Job |
| --- | --- |
| **ARP** | Finds the MAC address for a known IP on the local link |
| **RARP** | The reverse; superseded by BOOTP and DHCP |
| **ICMP** | Error and diagnostic messages — `ping`, `traceroute` |
| **IGMP** | Manages multicast group membership |

### TCP and UDP

| | TCP | UDP |
| --- | --- | --- |
| Connection | Established first (three-way handshake) | None |
| Reliability | Acknowledged, retransmitted, ordered | Best effort |
| Flow / congestion control | Yes | No |
| Header | 20 bytes minimum | 8 bytes |
| Speed | Lower | Higher |
| Used by | HTTP, SMTP, FTP, SSH | DNS, DHCP, TFTP, VoIP, streaming |

The TCP handshake is **SYN → SYN-ACK → ACK**; teardown is the four-way
**FIN → ACK → FIN → ACK**.

## Quick revision

> [!TIP]
> **One-line answers.** An internet service is an application protocol on a
> well-known port. IP is connectionless, unreliable and best-effort. A subnet
> mask marks where the network part ends. `2^n` subnets, `2^h - 2` hosts. NAT
> bought IPv4 time; IPv6 fixes the problem.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: the Web is a service *on*
> the internet, not the internet; SMTP only **sends**, so retrieval needs POP3
> or IMAP; FTP needs **two** ports while SFTP is SSH and needs one; DNS is UDP
> 53 but uses TCP for zone transfers; `127.0.0.1` is loopback while
> `169.254.x.x` means DHCP failed; the first and last address of any subnet are
> never assignable; and IPv6 has **no broadcast** at all.
