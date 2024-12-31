import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "HTML Table Generator",
  description: "HTML Table Generator allows users to easily create customizable HTML tables from raw data with various styling options. It helps developers quickly generate tables with the right structure, from simple to complex layouts, and apply custom styles to make them more visually appealing. This tool is ideal for anyone who needs to create data-driven tables for websites or applications, reducing the time spent coding and designing tables manually. Whether you need a dynamic table for a website or a responsive one for mobile users, this tool streamlines the process.",
  keywords: "HTML table generator, create HTML table, table maker, table HTML code, dynamic table generator, online table creator, HTML table builder, responsive tables, table design, web tools",
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