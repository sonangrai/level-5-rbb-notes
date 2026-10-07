---
title: "Basic computer architecture, registers and memory management"
summary: The von Neumann model, the registers the CPU works through, the memory hierarchy, and how the OS shares memory with paging and virtual memory.
section: computer-architecture
order: 1
tags: [architecture, registers, memory, operating-system]
updatedAt: "2026-10-07"
---

Every general-purpose computer, from a phone to a mainframe, is built around
the same handful of blocks: something to take data in, something to process
it, somewhere to keep it, and something to send results out. **Architecture**
is the design of those blocks and how they talk to each other; **memory
management** is how the operating system shares the one block every program
fights over — main memory.

## Basic structure of a computer

```text diagram: functional units of a computer
                      ┌────────────────────────────────────┐
                      │       CENTRAL PROCESSING UNIT      │
                      │  ┌──────────────┐  ┌─────────────┐ │
   ┌────────┐         │  │ Control Unit │  │     ALU     │ │         ┌────────┐
   │ INPUT  │ ──────► │  └──────────────┘  └─────────────┘ │ ──────► │ OUTPUT │
   │ unit   │         │          ┌───────────────┐         │         │ unit   │
   └────────┘         │          │   Registers   │         │         └────────┘
                      │          └───────────────┘         │
                      └─────────────────┬──────────────────┘
                                        │ ▲
                                        ▼ │
                              ┌──────────────────────┐
                              │  MEMORY UNIT         │
                              │  primary (RAM, ROM)  │
                              │  secondary (disk)    │
                              └──────────────────────┘
           ──► data / instruction flow       control signals flow from the CU
```

| Unit | Job |
| --- | --- |
| Input unit | Accepts data and instructions, converts them to binary (keyboard, mouse, scanner) |
| Memory unit | Stores data, instructions and intermediate results |
| ALU | Performs arithmetic (+, −, ×, ÷) and logic (AND, OR, NOT, compare) operations |
| Control unit | Fetches and decodes instructions, then directs every other unit with control signals |
| Output unit | Converts binary results into a human-readable form (monitor, printer) |

The ALU and control unit together, with the registers, make up the **CPU** —
the "brain" of the computer.

## Von Neumann architecture

Proposed by John von Neumann in 1945, this design rests on the **stored
program concept**: instructions and data are both kept, in binary, in the same
read-write memory, and the CPU fetches and executes instructions one after
another.

```text diagram: von Neumann model — one memory, one bus
   ┌───────────┐       address bus       ┌────────────────────────────┐
   │           │ ══════════════════════► │                            │
   │    CPU    │        data bus         │   MEMORY                   │
   │ (CU, ALU, │ ◄═════════════════════► │   instructions + data      │
   │ registers)│       control bus       │   share the same space     │
   │           │ ══════════════════════► │                            │
   └───────────┘                         └────────────────────────────┘
```

### The system bus

| Bus | Direction | Carries | Width decides |
| --- | --- | --- | --- |
| Address bus | One-way, CPU → memory / I/O | The address of the location to read or write | How much memory can be addressed — *n* lines give 2ⁿ locations |
| Data bus | Two-way | The actual data or instruction | How many bits move per transfer (the word size) |
| Control bus | Both ways | Read, write, clock, interrupt, bus-request signals | — |

> [!NOTE]
> A 32-bit address bus can address 2³² bytes = **4 GB**, which is why 32-bit
> systems top out at 4 GB of RAM. A 64-bit address space is 2⁶⁴ bytes —
> 16 exabytes.

### The von Neumann bottleneck

Because instructions and data travel over the **same bus**, the CPU cannot
fetch an instruction and read data in the same cycle. The CPU is much faster
than memory, so it spends time waiting. Caches, wider buses and pipelining
exist largely to hide this bottleneck.

### Von Neumann vs Harvard architecture

