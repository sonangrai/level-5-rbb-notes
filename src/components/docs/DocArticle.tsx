import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "rbb/components/icons";
import type { Doc, DocSection } from "rbb/content/docs";
import { getNeighbours } from "rbb/content/docs";
import { getGroup, groupHref } from "rbb/content/groups";
import { extractHeadings, formatDate } from "rbb/content/markdown";
import { Breadcrumb, BreadcrumbItem, Tag, Text } from "sonahang-ui";
import styles from "./DocArticle.module.css";
import { Markdown } from "./Markdown";

/** The document itself, with a table of contents beside it on wide viewports. */
export function DocArticle({
  doc,
  section,
}: {
  doc: Doc;
  section?: DocSection;
}) {
  const headings = extractHeadings(doc.body);
  const { previous, next } = getNeighbours(doc.slug);
  const group = getGroup(section?.group);

  return (
    <div className={styles.layout}>
      <article className={styles.article}>
        <header className={styles.header}>
          <Breadcrumb className={styles.breadcrumb}>
            <BreadcrumbItem>
              <Link href="/">Notes</Link>
            </BreadcrumbItem>
            {group && (
              <BreadcrumbItem>
                <Link href={groupHref(group.id)}>{group.label}</Link>
              </BreadcrumbItem>
            )}
            {section && <BreadcrumbItem>{section.title}</BreadcrumbItem>}
            <BreadcrumbItem>{doc.title}</BreadcrumbItem>
          </Breadcrumb>

          <Text as="h1" variant="heading-1">
            {doc.title}
          </Text>
          <Text variant="body-lg" color="subtle" className={styles.summary}>
            {doc.summary}
          </Text>

          <div className={styles.meta}>
            {doc.updatedAt && (
              <Text as="span" variant="caption" color="subtle">
                Updated {formatDate(doc.updatedAt)}
              </Text>
            )}
            {doc.tags.map((tag) => (
              <Tag key={tag} variant="secondary">
                {tag}
              </Tag>
            ))}
          </div>
        </header>

        <Markdown>{doc.body}</Markdown>

        <nav className={styles.pager} aria-label="Document navigation">
          {previous ? (
            <Link href={`/docs/${previous.slug}`} className={styles.pagerLink}>
              <span className={styles.pagerLabel}>
                <ArrowLeftIcon /> Previous
              </span>
              <span className={styles.pagerTitle}>{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/docs/${next.slug}`}
              className={`${styles.pagerLink} ${styles.pagerNext}`}
            >
              <span className={styles.pagerLabel}>
                Next <ArrowRightIcon />
              </span>
              <span className={styles.pagerTitle}>{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      {headings.length > 0 && (
        <aside className={styles.toc} aria-label="On this page">
          <Text
            as="h2"
            variant="caption"
            color="subtle"
            weight="semibold"
            className={styles.tocTitle}
          >
            On this page
          </Text>
          <ul className={styles.tocList}>
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={styles.tocLink}
                  data-level={heading.level}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
