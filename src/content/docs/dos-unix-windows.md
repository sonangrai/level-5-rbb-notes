---
title: "DOS, UNIX and Windows operating systems"
summary: History, features, file systems and essential commands of MS-DOS, UNIX/Linux and Microsoft Windows, with a side-by-side comparison.
section: operating-system
order: 3
tags: [operating-system, dos, unix, linux, windows, commands]
updatedAt: "2026-10-07"
---

Three families of operating systems show how the OS evolved: **MS-DOS**, a
single-user command-line system for early PCs; **UNIX**, a powerful
multi-user system built for shared computers and the ancestor of Linux and
macOS; and **Windows**, the graphical system that now runs most desktop
computers. Exams test their history, features and especially their
**commands**.

## MS-DOS

**DOS (Disk Operating System)** is an OS that manages files on disk. The most
famous version, **MS-DOS**, was released by **Microsoft in 1981** for the
**IBM PC**. Microsoft bought its base, **86-DOS (QDOS)**, from Seattle Computer
Products. IBM sold it as **PC-DOS**. The last stand-alone version was
**MS-DOS 6.22 (1994)**; it lived on underneath Windows 95, 98 and ME.

### Features

- **Single-user, single-tasking** — one user running one program at a time.
- **Command Line Interface (CLI)** — commands typed at a prompt like `C:\>`.
- **16-bit** OS for Intel 8086/8088 processors.
- Accessed up to **640 KB** of conventional memory (1 MB with upper memory).
- Uses the **FAT** file system (FAT12, FAT16).
- Hierarchical (tree) directory structure with drive letters — `A:` and `B:`
  for floppies, `C:` for the first hard disk.
- No built-in networking, memory protection or multitasking.

### DOS boot files

| File | Role |
| --- | --- |
| IO.SYS | Hardware interface — loads basic input/output routines (hidden system file) |
| MSDOS.SYS | The DOS kernel — file and memory management (hidden system file) |
| COMMAND.COM | The **command interpreter** (shell); contains the internal commands |
| CONFIG.SYS | Configuration — loads device drivers and sets system parameters |
| AUTOEXEC.BAT | A batch file of commands run automatically at start-up |

Boot order: **IO.SYS → MSDOS.SYS → CONFIG.SYS → COMMAND.COM →
AUTOEXEC.BAT**. The three essential files for a bootable DOS disk are IO.SYS,
MSDOS.SYS and COMMAND.COM.

### Internal vs external commands

| | Internal commands | External commands |
| --- | --- | --- |
| Stored in | COMMAND.COM — loaded into memory at boot | Separate files on disk (`.COM` or `.EXE`) |
| Availability | Always, from any directory | Only if the file is present or in the PATH |
| Speed | Faster | Slightly slower — loaded from disk |
| Examples | DIR, CD, MD, RD, COPY, DEL, REN, TYPE, CLS, DATE, TIME, VER, VOL, PATH, PROMPT, ECHO | FORMAT, CHKDSK, XCOPY, DISKCOPY, TREE, ATTRIB, SYS, LABEL, EDIT, FDISK, MORE, SORT, SCANDISK, DELTREE |

### Common DOS commands

| Command | Purpose | Example |
| --- | --- | --- |
| `DIR` | List files and directories | `DIR /P` (page by page), `DIR /W` (wide) |
| `CD` / `CHDIR` | Change directory | `CD \REPORTS`, `CD ..` |
| `MD` / `MKDIR` | Make a directory | `MD BANK` |
| `RD` / `RMDIR` | Remove an **empty** directory | `RD BANK` |
| `COPY` | Copy files | `COPY A.TXT D:\BACKUP` |
| `XCOPY` | Copy directories and subdirectories | `XCOPY C:\DATA D:\DATA /S` |
| `DEL` / `ERASE` | Delete files | `DEL *.TMP` |
| `REN` / `RENAME` | Rename a file | `REN OLD.TXT NEW.TXT` |
| `TYPE` | Display a text file's contents | `TYPE NOTES.TXT` |
| `CLS` | Clear the screen | `CLS` |
| `DATE` / `TIME` | Show or set date and time | `DATE` |
| `VER` | Show the DOS version | `VER` |
| `VOL` | Show the disk's volume label and serial number | `VOL C:` |
| `FORMAT` | Prepare a disk (erases it) | `FORMAT A:` |
| `CHKDSK` | Check a disk for errors | `CHKDSK C: /F` |
| `ATTRIB` | View or change file attributes (R, H, S, A) | `ATTRIB +R FILE.TXT` |
| `TREE` | Show the directory structure graphically | `TREE C:\` |
| `EDIT` | Open the text editor | `EDIT LETTER.TXT` |
| `PATH` | Set the directories searched for programs | `PATH C:\DOS` |
| `PROMPT` | Change the command prompt | `PROMPT $P$G` |
| `DELTREE` | Delete a directory with all its contents | `DELTREE OLD` |

### File naming and wildcards

DOS uses the **8.3 naming convention**: up to **8 characters** for the name,
a dot, and up to **3 characters** for the extension (e.g. `REPORT01.TXT`).
Names are not case-sensitive and cannot contain spaces or characters such as
`\ / : * ? " < > |`.

