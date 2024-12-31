import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "ASCII to Text Converter",
  description: "The ASCII to Text Converter decodes ASCII codes into human-readable text. This tool simplifies the conversion of encoded ASCII data into standard text, ensuring easy comprehension and utility. Ideal for developers, students, and anyone dealing with ASCII-encoded information. It supports batch processing for enhanced productivity. A user-friendly interface ensures effortless use without technical expertise.",
  keywords: "ASCII to text converter, convert ASCII to text, decode ASCII, ASCII decoder, ASCII text conversion, ASCII translation, ASCII to human-readable text, ASCII utility, ASCII characters to text, text decoder",
};

const ToolDetail = () => {
  const slug = "ascii-to-text-converter";

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