import Link from "next/link";
import type { DocSection } from "rbb/content/docs";
import { formatDate } from "rbb/content/markdown";
import { Tag, Text } from "sonahang-ui";
import styles from "./SectionCards.module.css";

/** Sections as headed grids of document cards, for the listing pages. */
export function SectionCards({
  sections,
  headingLevel = "h2",
}: {
  sections: DocSection[];
  headingLevel?: "h2" | "h3";
}) {
  return sections.map((section) => (
    <section key={section.id} className={styles.section}>
      <Text as={headingLevel} variant="heading-3">
        {section.title}
      </Text>
      <ul className={styles.grid}>
        {section.docs.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/docs/${doc.slug}`} className={styles.card}>
              <Text as="span" variant="body" weight="semibold">
                {doc.title}
              </Text>
              <Text
                as="span"
                variant="body-sm"
                color="subtle"
                className={styles.cardSummary}
              >
                {doc.summary}
              </Text>
              <span className={styles.cardMeta}>
                {doc.tags.map((tag) => (
                  <Tag key={tag} variant="outline">
                    {tag}
                  </Tag>
                ))}
                <Text as="span" variant="caption" color="subtle">
                  {formatDate(doc.updatedAt)}
                </Text>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  ));
}
