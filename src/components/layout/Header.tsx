"use client";

import Link from "next/link";
import { LogoMark, MenuIcon } from "rbb/components/icons";
import { Button, Tag, Text } from "sonahang-ui";
import styles from "./Header.module.css";
import { ThemeToggle } from "./ThemeToggle";

export type HeaderProps = {
  /** Opens the sidebar drawer. Only rendered on narrow viewports. */
  onOpenNav: () => void;
};

export function Header({ onOpenNav }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Button
        variant="icon"
        size="sm"
        className={styles.menuButton}
        aria-label="Open navigation"
        onClick={onOpenNav}
        icon={<MenuIcon />}
      />

      <Link href="/" className={styles.brand}>
        <span className={styles.mark} aria-hidden="true">
          <LogoMark />
        </span>
        <Text
          as="span"
          variant="body"
          weight="semibold"
          className={styles.wordmark}
        >
          RBB Notes
        </Text>
      </Link>

      <Tag variant="outline" className={styles.version}>
        v0.1
      </Tag>

      <div className={styles.spacer} />

      <ThemeToggle />
    </header>
  );
}
