---
title: "Internet, email system and web design"
summary: What the internet is and how it works, its history and services, how email is sent and received, and the basics of building a website with HTML, CSS and JavaScript.
section: computer-intro
order: 2
tags: [computer-fundamentals, internet, email, web-design, html]
updatedAt: "2026-10-07"
---

The **internet** is a global network of networks that connects billions of
devices using a common set of rules, the **TCP/IP** protocol suite. Email and
the World Wide Web are the two services most people use on it. This note
covers the basics of all three, ending with how a web page is built.

> [!NOTE]
> Protocol-level detail — DNS resolution, IP addressing, subnetting, ports —
> is in [Internet services and IP addressing](/docs/internet-services-and-addressing).

## The internet

### Key terms

| Term | Meaning |
| --- | --- |
| Internet | The worldwide public network of interconnected networks using TCP/IP |
| Intranet | A private network inside an organisation, using internet technology, open only to its members |
| Extranet | An intranet opened to selected outsiders such as suppliers or partners |
| ISP | Internet Service Provider — the company that connects users to the internet (e.g. Nepal Telecom, WorldLink, Vianet) |
| IP address | A unique numeric address for each device on the network (e.g. `192.168.1.10`) |
| Domain name | A human-readable name for an IP address (e.g. `nrb.org.np`) |
| DNS | Domain Name System — translates domain names into IP addresses |
| URL | Uniform Resource Locator — the full address of a resource on the web |
| Bandwidth | The data capacity of a connection, measured in bits per second (Mbps, Gbps) |
| Protocol | A set of rules for communication |

### Brief history

| Year | Milestone |
| --- | --- |
| 1969 | **ARPANET**, funded by the US Department of Defense, connects four universities — the internet's ancestor |
| 1971 | Ray Tomlinson sends the first network email and introduces the `@` sign |
| 1983 | ARPANET switches to **TCP/IP** (1 January) — often called the internet's birth date. DNS follows in 1983–84 |
| 1989–91 | **Tim Berners-Lee** invents the **World Wide Web** at CERN — HTTP, HTML and URLs |
| 1993 | **Mosaic**, the first popular graphical web browser |
| 1994 | Nepal's first email service (via Mercantile); internet access spreads in Nepal from 1995 |
| 2000s onward | Broadband, Wi-Fi, social media, smartphones and the mobile internet |

### Internet vs World Wide Web

The two are often confused. The **internet** is the infrastructure — the
cables, routers and protocols. The **web** is one service that runs on it: a
collection of linked documents accessed with a browser over HTTP. Email, file
transfer and video calls are other services on the same internet.

### How the internet works

```text diagram: loading a web page
   ┌──────────┐  (1) type www.example.com    ┌────────────┐
   │ Browser  │ ───────────────────────────► │ DNS server │
   │ (client) │ ◄─────────────────────────── │            │
   └────┬─────┘  (2) IP = 93.184.215.14      └────────────┘
        │
        │ (3) HTTP request:  GET /index.html
        ▼
   home router ──► ISP ──► internet backbone ──► ┌────────────┐
                                                 │ Web server │
   ◄──────────── (4) HTTP response: HTML ─────── │            │
                                                 └────────────┘
   (5) browser renders the page, then fetches the images, CSS and JS it references
```

Data is broken into small **packets**, each sent independently through
routers and reassembled at the destination — this is **packet switching**.
**TCP** makes delivery reliable and ordered; **IP** handles addressing and
routing.

### Parts of a URL

```text diagram: anatomy of a URL
   https://www.example.com:443/products/list.html?id=25#reviews
   └─┬─┘   └──────┬──────┘└┬┘└─────────┬────────┘└──┬─┘└──┬──┘
  protocol     domain    port        path        query  fragment
```

Inside the domain, `www` is a subdomain, `example` is the second-level domain
and `.com` is the **top-level domain (TLD)**.

