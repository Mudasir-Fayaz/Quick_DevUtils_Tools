import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "ASCII Table",
  description: "The ASCII Table provides a complete reference of ASCII characters and their corresponding codes. It’s an essential tool for developers, designers, and learners working with ASCII standards. Displays codes in decimal, hexadecimal, and binary formats. Easy to navigate and perfect for quick lookups. A must-have for coding and analysis tasks.",
  keywords: "ASCII table, character mappings, ASCII reference table, ASCII character codes, ASCII chart, printable ASCII table, ASCII mappings guide, character code chart, ASCII lookup, ASCII cheat sheet",
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