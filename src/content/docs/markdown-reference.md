---
title: Markdown reference
summary: Every Markdown feature the renderer supports, and what it maps to.
section: reference
order: 1
tags: [reference]
updatedAt: "2026-09-22"
---

Markdown is parsed on the server and rendered straight into design-system
components — the parser never reaches the browser, and the output can only ever
be markup the design system covers.

## Block elements

| Markdown | Renders as |
| --- | --- |
| `## Heading` | `Text` at `heading-3`, anchored and listed in the contents |
| Paragraph | `Text` at `body` |
| `- item` / `1. item` | A styled list |
| Fenced code | `CodeBlock`, with a copy button and line numbers |
| `> [!NOTE]` | `Alert`, in the matching variant |
| Table | A bordered table (GitHub Flavored Markdown) |

## Inline elements

`**bold**`, `*italic*`, `` `code` ``, [links](/docs/theming), ~~strikethrough~~
and footnotes all work — GFM is enabled.

## Callout variants

> [!NOTE]
> `NOTE` and `IMPORTANT` both render as the info variant.

> [!TIP]
> `TIP` is the success variant.

> [!CAUTION]
> `CAUTION` is the error variant, for things that lose data.

## Raw HTML

Raw HTML in a document is **not** rendered — it is escaped and shown as text.
If a document needs something the table above cannot express, add a mapping to
`src/components/docs/Markdown.tsx` rather than reaching for a `<div>`.
