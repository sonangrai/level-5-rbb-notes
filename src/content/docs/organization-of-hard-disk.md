---
title: "Organization of hard disk"
summary: Platters, tracks, sectors and cylinders; capacity and access-time calculations; partitions and file systems; and how the OS schedules disk requests.
section: computer-architecture
order: 2
tags: [architecture, storage, hard-disk, operating-system]
updatedAt: "2026-10-07"
---

A hard disk drive (HDD) is a **non-volatile, magnetic, direct-access**
secondary storage device. It stores data as magnetised spots on spinning
platters and reads them with heads that float a few nanometres above the
surface. Understanding its organisation is about two views of the same disk:
the **physical** one (platters, tracks, sectors) and the **logical** one the
operating system sees (partitions, file systems, blocks).

## Physical structure

```text diagram: inside a hard disk drive
               spindle (motor, 5400 / 7200 / 10000 / 15000 RPM)
                    │
          ┌─────────┼─────────┐ ◄── platter 1, top surface    ◄── head 0
          └─────────┼─────────┘     platter 1, bottom surface ◄── head 1
          ┌─────────┼─────────┐ ◄── platter 2, top surface    ◄── head 2
          └─────────┼─────────┘     platter 2, bottom surface ◄── head 3
                    │                                              │
                                     all heads on one actuator arm ┘
                                     and move together
```

| Component | Description |
| --- | --- |
| Platter | A rigid circular disk of aluminium or glass coated with magnetic material; a drive has one or more stacked on one spindle |
| Surface | Each side of a platter; usually both sides store data |
| Spindle | The shaft that spins all platters together at a constant speed (RPM) |
| Read/write head | One per surface; magnetises the surface to write and senses it to read. It flies on a cushion of air and never touches the surface in normal operation |
| Actuator arm | Holds the heads and moves them across the surfaces; all heads move together |
| Actuator (voice coil) | The motor that positions the arm |
| Disk controller | Electronics that translate OS requests into head movements and manage the cache buffer |

> [!WARNING]
> If a head touches the platter — a **head crash** — it scratches the
> magnetic coating and destroys data. This is why HDDs are sensitive to shocks
> and why heads are "parked" in a safe zone when power is removed.

## Tracks, sectors, cylinders and clusters

```text diagram: the surface of one platter
                ┌───────────────────────────┐
             ╱      track 0 (outermost)      ╲
           ╱    ╱───────────────────────╲      ╲
          │   ╱      track 1               ╲    │
          │  │    ╱────────────────╲        │   │       sector = one "slice"
          │  │   │    ( spindle )   │  ◄─── ┼───┼──     of a track
          │  │    ╲────────────────╱        │   │
          │   ╲                            ╱    │
           ╲    ╲───────────────────────╱      ╱
             ╲                                ╱
                └───────────────────────────┘
```

| Term | Meaning |
| --- | --- |
| Track | A concentric circle on a surface; numbered from 0 at the outer edge |
| Sector | A pie-shaped division of a track — the **smallest physical unit** that can be read or written. Traditionally **512 bytes**; modern "Advanced Format" drives use **4096 bytes (4 KB)** |
| Cylinder | The set of tracks at the same position on **every** surface. Data in one cylinder can be read without moving the heads |
| Cluster / block | The **smallest logical unit** the file system allocates — a group of sectors (e.g. 8 sectors = 4 KB) |

Each sector carries more than data: a header with its address and
synchronisation bits, the data area, and an **error-correcting code (ECC)**,
separated from the next sector by a small gap.

### Zoned bit recording

Outer tracks are longer than inner ones. Early drives used the same number of
sectors per track everywhere, wasting the outer tracks. Modern drives use
**zoned bit recording (ZBR)**: the disk is divided into zones, and outer zones
hold more sectors per track. As a result, the outer edge transfers data faster.

## Disk capacity

```text diagram: capacity formula
  Capacity = surfaces × tracks per surface × sectors per track × bytes per sector

  Example: 4 platters (8 surfaces), 1 000 tracks, 100 sectors per track, 512 bytes
         = 8 × 1 000 × 100 × 512
         = 409 600 000 bytes ≈ 409.6 MB
```

