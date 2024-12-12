import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Remove Duplicate Lines",
  description: "Detects and removes duplicate lines from a text input, ensuring unique content.",
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