| TLD type | Examples |
| --- | --- |
| Generic | `.com` (commercial), `.org` (organisation), `.net` (network), `.edu` (education), `.gov` (government), `.info` |
| Country code | `.np` (Nepal), `.in` (India), `.uk`, `.jp` |
| Nepal second-level | `.com.np`, `.gov.np`, `.edu.np`, `.org.np` — registered through Mercantile |

### Ways to connect

| Type | Medium | Note |
| --- | --- | --- |
| Dial-up | Telephone line through a modem | Up to 56 kbps; obsolete |
| DSL / ADSL | Telephone line | Broadband; voice and data together |
| Cable | Cable TV coaxial line | Broadband |
| Fibre (FTTH) | Optical fibre | Fastest fixed connection; now common in Nepal |
| Mobile | 3G, 4G LTE, 5G | Internet on phones and dongles |
| Wi-Fi | Radio, local | Wireless access to a wired connection |
| Satellite | Satellite link | Remote areas; high latency |

### Common internet services

| Service | Protocol | Use |
| --- | --- | --- |
| World Wide Web | HTTP / HTTPS | Browsing websites |
| Email | SMTP, POP3, IMAP | Sending and receiving messages |
| File transfer | FTP, SFTP | Uploading and downloading files |
| Remote login | Telnet, SSH | Using a remote computer; SSH is encrypted |
| Search engines | HTTPS | Finding information (Google, Bing) |
| Instant messaging and VoIP | Various | Chat, voice and video calls (Viber, WhatsApp, Zoom) |
| E-commerce and e-banking | HTTPS | Online shopping, internet and mobile banking |
| Cloud services | HTTPS | Storage and software online (Google Drive, Microsoft 365) |

### Web browsers and search engines

A **web browser** is software that requests, interprets and displays web
pages — Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Opera. A
**search engine** is a website that indexes the web and lets users search
it — Google, Bing, Yahoo, DuckDuckGo. A browser is an application on your
computer; a search engine is a service you visit with it.

## Email system

**Electronic mail (email)** is a method of sending digital messages, with
optional attachments, from one user to one or more others over a network. It
is **asynchronous**: the receiver does not need to be online when the message
is sent.

### Email address

```text diagram: anatomy of an email address
   ram.sharma@nrb.org.np
   └───┬────┘ └───┬────┘
   user name    domain name
   (mailbox)    (mail server)
```

### How email travels

```text diagram: path of an email
  Sender                                                         Receiver
  ┌────────┐  SMTP   ┌─────────────┐  SMTP   ┌─────────────┐  POP3/IMAP  ┌────────┐
  │  Mail  │ ──────► │ sender's    │ ──────► │ receiver's  │ ──────────► │  Mail  │
  │ client │         │ mail server │         │ mail server │             │ client │
  │ (MUA)  │         │ (MTA)       │         │ (mailbox)   │             │ (MUA)  │
  └────────┘         └──────┬──────┘         └─────────────┘             └────────┘
                            │ DNS: look up the MX record of the receiver's domain
```

| Component | Role |
| --- | --- |
| MUA — Mail User Agent | The program the user reads and writes mail with (Outlook, Thunderbird, Gmail web or app) |
| MTA — Mail Transfer Agent | Server that relays mail between servers (Postfix, Exchange) |
| MDA — Mail Delivery Agent | Places the mail into the recipient's mailbox |
| MX record | DNS entry naming the mail server for a domain |

### Email protocols

| Protocol | Full form | Job | Port (secure port) |
| --- | --- | --- | --- |
| SMTP | Simple Mail Transfer Protocol | **Sends** mail — client to server and server to server | 25, 587 (465) |
| POP3 | Post Office Protocol v3 | **Downloads** mail to one device; usually deletes it from the server | 110 (995) |
| IMAP | Internet Message Access Protocol | **Syncs** mail; it stays on the server and is visible on every device | 143 (993) |
| MIME | Multipurpose Internet Mail Extensions | Lets email carry attachments, images, non-English text and HTML | — |

