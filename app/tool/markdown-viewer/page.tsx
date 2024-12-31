import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Markdown Viewer",
  description: "Markdown Viewer renders and previews Markdown content as HTML for better visualization. This tool is essential for converting Markdown syntax into formatted HTML, making it easy to preview how the content will appear on a web page. It helps users understand the final structure without needing to open a Markdown renderer. Whether you're working on documentation or content editing, this tool simplifies the process of visualizing Markdown. It's a handy tool for web developers and content creators who frequently use Markdown for web-based content.",
  keywords: "Markdown viewer, Markdown to HTML, Markdown previewer, Markdown renderer, view Markdown, Markdown to web, Markdown formatting, online Markdown tool, text to HTML, web development",
};

const ToolDetail = () => {
  const slug = "markdown-viewer";

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