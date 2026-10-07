---
title: "Data warehousing, its process, and data mining"
summary: What a data warehouse is and how it differs from an operational database, its architecture, the ETL process, star and snowflake schemas, OLAP, and data mining techniques.
section: database-web
order: 3
tags: [database, data-warehouse, etl, olap, data-mining, business-intelligence]
updatedAt: "2026-10-07"
---

A bank's core banking database is built to process transactions quickly —
deposits, withdrawals, transfers — one at a time. It is not built to answer
questions like *"How did deposits grow in each province over the last five
years?"* Asking that of the live system would be slow and could disrupt
customers. A **data warehouse** is a separate database built for exactly such
analysis: it collects data from many systems, cleans it, keeps its history,
and organises it for reporting. **Data mining** then digs through that data
to find hidden patterns.

## What is a data warehouse?

**Bill Inmon**, called the *father of data warehousing*, defined it as:

> A **subject-oriented, integrated, time-variant and non-volatile** collection
> of data in support of management's decision-making process.

| Characteristic | Meaning | Example |
| --- | --- | --- |
| **Subject-oriented** | Organised around business subjects, not applications | Customers, loans, deposits — rather than "teller system" |
| **Integrated** | Data from different sources is made consistent — names, codes, formats, units | Gender coded M/F in one system and 1/0 in another becomes one standard |
| **Time-variant** | Keeps historical data, with time as a key part of every record | Monthly balances for the last ten years |
| **Non-volatile** | Once loaded, data is not changed or deleted; it is read and added to, not updated | Last year's figures stay fixed |

**Ralph Kimball** is the other key figure; he championed **dimensional
modelling** (star schemas) and building the warehouse from data marts.

## OLTP vs OLAP

| | OLTP (operational database) | OLAP (data warehouse) |
| --- | --- | --- |
| Full form | Online Transaction Processing | Online Analytical Processing |
| Purpose | Run day-to-day operations | Analysis and decision-making |
| Users | Clerks, tellers, customers — thousands | Managers, analysts — fewer |
| Operations | Many short INSERT, UPDATE, DELETE | Mostly complex, read-only SELECT queries |
| Data | Current, detailed | Historical, summarised and detailed |
| Design | Normalised (3NF) — avoid redundancy | **Denormalised** — star / snowflake schema, for fast queries |
| Size | Gigabytes | Terabytes to petabytes |
| Response time | Milliseconds | Seconds to minutes |
| Example | Core banking system, ATM network | Branch performance dashboard, NPL trend analysis |

## Data warehouse architecture

```text diagram: data warehouse architecture
  DATA SOURCES            STAGING / ETL              STORAGE                    ACCESS
  ┌────────────────┐                             ┌──────────────────┐
  │ Core banking   │──┐                          │                  │      ┌─────────────────┐
  ├────────────────┤  │   ┌──────────────────┐   │  DATA WAREHOUSE  │ ───► │ Reports, BI     │
  │ Loan system    │──┼─► │  EXTRACT         │   │  (integrated,    │      │ dashboards      │
  ├────────────────┤  │   │  TRANSFORM       │──►│  historical)     │      ├─────────────────┤
  │ Cards / ATM    │──┤   │  LOAD            │   │                  │ ───► │ OLAP analysis   │
  ├────────────────┤  │   │  (staging area)  │   └───┬──────┬───────┘      ├─────────────────┤
  │ CRM, Excel,    │──┘   └──────────────────┘       │      │              │ Data mining     │
  │ external data  │                            ┌────▼─┐ ┌──▼───┐ ───────► └─────────────────┘
  └────────────────┘                            │ DATA │ │ DATA │
                                                │ MART │ │ MART │  (loans, finance …)
                         METADATA REPOSITORY    └──────┘ └──────┘
                         describes everything ─────────────────────────────────
```

### Three-tier architecture

| Tier | Contents |
| --- | --- |
| Bottom tier | The **warehouse database server** (usually relational), fed by ETL tools |
| Middle tier | The **OLAP server** (ROLAP or MOLAP) that presents data for analysis |
| Top tier | **Front-end tools** — query, reporting, analysis and data-mining tools |

### Components

