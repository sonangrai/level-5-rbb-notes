---
title: "Process management and scheduling"
summary: Processes, their states and the PCB, threads, CPU scheduling algorithms worked through with Gantt charts, synchronisation and deadlock.
section: operating-system
order: 2
tags: [operating-system, process, scheduling, deadlock]
updatedAt: "2026-10-07"
---

A **program** is a passive file of instructions on disk. When it is loaded
into memory and starts executing, it becomes a **process** — an active entity
with its own memory, registers and state. Many processes compete for one or a
few CPUs, so the OS must decide **which process runs next and for how long**.
That decision is **CPU scheduling**, and keeping competing processes from
corrupting each other is **synchronisation**.

## The process

### Process in memory

```text diagram: memory layout of a process
   high address  ┌──────────────────┐
                 │      STACK       │  function calls, local variables
                 │        ↓         │  (grows down)
                 │                  │
                 │        ↑         │
                 │       HEAP       │  dynamically allocated memory
                 ├──────────────────┤  (grows up)
                 │       DATA       │  global and static variables
                 ├──────────────────┤
                 │   TEXT (code)    │  the program instructions
   low address   └──────────────────┘
```

### Program vs process

| Program | Process |
| --- | --- |
| Passive — a file on disk | Active — in execution, in memory |
| Exists permanently until deleted | Exists only while running |
| No resources held | Holds CPU time, memory, open files, I/O devices |
| One program | Can create many processes (open two browser windows) |

### Process states

```text diagram: the five-state process model
                admitted                 interrupt (time slice over)
     ┌─────┐ ───────────► ┌───────┐ ◄────────────────────────── ┌─────────┐   exit   ┌────────────┐
     │ NEW │              │ READY │                             │ RUNNING │ ───────► │ TERMINATED │
     └─────┘              └───────┘ ──────────────────────────► └─────────┘          └────────────┘
                              ▲          scheduler dispatch          │
                              │                                      │ I/O or event wait
                              │        ┌─────────┐                   │
                              └─────── │ WAITING │ ◄─────────────────┘
                     I/O or event done │(BLOCKED)│
                                       └─────────┘
```

| State | Meaning |
| --- | --- |
| New | The process is being created |
| Ready | Loaded in memory, waiting for the CPU |
| Running | Instructions are being executed on the CPU |
| Waiting (blocked) | Waiting for an event such as I/O completion |
| Terminated | Finished execution |

Some systems add **suspended ready** and **suspended blocked** states for
processes swapped out to disk.

### Process Control Block (PCB)

The OS represents each process by a **PCB** (also called a task control
block) that stores everything needed to stop and later resume it:

| Field | Contents |
| --- | --- |
| Process ID (PID) | Unique number identifying the process |
| Process state | New, ready, running, waiting, terminated |
| Program counter | Address of the next instruction |
| CPU registers | Saved register contents |
| Scheduling information | Priority, pointers to scheduling queues |
| Memory-management information | Base and limit registers, page tables |
| Accounting information | CPU time used, time limits |
| I/O status information | Open files, allocated devices |

### Context switch

A **context switch** is when the CPU switches from one process to another:
the OS **saves the state of the current process in its PCB** and **loads the
state of the next process from its PCB**. It is pure overhead — no useful work
is done during it — so it should be fast and not too frequent.

### Process creation and termination

A process (the **parent**) can create others (**children**), forming a
process tree. In UNIX, `fork()` creates a copy of the calling process and
`exec()` replaces it with a new program. A child that has finished but whose
parent has not yet collected its exit status is a **zombie**; a child whose
parent ended first is an **orphan** (adopted by `init` / `systemd`).

## Threads

A **thread** is the smallest unit of CPU execution — a "lightweight
process". Threads of the same process share its code, data and open files but
each has its own **program counter, registers and stack**.

