import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Substring Finder",
  description: "The Substring Finder helps you search for and locate substrings within a string, simplifying text analysis and helping you find patterns or keywords in large texts.",
  keywords: "substring finder, find text in string, text search tool, substring search, locate text, string analysis tool, string searcher, find words in text, search text tool, substring locator",
};

const ToolDetail = () => {
  const slug = "substring-finder";

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