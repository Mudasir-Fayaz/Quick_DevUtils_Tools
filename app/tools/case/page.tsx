import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Case Converter",
  description: "Convert text between different cases like upper, lower, title, camel, snake, etc. This tool makes it easy to format text for programming, web development, or simply improving readability. Perfect for coders, content creators, and anyone needing quick text transformations. It's an essential tool for ensuring uniformity in text styling and formatting. Supports multiple case types to suit various needs.",
  keywords: "text case, uppercase, lowercase, camelcase, snakecase",
};

const ToolDetail = () => {
  const slug = "case";

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