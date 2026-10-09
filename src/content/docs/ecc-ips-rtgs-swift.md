---
title: "ECC, IPS, connectIPS, RTGS and SWIFT"
summary: The interbank payment infrastructure in Nepal — electronic cheque clearing, NCHL's IPS and connectIPS, NRB's RTGS — and SWIFT for cross-border payments.
section: digital-payments
order: 1
tags: [payments, ecc, ips, connectips, rtgs, swift, nchl, nrb]
updatedAt: "2026-10-09"
---

This note covers syllabus items **6.1 Electronic Cheque Clearing** and **6.2
IPS, connectIPS, RTGS and SWIFT**. These are the **systems that move money
between banks**. The law that governs them is covered in
[Payment and Settlement Act and Electronic Transaction
Act](/docs/payment-settlement-electronic-transaction-acts).

## Key ideas first

| Term | Meaning |
| --- | --- |
| **Clearing** | Exchanging payment instructions between banks and working out who owes whom |
| **Settlement** | Actually moving the money between banks' accounts, usually at **NRB** |
| **Gross settlement** | Each payment is settled **on its own**, one by one |
| **Net settlement** | Payments are **offset** against each other, and only the **net** amount is settled |
| **Real time** | Settled **immediately** |
| **Deferred** | Settled **later**, in batches or sessions |

**Nepal Clearing House Ltd. (NCHL)** is a company owned by **NRB and BFIs**.
It was established in **2008** and runs most of Nepal's interbank retail
payment systems. Final **settlement** happens in banks' accounts at **NRB**.

## Electronic Cheque Clearing (ECC)

**ECC** clears cheques **electronically**. NCHL started it in **2011**.

### How it works: cheque truncation

```text
Customer deposits cheque at Bank A (collecting bank)
   → Bank A scans the cheque: image + MICR data
   → Image and data sent to NCHL's ECC system
   → Bank B (paying bank) checks the image and signature, then pays or returns it
   → Net amounts settled between banks at NRB
```

- **Cheque truncation** means the **physical cheque stops** at the bank where
  it was deposited. Only its **image and data** travel.
- Cheques must follow NRB's standard (**CTS-compliant** cheques), so that they
  scan and process reliably.
- **MICR** (Magnetic Ink Character Recognition) lines carry the **cheque
  number, bank and branch code, and account**.
- ECC runs in **sessions**, including **same-day (express)** clearing, and
  settles on a **net** basis.

### Benefits

- **Faster** clearing, often the **same day**, instead of days.
- Physical cheques are **not transported**, so there is no risk of loss in
  transit.
- **Lower cost** and fewer errors.
- **Countrywide** clearing from any branch.

## Interbank Payment System (IPS)

**NCHL-IPS** is NCHL's system for **electronic fund transfers between banks**.

- It handles **credit transfers** and **direct debits**, such as **salary
  payments**, **bulk payments**, **utility bills** and **government payments**.
- It uses **deferred net settlement**: payments are collected in **batches**
  and settled in **sessions**.
- It is mostly used **between banks and by large organisations**.

## connectIPS

**connectIPS** is NCHL's **customer-facing** payment platform. It links
directly to customers' **bank accounts**.

- Customers can **pay from their bank account** online, through the web or a
  mobile app: **account-to-account transfers**, **bill and tax payments**, and
  **e-commerce payments**.
- It works across **all participating banks**, and a customer can link
  accounts at **different banks**.
- **Government revenue**, such as **taxes, customs and fees**, can be paid
  through it.
- NCHL also offers **instant** transfers that credit the receiving account
  within seconds.

## Real-Time Gross Settlement (RTGS)

**RTGS** is operated by **NRB** and went live in **2020**.

- Each payment is settled **individually (gross)** and **immediately (real
  time)** in banks' accounts at NRB.
- It is mainly for **high-value** and **urgent** payments: interbank transfers,
  large customer payments and **settling other payment systems**, such as
  ECC's net positions.
- Settlement is **final and irrevocable**.
- It **removes settlement risk**, because no payment depends on others being
  settled first.

## Comparing the domestic systems

| Point | ECC | NCHL-IPS | connectIPS | RTGS |
| --- | --- | --- | --- | --- |
| Operator | NCHL | NCHL | NCHL | **NRB** |
| Handles | **Cheques** | Bulk and batch transfers | Customer account payments | **High-value** transfers |
| Settlement | Deferred **net** | Deferred **net** | Through IPS or instant systems | **Real-time gross** |
| Used by | Cheque holders | Banks, businesses, government | Individuals and businesses | Banks, large payments |

## SWIFT

**SWIFT** stands for the **Society for Worldwide Interbank Financial
Telecommunication**.

- It was founded in **1973** and is headquartered in **Belgium**.
- It is a **cooperative** owned by its member banks.
- It is a **secure messaging network**. **SWIFT does not hold or move money
  itself.** It carries **payment instructions** between banks, and the money
  moves through the banks' **correspondent (nostro/vostro) accounts**.
- It links **more than 11,000 institutions** in **over 200 countries**.

### Key terms

| Term | Meaning |
| --- | --- |
| **BIC (SWIFT code)** | A bank's identifier, **8 or 11 characters**: bank code, country code, location code and an optional branch code |
| **MT103** | Message for a **customer credit transfer** across borders |
| **MT202** | Message for a **bank-to-bank** transfer |
| **ISO 20022 (MX)** | The **new**, richer message standard that is replacing the old MT messages |
| **Nostro account** | "**Our** account with you": a bank's account held at a foreign bank |
| **Vostro account** | "**Your** account with us": a foreign bank's account held at this bank |

### Use in Nepali banks

- **Inward remittances** and **foreign trade payments**, such as **letters of
  credit**.
- **Interbank foreign-exchange deals**.
- Banks must meet SWIFT's **Customer Security Programme (CSP)** controls,
  because SWIFT systems are a target for cyber-attacks. The **2016 Bangladesh
  Bank heist** was a well-known example.

## Quick revision

> [!TIP]
> **One-line answers.** **NCHL** was set up in **2008**. **ECC** started in
> **2011** and uses **cheque truncation** with **net** settlement. **IPS**
> handles bulk and batch transfers with **deferred net** settlement.
> **connectIPS** lets customers pay **directly from a bank account**. **RTGS**
> is run by **NRB**, went live in **2020**, and settles **high-value**
> payments **one by one, immediately**. **SWIFT** (**1973, Belgium**) is a
> **messaging** network. **MT103** is a customer transfer; **MT202** is
> bank-to-bank.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: **SWIFT does not transfer
> funds**, it sends messages; **RTGS** is operated by **NRB**, not NCHL;
> **truncation** means the physical cheque **stops** at the collecting bank;
> **nostro** = **our** account abroad; a **BIC** has **8 or 11** characters.