| | Von Neumann | Harvard |
| --- | --- | --- |
| Memory | One memory for instructions and data | Separate instruction memory and data memory |
| Buses | One shared set | Separate buses for each |
| Instruction + data fetch | One at a time | Simultaneously |
| Speed | Slower (bottleneck) | Faster |
| Cost / complexity | Simpler, cheaper | More complex |
| Used in | General-purpose PCs | Microcontrollers, DSPs; modern CPUs use it inside the L1 cache (split I-cache and D-cache) |

## Registers

A register is a small, very fast storage location **inside the CPU**. It holds
the instruction being executed, the data being worked on, and addresses the
CPU needs right now. Registers are the top of the memory hierarchy — faster
than cache, but there are only a few dozen of them. Their size (32-bit, 64-bit)
usually equals the CPU's word size.

### Important registers

| Register | Full name | Holds |
| --- | --- | --- |
| PC | Program Counter | Address of the **next** instruction to fetch |
| IR | Instruction Register | The instruction **currently** being decoded and executed |
| MAR | Memory Address Register | The address of the memory location to read or write |
| MDR / MBR | Memory Data / Buffer Register | The data just read from, or about to be written to, memory |
| AC | Accumulator | One operand and the result of ALU operations |
| GPR | General Purpose Registers | Temporary data and addresses (R0, R1, … or EAX, EBX, …) |
| SP | Stack Pointer | Address of the top of the stack |
| IX | Index Register | An offset used in indexed addressing (arrays) |
| FR / PSW | Flag / Status Register, Program Status Word | Condition flags from the last operation |

### Status flags

| Flag | Set when |
| --- | --- |
| Z — Zero | The result is zero |
| S / N — Sign | The result is negative (most significant bit is 1) |
| C — Carry | An addition carries, or subtraction borrows, out of the top bit |
| V / O — Overflow | A signed result does not fit in the register |
| P — Parity | The result has an even number of 1 bits |
| I — Interrupt | Interrupts are enabled |

### Registers in the fetch cycle

The fetch step shows how the registers cooperate. In register transfer
notation:

```text diagram: fetch cycle in register transfer notation
  T1:  MAR ← PC            the address of the next instruction goes out
  T2:  MDR ← M[MAR]        memory returns the instruction
       PC  ← PC + 1        point at the following instruction
  T3:  IR  ← MDR           the instruction is ready to decode
```

> [!TIP]
> The pair to remember: **MAR holds an address, MDR holds data.** The MAR
> connects to the address bus, the MDR to the data bus.

## Memory hierarchy

No single memory technology is fast, large and cheap at once, so computers
stack several: small and fast near the CPU, large and slow further away.

```text diagram: the memory hierarchy
                     ▲  faster, smaller, costlier per bit
                    ╱ ╲
                   ╱REG╲          Registers         < 1 ns     bytes
                  ╱─────╲
                 ╱ CACHE ╲        L1 / L2 / L3      1–10 ns    KB–MB
                ╱─────────╲
               ╱   MAIN    ╲      RAM               ~50–100 ns  GB
              ╱  MEMORY     ╲
             ╱───────────────╲
            ╱   SECONDARY     ╲   SSD / HDD         µs–ms      TB
           ╱    STORAGE        ╲
          ╱─────────────────────╲
         ╱  TERTIARY / OFFLINE   ╲ tape, optical    seconds    PB
        ╱─────────────────────────╲
                     ▼  slower, larger, cheaper per bit
```

| Level | Volatile | Access time | Typical size | Managed by |
| --- | --- | --- | --- | --- |
| Registers | Yes | < 1 ns | Tens of words | Compiler |
| Cache | Yes | 1–10 ns | KB to tens of MB | Hardware |
| Main memory (RAM) | Yes | ~50–100 ns | GB | Operating system |
| Secondary storage | No | ~0.1 ms (SSD) to ~10 ms (HDD) | TB | OS / file system |
| Tertiary storage | No | Seconds to minutes | PB | Operator / OS |

### Primary memory: RAM and ROM

| | RAM | ROM |
| --- | --- | --- |
| Full form | Random Access Memory | Read Only Memory |
| Volatile | Yes — contents lost at power-off | No |
| Read / write | Both | Read; writing is slow or impossible |
| Holds | Running programs and their data | Firmware, BIOS/UEFI, bootstrap loader |
| Kinds | SRAM, DRAM | PROM, EPROM, EEPROM, flash |

