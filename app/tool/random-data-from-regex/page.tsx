import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Data from Regex",
  description: "Quickly generate random data that matches a given regular expression. This tool is helpful for generating mock data for testing, development, or simply experimenting with regular expressions. You can input your own regular expression pattern and the tool will create data that fits the structure you've defined.",
  keywords: "random, data, regex, generate, mock data",
};

const ToolDetail = () => {
  const slug = "random-data-from-regex";

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