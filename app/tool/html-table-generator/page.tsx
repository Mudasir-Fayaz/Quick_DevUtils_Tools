import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Table Generator",
  description: "Easily create customizable HTML tables from data with styling options.",
};

const ToolDetail = () => {
  const slug = "html-table-generator";

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