**SRAM vs DRAM.** SRAM (static) stores each bit in a flip-flop of about six
transistors; it is fast, needs no refresh and is used for **cache**. DRAM
(dynamic) stores each bit as charge on a capacitor; it is denser and cheaper
but leaks, so it must be **refreshed** thousands of times a second — it is the
main memory.

**ROM family.** PROM is programmed once by the user. EPROM is erased with
**ultraviolet** light. EEPROM is erased **electrically**, byte by byte. Flash
is EEPROM erased in large blocks — used in SSDs, pen drives and BIOS chips.

### Cache memory

Cache is a small SRAM memory between the CPU and RAM that keeps copies of
recently and frequently used data. It works because programs show
**locality of reference**:

- **Temporal locality** — data used now is likely to be used again soon
  (loop counters).
- **Spatial locality** — data near what was used is likely to be used next
  (array elements, sequential instructions).

A **hit** finds the data in cache; a **miss** must go to RAM.

```text diagram: effective access time
  Hit ratio h = hits / (hits + misses)

  Effective access time = h × T_cache + (1 − h) × (T_cache + T_memory)

  Example: h = 0.9, T_cache = 10 ns, T_memory = 100 ns
           = 0.9 × 10 + 0.1 × (10 + 100) = 9 + 11 = 20 ns
```

**Cache levels.** L1 is the smallest and fastest, private to each core and
split into instruction and data caches. L2 is larger, usually per core. L3 is
the largest and slowest, shared by all cores.

**Mapping** decides where a memory block may sit in cache:

| Mapping | Rule | Trade-off |
| --- | --- | --- |
| Direct | Each block maps to exactly one cache line (block mod lines) | Simple and fast; collisions cause misses |
| Fully associative | A block may go in any line | Fewest misses; expensive to search |
| Set associative | A block maps to one set, and any line within it | The usual compromise (e.g. 8-way) |

## Memory management

Memory management is the operating system function that **keeps track of every
byte of main memory, decides which process gets which part, and reclaims it
when the process ends**. Its goals are to keep many processes in memory at
once, protect them from each other, and use memory efficiently.

### Logical and physical addresses

A program works with **logical (virtual) addresses** generated by the CPU,
starting from 0. The hardware **Memory Management Unit (MMU)** translates each
one, at run time, to a **physical address** in RAM. This lets the OS place a
process anywhere and protects other processes' memory.

```text diagram: address translation by the MMU
   CPU ──► logical address 346 ──► ┌──────────────────┐ ──► physical 14346 ──► RAM
                                   │ MMU              │
                                   │ + base   14000   │
                                   │ check limit      │ ──► trap if out of range
                                   └──────────────────┘
```

### Contiguous allocation

Each process gets a single continuous block of memory.

- **Fixed partitioning** — memory is divided in advance into partitions; one
  process per partition. Simple, but wastes space inside partitions.
- **Variable (dynamic) partitioning** — each process gets exactly the size it
  needs, leaving free "holes" as processes finish.

When a process arrives, the OS chooses a hole:

| Strategy | Picks | Note |
| --- | --- | --- |
| First fit | The first hole big enough | Fastest |
| Best fit | The smallest hole big enough | Leaves tiny, useless holes |
| Worst fit | The largest hole | Leaves big leftover holes |
| Next fit | Like first fit, but starts where the last search ended | Spreads allocation |

### Fragmentation

| | Internal fragmentation | External fragmentation |
| --- | --- | --- |
| What | Wasted space **inside** an allocated block | Free space split into holes **between** blocks, none big enough |
| Caused by | Fixed partitions, fixed page sizes | Variable partitioning, segmentation |
| Example | A 7 KB process in an 8 KB partition wastes 1 KB | 30 KB free in total, but no single hole above 10 KB |
| Fix | Smaller units | **Compaction** (shuffle blocks together), or paging |

