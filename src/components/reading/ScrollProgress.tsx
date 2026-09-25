"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useReadingProgress } from "./ReadingProgress";
import styles from "./ScrollProgress.module.css";

function docSlug(pathname: string): string | undefined {
  return pathname.match(/^\/docs\/([^/]+)\/?$/)?.[1];
}

/** How far down the page the viewport's bottom edge is, 0–100. */
function scrollPercent(): number {
  const { scrollHeight, clientHeight } = document.documentElement;
  const scrollable = scrollHeight - clientHeight;
  if (scrollable <= 0) return 100;
  return (window.scrollY / scrollable) * 100;
}

/**
 * A thin bar along the bottom edge of the header showing how far down the
 * current document the reader is. Only on document pages, only with consent.
 */
export function ScrollProgress() {
  const pathname = usePathname();
  const slug = docSlug(pathname);
  const { consent, record } = useReadingProgress();
  const [percent, setPercent] = useState(0);
  const active = consent === "granted" && slug !== undefined;

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = scrollPercent();
        setPercent(next);
        record(slug as string, next);
      });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [active, slug, record]);

  if (!active) return null;

  const rounded = Math.round(percent);
  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={rounded}
      aria-valuetext={`${rounded}% read`}
    >
      <div
        className={styles.bar}
        style={{ transform: `scaleX(${percent / 100})` }}
      />
    </div>
  );
}