| Wildcard | Matches | Example |
| --- | --- | --- |
| `*` | Any number of characters | `*.TXT` — all text files; `*.*` — all files |
| `?` | Exactly one character | `FILE?.DOC` — FILE1.DOC, FILEA.DOC |

Common extensions: `.COM` and `.EXE` (executable programs), `.BAT` (batch
file), `.SYS` (system file), `.TXT` (text).

## UNIX

**UNIX** was developed in **1969** at **AT&T Bell Laboratories** by **Ken
Thompson and Dennis Ritchie**. In **1973** it was rewritten in the **C
language** (which Ritchie created), making it the first portable OS — it
could be moved to new hardware by recompiling. Major branches include
**System V** (AT&T) and **BSD** (University of California, Berkeley).
Commercial versions include Solaris (Sun/Oracle), AIX (IBM) and HP-UX; macOS
is a certified UNIX.

### Features

- **Multi-user** and **multitasking**.
- **Portable** — written mostly in C.
- **Hierarchical file system** starting from a single root `/`.
- **"Everything is a file"** — devices, directories and pipes are all
  accessed like files.
- **Shell** — a powerful command interpreter with scripting.
- **Pipes and redirection** — combine small tools: `ls | grep txt > list`.
- **Security** — user accounts, groups and file permissions.
- **Built-in networking** (TCP/IP was developed alongside BSD UNIX).
- Many small tools, each doing one job well (the **UNIX philosophy**).

### Architecture

```text diagram: UNIX architecture
            ┌───────────────────────────────────────────┐
            │  Users and applications                   │
            │   ┌───────────────────────────────────┐   │
            │   │  Shell and utilities              │   │
            │   │  (sh, bash, ksh, csh; ls, cp, vi)  │   │
            │   │   ┌───────────────────────────┐   │   │
            │   │   │  KERNEL                   │   │   │
            │   │   │  process, memory, file,   │   │   │
            │   │   │  device management        │   │   │
            │   │   │   ┌───────────────────┐   │   │   │
            │   │   │   │     HARDWARE      │   │   │   │
            │   │   │   └───────────────────┘   │   │   │
            │   │   └───────────────────────────┘   │   │
            │   └───────────────────────────────────┘   │
            └───────────────────────────────────────────┘
```

Common shells: **Bourne shell (sh)**, **C shell (csh)**, **Korn shell (ksh)**
and **Bash (Bourne Again Shell)** — the default on most Linux systems.

### File system hierarchy

```text diagram: the UNIX directory tree
  /                    root — top of the tree
  ├── bin              essential user commands (ls, cp)
  ├── sbin             system administration commands
  ├── etc              configuration files (passwd, hosts)
  ├── home             users' home directories (/home/ram)
  ├── root             home directory of the superuser
  ├── usr              user programs and libraries
  ├── var              variable data — logs, mail, spool
  ├── tmp              temporary files
  ├── dev              device files (/dev/sda)
  ├── boot             kernel and boot loader files
  ├── lib              shared libraries
  └── mnt, media       mount points for other file systems
```

Paths use the **forward slash** `/`, names are **case-sensitive**
(`File.txt` and `file.txt` are different), and `~` means the home directory.

### File permissions

Every file has an **owner**, a **group** and **others**, each with **read
(r)**, **write (w)** and **execute (x)** permissions.

```text diagram: reading a permission string
   -rwxr-xr--   1  ram  staff  2048  Oct 7  report.sh
   │└┬┘└┬┘└┬┘
   │ │  │  └── others: r-- (read only)
   │ │  └───── group:  r-x (read, execute)
   │ └──────── owner:  rwx (read, write, execute)
   └────────── type:   - file, d directory, l link
```

In numeric (octal) form, **r = 4, w = 2, x = 1**, added for each class:

| Permission | Numeric | Meaning |
| --- | --- | --- |
| `rwx` | 7 | Read, write, execute |
| `rw-` | 6 | Read, write |
| `r-x` | 5 | Read, execute |
| `r--` | 4 | Read only |

So `chmod 755 report.sh` gives `rwxr-xr-x`, and `chmod 644 notes.txt` gives
`rw-r--r--`. The superuser account, **root**, can override all permissions.

