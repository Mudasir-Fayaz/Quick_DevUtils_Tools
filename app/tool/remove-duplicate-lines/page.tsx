import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Remove Duplicate Lines",
  description: "The Remove Duplicate Lines tool detects and removes duplicate lines from your text input, ensuring unique and clean content. This is useful for lists, code, or any text requiring deduplication.",
  keywords: "remove duplicate lines, deduplicate text, text deduplication tool, clean duplicate lines, unique line generator",
};

const ToolDetail = () => {
  const slug = "remove-duplicate-lines";

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