```text diagram: single-threaded vs multithreaded process
   single-threaded            multithreaded
  ┌──────────────────┐      ┌──────────────────────────────┐
  │ code  data files │      │ code      data      files    │  shared
  ├──────────────────┤      ├─────────┬─────────┬──────────┤
  │ registers  stack │      │ regs    │ regs    │ regs     │  per thread
  │       ⟿         │      │ stack   │ stack   │ stack    │
  └──────────────────┘      │   ⟿    │   ⟿    │   ⟿     │
                            └─────────┴─────────┴──────────┘
```

| | Process | Thread |
| --- | --- | --- |
| Weight | Heavyweight | Lightweight |
| Memory | Own separate address space | Shares the process's address space |
| Creation and switching | Slower | Faster |
| Communication | Needs IPC (pipes, messages) | Directly through shared memory |
| Failure | Isolated from other processes | One faulty thread can crash the whole process |

**Benefits of multithreading:** responsiveness (a word processor can save
while you type), resource sharing, economy, and use of multiple cores.
**User-level threads** are managed by a library without kernel knowledge;
**kernel-level threads** are managed by the OS.

## CPU scheduling

### Schedulers

| Scheduler | Also called | Decides | Frequency |
| --- | --- | --- | --- |
| Long-term | Job scheduler | Which jobs are admitted from disk into memory (controls the degree of multiprogramming) | Infrequent |
| Short-term | CPU scheduler | Which ready process gets the CPU next | Very frequent (milliseconds) |
| Medium-term | Swapper | Which processes to swap out to disk and back | Occasional |

The **dispatcher** is the module that actually gives the CPU to the process
chosen by the short-term scheduler; the time it takes is **dispatch
latency**.

### Preemptive vs non-preemptive

- **Non-preemptive** — once a process has the CPU, it keeps it until it
  finishes or blocks for I/O.
- **Preemptive** — the OS can take the CPU away from a running process (for
  example when its time slice ends or a higher-priority process arrives).
  All modern general-purpose OSs are preemptive.

### Scheduling criteria

| Criterion | Meaning | Aim |
| --- | --- | --- |
| CPU utilisation | Percentage of time the CPU is busy | Maximise |
| Throughput | Processes completed per unit time | Maximise |
| Turnaround time (TAT) | Completion time − arrival time | Minimise |
| Waiting time (WT) | Time spent in the ready queue = TAT − burst time | Minimise |
| Response time | Time from arrival to **first** getting the CPU | Minimise |

```text diagram: the formulas to remember
  Turnaround time  =  Completion time  −  Arrival time
  Waiting time     =  Turnaround time  −  Burst time
  Response time    =  First run time   −  Arrival time
```

### Worked example

Every algorithm below uses the same four processes:

| Process | Arrival time | Burst time |
| --- | --- | --- |
| P1 | 0 | 5 |
| P2 | 1 | 3 |
| P3 | 2 | 8 |
| P4 | 3 | 6 |

#### First Come, First Served (FCFS)

Processes run in order of arrival. Non-preemptive.

```text diagram: FCFS Gantt chart
  ┌───────┬─────┬─────────────┬──────────┐
  │  P1   │ P2  │     P3      │    P4    │
  └───────┴─────┴─────────────┴──────────┘
  0       5     8            16         22
```

| Process | Completion | TAT | WT |
| --- | --- | --- | --- |
| P1 | 5 | 5 | 0 |
| P2 | 8 | 7 | 4 |
| P3 | 16 | 14 | 6 |
| P4 | 22 | 19 | 13 |
| **Average** | | **11.25** | **5.75** |

Simple, but a long process at the front makes everyone wait — the **convoy
effect**.

#### Shortest Job First (SJF), non-preemptive

When the CPU is free, pick the arrived process with the **smallest burst**.
At time 0 only P1 has arrived, so it runs first; at time 5 P2 (3) is
shortest, then P4 (6), then P3 (8).

```text diagram: SJF Gantt chart
  ┌───────┬─────┬──────────┬─────────────┐
  │  P1   │ P2  │    P4    │     P3      │
  └───────┴─────┴──────────┴─────────────┘
  0       5     8         14            22
```

