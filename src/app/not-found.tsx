import { DocIcon } from "rbb/components/icons";
import { EmptyState } from "sonahang-ui";

export default function NotFound() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "60dvh",
        padding: "2rem",
      }}
    >
      <EmptyState
        icon={<DocIcon />}
        title="No such document"
        description="The page you followed doesn't exist, or its slug has changed."
        action={{ label: "Back to all notes", href: "/" }}
      />
    </div>
  );
}
