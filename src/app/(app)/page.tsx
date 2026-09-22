import Link from "next/link";
import { getAllDocs, getSections } from "rbb/content/docs";
import { formatDate } from "rbb/content/markdown";
import { Tag, Text } from "sonahang-ui";
import styles from "./home.module.css";

export default function HomePage() {
  const sections = getSections();
  const docs = getAllDocs();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Text as="h1" variant="heading-1">
          RBB Notes
        </Text>
        <Text variant="body-lg" color="subtle" className={styles.lede}>
          {docs.length} documents across {sections.length} sections. Pick one
          from the list, or start with the introduction.
        </Text>
      </header>

      {sections.map((section) => (
        <section key={section.id} className={styles.section}>
          <Text as="h2" variant="heading-3">
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
      ))}
    </div>
  );
}
