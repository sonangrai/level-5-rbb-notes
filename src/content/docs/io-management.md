---
title: "I/O management, interfaces, request handling and devices"
summary: Kinds of I/O devices, why an I/O interface is needed, programmed vs interrupt-driven I/O vs DMA, and the path an I/O request takes through the operating system.
section: computer-architecture
order: 4
tags: [architecture, io, interrupts, dma, operating-system]
updatedAt: "2026-10-07"
---

Input/output is how a computer talks to everything outside the CPU and
memory — keyboards, disks, printers, networks. The difficulty is
**variety**: devices differ wildly in speed, data format and signalling, and
all of them are far slower than the CPU. I/O management is the hardware and
operating-system machinery that hides those differences and keeps the CPU
from wasting its time waiting.

## I/O devices

### By function

| Category | Examples |
| --- | --- |
| Input | Keyboard, mouse, scanner, microphone, webcam, barcode reader, joystick, light pen, touch pad |
| Output | Monitor, printer, plotter, speaker, projector |
| Input and output | Touchscreen, network card, modem, disk drive, pen drive, headset |
| Storage | Hard disk, SSD, optical disc, magnetic tape |

### By how data is transferred

| | Block device | Character device | Network device |
| --- | --- | --- | --- |
| Data unit | Fixed-size blocks (e.g. 512 B, 4 KB) | A stream of bytes, one at a time | Packets |
| Random access | Yes — can seek to any block | No — sequential | No |
| Examples | Hard disk, SSD, USB drive | Keyboard, mouse, serial port, printer | Network interface card |
| Accessed through | File system | Byte read/write calls | Sockets |

### Data rates vary enormously

| Device | Approximate data rate |
| --- | --- |
| Keyboard | ~10 bytes/s |
| Mouse | ~100 bytes/s |
| Laser printer | ~100 KB/s |
| Hard disk | ~100–250 MB/s |
| Gigabit Ethernet | ~125 MB/s |
| NVMe SSD | several GB/s |
| Graphics display | tens of GB/s |

This spread — about nine orders of magnitude — is the core reason I/O needs
special handling.

## I/O interface

Peripheral devices cannot be connected directly to the system bus. An
**I/O interface** (also called an **I/O module**, **device controller** or
**adapter**) sits between them and resolves the differences.

```text diagram: where the I/O interface sits
   ┌─────┐      ┌────────┐
   │ CPU │      │ Memory │
   └──┬──┘      └───┬────┘
  ════╪═════════════╪════════════════╪══════════════════╪════  system bus
                                     │                  │
                              ┌──────┴──────┐    ┌──────┴──────┐
                              │ I/O module  │    │ I/O module  │
                              │ (keyboard   │    │ (disk       │
                              │ controller) │    │ controller) │
                              └──────┬──────┘    └──────┬──────┘
                                     │                  │
                                 keyboard            hard disk
```

### Why an interface is needed

- **Speed mismatch** — devices are much slower than the CPU; the interface
  buffers data so the CPU does not have to wait.
- **Different data formats** — devices may use serial bits, bytes or blocks,
  and different codes; the interface converts them.
- **Different signals** — devices are often electromechanical, with their own
  voltage levels and timing.
- **Many devices** — the CPU cannot have dedicated control logic for every
  possible device.

### Functions of an I/O module

| Function | Meaning |
| --- | --- |
| Control and timing | Coordinates traffic between internal resources and the device |
| CPU communication | Decodes commands, exchanges data, reports status (busy / ready / error), recognises its address |
| Device communication | Sends commands, receives status, transfers data to and from the device |
| Data buffering | Holds data temporarily to bridge the speed gap |
| Error detection | Detects mechanical and transmission errors (parity bits) and reports them |

### Structure of an I/O module

Every I/O module exposes a few **registers** to the CPU: a **data register**
(data in or out), a **status register** (ready, busy, error bits) and a
**control / command register** (what the device should do). The CPU drives
the device entirely by reading and writing these registers.

### Memory-mapped I/O vs isolated I/O

| | Memory-mapped I/O | Isolated (port-mapped) I/O |
| --- | --- | --- |
| Address space | Device registers share the memory address space | Separate I/O address space |
| Instructions | Ordinary memory instructions (MOV, LOAD) | Special instructions (IN, OUT) |
| Control lines | Same read / write lines as memory | Separate I/O read / write lines |
| Memory available | Slightly reduced | Full address space for memory |
| Used in | ARM, most RISC | Intel x86 (alongside memory-mapped) |

### Common interfaces and ports