> [!TIP]
> **SMTP pushes, POP3 and IMAP pull.** Use IMAP when the same mailbox is
> read on a phone and a computer; POP3 suits a single device with little
> server storage.

### Parts of an email

| Field | Meaning |
| --- | --- |
| From | Sender's address |
| To | Main recipient(s) |
| Cc | Carbon copy — others who should see it; all recipients can see Cc addresses |
| Bcc | Blind carbon copy — recipients hidden from everyone else |
| Subject | One-line summary of the message |
| Body | The message itself |
| Attachment | Files sent along with the message |
| Signature | Sender's name and contact details added at the end |

Common actions: **Reply** (to the sender only), **Reply all** (to the sender
and every recipient), **Forward** (send the message on to someone new),
**Draft** (saved but unsent), **Spam / Junk** (unsolicited bulk mail).

### Webmail vs email client

| | Webmail | Email client |
| --- | --- | --- |
| Accessed through | A web browser | An installed application |
| Examples | Gmail, Outlook.com, Yahoo Mail | Microsoft Outlook, Thunderbird, Apple Mail |
| Works offline | No | Yes, for downloaded mail |
| Setup | None — just sign in | Configure the server and protocols |

### Email security and etiquette

- **Spam** — unsolicited bulk mail. **Phishing** — fake mail pretending to be a
  bank or trusted body, to steal passwords or card details. **Spoofing** —
  forging the sender's address.
- Check the real sender address, do not click unexpected links or open
  unknown attachments, and use strong passwords with **two-factor
  authentication**.
- Domains use **SPF, DKIM and DMARC** to prove their mail is genuine.
- Etiquette: a clear subject line, a polite and short body, Bcc for large
  lists, no writing in ALL CAPITALS (it reads as shouting), and check
  attachments before sending.

## Web design

**Web design** is the planning and creation of websites — their layout,
appearance, content and usability. **Web development** is the wider work of
building them, including the code that runs on servers.

### Basic terms

| Term | Meaning |
| --- | --- |
| Web page | A single document on the web, usually written in HTML |
| Website | A collection of related web pages under one domain |
| Home page | The main, first page of a website |
| Web server | A computer that stores websites and serves them on request (Apache, Nginx, IIS) |
| Web hosting | Renting space on a web server to publish a website |
| Hyperlink | A clickable link from one page or resource to another |
| Hypertext | Text containing hyperlinks |

### Static vs dynamic websites

| | Static | Dynamic |
| --- | --- | --- |
| Content | Same for every visitor; fixed HTML files | Generated on request, often from a database |
| Technology | HTML, CSS, a little JavaScript | Plus server-side code (PHP, Python, Node.js, Java) and a database (MySQL, PostgreSQL) |
| Updating | Edit the files | Through an admin panel or CMS |
| Examples | Brochure site, personal portfolio | E-banking, news portal, e-commerce, social media |

### Front end and back end

```text diagram: the layers of a website
  ┌───────────────────────────────────────────────┐
  │ FRONT END (client side) — runs in the browser │
  │   HTML         structure and content          │
  │   CSS          presentation and layout        │
  │   JavaScript   behaviour and interactivity    │
  └───────────────────────┬───────────────────────┘
                          │ HTTP / HTTPS
  ┌───────────────────────▼───────────────────────┐
  │ BACK END (server side) — runs on the server   │
  │   PHP, Python, Node.js, Java, C#              │
  │   database: MySQL, PostgreSQL, MongoDB        │
  └───────────────────────────────────────────────┘
```

### HTML

**HTML (HyperText Markup Language)** describes the structure of a web page
using **tags** in angle brackets. Most tags come in pairs — an opening tag and
a closing tag with a `/`. The current version is **HTML5**.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is a <b>paragraph</b> with a <a href="https://nrb.org.np">link</a>.</p>
    <img src="logo.png" alt="Bank logo">
  </body>
