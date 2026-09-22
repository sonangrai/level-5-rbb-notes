---
title: Adding a document
summary: Drop a Markdown file in the content folder and it routes itself.
section: guides
order: 1
tags: [authoring, routing]
updatedAt: "2026-09-21"
---

Documents are static: the folder is read at build time and every file is
pre-rendered, so adding one is a content change rather than a code change.

## Add the file

Create `src/content/docs/deployment.md`:

```md src/content/docs/deployment.md
---
title: Deployment
summary: How a change reaches production.
section: guides
order: 3
tags: [ops]
updatedAt: "2026-09-22"
---

Every merge to `main` ships.
```

## Frontmatter

| Field | Required | What it does |
| --- | --- | --- |
| `title` | yes | Heading, sidebar entry, and page title |
| `summary` | yes | Line under the title, and the sidebar blurb |
| `section` | yes | Which sidebar group it joins |
| `order` | no | Position within the section; unordered files sort last |
| `tags` | no | Shown in the header, and searched from the sidebar |
| `updatedAt` | no | `YYYY-MM-DD`, shown in the header |

## The URL

The filename becomes the slug — `deployment.md` is served at `/docs/deployment`
— and `generateStaticParams` picks it up without further wiring.

> [!TIP]
> Slugs are permanent once shared. Rename a title freely; rename a file only
> with a redirect.
