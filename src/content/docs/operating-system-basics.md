---
title: "Basic knowledge of operating system"
summary: What an operating system is and does, its types and structure, the kernel and shell, system calls, booting, and how it manages files.
section: operating-system
order: 1
tags: [operating-system, kernel, file-system]
updatedAt: "2026-10-07"
---

An **operating system (OS)** is the system software that **manages a
computer's hardware and software resources and provides common services for
programs**. It sits between the user and the hardware: applications ask the
OS for memory, files, the screen or the network, and the OS decides who gets
what, when, and safely. Without an OS, every program would have to drive the
hardware itself.

## Where the OS sits

```text diagram: layers of a computer system
  ┌───────────────────────────────────────────────────────┐
  │ USERS                                                 │
  ├───────────────────────────────────────────────────────┤
  │ APPLICATION PROGRAMS   browser, Word, banking software │
  ├───────────────────────────────────────────────────────┤
  │ SYSTEM PROGRAMS        shell, compilers, utilities     │
  ├───────────────────────────────────────────────────────┤
  │ OPERATING SYSTEM       kernel                          │
  ├───────────────────────────────────────────────────────┤
  │ HARDWARE               CPU, memory, disks, I/O devices │
  └───────────────────────────────────────────────────────┘
```

The OS plays two roles at once:

- **Resource manager** — it allocates the CPU, memory, storage and devices
  among competing programs fairly and efficiently.
- **Extended machine** — it hides messy hardware details behind simple
  abstractions such as *files*, *processes* and *windows*.

## Functions of an operating system

