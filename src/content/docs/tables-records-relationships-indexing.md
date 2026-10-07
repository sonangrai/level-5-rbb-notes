---
title: "Tables, records, relationships and indexing"
summary: The parts of a relational table, keys and integrity constraints, relationships and ER diagrams, normalisation from 1NF to BCNF, SQL joins, and how indexes speed up queries.
section: database-web
order: 2
tags: [database, keys, er-diagram, normalization, indexing, sql]
updatedAt: "2026-10-07"
---

In a relational database, everything is stored in **tables**. Good design
comes down to four questions: what goes in each table, how each row is
uniquely identified (**keys**), how tables connect (**relationships**), and
how to find rows quickly (**indexing**). **Normalisation** is the discipline
that keeps tables free of duplicated, contradictory data.

## Tables, records and fields

```text diagram: anatomy of a table
                      ┌── attribute / field / column
                      ▼
  Table: CUSTOMER  ┌─────────────┬──────────────┬────────────┬───────────┐
  (relation)       │ customer_id │ name         │ phone      │ branch    │  ◄── schema
                   ├─────────────┼──────────────┼────────────┼───────────┤
  record / row ──► │ 101         │ Ram Sharma   │ 9841000001 │ Kathmandu │
  (tuple)          │ 102         │ Sita Rai     │ 9851000002 │ Pokhara   │
                   │ 103         │ Hari Thapa   │ NULL       │ Kathmandu │
                   └─────────────┴──────────────┴────────────┴───────────┘
                      ▲ primary key                             ▲ field value
```

| Relational term | Everyday term | File-system term | Meaning |
| --- | --- | --- | --- |
| Relation | Table | File | A set of rows about one kind of thing |
| Tuple | Row | Record | One instance — one customer |
| Attribute | Column | Field | One property — name, phone |
| Domain | Allowed values | Data type | The set of valid values for an attribute (e.g. 10-digit phone numbers) |
| Degree | Number of columns | | The CUSTOMER table above has degree **4** |
| Cardinality | Number of rows | | The CUSTOMER table above has cardinality **3** |

**NULL** means a value is **unknown or not applicable** — it is not zero and
not an empty string.

### Common data types

| Type | Stores | Example |
| --- | --- | --- |
| `INT`, `BIGINT` | Whole numbers | Customer ID |
| `DECIMAL(p, s)` / `NUMERIC` | Exact decimal numbers — used for money | `DECIMAL(12,2)` for balances |
| `FLOAT`, `REAL` | Approximate decimal numbers | Scientific values (never money) |
| `CHAR(n)` | Fixed-length text | Gender code `CHAR(1)` |
| `VARCHAR(n)` | Variable-length text | Name |
| `DATE`, `TIME`, `TIMESTAMP` | Dates and times | Transaction date |
| `BOOLEAN` | True / false | Is active |
| `BLOB` / `CLOB` | Large binary / text objects | Scanned signature, document |

## Keys

A **key** is one or more attributes used to identify rows and link tables.

| Key | Definition | Example |
| --- | --- | --- |
| **Super key** | Any set of attributes that uniquely identifies a row | {customer_id}, {customer_id, name}, {citizenship_no} |
| **Candidate key** | A **minimal** super key — no attribute can be removed | {customer_id}, {citizenship_no}, {phone} |
| **Primary key (PK)** | The candidate key chosen to identify rows; **unique and never NULL**; one per table | customer_id |
| **Alternate key** | Candidate keys not chosen as primary | citizenship_no, phone |
| **Foreign key (FK)** | An attribute in one table that refers to the primary key of another | account.customer_id → customer.customer_id |
| **Composite key** | A key made of two or more attributes | {account_no, txn_date, txn_seq} |
| **Unique key** | Must be unique but may allow a NULL | email |
| **Surrogate key** | An artificial key with no business meaning, often auto-numbered | An identity column |

```text diagram: keys, from widest to narrowest
  Super keys ⊇ Candidate keys ⊇ { Primary key } ;  Alternate = Candidate − Primary
```

## Integrity constraints

**Constraints** are rules the DBMS enforces to keep data valid.

