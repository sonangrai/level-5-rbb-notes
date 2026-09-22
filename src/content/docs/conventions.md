---
title: Writing conventions
summary: House style for headings, code samples and callouts.
section: getting-started
order: 2
tags: [style, authoring]
updatedAt: "2026-09-20"
---

A document should answer one question. When it starts answering two, split it —
cross-linking costs less than scrolling.

## Headings

Headings become anchors and feed the table of contents on the right. Write them
as noun phrases so they read well out of context. Only `##` and `###` are
listed; the document title comes from frontmatter, so a file should not open
with `#`.

## Code samples

Give every sample a language so the block is labelled. Anything after the
language on the fence line is used as the filename:

````md
```ts src/content/example.ts
export const answer = 42;
```
````

Which renders as:

```ts src/content/example.ts
export const answer = 42;
```

## Callouts

GitHub's alert syntax is supported, so a callout renders here *and* on GitHub:

> [!WARNING]
> A sample that has been trimmed past the point of running is a diagram. Label
> it as one, or leave the lines in.