| Interface | Type | Used for |
| --- | --- | --- |
| USB | Serial | Almost everything — keyboards, drives, phones |
| SATA | Serial | Hard disks, SSDs, optical drives |
| PCIe / NVMe | Serial (lanes) | Graphics cards, NVMe SSDs, network cards |
| HDMI / DisplayPort | Serial | Monitors, TVs, projectors |
| Ethernet (RJ-45) | Serial | Wired networking |
| PS/2 | Serial | Older keyboards and mice |
| Parallel (Centronics, IDE/PATA) | Parallel | Older printers and disks |

> [!NOTE]
> **Serial** interfaces send one bit at a time over one line; **parallel**
> interfaces send several bits at once over several lines. Parallel links
> suffer *skew* and crosstalk at high speeds, which is why modern interfaces
> are almost all fast serial links.

## I/O techniques

There are three ways to move data between a device and memory. They differ in
**how much CPU time each transfer costs**.

### 1. Programmed I/O (polling)

The CPU issues a command, then **repeatedly checks the status register**
until the device is ready, then moves the data itself.

```text diagram: programmed I/O loop
   CPU: issue read command
     │
     ▼
   ┌──────────────────┐  not ready
   │ read status reg  │ ────────────┐
   └────────┬─────────┘ ◄───────────┘   ← busy-waiting: CPU does nothing useful
            │ ready
            ▼
   CPU reads data word, writes it to memory
            │
            ▼
   more data? ── yes ──► back to issue command
```

Simple, but the CPU wastes most of its time waiting in the loop.

### 2. Interrupt-driven I/O

The CPU issues the command and **goes on with other work**. When the device
is ready, it sends an **interrupt** signal; the CPU pauses, transfers the data
in an **Interrupt Service Routine (ISR)**, and resumes.

```text diagram: handling an interrupt
  1. Device raises the interrupt request (IRQ) line
  2. CPU finishes the current instruction
  3. CPU acknowledges the interrupt
  4. CPU saves PC, flags and registers on the stack
  5. CPU loads the ISR address (from the interrupt vector table)
  6. ISR runs — transfers data, clears the interrupt
  7. CPU restores the saved state (IRET) and resumes the interrupted program
```

No busy-waiting, but **every word still passes through the CPU**, so it is
inefficient for large block transfers.

### 3. Direct Memory Access (DMA)

A **DMA controller** transfers a whole block directly between the device and
memory **without the CPU**. The CPU only sets up the transfer and is
interrupted once, when the whole block is done.

```text diagram: DMA transfer
   CPU ── (1) start address, count, direction ──► DMA controller
                                                     │
            (2) DMA requests the bus (HOLD / BR)     │
   CPU ── grants it (HLDA / BG) ───────────────────► │
                                                     │
   Device ◄════ (3) data moves directly ════► Memory │  (CPU not involved)
                                                     │
   CPU ◄── (4) one interrupt: "block complete" ──────┘
```

**DMA transfer modes:**

| Mode | How it shares the bus | Effect |
| --- | --- | --- |
| Burst (block) | DMA holds the bus until the whole block is moved | Fastest transfer; CPU locked out of the bus meanwhile |
| Cycle stealing | DMA takes the bus for one word at a time, between CPU cycles | CPU slowed slightly but keeps running |
| Transparent | DMA uses the bus only when the CPU is not using it | No CPU slowdown; slowest transfer |

### Comparison of I/O techniques

| | Programmed I/O | Interrupt-driven I/O | DMA |
| --- | --- | --- | --- |
| CPU checks device | Continuously (polling) | No — device interrupts | No |
| Data passes through CPU | Yes, every word | Yes, every word | No |
| Interrupts | None | One per word / byte | One per block |
| CPU efficiency | Lowest | Better | Highest |
| Hardware cost | Lowest | Interrupt controller | DMA controller |
| Best for | Simple, slow devices | Keyboard, mouse | Disk, network, sound, video |

### I/O channels and processors

For mainframes and heavy I/O, the idea of DMA is taken further: an **I/O
channel** (I/O processor) is a dedicated processor that runs its own I/O
programs from memory and handles many devices with almost no CPU
involvement. A **selector channel** serves one high-speed device at a time;
a **multiplexer channel** interleaves many slow devices.

## Interrupts in detail

| Term | Meaning |
| --- | --- |
| Hardware interrupt | Raised by a device (keyboard, timer, disk) |
| Software interrupt (trap) | Raised by an instruction — a system call, or an error such as divide-by-zero |
| Maskable interrupt | Can be disabled (ignored) by the CPU |
| Non-maskable interrupt (NMI) | Cannot be disabled — for critical events like power failure or memory parity error |
| Vectored interrupt | The device supplies the ISR address (or a vector number) |
| Non-vectored interrupt | The ISR is at a fixed address |
| Interrupt vector table | A table of ISR addresses indexed by interrupt number |

