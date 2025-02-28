import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Word Counter",
  description: "The Word Counter counts the number of words, characters, and spaces in your text. It's a helpful tool for content creators, writers, and anyone looking to analyze the length of their text.",
  keywords: "word counter, character counter, text analysis, word count tool, content length checker, character count tool",
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