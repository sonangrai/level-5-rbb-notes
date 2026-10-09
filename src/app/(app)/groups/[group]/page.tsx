import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionCards } from "rbb/components/docs/SectionCards";
import { getSections } from "rbb/content/docs";
import { GROUPS, type GroupId, getGroup } from "rbb/content/groups";
import { Breadcrumb, BreadcrumbItem, Text } from "sonahang-ui";
import styles from "../../home.module.css";

type GroupPageProps = { params: Promise<{ group: string }> };

/** Both groups are known at build time, so both URLs are static. */
export function generateStaticParams() {
  return GROUPS.map((group) => ({ group: group.id }));
}

/** Anything other than a known group id is a 404, not a fallback render. */
export const dynamicParams = false;

function findGroup(id: string) {
  return getGroup(id as GroupId);
}

export async function generateMetadata({
  params,
}: GroupPageProps): Promise<Metadata> {
  const group = findGroup((await params).group);
  if (!group) return {};
  return {
    title: `${group.label}: ${group.title}`,
    description: group.description,
  };
}

export default async function GroupPage({ params }: GroupPageProps) {
  const group = findGroup((await params).group);
  if (!group) notFound();

  const sections = getSections().filter(
    (section) => section.group === group.id,
  );
  const count = sections.reduce(
    (total, section) => total + section.docs.length,
    0,
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Breadcrumb className={styles.crumb}>
          <BreadcrumbItem>
            <Link href="/">Notes</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{group.label}</BreadcrumbItem>
        </Breadcrumb>
        <Text as="p" variant="caption" className={styles.label}>
          {group.label}
        </Text>
        <Text as="h1" variant="heading-1">
          {group.title}
        </Text>
        <Text variant="body-lg" color="subtle" className={styles.lede}>
          {count} documents across {sections.length} sections.
        </Text>
      </header>

      <SectionCards sections={sections} />
    </div>
  );
}
