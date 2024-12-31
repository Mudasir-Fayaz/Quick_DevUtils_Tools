import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "SQL Prettify",
  description: "SQL Prettify is a tool to format and beautify your SQL queries, making them more readable and easier to understand. It automatically adds indentation and line breaks to SQL queries, ensuring proper alignment of clauses, making debugging and development much easier. Whether working with simple or complex queries, this tool ensures that your SQL code is clean and neatly formatted. It’s especially helpful for those working with large databases and complicated queries.",
  keywords: "sql, format, prettify, database",
};

const ToolDetail = () => {
  const slug = "sql-prettify";

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