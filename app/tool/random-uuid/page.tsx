import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random UUID",
  description: "Generate random UUIDs (Universally Unique Identifiers). This tool creates random UUIDs that can be used for generating unique identifiers in various applications, such as databases, web applications, and system administration.",
  keywords: "random, UUID, identifier, generate, unique",
};

const ToolDetail = () => {
  const slug = "random-uuid";

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