| Process | Completion | TAT | WT |
| --- | --- | --- | --- |
| P1 | 5 | 5 | 0 |
| P2 | 8 | 7 | 4 |
| P3 | 22 | 20 | 12 |
| P4 | 14 | 11 | 5 |
| **Average** | | **10.75** | **5.25** |

#### Shortest Remaining Time First (SRTF) — preemptive SJF

Whenever a process arrives, run whichever has the **least remaining time**.
At time 1, P2 (3) beats P1's remaining 4, so P1 is preempted.

```text diagram: SRTF Gantt chart
  ┌──┬──────┬───────┬──────────┬─────────────┐
  │P1│  P2  │  P1   │    P4    │     P3      │
  └──┴──────┴───────┴──────────┴─────────────┘
  0  1      4       8         14            22
```

| Process | Completion | TAT | WT |
| --- | --- | --- | --- |
| P1 | 8 | 8 | 3 |
| P2 | 4 | 3 | 0 |
| P3 | 22 | 20 | 12 |
| P4 | 14 | 11 | 5 |
| **Average** | | **10.5** | **5.0** |

SRTF gives the **minimum average waiting time**, but burst times must be
known or predicted, and long processes may **starve**.

#### Round Robin (RR), time quantum = 2

Each process gets the CPU for at most one **time quantum**, then goes to the
back of the ready queue. (A process arriving at the same moment another is
preempted joins the queue first.)

```text diagram: Round Robin Gantt chart (q = 2)
  ┌────┬────┬────┬────┬────┬──┬────┬──┬────┬────┬────┬────┐
  │ P1 │ P2 │ P3 │ P1 │ P4 │P2│ P3 │P1│ P4 │ P3 │ P4 │ P3 │
  └────┴────┴────┴────┴────┴──┴────┴──┴────┴────┴────┴────┘
  0    2    4    6    8   10 11   13 14   16   18   20   22
```

| Process | Completion | TAT | WT |
| --- | --- | --- | --- |
| P1 | 14 | 14 | 9 |
| P2 | 11 | 10 | 7 |
| P3 | 22 | 20 | 12 |
| P4 | 20 | 17 | 11 |
| **Average** | | **15.25** | **9.75** |

RR has higher average waiting time here but the best **response time** and
fairness — ideal for time-sharing. A very large quantum turns RR into FCFS; a
very small one wastes time on context switches.

#### Priority scheduling

Each process has a **priority**; the highest-priority ready process runs
(often, a smaller number means higher priority). It can be preemptive or
non-preemptive. Low-priority processes may **starve**; the fix is
**aging** — gradually raising the priority of processes that have waited a
long time.

#### Multilevel queue and multilevel feedback queue

- **Multilevel queue** — the ready queue is split into separate queues (e.g.
  system, interactive, batch), each with its own algorithm; processes stay in
  their queue.
- **Multilevel feedback queue** — processes **move between queues** based on
  behaviour: CPU-hungry processes sink to lower-priority queues, interactive
  ones stay high. Most flexible; used by modern OSs.

### Comparison of scheduling algorithms

| Algorithm | Preemptive | Advantage | Disadvantage |
| --- | --- | --- | --- |
| FCFS | No | Simplest, fair by arrival | Convoy effect; high waiting time |
| SJF | No | Minimum average WT among non-preemptive | Needs burst times; starvation |
| SRTF | Yes | Minimum average WT overall | Needs burst times; starvation; overhead |
| Round Robin | Yes | Fair; best response time | Performance depends on quantum |
| Priority | Either | Important work first | Starvation (fixed by aging) |
| Multilevel feedback | Yes | Adapts to process behaviour | Complex to tune |

## Process synchronisation

When processes or threads share data, the result can depend on the exact
order in which they run — a **race condition**.

> [!NOTE]
> **Example.** Two ATMs withdraw from the same account of Rs. 10 000 at once.
> Both read the balance 10 000; one subtracts 3 000 and writes 7 000, the
> other subtracts 2 000 and writes 8 000. The final balance is 8 000 instead
> of 5 000 — an update was lost.

### Critical section

The **critical section** is the part of code that accesses shared data. A
correct solution must satisfy three conditions:

