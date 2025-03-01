import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "XML Converter",
  description: "Convert XML documents to and from JSON format. XML is often used for data storage, web services, and document management, while JSON is widely adopted in web applications and APIs. This tool makes it easy to transform XML data into JSON and vice versa. It's essential for developers and system integrators who need to work with both formats. Perfect for converting between XML and JSON in web development, APIs, and data interchange.",
  keywords: "xml, json, format conversion",
};

const ToolDetail = () => {
  const slug = "xml-converter";

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