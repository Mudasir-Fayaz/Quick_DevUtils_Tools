import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Regex Tester",
  description: "Regex Tester is a powerful tool that allows you to quickly test and debug regular expressions (regex) against sample input strings. It helps you validate the correctness of your regular expression patterns, making it easier to identify issues and optimize your expressions for better performance. Whether you’re a beginner or an experienced developer, this tool simplifies the regex testing process and aids in debugging.",
  keywords: "regex tester, test regex, regular expression tester, regex debugging, regex validator, validate regex patterns",
};

const ToolDetail = () => {
  const slug = "regex-tester";

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