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
 * never turns up in the contents.
 */
export function extractHeadings(markdown: string): Heading[] {
  const prose = markdown.replace(/^([`~]{3,})[\s\S]*?^\1\s*$/gm, "");
  const headings: Heading[] = [];

  for (const match of prose.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    const text = stripInline(match[2]);
    headings.push({ id: slugify(text), text, level: match[1].length as 2 | 3 });
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
