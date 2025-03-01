import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random TSV",
  description: "Generate random TSV (Tab Separated Values) files. This tool creates random TSV files that are often used for data storage and transfer where tab-separated data is required.",
  keywords: "random, TSV, data, generate, files",
};

const ToolDetail = () => {
  const slug = "random-tsv";

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