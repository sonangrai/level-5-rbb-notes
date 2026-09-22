"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchIcon } from "rbb/components/icons";
import type { DocMeta, DocSection } from "rbb/content/docs";
import { useEffect, useMemo, useState } from "react";
import { EmptyState, Input, Tag, Text } from "sonahang-ui";
import styles from "./Sidebar.module.css";

export type SidebarProps = {
  /** The document tree, loaded on the server and handed down as plain data. */
  sections: DocSection[];
  /** Called after a document is picked — closes the drawer on narrow viewports. */
  onNavigate?: () => void;
};

const SEARCH_ID = "sidebar-search";

function searchInput(): HTMLInputElement | null {
  return document.getElementById(SEARCH_ID) as HTMLInputElement | null;
}

function matches(doc: DocMeta, query: string): boolean {
  const haystack =
    `${doc.title} ${doc.summary} ${doc.tags.join(" ")}`.toLowerCase();
  return haystack.includes(query);
}

export function Sidebar({ sections, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  // "/" focuses search from anywhere, as long as the user isn't already typing.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable === true;

      if (event.key === "/" && !typing) {
        event.preventDefault();
        searchInput()?.focus();
      }
      if (event.key === "Escape" && target === searchInput()) {
        setQuery("");
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return sections;
    return sections
      .map((section) => ({
        ...section,
        docs: section.docs.filter((doc) => matches(doc, needle)),
      }))
      .filter((section) => section.docs.length > 0);
  }, [query, sections]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.search}>
        <Input
          id={SEARCH_ID}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search documents"
          aria-label="Search documents"
          icon={<SearchIcon />}
        />
      </div>

      <nav className={styles.nav} aria-label="Documents">
        {results.map((section) => (
          <section key={section.id} className={styles.section}>
            <Text
              as="h2"
              variant="caption"
              color="subtle"
              weight="semibold"
              className={styles.sectionTitle}
            >
              {section.title}
            </Text>
            <ul className={styles.list}>
              {section.docs.map((doc) => {
                const href = `/docs/${doc.slug}`;
                const active = pathname === href;
                return (
                  <li key={doc.slug}>
                    <Link
                      href={href}
                      className={styles.link}
                      data-active={active || undefined}
                      aria-current={active ? "page" : undefined}
                      onClick={onNavigate}
                    >
                      <span className={styles.linkTitle}>{doc.title}</span>
                      <span className={styles.linkSummary}>{doc.summary}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        {results.length === 0 && (
          <EmptyState
            size="sm"
            title="No matches"
            description={`Nothing here mentions "${query.trim()}".`}
            action={{ label: "Clear search", onClick: () => setQuery("") }}
          />
        )}
      </nav>

      <div className={styles.footer}>
        <Tag variant="secondary">
          {sections.reduce((total, section) => total + section.docs.length, 0)}{" "}
          documents
        </Tag>
        <Text as="span" variant="caption" color="subtle">
          Press <kbd className={styles.kbd}>/</kbd> to search
        </Text>
      </div>
    </div>
  );
}
