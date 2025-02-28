import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text to Unicode",
  description: "Convert text to Unicode code points and entities. This tool provides a quick way to convert any text into its corresponding Unicode representation, which is essential for internationalization. Ideal for developers, content creators, and those dealing with multi-language support. It's useful for ensuring compatibility across different platforms and systems. Perfect for anyone working with global content or web standards.",
  keywords: "unicode, text conversion, code points, entities",
};

const ToolDetail = () => {
  const slug = "text-unicode";

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