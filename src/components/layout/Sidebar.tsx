"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchIcon } from "rbb/components/icons";
import { useReadingProgress } from "rbb/components/reading/ReadingProgress";
import type { DocMeta, DocSection } from "rbb/content/docs";
import { useEffect, useId, useMemo, useState } from "react";
import { EmptyState, Input, Tag, Text } from "sonahang-ui";
import styles from "./Sidebar.module.css";

export type SidebarProps = {
  /** The document tree, loaded on the server and handed down as plain data. */
  sections: DocSection[];
  /** Called after a document is picked — closes the drawer on narrow viewports. */
  onNavigate?: () => void;
};

/**
 * The search box of one Sidebar, if it is on screen. The shell renders two
 * Sidebars — the desktop column and the mobile drawer — and only one of them
 * is visible at a time, so the hidden one must not react to shortcuts.
 */
function visibleSearchInput(id: string): HTMLInputElement | null {
  const input = document.getElementById(id) as HTMLInputElement | null;
  return input?.offsetParent ? input : null;
}

function matches(doc: DocMeta, query: string): boolean {
  const haystack =
    `${doc.title} ${doc.summary} ${doc.tags.join(" ")}`.toLowerCase();
  return haystack.includes(query);
}

export function Sidebar({ sections, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const { consent, progress, reset } = useReadingProgress();
  // Unique per instance: a fixed id would be duplicated across the two Sidebars.
  const searchId = useId();

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
        visibleSearchInput(searchId)?.focus();
      }
      if (event.key === "Escape" && target?.id === searchId) {
        setQuery("");
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [searchId]);

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
          id={searchId}
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
                const read =
                  consent === "granted" ? progress[doc.slug] : undefined;
                return (
                  <li key={doc.slug}>
                    <Link
                      href={href}
                      className={styles.link}
                      data-active={active || undefined}
                      aria-current={active ? "page" : undefined}
                      onClick={onNavigate}
                    >
                      <span className={styles.linkTitle}>
                        {doc.title}
                        {read !== undefined && read > 0 && (
                          <span
                            className={styles.linkProgress}
                            data-done={read >= 100 || undefined}
                          >
                            <span aria-hidden="true">
                              {read >= 100 ? "✓" : `${read}%`}
                            </span>
                            <span className={styles.srOnly}>
                              {read >= 100 ? "Read" : `${read}% read`}
                            </span>
                          </span>
                        )}
                      </span>
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
      {consent !== null && (
        <div className={styles.privacy}>
          <Text as="span" variant="caption" color="subtle">
            Progress tracking {consent === "granted" ? "on" : "off"}
          </Text>
          <button
            type="button"
            className={styles.privacyButton}
            onClick={reset}
          >
            Cookie preferences
          </button>
        </div>
      )}
    </div>
  );
}
