"use client";

import { ConsentBanner } from "rbb/components/reading/ConsentBanner";
import { ReadingProgressProvider } from "rbb/components/reading/ReadingProgress";
import type { DocSection } from "rbb/content/docs";
import { type ReactNode, useState } from "react";
import { Drawer } from "sonahang-ui";
import styles from "./AppShell.module.css";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

/**
 * Header across the top, document list down the left, document in the middle.
 *
 * The sidebar is rendered twice on purpose: a persistent aside on wide
 * viewports, and the same component inside a Drawer below 960px. One list,
 * two containers — nothing about the list knows which one it's in.
 */
export function AppShell({
  sections,
  children,
}: {
  sections: DocSection[];
  children: ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <ReadingProgressProvider>
      <div className={styles.shell}>
        <Header onOpenNav={() => setNavOpen(true)} />

        <div className={styles.body}>
          <aside className={styles.sidebar}>
            <Sidebar sections={sections} />
          </aside>

          <main className={styles.main} id="content">
            {children}
          </main>
        </div>

        <Drawer
          open={navOpen}
          onClose={() => setNavOpen(false)}
          side="left"
          size="sm"
          title="Documents"
          className={styles.drawer}
        >
          <Sidebar sections={sections} onNavigate={() => setNavOpen(false)} />
        </Drawer>

        <ConsentBanner />
      </div>
    </ReadingProgressProvider>
  );
}
