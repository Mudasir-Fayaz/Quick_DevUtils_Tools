import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random JSON",
  description: "Generate random JSON data structures. This tool creates random JSON objects, arrays, and key-value pairs for testing APIs, databases, or applications that require randomized JSON data input.",
  keywords: "random, JSON, data, generate, API",
};

const ToolDetail = () => {
  const slug = "random-json";

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