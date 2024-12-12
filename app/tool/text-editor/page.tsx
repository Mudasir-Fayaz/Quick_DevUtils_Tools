import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text Editor",
  description: "A simple text editor for creating, editing, and formatting text documents.",
};

const ToolDetail = () => {
  const slug = "text-editor";

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