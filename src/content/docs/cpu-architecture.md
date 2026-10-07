---
title: "CPU architecture"
summary: The parts of a processor, the instruction cycle, instruction formats and addressing modes, CISC vs RISC, pipelining and how CPU performance is measured.
section: computer-architecture
order: 3
tags: [architecture, cpu, processor, pipelining]
updatedAt: "2026-10-07"
---

The **Central Processing Unit (CPU)** executes the instructions of a program.
Everything it does is a repetition of one loop — **fetch an instruction,
decode it, execute it** — billions of times a second. CPU architecture is the
study of the hardware that runs that loop and the tricks used to run it
faster.

## Components of the CPU

```text diagram: inside a CPU
  ┌─────────────────────────────────────────────────────────────────┐
  │                              CPU                                │
  │  ┌────────────────────┐            ┌─────────────────────────┐  │
  │  │   CONTROL UNIT     │  control   │   ARITHMETIC LOGIC UNIT │  │
  │  │  instruction       │  signals   │   adder, shifter,       │  │
  │  │  decoder, timing   │ ─────────► │   comparator, logic     │  │
  │  │  and control       │            └───────────▲─────────────┘  │
  │  └─────────▲──────────┘                        │                │
  │            │           internal CPU bus        │                │
  │  ══════════╪═══════════════════════════════════╪══════════════  │
  │            │                                   │                │
  │  ┌─────────┴───────────────────────────────────┴─────────────┐  │
  │  │ REGISTERS   PC  IR  MAR  MDR  AC  R0…Rn  SP  FLAGS          │  │
  │  └───────────────────────────────────────────────────────────┘  │
  │  ┌───────────────────────────────────────────────────────────┐  │
  │  │ CACHE   L1-I  L1-D  L2  (L3 shared across cores)            │  │
  │  └───────────────────────────────────────────────────────────┘  │
  └───────────────────────────────▲─────────────────────────────────┘
                                  │ system bus (address, data, control)
                                  ▼
                            main memory, I/O
```

