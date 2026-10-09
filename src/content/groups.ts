/**
 * The top level of the document tree: syllabus groups, each holding several
 * sections. No filesystem access, so the client sidebar can import it too.
 */

export type GroupId = "a" | "b";

export type DocGroup = {
  id: GroupId;
  /** Short name, as the syllabus calls it. */
  label: string;
  /** What the group covers. */
  title: string;
  /** One line for the group's card on the home page. */
  description: string;
};

/** In the order they appear. A section's `group` names one. */
export const GROUPS: DocGroup[] = [
  {
    id: "a",
    label: "Group A",
    title: "Banking",
    description:
      "Financial institutions, banking terms, banking and related laws, organizational behavior and digital payment systems.",
  },
  {
    id: "b",
    label: "Group B",
    title: "Computer and Information Technology",
    description:
      "Computer fundamentals, architecture, networks, operating systems, databases and web, and cyber security and IT policy.",
  },
];

/** Where a group's own page lives. */
export function groupHref(id: GroupId): string {
  return `/groups/${id}`;
}

/**
 * Splits sections into their groups, keeping each group's sections in the
 * order given. Sections without a group come first, under no heading; empty
 * groups are dropped.
 */
export function groupSections<S extends { group?: GroupId }>(
  sections: S[],
): { group?: DocGroup; sections: S[] }[] {
  const ungrouped = sections.filter((section) => !section.group);
  const grouped = GROUPS.map((group) => ({
    group,
    sections: sections.filter((section) => section.group === group.id),
  }));

  return [{ sections: ungrouped }, ...grouped].filter(
    (entry) => entry.sections.length > 0,
  );
}

export function getGroup(id: GroupId | undefined): DocGroup | undefined {
  return GROUPS.find((group) => group.id === id);
}
