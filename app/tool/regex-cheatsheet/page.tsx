import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Regex Cheatsheet",
  description: "Regex Cheatsheet provides an accessible reference for regular expression patterns and examples. It offers a curated list of the most commonly used regular expressions and their explanations. Perfect for both beginners and experienced developers, it simplifies the process of building and understanding regular expressions. Whether you need help with string matching, validation, or extraction, this tool is a fast way to find the right regex pattern. It’s an essential companion for developers working with text manipulation or pattern matching tasks.",
  keywords: "regex, regular expressions, patterns",
};

const ToolDetail = () => {
  const slug = "regex-cheatsheet";

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