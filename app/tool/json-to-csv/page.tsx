import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON to CSV Converter",
  description: "Converts JSON data into CSV format for easier use in spreadsheets and data analysis.",
};

const ToolDetail = () => {
  const slug = "json-to-csv";

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