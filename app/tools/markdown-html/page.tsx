import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Markdown to HTML",
  description: "Convert Markdown to HTML with preview. Markdown is widely used for writing content in a lightweight, readable format, while HTML is the standard for web pages. This tool converts Markdown text into HTML, maintaining the formatting for websites, blogs, and content management systems. It also includes a preview of the HTML result. Ideal for content creators, web developers, and anyone writing content for the web.",
  keywords: "markdown, html, preview, conversion",
};

const ToolDetail = () => {
  const slug = "markdown-html";

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