import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random XML",
  description: "Generate random XML documents. This tool generates random XML data with user-defined tags and attributes. It’s useful for generating mock data for testing, database population, or XML-related applications.",
  keywords: "random, XML, data, generate, testing",
};

const ToolDetail = () => {
  const slug = "random-xml";

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