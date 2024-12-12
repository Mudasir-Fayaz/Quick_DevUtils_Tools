import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JavaScript Formatter",
  description: "Formats and organizes JavaScript code to improve readability and consistency.",
};

const ToolDetail = () => {
  const slug = "javascript-formatter";

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