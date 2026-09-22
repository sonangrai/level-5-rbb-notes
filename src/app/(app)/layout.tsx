import { AppShell } from "rbb/components/layout/AppShell";
import { getSections } from "rbb/content/docs";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  // Read on the server, handed to the client sidebar as plain data.
  return <AppShell sections={getSections()}>{children}</AppShell>;
}
