---
title: "Basic knowledge of database management system"
summary: Data, databases and the DBMS; why it beats a file system; architecture and data independence; data models; SQL language groups; transactions and ACID.
section: database-web
order: 1
tags: [database, dbms, sql, transactions]
updatedAt: "2026-10-07"
---

A bank holds millions of records — customers, accounts, transactions, loans —
that thousands of staff and systems read and update at the same moment. A
**database** is where that data lives; a **database management system
(DBMS)** is the software that stores it, keeps it correct and consistent,
lets many users share it safely, and answers questions about it.

## Basic terms

| Term | Meaning | Example |
| --- | --- | --- |
| Data | Raw facts and figures without context | `9841000000`, `Ram`, `25000` |
| Information | Data processed into a meaningful form | "Ram's account balance is Rs. 25 000" |
| Database | An organised collection of related data, stored so it can be accessed and managed easily | A bank's customer and account records |
| DBMS | Software to create, maintain, query and control access to databases | MySQL, Oracle, SQL Server |
| Database system | Database + DBMS + applications + users | A core banking system |
| Metadata | "Data about data" — names, types and constraints of the data, kept in the **data dictionary** | "Balance is a decimal(12,2), not null" |

## File system vs DBMS

Before databases, each application kept its own data files. This caused
serious problems:

| Problem in a file system | Meaning | How a DBMS solves it |
| --- | --- | --- |
| Data redundancy | The same data stored in many files | Data stored once, shared |
| Data inconsistency | Copies of the same data disagree (address updated in one file, not another) | Single copy; constraints |
| Difficulty accessing data | A new program is needed for every new question | A query language (SQL) |
| Data isolation | Data scattered in different files and formats | Integrated storage |
| Integrity problems | Rules (balance ≥ 0) buried in program code | Integrity constraints declared in the database |
| Atomicity problems | A failure mid-transfer can debit one account without crediting the other | Transactions — all or nothing |
| Concurrent-access anomalies | Simultaneous updates overwrite each other | Concurrency control (locking) |
| Security problems | Hard to give each user access to only part of the data | User accounts, privileges and views |

### Advantages and disadvantages of a DBMS

| Advantages | Disadvantages |
| --- | --- |
| Controls redundancy and inconsistency | High cost of software, hardware and staff |
| Data sharing among many users | Complexity — needs skilled administrators |
| Integrity and security enforcement | Larger size and resource needs |
| Backup and recovery | A failure can affect all applications (single point of failure) |
| Concurrent access | Performance overhead for very simple tasks |
| Data independence; standard query language | |

## Components of a database system

| Component | Description |
| --- | --- |
| Hardware | Servers, storage, network |
| Software | The DBMS, the OS, application programs |
| Data | The operational data and metadata |
| Procedures | Instructions and rules for using and running the database — backup, recovery, login |
| Users | People who interact with it |
| Query language | The language used to access the data (SQL) |

### Database users

| User | Role |
| --- | --- |
| **DBA — Database Administrator** | Has central control: defines the schema, grants access, manages security, backup and recovery, performance tuning |
| Database designer | Designs the structure — tables, relationships, constraints |
| Application programmer | Writes programs that use the database |
| End users — naive | Use ready-made applications (bank teller using the core banking screen, ATM user) |
| End users — sophisticated | Write their own queries (analysts) |

## DBMS architecture

### Three-schema (ANSI/SPARC) architecture

```text diagram: three levels of abstraction
           User 1           User 2            User 3
             │                │                 │
      ┌──────▼──────┐  ┌──────▼──────┐   ┌──────▼──────┐
      │ External    │  │ External    │   │ External    │   EXTERNAL LEVEL (views)
      │ view: teller│  │ view: loans │   │ view: audit │   what each user sees
      └──────┬──────┘  └──────┬──────┘   └──────┬──────┘
             └────────────────┼─────────────────┘
                   logical data independence
                     ┌────────▼────────┐
                     │ Conceptual      │                   CONCEPTUAL (LOGICAL) LEVEL
                     │ schema          │                   all tables, relationships,
                     └────────┬────────┘                   constraints
                   physical data independence
                     ┌────────▼────────┐
                     │ Internal        │                   INTERNAL (PHYSICAL) LEVEL
                     │ schema          │                   files, indexes, storage
                     └─────────────────┘
```

| Level | Describes | Who uses it |
| --- | --- | --- |
| External (view) | The part of the database relevant to a particular user | End users |
| Conceptual (logical) | **What** data is stored and how it relates — the whole database | DBA, designers |
| Internal (physical) | **How** data is physically stored — files, blocks, indexes | DBMS, DBA |

