import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Binary Number",
  description: "Generate random binary numbers. This tool is perfect for generating binary numbers (1s and 0s) for testing, simulations, or cryptographic purposes. You can specify the length of the binary number or let the tool generate random lengths.",
  keywords: "random, binary, number, generate, computer",
};

const ToolDetail = () => {
  const slug = "random-binary-number";

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