"use client";

import { Button, Text } from "sonahang-ui";
import styles from "./ConsentBanner.module.css";
import { useReadingProgress } from "./ReadingProgress";

/** Asks once whether reading progress may be kept in a cookie. */
export function ConsentBanner() {
  const { ready, consent, accept, decline } = useReadingProgress();
  if (!ready || consent !== null) return null;

  return (
    <section className={styles.banner} aria-labelledby="consent-title">
      <div className={styles.copy}>
        <Text as="h2" id="consent-title" variant="body" weight="semibold">
          Remember your reading progress?
        </Text>
        <Text variant="body-sm" color="subtle">
          With your permission we store how far you've read each document in a
          cookie on this device, and show a progress bar while you read. Nothing
          is sent anywhere else. You can change your mind from the sidebar at
          any time.
        </Text>
      </div>
      <div className={styles.actions}>
        <Button variant="outline" size="sm" onClick={decline}>
          No thanks
        </Button>
        <Button variant="primary" size="sm" onClick={accept}>
          Accept cookies
        </Button>
      </div>
    </section>
  );
}
