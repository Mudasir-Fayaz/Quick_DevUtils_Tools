import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Hex Number",
  description: "Generate random hexadecimal numbers. This tool generates numbers in hexadecimal (base-16) format. Useful for cryptographic applications, color generation, and programming tasks that require hexadecimal values.",
  keywords: "random, hexadecimal, number, generate, cryptography",
};

const ToolDetail = () => {
  const slug = "random-hex-number";

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