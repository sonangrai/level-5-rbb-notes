---
title: "Digital Payment Cards and Wallets"
summary: Debit, credit and prepaid cards — card networks, chip security and card fraud — and digital wallets licensed by NRB as payment service providers.
section: digital-payments
order: 3
tags: [payments, cards, debit-card, credit-card, emv, wallets, psp]
updatedAt: "2026-10-09"
---

This note covers syllabus items **6.4 Digital Payment Cards** and **6.5
Payment through Wallets**.

## Digital payment cards

A **payment card** is a plastic or virtual card that lets the holder **pay or
withdraw cash** electronically.

### Types of card

| Card | Money comes from | Key features |
| --- | --- | --- |
| **Debit card** | The holder's **own bank account**, **immediately** | Spending is limited to the account balance. Used at ATMs, POS terminals and online |
| **Credit card** | A **credit line** from the bank: **borrowed** money | The holder **repays later**. There is an **interest-free period** if the bill is paid in full. Interest and fees apply if it is not |
| **Prepaid card** | Money **loaded in advance** | Not linked to a bank account. Used for gifts, travel and controlled spending |
| **Virtual card** | Any of the above, **digital only** | A card number for **online** shopping, with no plastic |

### Parties in a card payment

| Party | Role |
| --- | --- |
| **Cardholder** | Uses the card |
| **Issuer** | The **bank that issued** the card to the cardholder |
| **Merchant** | Accepts the card as payment |
| **Acquirer** | The **merchant's bank**, which processes the card payment for the merchant |
| **Card network (scheme)** | Connects issuers and acquirers and sets the rules, such as **Visa**, **Mastercard** and **UnionPay**; domestic schemes include **NepalPay** cards on NCHL's **National Payment Switch** |

### Card security

| Feature | What it does |
| --- | --- |
| **EMV chip** | Stores data securely and creates a **unique code for each transaction**, so the card is very hard to **clone**. EMV stands for Europay, Mastercard and Visa |
| **Magnetic stripe** | An **older**, easily copied technology that is being phased out |
| **PIN** | Proves the cardholder is present |
| **CVV/CVC** | The **3-digit code** on the back, used for **card-not-present** (online) payments |
| **OTP / 3-D Secure** | Extra verification for **online** payments |
| **Contactless (NFC)** | Tap payments, with a PIN needed above a set limit |
| **Tokenisation** | The real card number is replaced by a token |
| **PCI DSS** | The industry **security standard** for anyone who stores or processes card data |

### Common card frauds

- **Skimming**: a hidden device on an **ATM or POS** terminal copies the card's
  **magnetic stripe**, and a camera captures the **PIN**.
- **Card-not-present fraud**: stolen card details are used **online**.
- **Phishing and vishing**: fraudsters trick the cardholder into revealing
  their **card details, PIN or OTP** by email or phone.
- **Lost or stolen cards** being used before they are blocked.

To prevent these, banks use **EMV chips**, **SMS alerts**, **transaction
limits**, **fraud monitoring**, **instant card blocking** and **customer
awareness**.

## Payment through wallets

A **digital wallet** (e-wallet or mobile wallet) is an **app that holds
electronic money**, which the user can spend, send or receive.

### Wallets in Nepal

- Wallets are run by **Payment Service Providers (PSPs)** **licensed by NRB**
  under the **[Payment and Settlement Act,
  2075](/docs/payment-settlement-electronic-transaction-acts)**.
- Well-known wallets include **eSewa**, which was **among the first** (2009),
  **Khalti** and **IME Pay**, among others.
- Users **load** money from a **bank account**, **card**, **cash at an
  agent**, or **another wallet**.

### What wallets do

- **Merchant payments**, including by **QR**.
- **Bill payments**: utilities, internet, TV, school fees.
- **Mobile top-up** and **ticket booking** for airlines, buses and cinemas.
- **Sending money** to other wallets and to bank accounts.
- **Government payments**, such as fees and some taxes.

### Rules on wallets

- **KYC**: users must **verify their identity**. Unverified accounts have
  **lower limits**.
- **Limits** on **balance** and on **transactions** per day and per month, set
  by NRB.
- Customers' **wallet money** must be kept in **separate settlement
  accounts** at **banks**. It is **not the PSP's own money**.
- Wallets **cannot pay interest** on balances. A wallet is **not a deposit
  account**.
- Wallets cannot **lend** money. They may **offer bank loans** only in
  partnership with a bank.

### Benefits and risks

| Benefits | Risks |
| --- | --- |
| **Fast, convenient** payments | **Fraud and phishing**: stolen PINs and OTPs |
| **Financial inclusion** for people without bank accounts | **Cyber attacks** on the wallet provider |
| **Less cash** in the economy | **Limits** restrict large payments |
| **Cashbacks** and **rewards** | **Money laundering** risk if KYC is weak |

## Comparing a bank account and a wallet

| Point | Bank account | Wallet |
| --- | --- | --- |
| Provider | **BFI** licensed by NRB | **PSP** licensed by NRB |
| Interest | **Paid** on deposits | **Not paid** |
| Deposit insurance | **Yes**, up to a limit | **No** |
| Limits | High | **Low**, set by NRB |
| Lending | Yes | **No** |

## Quick revision

> [!TIP]
> **One-line answers.** A **debit** card uses **your own money now**; a
> **credit** card uses **borrowed** money, repaid **later**; a **prepaid**
> card is **pre-loaded**. The **issuer** is the **cardholder's** bank; the
> **acquirer** is the **merchant's** bank. The **EMV chip** blocks
> **cloning**. **CVV** is for **card-not-present** payments. **PCI DSS** is the
> card data security standard. **Wallets** are run by **PSPs** licensed by
> **NRB**. They pay **no interest**, keep customer money in **bank settlement
> accounts**, and have **KYC-based limits**.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: the **acquirer** is the
> **merchant's** bank, not the cardholder's; **skimming** copies the
> **magnetic stripe**, not the chip; a wallet is **not a deposit account**;
> wallet money is held in **bank** accounts, not by the PSP; **EMV** stands
> for **Europay, Mastercard, Visa**.
