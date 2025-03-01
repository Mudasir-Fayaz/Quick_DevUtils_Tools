import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTTP Status Codes",
  description: "A complete reference for HTTP status codes, providing a quick guide for developers and system administrators to understand different server responses.",
  keywords: "http, status codes, web, reference",
};

const ToolDetail = () => {
  const slug = "http-status";

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