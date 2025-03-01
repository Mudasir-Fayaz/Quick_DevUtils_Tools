import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "ULID Generator",
  description: "Generate Universally Unique Lexicographically Sortable Identifiers (ULIDs) with various formatting options. ULIDs are similar to UUIDs but are designed to be lexicographically sortable and have better handling of time-based sorting, making them suitable for distributed systems and applications that require unique, time-ordered identifiers.",
  keywords: "ulid, unique identifier, sortable id, timestamp id, monotonic",
};

const ToolDetail = () => {
  const slug = "ulid-generator";

  if (!slug) {
    notFound();
  }

  return (
    <>
      <RenderTool slug={slug} />
    </>
  );
};

export default ToolDetail;