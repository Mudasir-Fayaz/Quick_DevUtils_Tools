import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Text to ASCII Converter",
  description: "The Text to ASCII Converter encodes plain text into corresponding ASCII codes. It's a vital tool for encoding, data analysis, and software development. The converter ensures quick and accurate transformation for seamless data processing. Supports multiple languages and formats. Its efficiency saves time and enhances data handling capabilities.",
  keywords: "text to ASCII converter, convert text to ASCII, encode text to ASCII, ASCII encoding tool, text to ASCII code, ASCII generator, plain text to ASCII, string to ASCII, ASCII conversion, encode to ASCII",
};

const ToolDetail = () => {
  const slug = "text-to-ascii-converter";

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