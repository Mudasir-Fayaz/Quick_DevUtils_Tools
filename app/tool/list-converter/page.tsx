import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "List Converter",
  description: "Convert between different list formats (CSV, Array, etc.). This tool is perfect for data analysts, programmers, and anyone who deals with lists in different formats. It can transform arrays, CSV files, and other list-based data types into the format you need. Whether you're working with spreadsheet data, databases, or code, this tool ensures seamless conversion between list formats. Ideal for handling data imports and exports in various software environments.",
  keywords: "list, array, csv, conversion",
};

const ToolDetail = () => {
  const slug = "list-converter";

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