| Constraint | Rule |
| --- | --- |
| Domain constraint | Each value must come from the attribute's domain (right type and range) |
| **Entity integrity** | The primary key must be **unique and not NULL** |
| **Referential integrity** | A foreign key value must match an existing primary key value in the referenced table, or be NULL |
| `NOT NULL` | The column must always have a value |
| `UNIQUE` | No two rows may have the same value |
| `CHECK` | Values must satisfy a condition — `CHECK (balance >= 0)` |
| `DEFAULT` | A value used when none is given |

Referential integrity also decides what happens when a referenced row is
deleted: **`ON DELETE CASCADE`** deletes the dependent rows too, **`SET
NULL`** clears the foreign key, and **`RESTRICT` / `NO ACTION`** blocks the
delete.

```sql
CREATE TABLE account (
  account_no  VARCHAR(20) PRIMARY KEY,
  customer_id INT NOT NULL,
  type        VARCHAR(10) CHECK (type IN ('SAVING', 'CURRENT', 'FIXED')),
  balance     DECIMAL(12,2) DEFAULT 0 CHECK (balance >= 0),
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
    ON DELETE RESTRICT
);
```

## Relationships

A **relationship** is an association between tables, built with a foreign
key. Its **cardinality** says how many rows on each side can be linked.

| Type | Meaning | Example | How it is built |
| --- | --- | --- | --- |
| **One-to-one (1:1)** | One row in A matches at most one row in B | Customer ↔ KYC record; Person ↔ citizenship | Foreign key with a UNIQUE constraint (or merge the tables) |
| **One-to-many (1:N)** | One row in A matches many rows in B; each B row matches one A row | Branch → accounts; Customer → loans | Foreign key on the "many" side |
| **Many-to-many (M:N)** | Many rows in A match many rows in B | Customers ↔ accounts (joint accounts); Students ↔ courses | A **junction (bridge) table** holding both foreign keys |

```text diagram: a many-to-many relationship through a junction table
  ┌─────────────┐        ┌──────────────────────┐        ┌──────────────┐
  │ CUSTOMER    │ 1    N │ ACCOUNT_HOLDER       │ N    1 │ ACCOUNT      │
  │ customer_id │◄───────│ customer_id (FK)     │───────►│ account_no   │
  │ name        │        │ account_no  (FK)     │        │ balance      │
  └─────────────┘        │ PK = both columns    │        └──────────────┘
                         └──────────────────────┘
```

## Entity–Relationship (ER) model

The **ER model**, introduced by **Peter Chen in 1976**, is used to design a
database before building tables.

| Concept | Meaning | Example |
| --- | --- | --- |
| Entity | A real-world object with independent existence | Customer, Account, Branch |
| Entity set | All entities of the same type | All customers |
| Attribute | A property of an entity | Name, date of birth |
| Relationship | An association between entities | Customer **holds** Account |
| Weak entity | Cannot be identified by its own attributes; depends on a strong (owner) entity | Dependent of an employee; instalment of a loan |

### Types of attributes

| Attribute | Meaning | Example |
| --- | --- | --- |
| Simple (atomic) | Cannot be divided | Gender |
| Composite | Made of smaller parts | Name = first + middle + last; Address = street + city |
| Single-valued | One value per entity | Date of birth |
| Multivalued | Several values per entity | Phone numbers, email addresses |
| Derived | Calculated from other attributes | Age (from date of birth) |
| Key | Uniquely identifies the entity | Customer ID (underlined in diagrams) |

### ER diagram symbols

| Symbol | Represents |
| --- | --- |
| Rectangle | Entity |
| Double rectangle | Weak entity |
| Ellipse (oval) | Attribute |
| Underlined attribute | Key attribute |
| Double ellipse | Multivalued attribute |
| Dashed ellipse | Derived attribute |
| Diamond | Relationship |
| Double diamond | Identifying relationship (for a weak entity) |
| Line | Connects attributes to entities and entities to relationships |
| Double line | Total participation (every entity must take part) |

```text diagram: a small ER diagram
       (name)   (_customer_id_)           (_account_no_)   (balance)
           ╲        ╱                             ╲         ╱
        ┌────────────┐      ╱ ╲            ┌────────────┐
        │  CUSTOMER  │─M───< HOLDS >───N───│  ACCOUNT   │
        └────────────┘      ╲ ╱            └─────┬──────┘
           ╱       ╲                             │ N
     ((phone))   [age]                          ╱ ╲
     multivalued derived                      < AT  >
                                                ╲ ╱
                                                 │ 1
                                          ┌────────────┐
                                          │   BRANCH   │
                                          └────────────┘
```