| Component | Role |
| --- | --- |
| ALU | Performs arithmetic and logical operations, and sets status flags |
| Control unit (CU) | Fetches and decodes instructions and generates the control signals that drive the ALU, registers, memory and I/O |
| Registers | Fastest storage, holding operands, addresses and results (see [registers](/docs/basic-architecture-registers-memory#registers)) |
| Cache | Small fast memory on the chip that hides main-memory latency |
| Clock | Generates the pulses that synchronise every operation; one pulse is a **clock cycle** |
| Internal bus | Connects the parts inside the CPU |

### Hardwired vs microprogrammed control unit

| | Hardwired | Microprogrammed |
| --- | --- | --- |
| Control signals from | Fixed logic circuits (gates, decoders) | Microinstructions stored in a control memory (ROM) |
| Speed | Faster | Slower |
| Modification | Difficult — redesign the circuit | Easy — change the microprogram |
| Instruction set | Small, simple | Large, complex |
| Typical in | RISC processors | CISC processors |

## The instruction cycle

```text diagram: the instruction cycle
          ┌──────────────┐
    ┌───► │    FETCH     │  get the instruction at PC from memory into IR
    │     └──────┬───────┘
    │     ┌──────▼───────┐
    │     │    DECODE    │  CU works out the opcode and operands
    │     └──────┬───────┘
    │     ┌──────▼───────┐
    │     │ FETCH OPERAND│  read any operand from memory (if needed)
    │     └──────┬───────┘
    │     ┌──────▼───────┐
    │     │   EXECUTE    │  ALU performs the operation; result stored
    │     └──────┬───────┘
    │     ┌──────▼───────┐
    │     │  INTERRUPT?  │  if an interrupt is pending, save state and
    │     └──────┬───────┘  jump to its service routine
    └────────────┘
```

1. **Fetch** — `MAR ← PC`, `MDR ← M[MAR]`, `PC ← PC + 1`, `IR ← MDR`.
2. **Decode** — the control unit interprets the opcode in IR and identifies
   the operands and addressing mode.
3. **Execute** — the ALU or other unit carries out the operation; the result
   goes to a register or memory, and flags are updated.
4. **Interrupt check** — before fetching the next instruction, the CPU checks
   for pending interrupts.

The time for one full cycle is the **instruction cycle**; it may take several
**machine cycles**, each made of several **clock cycles**.

## Instruction format

An instruction is a binary word divided into fields: an **opcode** (what to
do) and zero or more **operands** (what to do it to).

```text diagram: a typical instruction format
  ┌──────────┬─────────────┬────────────────────────────┐
  │  opcode  │ addressing  │  operand(s) / address(es)  │
  │  ADD     │ mode        │  R1, R2                    │
  └──────────┴─────────────┴────────────────────────────┘
```

Instructions are classified by how many addresses they name. For
**X = A + B**:

| Type | Example | Used in |
| --- | --- | --- |
| Three-address | `ADD X, A, B` | RISC (register-to-register) |
| Two-address | `MOV X, A` · `ADD X, B` | Most common in CISC |
| One-address | `LOAD A` · `ADD B` · `STORE X` | Accumulator machines |
| Zero-address | `PUSH A` · `PUSH B` · `ADD` · `POP X` | Stack machines |

Fewer addresses mean shorter instructions but more of them.

### Types of instructions

| Group | Examples |
| --- | --- |
| Data transfer | MOV, LOAD, STORE, PUSH, POP, IN, OUT |
| Arithmetic | ADD, SUB, MUL, DIV, INC, DEC |
| Logical and shift | AND, OR, XOR, NOT, SHL, SHR, ROL |
| Control transfer | JMP, JZ / JNZ (conditional), CALL, RET |
| Machine control | HLT, NOP, interrupt enable / disable |

## Addressing modes

An addressing mode specifies **how to find the operand**. Using
`LOAD` into the accumulator as the example:

| Mode | Example | Operand is | Note |
| --- | --- | --- | --- |
| Immediate | `LOAD #25` | The value 25 itself | No memory access; fastest for constants |
| Direct (absolute) | `LOAD 500` | `M[500]` | One memory access |
| Indirect | `LOAD (500)` | `M[M[500]]` | Address of the address; two accesses |
| Register | `LOAD R1` | The contents of R1 | No memory access |
| Register indirect | `LOAD (R1)` | `M[R1]` | Register holds the address; used for pointers |
| Indexed | `LOAD 500(X)` | `M[500 + X]` | For arrays — X is the index |
| Base register | `LOAD 20(B)` | `M[B + 20]` | For relocatable code |
| Relative | `JMP +8` | `M[PC + 8]` | Used by branches |
| Implied | `CMA` | Implied by opcode (accumulator) | No operand field |
| Auto-increment / decrement | `LOAD (R1)+` | `M[R1]`, then R1 is incremented | Walking through arrays |

> [!TIP]
> Immediate mode holds **data**; direct mode holds an **address**; indirect
> mode holds the **address of an address**.

## CISC vs RISC

| | CISC | RISC |
| --- | --- | --- |
| Full form | Complex Instruction Set Computer | Reduced Instruction Set Computer |
| Instructions | Many (hundreds), complex | Few, simple |
| Instruction length | Variable | Fixed |
| Cycles per instruction | Many | Mostly one |
| Addressing modes | Many | Few |
| Memory access | Most instructions can access memory | Only LOAD and STORE access memory |
| Registers | Fewer | Many |
| Control unit | Microprogrammed | Hardwired |
| Pipelining | Harder | Easy and efficient |
| Code size | Smaller programs | Larger programs |
| Examples | Intel x86, AMD64, VAX | ARM, MIPS, RISC-V, SPARC, PowerPC |

> [!NOTE]
> Modern x86 chips are CISC on the outside but translate instructions into
> RISC-like **micro-operations** internally, so the line between the two has
> blurred.

## Pipelining

Pipelining overlaps the stages of successive instructions, like an assembly
line: while one instruction executes, the next is decoded and the one after
is fetched. It does not make one instruction faster; it increases
**throughput**.

The classic five-stage RISC pipeline: **IF** (instruction fetch), **ID**
(decode and register read), **EX** (execute), **MEM** (memory access),
**WB** (write back).

```text diagram: five-stage pipeline
  clock cycle →    1    2    3    4    5    6    7    8
  instruction 1   IF   ID   EX   MEM  WB
  instruction 2        IF   ID   EX   MEM  WB
  instruction 3             IF   ID   EX   MEM  WB
  instruction 4                  IF   ID   EX   MEM  WB
                                      ▲
                       from cycle 5, one instruction finishes every cycle
```

```text diagram: pipeline speed-up
  k = number of stages, n = number of instructions

  non-pipelined time = n × k cycles
  pipelined time     = k + (n − 1) cycles

  Example: k = 5, n = 100
           non-pipelined = 500 cycles,  pipelined = 5 + 99 = 104 cycles
           speed-up      = 500 / 104 ≈ 4.8   (maximum possible = k = 5)
```

### Pipeline hazards

| Hazard | Cause | Remedy |
| --- | --- | --- |
| Structural | Two instructions need the same hardware in the same cycle | Duplicate resources (separate instruction and data caches) |
| Data | An instruction needs a result that an earlier one has not produced yet | Forwarding (bypassing), stalls, instruction reordering |
| Control (branch) | The next instruction depends on a branch not yet decided | Branch prediction, delayed branch, flushing |

## CPU performance

| Factor | Meaning |
| --- | --- |
| Clock speed | Cycles per second, in GHz. 3 GHz = 3 × 10⁹ cycles/s |
| CPI | Average clock cycles per instruction |
| Word size | Bits processed at once — 32-bit or 64-bit |
| Cores | Independent processing units on one chip |
| Cache size | More cache means fewer slow trips to RAM |
| Bus width | Bits moved per transfer |

```text diagram: the CPU performance equation
  CPU time = instruction count × CPI × clock cycle time
           = (instruction count × CPI) ÷ clock rate

  MIPS     = clock rate ÷ (CPI × 10⁶)

  Example: 10⁹ instructions, CPI = 2, clock = 2 GHz
           CPU time = (10⁹ × 2) ÷ (2 × 10⁹) = 1 second
           MIPS     = (2 × 10⁹) ÷ (2 × 10⁶) = 1 000 MIPS
```

### Multicore and multithreading

- **Multicore** — two or more complete cores on one chip, each with its own
  ALU, CU, registers and L1 cache, usually sharing L3. They run separate
  threads truly in parallel.
- **Hyper-threading (simultaneous multithreading)** — one physical core
  presents itself as two logical cores, sharing its execution units to keep
  them busy.
- **Superscalar** — a core with several execution units that issues more than
  one instruction per clock cycle.

## Flynn's classification

Michael Flynn (1966) classified computers by the number of concurrent
**instruction streams** and **data streams**.

| Class | Instruction streams | Data streams | Example |
| --- | --- | --- | --- |
| SISD | Single | Single | Classic uniprocessor (von Neumann) |
| SIMD | Single | Multiple | Vector processors, GPUs, array processors |
| MISD | Multiple | Single | Rare; fault-tolerant systems (space shuttle flight control) |
| MIMD | Multiple | Multiple | Multicore processors, clusters, supercomputers |

## Quick revision

> [!TIP]
> **One-line answers.** CPU = ALU + CU + registers. Instruction cycle = fetch,
> decode, execute (+ interrupt check). Immediate mode = operand in the
> instruction; indirect = address of the address. RISC = few simple
> fixed-length instructions, load/store, hardwired control; CISC = many complex
> variable-length instructions, microprogrammed control. Pipeline speed-up
> approaches the number of stages.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: the **PC** holds the
> address of the **next** instruction, not the current one; RISC uses a
> **hardwired** CU, CISC a **microprogrammed** one; in RISC only
> **LOAD/STORE** touch memory; immediate addressing needs **no** memory access
> for the operand; pipelining improves **throughput**, not the latency of a
> single instruction; GPUs are **SIMD**, multicore CPUs are **MIMD**; x86 is
> CISC, ARM is RISC.