</html>
```

| Tag | Purpose |
| --- | --- |
| `<html>` | Root of the document |
| `<head>` | Information about the page — title, styles, metadata (not displayed) |
| `<title>` | Text shown in the browser tab |
| `<body>` | Everything displayed on the page |
| `<h1>` … `<h6>` | Headings, from largest to smallest |
| `<p>` | Paragraph |
| `<br>` | Line break (empty tag — no closing tag) |
| `<hr>` | Horizontal rule (empty tag) |
| `<b>` / `<strong>`, `<i>` / `<em>`, `<u>` | Bold, italic, underline |
| `<a href="…">` | Hyperlink (anchor) |
| `<img src="…" alt="…">` | Image (empty tag) |
| `<ul>`, `<ol>`, `<li>` | Unordered (bulleted) list, ordered (numbered) list, list item |
| `<table>`, `<tr>`, `<th>`, `<td>` | Table, row, header cell, data cell |
| `<form>`, `<input>`, `<button>` | Form for user input |
| `<div>`, `<span>` | Generic block and inline containers |
| `<header>`, `<nav>`, `<main>`, `<footer>` | HTML5 semantic layout elements |

An **attribute** gives extra information about an element and is written in
the opening tag as `name="value"` — for example `href` in `<a>` or `src` and
`alt` in `<img>`.

### CSS

**CSS (Cascading Style Sheets)** controls how HTML looks — colours, fonts,
spacing and layout. A rule names a **selector** and a block of
**property: value** declarations.

```css
h1 {
  color: navy;
  font-size: 32px;
  text-align: center;
}
```

| Way to add CSS | How | Note |
| --- | --- | --- |
| Inline | `style` attribute on one element | Highest priority; hard to maintain |
| Internal | `<style>` block inside `<head>` | For one page |
| External | Separate `.css` file linked with `<link>` | Best practice — one file styles the whole site |

### JavaScript

**JavaScript** is the programming language of the browser. It makes pages
interactive — validating forms, showing menus, updating content without
reloading. It is unrelated to Java despite the name.

### Principles of good web design

- **Responsive design** — the layout adapts to phones, tablets and desktops.
- **Usability and navigation** — clear menus; users find things in a few
  clicks.
- **Consistency** — the same colours, fonts and layout across pages.
- **Readability** — good contrast, readable font sizes, short paragraphs.
- **Fast loading** — optimised images, minimal code.
- **Accessibility** — usable by people with disabilities (alt text, keyboard
  navigation, sufficient contrast).
- **Security** — HTTPS, input validation.
- **SEO (Search Engine Optimisation)** — structure and content that rank well
  in search engines.

### Web design tools

| Category | Examples |
| --- | --- |
| Code editors | Visual Studio Code, Sublime Text, Notepad++ |
| Visual (WYSIWYG) editors | Adobe Dreamweaver, Wix, Google Sites |
| Design and prototyping | Figma, Adobe XD, Photoshop |
| CMS (Content Management System) | WordPress, Joomla, Drupal |
| Frameworks | Bootstrap and Tailwind (CSS); React, Angular, Vue (JavaScript) |

## Quick revision

> [!TIP]
> **One-line answers.** Internet = network of networks using TCP/IP; web = a
> service on it using HTTP. ARPANET (1969) was the first; Tim Berners-Lee
> invented the web (1989). DNS translates names to IP addresses. SMTP sends
> mail; POP3 downloads it; IMAP syncs it. HTML = structure, CSS =
> presentation, JavaScript = behaviour.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: the internet and the web
> are **not** the same; a browser is **not** a search engine; **Bcc**
> recipients are hidden, **Cc** recipients are visible; SMTP **sends**, it
> does not retrieve; MIME is what allows **attachments**; HTML is a **markup**
> language, not a programming language; `<br>`, `<hr>` and `<img>` are
> **empty** tags; external CSS is the recommended way to style a site; the
> first email was sent by **Ray Tomlinson** (1971).
