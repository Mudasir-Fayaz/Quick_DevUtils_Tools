import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text Editor",
  description: "A simple text editor that allows you to create, edit, and format text documents. Whether you're writing, note-taking, or drafting content, this tool provides a straightforward interface for all your text editing needs.",
  keywords: "text editor, edit text, text writing tool, plain text editor, text creation",
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