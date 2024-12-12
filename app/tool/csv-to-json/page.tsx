import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "CSV to JSON Converter",
  description: "Transforms CSV files into JSON format for seamless use in APIs and applications.",
};

const ToolDetail = () => {
  const slug = "csv-to-json";

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