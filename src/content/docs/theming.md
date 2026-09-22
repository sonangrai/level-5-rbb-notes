---
title: Theming
summary: Light and dark, and overriding the accent colour.
section: guides
order: 2
tags: [ui, css]
updatedAt: "2026-09-19"
---

sonahang-ui reads semantic CSS variables, so a theme is a short list of
overrides rather than a provider. Dark mode follows the OS until the toggle in
the header pins it.

## Overriding the accent

```css src/app/globals.css
:root {
  --color-accent: #0f766e;
  --color-accent-hover: #115e59;
  --color-accent-subtle-bg: #f0fdfa;
}
```

## Avoiding the flash

The pinned choice is written to `localStorage` and applied by a small script in
the root layout before paint, so a reload never shows the wrong theme first.

> [!IMPORTANT]
> Component CSS ships inside `@layer sonahang-ui`. Every stylesheet in this app
> is unlayered, and unlayered CSS always wins — no `!important` required.