## Normalisation

**Normalisation** is the process of organising tables to **reduce redundancy
and remove anomalies**, by splitting large tables into smaller related ones.
It was introduced by **E. F. Codd**.

### Anomalies in a badly designed table

| Anomaly | Problem |
| --- | --- |
| Insertion anomaly | Cannot add some data without unrelated data (cannot add a new product until someone orders it) |
| Update anomaly | The same fact stored in many rows must be changed everywhere, or the data becomes inconsistent |
| Deletion anomaly | Deleting one fact accidentally deletes another (deleting the only order deletes the customer's details) |

### Functional dependency

**A → B** (A functionally determines B) means that each value of A is
associated with exactly one value of B. For example, `customer_id → name`.

- **Partial dependency** — a non-key attribute depends on only **part** of a
  composite primary key.
- **Transitive dependency** — a non-key attribute depends on another non-key
  attribute (A → B → C).

### Normal forms, worked through

Start with an unnormalised order table:

| order_id | order_date | customer_id | customer_name | items |
| --- | --- | --- | --- | --- |
| 1 | 2026-10-01 | C1 | Ram | P1 ×2, P2 ×1 |
| 2 | 2026-10-02 | C2 | Sita | P1 ×1 |

**First Normal Form (1NF)** — every column holds **atomic** (single) values
and there are no repeating groups. Split the items into one row each; the
primary key becomes (order_id, product_id):

| order_id | product_id | order_date | customer_id | customer_name | product_name | qty |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | P1 | 2026-10-01 | C1 | Ram | Pen | 2 |
| 1 | P2 | 2026-10-01 | C1 | Ram | Notebook | 1 |
| 2 | P1 | 2026-10-02 | C2 | Sita | Pen | 1 |

**Second Normal Form (2NF)** — in 1NF, and **no partial dependency**: every
non-key attribute depends on the **whole** primary key. Here order_date,
customer_id and customer_name depend only on order_id, and product_name only
on product_id, so split (primary keys in bold):

- **ORDER** (**order_id**, order_date, customer_id, customer_name)
- **PRODUCT** (**product_id**, product_name)
- **ORDER_ITEM** (**order_id, product_id**, qty)

**Third Normal Form (3NF)** — in 2NF, and **no transitive dependency**. In
ORDER, customer_name depends on customer_id, which depends on order_id, so
split again:

- **CUSTOMER** (**customer_id**, customer_name)
- **ORDER** (**order_id**, order_date, customer_id)
- **PRODUCT** (**product_id**, product_name)
- **ORDER_ITEM** (**order_id, product_id**, qty)

Now every fact is stored once: a customer's name changes in one row.

| Normal form | Requirement |
| --- | --- |
| 1NF | Atomic values; no repeating groups; each row unique |
| 2NF | 1NF + no partial dependency on a composite key |
| 3NF | 2NF + no transitive dependency — "every non-key attribute depends on the key, the whole key, and nothing but the key" |
| BCNF (3.5NF) | For every dependency A → B, **A must be a super key** — a stricter 3NF |
| 4NF | BCNF + no multivalued dependencies |
| 5NF | 4NF + no join dependencies |

> [!NOTE]
> A table with a **single-column primary key** that is in 1NF is
> automatically in 2NF, since partial dependency needs a composite key.
> **Denormalisation** — deliberately adding redundancy back — is sometimes
> used to speed up reporting, as in data warehouses.

## Retrieving related data: joins

A **join** combines rows from two or more tables using a related column.

```sql
SELECT c.name, a.account_no, a.balance
FROM customer c
INNER JOIN account a ON a.customer_id = c.customer_id
WHERE a.balance > 100000
ORDER BY a.balance DESC;
```

| Join | Returns |
| --- | --- |
| INNER JOIN | Only rows with a match in both tables |
| LEFT (OUTER) JOIN | All rows from the left table, plus matches from the right (NULL where none) |
| RIGHT (OUTER) JOIN | All rows from the right table, plus matches from the left |
| FULL (OUTER) JOIN | All rows from both tables, matched where possible |
| CROSS JOIN | Every combination of rows — the Cartesian product |
| SELF JOIN | A table joined to itself (employee and their manager) |

Other useful clauses: `GROUP BY` with aggregate functions (`COUNT`, `SUM`,
`AVG`, `MIN`, `MAX`), `HAVING` to filter groups, and `DISTINCT` to remove
duplicates. A **view** is a saved query that behaves like a virtual table.

## Indexing

An **index** is a separate data structure that lets the DBMS **find rows
quickly without scanning the whole table** — like the index at the back of a
book that gives the page number for each topic.

```text diagram: finding a row with and without an index
  Without an index (full table scan)        With an index on customer_id
  ┌─────┐                                   index (sorted)     table
  │ row │ ◄─ check                          ┌─────┬──────┐    ┌──────────┐
  │ row │ ◄─ check                          │ 101 │ ptr ─┼──► │ row 101  │
  │ row │ ◄─ check                          │ 102 │ ptr ─┼──► │ row 102  │
  │ ... │     every row read                │ 103 │ ptr ─┼──► │ row 103  │
  │ row │ ◄─ check                          └─────┴──────┘    └──────────┘
  └─────┘     O(n)                           a few lookups: O(log n)
```

```sql
CREATE INDEX idx_customer_phone ON customer(phone);
CREATE UNIQUE INDEX idx_customer_citizenship ON customer(citizenship_no);
DROP INDEX idx_customer_phone;
```

### Types of indexes

| Index | Description |
| --- | --- |
| Primary index | Built on the primary key; the DBMS usually creates it automatically |
| **Clustered index** | **Determines the physical order** of rows in the table — the table is stored sorted by it. **Only one per table** |
| **Non-clustered (secondary) index** | A separate structure with pointers to the rows; the table order is unchanged. **Many per table** |
| Unique index | Prevents duplicate values in the column |
| Composite index | Built on two or more columns, e.g. (branch, account_type) |
| Dense index | An index entry for **every** record |
| Sparse index | Entries for only **some** records (one per block); needs sorted data |
| Bitmap index | A bit array per value — good for columns with few distinct values (gender, status); common in data warehouses |
| Full-text index | Supports searching words inside large text |

### Index data structures

| Structure | How it works | Good for |
| --- | --- | --- |
| **B-tree / B+ tree** | A balanced tree kept sorted; B+ trees store all data pointers in the linked leaf level | Equality **and range** queries (`BETWEEN`, `<`, `ORDER BY`) — the default in most DBMSs |
| Hash index | A hash function maps the key to a bucket | **Equality** lookups only (`=`), very fast |

### Advantages and disadvantages

| Advantages | Disadvantages |
| --- | --- |
| Much faster `SELECT`, `WHERE`, `JOIN`, `ORDER BY` | Uses extra storage |
| Enforces uniqueness (unique index) | **Slows `INSERT`, `UPDATE`, `DELETE`**, because indexes must be updated too |
| Faster sorting and grouping | Too many indexes hurt performance |

> [!TIP]
> **When to index:** columns used often in `WHERE`, `JOIN` and `ORDER BY`,
> with many distinct values — account number, customer ID, phone. **Avoid**
> indexing small tables, columns that change constantly, or columns with very
> few distinct values (unless using a bitmap index).

## Quick revision

> [!TIP]
> **One-line answers.** Table = relation; row = tuple = record; column =
> attribute = field. Degree = number of columns; cardinality = number of rows.
> Primary key = unique + not NULL; foreign key = refers to another table's
> primary key. M:N relationships need a junction table. 1NF = atomic values;
> 2NF = no partial dependency; 3NF = no transitive dependency; BCNF = every
> determinant is a super key. Clustered index = physical order, one per table.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: **degree** counts
> **columns**, **cardinality** counts **rows**; a primary key can **never** be
> NULL, a foreign key **can**; a candidate key is a **minimal** super key;
> only **one clustered** index per table but **many non-clustered**; indexes
> speed up reads but **slow down writes**; NULL is **not** zero; a
> multivalued attribute is a **double ellipse**, a derived attribute a
> **dashed** ellipse, a weak entity a **double rectangle**; normalisation
> **reduces redundancy**, denormalisation adds it back for speed.