> [!NOTE]
> Drive makers use decimal units (1 GB = 10⁹ bytes) while operating systems
> often report binary units (1 GiB = 2³⁰ bytes). That is why a "1 TB" drive
> shows up as roughly 931 GB in Windows.

## Disk addressing: CHS and LBA

- **CHS (Cylinder–Head–Sector)** — the original scheme; a sector is named by
  its cylinder, its head (surface) and its sector number. Sectors are numbered
  from **1**, cylinders and heads from **0**. It limits old BIOS-era drives to
  about 8 GB.
- **LBA (Logical Block Addressing)** — every sector gets a single number
  starting from 0, and the drive controller maps it to the physical location.
  All modern drives use LBA.

## Disk access time

Reading a sector takes three steps: move the head to the right track, wait for
the sector to rotate underneath, then read it.

```text diagram: components of access time
  Access time = seek time + rotational latency + transfer time

  Seek time            move the arm to the correct track          (avg 4–10 ms)
  Rotational latency   wait for the sector to arrive under head   (avg ½ rotation)
  Transfer time        read the sector as it passes               (very small)
```

**Worked example.** A 7200 RPM disk with an average seek time of 6 ms:

```text diagram: average access time of a 7200 RPM disk
  one rotation             = 60 s ÷ 7200 = 8.33 ms
  avg rotational latency   = 8.33 ÷ 2   = 4.17 ms
  average access time      ≈ 6 + 4.17   = 10.17 ms   (transfer time ignored)
```

Seek time dominates, which is why the OS tries to **reduce head movement**
with disk scheduling (below).

## Logical organisation

Before a disk can store files it goes through three stages.

```text diagram: from blank platter to usable drive
  1. Low-level (physical) formatting   factory marks tracks and sectors
                │
  2. Partitioning                      divide the disk into logical drives
                │                      (MBR or GPT partition table)
  3. High-level (logical) formatting   write a file system into each partition
                                       (NTFS, FAT32, exFAT, ext4, APFS …)
```

### Partitioning: MBR vs GPT

A **partition** is a logical division of a physical disk that the OS treats as
a separate drive (C:, D:). The partition table at the start of the disk
describes them.

| | MBR (Master Boot Record) | GPT (GUID Partition Table) |
| --- | --- | --- |
| Location | First sector (LBA 0), 512 bytes | LBA 1 onwards, with a backup copy at the end of the disk |
| Layout | 446 B boot code + 64 B partition table (4 × 16 B) + 2 B signature `55 AA` | Header + array of partition entries |
| Partitions | 4 primary, or 3 primary + 1 extended (holding logical drives) | 128 by default in Windows |
| Maximum disk size | 2 TB (with 512-byte sectors) | About 9.4 ZB — effectively unlimited |
| Firmware | Legacy BIOS | UEFI |
| Reliability | Single copy; corruption loses the table | Backup header and CRC checks |

### Boot process in brief

On power-on, firmware (BIOS or UEFI) runs the **POST** self-test, then reads
the boot record of the disk. With MBR, the 446-byte boot code loads the
**boot sector** of the active partition, which loads the operating system's
boot loader. With GPT/UEFI, firmware loads the boot loader directly from the
**EFI System Partition**.

### File systems

A file system organises a partition into files and directories, tracks which
clusters are free, and records which clusters each file uses.

| File system | Used by | Maximum file size | Note |
| --- | --- | --- | --- |
| FAT32 | Pen drives, older Windows | 4 GB | Uses a File Allocation Table; very widely compatible |
| exFAT | SD cards, flash drives | Practically unlimited | FAT successor for large removable media |
| NTFS | Windows | Practically unlimited | Journaling, permissions, encryption, compression |
| ext4 | Linux | 16 TB | Journaling; uses inodes |
| APFS | macOS, iOS | Practically unlimited | Optimised for SSDs; snapshots |

