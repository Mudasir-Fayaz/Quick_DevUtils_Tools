import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JavaScript Minifier",
  description: "Effortlessly minify JavaScript code by removing unnecessary characters, improving file size and performance.",
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