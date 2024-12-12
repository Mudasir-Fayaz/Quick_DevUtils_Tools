import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "ASCII Table",
  description: "Provides a comprehensive ASCII table with character mappings for reference and analysis.",
};

const ToolDetail = () => {
  const slug = "ascii-table";

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