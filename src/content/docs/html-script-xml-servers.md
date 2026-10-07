---
title: "HTML, scripts, stylesheets, XML, web servers and proxy servers"
summary: How a web page is built from HTML, CSS and scripts; client- vs server-side scripting; XML and how it differs from HTML; and what web servers and proxy servers do.
section: database-web
order: 4
tags: [web, html, css, javascript, xml, web-server, proxy]
updatedAt: "2026-10-07"
---

A web page reaches you through a chain of technologies. **HTML** gives it
structure, a **stylesheet (CSS)** gives it its look, and **scripts** give it
behaviour — some running in your browser, some on the server. **XML** is a
related markup language used not to display data but to **store and exchange
it** between systems. All of this is delivered by a **web server**, often
passing through a **proxy server** on the way.

```text diagram: how the pieces fit
   ┌────────────────────────────── BROWSER (client) ─────────────────────────────┐
   │   HTML  = structure        CSS = presentation        JavaScript = behaviour  │
   └──────────────────────────────────┬──────────────────────────────────────────┘
                                      │ HTTP / HTTPS
                              ┌───────▼───────┐
                              │ PROXY SERVER  │  (optional: cache, filter, protect)
                              └───────┬───────┘
                              ┌───────▼───────┐       ┌──────────────┐
                              │  WEB SERVER   │ ────► │ server-side  │ ──► database
                              │ Apache, Nginx │       │ script (PHP, │
                              └───────────────┘       │ ASP.NET…)    │
                                                      └──────────────┘
```

## HTML

**HTML (HyperText Markup Language)** is the standard markup language for web
pages, created by **Tim Berners-Lee** (1991). It uses **tags** to mark up
content — headings, paragraphs, links, images, tables, forms. It is a
**markup** language, not a programming language: it describes content, it
does not compute. The current standard is **HTML5**, maintained as a living
standard by **WHATWG**.

