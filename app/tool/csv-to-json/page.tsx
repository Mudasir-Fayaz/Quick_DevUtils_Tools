import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "CSV to JSON Converter",
  description: "CSV to JSON Converter transforms CSV data into JSON format, which is commonly used for APIs, web applications, and various programming tasks. This tool is great for integrating CSV-based datasets into systems that require JSON, streamlining the process of data conversion without manual formatting.",
  keywords: "csv to json, convert csv to json, csv json converter, csv to json tool, convert csv, csv to json parser, csv data to json",
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