### Paging

Paging removes external fragmentation by giving up contiguity.

- Logical memory is divided into fixed-size **pages**.
- Physical memory is divided into **frames** of the same size.
- Any page can go in any free frame; a per-process **page table** records
  which frame holds each page.
- A logical address splits into **page number (p)** and **offset (d)**.

```text diagram: paging address translation
   logical address                       page table           physical address
  ┌──────────┬──────────┐               ┌───┬───────┐        ┌──────────┬──────────┐
  │ page  p  │ offset d │ ── p ──────►  │ p │ frame │ ─ f ─► │ frame  f │ offset d │
  └──────────┴──────────┘               └───┴───────┘        └──────────┴──────────┘
                    └───────────── d is copied unchanged ─────────────────────┘
```

**Worked example.** Page size = 1 KB (2¹⁰ bytes), logical address = 2500, and
the page table maps page 2 to frame 5.

```text diagram: translating logical address 2500
  page number  p = 2500 ÷ 1024 = 2   (integer part)
  offset       d = 2500 − 2 × 1024 = 452
  frame        f = page_table[2] = 5
  physical address = f × 1024 + d = 5120 + 452 = 5572
```

Paging can still cause **internal fragmentation** in the last page of a
process. Looking up the page table in RAM doubles memory accesses, so a small
associative cache called the **TLB (Translation Lookaside Buffer)** holds
recent translations.

### Segmentation

Segmentation divides a program into **variable-sized logical units** —
code, data, stack, functions — that match how the programmer thinks of it. A
logical address is *(segment number, offset)*, and a **segment table** stores
each segment's base and limit. It supports sharing and protection naturally
but suffers external fragmentation.

| | Paging | Segmentation |
| --- | --- | --- |
| Unit size | Fixed (page) | Variable (segment) |
| Visible to programmer | No | Yes |
| Fragmentation | Internal | External |
| Table | Page table (frame numbers) | Segment table (base + limit) |
| Address | Page number + offset | Segment number + offset |

### Virtual memory

Virtual memory lets a process run **even when it is larger than physical
memory**, by keeping only the pages it is using in RAM and the rest on disk
(the swap area or page file).

- **Demand paging** — a page is loaded only when it is first referenced.
- **Page fault** — the referenced page is not in RAM. The OS traps, finds the
  page on disk, loads it into a free frame (evicting one if none is free),
  updates the page table and restarts the instruction.
- **Thrashing** — the system spends more time swapping pages than running
  processes, because too many processes compete for too few frames. CPU
  utilisation collapses.

### Page replacement algorithms

When no frame is free, the OS must choose a **victim** page to evict.

| Algorithm | Evicts | Note |
| --- | --- | --- |
| FIFO | The page that has been in memory longest | Simple; suffers **Belady's anomaly** — more frames can cause *more* faults |
| Optimal (OPT) | The page not needed for the longest time in future | Fewest faults possible; impossible to implement, used as a benchmark |
| LRU | The page not used for the longest time in the past | Close to optimal; needs hardware support |
| LFU / MFU | Least / most frequently used | Rarely used in practice |

For the classic reference string
`7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1` with **3 frames**, the page faults
are: **FIFO = 15, LRU = 12, Optimal = 9.**

## Quick revision

> [!TIP]
> **One-line answers.** Stored program concept = instructions and data in the
> same memory (von Neumann). PC = address of next instruction; IR = current
> instruction; MAR = memory address; MDR = memory data. Cache uses SRAM, main
> memory uses DRAM. Paging = fixed-size pages, internal fragmentation;
> segmentation = variable segments, external fragmentation. MMU translates
> logical to physical addresses; TLB caches those translations.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: registers are faster than
> cache; DRAM needs refreshing, SRAM does not; EPROM is erased by **UV light**,
> EEPROM **electrically**; the address bus is **unidirectional**, the data bus
> **bidirectional**; *n* address lines address 2ⁿ locations; **Belady's
> anomaly** happens with FIFO, never with LRU or Optimal; compaction cures
> external, not internal, fragmentation.
