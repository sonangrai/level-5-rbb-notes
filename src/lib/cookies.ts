/** Minimal `document.cookie` helpers. Client only. */

const ONE_YEAR = 60 * 60 * 24 * 365;

export function readCookie(name: string): string | undefined {
  const prefix = `${name}=`;
  for (const part of document.cookie.split("; ")) {
    if (part.startsWith(prefix)) {
      return decodeURIComponent(part.slice(prefix.length));
    }
  }
  return undefined;
}

export function writeCookie(name: string, value: string, maxAge = ONE_YEAR) {
  // biome-ignore lint/suspicious/noDocumentCookie: the Cookie Store API isn't in every browser yet
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function deleteCookie(name: string) {
  writeCookie(name, "", 0);
}
