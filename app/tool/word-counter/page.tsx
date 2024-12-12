import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Word Counter",
  description: "Counts words, characters, and spaces in your text to help you analyze content length.",
};

const ToolDetail = () => {
  const slug = "word-counter";

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