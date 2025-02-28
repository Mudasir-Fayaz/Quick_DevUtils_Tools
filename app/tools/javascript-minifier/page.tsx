import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JavaScript Minifier",
  description: "JavaScript Minifier helps you effortlessly minify JavaScript code by removing unnecessary characters such as spaces, line breaks, and comments. This reduces the file size, improving load times and performance for your website or web application. Minifying JavaScript is a crucial step in optimizing the code for production environments. With this tool, developers can quickly compress JavaScript files without affecting their functionality.",
  keywords: "JavaScript minifier, minify JavaScript, compress JavaScript, JS minification, reduce JavaScript size, optimize JavaScript",
};

const ToolDetail = () => {
  const slug = "javascript-minifier";

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