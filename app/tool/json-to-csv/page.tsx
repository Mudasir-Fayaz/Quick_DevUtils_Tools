import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "JSON to CSV Converter",
  description: "JSON to CSV Converter simplifies the process of converting JSON data into CSV format, making it easier to use in spreadsheets, data analysis, or other tools that require CSV. This tool takes the complex structure of JSON and flattens it into rows and columns, which is ideal for working with large datasets or exporting data for use in non-technical environments.",
  keywords: "json to csv, convert json to csv, json to csv converter, export json to csv, convert json, json data to csv, json csv tool",
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