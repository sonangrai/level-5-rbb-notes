import type { Metadata } from "next";
// Order-independent: globals.css shares the library's layer rather than
// declaring a layer order, since the build reorders these anyway.
import "./globals.css";
import "sonahang-ui/style.css";

export const metadata: Metadata = {
  title: {
    default: "RBB Notes",
    template: "%s · RBB Notes",
  },
  description: "A summary notes for the Rastriya Banijya Bank, level 5 IT.",
};

/**
 * Applies the pinned theme before first paint, so a reload never flashes the
 * theme the OS prefers over the one the reader chose.
 */
const themeScript = `
try {
  var pinned = localStorage.getItem("rbb-notes:theme");
  if (pinned === "light" || pinned === "dark") {
    document.documentElement.dataset.theme = pinned;
  }
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: runs before paint to avoid a theme flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
