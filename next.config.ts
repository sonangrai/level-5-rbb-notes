import { createHash } from "node:crypto";
import path from "node:path";
import type { NextConfig } from "next";

/**
 * A css-loader rule, narrowed to the part this file rewrites.
 *
 * `getLocalIdent` is css-loader's hook for naming a scoped class. Next sets its
 * own — `Markdown-module__yuzu3G__callout` — which leaks the component name and
 * the author's class name into the shipped markup.
 */
type CssModuleLoader = {
  options: { modules: { getLocalIdent?: typeof hashedIdent } };
};

/** Next's vendored copy, not `postcss-loader`, which contains the same substring. */
const CSS_LOADER = /[\\/]css-loader[\\/]/;

/**
 * Names a scoped class after a hash of the file it came from and the class it
 * was written as, so nothing about the source survives into the CSS.
 *
 * It is deterministic on purpose: the same source has to produce the same
 * class on every machine, or the content hash in the asset filename would
 * change on every build and break long-term caching. "Random" here means
 * unreadable, not different each time.
 */
function hashedIdent(
  context: { rootContext: string; resourcePath: string },
  _pattern: string,
  localName: string,
): string {
  const file = path
    .relative(context.rootContext, context.resourcePath)
    .replace(/\\/g, "/");

  const hash = createHash("sha256")
    .update(`${file}\u0000${localName}`)
    .digest("base64url")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 8);

  // A CSS identifier may not begin with a digit.
  return /^\d/.test(hash) ? `x${hash}` : hash;
}

/**
 * Walks the webpack config for every css-loader that has CSS Modules enabled.
 *
 * Next nests these several levels deep — `module.rules[].oneOf[].use[]` — and
 * the shape is an implementation detail, so this searches rather than indexes.
 */
function* cssModuleLoaders(value: unknown): Generator<CssModuleLoader> {
  if (Array.isArray(value)) {
    for (const item of value) yield* cssModuleLoaders(item);
    return;
  }
  if (typeof value !== "object" || value === null) return;

  const rule = value as {
    loader?: unknown;
    options?: { modules?: unknown };
    oneOf?: unknown;
    rules?: unknown;
    use?: unknown;
  };

  if (
    typeof rule.loader === "string" &&
    CSS_LOADER.test(rule.loader) &&
    typeof rule.options?.modules === "object" &&
    rule.options.modules !== null
  ) {
    yield rule as CssModuleLoader;
  }

  yield* cssModuleLoaders(rule.oneOf);
  yield* cssModuleLoaders(rule.rules);
  yield* cssModuleLoaders(rule.use);
}

const nextConfig: NextConfig = {
  /**
   * Development stays on Turbopack, which is the Next 16 default and much
   * faster. Declaring it — even empty — is also what stops Next refusing to
   * start a Turbopack run just because a `webpack` config exists below.
   */
  turbopack: {},

  /**
   * Only consulted when the build runs on webpack, which is what the `build`
   * script asks for with `--webpack`. Turbopack has no equivalent hook, so
   * production has to go through webpack for class names to be hashed.
   */
  webpack(config, { dev }) {
    // Readable class names are worth far more than opaque ones while working.
    if (dev) return config;

    let patched = 0;
    for (const loader of cssModuleLoaders(config.module?.rules)) {
      loader.options.modules.getLocalIdent = hashedIdent;
      patched += 1;
    }

    if (patched === 0) {
      throw new Error(
        "next.config.ts: no CSS Modules loader found, so class names would " +
          "ship readable. Next's webpack config has changed shape.",
      );
    }

    return config;
  },
};

export default nextConfig;