When several devices interrupt at once, **priority** decides who goes first:

- **Polling (software)** — the ISR checks each device in priority order.
- **Daisy chaining (hardware)** — devices are wired in series; the
  acknowledge signal passes down the chain and the first requesting device
  takes it. The device nearest the CPU has the highest priority.
- **Priority interrupt controller** — a chip such as the Intel 8259 PIC (or the
  modern APIC) ranks requests and forwards the highest one.

## Handling an I/O request

An application never talks to the hardware directly. A request passes down
through layers of software and comes back up when the device finishes.

```text diagram: life cycle of a blocking read request
  ┌──────────────────────────┐
  │ User process             │  (1) calls read(file, buf, n)       ▲ (10) returns,
  └────────────┬─────────────┘                                     │      process
               ▼  system call (trap into kernel)                   │      resumes
  ┌──────────────────────────┐                                     │
  │ Kernel I/O subsystem     │  (2) can it be satisfied from the   │
  │ (device-independent)     │      buffer cache? if yes → return  │
  │                          │  (3) else block the process and     │ (9) move data
  │                          │      pass the request down          │     to user
  └────────────┬─────────────┘                                     │     space, wake
               ▼                                                   │     process
  ┌──────────────────────────┐                                     │
  │ Device driver            │  (4) translate into device commands │ (8) driver reads
  │                          │      and write controller registers │     status and data
  └────────────┬─────────────┘                                     │
               ▼                                                   │
  ┌──────────────────────────┐                                     │
  │ Device controller        │  (5) operates the device; DMA       │ (7) raises an
  │                          │      moves data to memory           │     interrupt
  └────────────┬─────────────┘                                     │
               ▼                                                   │
  ┌──────────────────────────┐                                     │
  │ Device                   │  (6) performs the I/O ──────────────┘
  └──────────────────────────┘
```

### Layers of the I/O software

| Layer | Responsibility |
| --- | --- |
| User-level I/O software | Library calls (`printf`, `scanf`), formatting, spooling daemons |
| Device-independent OS software | Uniform naming, buffering, caching, scheduling, error reporting, allocation |
| Device drivers | Device-specific code that issues commands to the controller |
| Interrupt handlers | Wake the driver when the device finishes |
| Hardware | Controller and device |

### Services of the kernel I/O subsystem

| Service | What it does |
| --- | --- |
| I/O scheduling | Reorders queued requests for efficiency (e.g. disk scheduling) |
| Buffering | Holds data in memory during transfer to absorb speed mismatch and differing transfer sizes |
| Caching | Keeps copies of frequently used data in fast memory |
| Spooling | Queues output for a device that can serve only one job at a time — the classic case is a **printer** (SPOOL = Simultaneous Peripheral Operations On-Line) |
| Device reservation | Gives a process exclusive access to a device |
| Error handling | Retries failed operations and reports errors |
| Protection | Only the kernel may execute I/O instructions, so user programs cannot misuse devices |

**Buffering schemes.** A **single buffer** lets the device fill one buffer
while the process works on the previous data. A **double buffer** lets the
device fill one while the process empties the other. A **circular buffer**
uses more than two buffers in a ring for bursty data.

> [!TIP]
> **Buffer vs cache vs spool.** A buffer may hold the *only* copy of data in
> transit; a cache holds a *copy* of data that lives elsewhere; a spool holds
> whole *jobs* waiting for a dedicated device.

### Blocking, non-blocking and asynchronous I/O

| Type | Behaviour | Example |
| --- | --- | --- |
| Blocking (synchronous) | The process is suspended until the I/O completes | A normal `read()` call |
| Non-blocking | The call returns immediately with whatever is available, possibly nothing | Polling a keyboard in a game loop |
| Asynchronous | The call returns immediately; the process is notified later when the full transfer completes | Async file and network I/O in servers |

## Quick revision

> [!TIP]
> **One-line answers.** I/O interface = bridges speed, format and signal
> differences between CPU and device. Programmed I/O = CPU polls. Interrupt
> I/O = device signals when ready. DMA = device ↔ memory directly, one
> interrupt per block. Memory-mapped I/O uses normal memory instructions;
> isolated I/O uses IN/OUT. Spooling is for printers.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: DMA transfers data
> **without** the CPU, but the CPU still **initiates** it; cycle stealing
> takes the bus **one word at a time**; in daisy chaining the device
> **nearest the CPU** has the highest priority; NMI **cannot** be masked; a
> disk is a **block** device, a keyboard a **character** device; the CPU
> finishes the **current instruction** before servicing an interrupt;
> memory-mapped I/O **reduces** the address space available for memory.
