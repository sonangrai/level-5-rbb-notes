"use client";

import { deleteCookie, readCookie, writeCookie } from "rbb/lib/cookies";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Reading progress, remembered per document in a cookie — but only once the
 * reader has said yes. Until then nothing but the answer itself is stored.
 */

/** `null` until the reader has answered, or before the cookie has been read. */
export type Consent = "granted" | "denied" | null;

/** Slug → furthest point reached, as a whole percentage. */
export type ProgressMap = Record<string, number>;

const CONSENT_COOKIE = "rbb-notes-consent";
const PROGRESS_COOKIE = "rbb-notes-progress";

function readProgress(): ProgressMap {
  try {
    const parsed = JSON.parse(readCookie(PROGRESS_COOKIE) ?? "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    // A hand-edited or truncated cookie — start over rather than crash.
    return {};
  }
}

type ReadingProgressValue = {
  consent: Consent;
  /** False until the cookies have been read, so the banner doesn't flash. */
  ready: boolean;
  progress: ProgressMap;
  accept: () => void;
  decline: () => void;
  /** Forgets the answer and the saved progress, and asks again. */
  reset: () => void;
  /** Records a position; only ever moves forward, and only with consent. */
  record: (slug: string, percent: number) => void;
};

const ReadingProgressContext = createContext<ReadingProgressValue | null>(null);

export function ReadingProgressProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<Consent>(null);
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    const stored = readCookie(CONSENT_COOKIE);
    const answer: Consent =
      stored === "granted" || stored === "denied" ? stored : null;
    setConsent(answer);
    if (answer === "granted") setProgress(readProgress());
    setReady(true);
  }, []);

  // Written in one place, after state settles, instead of on every scroll tick.
  useEffect(() => {
    if (consent !== "granted") return;
    const timer = setTimeout(
      () => writeCookie(PROGRESS_COOKIE, JSON.stringify(progress)),
      400,
    );
    return () => clearTimeout(timer);
  }, [consent, progress]);

  const accept = useCallback(() => {
    writeCookie(CONSENT_COOKIE, "granted");
    setConsent("granted");
  }, []);

  const decline = useCallback(() => {
    writeCookie(CONSENT_COOKIE, "denied");
    deleteCookie(PROGRESS_COOKIE);
    setProgress({});
    setConsent("denied");
  }, []);

  const reset = useCallback(() => {
    deleteCookie(CONSENT_COOKIE);
    deleteCookie(PROGRESS_COOKIE);
    setProgress({});
    setConsent(null);
  }, []);

  const record = useCallback(
    (slug: string, percent: number) => {
      if (consent !== "granted") return;
      const rounded = Math.round(Math.min(100, Math.max(0, percent)));
      setProgress((current) =>
        (current[slug] ?? 0) >= rounded
          ? current
          : { ...current, [slug]: rounded },
      );
    },
    [consent],
  );

  const value = useMemo(
    () => ({ consent, ready, progress, accept, decline, reset, record }),
    [consent, ready, progress, accept, decline, reset, record],
  );

  return (
    <ReadingProgressContext.Provider value={value}>
      {children}
    </ReadingProgressContext.Provider>
  );
}

export function useReadingProgress(): ReadingProgressValue {
  const value = useContext(ReadingProgressContext);
  if (!value) {
    throw new Error(
      "useReadingProgress must be used inside <ReadingProgressProvider>",
    );
  }
  return value;
}