| Component | Role |
| --- | --- |
| Source systems | Operational databases and files the data comes from |
| Staging area | A temporary workspace where data is cleaned and transformed before loading |
| ETL tools | Software that extracts, transforms and loads (Informatica, SSIS, Talend, Oracle Data Integrator) |
| Warehouse database | The central store of integrated, historical data |
| **Data mart** | A smaller warehouse for **one department or subject** (loans, treasury, HR) |
| **Metadata** | Data about the warehouse data — sources, definitions, transformations, refresh times |
| Access tools | Reporting, OLAP, dashboards, data mining (Power BI, Tableau, Oracle BI) |

### Data mart

| | Data warehouse | Data mart |
| --- | --- | --- |
| Scope | Enterprise-wide, many subjects | One department or subject |
| Size | Very large | Smaller |
| Sources | Many | Few, or the warehouse itself |
| Build time | Months to years | Weeks to months |

- **Dependent data mart** — built from the central data warehouse
  (Inmon's top-down approach).
- **Independent data mart** — built directly from source systems
  (Kimball's bottom-up approach, later integrated).

## The process of data warehousing

### ETL: extract, transform, load

**ETL** is the heart of data warehousing — the process that moves data from
source systems into the warehouse.

```text diagram: the ETL pipeline
  ┌──────────────┐      ┌───────────────────────────┐      ┌──────────────┐
  │  1. EXTRACT  │ ───► │  2. TRANSFORM             │ ───► │  3. LOAD     │
  │ read data    │      │ clean, standardise,       │      │ write into   │
  │ from sources │      │ integrate, aggregate      │      │ the warehouse│
  └──────────────┘      └───────────────────────────┘      └──────────────┘
```

**1. Extract** — read data from the source systems.

- **Full extraction** — copy all the data each time.
- **Incremental (delta) extraction** — copy only what changed since the last
  run, using timestamps or change data capture (CDC).

**2. Transform** — convert the data into a consistent, clean, useful form.

| Transformation | Example |
| --- | --- |
| Cleaning | Fix misspellings, fill or flag missing values, remove invalid data |
| Standardisation | Dates to one format; "Ktm", "Kathmandu", "KTM" → "Kathmandu" |
| De-duplication | Merge the same customer appearing in several systems |
| Integration | Combine data from different sources using common keys |
| Derivation | Calculate new values — age from date of birth, profit = income − cost |
| Aggregation | Summarise — daily transactions into monthly totals |
| Filtering | Keep only the needed rows and columns |
| Splitting and joining | Split full names into first and last; join related tables |
| Key generation | Assign surrogate keys for warehouse tables |

**3. Load** — write the transformed data into the warehouse.

- **Initial load** — the first full population of the warehouse.
- **Incremental load** — periodically add new and changed data (nightly,
  hourly).
- **Full refresh** — erase and reload a table completely.

> [!NOTE]
> **ELT** (extract, load, transform) reverses the last two steps: raw data is
> loaded first and transformed inside the target system. It is common with
> powerful cloud warehouses such as Snowflake, BigQuery and Redshift.

### Steps to build a data warehouse

1. **Requirement analysis** — identify the business questions and the reports
   decision-makers need.
2. **Identify data sources** — find which systems hold the data, and assess
   its quality.
3. **Design the data model** — choose facts, dimensions and the schema (star
   or snowflake); decide the **granularity** (level of detail).
4. **Design and build ETL** — mappings, cleaning rules and schedules.
5. **Load the data** — initial load, then scheduled incremental loads.
6. **Build OLAP cubes, data marts and reports** — dashboards and analysis
   tools for users.
7. **Test** — data accuracy, performance and user acceptance.
8. **Deploy, then maintain** — monitor loads, tune performance, add new
   sources, archive old data.

## Dimensional modelling

Warehouses are usually designed with **dimensional models**, which are easy
to understand and fast to query.

| Table | Contains | Example |
| --- | --- | --- |
| **Fact table** | Numeric **measures** of a business event, plus foreign keys to dimensions. Usually very large | Transaction amount, number of transactions, loan balance |
| **Dimension table** | Descriptive **context** — the "who, what, where, when" used to filter and group facts | Customer, branch, product, date |

### Star schema

```text diagram: star schema
                         ┌──────────────┐
                         │ DIM_DATE     │
                         │ date_key     │
                         │ day, month,  │
                         │ quarter, year│
                         └──────┬───────┘
                                │
  ┌──────────────┐     ┌────────▼─────────┐     ┌──────────────┐
  │ DIM_CUSTOMER │     │ FACT_TRANSACTION │     │ DIM_BRANCH   │
  │ customer_key │◄────│ date_key     (FK)│────►│ branch_key   │
  │ name, age,   │     │ customer_key (FK)│     │ name, city,  │
  │ segment      │     │ branch_key   (FK)│     │ province     │
  └──────────────┘     │ product_key  (FK)│     └──────────────┘
                       │ amount   (measure)│
                       │ txn_count(measure)│
                       └────────┬─────────┘
                                │
                         ┌──────▼───────┐
                         │ DIM_PRODUCT  │
                         │ product_key  │
                         │ type, name   │
                         └──────────────┘
```

| Schema | Structure | Pros | Cons |
| --- | --- | --- | --- |
| **Star** | One central fact table joined directly to **denormalised** dimension tables | Simple; fastest queries (fewer joins) | Some redundancy in dimensions |
| **Snowflake** | Dimensions are **normalised** into sub-tables (branch → city → province) | Less redundancy, less storage | More joins; slower, more complex |
| **Galaxy (fact constellation)** | Several fact tables share dimension tables | Models many business processes | Most complex |

## OLAP

**OLAP** lets users analyse data **multidimensionally** — for example,
deposits by **branch × product × month**. The data is viewed as a **cube**.

```text diagram: an OLAP data cube
                 ┌─────────┬─────────┬─────────┐
               ╱         ╱         ╱         ╱ │
             ╱ Q4      ╱         ╱         ╱   │      dimensions:
           ┌─────────┬─────────┬─────────┐     │        branch  (rows)
  Kathmandu│  520    │  310    │  145    │   ╱ │        product (columns)
           ├─────────┼─────────┼─────────┤ ╱   │        quarter (depth)
  Pokhara  │  210    │  180    │   60    │     │
           ├─────────┼─────────┼─────────┤   ╱       measure: deposits
  Biratnagar  190    │  120    │   75    │ ╱          (Rs. million)
           └─────────┴─────────┴─────────┘
             Saving    Current   Fixed
```

### OLAP operations

| Operation | What it does | Example |
| --- | --- | --- |
| **Roll-up** (drill-up) | Summarise to a higher level, or remove a dimension | Branch → province → country; month → year |
| **Drill-down** | Go to more detail — the opposite of roll-up | Year → quarter → month |
| **Slice** | Fix **one** dimension to a single value, giving a 2-D sub-cube | Only Q4 data |
| **Dice** | Select values on **two or more** dimensions, giving a smaller sub-cube | Q3–Q4 for Kathmandu and Pokhara, saving accounts only |
| **Pivot** (rotate) | Rotate the axes to view the data differently | Swap branches and products between rows and columns |

### Types of OLAP

| Type | Storage | Strength | Weakness |
| --- | --- | --- | --- |
| **MOLAP** — Multidimensional | Pre-computed multidimensional cubes | Fastest queries | Limited data volume; cube processing time |
| **ROLAP** — Relational | Relational tables; SQL generated on the fly | Handles huge data volumes | Slower queries |
| **HOLAP** — Hybrid | Summaries in cubes, details in relational tables | Balances the two | More complex |

## Data lake vs data warehouse

| | Data warehouse | Data lake |
| --- | --- | --- |
| Data | Structured, cleaned, processed | Raw — structured, semi-structured and unstructured (logs, images, text) |
| Schema | **Schema-on-write** — defined before loading | **Schema-on-read** — applied when used |
| Users | Business analysts | Data scientists |
| Purpose | Reporting and BI | Exploration, machine learning, big data |
| Cost | Higher per terabyte | Lower — cheap storage |

A **lakehouse** combines the two.

## Data mining

**Data mining** is the process of **discovering hidden patterns,
relationships and trends in large datasets** using statistics, machine
learning and database techniques. It is also called **knowledge discovery in
databases (KDD)**, although strictly it is one step of the KDD process.

### The KDD process

```text diagram: knowledge discovery in databases
  Raw data ──► 1. Selection ──► 2. Pre-processing ──► 3. Transformation
                 (choose the      (clean noise and       (reduce, normalise,
                  relevant data)   missing values)        create features)
                                                               │
  Knowledge ◄── 5. Interpretation / evaluation ◄── 4. DATA MINING
                 (validate and present the           (apply algorithms
                  patterns)                           to find patterns)
```

### Data mining techniques

| Technique | Purpose | Banking example |
| --- | --- | --- |
| **Classification** | Assign records to **predefined** classes (supervised) | Loan applicant: likely to default or not |
| **Clustering** | Group similar records **without predefined** classes (unsupervised) | Segment customers by behaviour for marketing |
| **Association rules** | Find items that occur together | Customers with a home loan often take home insurance |
| **Regression** | Predict a numeric value | Forecast deposit growth |
| **Prediction / forecasting** | Predict future values or behaviour | Predict which customers will leave (churn) |
| **Anomaly (outlier) detection** | Find unusual records | Detect fraudulent card transactions, money laundering |
| **Sequential patterns** | Find patterns over time | Customers who open a saving account then a fixed deposit within 6 months |

### Association rules: support and confidence

For a rule **A → B** ("customers who buy A also buy B"):

```text diagram: support and confidence
  Support(A → B)    = transactions containing both A and B  ÷  total transactions
  Confidence(A → B) = transactions containing both A and B  ÷  transactions containing A

  Example: 100 customers; 40 have a credit card; 20 have both a credit card
           and mobile banking.
           Support(card → mobile banking)    = 20 / 100 = 20 %
           Confidence(card → mobile banking) = 20 / 40  = 50 %
```

The **Apriori** algorithm is the classic method for finding association rules
(**market basket analysis**).

### Applications of data mining in banking

- **Credit scoring** and loan default prediction.
- **Fraud detection** in cards, e-banking and claims.
- **Anti-money laundering (AML)** — spotting suspicious transaction patterns.
- **Customer segmentation** and targeted marketing.
- **Cross-selling and up-selling** — recommending products.
- **Customer churn prediction** and retention.
- **Risk management** and NPL (non-performing loan) analysis.

### Data warehousing vs data mining

| Data warehousing | Data mining |
| --- | --- |
| **Stores and organises** data for analysis | **Analyses** data to find patterns |
| Comes first — provides clean, integrated data | Uses the warehouse's data |
| Done by engineers with ETL and modelling | Done by analysts with algorithms and statistics |
| Output: a queryable store, reports | Output: patterns, predictions, rules |

### Business intelligence

**Business intelligence (BI)** is the umbrella term for the technologies —
data warehouses, OLAP, data mining, reporting and dashboards — that turn data
into information for better business decisions. Common BI tools include
**Microsoft Power BI, Tableau, Qlik and Oracle BI**.

## Quick revision

> [!TIP]
> **One-line answers.** Data warehouse = subject-oriented, integrated,
> time-variant, non-volatile (Bill Inmon). OLTP = daily transactions,
> normalised; OLAP = analysis, denormalised. ETL = extract, transform, load.
> Fact table = measures; dimension table = descriptive context. Star schema =
> denormalised dimensions; snowflake = normalised dimensions. OLAP operations
> = roll-up, drill-down, slice, dice, pivot. Data mining = discovering hidden
> patterns; KDD = selection, pre-processing, transformation, mining,
> interpretation.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: the warehouse is
> **non-volatile** — data is not updated in place; OLAP uses
> **denormalised** schemas, OLTP **normalised**; **slice** fixes **one**
> dimension, **dice** selects on **two or more**; **roll-up** summarises,
> **drill-down** adds detail; a **data mart** serves **one department**;
> **snowflake** has more joins than **star**; **MOLAP** is fastest, **ROLAP**
> scales furthest; **classification** has predefined classes,
> **clustering** does not; the father of data warehousing is **Bill
> Inmon**.
