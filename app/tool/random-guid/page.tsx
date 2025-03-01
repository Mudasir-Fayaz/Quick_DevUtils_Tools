import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random GUID",
  description: "Generate random GUIDs (Globally Unique Identifiers). This tool creates GUIDs for applications where unique identifiers are necessary, such as database entries, object references, and system management.",
  keywords: "random, GUID, identifier, generate, unique",
};

const ToolDetail = () => {
  const slug = "random-guid";

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