### Data independence

**Data independence** is the ability to change the schema at one level
without changing the schema at the next higher level.

| Type | Change at | Without affecting | Difficulty |
| --- | --- | --- | --- |
| **Physical** data independence | Internal level (new index, different storage) | Conceptual schema and applications | Easier to achieve |
| **Logical** data independence | Conceptual level (add a column or table) | External views and applications | Harder to achieve |

**Schema vs instance:** the **schema** is the design of the database — it
rarely changes. An **instance** (state) is the actual data at a given moment
— it changes constantly.

### Tier architecture

| Architecture | Structure | Example |
| --- | --- | --- |
| 1-tier | User works directly on the DBMS | A DBA running queries locally |
| 2-tier (client–server) | Client application talks directly to the database server | A desktop app connected to a SQL Server |
| 3-tier | Client → application server → database server | Internet banking: browser → web/app server → database |

The 3-tier architecture is more **secure and scalable** because users never
touch the database directly.

## Data models

A **data model** is a set of concepts used to describe the structure of a
database.

| Model | Structure | Note | Example |
| --- | --- | --- | --- |
| Hierarchical | Tree — each child has only one parent (1:N) | Fast for fixed hierarchies; rigid | IBM IMS |
| Network | Graph — a child can have many parents (M:N) | Flexible but complex | IDMS (CODASYL) |
| **Relational** | **Tables** (relations) of rows and columns linked by keys | Proposed by **E. F. Codd (1970)**; the dominant model | Oracle, MySQL, SQL Server, PostgreSQL |
| Entity–Relationship | Entities, attributes and relationships — a design model | Peter Chen (1976) | ER diagrams |
| Object-oriented | Data stored as objects with attributes and methods | Complex data | db4o, ObjectDB |
| Object-relational | Relational with object features | | PostgreSQL, Oracle |
| NoSQL | Document, key–value, column-family or graph | Huge scale, flexible schema | MongoDB, Redis, Cassandra, Neo4j |

```text diagram: hierarchical, network and relational models
  Hierarchical (tree)        Network (graph)          Relational (tables)
        Bank                  Branch   Branch          ┌──────────────────┐
       ╱    ╲                  │  ╲   ╱  │            │ Customer         │
   Branch  Branch              │   ╲ ╱   │            │ id │ name        │
    ╱  ╲                       │    ╳    │            └──────────────────┘
 Cust  Cust                   Cust      Cust           linked by keys to
                                                       ┌──────────────────┐
                                                       │ Account          │
                                                       │ no │ cust_id     │
                                                       └──────────────────┘
```

### RDBMS and Codd's rules

An **RDBMS (Relational DBMS)** stores data in related tables and uses SQL.
**E. F. Codd**, the father of the relational model, defined **12 rules**
(numbered 0 to 12, so 13 in total) that a system must follow to be truly
relational — for example, all information is represented as values in
tables (the information rule), every value is reachable by table name,
primary key and column name (guaranteed access), and NULL values are
handled systematically.

### SQL vs NoSQL

| | SQL (relational) | NoSQL |
| --- | --- | --- |
| Structure | Tables with a fixed schema | Documents, key–value, graphs, wide columns; flexible schema |
| Scaling | Mainly vertical (bigger server) | Horizontal (more servers) |
| Consistency | Strong — ACID | Often eventual consistency (BASE) |
| Best for | Structured data, complex queries, transactions — **banking** | Big data, real-time web apps, unstructured data |
| Examples | Oracle, MySQL, PostgreSQL, SQL Server | MongoDB, Cassandra, Redis, Neo4j |

## Database languages (SQL)

**SQL (Structured Query Language)** is the standard language for relational
databases. It was developed at IBM in the 1970s (originally *SEQUEL*) and is
standardised by ANSI and ISO. Its commands fall into groups:

| Group | Full form | Purpose | Commands |
| --- | --- | --- | --- |
| **DDL** | Data Definition Language | Define and change the **structure** | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |
| **DML** | Data Manipulation Language | Work with the **data** | `INSERT`, `UPDATE`, `DELETE`, `SELECT` (some list SELECT separately as **DQL**) |
| **DCL** | Data Control Language | Control **access** | `GRANT`, `REVOKE` |
| **TCL** | Transaction Control Language | Manage **transactions** | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

```sql
-- DDL: create a table
CREATE TABLE customer (
  customer_id INT PRIMARY KEY,
  name        VARCHAR(50) NOT NULL,
  phone       VARCHAR(15) UNIQUE,
  branch      VARCHAR(30)
);

-- DML: add, change, read and remove data
INSERT INTO customer VALUES (1, 'Ram Sharma', '9841000000', 'Kathmandu');
UPDATE customer SET branch = 'Pokhara' WHERE customer_id = 1;
SELECT name, branch FROM customer WHERE branch = 'Pokhara';
DELETE FROM customer WHERE customer_id = 1;

-- DCL: give a user read access
GRANT SELECT ON customer TO teller_user;
```

