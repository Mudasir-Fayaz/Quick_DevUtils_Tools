import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Viewer",
  description: "HTML Viewer allows you to view, format, and preview HTML code with enhanced readability. It simplifies the process of inspecting HTML documents and ensures clean formatting, making it easy to visualize the structure and content. This tool is perfect for web developers, designers, and anyone working with HTML code. It ensures that your code is formatted correctly, improving the readability and maintenance of your projects. Whether you're debugging or reviewing, the HTML Viewer is an essential tool for improving the web development workflow.",
  keywords: "HTML viewer, HTML formatter, beautify HTML, HTML code viewer, format HTML, HTML previewer, online HTML tool, HTML beautifier, code readability, web development tool",
};

const ToolDetail = () => {
  const slug = "html-viewer";

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