import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "URL Parser",
  description: "Parse and analyze URL components such as the domain, path, and query parameters. This tool is useful for developers to break down and understand URLs.",
  keywords: "url, parse, query parameters, domain, path",
};

const ToolDetail = () => {
  const slug = "url-parser";

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