### Common UNIX / Linux commands

| Command | Purpose | Example |
| --- | --- | --- |
| `ls` | List directory contents | `ls -l` (long), `ls -a` (include hidden) |
| `pwd` | Print working (current) directory | `pwd` |
| `cd` | Change directory | `cd /home/ram`, `cd ..`, `cd ~` |
| `mkdir` / `rmdir` | Make / remove an empty directory | `mkdir reports` |
| `cp` | Copy | `cp a.txt b.txt`, `cp -r dir1 dir2` |
| `mv` | Move or rename | `mv old.txt new.txt` |
| `rm` | Remove files | `rm file.txt`, `rm -r dir` |
| `cat` | Display or join files | `cat notes.txt` |
| `more` / `less` | View a file page by page | `less log.txt` |
| `head` / `tail` | First / last lines of a file | `tail -f /var/log/syslog` |
| `touch` | Create an empty file or update its timestamp | `touch new.txt` |
| `grep` | Search text for a pattern | `grep "error" app.log` |
| `find` | Search for files | `find / -name "*.conf"` |
| `chmod` | Change permissions | `chmod 755 script.sh` |
| `chown` | Change owner | `chown ram file.txt` |
| `ps` | List running processes | `ps -ef` |
| `top` | Live view of processes and resource use | `top` |
| `kill` | Terminate a process by PID | `kill -9 1234` |
| `df` / `du` | Disk free space / disk usage of files | `df -h` |
| `man` | Show the manual for a command | `man ls` |
| `who` / `whoami` | Logged-in users / current user | `whoami` |
| `passwd` | Change password | `passwd` |
| `sudo` | Run a command as superuser | `sudo apt update` |
| `tar` | Archive files | `tar -cvf backup.tar dir/` |
| `ssh` | Secure remote login | `ssh ram@server` |
| `vi` / `nano` | Text editors | `vi config.txt` |

Redirection and pipes: `>` writes output to a file (overwrite), `>>`
appends, `<` reads input from a file, and `|` sends one command's output into
the next.

### Linux