1. **Mutual exclusion** — only one process in the critical section at a time.
2. **Progress** — if no one is in it, a waiting process must be allowed in
   without indefinite delay.
3. **Bounded waiting** — there is a limit on how many times others can enter
   before a waiting process gets its turn.

### Synchronisation tools

| Tool | Description |
| --- | --- |
| Mutex lock | A lock acquired before entering and released after leaving the critical section |
| Semaphore | An integer variable accessed only through two atomic operations — `wait()` (P, decrement) and `signal()` (V, increment). Introduced by **Dijkstra** |
| Binary semaphore | Takes only 0 or 1 — works like a mutex |
| Counting semaphore | Any non-negative value — controls access to a pool of *n* identical resources |
| Monitor | A high-level construct where only one process at a time can be active inside |

Classic problems used to test these tools: **producer–consumer (bounded
buffer)**, **readers–writers**, and **dining philosophers**.

### Inter-process communication (IPC)

Processes cooperate by **shared memory** (fast; needs synchronisation) or
**message passing** (simpler; through the kernel) — implemented as pipes,
message queues, sockets and signals.

## Deadlock

A **deadlock** is a situation where a set of processes are blocked forever,
each holding a resource and waiting for a resource held by another.

```text diagram: a simple deadlock
          holds                       waits for
   P1 ──────────► Resource A  ◄────────────────── P2
   │                                               │
   │ waits for                               holds │
   └────────────► Resource B  ◄────────────────────┘
          P1 waits for B (held by P2); P2 waits for A (held by P1)
```

### The four necessary conditions (Coffman conditions)

All four must hold at once for deadlock to occur:

| Condition | Meaning |
| --- | --- |
| Mutual exclusion | At least one resource can be used by only one process at a time |
| Hold and wait | A process holds at least one resource while waiting for others |
| No preemption | A resource cannot be forcibly taken away; it is released only voluntarily |
| Circular wait | A circular chain of processes exists, each waiting for the next one's resource |

### Handling deadlock

| Approach | Idea | Example |
| --- | --- | --- |
| Prevention | Make sure at least one of the four conditions can never hold | Request all resources at once (no hold and wait); number resources and request in order (no circular wait) |
| Avoidance | Check each request and grant it only if the system stays in a **safe state** | **Banker's algorithm** (Dijkstra) |
| Detection and recovery | Let deadlocks happen, detect them with a wait-for graph, then recover | Kill processes or preempt resources |
| Ignorance (ostrich algorithm) | Assume deadlocks are rare and ignore them | Used by most desktop OSs, including Windows and Linux |

A **safe state** is one in which there exists some order (a *safe sequence*)
in which every process can get what it needs and finish. An unsafe state is
not necessarily deadlocked, but may lead to deadlock.

### Deadlock vs starvation

| Deadlock | Starvation |
| --- | --- |
| Processes wait for each other in a cycle; none can proceed | A process waits indefinitely because others keep getting preference |
| All involved processes are blocked | Others continue running |
| Caused by circular wait | Caused by unfair scheduling or priority |
| Fixed by prevention, avoidance, recovery | Fixed by **aging** |

## Quick revision

> [!TIP]
> **One-line answers.** Process = program in execution. PCB stores a
> process's state. Thread = lightweight process sharing code and data. TAT =
> CT − AT; WT = TAT − BT. SRTF gives minimum average waiting time; RR gives the
> best response time; FCFS suffers the convoy effect. Semaphore = wait / signal
> (Dijkstra). Deadlock needs all four conditions: mutual exclusion, hold and
> wait, no preemption, circular wait. Banker's algorithm = deadlock avoidance.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: a **program** is passive, a
> **process** active; the **short-term** scheduler is the CPU scheduler and
> runs most often; **FCFS** is non-preemptive, **RR** is preemptive; SJF and
> priority scheduling cause **starvation**, solved by **aging**; Round Robin
> with a very large quantum becomes **FCFS**; the Banker's algorithm is for
> **avoidance**, not prevention; removing **any one** of the four conditions
> prevents deadlock; threads share **code and data** but not **stack and
> registers**.
