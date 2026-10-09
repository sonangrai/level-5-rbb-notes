---
title: "Internet Banking, Mobile Banking, QR and NFC"
summary: The customer-facing digital channels — internet banking, mobile banking, QR code payments and NFC contactless payments — how they work, their security and their use in Nepal.
section: digital-payments
order: 2
tags: [payments, internet-banking, mobile-banking, qr-code, nfc, contactless]
updatedAt: "2026-10-09"
---

This note covers syllabus item **6.3 Internet Banking, Mobile Banking, Quick
Response (QR) Code, Near Field Communication (NFC)**. These are the channels
customers use to bank and pay **without visiting a branch**.

## Internet banking

**Internet banking** (also called online or e-banking) lets customers use their
bank account through the bank's **website**.

### Services

- **Balance enquiry** and **account statements**.
- **Fund transfers**: within the bank, to other banks and through connectIPS.
- **Bill payments**: electricity, water, phone, internet, school fees.
- **Requests**: cheque books, stop-payment, card blocking.
- **Corporate internet banking**: bulk salary payments and approvals by more
  than one person.

### Security

- **Login credentials** with strong passwords.
- **Two-factor authentication (2FA)**: something you know, such as a
  password, plus something you have, such as a **one-time password (OTP)** sent
  to your phone.
- **Encrypted connection** (**HTTPS/TLS**).
- **Session timeouts** and **transaction limits**.
- **Alerts** by SMS or email for every transaction.

## Mobile banking

**Mobile banking** is banking through a **mobile phone**, using the bank's
**app**, **SMS** or **USSD** codes.

| Type | How it works | Needs |
| --- | --- | --- |
| **App-based** | A full-featured smartphone app | Smartphone and internet |
| **SMS banking** | Text commands such as balance checks and alerts | Any phone |
| **USSD** | Codes such as `*xxx#` for menu-based banking | Any phone, **no internet** |

### Services

All the internet banking services, plus **QR payments**, **wallet loading**,
**mobile top-up**, **ticket booking** and **interbank transfers**.

### Benefits

- Banking **any time, anywhere**.
- **Financial inclusion**: reaches people far from branches.
- **Lower cost** for the bank and the customer.

### Security

- **PIN or biometric login** (fingerprint or face).
- **Device binding**: the account works only on a **registered phone**.
- **OTPs** for transactions.
- **Transaction limits**, set by NRB and the bank.
- Customers must **never share** their PIN or OTP.

## Quick Response (QR) code

A **QR code** is a **two-dimensional barcode** that stores information in a
pattern of black and white squares. It was invented in **1994** by **Denso
Wave** in **Japan**. In payments, scanning a QR code **reads the payee's
details**, so the payer does not have to type them.

### Types of QR payment

| Basis | Types |
| --- | --- |
| Who shows the code | **Merchant-presented**: the customer scans the merchant's QR code. This is the **most common**. **Customer-presented**: the merchant scans the customer's QR code |
| Content | **Static QR**: the **same** code for every payment; the customer types the amount. **Dynamic QR**: a **new** code for each transaction, with the **amount built in** |

### QR in Nepal

- QR payments have **grown very fast**. They are now used for everyday
  payments, from shops to taxis.
- Networks include **Fonepay** and **NepalPay QR** (from NCHL), among others.
- **Interoperability** lets a customer of **one bank or wallet** scan a QR code
  from **another** network.
- There are cross-border **QR links**, such as with **India's UPI**, so that
  visitors can pay by QR.
- QR codes follow the **EMVCo** standard, so that they work between
  institutions.

### Benefits and risks

- **Benefits**: very **cheap** for merchants, with no card machine needed;
  **fast**; **less cash**.
- **Risks**: **fake QR stickers** placed over a real merchant's code, and
  scanning **malicious QR codes** that lead to phishing sites.

## Near Field Communication (NFC)

**NFC** is a **short-range wireless technology** that lets two devices
exchange data when they are **very close**, about **4 cm**. It works at
**13.56 MHz**.

### Uses in payments

- **Contactless cards**: a card with an **NFC chip**, marked with the
  **contactless symbol**, is **tapped** on the terminal.
- **Mobile wallets on phones**, such as **Apple Pay** and **Google Pay**,
  where the phone acts as the card.
- **Wearables**, such as watches and rings.
- **Transport cards** and **access cards**.

### Security

- The **very short range** makes interception difficult.
- **Tokenisation**: the **real card number is never sent**. A substitute
  **token** is used instead.
- Payments **above a set limit** still need a **PIN**.
- Phone-based payments need the **phone to be unlocked** with biometrics or a
  PIN.

### Benefits

- **Fast**: tap and go, with no swipe or insert.
- **Hygienic**: no touching a terminal, which became important during
  **COVID-19**.

## Comparing QR and NFC

| Point | QR code | NFC |
| --- | --- | --- |
| Technology | Camera scans an image | Short-range radio |
| Hardware for the merchant | **None**: a printed code is enough | An **NFC-enabled terminal** |
| Cost | **Very low** | Higher |
| Speed | Fast | **Fastest** (tap) |
| Popularity in Nepal | **Very high** | Growing |

## Quick revision

> [!TIP]
> **One-line answers.** Internet banking is accessed through the
> **website**; mobile banking through an **app, SMS or USSD**. Security
> relies on **2FA**, **OTP**, **TLS** and **device binding**. **QR**: a 2D
> barcode invented in **1994** by **Denso Wave** in Japan. **Static** QR has a
> fixed code; **dynamic** QR changes per transaction and includes the amount.
> **NFC**: about **4 cm** range, **13.56 MHz**, contactless **tap** payments,
> **tokenisation**.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: **USSD** works **without
> internet**; a **dynamic QR** code includes the **amount**; NFC needs the
> devices to be **very close**, unlike Bluetooth; **tokenisation** hides the
> **real card number**; **merchant-presented** QR is the most common type.