### DELETE vs TRUNCATE vs DROP

| | DELETE | TRUNCATE | DROP |
| --- | --- | --- | --- |
| Type | DML | DDL | DDL |
| Removes | Selected rows (with WHERE) or all rows | All rows | The whole table — structure and data |
| Table structure | Kept | Kept | Removed |
| Rollback | Possible | Usually not | Not possible |
| Speed | Slower (row by row, logged) | Fast | Fast |

## Transactions

A **transaction** is a logical unit of work made of one or more operations
that must be completed **as a whole or not at all** — for example, a fund
transfer: debit account A **and** credit account B.

### ACID properties

| Property | Meaning | Fund-transfer example |
| --- | --- | --- |
| **Atomicity** | All operations happen, or none do | If the credit fails, the debit is rolled back |
| **Consistency** | The database moves from one valid state to another; rules are never broken | Total money in the bank is unchanged |
| **Isolation** | Concurrent transactions do not interfere; each behaves as if it ran alone | Two simultaneous transfers do not mix up balances |
| **Durability** | Once committed, changes survive any later failure | After the success message, a power cut cannot undo the transfer |

### Transaction states

```text diagram: states of a transaction
                        ┌─────────────────────┐  COMMIT   ┌───────────┐
   ┌────────┐  last op  │ PARTIALLY COMMITTED │ ────────► │ COMMITTED │
   │ ACTIVE │ ────────► └─────────┬───────────┘           └─────┬─────┘
   └───┬────┘                     │ failure                     │
       │ failure        ┌─────────▼───┐   ROLLBACK  ┌───────────▼┐
       └──────────────► │   FAILED    │ ──────────► │  ABORTED   │──► TERMINATED
                        └─────────────┘             └────────────┘
```

### Concurrency problems

When transactions run at the same time without control:

| Problem | What happens |
| --- | --- |
| Lost update | Two transactions update the same data; one overwrites the other |
| Dirty read | A transaction reads data written by another transaction that later rolls back |
| Non-repeatable read | Reading the same row twice gives different values because another transaction changed it |
| Phantom read | Re-running a query returns new rows inserted by another transaction |

**Concurrency control** prevents these, mainly with **locks** — a **shared
(read) lock** lets many transactions read; an **exclusive (write) lock** lets
only one write — and protocols such as **two-phase locking (2PL)**, or with
timestamps and multiversioning (MVCC).

### Recovery

The DBMS keeps a **transaction log** recording every change. After a crash it
**redoes** committed transactions and **undoes** uncommitted ones, using
**checkpoints** to limit how far back it must look. Combined with regular
backups, this restores the database to a consistent state.

## Popular DBMS software

| DBMS | Vendor | Type |
| --- | --- | --- |
| Oracle Database | Oracle | Commercial RDBMS — widely used by banks |
| Microsoft SQL Server | Microsoft | Commercial RDBMS |
| IBM Db2 | IBM | Commercial RDBMS — mainframes |
| MySQL | Oracle (open source) | Open-source RDBMS |
| PostgreSQL | Community | Open-source object-relational DBMS |
| MariaDB | Community | MySQL fork |
| SQLite | Public domain | Embedded, file-based |
| Microsoft Access | Microsoft | Desktop DBMS |
| MongoDB | MongoDB Inc. | NoSQL document database |

## Quick revision

> [!TIP]
> **One-line answers.** DBMS = software to manage databases. Three levels:
> external, conceptual, internal. Physical data independence is easier than
> logical. Relational model = E. F. Codd, 1970. DDL = CREATE, ALTER, DROP;
> DML = INSERT, UPDATE, DELETE, SELECT; DCL = GRANT, REVOKE; TCL = COMMIT,
> ROLLBACK. ACID = atomicity, consistency, isolation, durability. DBA has
> central control of the database.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: **TRUNCATE** is DDL, not
> DML; **DELETE** can be rolled back, **DROP** cannot; metadata is stored in
> the **data dictionary**; the **schema** rarely changes, the **instance**
> changes constantly; **atomicity** = all or nothing, **durability** =
> survives failure after commit; a **dirty read** reads uncommitted data; the
> hierarchical model is a **tree**, the network model a **graph**; ER model
> was introduced by **Peter Chen**; banks prefer **ACID** relational
> databases for transactions.
