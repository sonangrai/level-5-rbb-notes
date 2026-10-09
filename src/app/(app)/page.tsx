import Link from "next/link";
import { SectionCards } from "rbb/components/docs/SectionCards";
import { ArrowRightIcon } from "rbb/components/icons";
import { getAllDocs, getSections } from "rbb/content/docs";
import { groupHref, groupSections } from "rbb/content/groups";
import { Text } from "sonahang-ui";
import styles from "./home.module.css";

/** Picks a group; each group's documents live on its own page. */
export default function HomePage() {
  const docs = getAllDocs();
  const entries = groupSections(getSections());
  const ungrouped = entries.find((entry) => !entry.group)?.sections ?? [];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Text as="h1" variant="heading-1">
          RBB Notes
        </Text>
        <Text variant="body-lg" color="subtle" className={styles.lede}>
          {docs.length} documents in two groups. Pick a group to see its
          sections and notes.
        </Text>
      </header>

      <ul className={styles.choices}>
        {entries.map(({ group, sections }) => {
          if (!group) return null;
          const count = sections.reduce(
            (total, section) => total + section.docs.length,
            0,
          );

          return (
            <li key={group.id}>
              <Link href={groupHref(group.id)} className={styles.choice}>
                <Text as="span" variant="caption" className={styles.label}>
                  {group.label}
                </Text>
                <Text as="h2" variant="heading-2">
                  {group.title}
                </Text>
                <Text
                  variant="body"
                  color="subtle"
                  className={styles.description}
                >
                  {group.description}
                </Text>
                <span className={styles.choiceFooter}>
                  <Text as="span" variant="caption" color="subtle">
                    {sections.length} sections · {count} documents
                  </Text>
                  <span className={styles.open}>
                    Open <ArrowRightIcon />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {ungrouped.length > 0 && (
        <div className={styles.ungrouped}>
          <SectionCards sections={ungrouped} />
        </div>
      )}
    </div>
  );
}