**Linux** is a free, open-source, **UNIX-like** OS. Its kernel was written by
**Linus Torvalds in 1991** and released under the **GNU GPL** licence;
combined with the **GNU** tools (Richard Stallman's project), it forms a
complete OS. Linux is distributed in **distributions (distros)** — Ubuntu,
Debian, Fedora, Red Hat Enterprise Linux (RHEL), CentOS, SUSE, Kali, Linux
Mint. It runs most web servers, all of the world's top 500 supercomputers,
and Android phones. The Linux mascot is a penguin named **Tux**.

## Microsoft Windows

**Windows** is Microsoft's family of **graphical** operating systems.
Windows 1.0 (1985) was a graphical shell running on top of MS-DOS; from
**Windows NT (1993)** and **Windows XP (2001)** onwards, it became a full
independent OS built on the **NT kernel**.

### Version history

| Version | Year | Note |
| --- | --- | --- |
| Windows 1.0 | 1985 | GUI shell over MS-DOS |
| Windows 3.0 / 3.1 | 1990 / 1992 | First widely successful versions |
| Windows NT 3.1 | 1993 | New 32-bit NT kernel for business and servers |
| Windows 95 | 1995 | Start menu, taskbar, plug and play |
| Windows 98 / ME | 1998 / 2000 | Last DOS-based consumer versions |
| Windows 2000 | 2000 | NT-based business OS; Active Directory |
| Windows XP | 2001 | Merged consumer and NT lines; very long-lived |
| Windows Vista | 2007 | User Account Control (UAC), Aero interface |
| Windows 7 | 2009 | Very popular; taskbar improvements |
| Windows 8 / 8.1 | 2012 / 2013 | Touch-focused Start screen |
| Windows 10 | 2015 | Start menu returns; Cortana, Edge |
| Windows 11 | 2021 | Centred taskbar; needs TPM 2.0 and Secure Boot |

Server versions: Windows Server 2003, 2008, 2012, 2016, 2019, 2022, 2025.

### Features

- **Graphical User Interface** — desktop, windows, icons, Start menu,
  taskbar.
- **Preemptive multitasking**, multi-user accounts, multiprocessor support.
- **Plug and Play** — detects and configures new hardware automatically.
- **NTFS** file system with permissions, encryption (EFS), compression and
  journaling.
- **Registry** — a central hierarchical database of system and application
  settings (edited with `regedit`).
- Built-in networking, Wi-Fi, Remote Desktop.
- Security: **Windows Defender** antivirus, **Windows Firewall**, **UAC**,
  **BitLocker** disk encryption, Windows Update.
- Huge range of supported software and hardware.

### Key components and tools

| Component | Purpose |
| --- | --- |
| Desktop | Main screen with icons and wallpaper |
| Taskbar and Start menu | Launch programs; switch between open windows |
| File Explorer | Browse and manage files and folders |
| Control Panel / Settings | Configure the system |
| Task Manager | View and end processes, monitor performance (`Ctrl + Shift + Esc`) |
| Recycle Bin | Holds deleted files until emptied — they can be restored |
| Device Manager | Manage hardware and drivers |
| Disk Management | Partition and format disks |
| Event Viewer | View system and security logs |
| Command Prompt / PowerShell | Command-line interfaces |

> [!NOTE]
> Files deleted with **Shift + Delete**, or deleted from a USB drive or the
> command line, **bypass the Recycle Bin**.

### Useful keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl + C` / `Ctrl + X` / `Ctrl + V` | Copy / cut / paste |
| `Ctrl + Z` / `Ctrl + Y` | Undo / redo |
| `Ctrl + A` | Select all |
| `Alt + Tab` | Switch between open windows |
| `Alt + F4` | Close the active window |
| `Win + D` | Show desktop |
| `Win + E` | Open File Explorer |
| `Win + L` | Lock the computer |
| `Win + R` | Open the Run dialog |
| `Ctrl + Shift + Esc` | Open Task Manager |
| `F2` | Rename selected item |
| `F5` | Refresh |
| `Shift + Delete` | Delete permanently |

### Windows command equivalents

| Task | Windows (cmd) | UNIX / Linux |
| --- | --- | --- |
| List files | `dir` | `ls` |
| Change directory | `cd` | `cd` |
| Show current directory | `cd` (no argument) | `pwd` |
| Copy | `copy`, `xcopy` | `cp` |
| Move / rename | `move` / `ren` | `mv` |
| Delete file | `del` | `rm` |
| Make / remove directory | `md` / `rd` | `mkdir` / `rmdir` |
| Show file contents | `type` | `cat` |
| Clear screen | `cls` | `clear` |
| List processes | `tasklist` | `ps` |
| End a process | `taskkill` | `kill` |
| Network configuration | `ipconfig` | `ifconfig` / `ip addr` |
| Test connectivity | `ping` | `ping` |
| Trace route | `tracert` | `traceroute` |
| Help | `help`, `command /?` | `man command` |

## Comparison: DOS vs UNIX vs Windows

| | MS-DOS | UNIX / Linux | Windows |
| --- | --- | --- | --- |
| Developer | Microsoft (1981) | Bell Labs (1969); Linux by Linus Torvalds (1991) | Microsoft (1985) |
| Interface | CLI only | CLI (shell), GUI optional | GUI, with CLI available |
| Users | Single-user | Multi-user | Multi-user |
| Tasking | Single-tasking | Multitasking | Multitasking |
| Architecture | 16-bit | 32- and 64-bit | 32- and 64-bit |
| File system | FAT12 / FAT16 | ext4, XFS, UFS, ZFS | NTFS, FAT32, exFAT |
| Path separator | `\` backslash | `/` forward slash | `\` backslash |
| Case-sensitive names | No | **Yes** | No |
| Root | Drive letter (`C:\`) | Single root `/` | Drive letters (`C:\`) |
| Source code | Closed | UNIX: mostly closed; Linux: **open source** | Closed (proprietary) |
| Cost | Paid (now obsolete) | Linux free; commercial UNIX paid | Paid licence |
| Security | Minimal | Strong — permissions, root separation | Good — NTFS permissions, UAC, Defender |
| Main use today | Legacy only | Servers, supercomputers, Android, embedded | Desktops, laptops, business servers |

## Quick revision

> [!TIP]
> **One-line answers.** MS-DOS = Microsoft, 1981, single-user,
> single-tasking, CLI, 16-bit, FAT. COMMAND.COM = DOS command interpreter;
> internal commands live in it. UNIX = Bell Labs, 1969, Ken Thompson and
> Dennis Ritchie, rewritten in C (1973), multi-user and multitasking. Linux =
> Linus Torvalds, 1991, open source. Windows = GUI, NT kernel, NTFS, Registry.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: **DIR, COPY, DEL, CD** are
> **internal** commands; **FORMAT, XCOPY, CHKDSK, TREE** are **external**; DOS
> names follow the **8.3** rule; `RD` removes only **empty** directories; UNIX
> file names are **case-sensitive**; in `chmod 755`, 7 = rwx for the owner;
> `pwd` shows the current directory in UNIX; **Linux is a kernel**, not a full
> UNIX; Shift + Delete **bypasses** the Recycle Bin; Windows 95 introduced the
> **Start menu**.
