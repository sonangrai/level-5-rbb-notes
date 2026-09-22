"use client";

import { MoonIcon, SunIcon } from "rbb/components/icons";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "sonahang-ui";

type Theme = "light" | "dark";

const STORAGE_KEY = "rbb-notes:theme";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Pins `data-theme` on the root element, which always wins over the OS
 * preference. The initial value is read from the DOM rather than from state,
 * because the inline script in the root layout has already applied it.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const pinned = document.documentElement.dataset.theme as Theme | undefined;
    setTheme(pinned ?? systemTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode, or storage is blocked — the theme still applies for this page.
    }
    setTheme(next);
  }

  // Nothing is rendered until the effect has run, so the markup can't disagree
  // with the theme the script already applied.
  const label =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <Tooltip content={label} placement="bottom">
      <Button
        variant="icon"
        size="sm"
        aria-label={label}
        onClick={toggle}
        icon={theme === "dark" ? <SunIcon /> : <MoonIcon />}
      />
    </Tooltip>
  );
}
