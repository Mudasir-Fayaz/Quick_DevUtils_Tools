import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Binary to ASCII Converter",
  description: "The Binary to ASCII Converter decodes binary sequences into readable ASCII text. It simplifies the translation of binary data into human-understandable formats, useful for debugging or analysis. Supports batch conversions for efficient processing. Ideal for developers working with binary code. Designed for simplicity and speed.",
  keywords: "binary to ASCII converter, convert binary to ASCII, binary code to text, binary decoder, ASCII from binary, binary to character conversion, decode binary text, binary to string, binary translation, ASCII tool",
};

const ToolDetail = () => {
  const slug = "binary-to-ascii-converter";

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