import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JavaScript Console",
  description: "Run and test JavaScript code snippets in a browser-like environment, perfect for quick debugging.",
};

const ToolDetail = () => {
  const slug = "javascript-console";

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