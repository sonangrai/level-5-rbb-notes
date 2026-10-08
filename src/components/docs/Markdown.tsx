import Link from "next/link";
import { createSlugger } from "rbb/content/markdown";
import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Alert, CodeBlock, Text } from "sonahang-ui";
import styles from "./Markdown.module.css";

/** Flattens a node tree down to its text, for heading anchors and markers. */
function toText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean")
    return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement<{ children?: ReactNode }>(node))
    return toText(node.props.children);
  return "";
}

/** GitHub's alert syntax — `> [!NOTE]` — mapped onto the Alert variants. */
const CALLOUTS = {
  NOTE: { variant: "info", title: "Note" },
  TIP: { variant: "success", title: "Tip" },
  IMPORTANT: { variant: "info", title: "Important" },
  WARNING: { variant: "warning", title: "Warning" },
  CAUTION: { variant: "error", title: "Caution" },
} as const;

const MARKER = /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n?/;

/** Removes the `[!NOTE]` token from the first text node, leaving the body. */
function stripMarker(children: ReactNode): ReactNode {
  let done = false;

  function walk(node: ReactNode): ReactNode {
    if (done) return node;
    if (typeof node === "string") {
      const next = node.replace(MARKER, "");
      if (next !== node) done = true;
      return next;
    }
    if (Array.isArray(node)) return Children.map(node, walk);
    if (isValidElement<{ children?: ReactNode }>(node)) {
      return cloneElement(node, undefined, walk(node.props.children));
    }
    return node;
  }

  return walk(children);
}

function Heading({
  id,
  level,
  children,
}: {
  id: string;
  level: "heading-3" | "heading-4";
  children: ReactNode;
}) {
  return (
    <Text
      as={level === "heading-3" ? "h2" : "h3"}
      id={id}
      variant={level}
      className={styles.heading}
    >
      <a href={`#${id}`} className={styles.anchor}>
        {children}
      </a>
    </Text>
  );
}

/**
 * The headings need a fresh slugger per document so a repeated title gets a
 * unique id, which is why they can't live in the shared `components` map.
 */
function headingComponents(): Components {
  const slug = createSlugger();
  const heading =
    (level: "heading-3" | "heading-4"): Components["h2"] =>
    ({ children }) => (
      <Heading id={slug(toText(children))} level={level}>
        {children}
      </Heading>
    );

  return {
    h1: heading("heading-3"),
    h2: heading("heading-3"),
    h3: heading("heading-4"),
  };
}

const components: Components = {
  h4: ({ children }) => (
    <Text variant="body" weight="semibold" className={styles.minorHeading}>
      {children}
    </Text>
  ),

  p: ({ children }) => (
    <Text variant="body" className={styles.paragraph}>
      {children}
    </Text>
  ),

  ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
  ol: ({ children }) => <ol className={styles.list}>{children}</ol>,

  a: ({ href, children }) => {
    const external = !!href && /^https?:\/\//.test(href);
    if (external) {
      return (
        <a href={href} className={styles.link} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? "#"} className={styles.link}>
        {children}
      </Link>
    );
  },

  // `pre` steps aside so the CodeBlock below isn't nested inside one.
  pre: ({ children }) => <>{children}</>,

  code: ({ className, children, node }) => {
    const language = /language-(\w+)/.exec(className ?? "")?.[1];
    if (!language) {
      return <code className={styles.inlineCode}>{children}</code>;
    }

    // Anything after the language on the fence line is the filename. It rides
    // along on the hast node rather than in props, so it needs a cast.
    const meta = (node as unknown as { data?: { meta?: string } } | undefined)
      ?.data?.meta;
    const filename =
      meta?.replace(/^title=["']|["']$/g, "").trim() || undefined;

    return (
      <div className={styles.code}>
        <CodeBlock language={language} filename={filename} showLineNumbers>
          {toText(children).replace(/\n$/, "")}
        </CodeBlock>
      </div>
    );
  },

  blockquote: ({ children }) => {
    const marker = MARKER.exec(toText(children));
    const callout = marker
      ? CALLOUTS[marker[1] as keyof typeof CALLOUTS]
      : undefined;

    return (
      <div className={styles.callout}>
        <Alert
          variant={callout?.variant ?? "info"}
          title={callout?.title ?? undefined}
        >
          {callout ? stripMarker(children) : children}
        </Alert>
      </div>
    );
  },

  table: ({ children }) => (
    <div className={styles.tableWrap}>
      <table className={styles.table}>{children}</table>
    </div>
  ),

  hr: () => <hr className={styles.rule} />,

  img: ({ src, alt }) => (
    // next/image needs dimensions up front, which Markdown never supplies.
    // biome-ignore lint/performance/noImgElement: intrinsic size is unknown here
    <img
      className={styles.image}
      src={typeof src === "string" ? src : ""}
      alt={alt ?? ""}
    />
  ),
};

/**
 * Renders a Markdown document as design-system components.
 *
 * `ReactMarkdown` is the hook-free export, so the parse happens on the server
 * during the static build and none of it ships to the browser — only the
 * components it produces do.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className={styles.prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ ...components, ...headingComponents() }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