Because a file always occupies whole clusters, the unused tail of its last
cluster is wasted — **slack space**. When a file's clusters are scattered
across the disk it is **fragmented**, forcing extra seeks; **defragmentation**
rearranges files into contiguous clusters. SSDs do not need, and should not
be given, defragmentation.

## Disk scheduling

Many processes issue disk requests at once. The OS orders the queue to
**minimise total head movement (seek time)**.

The standard example: cylinders 0–199, head at **53**, request queue
**98, 183, 37, 122, 14, 124, 65, 67**.

| Algorithm | How it works | Order of service | Head movement |
| --- | --- | --- | --- |
| FCFS | First come, first served | 98, 183, 37, 122, 14, 124, 65, 67 | **640** |
| SSTF | Shortest seek time first — nearest request next | 65, 67, 37, 14, 98, 122, 124, 183 | **236** |
| SCAN (elevator) | Sweep to one end of the disk, then reverse (here towards 0 first) | 37, 14, *0*, 65, 67, 98, 122, 124, 183 | **236** |
| LOOK | Like SCAN, but reverse at the last request instead of the disk end | 37, 14, 65, 67, 98, 122, 124, 183 | **208** |
| C-SCAN | Sweep one way (here towards 199), jump back to 0, sweep again | 65 … 183, *199*, *0*, 14, 37 | **382** (183 without the return jump) |
| C-LOOK | Like C-SCAN, but turn at the last request | 65 … 183, jump to 14, 37 | **322** (153 without the return jump) |

```text diagram: SSTF head movement (head starts at 53)
  0    14   37   53 65 67        98     122 124            183   199
  ├────┼────┼────┼──┼──┼─────────┼───────┼──┼───────────────┼─────┤
                 ●──►──►
            ◄────────────┘
       ◄────┘
       └───────────────────────►─────────►──►───────────────►
```

> [!CAUTION]
> SSTF gives low average seek time but can **starve** requests far from the
> head. SCAN and C-SCAN avoid starvation; C-SCAN gives the most **uniform
> waiting time**. Textbooks differ on whether the C-SCAN return jump counts as
> head movement — state your assumption in an exam answer.

## RAID

**RAID (Redundant Array of Independent Disks)** combines several disks into
one logical unit for speed, fault tolerance, or both.

| Level | Technique | Minimum disks | Fault tolerance | Usable capacity |
| --- | --- | --- | --- | --- |
| RAID 0 | Striping | 2 | None — one failure loses everything | 100 % |
| RAID 1 | Mirroring | 2 | One disk can fail | 50 % |
| RAID 5 | Striping with distributed parity | 3 | One disk can fail | (n − 1) / n |
| RAID 6 | Striping with double parity | 4 | Two disks can fail | (n − 2) / n |
| RAID 10 | Mirroring + striping | 4 | One per mirrored pair | 50 % |

## HDD vs SSD

| | HDD | SSD |
| --- | --- | --- |
| Technology | Magnetic platters, moving heads | NAND flash memory, no moving parts |
| Access time | ~5–10 ms | ~0.1 ms |
| Speed | ~100–250 MB/s | ~500 MB/s (SATA) to several GB/s (NVMe) |
| Durability | Sensitive to shock | Shock resistant; limited write cycles |
| Noise and power | Audible; more power | Silent; less power |
| Cost per GB | Lower | Higher |
| Capacity | Very large | Large, growing |

## Quick revision

> [!TIP]
> **One-line answers.** Track = concentric circle; sector = smallest physical
> unit (512 B or 4 KB); cylinder = same track on all surfaces; cluster =
> smallest logical unit. Access time = seek + rotational latency + transfer.
> Average rotational latency = half a rotation. MBR = 4 primary partitions,
> 2 TB; GPT = 128 partitions, UEFI.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: a hard disk is a
> **direct-access** (not sequential) device — tape is sequential; tracks are
> numbered from **0** at the **outer** edge; CHS sectors start at **1**;
> seek time is usually the **largest** part of access time; MBR occupies the
> **first sector** and ends with signature **55 AA**; FAT32 cannot hold a file
> above **4 GB**; SSTF can cause **starvation**; RAID 0 has **no**
> redundancy.
