import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Substring Finder",
  description: "Search for and locate substrings within a string to simplify text analysis.",
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