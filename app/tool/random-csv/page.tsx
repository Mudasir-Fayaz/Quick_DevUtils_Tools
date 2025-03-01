import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random CSV",
  description: "Generate random CSV files. This tool creates random CSV (Comma Separated Values) files, which are commonly used for data storage, exporting, and importing in various applications and databases.",
  keywords: "random, CSV, data, generate, files",
};

const ToolDetail = () => {
  const slug = "random-csv";

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