> [!NOTE]
> The basic tags and a sample page are in
> [Internet, email system and web design](/docs/internet-email-web-design#html).

### Elements, tags and attributes

```text diagram: anatomy of an HTML element
      opening tag             content          closing tag
   ┌──────────────────────┐┌──────────────┐┌──────┐
   <a href="https://x.com" >  Visit site   </a>
      └─┬┘ └──────┬──────┘
   attribute name  value
```

- **Container (paired) tags** have opening and closing tags: `<p> … </p>`.
- **Empty (void) tags** have no closing tag: `<br>`, `<hr>`, `<img>`,
  `<input>`, `<meta>`, `<link>`.
- HTML tags are **not case-sensitive** (lowercase is the convention).
- **Global attributes** usable on any element: `id` (unique name), `class`
  (group name for styling), `style`, `title`, `lang`.

### Block vs inline elements

| Block-level | Inline |
| --- | --- |
| Starts on a new line and takes the full width | Flows within a line; takes only the width it needs |
| `<div>`, `<p>`, `<h1>`–`<h6>`, `<ul>`, `<ol>`, `<table>`, `<form>`, `<header>`, `<section>` | `<span>`, `<a>`, `<img>`, `<b>`, `<i>`, `<strong>`, `<em>`, `<input>` |

### Lists, tables and forms

```html
<!-- Ordered and unordered lists -->
<ol type="1"><li>Deposit</li><li>Withdraw</li></ol>
<ul><li>Saving</li><li>Current</li></ul>

<!-- Table -->
<table border="1">
  <tr><th>Account</th><th>Balance</th></tr>
  <tr><td>001</td><td>25,000</td></tr>
  <tr><td colspan="2">Total: 25,000</td></tr>
</table>

<!-- Form -->
<form action="/login" method="post">
  <label for="user">Username</label>
  <input type="text" id="user" name="user" required>
  <input type="password" name="pass">
  <input type="submit" value="Log in">
</form>
```

`colspan` merges cells across columns, `rowspan` across rows. In a form,
**`GET`** sends data visibly in the URL (for searches), **`POST`** sends it in
the request body (for logins and anything sensitive).

| Input type | Shows |
| --- | --- |
| `text`, `password`, `email`, `number`, `date` | Text fields of various kinds (password hides characters) |
| `radio` | Choose **one** of several options |
| `checkbox` | Choose **any number** of options |
| `submit`, `reset`, `button` | Buttons |
| `file` | File upload |
| `hidden` | A value sent with the form but not shown |

Other form elements: `<textarea>` (multi-line text), `<select>` with
`<option>` (drop-down list).

### HTML5 features

- **Semantic elements**: `<header>`, `<nav>`, `<main>`, `<section>`,
  `<article>`, `<aside>`, `<footer>`.
- **Multimedia** without plug-ins: `<audio>`, `<video>`.
- **Graphics**: `<canvas>` (drawing with JavaScript) and inline `<svg>`.
- **New input types**: `email`, `date`, `range`, `color`, `tel`, `url`.
- **Web storage** (`localStorage`, `sessionStorage`), geolocation, drag and
  drop, offline support.
- A simple doctype: `<!DOCTYPE html>`.

## Script

A **script** is a program — usually interpreted rather than compiled — that
adds **logic and interactivity** to a web page. Scripts run either in the
browser (**client-side**) or on the web server (**server-side**).

### Client-side vs server-side scripting

| | Client-side scripting | Server-side scripting |
| --- | --- | --- |
| Runs on | The user's **browser** | The **web server** |
| Languages | **JavaScript** (also TypeScript compiled to JS) | **PHP**, ASP.NET (C#), JSP / Java, Python, Node.js, Ruby, Perl |
| Source code | Visible to the user (View Source) | Hidden — the user sees only the resulting HTML |
| Database access | No direct access | Yes |
| Speed | Instant response, no server round trip | Needs a request to the server |
| Security | Can be disabled or altered by the user — **never trust it for validation alone** | More secure; the authoritative place for checks |
| Used for | Form checks, menus, animations, updating parts of the page | Logins, database queries, generating dynamic pages, payments |

> [!CAUTION]
> Client-side validation is a convenience for the user; it can be bypassed.
> Every input must be **validated again on the server**, for example to
> prevent **SQL injection** and **cross-site scripting (XSS)**.

### JavaScript

**JavaScript** was created by **Brendan Eich** at **Netscape in 1995**
(written in about ten days). Despite the name, it is **unrelated to Java**.
Its standard is **ECMAScript**. It is the only language that runs natively in
all browsers.

```html
<button onclick="greet()">Click me</button>
<p id="msg"></p>

<script>
  function greet() {
    document.getElementById("msg").innerHTML = "Welcome to online banking!";
  }
</script>
```

Scripts are added with the `<script>` tag — inline as above, or from an
external file: `<script src="app.js"></script>`.

**The DOM (Document Object Model)** is the browser's tree-shaped
representation of the page. JavaScript reads and changes the page through the
DOM — `document.getElementById()`, `innerHTML` — and responds to **events**
such as `onclick`, `onload`, `onsubmit`, `onchange` and `onmouseover`.

**AJAX (Asynchronous JavaScript and XML)** lets a page fetch data from the
server **in the background and update part of the page without reloading** —
today usually with `fetch()` and JSON.

### Server-side script example (PHP)

```php
<?php
  $name = "Ram";
  echo "<p>Hello, " . $name . "! Your last login was today.</p>";
?>
```

The server runs the PHP and sends only the resulting `<p>` element to the
browser.

Other scripting languages: **VBScript** (old, Internet Explorer only),
**Python**, **Perl**, and shell scripts (bash, PowerShell) for system
administration.

## Stylesheet (CSS)

**CSS (Cascading Style Sheets)** describes the **presentation** of HTML —
colours, fonts, spacing, layout, responsiveness. It separates **content
(HTML)** from **design (CSS)**, so one stylesheet can restyle a whole site.
It was proposed by **Håkon Wium Lie** in 1994 and is standardised by the
**W3C**; the current level is CSS3, developed as separate modules.

### Syntax

```text diagram: a CSS rule
   selector     declaration block
      │      ┌─────────────────────────────────┐
      h1     {  color : blue ;  font-size : 24px ;  }
                └─┬─┘   └─┬┘    └───┬───┘   └─┬─┘
              property  value    property   value
```

### Three ways to apply CSS

```html
<!-- 1. Inline: on one element -->
<p style="color: red;">Warning</p>

<!-- 2. Internal: in the <head> of one page -->
<style>
  p { color: navy; }
</style>

<!-- 3. External: one file shared by every page (best practice) -->
<link rel="stylesheet" href="styles.css">
```

**Cascade priority** (highest wins): `!important` → inline style → internal
and external styles (the one that appears **later** wins at equal
specificity) → browser defaults.

### Selectors

| Selector | Syntax | Selects |
| --- | --- | --- |
| Universal | `*` | Every element |
| Element (type) | `p` | All `<p>` elements |
| Class | `.note` | Elements with `class="note"` — reusable on many elements |
| ID | `#header` | The one element with `id="header"` — unique per page |
| Group | `h1, h2` | All `<h1>` and `<h2>` |
| Descendant | `div p` | `<p>` anywhere inside a `<div>` |
| Child | `div > p` | `<p>` directly inside a `<div>` |
| Attribute | `input[type="text"]` | Text inputs |
| Pseudo-class | `a:hover`, `li:first-child` | Elements in a state or position |

**Specificity** decides which rule wins when several match: **inline > ID >
class / attribute / pseudo-class > element**.

### The box model

Every element is a rectangular box:

```text diagram: the CSS box model
  ┌───────────────────────────────────────────┐
  │                 MARGIN                    │  space outside the border
  │   ┌───────────────────────────────────┐   │
  │   │             BORDER                │   │
  │   │   ┌───────────────────────────┐   │   │
  │   │   │          PADDING          │   │   │  space inside the border
  │   │   │   ┌───────────────────┐   │   │   │
  │   │   │   │     CONTENT       │   │   │   │  text, images
  │   │   │   │  width × height   │   │   │   │
  │   │   │   └───────────────────┘   │   │   │
  │   │   └───────────────────────────┘   │   │
  │   └───────────────────────────────────┘   │
  └───────────────────────────────────────────┘
```

Layout tools: **Flexbox** (one-dimensional rows or columns), **Grid**
(two-dimensional layouts), and **media queries** for **responsive design**:

```css
@media (max-width: 600px) {
  .sidebar { display: none; }
}
```

## XML

**XML (eXtensible Markup Language)** is a markup language for **storing and
transporting data** in a format that is both human-readable and
machine-readable. It became a **W3C recommendation in 1998** and is derived
from **SGML**. XML has **no predefined tags** — you create tags that describe
your data, which is what makes it *extensible*.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bank>
  <customer id="101">
    <name>Ram Sharma</name>
    <account type="saving">
      <number>0012345678</number>
      <balance currency="NPR">25000.00</balance>
    </account>
  </customer>
</bank>
```

### Well-formed XML rules

An XML document is **well-formed** when it follows the syntax rules:

1. There must be exactly **one root element** that contains all others.
2. Every element must have a **closing tag** (or be self-closed:
   `<br/>`).
3. Tags are **case-sensitive** — `<Name>` and `<name>` are different.
4. Elements must be **properly nested** — `<a><b></b></a>`, never
   `<a><b></a></b>`.
5. Attribute values must be **quoted**.
6. Special characters must be escaped: `&lt;` for `<`, `&amp;` for `&`.

A **valid** XML document is well-formed **and** follows the rules of a
schema that defines which elements and attributes are allowed:

| Schema | Description |
| --- | --- |
| **DTD** — Document Type Definition | The older way; its own syntax; limited data types |
| **XSD** — XML Schema Definition | Written in XML itself; supports data types (integer, date) and namespaces |

Every valid document is well-formed, but not every well-formed document is
valid.

### Related XML technologies

| Technology | Purpose |
| --- | --- |
| XSLT | Transforms XML into other formats — HTML, another XML, text |
| XPath | A language for selecting parts of an XML document |
| XQuery | Queries XML data, like SQL for XML |
| DOM / SAX | Ways for programs to parse XML — DOM loads the whole tree, SAX reads it as a stream of events |
| Namespaces | Avoid name clashes when combining XML vocabularies |

### Uses of XML

- **Data exchange** between different systems and organisations.
- **Web services** — SOAP messages are XML.
- **Banking and payments** — the **ISO 20022** financial messaging standard
  used by SWIFT and many payment systems is based on XML.
- **Configuration files** — Android layouts, Java and .NET settings.
- **RSS and Atom** news feeds, **SVG** graphics, and office documents
  (`.docx`, `.xlsx` are zipped XML).

### HTML vs XML

| | HTML | XML |
| --- | --- | --- |
| Purpose | **Display** data | **Store and transport** data |
| Tags | Predefined | User-defined |
| Case sensitivity | Not case-sensitive | **Case-sensitive** |
| Closing tags | Some optional; void elements have none | **Always required** |
| Errors | Browsers tolerate and correct them | A single error stops parsing |
| Whitespace | Collapsed | Preserved |
| Focus | How data looks | What data is |

### XML vs JSON

**JSON (JavaScript Object Notation)** is a lighter alternative used by most
modern web APIs.

| | XML | JSON |
| --- | --- | --- |
| Syntax | Tags | Key–value pairs and arrays |
| Size | Larger (opening and closing tags) | Smaller |
| Data types | All text, unless a schema is used | Strings, numbers, booleans, arrays, objects, null |
| Comments, attributes, namespaces | Supported | Not supported |
| Typical use | Documents, SOAP, ISO 20022, configuration | REST APIs, web and mobile apps |

```json
{ "customer": { "id": 101, "name": "Ram Sharma", "balance": 25000.00 } }
```

## Web server

A **web server** is software — and the computer running it — that **stores
website files and delivers them to clients (browsers) over HTTP or HTTPS**
when requested.

### How it works

```text diagram: request and response
   Browser                                              Web server
     │  1. HTTP request                                      │
     │  GET /index.html HTTP/1.1                             │
     │  Host: www.bank.com.np  ───────────────────────────►  │
     │                                                       │ 2. finds the file, or runs
     │                                                       │    a server-side script
     │  3. HTTP response                                     │    (and queries the database)
     │  HTTP/1.1 200 OK                                      │
     │  Content-Type: text/html                              │
     │  <html>…</html>          ◄──────────────────────────  │
     │                                                       │
     │  4. browser renders the page and requests images, CSS, JS
```

- **Static content** — files sent exactly as stored: HTML, images, CSS.
- **Dynamic content** — generated on each request by server-side scripts,
  often from a database.

Web servers listen on **port 80 (HTTP)** and **port 443 (HTTPS)**. HTTP is
**stateless** — each request is independent — so websites use **cookies** and
**sessions** to remember logged-in users.

### Popular web servers

| Server | Developer | Note |
| --- | --- | --- |
| **Apache HTTP Server** | Apache Software Foundation | Open source, long the most used; modules, `.htaccess` |
| **Nginx** | Igor Sysoev / F5 | Open source; very fast, handles many connections; also a reverse proxy and load balancer |
| **Microsoft IIS** | Microsoft | Internet Information Services, for Windows and ASP.NET |
| **LiteSpeed** | LiteSpeed Technologies | High-performance Apache replacement |
| **Apache Tomcat** | Apache Software Foundation | Java servlet container (an application server for JSP / servlets) |
| Node.js | OpenJS Foundation | JavaScript runtime used to build web servers |

### Web server vs application server

| Web server | Application server |
| --- | --- |
| Serves static content over HTTP; passes dynamic requests to other programs | Runs **business logic** and generates dynamic content |
| Apache, Nginx, IIS | Tomcat, JBoss / WildFly, WebLogic, WebSphere |

### HTTP methods and status codes

| Method | Purpose |
| --- | --- |
| GET | Retrieve a resource |
| POST | Send data to create or process something |
| PUT / PATCH | Replace / partly update a resource |
| DELETE | Remove a resource |
| HEAD | Like GET, but headers only |

| Code class | Meaning | Common codes |
| --- | --- | --- |
| 1xx | Informational | 100 Continue |
| 2xx | Success | **200 OK**, 201 Created |
| 3xx | Redirection | **301** Moved Permanently, 302 Found, 304 Not Modified |
| 4xx | Client error | 400 Bad Request, **401** Unauthorized, **403** Forbidden, **404 Not Found** |
| 5xx | Server error | **500** Internal Server Error, 502 Bad Gateway, **503** Service Unavailable |

### Functions of a web server

Serving files, running or forwarding to server-side scripts, **SSL/TLS
encryption** for HTTPS, authentication and access control, **logging**
requests, compression, caching, **virtual hosting** (many websites on one
server), and load balancing.

## Proxy server

A **proxy server** is an **intermediary** between clients and other servers.
Instead of connecting directly, the client sends its request to the proxy,
which forwards it, receives the response, and passes it back. The
destination server sees the **proxy's** IP address, not the client's.

```text diagram: forward proxy and reverse proxy
  FORWARD PROXY — sits in front of CLIENTS (protects and controls users)

   PC 1 ──┐
   PC 2 ──┼──► [ FORWARD PROXY ] ──► Internet ──► any website
   PC 3 ──┘      office / bank network

  REVERSE PROXY — sits in front of SERVERS (protects and scales servers)

   users ──► Internet ──► [ REVERSE PROXY ] ──┬──► web server 1
                           (Nginx, load        ├──► web server 2
                            balancer, WAF)     └──► web server 3
```

### Functions of a proxy server

| Function | Benefit |
| --- | --- |
| **Caching** | Stores copies of frequently requested pages; repeat requests are served locally — faster and saves bandwidth |
| **Content filtering** | Blocks unwanted or malicious sites (social media, gambling, malware) |
| **Access control** | Only authorised users can reach the internet |
| **Anonymity / privacy** | Hides clients' IP addresses from outside servers |
| **Logging and monitoring** | Records which users visited which sites |
| **Security** | Hides internal network structure; can scan traffic for malware |
| **Load balancing** (reverse proxy) | Spreads requests across several servers |
| **SSL termination** (reverse proxy) | Handles HTTPS encryption so back-end servers do not have to |

### Types of proxy servers

| Type | Description |
| --- | --- |
| **Forward proxy** | Acts for clients going out to the internet — used in offices, schools, banks |
| **Reverse proxy** | Acts for servers, receiving requests from the internet — Nginx, HAProxy, Cloudflare |
| **Transparent proxy** | Intercepts traffic without any client configuration; users may not know it exists; does not hide the client's IP |
| **Anonymous proxy** | Hides the client's IP but reveals that a proxy is in use |
| **High-anonymity (elite) proxy** | Hides both the client's IP and the fact that a proxy is used |
| **Caching proxy** | Specialises in caching content (Squid) |
| **Web (HTTP) proxy** | Handles only web traffic |
| **SOCKS proxy** | Works at a lower level and can carry any traffic — web, email, file transfer |

### Forward proxy vs reverse proxy

| | Forward proxy | Reverse proxy |
| --- | --- | --- |
| Acts on behalf of | **Clients** | **Servers** |
| Hides | Client identities from servers | Server identities from clients |
| Location | Near the users, at the network edge | In front of the web servers |
| Configured by | Client / network admin | Website owner |
| Main uses | Filtering, caching, anonymity, monitoring | Load balancing, SSL termination, caching, DDoS protection, web application firewall |
| Examples | Squid, corporate proxies | Nginx, HAProxy, Cloudflare |

### Proxy vs VPN vs firewall

| | Proxy | VPN | Firewall |
| --- | --- | --- | --- |
| Works at | Application level, usually per application | Network level, all traffic | Network / transport (and application in next-gen firewalls) |
| Encrypts traffic | Usually not | **Yes** — encrypted tunnel | No |
| Main job | Intermediary — cache, filter, hide IP | Secure private connection over the internet | Allow or block traffic by rules |

## Quick revision

> [!TIP]
> **One-line answers.** HTML = structure; CSS = presentation; JavaScript =
> behaviour. Client-side scripts run in the browser (JavaScript); server-side
> scripts run on the server (PHP, ASP.NET, JSP, Python). External CSS is the
> best practice; inline CSS has the highest priority. XML = user-defined tags
> for storing and transporting data; well-formed = correct syntax; valid =
> well-formed + follows a DTD or XSD. Web server delivers pages over HTTP
> (port 80) and HTTPS (port 443). Forward proxy acts for clients; reverse proxy
> acts for servers.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: HTML tags are **not**
> case-sensitive, XML tags **are**; XML has **no predefined tags**; JavaScript
> is **not** Java; server-side code is **not visible** to users; `POST` (not
> `GET`) should be used for passwords; **ID** selectors (`#`) are unique,
> **class** selectors (`.`) are reusable; **404** = not found, **500** = server
> error, **403** = forbidden; a **transparent** proxy does **not** hide your
> IP; a **reverse** proxy does load balancing; a proxy does **not** encrypt
> traffic the way a **VPN** does; ISO 20022 banking messages use **XML**.
