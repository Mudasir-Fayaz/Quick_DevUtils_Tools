import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Code Beautifier",
  description: "Beautify and reformat messy JavaScript code into a clean and readable format.",
};

const ToolDetail = () => {
  const slug = "code-beautifier";

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