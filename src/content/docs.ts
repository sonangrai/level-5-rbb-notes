/**
 * Loads the documents in `src/content/docs/` — one Markdown file each, with a
 * YAML frontmatter block for the metadata.
 *
 * Server only: it touches the filesystem, so a client component must receive
 * what it needs as props rather than importing from here. Types are safe to
 * import anywhere, since they are erased at compile time.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { GroupId } from "./groups";

export type DocMeta = {
  slug: string;
  title: string;
  summary: string;
  section: string;
  order: number;
  tags: string[];
  updatedAt: string;
};

export type Doc = DocMeta & {
  /** The Markdown body, frontmatter already removed. */
  body: string;
};

export type DocSection = {
  id: string;
  title: string;
  /** The syllabus group the section belongs to, if any. */
  group?: GroupId;
  docs: DocMeta[];
};

/**
 * Sidebar sections, in the order they appear. A file's `section` names one,
 * and each section's `group` places it under Group A or B. Keep a group's
 * sections together: documents are ordered by their section's position here.
 */
const SECTIONS: { id: string; title: string; group?: GroupId }[] = [
  { id: "getting-started", title: "Getting started" },
  { id: "guides", title: "Guides" },
  { id: "reference", title: "Reference" },
  {
    id: "financial-institutions",
    title: "Financial Institutions in Nepal",
    group: "a",
  },
  { id: "banking-terminology", title: "Key Banking Terminology", group: "a" },
  { id: "banking-law", title: "Banking Related Laws", group: "a" },
  {
    id: "organizational-behavior",
    title: "Organizational Behavior",
    group: "a",
  },
  { id: "other-laws", title: "Other Related Laws", group: "a" },
  {
    id: "digital-payments",
    title: "Digital/Electronic Payment Systems",
    group: "a",
  },
  { id: "computer-intro", title: "Introduction of Computer", group: "b" },
  { id: "computer-architecture", title: "Computer Architecture", group: "b" },
  {
    id: "networks",
    title: "Communication and Computer Network Technologies",
    group: "b",
  },
  {
    id: "operating-system",
    title: "Operating System and Information Systems",
    group: "b",
  },
  {
    id: "database-web",
    title:
      "Database Management System, Database Design, Data Mining/Warehousing and Web Technology",
    group: "b",
  },
  { id: "cybersecurity", title: "Cybersecurity and IT Policies", group: "b" },
];

const DOCS_DIR = path.join(process.cwd(), "src", "content", "docs");

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  // An unquoted YAML date parses to a Date — keep the ISO day, drop the time.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return fallback;
}

function asTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((tag) => asString(tag)).filter(Boolean);
}

function readDoc(filename: string): Doc {
  const raw = fs.readFileSync(path.join(DOCS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.md$/, "");

  return {
    slug,
    title: asString(data.title, slug),
    summary: asString(data.summary),
    section: asString(data.section, SECTIONS[0].id),
    // Files without an explicit order sort after the ones that have one.
    order:
      typeof data.order === "number" ? data.order : Number.MAX_SAFE_INTEGER,
    tags: asTags(data.tags),
    updatedAt: asString(data.updatedAt),
    body: content.trim(),
  };
}

/**
 * `cache` dedupes the read within a render pass while still picking up edits
 * between requests, so `pnpm dev` reflects a saved file on reload.
 */
const loadDocs = cache((): Doc[] =>
  fs
    .readdirSync(DOCS_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .map(readDoc),
);

/** Every document, in sidebar order: by section, then by `order`, then by title. */
export const getAllDocs = cache((): Doc[] => {
  const sectionRank = new Map(
    SECTIONS.map((section, index) => [section.id, index]),
  );

  return loadDocs().sort((a, b) => {
    const rankA = sectionRank.get(a.section) ?? SECTIONS.length;
    const rankB = sectionRank.get(b.section) ?? SECTIONS.length;
    if (rankA !== rankB) return rankA - rankB;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
});

/** The sidebar tree. Metadata only — bodies stay on the server. */
export const getSections = cache((): DocSection[] => {
  const docs = getAllDocs();

  return SECTIONS.map(({ id, title, group }) => ({
    id,
    title,
    group,
    docs: docs
      .filter((doc) => doc.section === id)
      .map(({ body: _body, ...meta }) => meta),
  })).filter((section) => section.docs.length > 0);
});

export function getDoc(slug: string): Doc | undefined {
  return getAllDocs().find((doc) => doc.slug === slug);
}

export function getSectionOf(slug: string): DocSection | undefined {
  return getSections().find((section) =>
    section.docs.some((doc) => doc.slug === slug),
  );
}

/** Previous and next document in sidebar order, for the footer navigation. */
export function getNeighbours(slug: string): {
  previous?: DocMeta;
  next?: DocMeta;
} {
  const docs = getAllDocs();
  const index = docs.findIndex((doc) => doc.slug === slug);
  if (index === -1) return {};
  return { previous: docs[index - 1], next: docs[index + 1] };
}
