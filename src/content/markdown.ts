/**
 * Markdown helpers with no filesystem access, so they can be imported from
 * either side of the server/client boundary.
 */

export type Heading = { id: string; text: string; level: 2 | 3 };

/** Lowercase, punctuation stripped, spaces hyphenated — the usual anchor slug. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Returns a `slugify` that never hands out the same id twice — a repeat gets
 * `-1`, `-2`, … as GitHub does. A document can repeat a heading ("Status"
 * under every section), and duplicate ids would break both the anchors and
 * the table-of-contents keys.
 *
 * Use one per document, fed every heading in document order, so the table of
 * contents and the rendered headings arrive at the same ids.
 */
export function createSlugger(): (text: string) => string {
  const used = new Set<string>();
  return (text) => {
    const base = slugify(text);
    let id = base;
    for (let n = 1; used.has(id); n += 1) id = `${base}-${n}`;
    used.add(id);
    return id;
  };
}

/** Strips the inline syntax a heading might carry, leaving the words. */
function stripInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/\s*#+\s*$/, "")
    .trim();
}

/**
 * Collects the `##` and `###` headings for the table of contents.
 *
 * Fenced code is removed first, so a comment like `# TODO` inside a sample
 * never turns up in the contents. `#` headings are slugged but not listed:
 * they render as anchored headings too, so they have to claim their ids here
 * for the later ones to line up with the page.
 */
export function extractHeadings(markdown: string): Heading[] {
  const prose = markdown.replace(/^([`~]{3,})[\s\S]*?^\1\s*$/gm, "");
  const headings: Heading[] = [];
  const slug = createSlugger();

  for (const match of prose.matchAll(/^(#{1,3})\s+(.+)$/gm)) {
    const text = stripInline(match[2]);
    const id = slug(text);
    const level = match[1].length;
    if (level === 2 || level === 3) headings.push({ id, text, level });
  }

  return headings;
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
