import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML WYSIWYG Editor",
  description: "A rich text editor that generates clean HTML code, allowing you to format content easily for web pages or emails without coding.",
  keywords: "wysiwyg, html, editor, rich text",
};

const ToolDetail = () => {
  const slug = "html-editor";

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