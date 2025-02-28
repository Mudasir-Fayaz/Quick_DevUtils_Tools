import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Integer Base Converter",
  description: "Convert numbers between different bases (binary, octal, decimal, hexadecimal). Simplifies understanding and working with number systems. Ideal for students, developers, or anyone working with low-level programming. Supports various base formats with high accuracy. Perfect for debugging, algorithm development, and computation tasks.",
  keywords: "base conversion, binary, octal, decimal, hex, number system",
};

const ToolDetail = () => {
  const slug = "integer-base";

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