| Function | What the OS does |
| --- | --- |
| Process management | Creates, schedules and terminates processes; handles synchronisation and deadlock (see [process management](/docs/process-management-scheduling)) |
| Memory management | Allocates and frees memory; paging and virtual memory (see [memory management](/docs/basic-architecture-registers-memory#memory-management)) |
| File management | Creates, deletes, reads and writes files and directories; controls access |
| Device (I/O) management | Drives devices through device drivers, buffering and spooling (see [I/O management](/docs/io-management)) |
| Storage management | Manages free disk space, allocation and disk scheduling |
| Security and protection | Authenticates users and controls access to resources (see [OS security](/docs/os-security-threats)) |
| User interface | Provides a command line (CLI) or graphical interface (GUI) |
| Networking | Supports communication between computers |
| Error detection | Detects and responds to hardware and software errors |
| Accounting | Keeps track of resource usage by users and programs |

## Goals of an OS

- **Convenience** — make the computer easy to use.
- **Efficiency** — use hardware resources well.
- **Ability to evolve** — allow new functions without disrupting service.
- **Reliability and security** — protect users and data.

## Types of operating systems

| Type | Description | Examples |
| --- | --- | --- |
| Batch | Similar jobs are grouped into batches and run without user interaction | Early IBM mainframe systems, payroll processing |
| Multiprogramming | Several programs are in memory; when one waits for I/O, the CPU switches to another — keeps the CPU busy | Early mainframes |
| Multitasking / time-sharing | The CPU switches between tasks so quickly that each user or task seems to run continuously | UNIX, Windows, Linux, macOS |
| Multiprocessing | Uses two or more CPUs in one system (symmetric or asymmetric) | Modern servers and desktops |
| Multi-user | Many users share one system at the same time | UNIX, Linux, mainframe OS |
| Network OS | Manages a network of computers — shared files, printers, users | Windows Server, Novell NetWare |
| Distributed | Many independent computers appear to users as one system | Cloud platforms, Amoeba |
| Real-time (RTOS) | Must respond within a strict time limit | VxWorks, QNX, FreeRTOS |
| Embedded | Built into a device with a dedicated function | ATMs, routers, washing machines, cars |
| Mobile | Designed for phones and tablets | Android, iOS |

### Real-time operating systems

| | Hard real-time | Soft real-time |
| --- | --- | --- |
| Deadline | Must **never** be missed | Occasionally missing it is tolerable |
| Failure effect | Catastrophic | Degraded quality |
| Examples | Airbag control, pacemakers, missile guidance, industrial robots | Video streaming, online games, ATM transactions |

### Multiprogramming vs multitasking vs multiprocessing

- **Multiprogramming** — more than one program in memory, to keep the CPU
  busy. One CPU.
- **Multitasking** — multiprogramming plus time-slicing, so tasks seem to run
  together and the system stays responsive. One CPU is enough.
- **Multiprocessing** — more than one CPU, so tasks truly run in parallel.

## Structure of an operating system

### Kernel and shell

```text diagram: kernel and shell
               ┌───────────────────────────────┐
               │           USER                │
               └──────────────┬────────────────┘
                              │ commands / clicks
               ┌──────────────▼────────────────┐
               │  SHELL  (CLI: bash, cmd,      │
               │          PowerShell;          │
               │          GUI: Explorer)       │
               └──────────────┬────────────────┘
                              │ system calls
               ┌──────────────▼────────────────┐
               │  KERNEL  process, memory,     │
               │          file, device mgmt    │
               └──────────────┬────────────────┘
                              │
               ┌──────────────▼────────────────┐
               │          HARDWARE             │
               └───────────────────────────────┘
```

- The **kernel** is the core of the OS. It is loaded into memory first at
  boot, stays there the whole time, and has full control of the hardware.
- The **shell** is the interface between the user and the kernel. It takes
  commands and passes them to the kernel. It can be a command interpreter
  (CLI) or a graphical shell (GUI).

### Kernel types

| Type | Design | Pros and cons | Examples |
| --- | --- | --- | --- |
| Monolithic | All OS services run in one large kernel in kernel space | Fast; but one buggy driver can crash the whole system | Linux, traditional UNIX, MS-DOS |
| Microkernel | Only the essentials (scheduling, IPC, basic memory) in the kernel; the rest run as user-space servers | Reliable, secure, modular; slower due to message passing | QNX, MINIX, L4 |
| Hybrid | Microkernel structure with some services in kernel space for speed | A compromise | Windows NT family, macOS (XNU) |
| Exokernel | Minimal kernel; applications manage hardware directly | Research |  MIT Exokernel |

### User mode and kernel mode

The CPU runs in two modes, controlled by a **mode bit**:

- **Kernel mode (supervisor / privileged mode)** — full access to all
  hardware and instructions. The OS runs here.
- **User mode** — restricted. Applications run here and cannot directly
  access hardware or other programs' memory.

A user program that needs an OS service makes a **system call**, which
switches the CPU into kernel mode, runs the service, and switches back.

### System calls

A **system call** is the programming interface through which a program
requests a service from the kernel.

| Category | Examples (UNIX / Windows) |
| --- | --- |
| Process control | `fork`, `exec`, `exit`, `wait` / `CreateProcess`, `ExitProcess` |
| File management | `open`, `read`, `write`, `close` / `CreateFile`, `ReadFile`, `WriteFile` |
| Device management | `ioctl`, `read`, `write` / `DeviceIoControl` |
| Information maintenance | `getpid`, `time`, `sleep` / `GetCurrentProcessId`, `Sleep` |
| Communication | `pipe`, `socket`, `shmget` / `CreatePipe` |
| Protection | `chmod`, `chown` / `SetFileSecurity` |

## Booting

**Booting** is the process of starting the computer and loading the OS into
memory.

```text diagram: the boot sequence
  Power on
     │
     ▼
  BIOS / UEFI firmware (in ROM / flash) starts
     │
     ▼
  POST — Power-On Self-Test checks CPU, RAM, keyboard, disks
     │
     ▼
  Firmware finds a bootable device (boot order: SSD, USB, network…)
     │
     ▼
  Boot loader runs (from MBR or EFI partition) — GRUB, Windows Boot Manager
     │
     ▼
  Kernel is loaded into RAM and initialises drivers and memory
     │
     ▼
  System services start; login screen appears
```

- **Cold boot** — starting a computer from power off.
- **Warm boot** — restarting without cutting power (Restart, or Ctrl + Alt +
  Del in DOS).

## User interfaces: CLI vs GUI

| | CLI — Command Line Interface | GUI — Graphical User Interface |
| --- | --- | --- |
| Interaction | Typed commands | Windows, icons, menus, pointer (WIMP) |
| Ease of learning | Harder — commands must be memorised | Easy, intuitive |
| Resource use | Very light | Needs more memory and processing |
| Speed for experts | Fast; easily scripted and automated | Slower for repetitive tasks |
| Examples | MS-DOS, UNIX/Linux shell, PowerShell | Windows, macOS, GNOME, KDE |

## File management

A **file** is a named collection of related information stored on secondary
storage. The part of the OS that manages files is the **file system**.

### File attributes

Name, extension (type), location, size, protection (permissions), owner, and
time stamps for creation, modification and last access.

### File operations

Create, open, read, write, reposition (seek), close, delete, rename, copy,
truncate.

### Access methods

| Method | How data is read | Example |
| --- | --- | --- |
| Sequential | In order, one record after another | Tape, log files, text editors |
| Direct (random) | Any block, by its number, in any order | Databases on disk |
| Indexed | An index points to the blocks; look up the index, then jump | Indexed sequential files (ISAM) |

### Directory structures

| Structure | Description |
| --- | --- |
| Single-level | All files in one directory; names must be unique for everyone |
| Two-level | A separate directory for each user |
| Tree (hierarchical) | Directories inside directories, with paths — used by DOS, Windows, UNIX |
| Acyclic graph | A tree that allows shared files and folders (links) |
| General graph | Allows cycles; needs care to avoid infinite loops |

**Absolute path** starts from the root (`C:\Users\Ram\report.docx`,
`/home/ram/report.txt`); **relative path** starts from the current directory
(`..\docs\file.txt`).

### File allocation methods

How the OS places a file's blocks on disk:

| Method | How | Advantages | Disadvantages |
| --- | --- | --- | --- |
| Contiguous | Each file occupies consecutive blocks | Fast sequential and direct access | External fragmentation; hard to grow files |
| Linked | Each block points to the next block | No external fragmentation; files grow easily | Slow direct access; a broken pointer loses the rest. FAT is a variant |
| Indexed | An index block lists all of a file's blocks | Fast direct access; no external fragmentation | Index block overhead. UNIX inodes use this |

### Common file systems

FAT32 and NTFS (Windows), ext4 (Linux), APFS (macOS), exFAT (flash media).
See [file systems](/docs/organization-of-hard-disk#file-systems) for the
comparison.

## Popular operating systems

| OS | Developer | Type | Note |
| --- | --- | --- | --- |
| MS-DOS | Microsoft | Single-user, single-tasking, CLI | 1981 |
| Windows | Microsoft | Multitasking, GUI | Most-used desktop OS |
| UNIX | AT&T Bell Labs | Multi-user, multitasking | 1969; servers and mainframes |
| Linux | Linus Torvalds and community | Open source, UNIX-like | 1991; servers, Android, supercomputers |
| macOS | Apple | UNIX-based GUI | Apple computers |
| Android | Google | Linux-based mobile | Most-used mobile OS |
| iOS | Apple | Mobile | iPhone, iPad |

## Quick revision

> [!TIP]
> **One-line answers.** OS = system software that manages hardware and
> provides services to programs. Kernel = core, always in memory; shell =
> interface between user and kernel. System call = how a program asks the
> kernel for a service. RTOS = guaranteed response time. Booting = BIOS →
> POST → boot loader → kernel. Linux is monolithic; Windows NT is hybrid.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: the OS is **system
> software**, not application software; the **kernel** is the first part
> loaded and stays in memory; **multiprogramming** keeps the CPU busy,
> **multiprocessing** needs more than one CPU; an airbag system is **hard**
> real-time; **POST** runs before the OS loads; user programs cannot access
> hardware directly — they use **system calls**; UNIX inodes use **indexed**
> allocation, FAT uses **linked** allocation.
