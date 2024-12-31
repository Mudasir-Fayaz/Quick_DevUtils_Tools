import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Octal Number",
  description: "Generate random octal numbers. This tool generates random numbers in octal (base-8) format. It's useful for computing, programming, or testing systems that work with octal values.",
  keywords: "random, octal, number, generate, computing",
};

const ToolDetail = () => {
  const slug = "random-octal-number";

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